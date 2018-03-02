(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  (function ($, window, document) {
    "use strict";

    var _defaults;
    _defaults = {
      offset: 75,
      collapse: 992,
      duration: 0.3,
      touch: true,
      visibilityThreshold: 0.5,
      slideable: false,
      overlay: false,
      affectContent: true,
      slideContent: false,
      debug: false
    };
    $.sidebar = function (element, options) {
      this.settings = $.extend({}, _defaults);
      this.sidebar = $(element);
      this.sidebar_id = this.sidebar.attr('id');
      this.sidebar_menu = $('.sidebar-menu', this.sidebar);
      this.sidebar_toggle = $('.sidebar-toggle[data-target="#' + this.sidebar_id + '"]');
      this.sidebar_tabs = $('.sidebar-tab', this.sidebar);
      this.sidebar_tab_contents = $('.sidebar-tab-content', this.sidebar);
      this.animate = TweenLite;
      this.body = $('body');
      this.content = $('.content');
      this.window = $(window);
      this.is_visible = true;
      this.on_resize = function (_this) {
        return function () {
          if (_this.is_collapsible && (_this.window.width() < _this.collapse_threshold || _this.collapse_threshold === 0)) {
            _this.is_collapsed = true;
            _this.sidebar.addClass('-collapsed -responsive');
            if (_this.is_slideable) {
              _this.slide_toggle(false);
            }
            _this.log('Resize toggle');
            if (_this.affects_content) {
              if (_this.is_slideable) {
                _this.content.removeClass('-with-' + _this.position + '-sidebar');
              }
            }
          } else {
            _this.is_collapsed = false;
            _this.sidebar.removeClass('-collapsed -responsive');
            if (_this.affects_content) {
              _this.content.addClass('-with-' + _this.position + '-sidebar');
            }
          }
          _this.width = _this.sidebar.width();
        };
      }(this);
      this.bind_resize = function (_this) {
        return function () {
          _this.window.on('resize', _this.on_resize);
        };
      }(this);
      this.initialize_scrollbar = function (_this) {
        return function () {
          $('.nano-content', _this.sidebar).perfectScrollbar();
        };
      }(this);
      this.initialize_menu = function (_this) {
        return function () {
          _this.sidebar_menu.metisMenu();
        };
      }(this);
      this.initialize_attributes = function (_this) {
        return function () {
          _this.collapse_threshold = _this.sidebar.attr('data-collapse') ? parseInt(_this.sidebar.attr('data-collapse'), 10) : _this.settings.collapse;
          _this.offset = _this.sidebar.attr('data-offset') ? parseInt(_this.sidebar.attr('data-offset'), 10) : _this.settings.offset;
          _this.is_collapsible = !isNaN(_this.collapse_threshold);
          _this.is_slideable = _this.sidebar.hasClass('-slideable') || _this.settings.slideable;
          _this.is_overlay = _this.sidebar.attr('data-overlay') || _this.settings.overlay;
          _this.affects_content = _this.sidebar.attr('data-affect-content') || _this.settings.affectContent;
          _this.slides_content = _this.sidebar.attr('data-slide-content') || _this.settings.slideContent;
          if (_this.slides_content === 'false') {
            _this.slides_content = false;
          }
          if (_this.slides_content) {
            _this.sidebar.addClass('-slides-content');
          }
          if (_this.sidebar.hasClass('-right')) {
            _this.position = 'right';
            _this.sign = -1;
          } else {
            _this.position = 'left';
            _this.sign = 1;
          }
        };
      }(this);
      this.bind_menu = function (_this) {
        return function () {
          var showing;
          showing = false;
          _this.sidebar_menu.on('show.metisMenu', function () {
            _this.sidebar.addClass('-open');
            showing = true;
          });
          _this.sidebar_menu.on('hidden.metisMenu', function () {
            if (!showing) {
              _this.sidebar.removeClass('-open');
            }
            showing = false;
          });
        };
      }(this);
      this.slide_toggle = function (_this) {
        return function (visible, duration) {
          var slidingComplete;
          if (visible == null) {
            visible = !_this.is_visible;
          }
          if (duration == null) {
            duration = _this.settings.duration;
          }
          _this.is_sliding = true;
          slidingComplete = function slidingComplete() {
            setTimeout(function () {
              _this.is_sliding = false;
              _this.is_toggling = false;
              if (!visible) {
                $.sidebar.active = null;
              }
            }, 250);
          };
          if (visible) {
            $.sidebar.active = _this.sidebar;
            _this.animate.to(_this.sidebar, duration, {
              onComplete: slidingComplete,
              x: _this.width * _this.sign
            });
            if (_this.slides_content) {
              _this.animate.to(_this.content, duration, {
                x: _this.width * _this.sign
              });
            }
          } else {
            _this.animate.to(_this.sidebar, duration, {
              onComplete: slidingComplete,
              x: 0
            });
            if (_this.slides_content) {
              _this.animate.to(_this.content, duration, {
                x: 0
              });
            }
          }
          _this.is_visible = visible;
        };
      }(this);
      this.bind_body_click = function (_this) {
        return function () {
          _this.body.on('mouseup', function (e) {
            if (_this.is_collapsed && _this.sidebar.hasClass('-open') && $($(e.target).closest('.sidebar-menu'), _this.sidebar).length === 0) {
              $('.active a', _this.sidebar).trigger('click');
              _this.log('Sidebar toggle button click');
            }
            if (_this.is_slideable && _this.is_visible && !_this.is_sliding && $(e.target) !== _this.sidebar_toggle && $(e.target).closest(_this.sidebar_toggle).length === 0 && $(e.target).closest('.-slideable').length === 0) {
              _this.slide_toggle(false);
              _this.log('Body click');
            }
          });
        };
      }(this);
      this.bind_slideable = function (_this) {
        return function () {
          var bodyTouch;
          bodyTouch = new Hammer(_this.body[0]);
          bodyTouch.get('pan').set({
            direction: Hammer.DIRECTION_HORIZONTAL
          });
          return bodyTouch.on('panstart panleft panright panend', function (e) {
            var can_slide, direction_valid, distance, duration, is_active_sidebar, is_inside_boundaries, x;
            if (e.type === 'panstart') {
              _this.first_touch = e;
            }
            is_active_sidebar = $.sidebar.active === null || _this.sidebar === $.sidebar.active;
            is_inside_boundaries = true;
            if (!(_this.is_collapsed && is_active_sidebar)) {
              return;
            }
            distance = Math.abs(e.deltaX) - _this.offset;
            can_slide = 0 < distance && distance < _this.width;
            if (_this.is_visible) {
              x = _this.width - distance;
              direction_valid = e.deltaX < 0;
            } else {
              x = distance;
              direction_valid = e.deltaX > 0;
              is_inside_boundaries = _this.first_touch.center.x < _this.window.width() / 3;
            }
            if (_this.position === 'right') {
              x = -x;
              direction_valid = !direction_valid;
              if (!_this.is_visible) {
                is_inside_boundaries = _this.first_touch.center.x > _this.window.width() * 2 / 3;
              }
            }
            if (!(_this.is_slideable && can_slide && direction_valid && is_inside_boundaries)) {
              return;
            }
            _this.is_sliding = true;
            if (e.type === 'panend' && (_this.previous_event === 'panleft' || _this.previous_event === 'panright')) {
              duration = _this.settings.duration * e.distance / _this.width;
              if (e.distance > _this.width * 0.5) {
                if (_this.is_visible) {
                  _this.slide_toggle(false, duration);
                  _this.log('Slide out');
                } else {
                  _this.slide_toggle(true, duration);
                  _this.log('Slide in');
                }
              } else {
                _this.log('Slide back');
                _this.slide_toggle(_this.is_visible, duration);
              }
              return;
            }
            _this.animate.set(_this.sidebar, {
              x: x
            });
            if (_this.slides_content) {
              _this.animate.set(_this.content, {
                x: x
              });
            }
            _this.previous_event = e.type;
          });
        };
      }(this);
      this.initialize_tabs = function (_this) {
        return function () {
          _this.sidebar_tabs.each(function (index, tab) {
            var target;
            tab = $(tab);
            target = $(tab.attr('data-target'));
            tab.on('click', function (e) {
              _this.sidebar_tabs.removeClass('-active');
              _this.sidebar_tab_contents.removeClass('-active');
              tab.addClass('-active');
              target.addClass('-active');
              target.triggerHandler('tab.show', [target]);
            });
          });
        };
      }(this);
      this.initialize_chat = function (_this) {
        return function () {
          var chat_form, chat_form_message, chat_items, chat_user, chat_view_tab, chat_wrapper;
          chat_view_tab = $('.chat-view-tab', _this.sidebar);
          chat_wrapper = $('.chat', chat_view_tab);
          chat_items = $('.chat-items', chat_view_tab);
          chat_form = $('.chat-form', chat_view_tab);
          chat_user = $('.chat-user', chat_view_tab);
          chat_form_message = $('input[name="message"]', chat_view_tab);
          if (chat_view_tab.length > 0) {
            chat_form.on('submit', function (e) {
              var message;
              message = chat_form_message.val();
              chat_form_message.val('');
              chat_items.append($('<div>', {
                "class": 'chat-item -to',
                text: message
              }));
              e.preventDefault();
              return false;
            });
          }
        };
      }(this);
      this.initialize_toggle = function (_this) {
        return function () {
          _this.sidebar_toggle.on('click', function () {
            _this.slide_toggle();
          });
        };
      }(this);
      this.log = function (_this) {
        return function () {
          if (_this.settings.debug) {
            console.log(_this.sidebar_id, arguments);
          }
        };
      }(this);
      this.initialize = function (_this) {
        return function () {
          _this.initialize_attributes();
          _this.initialize_scrollbar();
          _this.initialize_menu();
          _this.initialize_toggle();
          _this.initialize_tabs();
          _this.initialize_chat();
          _this.bind_menu();
          _this.bind_resize();
          _this.bind_body_click();
          if (_this.settings.touch) {
            _this.bind_slideable();
          }
          _this.on_resize();
        };
      }(this);
      this.initialize();
    };
    $.sidebar.active = null;
    return $.fn.sidebar = function (opts) {
      return this.each(function (index, element) {
        if (!$.data(element, "sidebar")) {
          return $.data(element, "sidebar", new $.sidebar(element, opts));
        }
      });
    };
  })(window.jQuery, window, document);
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=sidebar.js.map
