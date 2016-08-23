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
			// console.error(error, result);
		});


		return result;
	}
});