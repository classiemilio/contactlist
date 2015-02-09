# [contactlist](http://classiemilio.github.io/contactlist/)

##### _contactlist_ is a simple web application to manage a contact list. It uses no external CSS or JS frameworks and no backend. Contacts are stored in the browser using HTML5 Local storage.


##Functionality
Using  [contactlist](http://classiemilio.github.io/contactlist/), you can do the following:

- Add a new contact (First name, Last name, Phone #). The contact will slide up into your contact last.
- Delete an existing contact.
- Export Contacts: This will convert your contacts list into JSON and store it in the JSON Contacts textarea on the right.
- Import Contacts: This will convert the JSON in the textarea to contacts and replace your list with them. These contacts will slide in from the right.
- Track user actions. On the box on the bottom-right, you can see user actions.
- Persist form data, in case you navigate away while you're typing in a new contact.
- Persist contact list. The contact list also persists when you navigate away, so you can come back and still find Rachel's phone number right where you left it. Both of these are persisted via HTML5's Local storage.

## TinyMVC

[contactlist](http://classiemilio.github.io/contactlist/) is built on top of a very lightweight framework I built for this app. TinyMVC is based on the ideas of Backbone.js, but is extremely lightweight (just a little over 300 lines; _**tiny!**_). TinyMVC contains the following:

- Its own tiny jQuery implementation with just a couple of basic functions for reading and manipulating the dom ( `append()`, `html()`, `attr()`, `data()`, and `on()`)
- Views: A View contains the logic and characteristics for a specific container element on the page. The view renders a specified template into an element on the page. The View also has a model and listens to changes on the model. When the model changes, the View re-renders the template. The View contains any logic associated with elements within the container element
- Templates: Templates take a context and render HTML based on it. TinyMVC templates have some very basic capabilities. It allows for simple blocks (`<% if variable %>`, `<% unless variable %>`, `<% each list %>` - iterates through the list, resolving the HTML within the block for each element, `<% eachreverse list %>` - same as `each` but iterates through a list in reverse, and `<% empty list %>` - executes the block if the list is empty) as well as printing variables into the HTML (via `<% print variable %>`)
- Models: Models contain data for our app's objects. Changes to the model fire off certain events that other parts of the app are listening to (like the View for re-rendering purposes).
- Collections: A list of models.
- Events: A way to listen for specific events (and execute a callback when the event is triggered). The Events module has two functions for both sides of the coin: `on()` (to listen) and `trigger()` (to trigger the event and notify the listeners).

