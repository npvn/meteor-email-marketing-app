Contacts = new Meteor.Collection('contacts');

Contacts.allow({
    insert:  function(userId) {
        return userId;
    }
});