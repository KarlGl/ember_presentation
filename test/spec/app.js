// load the entire module/library and pass to the test
define(['app'], function(et) {

  describe('Ember related tests', function() {

    it('loads Ember', function() {
      expect(Ember).toNotBe(undefined);
    });
  });

  // use jasmine to run tests against the required code
  describe('app', function() {

    it('has frontend', function() {
      expect(et.hasOwnProperty(
        'frontend')).toBe(true);
    });

    it('correct html', function() {
      expect(et.slideController.getHtml(et.slides, et.slideView.slideIndex())).toEqual('test2');
    });

    it('correct index', function() {
      expect(et.slideController.getIndex(
        et.slideView.movementFunctions())).toEqual(1);
    });

    it('view has movement functions', function() {
      expect(et.slideView.movementFunctions()[0]).toEqual(
        et.directions['right']);
    });

    it('should have move functions', function() {
      expect(et.slideController.movementFunctions(
        et.movements, et.directions
      )[0]).toEqual(et.directions['right']);
      expect(et.slideController.movementFunctions(
        et.movements, et.directions
      )[1]).toEqual(et.directions['left']);
    });

    it('should have directions to move', function() {
      expect(et.directions.hasOwnProperty('left')).toBe(true);
      expect(et.directions.hasOwnProperty('right')).toBe(true);
    });

    it('should be accessible from a varialbe', function() {
      expect(et).toNotBe(null);
    });

    it('should return a VERSION', function() {
      expect(et.VERSION).toNotBe(null);
    });

  });

});
