Template.header.helpers({

    // Return email of current logged in user
    userEmail: function() {
        return Meteor.user().emails[0].address;
    }

});


Template.header.events({

   // Logout event handler
   'click #logoutCommand': function() {
       Meteor.logout();
       Router.go('login');
   }

});