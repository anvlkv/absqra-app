import { check } from 'meteor/check';

Meteor.publish('SurveysList', function () {
	return Surveys.find({_owner:this.userId},{
		fields:{
			title:1,
			description:1,
			_createdAt:1,
			_lastEdit:1,
		}
	});
});

Meteor.publish('SurveyContent', function(surveyId) {
	let survey = Surveys.find({_id:surveyId, _owner:this.userId}),
		itemsList = survey.fetch()[0].items,
		cursors = [];



	cursors.push(survey);

	if (itemsList && itemsList.length > 0) {
		let items = Items.find({_id:{$in:itemsList}, _owner:this.userId});
		cursors.push(items);
	}
	
	return cursors;
});

Meteor.publish('AvailableItems', function(){
	return Items.find({_owner:this.userId, task:{$exists:true}},{
		fields:{
			name:1,
			_origin:1,
			task:1,
		}})
});

Meteor.publish('SingleItem', function(itemId){
	check(itemId, String);

	return Items.find({_id:itemId});
});

Meteor.publish('SurveyResponseForm', function(rsig){
	// console.trace(rsig);s
	let validSig = Meteor.call('validate_r_sig', rsig);
	if (validSig) {
		const response = Responses.find(rsig.response);
		const surveyId = response.fetch()[0].survey;
		const survey = Surveys.find(surveyId);
		let srv = survey.fetch()[0];
		// console.log(srv);
		if (!srv._schema || srv._lastEdit > srv._schemaUpdated) {
			// console.log('generating schema');
			Meteor.call('generate_response_schema', surveyId);
			// console.log(c);
		}
		const itemsOut = ['surveyTargetingItem'];

		const items = Items.find({_id:{$in:srv.items}, 'task.type':{$nin:itemsOut}});

		// console.log(response.fetch(),survey.fetch(),items.fetch());

		// if (survey && srv._schema && items) {
		return [response, survey, items];
		// }
	} else {
		return false;
	}
});