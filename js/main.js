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
  bufferTime: 4, // in seconds
  imgDirPath: 'http://d1r8hiz683c1rx.cloudfront.net/',
  lastChairTime: null,
  stop: false,
  init: function() {
    var _this = this;

    _this.$imagesContainer = $('#images-container');

    _this.currentPosition = _this.getSecsToday() + _this.bufferTime;

    if (_this.isDev()) {
      _this.currentPosition = 1;
      _this.listSize = 120;
      _this.imgDirPath = '/dev_chairs/';
    }

    _this.initTail();
    _this.bind();
  },

  isDev: function() {
    return location.hash === '#dev' ? true : false;
  },

  bind: function() {
    var _this = this;

    document.addEventListener("visibilitychange", _this.handleVisibilityChange.bind(_this), false);
  },

  handleVisibilityChange: function() {
    var _this = this;

    if (document.hidden) { // INACTIVE TAB
      _this.stop = true;
    } else { // ACTIVE TAB
      _this.reinitTail();
    }
  },

  initTail: function() {
    var _this = this;

    _this.loadTail();
    _this.appendImages();
    _this.triggerTimer(_this.bufferTime * 1000);
  },

  reinitTail: function() {
    var _this = this;

    _this.stop = false;
    _this.currentPosition = _this.getSecsToday();

    if (_this.isDev()) {
      _this.currentPosition = 60;
    }

    _this.clearChairs()
    _this.loadTail();
    _this.appendImages();
    _this.triggerTimer(0);
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
      _this.$imagesContainer.append(_this.generateImage(_this.tail[i]));
    }
  },

  triggerTimer: function(delay) {
    var _this = this;

    setTimeout(function() {

      window.requestAnimationFrame(_this.nextChair.bind(_this));

      Site.hideLoading();
    }, delay);

  },

  nextChair: function() {
    var _this = this;

    var currentDate = +new Date;

    if (_this.lastChairTime === null) {
      _this.lastChairTime = currentDate;
    }

    if (_this.passedASecond(currentDate)) {
      _this.currentPosition += 1;

      if( _this.currentPosition > _this.listSize ) {
        _this.currentPosition = 1;
      }

      _this.shiftChair();
      _this.pushChair();
      _this.lastChairTime = currentDate;
    }

    if(!_this.stop) {
      window.requestAnimationFrame(_this.nextChair.bind(_this));
    }

  },

  passedASecond: function(currentDate) {
    var _this = this;

    if(currentDate - _this.lastChairTime >= 1000) {
      return true;
    }

    return false;

  },

  shiftChair: function() {
    var _this = this;

    $('.image-holder').first().remove();
  },

  clearChairs: function() {
    var _this = this;

    $('.image-holder').remove();
  },

  pushChair: function() {
    var _this = this;

    var image = _this.currentPosition + _this.tailSize;
    _this.$imagesContainer.append(_this.generateImage(image));
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
    imageHolder.id = 'image-' + base;

    image.setAttribute('src', _this.imgDirPath + filename);

    imageHolder.appendChild(image);

    return imageHolder;
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
          scrollTop: $(document).height() - $('#footer').outerHeight(true),
      });
    });

    $('#images-container').on('click', function() {
      $('html, body').animate({
        scrollTop: 0,
      });
    });
  },

},

jQuery(document).ready(function() {
  'use strict';
  Site.init();
});
