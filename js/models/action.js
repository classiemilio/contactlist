(function() {

    var Action;

    Action = function(attributes) {
        TinyMVC.Model.call(this, attributes);
    }

    Action.prototype = Object.create(TinyMVC.Model.prototype);

    ActionCollection = function(models) {
        TinyMVC.Collection.call(this, models);
    }

    ActionCollection.prototype = Object.create(TinyMVC.Collection.prototype);

    ActionCollection.prototype.modelClass = Action;

    App.Models.Action = Action;
    App.Models.ActionCollection = ActionCollection;
    
}).call(this);