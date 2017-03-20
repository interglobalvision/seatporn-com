/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global jQuery, $, document, Site, Modernizr */

Site = {
  mobileThreshold: 601,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    _this.thinkOf();

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
};

jQuery(document).ready(function () {
  'use strict';

  Site.init();

});
