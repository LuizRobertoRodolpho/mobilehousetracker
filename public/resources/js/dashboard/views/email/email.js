(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var check_all, compose, mail_items;
    mail_items = $('.mail-item');
    check_all = $('#mail-check-all');
    compose = $('#email-body');
    if (mail_items.length > 0) {

      /*
      Handle checking all emails
       */
      check_all.on('change', function () {
        var checked;
        checked = check_all.is(":checked");
        mail_items.each(function (index, item) {
          var checkbox, checked_item;
          item = $(item);
          checkbox = $('.mail-item-actions input[type="checkbox"]', item);
          checked_item = checkbox.is(":checked");
          if (checked && !checked_item) {
            checkbox.prop('checked', true);
          } else if (!checked && checked_item) {
            checkbox.prop('checked', false);
          }
        });
      });

      /*
      Email item specific actions
       */
      mail_items.each(function (index, item) {
        var href, star;
        item = $(item);
        href = item.attr('data-href');
        star = $('.mail-item-star', item);

        /*
        Set email as starred
         */
        star.on('click', function () {
          item.toggleClass('-starred');
        });

        /*
        Open Email with chosen id
         */
        item.on('click', function (e) {
          var target;
          target = $(e.target);
          if (target.closest('.mail-item-actions').length === 0) {
            window.location.href = href;
          }
        });
      });
    }
    if (compose.length > 0) {
      compose.summernote({
        callbacks: {
          onInit: function onInit() {
            $('.dropdown-menu', compose).addClass('-dark');
          }
        }
      });
    }
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=email.js.map
