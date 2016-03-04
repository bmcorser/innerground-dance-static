define(
  ['lodash', 'bluebird', 'velocity'],
  function (_, Promise, Velocity) {
    var main = function main () {
      _.map(document.querySelectorAll('div.background'), function (elem) {
        var imageLo = new Image();
        imageLo.src = elem.dataset.background;
        elem.style['background-image'] = 'url(' + elem.dataset.background + ')';
        imageLo.onload = function () {
          var imageHi = new Image();
          imageHi.src = elem.dataset.background.replace('-lo', '');
          imageHi.onload = function () {
            elem.style['background-image'] = 'url(' + imageHi.src + ')';
          };
        };
      });
    };
    return main;
  }
);
