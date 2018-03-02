(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var resize_content, resize_content_timeout;
    $('.navbar').navbar();
    $('.navbar').morphDropdown();
    $('.sidebar').sidebar();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
    resize_content_timeout = void 0;
    resize_content = function resize_content() {
      $('.content').css({
        'min-height': $(window).height() - $('.navbar').height()
      });
    };
    $(window).resize(function () {
      resize_content_timeout = clearTimeout(resize_content_timeout);
      setTimeout(resize_content, 100);
    });
    resize_content();
    if ($('.wizard .content').length > 0) {
      $('.wizard .content').perfectScrollbar();
    }
    if ($('.morph-gallery').length > 0) {
      $('.morph-gallery').perfectScrollbar();
    }
  });

  $(window).on('load', function () {
    var loader;
    loader = $('.loader-wrapper');
    TweenLite.to(loader, 0.5, {
      opacity: 0,
      onComplete: function onComplete() {
        loader.remove();
      }
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=dashboard.js.map
