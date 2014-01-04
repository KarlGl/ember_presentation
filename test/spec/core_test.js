// load the entire module/library and pass to the test
define(['../../lib/app/core.js'], function(app) {
  // use jasmine to run tests against the required code
  module('Core', {
    setup: function() {
      // console.log('prepare something for all following tests');
      /* Event stream of all slide movements */
      app.state.movements = [1, 0, 1];

      /* Slides */
      app.loadSlides(['test', 'test2', 'test3']);
    }
  });

  test('correct html', function() {
    equal(app.slideController.getHtml(app.state.slides, app.slideController.curSlideIndex()), 'test2');
  });

  test('correct index', function() {
    equal(app.slideController.curSlideIndex(),
      1);
  });

});
