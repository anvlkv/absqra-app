import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Template.onCreated(function(){
	this.ready = new ReactiveVar(false);
	// console.log(this);
});

Template.registerHelper('momentFormat',(date, format)=>{
	return moment(date).format(format);
});

Template.registerHelper('userName', (id)=>{
	if (Meteor.users.findOne(id)) {
		return Meteor.users.findOne(id).profile.username;
	}
});

Template.registerHelper('readiness',()=>{
	return Template.instance().ready.get();
});

Template.registerHelper('log',(...things)=>{
	$.each(things, function(index, val) {
		console.log(val);
	});
});

Template.registerHelper("currentFieldValue", function (fieldName) {
  return AutoForm.getFieldValue(fieldName);
});