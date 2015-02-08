(function() {

    var Contact, ContactCollection;

    Contact = function(attributes) {
        TinyMVC.Model.call(this, attributes);
    }

    Contact.prototype = Object.create(TinyMVC.Model.prototype);

    ContactCollection = function(models) {
        TinyMVC.Collection.call(this, models);
    }

    ContactCollection.prototype = Object.create(TinyMVC.Collection.prototype);

    ContactCollection.prototype.modelClass = Contact;

    // Used for storing and retrieving data
    ContactCollection.prototype.storageKey = function() {
    	return "contact_collection";
    };

    App.Models.Contact = Contact;
    App.Models.ContactCollection = ContactCollection;

}).call(this);