/* =========================================================
   KlikSIMRS — Landing Page scripts
   ========================================================= */
(function () {
  'use strict';

  var WA_NUMBER = '6289699935552'; // nomor tujuan form demo

  /* ---------- Menu mobile ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Filter modul ---------- */
  var filters = document.querySelectorAll('.filter');
  var modules = document.querySelectorAll('#module-list .module');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      modules.forEach(function (m) {
        m.hidden = !(cat === 'all' || m.getAttribute('data-cat') === cat);
      });
    });
  });

  /* ---------- FAQ: satu terbuka dalam satu waktu ---------- */
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Form demo -> WhatsApp ---------- */
  var form = document.getElementById('demo-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var firstInvalid = null;
      required.forEach(function (input) {
        var empty = !input.value.trim();
        input.setAttribute('aria-invalid', empty ? 'true' : 'false');
        input.style.borderColor = empty ? '#B91C1C' : '';
        if (empty && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var data = new FormData(form);
      var text =
        'Halo tim KlikSIMRS, saya ingin menjadwalkan demo.%0A' +
        'Nama: ' + encodeURIComponent(data.get('nama')) + '%0A' +
        'Rumah sakit: ' + encodeURIComponent(data.get('rs')) + '%0A' +
        'Tipe RS: ' + encodeURIComponent(data.get('tipe')) + '%0A' +
        'No. WA: ' + encodeURIComponent(data.get('wa'));

      form.classList.add('is-sent');
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + text, '_blank', 'noopener');
    });
  }

  /* ---------- Tahun footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
