// Initial configuration
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});


// Route mapping
Router.map(function() {

    this.route('home', {
       path: '/',
       before: function() {
           // Redirect user according to current login state
           if ( ! Meteor.loggingIn() ) {
               this.stop();
               if ( Meteor.user() ) Router.go('contactList');
               else Router.go('login');
           }
       }
    });

    this.route('login', {
        path: '/login'
    });

    this.route('register', {
        path: '/register'
    });

    this.route('contactList', {
        path: '/contact-list/tag=:tag?',
        waitOn: function() {
            return Meteor.subscribe('contactList', Meteor.userId(), this.params.tag);
        },
        data: function() {
            return Contacts.find();
        }
    });

    // Verify user's email using token in param
    this.route('emailVerification', {
        path: '/verify-email/:token',
        before: function() {
            Accounts.verifyEmail(this.params.token, function(error) {
                if ( ! error ) Router.go('contactList');
                else Router.go('emailVerificationError');
            });
        }
    });

    // If email verification fails, this template is shown
    this.route('emailVerificationError',{
        path: '/verification-error'
    });

});