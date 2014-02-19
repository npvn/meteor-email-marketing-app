
/******** Helpers for both client and server ********/



/**************** Helpers for client ****************/
if ( Meteor.isClient ) {

    // Hide notification bars
    hideNotification = function() {
        $('#alert').hide();
        $('#notice').hide();
    };

    // Check if user has logged in with a verified email
    Handlebars.registerHelper('userEmailIsVerified', function() {
        return Meteor.user() && Meteor.user().emails[0].verified;
    });

}


/**************** Helpers for server ****************/
if ( Meteor.isServer ) {

}