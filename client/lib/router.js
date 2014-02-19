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
           this.stop();
           if ( Meteor.user() ) Router.go('contactList');
           else Router.go('login');
       }
    });

    this.route('login', {
        path: '/login'
    });

    this.route('register', {
        path: '/register'
    });

});