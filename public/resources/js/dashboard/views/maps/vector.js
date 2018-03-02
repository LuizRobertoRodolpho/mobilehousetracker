(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var backgroundColor, color, hoverColor, selectedColor;
    backgroundColor = hexShade(hexBlend(colors['primary'], colors['secondary'], 0.5), -0.2);
    color = hexShade(backgroundColor, -0.75);
    hoverColor = hexShade(backgroundColor, -0.9);
    selectedColor = hexShade(backgroundColor, -0.5);

    /*
    World
     */
    $('#vector-world').vectorMap({
      map: 'world_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });

    /*
    North America
     */
    $('#vector-north-america').vectorMap({
      map: 'north-america_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });

    /*
    South America
     */
    $('#vector-south-america').vectorMap({
      map: 'south-america_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });

    /*
    Europe
     */
    $('#vector-europe').vectorMap({
      map: 'europe_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });

    /*
    Asia
     */
    $('#vector-australia').vectorMap({
      map: 'australia_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });

    /*
    Asia
     */
    $('#vector-asia').vectorMap({
      map: 'asia_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });

    /*
    Africa
     */
    $('#vector-africa').vectorMap({
      map: 'africa_en',
      backgroundColor: backgroundColor,
      color: color,
      hoverColor: hoverColor,
      selectedColor: selectedColor,
      borderWidth: 0
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=vector.js.map
