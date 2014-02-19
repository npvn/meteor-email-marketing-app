Emails = new Meteor.Collection('emails');


Emails.allow({

    // Only logged in user can insert new doc
    insert: function(userId) {
        return userId;
    }

});


Emails.deny({

    // Deny the operation if doc contains illegal properties
    insert: function(userId, doc) {
        var docIsNotValid = false;
        var allowedFields = ['_id', 'receiver', 'subject', 'body', 'messageOwnerId', 'time'];
        for (var prop in doc)
            if ( ! _.contains(allowedFields, prop) ) docIsNotValid = true;

        return docIsNotValid;
    }
});