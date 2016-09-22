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
	keepalive: function (rsig) {
		check(rsig, rsigSchema);
		Respondents.update({_fp: rsig.fp}, {$set:{_lastSeen:(Date.now())}});
	},
	validate_r_sig(rsig){
		check(rsig, rsigSchema);
		if (rsig.response && rsig.fp) {
			let respondent = Respondents.findOne({_fp: rsig.fp});
			let response = Responses.findOne({_id: rsig.response});
			if (response && respondent) {
				return response._respondent === respondent._id;
			}
		} else if (rsig.fp){
			return Respondents.find({_fp: rsig.fp}).count() === 0;			
		}
	},
	control_respondent (rsig, surveyId){
		// check(rsig, rsigSchema);
		let validSig = Meteor.call('validate_r_sig', rsig);
		// console.log(rsig, validSig, surveyId );
		if (validSig) {
			check(surveyId, String);
			if(Respondents.find({_fp: rsig.fp}).count() <= 0){
				let respondent = Respondents.insert({_fp: rsig.fp});
				// Roles.addUsersToRoles(respondent,['respond'],'respondent'); 
				// console.log('here');
				return Meteor.call('new_response', respondent, surveyId);
			}else if(rsig.response){
				let respondent = Respondents.findOne({_fp: rsig.fp});
				let resp = Responses.findOne({_id:rsig.response});
				if (resp && resp._state !== 'abandoned' && resp._state !== 'finished' && resp._respondent === respondent._id) {
					// console.log('here');
					return rsig.response;
				} else {
					// console.log('newhere');
					return Meteor.call('new_response', respondent._id, surveyId);
				}
			}
		} else {
			let respondent = Respondents.findOne({_fp: rsig.fp});
			// console.log(rsig, respondent)
			if (!respondent) {
				respondent = {}
				respondent._id = Respondents.insert({_fp: rsig.fp});
				return Meteor.call('new_response', respondent._id, surveyId);
			}else if (respondent.completedSurveys.indexOf(surveyId)>=0){
				// throw new Meteor.Error(403, 'Error 403: Forbiden', 'response can not be changed');
				return false;
			}

		}
	},
	new_response (respondent, survey){
		check(respondent, String);
		check(survey, String);
		// console.log('new response');
		if (Responses.find({_respondent:respondent, survey: survey, _state:{$in:['in-progress','finished']}}).count() <= 0) {
			let srv = Surveys.findOne(survey);
			return Responses.insert({
				_createdAt: new Date(),
				_state: 'in-progress',
				_respondent: respondent,
				survey: survey,
				completedItems:[],
				itemsToComplete:srv.items,
				body:[],
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
			let responses_updated = Responses.update({_id:responseId},{$unset:{_respondent:''}, $set:{_state:'abandoned'}});
			let respondents_updated = Respondents.update({_id:respondent},{$pull:{responses:responseId}});
			// console.log(rs,rts);
			return responses_updated > 0 && respondents_updated > 0
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
				setAs: false,
			};

			itms.forEach(function (item) {
				if (item.task.type === 'surveyTargetingItem') {
					if (resp.itemsToComplete.indexOf(item._id)>=0) {
						targetingState.has = item._id;
						let response = {};
						response[item._id] = targetId;

						if (context.validateOne(response, item._id)) {
							if (resp.completedItems.indexOf(item._id) < 0 ) {

								let upd = Meteor.call('update_response', rsig, response, item._id);
								// console.log(upd);
								if (upd > 0) {
									targetingState.setAs = item._id;
								}
							} else {
								targetingState.setAs = item._id;
							}
						}
					}
				}
			});

			if (targetingState.has === targetingState.setAs) {
				return true;
			} else {
				// console.log('here');
				// console.log(targetingState);
				throw new Meteor.Error(403, 'Error 403: Forbiden', 'response can not be changed');
				return false;
			}
		}
	},
	submit_item_response(response, item, rsig){
		check(item, String);
		let validSig = Meteor.call('validate_r_sig', rsig);
		if (validSig) {
			const resp = Responses.findOne({_id:rsig.response});
			const surv = Surveys.findOne(resp.survey);
			const itm = Items.findOne({_id:item});
			const context = new SimpleSchema(Meteor.call('get_response_schema', surv._id)).newContext();

			if (resp.itemsToComplete.indexOf(item)>=0) {
				// console.log(itm.task.type, response);
				if (itm.task.type === 'surveyConsentItem' && response[item] == false) {
					return 'saySorry';
				} else {
					if (context.validateOne(response, item)) {

						return Meteor.call('update_response', rsig, response, item);
					} else {
						throw new Meteor.Error(403, 'Error 403: Forbiden', 'invalid response');
						return false;
					}
				}

			} else {
				throw new Meteor.Error(403, 'Error 403: Forbiden', 'response can not be changed');
				return false;
			}

		}
	},
	update_response (rsig, response, item){
		// console.log(rsig, response, item);
		check(item, String);
		let validSig = Meteor.call('validate_r_sig', rsig);
		if (validSig) {
			let upd = Responses.update({_id:rsig.response}, {
				$push:{
					body:response,
					completedItems: item,
				},
				$pull:{
					itemsToComplete: item,
				}
			});

			if (Responses.findOne({_id:rsig.response, itemsToComplete:[]})) {
				Meteor.call('finish_response', rsig.response, function (error, result) {});
			}

			return upd;
		}
	},
	finish_response(responseId){
		check(responseId, String);
		const response = Responses.findOne({_id:responseId})
		const respondent = response._respondent;
		// console.log(respondent);
		if (Respondents.findOne(respondent).responses.indexOf(responseId) >= 0) {
			let responses_updated = Responses.update({_id:responseId},{$unset:{_respondent:''}, $set:{_state:'finished'}});
			let respondents_updated = Respondents.update({_id:respondent},{$pull:{responses:responseId}, $push:{completedSurveys:response.survey}});
			// console.log(rs,rts);
			return responses_updated > 0 && respondents_updated > 0
		}
	}
});