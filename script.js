(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme');
  function currentTheme() {
    return doc.getAttribute('data-theme') || 'light';
  }
  function updateMeta(t) {
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#F7F5F0' : '#0C1424');
  }
  updateMeta(currentTheme());
  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    doc.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    updateMeta(next);
  });

  /* ---------- Mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  function closeMenu() { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* ---------- Chart bars grow when scrolled into view ---------- */
  var bars = document.querySelectorAll('.bars');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    bars.forEach(function (b) { io.observe(b); });
  } else {
    bars.forEach(function (b) { b.classList.add('in'); });
  }

  /* ---------- Highlight current section in the nav ---------- */
  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          if (!map[en.target.id].classList.contains('btn')) map[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Service links preselect the contact form ---------- */
  var select = document.getElementById('service');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () { select.value = a.getAttribute('data-service'); });
  });

  /* ---------- Contact form ----------
     If data-endpoint on the form is set (for example a Formspree URL), the message is posted there.
     If it is empty or the request fails, an email draft opens instead. */
  var form = document.getElementById('form');
  var status = document.getElementById('status');
  var EMAIL = 'awaiszahid322@gmail.com';

  function setStatus(msg, cls) { status.textContent = msg; status.className = 'status' + (cls ? ' ' + cls : ''); }

  function openEmailDraft(data) {
    var subject = encodeURIComponent('Inquiry from ' + data.get('name'));
    var body = encodeURIComponent(
      'Name: ' + data.get('name') +
      '\nEmail: ' + data.get('email') +
      '\nBusiness: ' + (data.get('business') || '-') +
      '\nService: ' + data.get('service') +
      '\n\n' + data.get('message'));
    window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
    setStatus('Opening your email app. You can also write to ' + EMAIL + ' directly.', 'ok');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = false;
    form.querySelectorAll('[required]').forEach(function (f) {
      var invalid = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle('err', invalid);
      if (invalid) bad = true;
    });
    if (bad) { setStatus('Please fill in your name, a valid email and a message.', 'bad'); return; }

    var data = new FormData(form);
    if (data.get('_gotcha')) return; /* spam trap */
    var endpoint = form.getAttribute('data-endpoint');
    if (!endpoint) { openEmailDraft(data); return; }

    setStatus('Sending...');
    fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('failed');
        form.reset();
        setStatus('Thanks. Your message is in, and I will reply within a day.', 'ok');
      })
      .catch(function () { openEmailDraft(data); });
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
