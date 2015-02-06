(function() {

	var ActionView;
	var template = "action-list";

	ActionView = function(model, elem) {
		TinyMVC.View.call(this, model, elem, template);
		this.render();
	}

	ActionView.prototype = Object.create(TinyMVC.View.prototype);

	App.Views.ActionView = ActionView;

}).call(this);