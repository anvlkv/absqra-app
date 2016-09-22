function getResponseOptions(optionSrc){
	if (optionSrc.sourceType === 'item-output') {
		const response = Responses.findOne();
		const index = response.completedItems.indexOf(optionSrc.value);
		let options = response.body[index][optionSrc.value];
		// let options = [];
		// console.log(src);
		// for (let i = 0; i < src.length; i++) {
		// 	// src[i]
		// 	// console.log(src, src[i]);
		// 	for (let j = 0; i < src[i].length; j++) {
		// 		options.push(src[i][j]);
		// 	}
		// }

		return options;
	}else{
		return [optionSrc.value];
	}
}


Template.responseLayout.onCreated(function(){
	this.ready = new ReactiveVar();
	this.autorun(()=>{
		// console.log('runing');
		let survey = FlowRouter.getParam('survey');
		if (rSig() && rSig().response) {
			// console.log('subscribe', rSig());
			// console.log()
			let sub = ResponseSubs.subscribe('SurveyResponseForm', rSig());
			
			this.ready.set(sub.ready());

			// console.log(sub.ready());

			// http://localhost:3000/response/qDzjoJYFCk9t9GQCC/t_64a490fb675e0675b55985ab
		}else if(rSig() && rSig().response === false){
			this.ready.set(true);
			BlazeLayout.render('responseLayout',{
				header: 'navMenuthankRespondent',
				main: 'thankRespondent',
				footer: 'footerResponse'
			})
		}
	});

	this.autorun(()=>{
		if (this.ready.get()) {
			Meteor.call('start_survey', rSig(), FlowRouter.getParam('target'));
		}
	});
});

Template.navMenuResponse.helpers({
	survey () {
		let sId = FlowRouter.getParam('survey');
		let response = Responses.find({survey:sId}).fetch()[0];
		return Surveys.findOne(sId,{
			transform(doc){
				doc.step = response.completedItems.length;
				doc.totalSteps = doc.items.length;
				doc.progress = (doc.step/doc.totalSteps * 100)+'%';
				return doc;
			}
		});
	}
});

Template.response.onCreated(function(){
	this.ready = new ReactiveVar();
	this.schemaChanged = new ReactiveVar();
	
	AutoForm.setDefaultTemplateForType('afCheckboxGroup', 'surveyFlow');
	// AutoForm.setDefaultTemplateForType('afRadioGroupInline', 'surveyFlow');

	this.autorun(()=>{
		let subs = ResponseSubs.subscribe('SurveyResponseForm', rSig());
		let id = Responses.find().fetch()[0].itemsToComplete[0];
		this.ready.set(false);

		if (id) {
			Meteor.call('get_response_schema', FlowRouter.getParam('survey'), id, (e,r)=>{
				if (!e) {
					evaluateTypes(r);
					// console.log(r);
					this.schema = r;
					this.schemaChanged.set(Date.now());
				}
				this.ready.set(!!r && subs.ready());
			});

			AutoForm.addHooks('itemResponseForm_'+id,{
				onSubmit(insertDoc, updateDoc, currentDoc){
						Meteor.call('submit_item_response', insertDoc, id, rSig(), function (error, result) {
							if (!error) {
								actOnResult(result);
							}
						});
					return false;
				}
			});

			// AutoForm.debug();
		}
	});
});


Template.response.helpers({
	item () {
		let sId = FlowRouter.getParam('survey');
		let response = Responses.find({survey:sId});
		// console.log(response.fetch()[0].itemsToComplete[0]);
		return Items.findOne(response.fetch()[0].itemsToComplete[0], {
			transform(doc){
				doc.taskTemplate = doc.task.type + 'ResponseForm';
				if (['surveyConsentItem', 'agreeWithStatementTask'].indexOf(doc.task.type)>=0) {
					doc.actionsTemplate = 'actionsYesNo';
				} else {
					doc.actionsTemplate = 'actionsNext';
				}
				if (doc.task.options) {
					for (let i = 0; i < doc.task.options.length; i++) {
						doc.task.options[i].index = i;
					}
				}

				return doc;
			}
		}); 
	},
	getItemSchema() {
		const t = Template.instance();
		let actual = t.schemaChanged.get();
		if (actual) {
			return new SimpleSchema(t.schema);
		}
	},
	formId(){
		let item = Responses.find().fetch()[0].itemsToComplete[0];
		return 'itemResponseForm_'+item;
	}
});

function actOnResult (result) {
	switch(result){
		case 'saySorry':
			$('#sorryCanTProceed').openModal();
			break;
		default:
			singleToast('Response saved');
	}
	// if (result === 'saySorry') {
	// 	$('#sorryCanTProceed').openModal();
	// } else {
	// 	singleToast('Response saved');
	// }
}

Template.response.events({
	'click .item_agree' (e,t) {
		// console.log(this, rSig());
		let id = $(e.target).data('item-id');
		let response = {};
		response[id] = true;
		Meteor.call('submit_item_response', response, id, rSig(), function (error, result) {
			if (!error) {
				actOnResult(result);
			}
		});
	},
	'click .item_disagree' (e,t) {
		// console.log(this, rSig());
		let id = $(e.target).data('item-id');
		let response = {};
		response[id] = false;
		Meteor.call('submit_item_response', response, id, rSig(), function (error, result) {
			if (!error) {
				actOnResult(result);
			}
		});
	},
	'click .item_skip' (e,t) {
		// console.log(this, rSig());
		let id = $(e.target).data('item-id');
		let response = {};
		response[id] = null;
		Meteor.call('skip_item_response', response, id, rSig(), function (error, result) {
			if (!error) {
				actOnResult(result);
			}
		});
	},
	'click .item_next'(e,t) {
		let id = $(e.target).data('item-id');
		// console.log($('form#itemResponseForm_'+id));
		$('form#itemResponseForm_'+id).submit();
	}
});


Template.actionsYesNo.helpers({
	undesiredNo (type) {
		if (type === 'surveyConsentItem') {
			return true;
		}
	}
});


// Template.listingTaskResponseForm.onCreated(function(){


// 	// this.autorun(()=>{
// 	// 	let af = AutoForm.getFormValues('itemResponseForm_');
// 	// 	console.log(af);
// 	// });
// });


// Template.afArrayField_listEditor.onCreated(function(){
// 	// console.log(this.data);

// })

Template.listingTaskResponseForm.helpers({
	fieldName(){
		return this._id;
	},
});

Template.afArrayField_listEditor.events({
	'keyup input' (e,t) {
		if (e.key === "Enter") {
			t.$('.autoform-add-item').click();
		}
	}
});

// Template.listNode.onCreated(function(){
// 	this.autorun(()=>{
// 		// console.log(this);

// 	})
// });

Template.listNode.helpers({
	nodeTitle () {
		return getResponseOptions(this.node)[0];
	},
	nestedNodes (item) {
		// console.log(this, item);
		if (this.sourceType === 'item-output') {
			console.log('whoops' , item._id);
		}
		// return getResponseOptions();
	},
	fieldName(){
		return this.item._id + '.' + this.node.index;
	}
});

Template.listEditorItem.onRendered(function(){
	let el = $('.array-field-input').filter(function() { return this.value == ""; })[0];
	if (el) {
		el.focus();
	}
});


Template.singleChoiceQuestionResponseForm.helpers({
	choiceOptions () {
		let options =[];
		let choices =[];
		for (let i = 0; i < this.task.options.length; i++) {
			options.push(getResponseOptions(this.task.options[i]));
		}

		options = options.flatten();
		for (let i = 0; i < options.length; i++) {
			choices.push({value:i, label:options[i]});
		}


		return choices
	}
});

Template.multipleChoiceQuestionResponseForm.inheritsHelpersFrom('singleChoiceQuestionResponseForm');
Template.afCheckboxGroup_surveyFlow.inheritsHelpersFrom('afCheckboxGroup_materialize');
// Template.afRadioGroupInline_surveyFlow.inheritsHelpersFrom('afRadioGroupInline_materialize');

Template.ratingTaskResponseForm.helpers({
	ratingOptions() {
		let opts = [];
		if (this.task.requirements && this.task.requirements.maxCount && this.task.requirements.minCount) {
			for (let i = this.task.requirements.minCount; i <= this.task.requirements.maxCount; i++) {
			    opts.push({label:i, value:i});
			}
		} else {
			for (let i = 0; i <= 5; i++) {
			    opts.push({label:i, value:i});
			}
		}

		return opts;
	},
	choiceOptions () {
		let options =[];
		let choices =[];
		for (let i = 0; i < this.task.options.length; i++) {
			options.push(getResponseOptions(this.task.options[i]));
		}

		options = options.flatten();
		for (let i = 0; i < options.length; i++) {
			choices.push({value:i, label:options[i], name: this._id+'.'+i});
		}



		return choices
	}
});

// surveyConsentItem
// surveyTargetingItem
// listingTask
// singleChoiceQuestion
// multipleChoiceQuestion
// openEndedQuestion
// numberInputTask
// ratingTask
// modifyStatementTask
// agreeWithStatementTask