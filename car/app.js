/* ============================================================
   JAGUAR — DARK HERITAGE  ·  app.js
   Lenis smooth scroll (custom wrapper) + GSAP ScrollTrigger
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const viewport = $('#viewport');
  const content  = $('#content');

  /* ---------------------------------------------------------
     0 · Failsafe — if anything throws, reveal everything
  --------------------------------------------------------- */
  function revealAll() {
    $$('[data-rv]').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.sec-head .rule').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
    $$('.hero h1 .ln i').forEach(el => { el.style.transform = 'none'; });
  }

  try {
    boot();
  } catch (err) {
    console.error('init error', err);
    revealAll();
  }

  function boot() {
    const hasGSAP  = typeof gsap !== 'undefined';
    const hasST    = typeof ScrollTrigger !== 'undefined';
    const hasLenis = typeof Lenis !== 'undefined';

    if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

    /* set initial hidden states (only when we can animate them back) */
    if (hasGSAP) {
      gsap.set('[data-rv]', { opacity: 0, y: 26 });
      gsap.set('.sec-head .rule', { scaleX: 0, transformOrigin: 'left center' });
    } else {
      revealAll();
    }

    /* =========================================================
       LENIS  (drives the .viewport scroll container)
    ========================================================= */
    // ScrollTrigger must read scroll from our custom container
    if (hasST) ScrollTrigger.defaults({ scroller: viewport });

    let lenis = null;
    if (hasLenis) {
      lenis = new Lenis({
        wrapper: viewport,
        content: content,
        duration: 1.15,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.4,
        gestureOrientation: 'vertical'
      });

      if (hasST) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }

    const scrollTo = (target, opts) => {
      const el = typeof target === 'string' ? document.getElementById(target) : target;
      if (!el) return;
      if (lenis) lenis.scrollTo(el, Object.assign({ offset: 0, duration: 1.25 }, opts || {}));
      else viewport.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    };

    const getScroll = () => viewport.scrollTop;

    /* =========================================================
       LOADER
    ========================================================= */
    const loader = $('#loader');
    const ringFg = $('#ringFg');
    const CIRC = 175.9;
    let started = false;

    (function runLoader() {
      const lw  = $('.loader .lw');
      const lbl = $('#loadLbl');
      if (hasGSAP) {
        gsap.to(lw,  { opacity: 1, y: 0, duration: .8, ease: 'power2.out', delay: .15 });
        gsap.to(lbl, { opacity: 1, duration: .8, delay: .5 });
      } else { lw.style.opacity = 1; lbl.style.opacity = 1; }

      let p = 0;
      const tick = setInterval(() => {
        p += Math.random() * 9 + 4;
        if (p >= 100) { p = 100; clearInterval(tick); finishLoad(); }
        ringFg.style.strokeDashoffset = CIRC * (1 - p / 100);
      }, 130);
    })();

    function finishLoad() {
      setTimeout(() => {
        loader.classList.add('done');
        startExperience();
        setTimeout(() => { loader.style.display = 'none'; }, 1000);
      }, 360);
    }

    /* =========================================================
       INTRO  (hero headline + first reveals)
    ========================================================= */
    function startExperience() {
      if (started) return; started = true;
      if (!hasGSAP) { revealAll(); return; }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('.hero h1 .ln i', { y: 0, duration: 1.05, stagger: .12 }, 0)
        .to('.hero [data-hero-reveal]', { opacity: 1, y: 0, duration: .8, stagger: .12 }, .5)
        .from('.scroll-ind', { opacity: 0, duration: .8 }, .9);
    }
    /* hero sub/cta initial */
    if (hasGSAP) gsap.set('.hero [data-hero-reveal]', { opacity: 0, y: 20 });

    /* =========================================================
       HEADER · TOPBAR · ACTIVE NAV · STICKY CTA
    ========================================================= */
    const header    = $('#header');
    const topbar    = $('#topbar');
    const stickyCta = $('#stickyCta');
    const heroEl    = $('#hero');
    const heroH     = heroEl ? heroEl.offsetHeight : 0;

    function onScroll() {
      const y = getScroll();
      const max = content.scrollHeight - viewport.clientHeight;
      header.classList.toggle('solid', y > 40);
      topbar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      if (stickyCta) {
        const showSticky = heroEl ? y > heroH * 0.9 && y < max - 420 : y > 120 && y < max - 420;
        stickyCta.classList.toggle('show', showSticky);
      }
    }
    if (lenis) lenis.on('scroll', onScroll);
    viewport.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* active section → menu highlight */
    const navLinks = $$('.menu-link');
    function setActive(id) {
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.scroll === id));
    }
    if (hasST) {
      $$('[data-nav]').forEach(sec => {
        ScrollTrigger.create({
          trigger: sec, start: 'top 55%', end: 'bottom 55%',
          onToggle: self => { if (self.isActive) setActive(sec.dataset.nav); }
        });
      });
    }

    /* =========================================================
       MENU OPEN / CLOSE
    ========================================================= */
    const menu = $('#menu');
    const openMenu = () => {
      menu.classList.add('open');
      if (lenis) lenis.stop();
      $$('.menu-link').forEach((l, i) => l.style.setProperty('--d', (0.06 * i + 0.12) + 's'));
    };
    const closeMenu = () => { menu.classList.remove('open'); if (lenis) lenis.start(); };
    $('#openMenu').addEventListener('click', openMenu);
    $('#closeMenu').addEventListener('click', closeMenu);

    /* any element with data-scroll */
    $$('[data-scroll]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const id = el.dataset.scroll;
        if (menu.classList.contains('open')) {
          closeMenu();
          setTimeout(() => scrollTo(id), 280);
        } else scrollTo(id);
      });
    });

    /* =========================================================
       REVEAL ON SCROLL  ([data-rv], grouped stagger [data-stag])
    ========================================================= */
    if (hasST) {
      // grouped stagger inside a section
      $$('[data-nav], .section').forEach(sec => {
        const stag = $$('[data-stag]', sec);
        if (stag.length) {
          ScrollTrigger.create({
            trigger: sec, start: 'top 72%',
            onEnter: () => gsap.to(stag, { opacity: 1, y: 0, duration: .85, ease: 'power3.out', stagger: .1 })
          });
        }
      });
      // individual reveals (skip stagger, hero, rules — rules draw separately)
      $$('[data-rv]').forEach(el => {
        if (el.hasAttribute('data-stag')) return;
        if (el.classList.contains('rule')) return;
        ScrollTrigger.create({
          trigger: el, start: 'top 86%',
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: 'power3.out' })
        });
      });
      $$('.sec-head .rule').forEach(rule => {
        ScrollTrigger.create({
          trigger: rule.closest('.sec-head') || rule,
          start: 'top 82%',
          onEnter: () => gsap.to(rule, { opacity: 1, y: 0, scaleX: 1, duration: .85, ease: 'power3.out' })
        });
      });
      $$('.sec-head .sec-index').forEach(idx => {
        gsap.set(idx, { opacity: 0, x: -10 });
        ScrollTrigger.create({
          trigger: idx.closest('.sec-head') || idx,
          start: 'top 78%',
          onEnter: () => gsap.to(idx, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' })
        });
      });
    } else { revealAll(); }

    /* =========================================================
       SCROLL STORYTELLING  (hero zoom, card tilt)
    ========================================================= */
    if (hasST && hasGSAP && !prefersReduced) {
      const hero = $('#hero');
      const heroMedia = $('.hero-media');
      if (hero && heroMedia) {
        gsap.fromTo(heroMedia, { scale: 1.06 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.65 }
        });
      }
      if (window.matchMedia('(hover: hover)').matches) {
        $$('.dcard, .ccard, .irow').forEach(card => {
          card.classList.add('is-ix');
          card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            const ix = ((e.clientX - r.left) / r.width - 0.5) * 7;
            const iy = ((e.clientY - r.top) / r.height - 0.5) * -5;
            card.style.setProperty('--ix-x', ix + 'deg');
            card.style.setProperty('--ix-y', iy + 'deg');
          });
          card.addEventListener('pointerleave', () => {
            card.style.removeProperty('--ix-x');
            card.style.removeProperty('--ix-y');
          });
        });
      }
    }

    /* =========================================================
       PARALLAX  (scrub image translate)
    ========================================================= */
    if (hasST && !prefersReduced) {
      const px = (img, dist) => {
        if (!img) return;
        gsap.fromTo(img, { yPercent: -dist }, {
          yPercent: dist, ease: 'none',
          scrollTrigger: { trigger: img.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: true }
        });
      };
      px($('#heroImg'), 6);
      px($('#stImg'), 7);
      px($('#divImg'), 7);

      // interior image zoom-out on enter
      const intImg = $('#intImg');
      if (intImg) {
        gsap.fromTo(intImg, { scale: 1.25 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: '.int-hero', start: 'top bottom', end: 'top 30%', scrub: true }
        });
      }
    } else { revealAll(); }

    /* =========================================================
       03 · STATEMENT — word-by-word brighten
    ========================================================= */
    (function statementWords() {
      const h = $('#stWords');
      if (!h) return;
      const words = h.textContent.trim().split(' ');
      h.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
      if (hasST) {
        const spans = $$('.word', h);
        ScrollTrigger.create({
          trigger: h, start: 'top 80%', end: 'top 38%', scrub: true,
          onUpdate: self => {
            const reach = self.progress * spans.length * 1.25;
            spans.forEach((s, i) => { s.style.opacity = i < reach ? 1 : 0.16; });
          }
        });
      } else { $$('.word', h).forEach(s => s.style.opacity = 1); }
    })();

    /* =========================================================
       05 · EXTERIOR — horizontal gallery
    ========================================================= */
    (function exterior() {
      const track  = $('#extTrack');
      const bgs    = $$('#extBg img');
      const thumbs = $$('#extThumbs button');
      const bar    = $('#extBar');
      const numEl  = $('#extNum');
      const capEl  = $('#extCap');
      if (!track) return;

      const caps = [
        ['Striking Presence', 'Long lines, low stance, unmistakable confidence.'],
        ['Sculpted Form', 'Every panel shaped to catch and hold the light.'],
        ['Heritage Lines', 'A silhouette drawn from decades of motoring legend.'],
        ['Crimson Edition', 'Depth and warmth in a finish made to be noticed.']
      ];
      let cur = 0;
      function set(i) {
        i = Math.max(0, Math.min(bgs.length - 1, i));
        if (i === cur) return; cur = i;
        bgs.forEach((b, n) => b.classList.toggle('on', n === i));
        thumbs.forEach((t, n) => t.classList.toggle('on', n === i));
        bar.style.width = (100 / bgs.length) + '%';
        bar.style.left  = (i * 100 / bgs.length) + '%';
        numEl.textContent = String(i + 1).padStart(2, '0');
        capEl.querySelector('b').textContent = caps[i][0];
        capEl.querySelector('p').textContent = caps[i][1];
        if (hasGSAP) gsap.fromTo(capEl, { opacity: .2, y: 8 }, { opacity: 1, y: 0, duration: .5 });
      }
      bar.style.width = (100 / bgs.length) + '%';

      let raf;
      track.addEventListener('scroll', () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const i = Math.round(track.scrollLeft / track.clientWidth);
          set(i);
        });
      }, { passive: true });

      thumbs.forEach((t, i) => t.addEventListener('click', () => {
        track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
      }));
    })();

    /* =========================================================
       07 · COLLECTION — tabs
    ========================================================= */
    (function tabs() {
      const tabsEl = $('#tabs');
      if (!tabsEl) return;
      const btns = $$('.tab', tabsEl);
      const bar  = $('#inkBar');
      const panels = $$('.col-panel');

      function moveBar(btn) {
        bar.style.width = btn.offsetWidth + 'px';
        bar.style.transform = `translateX(${btn.offsetLeft - parseInt(getComputedStyle(tabsEl).paddingLeft)}px)`;
      }
      function activate(name, btn) {
        btns.forEach(b => b.classList.toggle('on', b === btn));
        moveBar(btn);
        panels.forEach(p => {
          const on = p.dataset.panel === name;
          if (on) {
            p.classList.add('on');
            if (hasGSAP) gsap.fromTo($$('.ccard', p),
              { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .6, stagger: .1, ease: 'power3.out' });
          } else p.classList.remove('on');
        });
      }
      btns.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab, b)));
      requestAnimationFrame(() => moveBar(btns[0]));
      window.addEventListener('resize', () => moveBar($('.tab.on', tabsEl)));
    })();

    /* =========================================================
       10 · FAQ — accordion
    ========================================================= */
    (function faq() {
      const items = $$('.faq-item');
      items.forEach(item => {
        const q = $('.faq-q', item);
        const a = $('.faq-a', item);
        q.addEventListener('click', () => {
          const open = item.classList.contains('open');
          items.forEach(it => {
            it.classList.remove('open');
            $('.faq-a', it).style.height = '0px';
          });
          if (!open) {
            item.classList.add('open');
            a.style.height = a.firstElementChild.offsetHeight + 'px';
          }
        });
      });
    })();

    /* =========================================================
       09 · VIDEOS — modal + faux player
    ========================================================= */
    (function videos() {
      const modal  = $('#vmodal');
      if (!modal) return;
      const poster = $('#vposter');
      const titleE = $('#vtitle');
      const fill   = $('#vfill');
      const vt     = $('#vt');
      const vd     = $('#vd');
      const data = {
        modern:   { img: 'assets/collection-modern-red.jpg', title: 'Modern Motion', dur: 84 },
        heritage: { img: 'assets/heritage-classic.jpg',     title: 'Heritage Spirit', dur: 128 }
      };
      let timer = null;
      function fmt(s) { return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }
      function open(key) {
        const d = data[key] || data.modern;
        poster.src = d.img; titleE.textContent = d.title; vd.textContent = fmt(d.dur);
        modal.classList.add('open');
        if (lenis) lenis.stop();
        let t = 0; fill.style.width = '0%'; vt.textContent = '0:00';
        clearInterval(timer);
        timer = setInterval(() => {
          t += 0.4; if (t >= d.dur) t = 0;
          fill.style.width = (t / d.dur * 100) + '%';
          vt.textContent = fmt(t);
        }, 400);
      }
      function close() { modal.classList.remove('open'); clearInterval(timer); if (lenis) lenis.start(); }
      $$('[data-video]').forEach(el => el.addEventListener('click', e => { e.preventDefault(); open(el.dataset.video); }));
      $('#vclose').addEventListener('click', close);
      modal.addEventListener('click', e => { if (e.target === modal) close(); });
    })();

    /* =========================================================
       11 · CONTACT — consent + select + submit
    ========================================================= */
    (function contact() {
      const consent = $('#consent');
      if (!consent) return;
      consent.addEventListener('click', e => { e.preventDefault(); consent.classList.toggle('checked'); });

      const sel = $('#bookForm select');
      sel.addEventListener('change', () => sel.classList.toggle('filled', !!sel.value));

      const form = $('#bookForm');
      const msg  = $('#formMsg');
      form.addEventListener('submit', e => {
        e.preventDefault();
        msg.classList.add('show');
        if (hasGSAP) gsap.fromTo(msg, { opacity: 0 }, { opacity: 1, duration: .5 });
        form.querySelectorAll('input').forEach(i => i.value = '');
        sel.selectedIndex = 0; sel.classList.remove('filled');
        consent.classList.remove('checked');
        setTimeout(() => msg.classList.remove('show'), 4200);
      });
    })();

    /* refresh ST after images settle */
    window.addEventListener('load', () => { if (hasST) ScrollTrigger.refresh(); });
    setTimeout(() => { if (hasST) ScrollTrigger.refresh(); }, 1200);
  }
})();
