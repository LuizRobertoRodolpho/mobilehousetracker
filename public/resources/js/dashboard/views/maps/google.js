(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var default_map, style, styled_map;
    style = [{
      'featureType': 'all',
      'elementType': 'labels.text.fill',
      'stylers': [{
        'color': colors['white']
      }]
    }, {
      'featureType': 'all',
      'elementType': 'labels.text.stroke',
      'stylers': [{
        'visibility': 'on'
      }, {
        'color': colors['black']
      }, {
        'lightness': 0
      }]
    }, {
      'featureType': 'all',
      'elementType': 'labels.icon',
      'stylers': [{
        'visibility': 'off'
      }]
    }, {
      'featureType': 'administrative',
      'elementType': 'geometry.fill',
      'stylers': [{
        'color': colors['concrete']
      }, {
        'lightness': 20
      }]
    }, {
      'featureType': 'administrative',
      'elementType': 'geometry.stroke',
      'stylers': [{
        'color': hexBlend(colors['primary'], colors['secondary'], 0.5)
      }, {
        'weight': 1.2
      }]
    }, {
      'featureType': 'landscape',
      'elementType': 'geometry',
      'stylers': [{
        'color': colors['concrete']
      }]
    }, {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [{
        'color': colors['black']
      }]
    }, {
      'featureType': 'road',
      'elementType': 'geometry.fill',
      'stylers': [{
        'color': hexBlend(colors['primary'], colors['secondary'], 0.5)
      }]
    }, {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [{
        'color': hexBlend(colors['primary'], colors['secondary'], 0.5)
      }, {
        'lightness': '20'
      }]
    }, {
      'featureType': 'transit',
      'elementType': 'geometry',
      'stylers': [{
        'color': hexBlend(colors['primary'], colors['secondary'], 0.5)
      }, {
        'lightness': 19
      }]
    }, {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [{
        'color': colors['asphalt']
      }]
    }];
    default_map = new GMaps({
      el: '#gmaps-default',
      lat: -33.8688,
      lng: 151.2093,
      zoom: 13
    });
    styled_map = new GMaps({
      el: '#gmaps-styled',
      lat: -33.8688,
      lng: 151.2093,
      zoom: 13
    });
    styled_map.addStyle({
      styledMapName: "Volta",
      styles: style,
      mapTypeId: "volta"
    });
    styled_map.setStyle("volta");
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=google.js.map
