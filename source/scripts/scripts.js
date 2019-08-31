const header = document.querySelector('.js-header');
const headerBtn = document.querySelector('.js-header__btn');
const nav = document.querySelector('.js-nav');
const filterBtns = document.querySelectorAll('.js-filter__btn');
const listIconsToggle = headerBtn.querySelectorAll('.js-icon_toggle');
const modOpened = 'is-opened';
const TABLET = 660;

// if JS(true)
nav.classList.remove('is-no-js');
header.classList.remove('is-no-js');

// open menu mobile
headerBtn.addEventListener('click', function toggleMenu() {
  nav.classList.toggle(modOpened);
  header.classList.toggle(modOpened);

  for (let i = 0; i < listIconsToggle.length; i++) {
    const el = listIconsToggle[i];
    if (el.classList.contains(modOpened)) {
      el.classList.remove(modOpened)
    } else {
      el.classList.add(modOpened);
    }
  }
});

// определяем width window
const w = window;
const d = document;
const e = d.documentElement;
const g = d.getElementsByTagName('body')[0];
const windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;

// добавляем attr disabled
if (windowWidth >= TABLET) {
  for (let i = 0; i < filterBtns.length; i++) {
    const el = filterBtns[i];
    el.setAttribute('disabled', 'disabled');
  }
}
