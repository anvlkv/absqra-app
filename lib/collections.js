import './verbose.js';

// collections

Surveys = new Mongo.Collection('surveys');
Items = new Mongo.Collection('items');
Responses = new Mongo.Collection('results');

// schemas
Schemas = {};

Schemas.ResponseSchema = new SimpleSchema({
	_createdAt:{
		type: Date,
	},
	_state:{
		type: String,
		allowedValues: ['in-progress','finished','abandoned'],
	},
	_respondent:{
		type: String,
		optional: true,
	},
	survey:{
		type: String,
	},
	completedItems:{
		type: [String],
	},
	itemsToComplete:{
		type: [String],
	},
	body:{
		type: [Object],
		blackbox: true,
		optional: true,
	},
});

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
				options:items_types,
			},
		},
	},
	asset:{
		type: String,
		optional: true,
		autoform: {
		    afFieldInput: {
		        type: 'text',
		    }
		}
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
});

Schemas.ItemSchema = new SimpleSchema({
	_createdAt:{
		type: Date,
	},
	_lastEdit:{
		type: Date,
		autoValue:function(){
			this.value = new Date();
			return this.value;
		},
		optional: true
	},
	_owner:{
		type: String,
	},
	_origin:{
		type: String,
	},
	name:{
		type: String,
		label: "item_name",
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
	_lastEdit:{
		type: Date,
		autoValue:function(){
			this.value = new Date();
			return this.value;
		},
		optional: true
	},
	_owner:{
		type: String,
	},
	_schema:{
		type: String,
		optional: true,
	},
	_schemaUpdated:{
		type: Date,
		optional: true
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
Responses.attachSchema(Schemas.ResponseSchema);



evaluateTypes = function(obj) {
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