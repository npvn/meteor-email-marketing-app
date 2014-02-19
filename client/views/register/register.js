Template.register.rendered = function() {

    // On render, hide the alert bar
    $('#alert').hide();

};

Template.register.events({

    'submit': function(e) {
        e.preventDefault();
        var email = $('#emailInput').val();
        var password = $('#passwordInput').val();
        // Register user
        Accounts.createUser( {email: email, password: password}, function(error) {
            // Notify user on error
            if ( error ) {
                $('#alert').text(error.reason);
                $('#alert').slideDown();
            } else {

            }
        });
    },

    // Switch to login view
    'click #loginSwitchButton': function(e) {
        e.preventDefault();
        Router.go('login');
    }

});