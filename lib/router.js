let PlatformAdminRoutes = FlowRouter.group({
	prefix: '/platform-dashboard',
});

let DashboardRoutes = FlowRouter.group({
	prefix: '/dashboard',
	triggersEnter:[AccountsTemplates.ensureSignedIn],
});

let RespondentRoutes = FlowRouter.group({
	prefix: '/response'
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