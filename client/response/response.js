Template.responseLayout.onCreated(function(){
	this.ready = new ReactiveVar();
	this.autorun(()=>{
		if (rSig()) {
			let sub = ResponseSubs.subscribe('SurveyResponseForm', rSig());
			this.ready.set(sub.ready());
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
		let response = Responses.findOne({survey:sId});
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


Template.response.helpers({
	item () {
		let sId = FlowRouter.getParam('survey');
		let response = Responses.findOne({survey:sId});
		return Items.findOne(response.itemsToComplete[0], {
			transform(doc){
				doc.taskTemplate = doc.task.type + 'ResponseForm'
				if (['surveyConsentItem', 'agreeWithStatementTask'].indexOf(doc.task.type)>=0) {
					if (doc.task.requirements && doc.task.requirements.openEnded) {
						doc.actionsTemplate = 'actionsYesNoNA';
					} else {
						doc.actionsTemplate = 'actionsYesNo';
					}
				} else {
					doc.actionsTemplate = 'actionsNext';
				}
				return doc;
			}
		}); 
	},
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