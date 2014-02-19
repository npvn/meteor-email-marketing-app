Template.register.rendered = function() {

    // On render, hide the notification bars
    hideNotification();

};


Template.register.events({

    // New user registering handler
    'submit': function(e) {
        e.preventDefault();
        var email = $('#emailInput').val();
        var password = $('#passwordInput').val();
        var passwordConfirm = $('#passwordConfirm').val();
        // Check password length
        if ( password.length < 6 )
            $('#alert').text('Password should be at least 6 character long.').slideDown();
        // Check if the two password fields match
        else if ( password !== passwordConfirm )
            $('#alert').text('The two passwords do not match.').slideDown();
        // Register user
        else {
            Accounts.createUser( {email: email, password: password}, function(error) {
                // Notify if there is error in account creation
                if ( error ) {
                    $('#alert').text(error.reason).slideDown();
                // If account creation success, tell user to verify his email
                } else {
                    hideNotification();
                    $('input').val('');
                    $('#notice').text('Please check your inbox for instruction to verify your email.').slideDown();
                }
            });
        }
    },

    // Switch to login view
    'click #loginSwitchButton': function(e) {
        e.preventDefault();
        Router.go('login');
    }

});