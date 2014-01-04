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
    shit: false,
    slideHtml: function() {
      return this.getHtml(core.state.slides, this.get('slideIndex'));
    }.property('slideIndex', 'allSlides'),
    slideIndex: function() {
      return this.curSlideIndex();
    }.property(
      'app.state.movements.@each', 'shit'),
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

  frontend.createApp = function(context) {
    context.App = Ember.Application.create();

    context.App.Router.map(function() {
      this.route('slide', {
        path: '/:id'
      });
    });

    context.App.SlideRoute = Ember.Route.extend(frontend.routeFuns);
    context.App.SlideController = Ember.Controller.extend(core.slideController, frontend.ctrlFuns);
    context.App.SlideView = Ember.View.extend({
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
          <div id="movements">\
            Movements: {{app.state.movements}}\
          </div>\
          <div id="allslides">\
          <div>All Slides:</div>\
            {{#each allslidesWithIndex}}\
              <div class="slide-item-cont">\
                <div class="slide-number"> {{this.index}}\
                </div>\
                <div class="slidehtml slide-item">\
                  {{{this.item}}}\
                </div>\
              </div>\
            {{/each}}\
          </div>\
        \
        </div>'),

    });


  };

  return core;
});
