Contacts = new Meteor.Collection('contacts');


// Allow/deny rules for this collection
// Note: No allow rule is set for update and remove since we do not allow clients to perform these operations in our app

if ( Meteor.isServer) {

    // Only logged in user can insert new doc
    Contacts.allow({ insert: userLoggedIn });


    // Deny if doc contains illegal properties
    Contacts.deny({
        insert: function(userId, doc) {
            var docIsNotValid = false;
            var allowedFields = ['_id', 'name', 'email', 'tags', 'ownerId', 'modified'];
            _.each(doc, function(value, key) {
                if ( ! _.contains(allowedFields, key) ) docIsNotValid = true;
            });
            return docIsNotValid;
        }
    });


    // Deny if any property is invalid (e.g. email is empty)
    Contacts.deny({ insert: docContainsInvalidProp });


    // Deny if contactOwnerId is not the same as id of the currently logged in user
    Contacts.deny({ insert: ownerIdIsNotValid });


    // Deny if email already exists in this user's contact list
    Contacts.deny({
        insert: function(userId, doc) {
            var email = doc.email;
            var emailAlreadyExists = false;
            var cursor = Contacts.find({contactOwnerId: userId});
            cursor.rewind();
            cursor.forEach(function(contact) {
                if ( email === contact.email ) emailAlreadyExists = true;
            });
            return emailAlreadyExists;
        }
    });

}