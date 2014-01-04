define(function() {

  var app = {
    VERSION: '0.1.5'
  };


  app.loadSlides = function(slides, details) {
    app.state.slides = slides;
  };

  app.directions = {
    right: function(i) {
      return i + 1;
    },
    left: function(i) {
      return i - 1;
    },
  };


  app.state = {
    /* Event stream of all slide movements */
    movements: [],
    /* Slides */
    slides: [],
  };

  /* Slide calculations */
  app.slideController = {
    // The initial value when we landed the page.
    slide_id: null,

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

    allMovementFunctions: function() {
      return this.movementFunctions(
        app.state.movements,
        app.directions);
    },
    curSlideIndex: function() {
      return this.getIndex(this.allMovementFunctions(),
        this.slide_id);
    }
  };

  app.slideView = {};

  return app;
});
