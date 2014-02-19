Template.login.rendered = function() {
    console.log('login render called');
    // On render, hide the alert bar
    $('#alert').hide();

};

Template.login.events({

    'submit': function(e) {
        e.preventDefault();
        var email = $('#emailInput').val();
        var password = $('#passwordInput').val();
        // Login
        Meteor.loginWithPassword(email, password, function(error) {
            // Notify user on error
            if ( error ) {
                $('#alert').text(error.reason);
                $('#alert').slideDown();
            } else {

            }
        });
    },

    // Switch to register view
    'click #registerSwitchButton': function(e) {
        e.preventDefault();
        Router.go('register');
    }
});