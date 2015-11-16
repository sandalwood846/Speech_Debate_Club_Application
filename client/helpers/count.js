Template.count.helpers({
'count': function() {
  return (Meteor.users.find().count());
}
});
