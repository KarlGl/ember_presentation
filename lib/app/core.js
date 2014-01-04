define(function() {

  var app = {
    VERSION: '0.1.5'
  };


  app.loadSlides = function(slides, details) {
    app.state.slides = slides;
  };

  app.state = {
    /* Event stream of all slide movements */
    movements: [],
    /* Slides */
    slides: [],
  };

  /* Slide calculations */
  app.slideController = {
    getHtml: function(slides, index) {
      return slides[index] ? slides[index] : '';
    },

    getLastIndex: function(movements) {
      return _.last(movements);
    },
  };


  return app;
});
