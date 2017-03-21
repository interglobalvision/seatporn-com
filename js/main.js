/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr */

Site = {
  mobileThreshold: 601,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

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
    }

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

jQuery(document).ready(function () {
  'use strict';

  Site.init();

});
