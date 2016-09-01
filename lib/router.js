// import fp2 from 'fingerprintjs2';
const fp2 = require ('fingerprintjs2');

// import rSig from '/r-sign.js'
// import { FlowRouter } from 'meteor/kadira:flow-router';
// import { BlazeLayout }  from 'meteor/kadira:blaze-layout';
// import { Session } from 'meteor/u2622:persistent-session';

let PlatformAdminRoutes = FlowRouter.group({
	prefix: '/platform-dashboard',
});

let DashboardRoutes = FlowRouter.group({
	prefix: '/dashboard',
	triggersEnter:[AccountsTemplates.ensureSignedIn],
});

let RespondentRoutes = FlowRouter.group({
	prefix: '/response',
});

DashboardRoutes.route('/',{
	name:'dashboard',
	action () {
		BlazeLayout.render('mainLayout', {
			header: 'navMenuDashboard',
			main: 'dashboard',
			dashboardView: 'surveyList',
			footer: 'footerDashboard',
		});
	},
});

DashboardRoutes.route('/survey-editor/:survey',{
	name:'survey-editor',
	action () {
		BlazeLayout.render('mainLayout', {
			header: 'navMenuDashboard',
			main: 'dashboard',
			dashboardView: 'surveyEditor',
			footer: 'footerDashboard',
		});
	},
});

DashboardRoutes.route('/survey-results/:survey',{
	name:'survey-results',
	action () {
		BlazeLayout.render('mainLayout', {
			header: 'navMenuDashboard',
			main: 'dashboard',
			dashboardView: 'surveyEditor',
			footer: 'footerDashboard',
		});
	},
});

RespondentRoutes.route('/:survey/:target',{
	name: 'targeted-response',
	triggersEnter:[function(current){
		let fp = new fp2().get(function(hash, components){
			Session.set('fp', hash);
			Meteor.call('control_respondent', rSig(), current.params.survey, function (error, result) {
				if (!error) {
					Session.setPersistent(current.params.survey, result);
					console.log(result);
				}else{
					console.log(error);
				}
			});
		});
	}],
	triggersExit:[function(current){
		Meteor.call('abandon_response', Session.get(current.params.survey));
	}],
	action(){
		BlazeLayout.render('responseLayout',{
			header: 'navMenuResponse',
			main: 'response',
			footer: 'footerResponse'
		})
	}
})


FlowRouter.route('/',{
	action () {
		BlazeLayout.render('mainLayout', {
			header: 'navMenuLanding',
			main: 'landing',
			footer: 'footerDefault'
		});
	},
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');

// var adminRoutes = FlowRouter.group({
//   prefix: '/admin',
//   name: 'admin',
//   triggersEnter: [function(context, redirect) {
//     console.log('running group triggers');
//   }]
// });

// // handling /admin route
// adminRoutes.route('/', {
//   action: function() {
//     BlazeLayout.render('componentLayout', {content: 'admin'});
//   },
//   triggersEnter: [function(context, redirect) {
//     console.log('running /admin trigger');
//   }]
// });