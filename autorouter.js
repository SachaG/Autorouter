Router.route('/:template?/:id?', function () {

  var path = this.location.get().pathname;
  var template = this.params.template;

  if (!!template) {
    var singleTemplate = this.params.template.slice(0, - 1);
    var id = this.params.id;
    var collection = Mongo.Collection.get(template);
    var context = {};
  }

  if (path === "/") {

    // Case 1: root path
    this.render('home');

  } else if (!!template && !!id) {

    // Case 2: single item ("show") route
    this.render(singleTemplate, {

      data: function () {

        if (typeof collection !== "undefined") {
          context = collection.findOne(this.params.id);
        }
        return context;

      }

    });

  } else if (!!template) {

    // Case 3: item list ("index") route
    this.render(template, {

      data: function () {

        if (typeof collection !== "undefined") {
          context[template] = collection.find();
        }
        return context;

      }

    });

  }

});