/* ==========================================================================
   RoboComm — main.js
   [1] Отметка «JS включён»  (нужна для анимации .reveal)
   [2] Шапка: тень при прокрутке
   [3] Мобильное меню (бургер)
   [4] Появление блоков при прокрутке (.reveal)
   [5] Блик жидкого стекла, следующий за курсором
   [6] Год в подвале
   ========================================================================== */
(function () {
  'use strict';

  /* [1] */
  document.documentElement.classList.add('js');

  /* [2] ШАПКА */
  var header = document.getElementById('top');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 24); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* [3] БУРГЕР-МЕНЮ */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* [4] REVEAL */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms'; /* лёгкая «лесенка» */
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* [5] БЛИК СТЕКЛА: пишем позицию курсора в --mx / --my каждой .glass */
  document.querySelectorAll('.glass').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* [6] ГОД */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
