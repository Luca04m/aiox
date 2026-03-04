/* ================================================================
   DataZ — dataz.js
   Canvas teal rings · Logos SVG · Nav pill · GSAP · Live data card
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
      fetchSVG('assets/logos/dataz-full.svg'),
      fetchSVG('assets/logos/logo-dataz.svg'),
    ]);
    injectSVG('navLogo',           full);
    injectSVG('footerLogo',        full);
    injectSVG('manifestoWatermark', icon);
  }

  /* ── CANVAS — anéis concêntricos teal ── */
  function initCanvas() {
    const canvas = document.getElementById('dzCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let PW, PH, ox, oy, maxR, vgGrad, glowGrad;

    function buildGradients() {
      const vgR = PW * 0.50;
      vgGrad = ctx.createRadialGradient(PW * 0.28, PH * 0.5, 0, PW * 0.28, PH * 0.5, vgR);
      vgGrad.addColorStop(0,   'rgba(8,8,8,0.72)');
      vgGrad.addColorStop(0.5, 'rgba(8,8,8,0.20)');
      vgGrad.addColorStop(1,   'rgba(8,8,8,0)');

      const gR = 72;
      glowGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, gR);
      glowGrad.addColorStop(0,    'rgba(47,224,190,0.45)');
      glowGrad.addColorStop(0.38, 'rgba(47,224,190,0.07)');
      glowGrad.addColorStop(1,    'rgba(47,224,190,0)');
    }

    function resize() {
      PW = window.innerWidth;
      PH = window.innerHeight;
      canvas.width  = PW;
      canvas.height = PH;
      // rings originate from right side (where the card is)
      ox = PW * 0.72;
      oy = PH * 0.50;
      maxR = Math.hypot(PW, PH) * 0.80;
      buildGradients();
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const RINGS = 12;
    const FPS   = 60;
    const STEP  = 1000 / FPS;
    let time = 0, last = 0;

    (function tick(ts) {
      requestAnimationFrame(tick);
      if (ts - last < STEP - 1) return;
      last = ts;
      time += 0.002;

      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, PW, PH);

      for (let i = 0; i < RINGS; i++) {
        const phase = ((i / RINGS) + time) % 1;
        const r     = phase * maxR;
        const alpha = Math.pow(1 - phase, 1.8) * 0.16;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(47,224,190,${alpha.toFixed(3)})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }

      // Left-side vignette (makes text more readable)
      ctx.fillStyle = vgGrad;
      ctx.fillRect(0, 0, PW, PH);

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(ox, oy, 72, 0, Math.PI * 2);
      ctx.fill();
    })(0);
  }

  /* ── LIVE DATA CARD ── */
  function initDataCard() {
    const counterEl    = document.getElementById('dzCounter');
    const progressFill = document.getElementById('dzProgress');
    const progressPct  = document.getElementById('dzPct');
    const barsEl       = document.getElementById('dzBars');

    if (!counterEl) return;

    // Counter — grows continuously
    let val = 1247832094;
    setInterval(() => {
      val += Math.floor(Math.random() * 90000) + 20000;
      counterEl.textContent = val.toLocaleString('pt-BR');
    }, 1400);

    // Progress bar — fluctuates naturally
    let pct = 87.4;
    setInterval(() => {
      pct += (Math.random() - 0.38) * 1.8;
      pct = Math.max(80, Math.min(95, pct));
      if (progressFill) progressFill.style.width = pct.toFixed(1) + '%';
      if (progressPct)  progressPct.textContent  = pct.toFixed(1) + '%';
    }, 2400);

    // Bar chart — scrolling wave
    if (barsEl) {
      const N    = 22;
      const bars = Array.from({ length: N }, () => {
        const b   = document.createElement('div');
        b.className = 'dz-bar';
        b.style.height = (15 + Math.random() * 85) + '%';
        barsEl.appendChild(b);
        return b;
      });

      (function tick() {
        const newH = 15 + Math.random() * 85;
        // Shift all bars left
        for (let i = 0; i < bars.length - 1; i++) {
          bars[i].style.height = bars[i + 1].style.height;
          bars[i].classList.remove('dz-bar--hot');
        }
        bars[bars.length - 1].style.height = newH + '%';
        bars[bars.length - 1].classList.add('dz-bar--hot');

        setTimeout(() => {
          bars[bars.length - 1].classList.remove('dz-bar--hot');
          setTimeout(tick, 480 + Math.random() * 280);
        }, 120);
      })();
    }
  }

  /* ── NAV ── */
  function initNav() {
    const nav    = document.getElementById('nav');
    const burger = document.getElementById('navBurger');
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

    // Hero: staggered entrance
    gsap.fromTo(
      '.dz-hero__content > *',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.13, delay: 0.45 },
    );
    gsap.fromTo(
      '.dz-hero__visual',
      { opacity: 0, x: 36 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out', delay: 0.75 },
    );
  }

  /* ── DATA GRID (Missão visual) ── */
  function initDataGrid() {
    const g = document.getElementById('dzGrid');
    if (!g) return;

    for (let i = 0; i < 64; i++) {
      const c = document.createElement('div');
      c.className = 'dz-cell';
      g.appendChild(c);
    }

    (function flicker() {
      const cells = g.children;
      const n     = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * 64);
        const v   = Math.random();
        cells[idx].style.background = `rgba(47,224,190,${0.06 + v * 0.55})`;
        cells[idx].style.boxShadow  = `0 0 ${4 + v * 8}px rgba(47,224,190,${v * 0.28})`;
        setTimeout(() => {
          cells[idx].style.background = 'rgba(47,224,190,0.07)';
          cells[idx].style.boxShadow  = 'none';
        }, 300 + Math.random() * 700);
      }
      setTimeout(flicker, 100 + Math.random() * 200);
    })();
  }

  /* ── INIT ── */
  async function init() {
    await loadLogos();
    initCanvas();
    initNav();
    initScroll();
    initDataCard();
    initDataGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
