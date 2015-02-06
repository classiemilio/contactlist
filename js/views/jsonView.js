(function() {

    var template = "json";
    var JsonView;

    JsonView = function(model, elem) {
        TinyMVC.View.call(this, model, elem, template);
        this.render();
    }

    JsonView.prototype = Object.create(TinyMVC.View.prototype);

    JsonView.prototype.render = function() {
        var that = this;
        TinyMVC.View.prototype.render.call(this);
        TinyMVC.$("#json-import-form").on("submit", function(evt) {
            evt && evt.preventDefault();
            var json = this.elements["json"].value;
            try{
                json = JSON.parse(json);
            } catch(e){
                // TODO: show error message
                return false;
            }
            App.models.contacts.clear();
            var jsonLen = json.length;
            for (var i = 0; i < jsonLen; ++i) {
                App.models.contacts.add(new App.Models.Contact({
                    firstName: json[i]["First Name"],
                    lastName: json[i]["Last Name"],
                    phoneNumber: json[i]["Phone Number"]
                }));
            }
            return false;
        })
    }

    App.Views.JsonView = JsonView;

}).call(this);