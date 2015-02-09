(function() {

    var template = "json";
    var JsonView;

    JsonView = function(model, elem) {
        TinyMVC.View.call(this, model, elem, template);
        this.render();
        TinyMVC.Events.on("Export:Clicked", function() {
            var contacts = App.models.contacts.models;
            var jsonContacts = [];
            var numContacts = contacts.length;
            for (var i = 0; i < numContacts; ++i) {
                jsonContacts.push({
                    "First Name": contacts[i].get("firstName"),
                    "Last Name": contacts[i].get("lastName"),
                    "Phone Number": contacts[i].get("phoneNumber")
                })
            }
            TinyMVC.$("#json-area").attr("value", JSON.stringify(jsonContacts));
            TinyMVC.Events.trigger("Export:Succeeded")
        });
    }

    JsonView.prototype = Object.create(TinyMVC.View.prototype);

    JsonView.prototype.render = function() {
        var that = this;
        TinyMVC.View.prototype.render.call(this);
        TinyMVC.$("#json-import-form").on("submit", function(evt) {
            TinyMVC.Events.trigger("Import:Submitted");
            evt && evt.preventDefault();
            var json = this.elements["json"].value;
            try{
                json = JSON.parse(json);
            } catch(e){
                TinyMVC.Events.trigger("Import:Failed");
                return false;
            }
            App.models.contacts.clear();
            var jsonLen = json.length;
            for (var i = 0; i < jsonLen; ++i) {
                var newContact = new App.Models.Contact({
                    firstName: json[i]["First Name"],
                    lastName: json[i]["Last Name"],
                    phoneNumber: json[i]["Phone Number"],
                    slide: "left",
                    color: App.consts.Colors[Math.floor(Math.random()*App.consts.Colors.length)]
                });
                App.models.contacts.add(newContact);
            }
            TinyMVC.Events.trigger("Import:Succeeded");
            var numContacts = App.models.contacts.models.length;
            for (i = 0; i < numContacts; ++i) {
                App.models.contacts.models[i].set("slide", "none");
            }
            if (jsonLen > 0) {
                App.models.contacts.save();
            }
            return false;
        });
        TinyMVC.$("#json-import-form textarea").on("keyup", function(evt) {
            TinyMVC.Events.trigger("Json:Edited");
        });
    }

    App.Views.JsonView = JsonView;

}).call(this);