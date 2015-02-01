Router.route('/:template?/:id?', function () {

  var self = this;
  var path = self.location.get().pathname;
  var template = self.params.template;
  var id = self.params.id;

  // look for a collection named after the current route, if one exists
  var collection = Mongo.Collection.get(template);

  // root path defaults to the "home" template
  if (path === '/')
    return self.render('home');

  // remove the last character if we have an id
  template = id ? template.slice(0, -1) : template;

  self.render(template, {
    data: function() {

      // if there is no collection, don't return any data context
      if (! collection)
        return;

      if (id) {

        // if we have an id, return the document as data context
        return collection.findOne(this.params.id);

      } else {
        
        // if we don't have an id, return collection.find() as context as the "template" property
        var context = {};
        context[template] = collection.find();
        return context;

      }
    }
  });
});