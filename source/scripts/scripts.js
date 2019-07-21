var header = document.querySelector('.js-header');
var headerBtn = document.querySelector('.js-header__btn');
var nav = document.querySelector('.js-nav');
var listIconsToggle = headerBtn.querySelectorAll('.js-icon_toggle');
var modOpened = 'is-opened';

// if JS(true)
nav.classList.remove('is-no-js');
header.classList.remove('is-no-js');

// open menu mobile
headerBtn.addEventListener('click', function toggleMenu() {
  nav.classList.toggle(modOpened);
  header.classList.toggle(modOpened);

  for (var i = 0; i < listIconsToggle.length; i++) {
    var el = listIconsToggle[i];
    el.classList.contains(modOpened) ? el.classList.remove(modOpened) : el.classList.add(modOpened);
  }
});
