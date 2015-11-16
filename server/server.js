

if (Meteor.isServer) {

	Meteor.publish("userData", function() {
		return Meteor.users.find({_id: this.userId},
		      {fields: {'profile.firstName': 1, 'profile.middleName': 1, 'profile.lastName': 1, 'emails.address': 1}});
	});

	Meteor.publish("allUserData", function () {
		return Meteor.users.find({},
			    {fields: {'profile.firstName': 1, 'profile.middleName': 1, 'profile.lastName': 1}});
	});


	/*Accounts.onCreateUser (function(options, user){
		console.log("new user");
		user.profile = options.profile;
		user.profile.notuploaded = true;
		user.profile.pdfname = "";
		user.profile.base64 = "";
		user.profile.speech = false;
		user.profile.parli = false;
		user.profile.pufo = false;
		user.profile.ld = false;
		ParentEmails.insert ({
			child: user.username,
			parent: user.profile.parentemail
		});
		if (user.username == "Artem Raskin") {
			user.profile.admin = true;
			user.profile.classname = "";
		}
		else {
			user.profile.member = true;
		}
		if (user.profile.evsdcode == "EVSDOfficer") {
			user.profile.officer = true;
		}
		if (user.member == true) {
			user.profile.classname = "uploadedpics";
		}
		if (options.email) {
			Meteor.setTimeout(function() {
				Accounts.sendVerificationEmail(user._id);
			}, 2 * 1000);
		}
		Meteor.setTimeout(function() {
		var parentemail = user.profile.parentemail
		Email.send({to: parentemail, from: 'evhs.sd@gmail.com', subject: 'Your Email Has Been Linked To ' + user.username, text: 'Your email has been linked to the EVSD account of ' + user.username + '.'});
		}, 3 * 1000);
		return user;
});*/
	Meteor.methods({
		'removeuser' : function(removeuserid) {
			Meteor.users.remove({_id: removeuserid});
		},
		'edit' : function(newname, newemail, newparentemail, currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {username: newname}});
			Meteor.users.update({_id: currentUserId}, {$set: {'emails.0.address': newemail}});
			Meteor.users.update({_id: currentUserId}, {$set: {'profile.parentemail': newparentemail}});
		},
		'addtospeechgroup' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {speech: true}});
		},
		'addtoparligroup' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {parli: true}});
		},
		'addtoldgroup' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {ld: true}});
		},
		'addtopufogroup' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {pufo: true}});
		},
		'leavespeech' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {speech: false}});
		},
		'leaveparli' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {parli: false}});
		},
		'leavepufo' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {pufo: false}});
		},
		'leaveld' : function(currentUserId) {
			Meteor.users.update({_id: currentUserId}, {$set: {ld: false}});
		},
		'sendemail' : function(email, subject, message, name){
			Meteor.setTimeout(function() {
				Email.send({to: email, from: 'evhs.sd@gmail.com', subject: subject , text: message + 'sent by' + ' ' + name});
			}, 0);
		},
		 'chargeCard': function(stripeToken) {
      check(stripeToken, String);
      var Stripe = StripeAPI('sk_test_qamoO5uQyWjUfx9HkD1PmeUb');

      Stripe.charges.create({
        source: stripeToken,
        amount: 5000, // this is equivalent to $50
        currency: 'usd'
      }, function(err, charge) {
        console.log(err, charge);
      });
    }

	})
Meteor.publish("file", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'speech': 1, 'pufo': 1}});
  } else {
    this.ready();
  }
});

}
