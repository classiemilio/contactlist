(function() {

    var ActionView;
    var template = "action-list";

    ActionView = function(model, elem) {
        var that = this;
        TinyMVC.View.call(this, model, elem, template);
        this.render();
       	for (var action in App.consts.Events) {
			(function(action) {
        		TinyMVC.Events.on(action, function() {
            		that.model.add(new App.Models.Action({
            			name: action,
            			title: App.consts.Events[action],
            			timestamp: Date.now()
            		}));
        		});
    		})(action);
    	}
    }

    ActionView.prototype = Object.create(TinyMVC.View.prototype);

    App.Views.ActionView = ActionView;

}).call(this);