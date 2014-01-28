// load the entire module/library and pass to the test
define(['../../lib/app/core.js'], function(app) {
  var env = {};
  module('Core', {
    setup: function() {
      /* Event stream of all slide movements */
      env.movements = [1, 0, 1];

      /* Slides */
      env.slides = ['test', 'test2', 'test3'];
    }
  });

  test('correct html returned from the movements and slides', function() {
    equal(app.slideController.getHtml(env.slides, app.slideController.getLastIndex(env.movements)), env.slides[1]);
  });

  test('correct index is found in the movements', function() {
    equal(app.slideController.getLastIndex(env.movements),
      1);
  });

});
