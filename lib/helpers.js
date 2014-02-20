
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

    // Allow rule helper: Check if user has logged in
    userLoggedIn = function(userId) {
        return userId;
    };

    // Deny rule helper: Check if doc contains invalid property (e.g. email is empty)
    docContainsInvalidProp = function(userId, doc) {
        var docContainsInvalidProperty = false;
        _.each(doc, function(value, key) {
            /* Actually this logic is too simple. We can improve by, for example, checking the email against a regex pattern */
            if ( key !== 'tags' && value === '' ) docContainsInvalidProperty = true;
        });
        return docContainsInvalidProperty;
    };

    // Deny rule helper: Check if owner id is the same as id of the currently logged in user
    ownerIdIsNotValid = function(userId, doc) {
        return userId !== doc.ownerId;
    };

}