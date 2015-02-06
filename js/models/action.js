(function() {

    var Action;

    Action = function(attributes) {
        TinyMVC.Model.call(this, attributes);
    }

    Action.prototype = Object.create(TinyMVC.Model.prototype);

    App.Models.Action = Action;
    
}).call(this);