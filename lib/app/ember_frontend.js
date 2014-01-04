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

  frontend.ctrlFuns = {
    slideHtml: function() {
      return this.getHtml(core.slides, this.getIndex(app.movements,
        this.slide_id));
    }.property().volatile(),
    slideIndex: function() {
      return this.curSlideIndex();
    }.property().volatile(),
  };

  frontend.createApp = function(context) {
    context.App = Ember.Application.create();

    context.App.Router.map(function() {
      this.route('application', {
        path: '/:id'
      });
    });

    context.App.ApplicationRoute = Ember.Route.extend(frontend.routeFuns);
    context.App.ApplicationController = Ember.Controller.extend(core.slideController, frontend.ctrlFuns);
    context.App.ApplicationView = Ember.View.extend(core.slideView, {
      template: Ember.Handlebars.compile('\
        <div id="outer-cont">\
          <div class="head" id="slideid">\
            Slide ID: {{slideIndex}}\
          </div>\
          <div id="slidecontent">\
            Slide: {{slideHtml}}\
          </div>\
        \
        </div>'),
    });


  };
  return core;
});
