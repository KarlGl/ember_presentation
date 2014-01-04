define(function() {
  var frontend = {};
  frontend.createApp = function(context) {
    context.App = Ember.Application.create();

    context.App.Router.map(function() {
      this.route('application', {
        path: '/:slide_id'
      });
    });

    context.App.ApplicationRoute = Ember.Route.extend({});
    context.App.ApplicationController = Ember.Controller.extend({});
    context.App.ApplicationView = Ember.View.extend({
      template: Ember.Handlebars.compile('<h1>Ember Talk</h1>'),
    });


  };

  return frontend;
});
