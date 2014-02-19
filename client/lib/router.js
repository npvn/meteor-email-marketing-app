// Initial configuration
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});


// Route mapping
Router.map(function() {

    // Home
    this.route('home', {
       path: '/'
    });

});