Emails = new Meteor.Collection('emails');

Emails.allow({

    insert: function(userId) {
        return userId;
    }

});