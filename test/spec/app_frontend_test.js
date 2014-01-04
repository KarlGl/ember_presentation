// load the entire module/library and pass to the test
define(['../../lib/app/ember_frontend.js'], function(app) {
  window.app = app;

  // testHelpers
  var hasContent = function(selector, content) {
    return ok(selector.text().indexOf(content) > 0, 'has content ' + content);
  };

  module('Ember Integration', {
    setup: function() {
      app.loadSlidesEmber(['test slide 1', 'test slide 2']);
      app.loadMovementsEmber([1]);
    }
  });
  window.testApp = {};
  app.frontend.createApp(window.testApp);

  // use my testing element on the runner.html page.
  window.testApp.App.rootElement = '#frontend-integration-test';

  // defer readiness
  window.testApp.App.setupForTesting();

  // gives you all the helper methods like "visit".
  window.testApp.App.injectTestHelpers();

  var setupFrontend = function() {
    window.testApp.App.reset();
    app.loadMovementsEmber([]);
  };

  test('clicking a slide makes it the main slide, and changes the active classes.', function() {
    setupFrontend();
    visit('/0');
    expect(5);
    hasContent(find("#slidecontent"), 'test slide 1');
    ok(find(".slide-item-cont").first().hasClass('active'), '1st slide will be active.');
    ok(!find(".slide-item-cont").last().hasClass('active'), '2nd slide will be inactive.');

    click('.slide-item-cont:last');
    wait().then(function() {
      hasContent(find("#slidecontent"), 'test slide 2');
      ok(find(".slide-item-cont").last().hasClass('active'), '2nd slide will be active.');
    })
  });

  test('loads a slide index and content by directly visiting the url with a slide index. Has correct slide count. Will show all the slides at the bottom. Class will be active.', function() {
    setupFrontend();
    visit('/1');
    hasContent(find("#slideid"), 1);
    hasContent(find("#slidecontent"), 'test slide 2');
    hasContent(find("#allslide-count"), 2);
    deepEqual(app.state.movements, [1])
    equal(find(".slide-item").length, 2, 'has all the slides in the app at the bottom.');
    hasContent(find(".slide-item").first(), 'test slide 1');
    ok(find(".slide-item-cont").last().hasClass('active'), 'Class will be active.');
  });


  module('Ember Specific tests');
  var controller = {
    set: function(key, val) {
      this[key] = val;
    }
  }
  test('can load slides', function() {
    app.loadSlidesEmber(['foo']);
    equal(app.state.slides[0], 'foo');
  });
  test('has create app function', function() {
    ok(app.frontend.hasOwnProperty(
      'createApp'));
  });

  test('loads Ember', function() {
    notEqual(Ember, undefined);
  });

  test('frontend has route that sets the slide id on the controller', function() {
    app.frontend.routeFuns.setupController(controller, {
      id: 1
    });
    equal(app.state.movements[0], 1);
  });
});
