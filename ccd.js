/* ==========================================================================
   ccd.js — shared behavior for chaundacdallas.com
   Every module is opt-in by markup (data attributes / classes), so a page
   only gets what it uses. No dependencies. Respects reduced motion.
   ========================================================================== */
(function (w, d) {
  'use strict';
  var CCD = w.CCD = w.CCD || {};
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  CCD.reduce = reduce;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  CCD.$ = $; CCD.$$ = $$;

  /* ---- Mobile menu ------------------------------------------------------ */
  CCD.menu = function () {
    var btn = $('.menu-btn'), list = $('#navLinks');
    if (!btn || !list) return;
    function set(open) { btn.setAttribute('aria-expanded', open); list.classList.toggle('open', open); }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    list.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  };

  /* ---- Current page in nav --------------------------------------------- */
  CCD.current = function () {
    var path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    $$('.nav-links a').forEach(function (a) {
      var u; try { u = new URL(a.href); } catch (e) { return; }
      var p = u.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
      if (!u.hash && p === path && p !== '/') a.setAttribute('aria-current', 'page');
    });
  };

  /* ---- Scroll progress bar --------------------------------------------- */
  CCD.progress = function () {
    var bar = $('.prog'); if (!bar) return;
    var tick = false;
    function up() {
      var h = d.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.style.setProperty('--p', max > 0 ? (h.scrollTop / max).toFixed(4) : 0); tick = false;
    }
    w.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(up); } }, { passive: true });
    up();
  };

  /* ---- Reveal on scroll (+ automatic stagger) -------------------------- */
  CCD.reveal = function (root) {
    $$('[data-stagger]', root).forEach(function (p) {
      Array.prototype.forEach.call(p.children, function (c, i) {
        if (!c.hasAttribute('data-reveal')) c.setAttribute('data-reveal', p.getAttribute('data-stagger') || '');
        c.style.setProperty('--i', i);
      });
    });
    var els = $$('[data-reveal]:not(.in)', root);
    if (reduce || !('IntersectionObserver' in w)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  };

  /* ---- Chapter rail ----------------------------------------------------- */
  CCD.rail = function () {
    var rail = $('.rail'); if (!rail || !('IntersectionObserver' in w)) return;
    var links = $$('a', rail), map = {};
    links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) map[s.id] = a; });
    var hero = $('[data-hero]');
    if (hero) new IntersectionObserver(function (en) { rail.classList.toggle('show', !en[0].isIntersecting); }, { threshold: 0.2 }).observe(hero);
    else rail.classList.add('show');
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) {
        if (!x.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('on'); });
        var a = map[x.target.id]; if (a) a.classList.add('on');
        rail.classList.toggle('on-dark', x.target.classList.contains('dark'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(d.getElementById(id)); });
  };

  /* ---- Tabs: [data-tabs] > button[role=tab][aria-controls] ------------- */
  CCD.tabs = function () {
    $$('[data-tabs]').forEach(function (list) {
      var tabs = $$('[role="tab"]', list);
      function sel(t, focus) {
        tabs.forEach(function (x) {
          var on = x === t, p = d.getElementById(x.getAttribute('aria-controls'));
          x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1;
          if (p) { p.hidden = !on; if (on) { CCD.replay(p); } }
        });
        if (focus) t.focus();
        list.dispatchEvent(new CustomEvent('ccd:tab', { detail: t }));
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { sel(t); });
        t.addEventListener('keydown', function (e) {
          var n = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (n) { e.preventDefault(); sel(tabs[(i + n + tabs.length) % tabs.length], true); }
        });
      });
    });
  };

  /* Re-run entrance animation for freshly shown content */
  CCD.replay = function (el) {
    var kids = $$('[data-reveal]', el);
    kids.forEach(function (k) { k.classList.remove('in'); });
    void el.offsetWidth;
    requestAnimationFrame(function () { kids.forEach(function (k) { k.classList.add('in'); }); });
  };

  /* ---- Carousel: .carousel > .track-x + .car-ctl ----------------------- */
  CCD.carousel = function (root) {
    $$('.carousel', root).forEach(function (c) {
      var t = $('.track-x', c), prev = $('[data-prev]', c), next = $('[data-next]', c), bar = $('.car-bar i', c);
      if (!t || c._ccd) return; c._ccd = 1;
      function step() { var f = t.firstElementChild; return f ? f.getBoundingClientRect().width + 16 : 300; }
      function up() {
        var max = t.scrollWidth - t.clientWidth;
        if (prev) prev.disabled = t.scrollLeft < 4;
        if (next) next.disabled = t.scrollLeft > max - 4;
        if (bar) {
          var vis = t.scrollWidth ? t.clientWidth / t.scrollWidth : 1;
          bar.style.setProperty('--w', Math.max(vis * 100, 12) + '%');
          bar.style.setProperty('--x', (max > 0 ? (t.scrollLeft / max) * (100 / Math.max(vis, .12) - 100) : 0) + '%');
        }
      }
      if (prev) prev.addEventListener('click', function () { t.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
      if (next) next.addEventListener('click', function () { t.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
      t.addEventListener('scroll', function () { requestAnimationFrame(up); }, { passive: true });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); t.scrollBy({ left: step() }); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); t.scrollBy({ left: -step() }); }
      });
      w.addEventListener('resize', up); up();
    });
  };

  /* ---- Flip cards (buttons) -------------------------------------------- */
  CCD.flip = function (root) {
    $$('.flip', root).forEach(function (f) {
      if (f._ccd) return; f._ccd = 1;
      f.addEventListener('click', function () { f.setAttribute('aria-pressed', f.getAttribute('aria-pressed') !== 'true'); });
    });
  };

  /* ---- Count-up numbers: [data-count="28"] ----------------------------- */
  CCD.counters = function () {
    var els = $$('[data-count]'); if (!els.length) return;
    function run(el) {
      var end = parseFloat(el.dataset.count), dur = 1400, t0 = null;
      if (reduce) { el.textContent = end; return; }
      function f(ts) { if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * e); if (p < 1) requestAnimationFrame(f); }
      requestAnimationFrame(f);
    }
    if (!('IntersectionObserver' in w)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } }); }, { threshold: .6 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* ---- Clipboard helper ------------------------------------------------- */
  CCD.copy = function (text, done) {
    function fb() {
      var t = d.createElement('textarea'); t.value = text; t.style.cssText = 'position:fixed;opacity:0'; d.body.appendChild(t); t.select();
      var ok = false; try { ok = d.execCommand('copy'); } catch (e) {} d.body.removeChild(t); done && done(ok);
    }
    if (navigator.clipboard && w.isSecureContext) navigator.clipboard.writeText(text).then(function () { done && done(true); }, fb); else fb();
  };

  CCD.esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---- Boot ------------------------------------------------------------- */
  CCD.init = function () {
    d.documentElement.classList.remove('js-off');
    CCD.menu(); CCD.current(); CCD.progress(); CCD.tabs(); CCD.carousel(); CCD.flip(); CCD.counters(); CCD.rail(); CCD.reveal();
  };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', CCD.init); else CCD.init();
})(window, document);
