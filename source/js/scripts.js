/* eslint-disable */
var header = document.querySelector('.js-header');
var headerBtn = document.querySelector('.js-header__btn');
var nav = document.querySelector('.js-nav');
var filterBtns = document.querySelectorAll('.js-filter__btn');
var listIconsToggle = headerBtn.querySelectorAll('.js-icon_toggle');
var modOpened = 'is-opened';
var TABLET = 660;

// if JS(true)
nav.classList.remove('is-no-js');
header.classList.remove('is-no-js');

// open menu mobile
headerBtn.addEventListener('click', function toggleMenu() {
  nav.classList.toggle(modOpened);
  header.classList.toggle(modOpened);

  for (var i = 0; i < listIconsToggle.length; i++) {
    var el = listIconsToggle[i];
    if (el.classList.contains(modOpened)) {
      el.classList.remove(modOpened)
    } else {
      el.classList.add(modOpened);
    }
  }
});

// определяем width window
var w = window;
var d = document;
var e = d.documentElement;
var g = d.getElementsByTagName('body')[0];
var windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;

// добавляем attr disabled
if (windowWidth >= TABLET) {
  for (var i = 0; i < filterBtns.length; i++) {
    var el = filterBtns[i];
    el.setAttribute('disabled', 'disabled');
  }
}
