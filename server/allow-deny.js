Surveys.allow({
	insert: function (userId, doc) {
		if (Roles.userIsInRole(userId,'manage-surveys', 'researcher')) {
			return doc._owner === userId;
		}
	},
	update: function (userId, doc, fields, modifier) {
		if (doc._owner === userId && Roles.userIsInRole(userId,'manage-surveys', 'researcher')) {
			let allowedFliedsOnly = fields.every(function(elem){
				return ['_owner','_schema','_createdAt'].indexOf(elem) < 0;
			});

			return allowedFliedsOnly;
		}
	},
	remove: function (userId, doc) {
		if (Roles.userIsInRole(userId,'manage-surveys', 'researcher')) {
			return doc._owner === userId;
		}
	},
});

Items.allow({
	insert: function (userId, doc) {
		// console.log('insert', doc);
		if (Roles.userIsInRole(userId,'manage-items', 'researcher')) {
			return doc._owner === userId;
		}
	},
	update: function (userId, doc, fields, modifier) {
		// console.log('update', doc);
		if (doc._owner === userId && Roles.userIsInRole(userId,'manage-items', 'researcher')) {
			let allowedFliedsOnly = fields.every(function(elem){
				return ['_owner','_createdAt'].indexOf(elem) < 0;
			});
			return allowedFliedsOnly;
		}
	},
	remove: function (userId, doc) {
		if (Roles.userIsInRole(userId,'manage-items', 'researcher')) {
			return doc._owner === userId;
		}
	},
});