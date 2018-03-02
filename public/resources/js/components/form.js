(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  (function ($, window, document) {
    "use strict";

    $.form = function (element, options) {
      this.form = $(element);
      this.groups = $('.form-group', this.form);
      this.inputs = $('input, textarea, select', this.form);
      this.check = {};
      this.action = this.form.attr('action');
      this.method = this.form.attr('method');
      if (this.method == null) {
        this.method = 'POST';
      }
      this.groups.each(function (index, group) {
        var input, label;
        group = $(group);
        input = $('input, textarea, select', group);
        label = $('label', group);
        group.on('click', function () {
          input.focus();
        });
        if (input.val() !== "") {
          label.addClass('active');
        }
        input.on('focusin', function () {
          group.removeClass('has-error');
          label.addClass('active');
        });
        input.on('focusout', function () {
          if (input.val() === "") {
            label.removeClass('active');
          }
        });
      });
    };
    return $.fn.form = function (opts) {
      return this.each(function (index, element) {
        if (!$.data(element, "form")) {
          return $.data(element, "form", new $.form(element, opts));
        }
      });
    };
  })(window.jQuery, window, document);
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=form.js.map
