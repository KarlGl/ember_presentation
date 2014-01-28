define([
  './node_modules/jade/jade.js',
], function(jade) {
  window.jade = jade;
  return [
    "\
h1 Welcome \n\
p to my Ember App about Ember Testing and JavaScript madness.\n\
p Author: Karl Glaser\
",
    "\
h1 My Core Tests:\n\
p Are unit tests\n\
p Should run without loading ember\n\
p FAIL: I'm using this page (which loads ember) for my unit test results! \n\
p Another FAIL: I got too excited to use proper TDD (next time... I promise). \n\
",
    "\
h1 The Ember Tests:\n\
p An ember application is created. An element for test results is created below it.\n\
p The app is being tested by running in the <b>browser's JavaScript interpreter</b>, it's basically the normal app being driven, but with a few settings, so as you can see, I can still use the app while it's being tested. This is why it is an integration test, it's testing using the UI.\n\
",
"h1 What's different in testing mode?\n\
p reset all state before each test.\n\
p do not use the browser url.\n\
p use some explicit calls to the runloop.\n\
p use test helpers that control the ui and url.\n\
p <b>For Example:</b> If I refresh the page right now, normally it will give you this slide again, but the tests will drive it to some random slides, then to the first slide to not be crazy.\n\
",
    "h3 Helpers: basically all you need is: \n\
ul \n\
	li <b>Visit</b>: (change url)\n\
	li <b>Click</b>\n\
	li <b>Wait</b>: resolve all promises, then continue.\n\
",
    "h3 Example Test\n\
    p This slide calls .toString on one of my functions\n\
pre= exampleTest\n\
",
    "\
h1 Test results (live):\n\
p Passed:\n\
= ' ' + passed \n\
p Time:\n\
= ' ' + runtime + 'ms' \n\
",
    "\
h1 QUnit:\n\
p Has the start() and stop() functions you need for testing async in ember out of the box.\n\
p Initially I was using jasmine, but switched to qunit because jasmine doesn't have start and stop functions. I like jasmine more than qunit though (spies, nesting, some syntax is cool).\n\
",
    "\
h3 The end. But:\n\
",
    "\
h3 What happens if I?\n\
p call Ember.Application.create inside one of my slides? Nothing. Inside an iframe?\n\
iframe.frame(src='./runner.html#/0') \n\
",
"\
h1 Browserify\n\
p https://github.com/substack/node-browserify\n\
p 'Use a node-style require() to organize your browser code and load modules installed by npm.'\n\
p <b>This would allow me to constantly run unit tests with 'grunt watch' as soon as they are modified and without loading ember.</b>\n\
"
,
"\
h1 Sinon\n\
p http://sinonjs.org/\n\
p 'Spies, stubs and mocks for any JavaScript framework.'\n\
"
,
"\
h1 Mockjax\n\
p https://github.com/appendto/jquery-mockjax\n\
p 'request/response mocking for ajax requests.'\n\
"
,
    "\
h3 Since writing this I've been realising unit tests are far more important than integration.\n\
",
  ];
});
