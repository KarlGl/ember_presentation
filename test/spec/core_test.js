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

  test('correct html', function() {
    equal(app.slideController.getHtml(env.slides, app.slideController.getLastIndex(env.movements)), 'test2');
  });

  test('correct index', function() {
    equal(app.slideController.getLastIndex(env.movements),
      1);
  });

});
