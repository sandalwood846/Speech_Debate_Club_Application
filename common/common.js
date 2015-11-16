
FilesCollection = new Mongo.Collection ('files');
TournamentHistory = new Mongo.Collection ('tourneys');
ParentEmails = new Mongo.Collection ('emails');
Router.route('/tournamentregistration');
Router.route('/signup');
Router.route('/success');
Router.route('/count');
Router.route('/whyjoin');
Router.route('/ourteam');
Router.route('/events');
Router.route('/sendemails');
Router.route('/emailsent');
Router.route('/groups');
Router.route('/', {
    template: 'home',
	name: 'home'
});
Router.route('/profile', {
    template: 'profile',
	name: 'profile'
});
Router.route('/error');
Router.route('/waiver');
Router.route('/login', {
template: 'login',
name: 'login'
});
Router.route('/logout', {
template: 'logout',
name: 'logout'
});
