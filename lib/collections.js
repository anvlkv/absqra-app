// collections

Surveys = new Mongo.Collection('surveys');
Items = new Mongo.Collection('items');
Results = new Mongo.Collection('results');

// schemas
Schemas = {};

Schemas.ItemTaskOptionSchema = new SimpleSchema({
	sourceType:{
		type: String,
		optional: true,
		label: 'Option(s) source type',
		autoform:{
			afFieldInput:{
				type:'select',
				options:{
					'predefined-option':'Enter an option',
					'item-output':'Choose a source item',
				},
			},
		},
	},
	value:{
		type: String,
		optional: true,
	},
	verbose:{
		type: String,
		optional: true,
	},
	filters:{
		type: [Object],
		optional: true,
	},
	'filters.$.input':{
		type: String,
		optional: true,
	},
	'filters.$.condition':{
		type: String,
		optional: true,
	},
	'filters.$.value':{
		type: String,
		optional: true,
	},
});

Schemas.ItemTaskSchema = new SimpleSchema({
	type:{
		type: String,
		label: 'Item type',
		allowedValues:['surveyConsentItem', 'surveyTargetingItem','listingTask', 'singleChoiceQuestion', 'multipleChoiceQuestion', 'openEndedQuestion', 'numberInputTask', 'ratingTask', 'modifyStatementTask', 'agreeWithStatementTask'],
		autoform:{
			afFieldInput: {
				type:'select',
				options:{
					'surveyConsentItem':'Survey consent',
					'surveyTargetingItem':'Survey targeting',
					'listingTask':'Listing task',
					'singleChoiceQuestion':'Single-choice question',
					'multipleChoiceQuestion':'Multiple-choice question',
					'openEndedQuestion':'Open-ended question',
					'numberInputTask':'Enter a number task',
					'ratingTask':'Rating task',
					'modifyStatementTask':'Adjust statement task',
					'agreeWithStatementTask':'Agree with the statement task',
				},
			},
		},
	},
	asset:{
		type: String,
		optional: true,
	},
	options:{
		type: [Schemas.ItemTaskOptionSchema],
		optional: true,
		autoValue: function(){
			if (this.siblingField('type').value === 'surveyTargetingItem') {
				for (var i = this.value.length - 1; i >= 0; i--) {
					if (!this.value[i].value || this.value[i].value.indexOf('t_') < 0) {
						this.value[i].value = 't_' + new Meteor.Collection.ObjectID()._str;
					}
				}
				return this.value;
			}
		}
	},
	requirements:{
		type: Object,
		optional: true,
	},
	'requirements.minCount':{
		type: Number,
		optional: true,
	},
	'requirements.maxCount':{
		type: Number,
		optional: true,
	},
	'requirements.openEnded':{
		type: Boolean,
		optional: true,
		autoform: {
			type:"switch",
		}
	},
	// 'requirements.inputType':{
	// 	type: String,
	// 	optional: true,
	// 	allowedValues:['string', 'number'],
	// 	label: 'Response input type',
	// 	autoform:{
	// 		afFieldInput: {
	// 			type:'select',
	// 			options:{
	// 				'string':'Text',
	// 				'number':'Number',
	// 			},
	// 		},
	// 	},
	// }
});

Schemas.ItemSchema = new SimpleSchema({
	_createdAt:{
		type: Date,
	},
	_owner:{
		type: String,
	},
	_origin:{
		type: String,
	},
	name:{
		type: String,
		label: "Item name",
		optional: true,
		max: 250
	},
	question:{
		type: String,
		label: "Item question or task",
		optional: true,
	},
	instruction:{
		type: String,
		label: "Item instruction",
		optional: true,
		autoform: {
			afFieldInput: {
				type: 'textarea',
			}
		}
	},
	task:{
		type: Schemas.ItemTaskSchema,
		optional: true,
	},
});

Schemas.SurveySchema = new SimpleSchema({
	_createdAt:{
		type: Date,
	},
	_owner:{
		type: String,
	},
	title:{
		type: String,
		label: "Survey title",
		max: 250,
		optional: true,
	},
	description:{
		type: String,
		label: "Survey description",
		optional: true,
		autoform: {
			afFieldInput: {
				type: 'textarea',
			}
		}
	},
	items:{
		type: [String],
		label: "Survey items",
		optional: true,
	},
});


// attach schemas

Surveys.attachSchema(Schemas.SurveySchema);
Items.attachSchema(Schemas.ItemSchema);
