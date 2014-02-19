Meteor.publish('contactList', function(userId, tag) {
   // Filter publication with user's id
   if ( ! tag ) return Contacts.find( {contactOwnerId: userId} );
   // Filter publication with user's id and tag
   else return Contacts.find( {contactOwnerId: userId, 'tags': {$in: [tag]}} );
});