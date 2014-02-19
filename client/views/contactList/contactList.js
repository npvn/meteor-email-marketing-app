Template.contactList.helpers({

    // Check if user has logged in with a verified email
    userEmailIsVerified: function() {
        return Meteor.user() && Meteor.user().emails[0].verified;
    },

    // Return a sorted contact list of this account
    contactList: function() {
        return Contacts.find( {}, {sort:{modified:-1}} );
    }

});


Template.contactList.events({

    // Show adding contact modal
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
            tags: $('#tagInput').val().split(','),
            contactOwnerId: Meteor.userId(),
            modified: (new Date()).valueOf()
        };
        Contacts.insert(newContact);
        $('#addNewContact').modal('hide');
    },

    // Show sending message modal
    'click .sendMessageButton': function(e) {
        // Cleanup previous texts
        $('#sendMessage input').val('');
        $('#sendMessage textarea').val('');
        // Display receiver's address
        var receiverAddress = $(e.target).closest('li').attr('id');
        $('#receiverAddress').text(receiverAddress);
        // Show modal
        $('#sendMessage').modal();
    },

    // New message submit
    'submit #sendMessageForm': function(e) {
        e.preventDefault();
        var newMessage = {
            receiver: $('#receiverAddress').text(),
            subject: $('#subjectInput').val(),
            body: $('#bodyInput').val(),
            messageOwnerId: Meteor.userId(),
            modified: (new Date()).valueOf()
        };
        Emails.insert(newMessage);
        $('#sendMessage').modal('hide');
    },

    // Filter apply handler
    'click #applyFilterButton': function() {
        var tag = $('#applyFilter').val().trim();
        Router.go('contactList', {tag: tag});
    }


});