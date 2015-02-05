/*	Super lightweight MVC framework.
	This framework only has some very basic things: 
		* Model
		* View
		* Events
		* $ (tiny jquery)
	Author: Emilio Lopez
*/


(function() {
	var Model, View, Template, Events, $;

	// This shim taken from Crockford: http://javascript.crockford.com/prototypal.html
	if (typeof Object.create !== 'function') {
	  Object.create = function (o) {
	    function F() {}
	    F.prototype = o;
	    return new F();
	  };
	}

	/* Model */
	Model = function(attributes) {
		this.attributes = attributes || {};
	};

	Model.prototype.set = function(key, value) {
		attributes[key] = value;
	};

	Model.prototype.get = function(key) {
		return attributes[key];
	};

	// TODO 
	Model.prototype.save = function() {

	};

	Model.prototype.fetch = function() {

	};

	Collection = function(models) {
		Model.call(this);
		this.models = models;
	}
	Collection.prototype = Object.create(Model.prototype);

	Collection.prototype.save = function() {

	};

	Collection.prototype.fetch = function() {

	};

	/* View */
	View = function(model) {
		// elem, model, and template are expected to be set by subclasses of View
		this.elem = null,
		this.model = model;
		this.template = null;
	};

	View.prototype.render = function() {
		if (this.template) {
			var element = $(elem);
			if (element) {
				element[0].innerHtml = $(this.template)[0].innerHtml;
			}
		}
	};

	/* Events */
	Events = {
		listenMap: {},
		// function to listen to an event
		on: function(event, callback) {
			if (!(event in listenMap)) {
				listenMap[event] = [];
			} 
			listenMap[event].push(callback);
		},
		// let listeners of event know it triggered
		trigger: function(event) {
			var listeners = listenMap[event];
			if (listeners) {
				var listenerCount = listeners.length;
				for (var i = 0; i < listenerCount; ++i) {
					listeners[i]();
				}
			}
		}
	};

	// Tiny jquery :)	
	$ = function(selector) {
		return document.querySelectorAll(selector);
	};

	TinyMVC = {
		'Model': Model,
		'View': View,
		'Events': Events,
		'$': $
	}
}).call(this);