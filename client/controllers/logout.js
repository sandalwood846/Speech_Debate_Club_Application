
Meteor.startup(function(){
  Meteor.logout(function() {
    Router.go("home");
  })

})

Template.logout.helpers({
  logout: function () {
    Meteor.logout(function() {
      Router.go("home");
      window.location = "http://localhost:3000/"
    })
  }
});


Template.logout.onCreated(function () {
  Meteor.logout(function() {
    Router.go("home");
    window.location = "http://localhost:3000/"
  })
});
