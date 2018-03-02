(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  $(document).ready(function () {
    'use strict';

    var nav_dropdown, nav_item, nav_items, position;
    nav_items = $('.navbar ul.navbar-nav.-right li');
    nav_item = "<li id='themes-item'>" + "<a href='#themes-dropdown' class='has-morph-dropdown'>" + "<i class='pe pe-paint-bucket'></i>" + "<span class='navbar-item-count'>45</span>" + "</a>" + "</li>";
    position = nav_items.length > 2 ? 'after' : 'before';
    nav_items.eq(1)[position](nav_item);
    nav_dropdown = "<div class='morph-dropdown' id='themes-dropdown'>" + "<div class='morph-content -gallery'>" + "<h3>Themes</h3>" + "<p class='_text-muted'>Choose the color scheme you want to use when entering your admin dashboard.</p>" + "<ul class='morph-gallery -three'>" + "<li><a data-change-theme='volta'>Volta</a></li>" + "<li><a data-change-theme='purple-bliss'>Purple Bliss</a></li>" + "<li><a data-change-theme='love-couple'>Love Couple</a></li>" + "<li><a data-change-theme='deep-space'>Deep Space</a></li>" + "<li><a data-change-theme='from-beyond'>From Beyond</a></li>" + "<li><a data-change-theme='curiosity-blue'>Curiosity Blue</a></li>" + "<li><a data-change-theme='orca'>Orca</a></li>" + "<li><a data-change-theme='love-tonight'>Love Tonight</a></li>" + "<li><a data-change-theme='love-and-liberty'>Love And Liberty</a></li>" + "<li><a data-change-theme='blue-lagoon'>Blue Lagoon</a></li>" + "<li><a data-change-theme='grapefruit-sunset'>Grapefruit Sunset</a></li>" + "<li><a data-change-theme='frost'>Frost</a></li>" + "<li><a data-change-theme='mauve'>Mauve</a></li>" + "<li><a data-change-theme='under-the-lake'>Under The Lake</a></li>" + "<li><a data-change-theme='vice-city'>Vice City</a></li>" + "<li><a data-change-theme='mild'>Mild</a></li>" + "<li><a data-change-theme='nepal'>Nepal</a></li>" + "<li><a data-change-theme='ibiza-sunset'>Ibiza Sunset</a></li>" + "<li><a data-change-theme='sunset'>Sunset</a></li>" + "<li><a data-change-theme='colored-lenses'>Colored Lenses</a></li>" + "<li><a data-change-theme='disco'>Disco</a></li>" + "<li><a data-change-theme='dania'>Dania</a></li>" + "<li><a data-change-theme='50shades'>50shades</a></li>" + "<li><a data-change-theme='very-blue'>Very Blue</a></li>" + "<li><a data-change-theme='dawn'>Dawn</a></li>" + "<li><a data-change-theme='dusk'>Dusk</a></li>" + "<li><a data-change-theme='dusk-2'>Dusk 2</a></li>" + "<li><a data-change-theme='delhi'>Delhi</a></li>" + "<li><a data-change-theme='cosmic-fusion'>Cosmic Fusion</a></li>" + "<li><a data-change-theme='firewatch'>Firewatch</a></li>" + "<li><a data-change-theme='lush'>Lush</a></li>" + "<li><a data-change-theme='80s-purple'>80s Purple</a></li>" + "<li><a data-change-theme='royal'>Royal</a></li>" + "<li><a data-change-theme='deep-sea-space'>Deep Sea Space</a></li>" + "<li><a data-change-theme='solid-vault'>Solid Vault</a></li>" + "<li><a data-change-theme='politics'>Politics</a></li>" + "<li><a data-change-theme='transfile'>Transfile</a></li>" + "<li><a data-change-theme='red-ocean'>Red Ocean</a></li>" + "<li><a data-change-theme='pink-lime'>Pink Lime</a></li>" + "<li><a data-change-theme='easy-med'>Easy Med</a></li>" + "<li><a data-change-theme='cocoa-ice'>Cocoa Ice</a></li>" + "<li><a data-change-theme='candy-ice'>Candy Ice</a></li>" + "<li><a data-change-theme='dark-skies'>Dark Skies</a></li>" + "<li><a data-change-theme='forest'>Forest</a></li>" + "<li><a data-change-theme='miami-dolphins'>Miami Dolphins</a></li>" + "</ul>" + "</div>" + "</div>";
    $('.navbar .morph-dropdown-list .morph-dropdown').eq(0).after(nav_dropdown);
    $('[data-change-theme]').each(function (index, item) {
      var theme;
      item = $(item);
      theme = item.attr('data-change-theme');
      item.on('click', function () {
        Cookies.set('theme', theme, {
          expires: 365
        });
        window.location.reload();
      });
    });
  });
}).call(undefined);

},{}]},{},[1])

//# sourceMappingURL=picker.js.map
