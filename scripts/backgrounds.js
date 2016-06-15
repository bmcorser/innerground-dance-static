define(
  ['lodash', 'bluebird', 'velocity'],
  function (_, Promise, Velocity) {
    var queueBackgrounds = function (elem) {
      var imageLo = new Image();
      imageLo.src = elem.dataset.background;
      elem.style['background-image'] = 'url(' + elem.dataset.background + ')';
      imageLo.onload = function () {
        var imageHi = new Image();
        imageHi.src = elem.dataset.background.replace('-lo', '');
        imageHi.onload = function () {
          if (imageHi.height > imageHi.width && elem.dataset.portrait) {
            elem.style['background-size'] = 'contain';
            elem.style['background-repeat'] = 'no-repeat';
          }
          elem.style['background-image'] = 'url(' + imageHi.src + ')';
        };
      };
    };
    var main = function main () {
      _.map(document.querySelectorAll('div.background'), function (elem) {
        if (elem.dataset.background) {
          queueBackgrounds(elem);
        }
      });
    };
    return main;
  }
);
