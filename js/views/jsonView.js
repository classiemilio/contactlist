(function() {

	var template = "json";
	var JsonView;

	JsonView = function(model, elem) {
		TinyMVC.View.call(this, model, elem, template);
		this.render();
	}

	JsonView.prototype = Object.create(TinyMVC.View.prototype);

	App.Views.JsonView = JsonView;

}).call(this);