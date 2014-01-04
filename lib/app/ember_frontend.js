define(['./core.js'], function(core) {
  var frontend = {};
  core.frontend = frontend;
  frontend.routeFuns = {
    model: function(dyn) {
      return dyn;
    },
    setupController: function(c, m) {
      c.set('app', core);
      if (m.hasOwnProperty('id'))
        c.set('slide_id', m.id);
      return c;
    }
  };

  //override how we load slides 
  core.loadSlidesEmber = function(slides, details) {
    Ember.run(this, function() {
      Ember.set(core.state, 'slides', slides);
    });
  };

  frontend.ctrlFuns = {
    slideHtml: function() {
      return this.getHtml(core.state.slides, this.getIndex(core.movements,
        this.slide_id));
    }.property().volatile(),
    slideIndex: function() {
      return this.curSlideIndex();
    }.property().volatile(),
    slideCount: Ember.computed.alias('allSlides.length'),
    allSlides: function() {
      console.debug("slide length changed, now there are: " + this.get('app.state.slides.length'));
      return this.get('app.state.slides');
      // safe, even it it changes to the same number.
    }.property('app.state.slides.length'),
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
        <div id="ember-talk">\
          <div id="slidecontent">\
            Slide: \
            <div id="mainslide" class="slidehtml">\
            {{slideHtml}}\
            </div>\
          </div>\
          <div class="head" id="slideid">\
            Slide ID: {{slideIndex}}\
          </div>\
          <div id="allslide-count">\
            Slide count: {{slideCount}}\
          </div>\
          <div id="allslides">\
          <div>All Slides:</div>\
            {{#each allSlides}}\
            <div class="slidehtml slide-item">\
              {{{this}}}\
            </div>\
            {{/each}}\
          </div>\
        \
        </div>'),
    });


  };

  return core;
});
