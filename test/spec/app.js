// load the entire module/library and pass to the test
define(['app'], function(et) {

  module('Integration');
  et.frontend.createApp(window);

  // use my testing element on the runner.html page.
  window.App.rootElement = '#frontend-integration-test';

  // defer readiness
  window.App.setupForTesting();

  // gives you all the helper methods like "vistest".
  window.App.injectTestHelpers();

  QUnit.testStart(function() {
    window.App.reset();
  });

  test('loads our tests', function() {
    // visit('/');
    ok(true);
  });


  module('Frontend tests');
  test('has create app function', function() {
    ok(et.frontend.hasOwnProperty(
      'createApp'));
  });

  test('loads Ember', function() {
    notEqual(Ember, undefined);
  });




  // use jasmine to run tests against the required code
  module('Core');

  test('has frontend', function() {
    ok(et.hasOwnProperty(
      'frontend'));
  });

  test('correct html', function() {
    equal(et.slideController.getHtml(et.slides, et.slideView.slideIndex()), 'test2');
  });

  test('correct index', function() {
    equal(et.slideController.getIndex(
      et.slideView.movementFunctions()), 1);
  });

  test('view has movement functions', function() {
    equal(et.slideView.movementFunctions()[0],
      et.directions['right']);
  });

  test('should have move functions', function() {
    equal(et.slideController.movementFunctions(
      et.movements, et.directions
    )[0], et.directions['right']);
    equal(et.slideController.movementFunctions(
      et.movements, et.directions
    )[1], et.directions['left']);
  });

  test('should have directions to move', function() {
    ok(et.directions.hasOwnProperty('right'));
    ok(et.directions.hasOwnProperty('left'));
  });

});
