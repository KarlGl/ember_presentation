define(function() {
  var frontend = {};
  frontend.createApp = function(context) {
    context.App = Ember.Application.create();
  };
  return frontend;
});
