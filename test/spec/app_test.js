// load the entire module/library and pass to the test
define(['../../lib/app.js'], function(app) {
  window.app = app;


  // testHelpers
  var hasContent = function(selector, content) {
    return ok(selector.text().indexOf(content) > 0, 'has content ' + content);
  };

  module('Integration', {
    setup: function() {
      app.slides = ['test slide 1', 'test slide 2'];
    }
  });
  app.frontend.createApp(window);

  // use my testing element on the runner.html page.
  window.App.rootElement = '#frontend-integration-test';

  // defer readiness
  window.App.setupForTesting();

  // gives you all the helper methods like "vistest".
  window.App.injectTestHelpers();

  var setupFrontend = function() {
    window.App.reset();
  };

  test('loads a slide index and content by directly visiting the url by index', function() {
    setupFrontend();
    visit('/1');
    hasContent(find("#slideid"), 1);
    hasContent(find("#slidecontent"), 'test slide 2');
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
      app.slides = ['test', 'test2', 'test3'];
    }
  });

  test('has frontend', function() {
    ok(app.hasOwnProperty(
      'frontend'));
  });

  test('correct html', function() {
    equal(app.slideController.getHtml(app.slides, app.slideView.slideIndex()), 'test2');
  });

  test('correct index', function() {
    equal(app.slideController.getIndex(
        app.slideView.movementFunctions()),
      1);
  });

  test('correct index with initial', function() {
    equal(app.slideController.getIndex(
        app.slideView.movementFunctions(), 2),
      3);
  });

  test('view has movement functions', function() {
    equal(app.slideView.movementFunctions()[0],
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
