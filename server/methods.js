import { Match } from 'meteor/check';

Meteor.methods({
	create_new_survey () {
		return Surveys.insert({
			_createdAt: new Date(),
			_owner: this.userId,
		});
	},
	create_new_item (surveyId){
		return Items.insert({
			_createdAt: new Date(),
			_owner: this.userId,
			_origin: surveyId,
		},function(err, itemId){
			// if(!err){
			// 	Surveys.update({_id:surveyId}, {$push:{items:itemId}});			
			// }else{
			// 	console.error(err);
			// }
		});
	},
	clone_item (itemId, surveyId){
		const itemSrc = Items.findOne(itemId);
		let clone = itemSrc;
		clone._origin = surveyId;
		clone._createdAt= new Date();
		delete clone._id;
		// console.log(itemId, surveyId);
		let result = Items.insert(clone, function(error, result){
			console.error(error, result);
		});
		return result;
	},
	generate_response_schema (surveyId){
		function itemResponseSchema(item){
			let schema = {
				optional: true,
			};

			let nested_schema;

			switch (item.task.type){
				case 'surveyConsentItem':
					// console.log('surveyConsentItem', item.task.type);
					schema.type = "Boolean";
					break;

				case 'surveyTargetingItem':
					// console.log('surveyTargetingItem', item.task.type);
					schema.type = "String";
					schema.allowedValues = [];
					
					if (item.task.options) {
						for (var i = 0; i < item.task.options.length; i++) {
							schema.allowedValues.push(item.task.options[i].value);
						}
					}
					break;

				case 'openEndedQuestion':
					// console.log('openEndedQuestion', item.task.type);
					schema.type = "String";

					if (item.task.requirements) {
						if (item.task.requirements.minCount)
							schema.min = item.task.requirements.minCount;

						if (item.task.requirements.maxCount)
							schema.max = item.task.requirements.maxCount;
					}
				
					schema.autoform={
						afFieldInput: {
							type: 'text'
						}
					}
					break;

				case 'numberInputTask':
					// console.log('numberInputTask', item.task.type);
					schema.type = "Number";

					if (item.task.requirements) {
						if (item.task.requirements.minCount)
							schema.min = item.task.requirements.minCount;

						if (item.task.requirements.maxCount)
							schema.max = item.task.requirements.maxCount;
					}
					break;

				case 'singleChoiceQuestion':
					// console.log('singleChoiceQuestion', item.task.type);
					schema.type = "String";

					schema.autoform ={
						afFieldInput: {
							type: 'select-radio',
						}
					};

					if (item.task.requirements && item.task.requirements.openEnded)
						schema.autoform.afFieldInput.template = 'responseWithOtherOption';
					break;

				case 'multipleChoiceQuestion':
					// console.log('multipleChoiceQuestion', item.task.type);
					schema.type = "[String]";

					schema.autoform ={
						afFieldInput: {
							type: 'select-checkbox',
						}
					};

					if (item.task.requirements) {
						if (item.task.requirements.openEnded)
							schema.autoform.afFieldInput.template = 'responseWithOtherOption';

						if (item.task.requirements.minCount)
							schema.minCount = item.task.requirements.minCount;

						if (item.task.requirements.maxCount)
							schema.maxCount = item.task.requirements.maxCount;
					}
					break;

				case 'agreeWithStatementTask':
					// console.log('agreeWithStatementTask', item.task.type);
					if (!item.task.requirements || !item.task.requirements.openEnded) {
						schema.type = "Boolean";
					} else {
						schema.type = "String";
						schema.allowedValues = ['Y','N','N/A'];
					}
					break;

				case 'listingTask':
					// console.log('listingTask', item.task.type);
					schema.type = "Object";

					nested_schema = {
						type: "[String]",
						optional: true,
					};

					if (item.task.requirements) {
						if (item.task.requirements.minCount)
							nested_schema.minCount = item.task.requirements.minCount;

						if (item.task.requirements.maxCount)
							nested_schema.maxCount = item.task.requirements.maxCount;
					}
					break;

				case 'ratingTask':
					// console.log('ratingTask', item.task.type);
					schema.type = "[Object]";

					nested_schema ={
						type: "Number"
					};

					if (item.task.requirements) {
						if (item.task.requirements.minCount)
							nested_schema.min = item.task.requirements.minCount;

						if (item.task.requirements.maxCount)
							nested_schema.max = item.task.requirements.maxCount;
					}
					break;

				case 'modifyStatementTask':
					// console.log('modifyStatementTask', item.task.type);
					schema.type = "[Object]";
					break;

				default:
					schema = null;
					break;
			}
			// console.log(schema, nested_schema);
			return [schema, nested_schema];
		}

		const survey = Surveys.findOne(surveyId);
		const items = Items.find({_id:{$in:survey.items}},{
			transform: function(doc){
				doc._order = survey.items.indexOf(doc._id);
				return doc;
			},
			sort:{
				_order: 1
			}
		});

		// console.log(items.fetc());

		let schema = {};
		items.forEach(function (item, index) {
			let response_schema = itemResponseSchema(item);
			schema[item._id] = response_schema[0];

			if (response_schema[1]) {
				schema[item._id + '.$'] = response_schema[1];
			}
		});

		// console.log(typeof new SimpleSchema(schema));
		schema = encodeURIComponent(JSON.stringify(schema));

		return Surveys.update(survey._id, {$set:{_schema: schema, _schemaUpdated: new Date()}}, function(error, result){
			if (!error) {
				
			}else{
				console.log(error);
			}
		});
	},
	get_response_schema (surveyId){
		const survey = Surveys.findOne(surveyId);
		if(survey) {
			function evaluateTypes(obj) {
				for (let i in obj) {
					if (typeof obj[i] == "object" && obj[i] !== null) {
						evaluateTypes(obj[i]);
					} else {
						if(i === 'type') {
							try {
								let val = eval(obj[i]);
								obj[i] = val;
							} catch (e) {
								// console.log('here',e);
								obj[i] = obj[i];
							}
						}
					}
				}
			}

			let schema = JSON.parse(decodeURIComponent(survey._schema));
			evaluateTypes(schema);

			return schema;
		}
	},
});