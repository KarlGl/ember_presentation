define([
  './node_modules/jade/jade.js',
], function(jade) {
  window.jade = jade;
  return [
    "\
h1 Hi \n\
p Welcome to my App about Ember Testing and JavaScript madness.\n\
p Author: Karl Glaser\
",
    "\
h1 My Core Tests:\n\
p Are unit tests\n\
p Should run without loading ember\n\
p (Well I skrewed that up, by using one page for the test results). \n\
p Syncronous \n\
",
    "\
h1 Ember Tests:\n\
p How is this app being tested?\n\
p An ember application is created like normal above a div for qunit.\n\
p As you can see the app is running (I am using it for the presentation!).\n\
",
    "p We tell it to: reset the application before each test.\n\
p We tell it to: not use the browser url anymore.\n\
p We tell it to: not use the runloop in tests.\n\
p We tell it to: use test helpers that control the runloop.\n\
",
    "h3 Helpers: basically all you need is: \n\
ul \n\
	li Visit: (pretend you changed the url in the application)\n\
	li Click\n\
	li Wait: relove all promises then continue.\n\
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
p Initially I was using jasmine, but decided to switch to qunit instead of implementing those functions for jasmine myself. I like jasmine more than qunit though (spies, nesting, clearer syntax).\n\
",
    "\
h3 Time for some crazy shit!!:\n\
",
    "\
h3 What happens if I?\n\
p call Ember.Application.create inside one of my slides?\n\
iframe.frame(src='./runner.html#/0') \n\
",
  ];
});
