define(
  [
    'lodash', 'bluebird', 'qwest', 'velocity',
    'scripts/backgrounds',
    'scripts/galleries'
  ],
  function (_, Promise, qwest, Velocity, backgrounds, galleries) {

    var menuName = function (elem) {
      var parent = elem.parentNode.parentNode;
      if (!parent.dataset.name) {
        return '/' + elem.dataset.name;
      } else {
        return menuName(parent) + '/' + elem.dataset.name;
      }
    };

    var createLinks = function createLinks () {
      var items = document.querySelectorAll('.menu li');
      _.map(items, function (elem) {
        var id = menuName(elem);
        if (document.getElementById(id)) {  // there’s something we can link to
          var frag = '#' + id;
          var textNode = elem.childNodes[0];
          var anchor = document.createElement('a');
          anchor.href = frag;
          anchor.textContent = textNode.textContent.trim();
          elem.insertBefore(anchor, textNode);
          textNode.remove()
        } else {
          // debugger;
        }
      });
    };

    var run = function run () {
      backgrounds();
      galleries();
      createLinks();
      document.querySelector('.container').style.display = 'inline';
      var preloadOverlay = document.querySelector('.preload-overlay');
      document.location.href = document.location.href;  // restore position
      Velocity(preloadOverlay, {opacity: 0}, {duration: 1000}).then(function () {
        preloadOverlay.remove();
      });
    };
    // run()
    return {
      run: run,
    };
  }
);
