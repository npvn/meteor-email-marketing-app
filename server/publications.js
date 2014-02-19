Meteor.publish('contactList', function(userId) {
   return Contacts.find( {contactOwnerId: userId} );
});