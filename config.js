require.config({
  paths: {
    lodash: 'bower_components/lodash/dist/lodash.min',
    bluebird: 'bower_components/bluebird/js/browser/bluebird.min',
    qwest: 'bower_components/qwest/qwest.min',
    velocity: 'bower_components/velocity/velocity.min',
  }
});

require(['scripts/main'], function(main) {
  main.run();
});
