(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  (function ($, window, document) {
    "use strict";

    var _defaults;
    _defaults = {
      opaque: true
    };
    $.navbar = function (element, options) {
      this.settings = $.extend({}, _defaults);
      this.element = $(element);
      $(window).scroll(function (_this) {
        return function () {
          var scroll_top;
          scroll_top = $(window).scrollTop();
          if (_this.settings.opaque) {
            if (scroll_top > 25) {
              _this.element.addClass('-opaque');
            } else {
              _this.element.removeClass('-opaque');
            }
          }
        };
      }(this)).trigger('scroll');
      $('body').on('click', function (_this) {
        return function (e) {
          if (!_this.element.hasClass('navbar-collapsed')) {
            return;
          }
          if (!$(e.target).is(_this.element) && !_this.element.has($(e.target)).length > 0) {
            _this.element.removeClass('navbar-collapsed');
          }
          e.stopPropagation();
        };
      }(this));
    };
    return $.fn.navbar = function (opts) {
      return this.each(function (index, element) {
        if (!$.data(element, "navbar")) {
          return $.data(element, "navbar", new $.navbar(element, opts));
        }
      });
    };
  })(window.jQuery, window, document);
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=navbar.js.map
