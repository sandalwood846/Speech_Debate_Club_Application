
if (Meteor.isClient) {
/*Tracker.autorun(function(computation) {
	Meteor.subscribe('files', Session.get('file'));
});*/
Template.memberprofile.events({
	'change #file-upload' : function (event, template) {
		var file = event.target.files[0];
		var name = event.target.files[0].name;
		
		var reader = new FileReader();
		reader.onload = function (file) {
			var result = reader.result;
			Meteor.call('saveFile', name, result);
		}
		reader.readAsDataURL(file);
	}
});
Template.memberprofile.helpers ({
	'file' : function () {
		return FilesCollection.find();
	},
	'user' : function () {
		var currentUserId = Meteor.userId();
		return Meteor.users.find({_id: currentUserId});
	}
})
	
}




