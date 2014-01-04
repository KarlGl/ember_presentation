define(function() {

  var app = {
    VERSION: '0.1.5'
  };

  /* Main show slides */
  app.display = {};

  app.directions = {
    right: function(i) {
      return i + 1;
    },
    left: function(i) {
      return i - 1;
    },
  };

  /* Event stream of all slide movements */
  app.movements = ['right', 'left', 'right'];

  /* Slides */
  app.slides = ['test', 'test2', 'test3'];

  /* Slide calculations */
  app.slideController = {
    // An array of functions to apply to a slide index.
    movementFunctions: function(movements, directions) {
      return _.map(movements, function(movement) {
        return directions[movement];
      });
    },
    getHtml: function(slides, index) {
      return slides[index];
    },

    // The slide index after reducing over funcs.
    getIndex: function(funcs, startInd) {
      startInd = startInd || 0;
      return _.reduce(funcs,
        function(acc, val) {
          return val(acc);
        }, startInd);
    },
  };

  app.slideView = {
    movementFunctions: function() {
      return app.slideController.movementFunctions(
        app.movements,
        app.directions);
    },
    slideIndex: function() {
      return app.slideController.getIndex(this.movementFunctions());
    }
  };

  return app;
});
