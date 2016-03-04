define(
  [
    'lodash', 'bluebird', 'qwest', 'velocity',
    'scripts/backgrounds.js'
  ],
  function (_, Promise, qwest, Velocity, backgrounds) {
    var run = function run () {
      backgrounds();
      document.querySelector('.container').style.display = 'inline';
      var preloadOverlay = document.querySelector('.preload-overlay');
      Velocity(preloadOverlay, {opacity: 0}, {duration: 1000}).then(function () {
        preloadOverlay.remove();
      });
    };
    return {
      run: run,
    };
  }
);
