Router.route('/:template?/:id?', function () {
  var self = this;
  var path = self.location.get().pathname;
  var template = self.params.template;
  var id = self.params.id;
  var collection;

  try {
    collection = Mongo.Collection.get(template);
  } catch (error) {/* collection doesn't exist */}
  
  if (! template)
    return;

  if (path === '/')
    self.render('home');

  // remove the last character if we have an id
  template = id ? template.slice(0, -1) : template;

  self.render(template, {
    data: function() {
      if (! collection)
        return;

      if (id)
        return collection.findOne(this.params.id);
      else {
        var context = {};
        context[template] = collection.find();
        return context;
      }
    }
  });
});