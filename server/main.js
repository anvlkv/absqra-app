import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	if (!Meteor.users.findOne()){
		for (let i=1;i<9;i++){
			let email = "user"+i+"@test.com";
			let username = "user"+i;
			console.log("creating a user with password 'test123' and username" +username+ " email: "+email);
			let id = Meteor.users.insert({profile:{username:username}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});

			if (i<=3 ) {
				Roles.addUsersToRoles(id, ['manage-surveys','manage-items','manage-views'],'researcher');
			}else{
				Roles.addUsersToRoles(id, [],'subscriber');
			}
		}
	}
});
