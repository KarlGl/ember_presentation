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
p Should run without ember\n\
p Syncronous \n\
",
    "\
h1 Core tests:\n\
div#qunit \n\
div#qunit-fixture \n\
",
  ];
});
