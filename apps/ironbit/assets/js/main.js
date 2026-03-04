/* ================================================================
   IronBit — ironbit.js  v2
   Scan beam canvas · Live counters · Nav · GSAP
   ================================================================ */
(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── SVG LOADER ── */
  async function fetchSVG(path) {
    try {
      const res = await fetch(path);
      const txt = await res.text();
      const tmp = document.createElement('div');
      tmp.innerHTML = txt;
      return tmp.querySelector('svg');
    } catch { return null; }
  }

  function injectSVG(id, svg) {
    const el = document.getElementById(id);
    if (!el || !svg) return;
    el.appendChild(svg.cloneNode(true));
  }

  async function loadLogos() {
    const [full, icon] = await Promise.all([
      fetchSVG('assets/logos/ironbit-full.svg'),
      fetchSVG('assets/logos/logo-iron-bit.svg'),
    ]);
    injectSVG('ibNavLogo',    full);
    injectSVG('ibFooterLogo', full);
    injectSVG('ibWatermark',  icon);
  }

  /* ── CANVAS — scan beam ── */
  function initCanvas() {
    const canvas = document.getElementById('ibCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let PW, PH, scanY = 0, vgGrad;

    function resize() {
      PW = canvas.width  = window.innerWidth;
      PH = canvas.height = window.innerHeight;
      const vg = ctx.createLinearGradient(0, 0, PW, 0);
      vg.addColorStop(0,   'rgba(8,8,8,0.92)');
      vg.addColorStop(0.5, 'rgba(8,8,8,0.45)');
      vg.addColorStop(1,   'rgba(8,8,8,0.0)');
      vgGrad = vg;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const FPS = 60, STEP = 1000 / FPS;
    const SPEED = 0.5;
    let last = 0;

    (function tick(ts) {
      requestAnimationFrame(tick);
      if (ts - last < STEP - 1) return;
      last = ts;

      /* Background */
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, PW, PH);

      /* Hex dot grid */
      const S = 28;
      ctx.fillStyle = 'rgba(188,0,0,0.04)';
      for (let row = 0, y = 0; y < PH + S; row++, y += S * 0.866) {
        const ox = row % 2 === 0 ? 0 : S * 0.5;
        for (let x = ox; x < PW + S; x += S) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* Scan trail */
      const trail = ctx.createLinearGradient(0, scanY - 100, 0, scanY);
      trail.addColorStop(0, 'rgba(188,0,0,0)');
      trail.addColorStop(1, 'rgba(188,0,0,0.045)');
      ctx.fillStyle = trail;
      ctx.fillRect(0, scanY - 100, PW, 100);

      /* Scan line */
      ctx.strokeStyle = 'rgba(188,0,0,0.28)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(188,0,0,0.45)';
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(PW, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      /* Left vignette */
      ctx.fillStyle = vgGrad;
      ctx.fillRect(0, 0, PW, PH);

      /* Subtle right glow */
      const glow = ctx.createRadialGradient(PW * 0.72, PH * 0.5, 0, PW * 0.72, PH * 0.5, PW * 0.32);
      glow.addColorStop(0,   'rgba(188,0,0,0.05)');
      glow.addColorStop(0.5, 'rgba(188,0,0,0.01)');
      glow.addColorStop(1,   'rgba(188,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, PW, PH);

      scanY += SPEED;
      if (scanY > PH) scanY = 0;
    })(0);
  }

  /* ── LIVE COUNTERS ── */
  function initCounters() {
    const threatEl  = document.getElementById('ibThreats');
    const threat2El = document.getElementById('ibThreats2');
    const assetsEl  = document.getElementById('ibAssets');
    if (!threatEl && !threat2El) return;

    let threats = 2847;
    let events  = 5284;
    let assets  = 143;

    setInterval(() => {
      threats += Math.floor(Math.random() * 3) + 1;
      events  += Math.floor(Math.random() * 5) + 2;
      if (threatEl)  threatEl.textContent  = threats.toLocaleString('pt-BR');
      if (threat2El) threat2El.textContent = events.toLocaleString('pt-BR');
    }, 420);

    setInterval(() => {
      if (Math.random() < 0.25) assets++;
      if (assetsEl) assetsEl.textContent = assets;
    }, 3800);
  }

  /* ── NAV ── */
  function initNav() {
    const nav    = document.getElementById('ibNav');
    const burger = document.getElementById('ibBurger');
    const links  = nav?.querySelector('.nav__links');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    if (burger && links) {
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('nav__links--open');
        burger.setAttribute('aria-expanded', open);
        burger.classList.toggle('nav__burger--open', open);
      });
    }

    links?.addEventListener('click', () => {
      links.classList.remove('nav__links--open');
      burger?.classList.remove('nav__burger--open');
      burger?.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.getElementById(a.getAttribute('href').slice(1));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* ── GSAP SCROLL ── */
  function initScroll() {
    const cfg = { duration: 0.85, ease: 'power3.out' };

    gsap.utils.toArray('[data-gsap="fade-up"]').forEach((el, i) => {
      gsap.to(el, {
        ...cfg, opacity: 1, y: 0, delay: (i % 3) * 0.07,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    gsap.utils.toArray('[data-gsap="fade-right"]').forEach(el => {
      gsap.to(el, {
        ...cfg, opacity: 1, x: 0,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
    });
    gsap.utils.toArray('[data-gsap="fade-left"]').forEach(el => {
      gsap.to(el, {
        ...cfg, opacity: 1, x: 0,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      });
    });

    /* Hero entrance */
    gsap.fromTo(
      '.ib-hero__content > *',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.12, delay: 0.35 },
    );
    gsap.fromTo(
      '.ib-radar-wrap',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', delay: 0.65 },
    );
  }

  /* ── INIT ── */
  async function init() {
    await loadLogos();
    initCanvas();
    initCounters();
    initNav();
    initScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
