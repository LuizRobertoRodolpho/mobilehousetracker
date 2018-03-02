(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var collapsible_panels, dismissible_panels;
    collapsible_panels = $('.panel.-collapsible');
    if (collapsible_panels.length > 0) {
      collapsible_panels.each(function (index, panel) {
        var body, collapse;
        panel = $(panel);
        body = $('.panel-body', panel);
        collapse = $('[data-action="collapse"]', panel);
        collapse.on('click', function (e) {
          e.preventDefault();
          $('i', collapse).toggleClass('fa-chevron-right fa-chevron-down');
          body.stop().slideToggle();
        });
      });
    }
    dismissible_panels = $('.panel.-dismissible');
    if (dismissible_panels.length > 0) {
      return dismissible_panels.each(function (index, panel) {
        var body, dismiss;
        panel = $(panel);
        body = $('.panel-body', panel);
        dismiss = $('[data-action="dismiss"]', panel);
        dismiss.on('click', function (e) {
          e.preventDefault();
          panel.slideToggle(function () {
            panel.remove();
          });
        });
      });
    }
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=panel.js.map
