(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var calendar_date, today, zero_pad;
    zero_pad = function zero_pad(num, places) {
      var zero;
      zero = places - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    };
    today = new Date();
    calendar_date = today.getFullYear() + '-' + zero_pad(today.getMonth() + 1, 2);
    $('#calendar-add-event').on('click', function () {
      var event;
      event = {
        id: 1,
        title: 'Purchase Volta',
        start: calendar_date + '-04'
      };
      $('#calendar').fullCalendar('renderEvent', event, true);
    });
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: calendar_date + '-12',
      editable: true,
      eventLimit: true,
      events: [{
        title: 'All Day Event',
        start: calendar_date + '-01'
      }, {
        title: 'Long Event',
        start: calendar_date + '-07',
        end: calendar_date + '-10'
      }, {
        id: 999,
        title: 'Repeating Event',
        start: calendar_date + '-09T16:00:00'
      }, {
        id: 999,
        title: 'Repeating Event',
        start: calendar_date + '-16T16:00:00'
      }, {
        title: 'Conference',
        start: calendar_date + '-11',
        end: calendar_date + '-13'
      }, {
        title: 'Meeting',
        start: calendar_date + '-12T10:30:00',
        end: calendar_date + '-12T12:30:00'
      }, {
        title: 'Lunch',
        start: calendar_date + '-12T12:00:00'
      }, {
        title: 'Meeting',
        start: calendar_date + '-12T14:30:00'
      }, {
        title: 'Happy Hour',
        start: calendar_date + '-12T17:30:00'
      }, {
        title: 'Dinner',
        start: calendar_date + '-12T20:00:00'
      }, {
        title: 'Birthday Party',
        start: calendar_date + '-13T07:00:00'
      }, {
        title: 'Click for Google',
        url: 'http://google.com/',
        start: calendar_date + '-28'
      }]
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=calendar.js.map
