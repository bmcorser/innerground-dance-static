({
  baseUrl: '.',
  paths: {
    lodash: 'bower_components/lodash/dist/lodash.min',
    bluebird: 'bower_components/bluebird/js/browser/bluebird.min',
    qwest: 'bower_components/qwest/qwest.min',
    velocity: 'bower_components/velocity/velocity.min',
  },
  name: 'bower_components/almond/almond',
  include: 'scripts/main',
  insertRequire: ['scripts/main'],
  out: 'main-built.js',
  optimize: 'none',
})
