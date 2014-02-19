Template.register.rendered = function() {

    // On render, hide the notification bars
    hideNotification();

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
                $('#alert').text(error.reason).slideDown();
            // If account creation success, tell user to verify his email
            } else {
                hideNotification();
                $('input').val('');
                $('#notice').text('Please check your inbox for instruction to verify your email.').slideDown();
            }
        });
    },

    // Switch to login view
    'click #loginSwitchButton': function(e) {
        e.preventDefault();
        Router.go('login');
    }

});