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
    }
  };
  frontend.createApp = function(context) {
    context.App = Ember.Application.create();

    context.App.Router.map(function() {
      this.route('application', {
        path: '/:id'
      });
    });

    context.App.ApplicationRoute = Ember.Route.extend(frontend.route);
    context.App.ApplicationController = Ember.Controller.extend({});
    context.App.ApplicationView = Ember.View.extend({
      template: Ember.Handlebars.compile('<div id="outer-cont">Ember Talk</div>'),
    });


  };

  return frontend;
});
