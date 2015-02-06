(function() {

    var Contact, ContactCollection;

    Contact = function(attributes) {
        TinyMVC.Model.call(this, attributes);
    }

    Contact.prototype = Object.create(TinyMVC.Model.prototype);

    ContactCollection = function(models) {
        TinyMVC.Collection.call(this, models);
    }

    Contact.prototype = Object.create(TinyMVC.Model.prototype);
    ContactCollection.prototype = Object.create(TinyMVC.Collection.prototype);

    App.Models.Contact = Contact;
    App.Models.ContactCollection = ContactCollection;

}).call(this);