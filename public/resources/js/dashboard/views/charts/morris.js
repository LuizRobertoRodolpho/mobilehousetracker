(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    Morris.Line({
      element: 'morris-chart-line',
      data: [{
        y: '2011',
        a: 100,
        b: 0
      }, {
        y: '2012',
        a: 75,
        b: 50
      }, {
        y: '2013',
        a: 50,
        b: 75
      }, {
        y: '2014',
        a: 75,
        b: 50
      }, {
        y: '2015',
        a: 50,
        b: 75
      }, {
        y: '2016',
        a: 75,
        b: 50
      }, {
        y: '2017',
        a: 100,
        b: 0
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      grid: false,
      gridTextColor: colors['light']['dark'],
      fillOpacity: 0.1,
      behaveLikeLine: true,
      resize: true,
      pointFillColors: [colors['primary'], colors['secondary']],
      pointStrokeColors: [colors['primary'], colors['secondary']],
      lineColors: [colors['primary'], colors['secondary']]
    });
    Morris.Bar({
      element: 'morris-chart-bar',
      data: [{
        y: '2011',
        a: 100,
        b: 50
      }, {
        y: '2012',
        a: 75,
        b: 50
      }, {
        y: '2013',
        a: 50,
        b: 75
      }, {
        y: '2014',
        a: 75,
        b: 50
      }, {
        y: '2015',
        a: 50,
        b: 75
      }, {
        y: '2016',
        a: 75,
        b: 50
      }, {
        y: '2017',
        a: 90,
        b: 100
      }],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Series A', 'Series B'],
      grid: false,
      gridTextColor: colors['light']['dark'],
      resize: true,
      barColors: [colors['primary'], colors['secondary']]
    });
    Morris.Area({
      element: 'morris-chart-area',
      data: [{
        x: '2010 Q4',
        y: 3,
        z: 7
      }, {
        x: '2011 Q1',
        y: 3,
        z: 4
      }, {
        x: '2011 Q2',
        y: 5,
        z: 1
      }, {
        x: '2011 Q3',
        y: 2,
        z: 5
      }, {
        x: '2011 Q4',
        y: 8,
        z: 2
      }, {
        x: '2012 Q1',
        y: 4,
        z: 4
      }],
      xkey: 'x',
      ykeys: ['y', 'z'],
      labels: ['Series A', 'Series B'],
      grid: false,
      gridTextColor: colors['light']['dark'],
      fillOpacity: 0.1,
      behaveLikeLine: true,
      resize: true,
      pointFillColors: [colors['primary'], colors['secondary']],
      pointStrokeColors: [colors['primary'], colors['secondary']],
      lineColors: [colors['primary'], colors['secondary']]
    });
    Morris.Donut({
      element: 'morris-chart-donut',
      data: [{
        label: "Download Sales",
        value: 12
      }, {
        label: "In-Store Sales",
        value: 30
      }, {
        label: "Mail-Order Sales",
        value: 20
      }],
      grid: false,
      backgroundColor: 'transparent',
      gridTextColor: colors['light']['dark'],
      labelColor: colors['light']['dark'],
      resize: true,
      colors: [colors['primary'], colors['secondary'], colors['red']]
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=morris.js.map
