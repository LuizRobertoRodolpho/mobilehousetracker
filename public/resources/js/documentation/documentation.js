(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $('document').ready(function () {
    'use strict';

    var responsive;
    responsive = {
      xs: 0,
      sm: 544,
      md: 768,
      lg: 992,
      xl: 1200
    };
    $('.social-icons a').each(function (index, icon) {
      var color_class;
      color_class = 'social-colored social-' + $(icon).attr('data-color');
      $(icon).on('mouseenter', function () {
        $('#social-section').addClass(color_class);
      });
      $(icon).on('mouseleave', function () {
        $('#social-section').removeClass(color_class);
      });
    });
    $('.folder-tree-view .folder').each(function (index, folder) {
      var icon, label;
      folder = $(folder);
      label = $('> span', folder);
      icon = $('> i', label);
      if (folder.hasClass('disabled')) {
        return;
      }
      label.on('click', function (e) {
        folder.toggleClass('open');
        icon.toggleClass('fa-folder fa-folder-open');
      });
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=documentation.js.map
