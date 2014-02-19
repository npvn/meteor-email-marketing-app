Contacts = new Meteor.Collection('contacts');


Contacts.allow({

    // Only logged in user can insert new doc
    insert: function(userId) {
        return userId;
    }

});


Contacts.deny({

    // Deny the operation if doc contains illegal properties
    insert: function(userId, doc) {
        var docIsNotValid = false;
        var allowedFields = ['_id', 'name', 'email', 'tags', 'contactOwnerId', 'modified'];
        for (var prop in doc)
            if ( ! _.contains(allowedFields, prop) ) docIsNotValid = true;

        return docIsNotValid;
    }
});