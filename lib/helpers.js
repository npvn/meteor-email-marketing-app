
/******** Helpers for both client and server ********/



/**************** Helpers for client ****************/
if ( Meteor.isClient ) {

    // Hide notification bars
    hideNotification = function() {
        $('#alert').hide();
        $('#notice').hide();
    };

}


/**************** Helpers for server ****************/
if ( Meteor.isServer ) {

}