Template.contactList.helpers({

    userEmailIsVerified: function() {
        if ( Meteor.user() && Meteor.user().emails[0].verified ) return true;
        else return false;
    }

});


Template.contactList.events({

    // Show add contact modal
    'click #showAddNewContactModal': function() {
        $('#addNewContact input').val('');
        $('#addNewContact').modal();
    },

    // New contact submit
    'submit #addNewContactForm': function(e) {
        e.preventDefault();
        var newContact = {
            name: $('#nameInput').val(),
            email: $('#emailInput').val(),
            tags: $('#tagInput').val().split(',')
        };
        Contacts.insert(newContact);
        // Close the modal
        $('#addNewContact').modal('hide');
    }


});