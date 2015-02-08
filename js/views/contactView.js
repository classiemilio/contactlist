(function() {

    var ContactView;
    var template = "contact-list";

    ContactView = function(model, elem) {
        TinyMVC.View.call(this, model, elem, template);
        model.fetch();
        this.render();
    };

    ContactView.prototype = Object.create(TinyMVC.View.prototype);

    ContactView.prototype.render = function() {
        var that = this;
        TinyMVC.View.prototype.render.call(this);
        
        TinyMVC.$("#contact-list-add-form").on("submit", function(evt) {
            evt && evt.preventDefault();
            that.model.add(new App.Models.Contact({
                firstName: this.elements["firstname"].value,
                lastName: this.elements["lastname"].value,
                phoneNumber: this.elements["phonenumber"].value
            }));
            that.model.save();
            return false;
        });

        TinyMVC.$(".remove-contact-btn").on("click", function(evt) {
            evt && evt.preventDefault();
            var elem = TinyMVC.$(evt.target || evt.srcElement);
            that.model.remove(elem.data("idx"));
            that.model.save();
            return false;
        });

        TinyMVC.$(".export-btn").on("click", function(evt) {
            evt && evt.preventDefault();
            TinyMVC.Events.trigger("Export:Clicked");
            return false;
        });
    };

    App.Views.ContactView = ContactView;
}).call(this);