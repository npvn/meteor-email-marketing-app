
Meteor.publish('contactList', function(userId, tag) {
   // Filter publication with user's id
   if ( ! tag ) return Contacts.find( {ownerId: userId} );
   // Filter publication with user's id and tag
   else return Contacts.find( {ownerId: userId, 'tags': {$in: [tag]}} );
});