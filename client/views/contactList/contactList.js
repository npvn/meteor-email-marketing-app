Template.contactList.helpers({

    userEmailIsVerified: function() {
        if ( Meteor.user() && Meteor.user().emails[0].verified ) return true;
        else return false;
    }

});