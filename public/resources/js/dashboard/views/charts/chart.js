(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var ctx, data, gradient, gradient1, gradient2, gradient3, gradient4, gradientHover, line_chart, options;
    Chart.defaults.global.defaultFontColor = colors['light']['dark'];
    Chart.defaults.global.maintainAspectRatio = true;
    ctx = $('#chartjs-chart-line')[0].getContext('2d');
    gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, hexToRGBA(colors['primary'], 0.125));
    gradient.addColorStop(1, hexToRGBA(colors['primary'], 0.5));
    data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Sales",
        fill: true,
        lineTension: 0.33,
        backgroundColor: gradient,
        borderColor: hexToRGBA(colors['primary'], 0.5),
        borderWidth: 1,
        pointRadius: 5,
        pointBorderWidth: 1,
        pointBorderColor: hexToRGBA(colors['primary'], 0.25),
        pointBackgroundColor: hexToRGBA(colors['primary'], 1),
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: hexToRGBA(colors['white'], 1),
        pointHoverBorderColor: hexToRGBA(colors['primary'], 1),
        data: [50, 40, 60, 81, 95, 100, 100]
      }]
    };
    options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    line_chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
    ctx = $('#chartjs-chart-bar')[0].getContext('2d');
    gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, hexToRGBA(colors['primary'], 0.125));
    gradient.addColorStop(1, hexToRGBA(colors['primary'], 0.5));
    gradientHover = ctx.createLinearGradient(0, 0, 0, 400);
    gradientHover.addColorStop(0, hexToRGBA(colors['primary'], 0.25));
    gradientHover.addColorStop(1, hexToRGBA(colors['primary'], 0.625));
    data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [{
        label: "Sales",
        fill: true,
        lineTension: 0.33,
        backgroundColor: gradient,
        hoverBackgroundColor: gradientHover,
        borderColor: hexToRGBA(colors['primary'], 0.5),
        borderWidth: 1,
        data: [50, 40, 60, 81, 95, 100, 100]
      }]
    };
    options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
    line_chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
    ctx = $('#chartjs-chart-radar')[0].getContext('2d');
    gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, hexToRGBA(colors['primary'], 0.125));
    gradient.addColorStop(1, hexToRGBA(colors['primary'], 0.5));
    data = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [{
        label: "Activities",
        fill: true,
        backgroundColor: gradient,
        borderColor: hexToRGBA(colors['primary'], 0.5),
        borderWidth: 1,
        pointRadius: 5,
        pointBorderWidth: 1,
        pointBorderColor: hexToRGBA(colors['primary'], 0.25),
        pointBackgroundColor: hexToRGBA(colors['primary'], 1),
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHoverBackgroundColor: hexToRGBA(colors['white'], 1),
        pointHoverBorderColor: hexToRGBA(colors['primary'], 1),
        data: [65, 59, 90, 81, 56, 55, 40]
      }]
    };
    options = {
      scale: {
        ticks: {
          fontColor: colors['light']['light'],
          beginAtZero: true,
          backdropColor: 'transparent',
          showLabelBackdrop: true
        }
      }
    };
    line_chart = new Chart(ctx, {
      type: 'radar',
      data: data,
      options: options
    });
    ctx = $('#chartjs-chart-polar')[0].getContext('2d');
    gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, hexToRGBA(colors['primary'], 0.125));
    gradient1.addColorStop(1, hexToRGBA(colors['primary'], 0.25));
    gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, hexToRGBA(colors['primary'], 0.25));
    gradient2.addColorStop(1, hexToRGBA(colors['primary'], 0.375));
    gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient3.addColorStop(0, hexToRGBA(colors['primary'], 0.375));
    gradient3.addColorStop(1, hexToRGBA(colors['primary'], 0.5));
    gradient4 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient4.addColorStop(0, hexToRGBA(colors['primary'], 0.5));
    gradient4.addColorStop(1, hexToRGBA(colors['primary'], 0.625));
    gradientHover = ctx.createLinearGradient(0, 0, 0, 400);
    gradientHover.addColorStop(0, hexToRGBA(colors['primary'], 0.625));
    gradientHover.addColorStop(1, hexToRGBA(colors['primary'], 0.75));
    data = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing"],
      datasets: [{
        label: "Activities",
        fill: true,
        backgroundColor: [gradient1, gradient2, gradient3, gradient4],
        hoverBackgroundColor: gradientHover,
        borderColor: [hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5)],
        borderWidth: 1,
        data: [65, 59, 90, 81]
      }]
    };
    options = {
      scale: {
        ticks: {
          fontColor: colors['light']['light'],
          beginAtZero: true,
          backdropColor: 'transparent',
          showLabelBackdrop: true
        }
      }
    };
    line_chart = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: options
    });
    ctx = $('#chartjs-chart-pie')[0].getContext('2d');
    gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, hexToRGBA(colors['primary'], 0.125));
    gradient1.addColorStop(1, hexToRGBA(colors['primary'], 0.25));
    gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, hexToRGBA(colors['primary'], 0.25));
    gradient2.addColorStop(1, hexToRGBA(colors['primary'], 0.375));
    gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient3.addColorStop(0, hexToRGBA(colors['primary'], 0.375));
    gradient3.addColorStop(1, hexToRGBA(colors['primary'], 0.5));
    gradientHover = ctx.createLinearGradient(0, 0, 0, 400);
    gradientHover.addColorStop(0, hexToRGBA(colors['primary'], 0.5));
    gradientHover.addColorStop(1, hexToRGBA(colors['primary'], 0.625));
    data = {
      labels: ["Eating", "Drinking", "Sleeping"],
      datasets: [{
        label: "Activities",
        fill: true,
        backgroundColor: [gradient1, gradient2, gradient3],
        hoverBackgroundColor: gradientHover,
        borderColor: [hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5)],
        borderWidth: 1,
        data: [6, 4, 4]
      }]
    };
    line_chart = new Chart(ctx, {
      type: 'pie',
      data: data
    });
    ctx = $('#chartjs-chart-doughnut')[0].getContext('2d');
    gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient1.addColorStop(0, hexToRGBA(colors['primary'], 0.125));
    gradient1.addColorStop(1, hexToRGBA(colors['primary'], 0.25));
    gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient2.addColorStop(0, hexToRGBA(colors['primary'], 0.25));
    gradient2.addColorStop(1, hexToRGBA(colors['primary'], 0.375));
    gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
    gradient3.addColorStop(0, hexToRGBA(colors['primary'], 0.375));
    gradient3.addColorStop(1, hexToRGBA(colors['primary'], 0.5));
    gradientHover = ctx.createLinearGradient(0, 0, 0, 400);
    gradientHover.addColorStop(0, hexToRGBA(colors['primary'], 0.5));
    gradientHover.addColorStop(1, hexToRGBA(colors['primary'], 0.625));
    data = {
      labels: ["Eating", "Drinking", "Sleeping"],
      datasets: [{
        label: "Activities",
        fill: true,
        backgroundColor: [gradient1, gradient2, gradient3],
        hoverBackgroundColor: gradientHover,
        borderColor: [hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5), hexToRGBA(colors['primary'], 0.5)],
        borderWidth: 1,
        data: [6, 4, 4]
      }]
    };
    line_chart = new Chart(ctx, {
      type: 'doughnut',
      data: data
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=chart.js.map
