CC_SurveyItems = new Meteor.Collection('CC_SurveyItems', null);

let activeToasts = new ReactiveDict();

function singleToast (text, duration){
	duration = duration ? duration : 4000;
	if (!activeToasts.get(text)) {
		activeToasts.set(text, true);
		// console.log(typeof text );
		Materialize.toast(text, duration, '',function(){
			activeToasts.set(text, false);
		});
	}
}

Template.dashboard.onRendered(function(){
	this.$('.tooltipped').tooltip();
})

Template.dashboard.events({
	'click .new_survey'(e, t) {
		// console.log(e);
		Meteor.call('create_new_survey', function (error, result) {
			// console.log(error, result);
			if (!error) {
				FlowRouter.go('survey-editor', {survey: result});
			}
		});
		return false;
	}
});

Template.surveyList.onCreated(function(){
	this.ready = new ReactiveVar();
	let sub = DashboardSubs.subscribe('SurveysList');
	this.autorun(()=>{
		this.ready.set(sub.ready());
	});
});

Template.surveyList.helpers({
	surveys() {
		return Surveys.find({},{sort:{_createdAt:-1}});
	},
	newSurvey() {
		return true;
	},
	pathForSurveyView(routeName, sId){
		return FlowRouter.path(routeName, {survey:sId});
	},
});

Template.surveyEditor.onDestroyed(function(){
	CC_SurveyItems._collection.remove({});
});

Template.surveyEditor.onCreated(function() {
	this.ready = new ReactiveVar();
	this.getCurrentSurvey = ()=>{
		return Surveys.findOne(FlowRouter.getParam('survey'));
	};

	this.autorun(()=>{
		if (FlowRouter.getParam('survey')) {
			CC_SurveyItems._collection.remove({});
		}
	});

	this.autorun(()=>{
		let srv_content = DashboardSubs.subscribe('SurveyContent', FlowRouter.getParam('survey')),
			available_items = DashboardSubs.subscribe('AvailableItems');

		this.ready.set(srv_content.ready() && available_items.ready());
	});

	this.autorun(()=>{
		if (this.ready.get()) {
			let survey = this.getCurrentSurvey();

			if (survey && survey.items) {
				Items.find({_id:{$in:survey.items}}).forEach((item)=>{
					surveyItem = {};

					surveyItem.order = survey.items.indexOf(item._id);

					if (item._origin === survey._id) {
						surveyItem.state = 'create'
					}else{
						surveyItem.state = 'select'
					};

					surveyItem.iid = item._id;
					surveyItem.surveyId = survey._id;

					if (item.task) {
						surveyItem.output = item.task.type;		
					}

					CC_SurveyItems._collection.upsert({iid:surveyItem.iid, order:surveyItem.order}, surveyItem);
				});
				
				// console.log(CC_SurveyItems.find().count());

			}
		}
	})

	AutoForm.addHooks('surveyForm',{
		before:{
			update: function(doc){
				doc['$set'].items=[];
				CC_SurveyItems.find({},{sort:{order:1}}).forEach(function (item) {
					doc['$set'].items.push(item.iid);
				});

				// console.log(doc['$set'].items);
				return doc;
			}
		},
		onSuccess: function(){
			// Materialize.toast('Changes to survey saved', 4000);
			singleToast('Changes to survey saved');
		}
	});
});

Template.surveyEditor.onRendered(function(){
	// console.log(Sortable);
});

Template.surveyEditor.helpers({
	survey(){
		return Surveys.findOne(FlowRouter.getParam('survey'));
	},
	stateName(){
		return this.title ? 'Edit' : 'New';
	},
	surveyItems(){
		// console.log(Template.instance().itemsSortArr.list());
		// console.log(CC_SurveyItems.find({}, {sort:{order:1}}).count());
		return CC_SurveyItems.find({}, {sort:{order:1}});
	},
	maxCount(){
		return CC_SurveyItems.find({}).count() - 1;	
	},
	surveyItemsOptions(){
		return {
			handle:'.sortable-handle'
		}
	},
});

Template.surveyEditor.events({
	'click .add_survey_item' (e,t) {
		let order = CC_SurveyItems.find({}).count();
		let id = CC_SurveyItems._collection.insert({
			order:order,
			state:'select',
			surveyId: this._id,
			activeEditor:true,
		});
	},
	'change .survey_item_order, submit .survey_item_order_form'(e,t){
		e.preventDefault();
		e.stopPropagation();

		let newOrder = Number.parseInt($(e.target).val()),
			surveyItem = CC_SurveyItems.findOne($(e.target).data('item')),
			maxOrder= CC_SurveyItems.find().count() - 1;

		if (surveyItem) {
			let updateTarget = function(){
				CC_SurveyItems._collection.update(surveyItem._id,{$set:{order:newOrder}},()=>{
					$('html, body').animate({
						scrollTop: $('#'+surveyItem._id).offset().top
					}, 250);
				});
			}

			CC_SurveyItems._collection.update(surveyItem._id,{$set:{order:null}},()=>{
				if (newOrder > maxOrder) {
					newOrder = maxOrder;
				};
				// if (newOrder < maxOrder) {
				if (newOrder > surveyItem.order) {
					CC_SurveyItems._collection.update({$and:[{order:{$gt:surveyItem.order}}, {order:{$lte:newOrder}}]},{$inc:{order:-1}}, updateTarget());
				} else if (newOrder < surveyItem.order) {
					CC_SurveyItems._collection.update({$and:[{order:{$lt:surveyItem.order}}, {order:{$gte:newOrder}}]},{$inc:{order:1}}, updateTarget());
				}
			})
		}
		
		return false;

	},
	'click .save_edits'(e,t){
		t.$('.item-editor-form').submit();
		t.$('.survey-editor-form').submit();
		FlowRouter.go('dashboard');
	},
	'click .cancel_edits'(e,t){
		FlowRouter.go('dashboard');
	}
});

Template.surveyItemsListItem.helpers({
	item () {
		return Items.findOne(this.iid);
	},
	icon(){
		if (this.state === 'select') {
			return 'label_outline'
		}else{
			return 'label'
		}

	}
});

Template.surveyItemsListItem.events({
	'click .toggle_item_editor'(e,t){
		let survey_item = t.$('.toggle_item_editor').data('editor-id');
		// console.log(CC_SurveyItems.findOne(survey_item), survey_item);
		if (CC_SurveyItems.findOne(survey_item).activeEditor) {
			CC_SurveyItems._collection.update(survey_item, {$set:{activeEditor:false}});
		} else {
			CC_SurveyItems._collection.update(survey_item, {$set:{activeEditor:true}});
		}
		return false;
	}
});

Template.surveyItemEditor.onDestroyed(function(){
	// console.trace(this);
});

Template.surveyItemEditor.onCreated(function(){

	this.collapseSelf = ()=>{
		CC_SurveyItems._collection.update(this.data._id, {$set:{activeEditor:false}});	
	};
	let collapseSelf = ()=>{
		this.collapseSelf();
	};

	this.autorun(()=>{
		AutoForm.addHooks('survey_item_form_'+this.data._id,{
			before:{
				update(doc){
					if (doc['$set']['task.options']) {
						let options = [];
						for (var i = 0; i < doc['$set']['task.options'].length; i++) {
							if (doc['$set']['task.options'][i]){
								options.push(doc['$set']['task.options'][i]);
							}
						}
						doc['$set']['task.options'] = options;
					}
					return doc
				}
			},
			onSuccess(){
				singleToast('Changes to item saved');
				collapseSelf();
			},
		});
	})
});

Template.surveyItemEditor.onRendered(function(){
	this.autorun(()=>{
		this.tabsEl =  this.$('ul.tabs').tabs();
		this.$('select').material_select();
	});
});

Template.surveyItemEditor.helpers({
	// tabid(){
	// 	return this._id + this.state + this.index;
	// },
	existingItems(){
		// console.log(Items.find({},{sort:{name:1}}).fetch());
		return Items.find({name:{$exists:true}, task:{$exists:true}},{sort:{name:1}});
	},
	state(...states){
		if (states.length > 0) {
			return states.indexOf(this.state) >= 0;
		}else{
			return this.state;
		}
	},
	selected(id){
		if (this.iid && id && this.iid===id) {
			return 'selected';
		} else if (!this.iid && !id){
			return 'selected';
		}
	}
});

Template.surveyItemEditor.events({
	'click .tab_editor'(e,t) {
		if (!this.iid || this.state === 'select') {
			Meteor.call('create_new_item', this.surveyId, (error, result) => {
				if (!error) {
					CC_SurveyItems._collection.update({_id:this._id}, {$set:{
						state: 'new',
						iid: result,
						output: null,
						activeEditor:true,
					}});
				}
			});
		}
		return false;
	},
	'change .select_existing_item'(e,t){
		let val = $(e.target).val();
		CC_SurveyItems._collection.update(this._id, {$set:{
			iid:val,
			state:'select',
		}});

		return false;
	},
	'click .clone_selected_item'(e,t){
		// console.log(this);
		if (this.iid && this.state ==='select') {
			// let output = Items.findOne(this.iid);
			Meteor.call('clone_item', this.iid, this.surveyId, (error, result)=> {
				// console.log(result);
				if (!error) {
					CC_SurveyItems._collection.update({_id:this._id}, {$set:{
						state: 'new',
						iid: result,
						activeEditor:true,
					}},()=>{
						t.tabsEl.tabs('select_tab', 'edit_an_item_'+this._id);
					});
				} else {
					console.log(error);
				}
			});
		}
		return false;
	},
	'click .save_item_edits'(e,t){
		t.$('.item-editor-form').submit();
		return false;
	},
	'click .cancel_item_edits'(e,t){
		singleToast('Changes discarded');
		Template.instance().collapseSelf();
		return false;
	},
	'click .toggle_item_editor'(e,t){
		let survey_item = t.$('.toggle_item_editor').data('editor-id');
		// console.log(CC_SurveyItems.findOne(survey_item), survey_item);
		if (CC_SurveyItems.findOne(survey_item).activeEditor) {
			CC_SurveyItems._collection.update(survey_item, {$set:{activeEditor:false}});
		} else {
			CC_SurveyItems._collection.update(survey_item, {$set:{activeEditor:true}});
		}
		return false;
	}
});

Template.itemEditor.onCreated(function(){
	this.ready = new ReactiveVar();
	this.autorun(()=>{
		let iid = CC_SurveyItems.findOne(this.data._id).iid;
		if (iid) {
			let sub = DashboardSubs.subscribe('SingleItem', iid);
			this.ready.set(sub.ready());
		} 
	})
})

Template.itemEditor.helpers({
	item(){
		// console.log(this.iid);
		let item = Items.findOne({_id:this.iid});
		// console.log(item);
		return item;
	},
	taskTypeForm(){
		return AutoForm.getFieldValue('task.type')+'Form';
	},
	formId(){
		return 'survey_item_form_' + this._id;
	},
});

Template.itemOption.onRendered(function(){
	this.autorun(()=>{
		this.$('select').material_select();
		Materialize.updateTextFields();
	});
});

Template.itemOption.helpers({
	optionSpecifier () {
		let sourceType = AutoForm.getFieldValue(this.current.sourceType);
		let optionSpecifier = {};
		if (sourceType === 'item-output') {
			optionSpecifier.options =[];
			optionSpecifier.label = 'Choose an item';
			CC_SurveyItems.find({output:{$exists:true}},{sort:{order:1}}).forEach(function (surveyItem, index) {
				let item = Items.findOne(surveyItem.iid);
				if (item && item.task && item.task.type) {
					optionSpecifier.options[index] = {
						value: item._id,
						label: item.name + ' (' + item.task.type +')',
					}
				}
			});
		} else {
			optionSpecifier.label = 'Specify an option'
		}

		return optionSpecifier;
	},
	sourceTypeId(){
		return this.formId + this.current.sourceType;
	},
	valueId(){
		return this.formId + this.current.value;
	},
	onlyOption(){
		let opts= AutoForm.getFieldValue('task.options');
		if (opts && opts.length <= 1) {
			return true;
		}
	},
	// typeIs(type){
	// 	return AutoForm.getFieldValue(this.current.sourceType) === type;
	// }
});

let inputRequirements = {
	'listingTask':{
		limits:{
			minLabel: 'Minimum list items count',
			maxLabel: 'Maximum list items count',
		}
	},
	'numberInputTask':{
		limits:{
			minLabel: 'Minimum value',
			maxLabel: 'Maximum value',
		}
	},
	'ratingTask':{
		limits:{
			minLabel: 'Minimum rating',
			maxLabel: 'Maximum rating',
		}
	},
	'openEndedQuestion':{
		limits:{
			minLabel: 'Minimum characters count',
			maxLabel: 'Maximum characters count',
		}
	},
	'singleChoiceQuestion':{
		openEnded: {
			trueLabel:'Allow "Other..."',
			falseLabel:'Fixed options',
		},
	},
	'multipleChoiceQuestion':{
		openEnded: {
			trueLabel:'Allow "Other..."',
			falseLabel:'Fixed options',
		},
		limits:{
			minLabel: 'Minimum options selected',
			maxLabel: 'Maximum options selected',
		},
	},
	'agreeWithStatementTask':{
		openEnded: {
			trueLabel:'Allow N/A',
			falseLabel:'Yes or No',
		},
	}
}


Template.itemRequirementsForm.helpers({
	availableRequirements(){
		return inputRequirements[this.output];
	},
	minCountInputId(){
		return 'minCountReq_'+this._id;
	},
	maxCountInputId(){
		return 'maxCountReq_'+this._id;
	},
});

Template.targetingOptions.onRendered(function(){
	this.autorun(()=>{
		Materialize.updateTextFields();
	})
})

Template.targetingOptions.helpers({
	verboseId () {
		return this.formId + this.current.verbose;
	},
	valueId(){
		return this.formId + this.current.value;
	},
	targetLink(){
		// console.log(AutoForm.getFieldValue(this.current.value));
		if (FlowRouter.getParam('survey') && AutoForm.getFieldValue(this.current.value)) {
			if (AutoForm.getFieldValue(this.current.value).indexOf('t_')>=0) {
				return FlowRouter.url('targeted-response',{
					survey: FlowRouter.getParam('survey'),
					target: AutoForm.getFieldValue(this.current.value)
				});
			}
		}
	},
	onlyOption(){
		let opts= AutoForm.getFieldValue('task.options');
		if (opts && opts.length <= 1) {
			return true;
		}
	},
});

Template.targetingOptions.events({
	'click .copy_link' (e,t) {
		e.preventDefault();
		e.stopPropagation();
		// console.log(this);
		// document.execCommand('copy')
		// Select the link text  
		let targetLink = e.target;
		// console.log(targetLink);
		try {  
			let range = document.createRange();  
			range.selectNode(targetLink);  
			window.getSelection().addRange(range);
			// Now that we've selected the anchor text, execute the copy command  
			let successful = document.execCommand('copy');  
			let msg = successful ? 'successful' : 'unsuccessful';  
			// console.log('');
			singleToast('Target link '+ AutoForm.getFieldValue(this.current.verbose) + ' copied');
		} catch(err) {  
			singleToast('Unable to copy. Please copy links manually');
			$('.copy_link').removeAttr('href').removeClass('copy_link');
		}

		// Remove the selections - NOTE: Should use
		// removeRange(range) when it is supported  
		try {
			window.getSelection().removeRange(range)
		} catch(err){
			window.getSelection().removeAllRanges(); 
		}

		return false;
	}
});