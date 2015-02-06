(function() {

    var ContactView;
    var template = "contact-list";

    ContactView = function(model, elem) {
        TinyMVC.View.call(this, model, elem, template);
        this.render();
    }

    ContactView.prototype = Object.create(TinyMVC.View.prototype);

    App.Views.ContactView = ContactView;
}).call(this);