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
        triggers = triggers.split(" ");
        var numTriggers = triggers.length;
        for (var i = 0; i < numTriggers; ++i) {
            if (!(triggers[i] in this.listeners)) {
                this.listeners[triggers[i]] = [];
            } 
            this.listeners[triggers[i]].push({
                callback: callback,
                context: context
            });
        }
    };
        // let listeners of event know it triggered
    Model.prototype.trigger = function(event) {
        var tListeners = this.listeners[event];
        if (tListeners) {
            var listenerCount = tListeners.length;
            for (var i = 0; i < listenerCount; ++i) {
                var callback = tListeners[i];
                callback.callback.call(callback.context);
            }
        }
    };

    Model.prototype.set = function(key, value) {
        if (attributes[key] !== value) {
            attributes[key] = value;
            this.trigger("change");
        }
    };

    Model.prototype.get = function(key) {
        return attributes[key];
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
        var modelCount = this.models.length;
        for (var i = 0; i < modelCount; ++i) {
            if (this.models[i]._id == model._id) {
                this.models.splice(i);
                this.trigger("remove");
                return;
            }
        }
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

    /* Events
    // Not sure I'll use this
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
    };*/

    // Tiny jquery :)   
    $ = function(selector) {
        return {
            html: function(html) {
                var elems = document.querySelectorAll(selector);
                var numElems = elems.length;
                if (html) {
                    for (var i = 0; i < numElems; ++i) {
                        elems[i].innerHTML = html;
                    }
                } else if (elems.length > 0) {
                    return elems[0].innerHTML;
                }
            },
            append: function(html) {
                var elems = document.querySelectorAll(selector);
                var numElems = elems.length;
                if (html) {
                    for (var i = 0; i < numElems; ++i) {
                        elems[i].innerHTML += html;
                    }
                }       
            },
            attr: function(attr, value) {
                var elems = document.querySelectorAll(selector);
                var numElems = elems.length;
                if (value) {
                    for (var i = 0; i < numElems; ++i) {
                        elems[i].setAttribute(attr, value);
                    }    
                } else if (elems.length > 0) {
                    return elems[0].getAttribute(attr);
                } 
            },
            data: function(attr, value) {
                return this.attr("data-" + attr, value);
            },
            on: function(event, callback) {
                var elems = document.querySelectorAll(selector);
                var numElems = elems.length;
                for (var i = 0; i < numElems; ++i) {
                    elems[i]["on" + event] = function(evt) {
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