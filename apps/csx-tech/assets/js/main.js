/* ================================================================
   CSX TECH — main.js
   Globals: THREE (three.min.js CDN), gsap + ScrollTrigger (CDN)
   ================================================================ */
(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── SVG LOADER ── */
  const LOGOS = {
    csx:      'assets/logos/logo-csx-tech.svg',
    dataz:    'assets/logos/logo-dataz.svg',
    nexforge: 'assets/logos/logo-nex-forge.svg',
    ironbit:  'assets/logos/logo-iron-bit.svg',
  };

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
    const [csx, dataz, nex, ib] = await Promise.all([
      fetchSVG(LOGOS.csx), fetchSVG(LOGOS.dataz),
      fetchSVG(LOGOS.nexforge), fetchSVG(LOGOS.ironbit),
    ]);
    const map = [
      ['navLogo', csx],
      ['heroBrandDataz', dataz], ['heroBrandNexforge', nex], ['heroBrandIronbit', ib],
      ['ecoLogoCSX', csx], ['ecoLogoDataZ', dataz], ['ecoLogoNexforge', nex], ['ecoLogoIronbit', ib],
      ['vertLogoDataZ', dataz], ['vertLogoNexforge', nex], ['vertLogoIronbit', ib],
      ['ibShield', ib],
      ['footerLogo', csx], ['fDataZ', dataz], ['fNexforge', nex], ['fIronbit', ib],
    ];
    for (const [id, svg] of map) injectSVG(id, svg);
  }

  /* ── CANVAS 2D HERO — concentric rings (optimized) ── */
  function initHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    // alpha:false — browser uses faster opaque compositing path
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // DPR=1: background animation doesn't need Retina resolution
    // On MacBook 2x this alone cuts pixels 4× (3024×1964 → 1512×982)
    let PW, PH, ox, oy, maxR;
    let vgGrad = null, glowGrad = null;

    function buildGradients() {
      // Cache radial gradients — recreate only on resize, never per-frame
      const vgR = PW * 0.46;
      vgGrad = ctx.createRadialGradient(PW / 2, PH * 0.44, 0, PW / 2, PH * 0.44, vgR);
      vgGrad.addColorStop(0,   'rgba(8,8,8,0.52)');
      vgGrad.addColorStop(0.5, 'rgba(8,8,8,0.08)');
      vgGrad.addColorStop(1,   'rgba(8,8,8,0)');

      const gR = 52;
      glowGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, gR);
      glowGrad.addColorStop(0,    'rgba(255,255,255,0.58)');
      glowGrad.addColorStop(0.38, 'rgba(255,255,255,0.09)');
      glowGrad.addColorStop(1,    'rgba(255,255,255,0)');
    }

    function resize() {
      PW   = window.innerWidth;
      PH   = window.innerHeight;
      canvas.width  = PW;
      canvas.height = PH;
      ox   = PW / 2;
      oy   = PH * 0.55;
      maxR = Math.hypot(PW, PH) * 0.72;
      buildGradients();
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const RINGS = 16;   // fewer arcs per frame
    const FPS   = 60;
    const STEP  = 1000 / FPS;
    let   time  = 0;
    let   last  = 0;

    (function tick(ts) {
      requestAnimationFrame(tick);
      // Cap to 60fps — halves work on 120Hz MacBook displays
      if (ts - last < STEP - 1) return;
      last = ts;
      time += 0.003;

      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, PW, PH);

      for (let i = 0; i < RINGS; i++) {
        const phase = ((i / RINGS) + time) % 1;
        const r     = phase * maxR;
        const alpha = Math.pow(1 - phase, 1.5) * 0.27;
        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }

      // Cached vignette + glow — zero allocation per frame
      ctx.fillStyle = vgGrad;
      ctx.fillRect(0, 0, PW, PH);

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(ox, oy, 52, 0, Math.PI * 2);
      ctx.fill();
    })(0);
  }

  /* ── NAV ── */
  function initNav() {
    const nav    = document.getElementById('nav');
    const burger = document.getElementById('navBurger');
    const links  = nav?.querySelector('.nav__links');
    if (!nav) return;

    // Scroll: add frosted glass
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Mobile menu toggle
    if (burger && links) {
      burger.addEventListener('click', () => {
        const open = links.classList.toggle('nav__links--open');
        burger.setAttribute('aria-expanded', open);
        // Animação do burger: X quando aberto
        burger.classList.toggle('nav__burger--open', open);
      });
    }

    // Fecha menu ao clicar em qualquer link dentro do dropdown
    links?.addEventListener('click', () => {
      links.classList.remove('nav__links--open');
      burger?.classList.remove('nav__burger--open');
      burger?.setAttribute('aria-expanded', 'false');
    });

    // Smooth anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.getElementById(a.getAttribute('href').slice(1));
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ── GSAP SCROLL ── */
  function initScroll() {
    const cfg = { duration: 0.85, ease: 'power3.out' };
    gsap.utils.toArray('[data-gsap="fade-up"]').forEach((el, i) => {
      gsap.to(el, { ...cfg, opacity: 1, y: 0, delay: (i % 3) * 0.07,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.utils.toArray('[data-gsap="fade-right"]').forEach(el => {
      gsap.to(el, { ...cfg, opacity: 1, x: 0,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    });
    gsap.utils.toArray('[data-gsap="fade-left"]').forEach(el => {
      gsap.to(el, { ...cfg, opacity: 1, x: 0,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
    });
    // Hero entrance — fromTo garante opacity 0→1 independente de CSS
    gsap.fromTo('.hero__content > *',
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.14, delay: 0.5 },
    );
  }

  /* ── COUNTERS ── */
  function initCounters() {
    document.querySelectorAll('[data-target]').forEach(el => {
      const target  = parseFloat(el.dataset.target);
      const suffix  = el.dataset.suffix || '';
      const decimal = parseInt(el.dataset.decimal || '0');
      ScrollTrigger.create({
        trigger: el, start: 'top 82%', once: true,
        onEnter() {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target, duration: 1.8, ease: 'power2.out',
            onUpdate() { el.textContent = obj.v.toFixed(decimal) + suffix; },
          });
        },
      });
    });
  }

  /* ── DATA GRID (DataZ visual) ── */
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
      const n = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * 64);
        const v   = Math.random();
        cells[idx].style.background = `rgba(47,224,190,${0.06 + v * 0.55})`;
        cells[idx].style.boxShadow  = `0 0 ${4 + v*8}px rgba(47,224,190,${v * 0.28})`;
        setTimeout(() => {
          cells[idx].style.background = 'rgba(47,224,190,0.07)';
          cells[idx].style.boxShadow  = 'none';
        }, 300 + Math.random() * 700);
      }
      setTimeout(flicker, 100 + Math.random() * 200);
    })();
  }

  /* ── CODE TYPEWRITER (Nexforge) ── */
  function initCodeWindow() {
    const body = document.getElementById('codeBody');
    if (!body) return;

    const lines = [
      '<span class="c-cm">// nexforge/core — deploy.ts</span>',
      '',
      '<span class="c-kw">import</span> { <span class="c-fn">createPipeline</span>, <span class="c-fn">deploy</span> } <span class="c-kw">from</span> <span class="c-str">"@nexforge/core"</span>;',
      '',
      '<span class="c-kw">const</span> <span class="c-fn">pipeline</span> = <span class="c-fn">createPipeline</span>({',
      '  scale: <span class="c-str">"global"</span>,',
      '  replicas: <span class="c-nu">128</span>,',
      '  latency: <span class="c-str">"&lt;2ms"</span>,',
      '  failover: <span class="c-kw">true</span>,',
      '});',
      '',
      '<span class="c-kw">await</span> <span class="c-fn">deploy</span>(pipeline, {',
      '  regions: [<span class="c-str">"us-east-1"</span>, <span class="c-str">"eu-west-2"</span>],',
      '  strategy: <span class="c-str">"blue-green"</span>,',
      '});',
      '',
      '<span class="c-cm">// ✓ Deployed in 1.4s — 3 regions online</span>',
    ];

    const cursor = document.createElement('span');
    cursor.className = 'c-cur';
    body.appendChild(cursor);

    let idx = 0;
    function typeNext() {
      if (idx >= lines.length) return;
      cursor.remove();
      const span = document.createElement('span');
      span.className = 'cl';
      span.innerHTML = lines[idx] || '\u00a0';
      body.appendChild(span);
      body.appendChild(cursor);
      idx++;
      setTimeout(typeNext, idx === 1 ? 500 : 75 + Math.random() * 55);
    }

    ScrollTrigger.create({
      trigger: body, start: 'top 78%', once: true,
      onEnter: () => setTimeout(typeNext, 200),
    });
  }

  /* ── INIT ── */
  async function init() {
    await loadLogos();
    initHero();
    initNav();
    initScroll();
    initCounters();
    initDataGrid();
    initCodeWindow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
