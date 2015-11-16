
if (Meteor.isClient) {
/*	Template.body.helpers({
	users: function () {
		return users.find({});
	}
}); */
		//Meteor.subscribe("users");
		Meteor.subscribe("userData");
		Meteor.subscribe("allUserData");


/*
	Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'firstname',
        fieldLabel:  'First Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your first name");
            return false;
          } else {
            return true;
          }
        },
		saveToProfile: true
    },  {
        fieldName: 'middlename',
        fieldLabel:  'Middle Name',
        inputType: 'text',
        visible: true,
		saveToProfile: true
    }, {
        fieldName: 'lastname',
        fieldLabel:  'Last Name',
        inputType: 'text',
        visible: true,
        validate: function(value, errorFunction) {
          if (!value) {
            errorFunction("Please write your last name");
            return false;
          } else {
            return true;
          }
        },
		saveToProfile: true
    }, {
        fieldName: 'parentemail',
        fieldLabel: 'Parent Email',
        inputType: 'text',
        visible: true,
		saveToProfile: true
    },{
        fieldName: 'evsdcode',
        fieldLabel: 'EVSD Code',
        inputType: 'text',
        visible: true,
		validate: function (value, errorFunction) {
			if (value == "EVSD") {
				return true;
			}
			else if (value == "EVSDOfficer") {
				return true;
			}
			else {
				errorFunction("Wrong code!");
				return false;
			}
		}
    }, {
        fieldName: 'terms',
        fieldLabel: 'I accept the terms and conditions',
        inputType: 'checkbox',
        visible: true,
        saveToProfile: false,
        validate: function(value, errorFunction) {
            if (value) {
                return true;
            } else {
                errorFunction('You must accept the terms and conditions.');
                return false;
            }
        }
    }]
});*/
Template.memberprofile.helpers ({
	'user' : function () {
		var currentUserId = Meteor.userId();
		return Meteor.users.find({_id: currentUserId});

	},
	'admin' : function(user) {
		var currentUserId = Meteor.userId();
		var currentUser = Meteor.users.find({_id: currentUserId});
		return currentUser;
	},
	'allusers' : function() {
		var allusers = Meteor.users.find();
		return allusers;
	},
	'showEditProfile' : function() {
		var showProfile = Session.get('showProfile');
		if (showProfile) {
			return true;
		} else {
			return false;
		}
	}
});
Template.memberprofile.events ({
	'click .removeuser' : function() {
		var removeuserid = this._id;
		Meteor.call("removeuser", removeuserid);
	},
	'click #editprofile' : function() {
		var userId = Meteor.userId();
		Session.set('showProfile', true);
	},
	'submit form' : function(event) {
		event.preventDefault();
		var currentUserId = Meteor.userId();
		var newname = event.target.changename.value;
		var newemail = event.target.changeemail.value;
		var newparentemail = event.target.changeparentemail.value;
		Meteor.call("edit", newname, newemail, newparentemail, currentUserId);
		Session.set('showProfile', false);
	},
	'mouseenter #editprofile' : function(event, template) {
		template.$('#editprofile').css('background-color', '#009999');
		template.$('#editprofile').css('color', 'white');
	},
	'mouseleave #editprofile' : function(event, template) {
		template.$('#editprofile').css('background-color', 'white');
		template.$('#editprofile').css('color', 'black');
	}
});
/*Template.groups.events ({
	'click #joingroup' : function(event, template) {
		template.$('input[name = "group"]:checked').each(function() {
			var currentUserId = Meteor.userId();
			if (this.value == 'speech') {
				Meteor.call('addtospeechgroup', currentUserId);
			}
			if (this.value == 'parli') {
				Meteor.call('addtoparligroup', currentUserId);
			}
			if (this.value == 'pufo') {
				Meteor.call('addtopufogroup', currentUserId);
			}
			if (this.value == 'ld') {
				Meteor.call('addtoldgroup', currentUserId);
			}
		});
	},
	'click #leavespeechgroup' : function() {
		var currentUserId = Meteor.userId();
		Meteor.call('leavespeech', currentUserId);
	},
	'click #leaveparligroup' : function() {
		var currentUserId = Meteor.userId();
		Meteor.call('leaveparli', currentUserId);
	},
	'click #leavepufogroup' : function() {
		var currentUserId = Meteor.userId();
		Meteor.call('leavepufo', currentUserId);
	},
	'click #leaveldgroup' : function() {
		var currentUserId = Meteor.userId();
		Meteor.call('leaveld', currentUserId);
	}

});
Template.sendemails.events({
	'submit #sendemail' : function(event, template) {
		event.preventDefault();
	template.$('input[name = "group"]:checked').each(function() {
		var subject = event.target.subject.value;
		var message = event.target.message.value;
		var name = event.target.name.value;
		if (this.value == 'speech') {
			var usernames = Meteor.users.find({speech: true});
			usernames.forEach(function(user) {
				var email = user.emails[0].address
				console.log(email);
				Meteor.call('sendemail', email, subject, message, name);
			});
			};
		if (this.value == 'parli') {
			var usernames = Meteor.users.find({parli: true});
			usernames.forEach(function(user) {
				var email = user.emails[0].address
				console.log(email);
				Meteor.call('sendemail', email, subject, message, name);
			});
			};
		if (this.value == 'pufo') {
			var usernames = Meteor.users.find({pufo: true});
			usernames.forEach(function(user) {
				var email = user.emails[0].address
				console.log(email);
				Meteor.call('sendemail', email, subject, message, name);
			});
		};
		if (this.value == 'ld') {
			var usernames = Meteor.users.find({ld: true});
			usernames.forEach(function(user) {
				var email = user.emails[0].address
				console.log(email);
				Meteor.call('sendemail', email, subject, message, name);
			});
		};
		if (this.value == 'all') {
			var usernames = Meteor.users.find({});
			usernames.forEach(function(user) {
				var email = user.emails[0].address
				console.log(email);
			});
		};
	});

	}
});*/
/*Template.tournamentregistration.events ({
	'submit form' : function(event, user) {
		event.preventDefault();
		var currentUserId = Meteor.userId();
		var tournament = getRadioVal( document.getElementById('tournaments'), 'tournament' );
		function getRadioVal(tournaments, tournament) {
			var tournament;
			var radios = tournaments.elements[tournament];

			for (var i=0, len=radios.length; i<len; i++) {
				if (radios[i].checked) {
					tournament = radios[i].value;
					break;
				}
			}
		}
	}
});*/
/*
Template.signup.events({
    'click button': function(e) {
      e.preventDefault();

      StripeCheckout.open({
        key: 'pk_test_v2dnj2EObaQYyFpqOS1K5Jqa',
        amount: 5000, // this is equivalent to $50
        name: 'Meteor Tutorial',
        description: 'On how to use Stripe ($50.00)',
        panelLabel: 'Pay Now',
        token: function(res) {
          stripeToken = res.id;
          console.info(res);
          Meteor.call('chargeCard', stripeToken);
        }
      });
    }
  }); */
	//Meteor.subscribe('users');
	//Meteor.subscribe('userData');
}
