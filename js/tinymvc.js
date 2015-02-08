/*  Super lightweight MVC framework.
    This framework only has some very basic things: 
        * Model
        * Collection
        * View
        * Template
        * Events
        * $ (tiny jquery)
    Author: Emilio Lopez
*/


(function() {
    var Model, View, Template, Events, $;

    // This shim taken from Crockford: http://javascript.crockford.com/prototypal.html
    // Most browsers should have it already, but just in case.
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
        this.listeners = {};
        this._id = Date.now(); // Using current date so this will be inique for every model.
    };
    
    // function to listen to an event on the model
    Model.prototype.on = function(triggers, callback, context) {
        Events.on(triggers, callback, context, this.listeners);
    };
        // let listeners of event know it triggered
    Model.prototype.trigger = function(event) {
        Events.trigger(event, this.listeners);
    };

    Model.prototype.set = function(key, value) {
        if (this.attributes[key] !== value) {
            this.attributes[key] = value;
            this.trigger("change");
        }
    };

    Model.prototype.equals = function(other) {
        return (other instanceof Model && this.get("_id") === other.get("_id"));
    };

    Model.prototype.get = function(key) {
        return this.attributes[key];
    };

    // TODO 
    Model.prototype.save = function() {

    };

    Model.prototype.fetch = function() {

    };

    Model.prototype.toJson = function() {
        if (this.models) {
            return this.models;
        } else {
            return this.attributes;
        }
    };

    Collection = function(models) {
        Model.call(this);
        this.models = models || [];
    }
    Collection.prototype = Object.create(Model.prototype);

    Collection.prototype.save = function() {

    };

    Collection.prototype.fetch = function() {

    };

    Collection.prototype.add = function(model) {
        this.models.push(model);
        this.trigger("add");
    };

    Collection.prototype.remove = function(model) {
        var idx = -1;
        if (typeof model == "number") {
            idx = model;
        }
        // TODO finish
        var modelCount = this.models.length;
        for (var i = 0; i < modelCount; ++i) {
            if (this.models[i].equals(model)) {
                idx = i;
                break;
            }
        }
        this.models.splice(idx);
        this.trigger("remove");
    };

    Collection.prototype.clear = function() {
        this.models = [];
        this.trigger("clear");
    }

    /* Template */

    Template = function(name) {
        this.html = $('#' + name + '-template').html();
    };

    // TODO: Make this more efficient
    // This method recursively resolves blocks in the template.
    Template.prototype.resolve = function(context, customHtml) {
        context = context || {};
        var resolved = customHtml || this.html;

        // Resolve control structures

        // Actual templating frameworks have much more complicated Regexes, but this will do for now.
        // After all, this is TinyMVC; we need a TinyRegex.
        var re = /(<% print (.+?) %>|<% (each|if|unless) (.+?) %>([\s\S]*)<% end %>)/;
        var match = re.exec(resolved);
        while (match) {
            var matchLength = match[0].length;
            var left = resolved.substring(0, match.index-1);
            var right = resolved.substring(match.index + matchLength);
            var middle = "";

            // match[0]: Full match
            // match[3]: action word - either each, if, unless
            // match[4]: variable action word applies to
            // match[5]: html block to include/exclude/iterate over

            var unless = false;
            switch (match[3]) {
                case "each":
                    var arr = context[match[4]]; // get the object from contect to iterate over
                    if (arr) {
                        var arrLen = arr.length;
                        for (var i = 0; i < arrLen; ++i) {
                            var curContext = arr[i].toJson();
                            curContext.index = i;
                            middle += this.resolve(curContext, match[5]);
                        }
                    }
                    break
                case "unless":
                    unless = true;
                case "if":
                    var attr = context[match[4]];
                    if ((unless && !attr) || (!unless && attr)) {
                        middle += this.resolve(context, match[5]);
                    }
                    break;
                default: // print
                    var attr = match[2];
                    attr = attr.split(".");
                    var cur = context;
                    for (var i = 0; i < attr.length; ++i) {
                        cur = context[attr[i]];
                    }
                    middle += cur;
                    break;
            }
            resolved = left + middle + right;
            match = re.exec(resolved);
        }
        return resolved;
    }

    /* View */
    View = function(model, elem, template) {
        // elem, model, and template are expected to be set by subclasses of View
        this.elem = elem,
        this.model = model;
        if (this.model) {
            this.model.on("change add remove clear", this.render, this);
        }
        this.template = template;
    };

    View.prototype.render = function() {
        if (this.template) {
            var element = $(this.elem);
            if (element) {
                var templateObj = new Template(this.template);
                element.html(templateObj.resolve({
                    model: this.model && this.model.toJson()
                }));
            }
        }
    };

    /* Events */
    Events = {
        listeners: {},

        // function to listen to an event
        on: function(triggers, callback, context, listeners) {
            listeners = listeners || this.listeners;
            triggers = triggers.split(" ");
            var numTriggers = triggers.length;
            for (var i = 0; i < numTriggers; ++i) {
                if (!(triggers[i] in listeners)) {
                    listeners[triggers[i]] = [];
                } 
                listeners[triggers[i]].push({
                    callback: callback,
                    context: context
                });
            }
        },

        // let listeners of event know it triggered
        trigger: function(event, listeners) {
            listeners = listeners || this.listeners;
            var tListeners = listeners[event];
            if (tListeners) {
                var listenerCount = tListeners.length;
                for (var i = 0; i < listenerCount; ++i) {
                    var callback = tListeners[i];
                    callback.callback.call(callback.context);
                }
            }
        }
    };

    // Tiny jquery :)   
    $ = function(elements) {
        return {
            html: function(html) {
                return this.attr("innerHTML", html);
            },
            setElements: function() {
                if (typeof elements == "string") {
                    elements = document.querySelectorAll(elements);
                } else if (!(elements instanceof Array)) {
                    elements = [ elements ];
                }  
            },
            append: function(html) {
                this.setElements();
                var numElems = elements.length;
                if (html) {
                    for (var i = 0; i < numElems; ++i) {
                        elements[i].innerHTML += html;
                    }
                }       
            },
            attr: function(attr, value) {
                this.setElements();
                var numElems = elements.length;
                if (value) {
                    for (var i = 0; i < numElems; ++i) {
                        if (attr == "value") {
                           elements[i].value = value;
                        } else if (attr == "innerHTML") { 
                            elements[i].innerHTML = value;
                        } else {
                            elements[i].setAttribute(attr, value);
                        }
                    }    
                } else if (elements.length > 0) {
                    if (attr == "value") {
                       return elements[0].value;
                    } else if (attr == "innerHTML") { 
                        return elements[0].innerHTML;
                    } else {
                        return elements[0].getAttribute(value);
                    }
                } 
            },
            data: function(attr, value) {
                return this.attr("data-" + attr, value);
            },
            on: function(event, callback) {
                this.setElements(); 
                var numElems = elements.length;
                for (var i = 0; i < numElems; ++i) {
                    elements[i]["on" + event] = function(evt) {
                        callback.call(this, evt);
                    };
                }
            }
        }
    };

    window.TinyMVC = {
        'Model': Model,
        'Collection': Collection,
        'View': View,
        'Events': Events,
        '$': $
    }
}).call(this);