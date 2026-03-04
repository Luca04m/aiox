/* ================================================================
   Nexforge — nexforge.js v2
   Pixel-forge canvas · Live counters · Nav · GSAP
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
    const full = await fetchSVG('assets/logos/nexforge-full.svg');
    injectSVG('nxNavLogo',    full);
    injectSVG('nxFooterLogo', full);
  }

  /* ── CANVAS — forge sparks ── */
  function initCanvas() {
    const canvas = document.getElementById('nxCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let PW, PH;

    function resize() {
      PW = canvas.width  = window.innerWidth;
      PH = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* Particles */
    const SPARKS = [];
    const MAX_SPARKS = 35;

    function spawnSpark() {
      const fromRight = Math.random() > 0.5;
      SPARKS.push({
        x:    fromRight ? PW * 0.55 + Math.random() * PW * 0.45 : Math.random() * PW,
        y:    Math.random() * PH,
        vx:   (Math.random() - 0.5) * 0.6,
        vy:   (Math.random() - 0.5) * 0.6,
        life: Math.random() * 0.6 + 0.2,
        maxLife: Math.random() * 0.6 + 0.2,
        r:    Math.random() * 1.4 + 0.4,
        hot:  Math.random() < 0.06,
      });
    }

    for (let i = 0; i < MAX_SPARKS; i++) spawnSpark();

    /* Grid pixels */
    const GRID_SIZE = 80;
    const PIXELS = [];
    function buildPixels() {
      PIXELS.length = 0;
      const cols = Math.ceil(PW / GRID_SIZE) + 1;
      const rows = Math.ceil(PH / GRID_SIZE) + 1;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          PIXELS.push({
            x: c * GRID_SIZE,
            y: r * GRID_SIZE,
            phase: Math.random() * Math.PI * 2,
            speed: 0.004 + Math.random() * 0.006,
            hot: Math.random() < 0.08,
          });
        }
      }
    }
    buildPixels();
    window.addEventListener('resize', buildPixels, { passive: true });

    const FPS = 60, STEP = 1000 / FPS;
    let last = 0, frame = 0;

    (function tick(ts) {
      requestAnimationFrame(tick);
      if (ts - last < STEP - 1) return;
      last = ts;
      frame++;

      /* Background */
      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, PW, PH);

      /* Grid pixels — subtle twinkling dots */
      for (const p of PIXELS) {
        p.phase += p.speed;
        const alpha = (Math.sin(p.phase) * 0.5 + 0.5);
        if (p.hot) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(229,50,21,${alpha * 0.18})`;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha * 0.06})`;
          ctx.fill();
        }
      }

      /* Spark particles */
      if (frame % 3 === 0 && SPARKS.length < MAX_SPARKS) spawnSpark();

      for (let i = SPARKS.length - 1; i >= 0; i--) {
        const s = SPARKS[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.004;

        if (s.life <= 0) {
          SPARKS.splice(i, 1);
          continue;
        }

        const progress = s.life / s.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : 1;

        if (s.hot) {
          /* Glowing spark */
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
          grad.addColorStop(0, `rgba(229,50,21,${alpha * 0.18})`);
          grad.addColorStop(1, 'rgba(229,50,21,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(s.x - s.r * 3, s.y - s.r * 3, s.r * 6, s.r * 6);
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hot
          ? `rgba(229,50,21,${alpha * 0.9})`
          : `rgba(255,255,255,${alpha * 0.15})`;
        ctx.fill();
      }

      /* Right accent glow */
      const glow = ctx.createRadialGradient(PW * 0.72, PH * 0.4, 0, PW * 0.72, PH * 0.4, PW * 0.42);
      glow.addColorStop(0,   'rgba(229,50,21,0.055)');
      glow.addColorStop(0.5, 'rgba(229,50,21,0.015)');
      glow.addColorStop(1,   'rgba(229,50,21,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, PW, PH);

      /* Left vignette — darker so text is readable */
      const vig = ctx.createLinearGradient(0, 0, PW * 0.5, 0);
      vig.addColorStop(0,   'rgba(5,8,16,0.9)');
      vig.addColorStop(0.35, 'rgba(5,8,16,0.4)');
      vig.addColorStop(1,   'rgba(5,8,16,0)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, PW, PH);

    })(0);
  }

  /* ── LIVE COUNTERS ── */
  function initCounters() {
    const deploysEl = document.getElementById('nxDeploys');
    const reqsEl    = document.getElementById('nxReqs');

    let deploys = 849;
    let reqs    = 18400;

    if (deploysEl) {
      setInterval(() => {
        deploys++;
        deploysEl.textContent = deploys.toLocaleString('pt-BR');
      }, 4800);
    }

    if (reqsEl) {
      setInterval(() => {
        reqs += Math.floor(Math.random() * 90) + 20;
        reqsEl.textContent = (reqs / 1000).toFixed(1) + 'k';
      }, 900);
    }
  }

  /* ── NAV ── */
  function initNav() {
    const nav    = document.getElementById('nxNav');
    const burger = document.getElementById('nxBurger');
    const links  = document.getElementById('nxLinks');
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
        const id = a.getAttribute('href').slice(1);
        const t = document.getElementById(id);
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  /* ── GSAP SCROLL ── */
  function initScroll() {
    const cfg = { duration: 0.85, ease: 'power3.out' };

    gsap.utils.toArray('[data-gsap="fade-up"]').forEach((el, i) => {
      gsap.to(el, {
        ...cfg, opacity: 1, y: 0, delay: (i % 4) * 0.07,
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
      '.nx-hero__copy > *',
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', stagger: 0.12, delay: 0.25 },
    );
    gsap.fromTo(
      '.nx-terminal',
      { opacity: 0, x: 48 },
      { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', delay: 0.55 },
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
