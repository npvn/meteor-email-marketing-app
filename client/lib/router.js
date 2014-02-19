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
        path: '/contact-list'
    });

    // Verify user's email using token in param
    this.route('emailVerification', {
        path: '/verify-email/:token',
        before: function() {
            console.log('verification is called with token: ' + this.params.token);
            Accounts.verifyEmail(this.params.token, function(error) {
                if ( ! error ) {
                    console.log('successed');
                    Router.go('contactList');
                }
                else {
                    console.log(error);
                    Router.go('emailVerificationError');
                }
            });
        }
    });

    // If email verification fails, this template is shown
    this.route('emailVerificationError',{
        path: '/verification-error'
    });

});