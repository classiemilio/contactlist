/*  Simple Contacts App. No Backend.
    Author: Emilio Lopez
*/

(function() {
    App.models.contacts = new App.Models.ContactCollection();
    var contactView = new App.Views.ContactView(App.models.contacts, "#contact-list");
    var actionView = new App.Views.ActionView(new App.Models.ActionCollection(), "#action-list");
    var jsonView = new App.Views.JsonView(null, "#json");
}).call(this);