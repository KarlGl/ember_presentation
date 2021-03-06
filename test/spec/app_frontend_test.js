// load the entire module/library and pass to the test
define(['../../lib/app/ember_frontend.js'], function(app) {
  QUnit.done(function(details) {
    require(['../slides.js'], function(slides) {
      window.testApp.App.reset();
      window.slides = slides
      console.log("test details");
      console.log(details);
      var compileSlides = function(slides) {
        return _.map(slides, function(slide) {
          return jade.compile(slide)(_.merge(details, {
            exampleTest: window.exampleTest
          }));
        });
      };
      app.loadSlidesEmber(
        compileSlides(slides),
        details);
      app.loadMovementsEmber([0]);
      Ember.run(function() {
        testApp.App.Router.router.transitionTo('slide', 0);
      });

      // urls work again after tests!!.
      window.testApp.App.Router.reopen({
        location: 'hash'
      });
    });
  });

  // testHelpers
  var hasContent = function(selector, content) {
    return ok(selector.text().indexOf(content) > 0, 'has content ' + content);
  };

  module('Ember Integration', {
    setup: function() {
      app.loadSlidesEmber(['test slide 1', 'test slide 2']);
      app.loadMovementsEmber([1]);
    }
  });
  window.testApp = {};
  app.frontend.createApp(window.testApp);

  // use my testing element on the runner.html page.
  window.testApp.App.rootElement = '#frontend-integration-test';

  // defer readiness
  window.testApp.App.setupForTesting();

  // gives you all the helper methods like "visit".
  window.testApp.App.injectTestHelpers();

  var setupFrontend = function() {
    window.testApp.App.reset();
    app.loadMovementsEmber([]);
  };

  window.exampleTest = function() {
    /* Test that clicking a slide will show it, 
      / and changes the active classes at the bottom. */
    // Custom function to reset any state.
    setupFrontend();
    // goto url for first slide.
    visit('/0');
    // Make sure all 6 assertions run.
    expect(6);
    // has content of first slide.
    hasContent(find("#slidecontent"), 'test slide 1');
    ok(find(".slide-item-cont").first().hasClass('active'),
      '1st slide will be active.');
    ok(!find(".slide-item-cont").last().hasClass('active'),
      '2nd slide will be inactive.');

    click('.slide-item-cont:last').then(function() {
      hasContent(find("#slidecontent"), 'test slide 2');
      ok(find(".slide-item-cont").last().hasClass('active'),
        '2nd slide will be active.');
      ok(!find(".slide-item-cont").first().hasClass('active'),
        '1st slide will be inactive.');
    });
  };
  test('Clicking a slide will show it, and changes the active classes at the bottom.', window.exampleTest);


  test('loads a slide index and content by directly visiting the url with a slide index. Has correct slide count. Will show all the slides at the bottom. Class will be active.', function() {
    setupFrontend();
    visit('/1');
    expect(7);
    hasContent(find("#slideid"), 1);
    hasContent(find("#slidecontent"), 'test slide 2');
    hasContent(find("#allslide-count"), 2);

    wait().then(function() {
      deepEqual(app.state.movements, [1])
    });
    equal(find(".slide-item").length, 2, 'has all the slides in the app at the bottom.');
    hasContent(find(".slide-item").first(), 'test slide 1');
    ok(find(".slide-item-cont").last().hasClass('active'), 'Class will be active.');
  });


  module('Ember Specific tests');
  var controller = {
    set: function(key, val) {
      this[key] = val;
    }
  }
  test('can load slides', function() {
    app.loadSlidesEmber(['foo']);
    equal(app.state.slides[0], 'foo');
  });
  test('has create app function', function() {
    ok(app.frontend.hasOwnProperty(
      'createApp'));
  });

  test('loads Ember', function() {
    notEqual(Ember, undefined);
  });

  test('frontend route sets the slide id on the controller from arguments', function() {
    app.frontend.routeFuns.setupController(controller, {
      id: 1
    });
    equal(app.state.movements[0], 1);
  });

  return app;
});
