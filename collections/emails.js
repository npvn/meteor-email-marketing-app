Emails = new Meteor.Collection('emails');


// Allow/deny rules for this collection
// Note: No allow rule is set for update and remove since we do not allow clients to perform these operations in our app

if ( Meteor.isServer ) {

    // Only logged in user can insert new doc
    Emails.allow({ insert: userLoggedIn });


    // Deny if doc contains illegal properties
    Emails.deny({
        insert: function(userId, doc) {
            var docIsNotValid = false;
            var allowedFields = ['_id', 'receiver', 'subject', 'body', 'ownerId', 'time'];
            _.each(doc, function(value, key) {
                if ( ! _.contains(allowedFields, key) ) docIsNotValid = true;
            });
            return docIsNotValid;
        }
    });


    // Deny if any property is invalid (e.g. email is empty)
    Emails.deny({ insert: docContainsInvalidProp });


    // Deny if contactOwnerId is not the same as id of the currently logged in user
    Emails.deny({ insert: ownerIdIsNotValid });

}