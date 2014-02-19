// Send verification email on user registration
Accounts.config({
   sendVerificationEmail: true
});

// Verification email template
if ( Meteor.isServer ) {

    Accounts.emailTemplates.siteName = "Meteor Email Marketing App";

    Accounts.emailTemplates.from = "Meteor Email Marketing App <accounts@example.com>";

    Accounts.emailTemplates.verifyEmail.subject = function () {
        return "Email verification for Meteor Email Marketing App";
    };

    Accounts.emailTemplates.verifyEmail.text = function (user, url) {
        url = url.replace('#/', '');
        return "Please follow this link to verify your email address:\n\n" + url;
    };
}
