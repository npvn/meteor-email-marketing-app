Template.contactList.helpers({

    // Return a sorted contact list for this account
    contactList: function() {
        return Contacts.find( {}, {sort:{modified:-1}} );
    }

});


Template.contactList.events({

    // Show adding contact modal
    'click #showAddNewContactModal': function() {
        $('#addNewContactError').hide();
        $('#addNewContact input').val('');
        $('#addNewContact').modal();
    },

    // New contact submit
    'submit #addNewContactForm': function(e) {
        e.preventDefault();

        var newContact = {
            name: $('#nameInput').val().trim(),
            email: $('#emailInput').val().trim(),
            tags: (function() {
                // Return an array of trimmed tags
                var tagArray = $('#tagInput').val().split(',');
                return _.map(tagArray, function(tag) { return tag.trim(); });
            })(),
            contactOwnerId: Meteor.userId(),
            modified: (new Date()).valueOf()
        };

        // Check if this email already exists in user's contact list
        var emailIsUnique = true;
        var cursor = Contacts.find();
        cursor.rewind();
        cursor.forEach(function(contact) {
            if ( contact.email === newContact.email ) emailIsUnique = false;
        });

        if ( ! emailIsUnique ) {
            $('#addNewContactError').text('This email already exists in your contact list.').slideDown();
        } else {
            Contacts.insert(newContact);
            $('#addNewContact').modal('hide');
        }
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
            subject: $('#subjectInput').val().trim(),
            body: $('#bodyInput').val(),
            messageOwnerId: Meteor.userId(),
            time: (new Date()).valueOf()
        };
        Emails.insert(newMessage);
        $('#sendMessage').modal('hide');
    },

    // Tag filtering apply handler
    'click #applyFilterButton': function() {
        var tag = $('#applyFilter').val().trim();
        Router.go('contactList', {tag: tag});
    }

});