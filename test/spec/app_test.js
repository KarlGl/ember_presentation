// load the entire module/library and pass to the test
define(['../../lib/app.js'], function(app) {
  window.app = app;

  QUnit.done(function(details) {
    require(['../slides.js'], function(slides) {
      app.loadSlides(slides, details);
    });
  });

  // testHelpers
  var hasContent = function(selector, content) {
    return ok(selector.text().indexOf(content) > 0, 'has content ' + content);
  };

  module('Integration', {
    setup: function() {
      app.loadSlides(['test slide 1', 'test slide 2']);
    }
  });
  window.testApp = {};
  app.frontend.createApp(window.testApp);

  // use my testing element on the runner.html page.
  window.testApp.App.rootElement = '#frontend-integration-test';

  // defer readiness
  window.testApp.App.setupForTesting();

  // gives you all the helper methods like "vistest".
  window.testApp.App.injectTestHelpers();

  var setupFrontend = function() {
    window.testApp.App.reset();
  };

  test('loads a slide index and content by directly visiting the url with a slide index. Has correct slide count. Will show all the slides at the bottom.', function() {
    setupFrontend();
    visit('/1');
    hasContent(find("#slideid"), 1);
    hasContent(find("#slidecontent"), 'test slide 2');
    hasContent(find("#allslide-count"), 2);
    equal(find(".slide-item").length, 2, 'has all the slides in the app at the bottom.');
    hasContent(find(".slide-item").first(), 'test slide 1');
  });


  module('Ember Specific tests');
  var controller = {
    set: function(key, val) {
      this[key] = val;
    }
  }
  test('has create app function', function() {
    ok(app.frontend.hasOwnProperty(
      'createApp'));
  });

  test('loads Ember', function() {
    notEqual(Ember, undefined);
  });

  test('frontend has route that sets the slide id on the controller', function() {
    equal(app.frontend.routeFuns.setupController(controller, {
      id: 1
    }).slide_id, 1);
  });




  // use jasmine to run tests against the required code
  module('Core', {
    setup: function() {
      // prepare something for all following tests
      /* Event stream of all slide movements */
      app.movements = ['right', 'left', 'right'];

      /* Slides */
      app.loadSlides(['test', 'test2', 'test3']);
    }
  });

  test('has frontend', function() {
    ok(app.hasOwnProperty(
      'frontend'));
  });

  test('correct html', function() {
    equal(app.slideController.getHtml(app.slides, app.slideController.curSlideIndex()), 'test2');
  });

  test('correct index', function() {
    equal(app.slideController.getIndex(
        app.slideController.allMovementFunctions()),
      1);
  });

  test('correct index with initial', function() {
    equal(app.slideController.getIndex(
        app.slideController.allMovementFunctions(), 2),
      3);
  });

  test('has all movement functions', function() {
    equal(app.slideController.allMovementFunctions()[0],
      app.directions['right']);
  });

  test('should have move functions', function() {
    equal(app.slideController.movementFunctions(
      app.movements, app.directions
    )[0], app.directions['right']);
    equal(app.slideController.movementFunctions(
      app.movements, app.directions
    )[1], app.directions['left']);
  });

  test('should have directions to move', function() {
    ok(app.directions.hasOwnProperty('right'));
    ok(app.directions.hasOwnProperty('left'));
  });

});
