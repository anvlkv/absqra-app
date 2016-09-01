let rsigSchema = new SimpleSchema({
	response:{
		type: String,
		optional: true,
	},
	fp:{
		type: String,
		optional: true,
	},
});

Meteor.methods({
	validate_r_sig(rsig){
		check(rsig, rsigSchema);
		if (rsig.response && rsig.fp) {
			let respondent = Respondents.findOne({_fp: rsig.fp});
			let response = Responses.findOne({_id: rsig.response});

			if (response._respondent === respondent._id) {
				return true;
			}
		} else if (rsig.fp){
			return Respondents.find({_fp: rsig.fp}).count() === 0;
		}
	},
	control_respondent (rsig, surveyId){
		// check(rsig, rsigSchema);
		let validSig = Meteor.call('validate_r_sig', rsig);
		if (validSig) {
			check(surveyId, String);

			if(Respondents.find({_fp: rsig.fp}).count() <= 0){
				let respondent = Respondents.insert({_fp: rsig.fp});
				// Roles.addUsersToRoles(respondent,['respond'],'respondent'); 
				return Meteor.call('new_response', respondent, surveyId);
			}else if(rsig.response){
				let respondent = Respondents.findOne({_fp: rsig.fp});
				let resp = Responses.findOne({_id:rsig.response});
				if (resp && resp._state !== 'abandoned' && resp._respondent === respondent._id) {
					return rsig.response;
				}else{
					return Meteor.call('new_response', respondent._id, surveyId);
				}
			} else {
				let respondent = Respondents.findOne({_fp: rsig.fp});
				return Meteor.call('new_response', respondent._id, surveyId);
			}
		}
	},
	new_response (respondent, survey){
		check(respondent, String);
		check(survey, String);

		if (Responses.find({_respondent:respondent, survey: survey, _state:{$in:['in-progress','finished']}}).count() <= 0) {
			let srv = Surveys.findOne(survey);
			return Responses.insert({
				_createdAt: new Date(),
				_state: 'in-progress',
				_respondent: respondent,
				survey: survey,
				completedItems:[],
				itemsToComplete:srv.items,
				body:[{}],
			}, function(error, result){
				if (!error) {
					Respondents.update({_id:respondent}, {$push:{responses:result}});
				}
			});
		}
	},
	abandon_response (responseId){
		check(responseId, String);
		// console.log('abandoning', Responses.findOne({_id:responseId}));
		const respondent = Responses.findOne({_id:responseId})._respondent;
		// console.log(respondent);
		if (Respondents.findOne(respondent).responses.indexOf(responseId) >= 0) {
			Responses.update({_id:responseId},{$unset:{_respondent:''}, $set:{_state:'abandoned'}});
			Respondents.update({_id:respondent},{$pull:{responses:responseId}});
			// console.log(rs,rts);
		}
	},
	start_survey(rsig, targetId){
		// check(rsig, rsigSchema);
		check(targetId, String);

		let validSig = Meteor.call('validate_r_sig', rsig);

		if (validSig) {
			const resp = Responses.findOne({_id:rsig.response});
			const surv = Surveys.findOne(resp.survey);
			const itms = Items.find({_id:{$in:surv.items}});
			const context = new SimpleSchema(Meteor.call('get_response_schema', surv._id)).newContext();

			let targetingState = {
				has: false,
				isSet: false,
			};

			itms.forEach(function (item) {
				if (item.task.type === 'surveyTargetingItem') {
					targetingState.has = item._id;
					let itemResponse = {};
					itemResponse[item._id] = targetId;
					if (context.validateOne(itemResponse, item._id)) {
						if (resp.completedItems.indexOf(item._id) < 0 ) {
							let upd = Responses.update({_id:rsig.response}, {
								$push:{
									body:itemResponse,
									completedItems: item._id,
								},
								$pull:{
									itemsToComplete: item._id,
								}
							});
							if (upd > 0) {
								targetingState.isSet = item._id;
							}
						} else {
							targetingState.isSet = item._id;
						}
					}
				}
			});

			if (targetingState.has === targetingState.isSet) {
				return true;
			} else {
				throw new Meteor.Error(403, 'Error 403: Forbiden', 'response can not be changed');
				return false;
			}
		}
	},
	saveItemResponse(){

	}
});