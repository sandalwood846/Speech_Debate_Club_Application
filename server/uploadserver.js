

if (Meteor.isServer) {
	/*Meteor.publish('files', function(file){
		console.log("publish", file);
		return FilesCollection.find({
			name:file
		});
	});*/
	Meteor.methods ({
		'saveFile' : function(name, buffer) {
			FilesCollection.insert({
				name: name,
				base64: buffer
			})
			var currentUserId = Meteor.userId();
			console.log(currentUserId);
			Meteor.users.update({_id: currentUserId}, {$set: {'profile.base64': buffer}});
			Meteor.users.update({_id: currentUserId}, {$set: {'profile.pdfname': name}});
			Meteor.users.update({_id: currentUserId}, {$set: {'profile.notuploaded': false}});
			Meteor.publish("userData", function () {
					if (this.userId) {
							return FilesCollection.find({name: name},{fields: {'base64': 1}});
					} else {
							this.ready();
					}
			});
		}
	});
}


