define(['./core.js'], function(core) {
  var frontend = {};
  core.frontend = frontend;
  frontend.routeFuns = {
    model: function(dyn) {
      return dyn;
    },
    setupController: function(c, m) {
      if (m.hasOwnProperty('id'))
        c.set('slide_id', m.id);
      return c;
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

    context.App.ApplicationRoute = Ember.Route.extend(frontend.routeFuns);
    context.App.ApplicationController = Ember.Controller.extend(frontend.controller);
    context.App.ApplicationView = Ember.View.extend({
      template: Ember.Handlebars.compile('\
        <div id="outer-cont">\
          <div class="head">\
            Slide ID: {{slide_id}}\
          </div>\
          <div class="content">\
            Slide: {{slideHtml}}\
          </div>\
        \
        </div>'),
    });


  };
  return core;
});
