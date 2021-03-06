define(['./core.js'], function(core) {
  var frontend = {};
  core.frontend = frontend;
  frontend.routeFuns = {
    model: function(dyn) {
      return dyn;
    },
    setupController: function(c, m) {
      c.set('app', core);
      core.loadMovementsEmber(core.state.movements.concat([
        m.id ? parseInt(m.id) : 0
      ]));
      return c;
    }
  };

  //override how we load slides 
  core.loadSlidesEmber = function(slides) {
    return Ember.run(this, function() {
      Ember.set(core.state, 'slides', slides);
    });
  };

  //override how we set movements
  core.loadMovementsEmber = function(movements) {
    return Ember.run(this, function() {
      Ember.set(core.state, 'movements', movements);
    });
  };

  frontend.ctrlFuns = {
    slideHtml: function() {
      var html = this.getHtml(core.state.slides, this.get('slideIndex')).htmlSafe();
      return html;
    }.property('slideIndex', 'allSlides'),
    slideIndex: function() {
      var ind = this.getLastIndex(this.get('app.state.movements'));
      if (ind == 9) {
        console.debug('crazy time');
        window.apps = [];
        window.apps.push({});
        // frontend.createApp(window.apps[0], '#nested-app');
      }
      return ind;
    }.property(
      'app.state.movements.length'),
    slideCount: Ember.computed.alias('allSlides.length'),
    allSlides: function() {
      console.debug("slide length changed, now there are: " + this.get('app.state.slides.length'));
      return this.get('app.state.slides');
      // safe, even it it changes to the same number.
    }.property('app.state.slides.length'),

    allslidesWithIndex: function() {
      return this.get('allSlides').map(function(item, index) {
        return {
          item: item,
          index: index
        };
      });
    }.property('allSlides.length'),
  };

  frontend.createApp = function(context, selector) {
    context.App = Ember.Application.create({
      rootElement: selector
    });

    context.App.Router.map(function() {
      this.route('slide', {
        path: '/:id'
      });
    });
    context.App.state = _.clone(core.state);

    context.App.SlideRoute = Ember.Route.extend(frontend.routeFuns);
    context.App.SlideController = Ember.Controller.extend(core.slideController, frontend.ctrlFuns);
    context.App.SlideView = Ember.View.extend({
      template: Ember.Handlebars.compile('\
        <div id="ember-talk">\
          <div id="slidecontent">\
            Current Slide: \
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
          <div id="movements">\
            Movements: {{app.state.movements}}\
          </div>\
          <div id="allslides">\
          <div>All Slides:</div>\
            {{#each allslidesWithIndex}}\
              {{#link-to "slide" this.index class="slide-item-cont"}}\
                  <div class="slide-number"> {{this.index}}\
                  </div>\
                  <div class="slidehtml slide-item">\
                    {{{this.item}}}\
                  </div>\
              {{/link-to}}\
            {{/each}}\
          </div>\
        \
        </div>'),

    });


  };

  return core;
});
