// load the entire module/library and pass to the test
define(['../../lib/app/core.js'], function(app) {
  // use jasmine to run tests against the required code
  module('Core', {
    setup: function() {
      // console.log('prepare something for all following tests');
      /* Event stream of all slide movements */
      app.state.movements = ['right', 'left', 'right'];

      /* Slides */
      app.loadSlides(['test', 'test2', 'test3']);
    }
  });

  test('correct html', function() {
    equal(app.slideController.getHtml(app.state.slides, app.slideController.curSlideIndex()), 'test2');
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
      app.state.movements, app.directions
    )[0], app.directions['right']);
    equal(app.slideController.movementFunctions(
      app.state.movements, app.directions
    )[1], app.directions['left']);
  });

  test('should have directions to move', function() {
    ok(app.directions.hasOwnProperty('right'));
    ok(app.directions.hasOwnProperty('left'));
  });

});
