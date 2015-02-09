(function() {

    var ContactView;
    var template = "contact-list";

    ContactView = function(model, elem) {
        TinyMVC.View.call(this, model, elem, template);
        model.fetch();
        this.render();
        if (window.localStorage) {
            var storedForm = localStorage.getItem("addFormData");
            if (storedForm && storedForm.length > 0) {
                storedForm = JSON.parse(storedForm);
                var form = document.forms[0];
                form.elements["firstname"].value = storedForm.firstName;
                form.elements["lastname"].value = storedForm.lastName;
                form.elements["phonenumber"].value = storedForm.phoneNumber;
            }
        }
    };

    ContactView.prototype = Object.create(TinyMVC.View.prototype);

    ContactView.prototype.render = function() {
        var that = this;
        TinyMVC.View.prototype.render.call(this);

        TinyMVC.$("#contact-list-add-form").on("submit", function(evt) {
            evt && evt.preventDefault();
            TinyMVC.Events.trigger("Add:Submitted");
            var newContact = new App.Models.Contact({
                firstName: this.elements["firstname"].value,
                lastName: this.elements["lastname"].value,
                phoneNumber: this.elements["phonenumber"].value,
                slide: "up",
                color: App.consts.Colors[Math.floor(Math.random()*App.consts.Colors.length)]
            });
            that.model.add(newContact);
            newContact.set("slide", "none");
            that.model.save();
            TinyMVC.Events.trigger("Add:Succeeded");
            localStorage.setItem("addFormData", "");
            return false;
        });

        TinyMVC.$(".remove-contact-btn").on("click", function(evt) {
            var elem = TinyMVC.$(evt.target || evt.srcElement);
            TinyMVC.Events.trigger("Remove:Clicked");
            var idx = elem.data("idx");
            if (idx) {
                that.model.remove(elem.data("idx"));
                that.model.save();
                TinyMVC.Events.trigger("Remove:Succeeded");
                return true;
            }
        });

        TinyMVC.$(".export-btn").on("click", function(evt) {
            evt && evt.preventDefault();
            TinyMVC.Events.trigger("Export:Clicked");
            return false;
        });

        TinyMVC.$("#contact-list-add-form input").on("keyup", function(evt) {
            TinyMVC.Events.trigger("Add:" + TinyMVC.$(this).data('formattedname') + ":Edited");
            var form = document.forms[0];
            if (window.localStorage) {
                localStorage.setItem("addFormData", JSON.stringify({
                    firstName: form.elements["firstname"].value,
                    lastName: form.elements["lastname"].value,
                    phoneNumber: form.elements["phonenumber"].value
                }));
            }
        });
    };

    App.Views.ContactView = ContactView;
}).call(this);