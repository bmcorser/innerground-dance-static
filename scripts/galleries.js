define(
  ['lodash', 'bluebird', 'velocity'],
  function (_, Promise, Velocity) {

    var queueImages = function (elem) {
      var imageLo = new Image();
      imageLo.src = elem.dataset.image;
      elem.style['background-image'] = 'url(' + elem.dataset.image + ')';
      imageLo.onload = function () {
        var imageHi = new Image();
        imageHi.src = elem.dataset.image.replace('-lo', '');
        imageHi.onload = function () {
          elem.style['background-image'] = 'url(' + imageHi.src + ')';
        };
      };
    };

    var Gallery = function Gallery (elem) {
      var images = elem.querySelectorAll('div.image');
      this.images = images;
      this.imageCount = images.length;
      /*
      */
      var titleElem = elem.querySelector('h1');
      this.titleText = titleElem.textContent;
      this.addTitleText();
      elem.removeChild(titleElem);
      _.map(images, queueImages);
      this.index = 0;
      this.addLeftRightButtons(elem);
      this.addLocationIndicator();
      this.images[0].classList.add('active');
    };

    Gallery.prototype.addTitleText = function addTitleText () {
      var self = this;
      _.map(self.images, function (elem, index) {
        var titleElem = document.createElement('span');
        titleElem.classList.add('title');
        titleElem.textContent = self.titleText;
        elem.appendChild(titleElem);
      });
    };

    Gallery.prototype.addLocationIndicator = function addLocationIndicator () {
      var emWidth = 42 / this.images.length;
      _.map(this.images, function (elem, index) {
        var leftMargin = index * emWidth;
        var locatorElem = document.createElement('div');
        locatorElem.style['width'] = emWidth + 'em';
        locatorElem.style['margin-left'] = leftMargin - 1 + 'em';
        locatorElem.classList.add('locator');
        elem.querySelector('.caption').insertBefore(locatorElem, elem.querySelector('p'));
      })
    };

    Gallery.prototype.move = function move () {
      var self = this;
      _.map(self.images, function (imageElem) {
        imageElem.classList.remove('active');
      });
      self.images[self.index].classList.add('active');
    };

    Gallery.prototype.right = function right (self) {
      if (self.index == self.images.length - 1) {
        self.index = 0;
      } else {
        self.index = self.index + 1;
      }
      self.move();
    };

    Gallery.prototype.left = function left (self) {
      if (self.index > 0) {
        self.index = self.index - 1;
      } else {
        self.index = self.images.length - 1;
      }
      self.move();
    };

    Gallery.prototype.addLeftRightButtons = function addLeftRightButtons (galleryElem) {
      var leftButton = document.createElement('div');
      leftButton.innerHTML = '<img src="https://github.com/Ranks/emojione/blob/master/assets/png_512x512/2b05.png?raw=true" />';
      leftButton.classList.add('left');
      leftButton.classList.add('button');
      leftButton.onclick = _.partial(this.left, this);;

      var rightButton = document.createElement('div');
      rightButton.innerHTML = '<img src="https://github.com/Ranks/emojione/blob/master/assets/png_512x512/27a1.png?raw=true" />';
      rightButton.classList.add('right');
      rightButton.classList.add('button');
      rightButton.onclick = _.partial(this.right, this);;

      galleryElem.appendChild(leftButton);
      galleryElem.appendChild(rightButton);
    };

    var main = function main () {
      _.map(document.querySelectorAll('div.gallery'), function (elem) {
        new Gallery(elem);
      });
    };

    return main;
  }
);
