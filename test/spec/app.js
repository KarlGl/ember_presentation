// load the entire module/library and pass to the test
define(['app'], function(et) {

  // use jasmine to run tests against the required code
  describe('core', function() {
    it('correct html', function() {
      expect(et.slideController.getHtml(et.slideView.slideIndex())).toEqual('test2');
    });

    it('correct index', function() {
      expect(et.slideController.getIndex(
        et.slideView.movementFunctions())).toEqual(1);
    });

    it('viewHasFunctions', function() {
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
    it('should have dirs', function() {
      expect(et.directions.hasOwnProperty('left')).toBe(true);
      expect(et.directions.hasOwnProperty('right')).toBe(true);
    });

    it('should be accessible', function() {
      expect(et).toNotBe(null);
    });

    it('should return a VERSION', function() {
      expect(et.VERSION).toNotBe(null);
    });

  });

});
