define(function() {
  var frontend = {};
  frontend.route = {
    model: function(dyn) {
      return dyn;
    },
    setupController: function(c, m) {
      if (m.hasOwnProperty('id'))
        c.set('slide_id', m.id);
      return c;
      debugger;
    }
  };
  frontend.controller = {
    slide_id: null,
  };
  frontend.createApp = function(context) {
    context.App = Ember.Application.create();

    context.App.Router.map(function() {
      this.route('application', {
        path: '/:id'
      });
    });

    context.App.ApplicationRoute = Ember.Route.extend(frontend.route);
    context.App.ApplicationController = Ember.Controller.extend(frontend.controller);
    context.App.ApplicationView = Ember.View.extend({
      template: Ember.Handlebars.compile('<div id="outer-cont">Slide: {{slide_id}}</div>'),
    });


  };

  return frontend;
});
