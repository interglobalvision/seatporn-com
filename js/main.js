/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr */

Site = {
  mobileThreshold: 601,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    _this.Chairs.init();
    _this.About.init();
  },

  onResize: function() {
    var _this = this;

  },

  fixWidows: function() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  },

  hideLoading: function() {
    $('#loading-screen').addClass('hide');
  }


};

Site.Chairs = {
  tail: [],
  tailSize: 9,
  listSize: 86400, // = 24hrs
  devListSize: 120, // = 2mins
  bufferTime: 4, // in seconds
  imgDirPath: '/dev_chairs/',
  init: function() {
    var _this = this;

    _this.imagesContainer = document.querySelector('#images-container');

    _this.currentPosition = _this.getSecsToday() + _this.bufferTime;

    if (_this.isDev()) {
      _this.currentPosition = 3;
    }

    _this.initTail();
  },

  isDev: function() {
    return location.hash === '#dev' ? true : false;
  },

  initTail: function() {
    var _this = this;

    _this.loadTail();
    _this.appendImages();
    _this.triggerTimer();
  },

  loadTail: function() {
    var _this = this;

    for (var i = 0; i <= _this.tailSize; i++) {
      _this.tail[i] = i + _this.currentPosition;
    }
  },

  appendImages: function() {
    var _this = this;

    for (var i = 0; i < _this.tail.length; i++) {
      _this.imagesContainer.append(_this.generateImage(_this.tail[i]));
    }
  },

  nextChair: function() {
    var _this = this;

    if (_this.isDev() && _this.currentPosition >= _this.devListSize) {
      _this.currentPosition = 1;
    } else {
      _this.currentPosition += 1;
    }

    _this.shiftChair();
    _this.pushChair();
  },

  shiftChair: function() {
    var _this = this;

    $('.image-holder').first().remove();
  },

  pushChair: function() {
    var _this = this;

    var image = _this.currentPosition + _this.tailSize - 1;
    _this.imagesContainer.append(_this.generateImage(image));
  },

  formatName: function(base) {
    var _this = this;

    return _this.padNumber(base) + ".jpeg";
  },

  generateImage: function(base) {
    var _this = this;

    var filename = _this.formatName(base);
    var imageHolder = document.createElement('div');
    var image = document.createElement('img');

    imageHolder.className = 'image-holder grid-row justify-center align-items-center';

    image.setAttribute('src', _this.imgDirPath + filename);

    imageHolder.appendChild(image);

    return imageHolder;
  },

  triggerTimer: function() {
    var _this = this;

    setTimeout(function() {
      setInterval(_this.nextChair.bind(_this), 1000);

      Site.hideLoading();
    }, _this.bufferTime * 1000);

  },

  // Return number of seconds since last midnight
  getSecsToday: function() {
    var date = new Date();
    return date.getSeconds() + (60 * (date.getMinutes() + (60 * date.getHours())));
  },

  padNumber: function(num) {
    var s = num+"";

    while(s.length < 4) {
      s = "0" + s;
    }

    return s;
  },

  floorToSeconds: function(timestamp) {
    return Math.floor(timestamp/1000) * 1000;
  },

  ceilToSeconds: function(timestamp) {
    return Math.ceil(timestamp/1000) * 1000;
  }

};

Site.About = {
  init: function() {
    var _this = this;

    _this.thinkOf();

    _this.bindClicks();
  },

  thinkOf: function() {
    var switchThinkOf = function() {
      var $currentItem = $('.think-of-item.show');

      $('.think-of-item.show').removeClass('show');

      if ($currentItem.next('.think-of-item').length) {
        $currentItem.next().addClass('show');
      } else {
        $('.think-of-item:first-of-type').addClass('show');
      }
    };

    window.setInterval(switchThinkOf, 2000);
  },

  bindClicks: function() {
    var _this = this;

    $('#info-button').on('click', function() {
      $('html, body').animate({
        scrollTop: $(document).height() - $(window).height()
      });
    });

    $('#image-holder').on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      });
    });
  },

},

jQuery(document).ready(function() {
  'use strict';
  Site.init();
});
