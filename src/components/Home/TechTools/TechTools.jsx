'use client';

import { useEffect, useRef } from 'react';
import Container from '../../Common/Container/Container';
import { IMAGE_URLS } from '@/data/TechData';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function randFloat(lo, hi) { return lo + Math.random() * (hi - lo); }
function randSpread(r) { return r * (0.5 - Math.random()); }

// ─── Vec2 ────────────────────────────────────────────────────────────────────
class Vec2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  set(x, y) { this.x = x; this.y = y; return this; }
  copy(v) { this.x = v.x; this.y = v.y; return this; }
  add(v) { this.x += v.x; this.y += v.y; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; return this; }
  scale(s) { this.x *= s; this.y *= s; return this; }
  len() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  norm() { const l = this.len() || 1; this.x /= l; this.y /= l; return this; }
  clampLen(mn, mx) { const l = this.len(); if (l < mn) this.scale(mn / (l || 1)); if (l > mx) this.scale(mx / l); return this; }
  fromArr(a, o = 0) { this.x = a[o]; this.y = a[o + 1]; return this; }
  toArr(a, o = 0) { a[o] = this.x; a[o + 1] = this.y; }
}

// ─── Physics2D ───────────────────────────────────────────────────────────────
class Physics2D {
  constructor(cfg) {
    this.cfg = cfg;
    this.count = cfg.count;
    this.pos = new Float32Array(2 * cfg.count);
    this.vel = new Float32Array(2 * cfg.count);
    this.rot = new Float32Array(cfg.count);      // radians
    this.rotVel = new Float32Array(cfg.count);
    this.size = new Float32Array(cfg.count);
    this.cursor = new Vec2();
    this.interact = false;
    this._init();
  }

  _init() {
    const { cfg, pos, vel, rot, rotVel, size } = this;
    for (let i = 0; i < cfg.count; i++) {
      size[i] = randFloat(cfg.minSize, cfg.maxSize);
      pos[2 * i] = randSpread(cfg.maxX * 1.8);
      // Spawning position — reduce the max vertical scatter to drop them into view slightly faster
      pos[2 * i + 1] = cfg.maxY + randFloat(0.5, cfg.maxY * 3.0);
      vel[2 * i] = randSpread(0.4);
      // Mild initial downward floating velocity
      vel[2 * i + 1] = -randFloat(0.05, 0.25);
      rot[i] = randSpread(Math.PI * 2);
      // Initial tumbling speed
      rotVel[i] = randSpread(1.8);
    }
  }

  update(dt) {
    const { cfg, pos, vel, rot, rotVel, size, cursor, interact } = this;
    const I = new Vec2(), V = new Vec2();
    const O = new Vec2(), W = new Vec2();
    const diff = new Vec2(), push = new Vec2();
    const C = new Vec2(cursor.x, cursor.y);

    // Gravity + friction pass
    for (let i = 0; i < cfg.count; i++) {
      const b = 2 * i;
      V.fromArr(vel, b);
      V.y -= dt * cfg.gravity * size[i];
      V.scale(cfg.friction);
      V.clampLen(0, cfg.maxVel);
      V.toArr(vel, b);
      pos[b] += vel[b];
      pos[b + 1] += vel[b + 1];
      rotVel[i] *= 0.985;
      rot[i] += dt * rotVel[i];
    }

    // Collision + wall + cursor pass
    for (let i = 0; i < cfg.count; i++) {
      const b = 2 * i;
      const ri = size[i];
      I.fromArr(pos, b);
      V.fromArr(vel, b);

      // Box-box collisions
      for (let j = i + 1; j < cfg.count; j++) {
        const ob = 2 * j;
        O.fromArr(pos, ob);
        W.fromArr(vel, ob);
        const rj = size[j];

        diff.copy(O).sub(I);
        const d = diff.len();
        const rr = ri + rj;
        if (d < rr && d > 0.0001) {
          const ov = rr - d;
          push.copy(diff).norm().scale(ov * 0.5);

          I.sub(push); V.sub(new Vec2(push.x, push.y).scale(1.2));
          O.add(push); W.add(new Vec2(push.x, push.y).scale(1.2));

          I.toArr(pos, b); V.toArr(vel, b);
          O.toArr(pos, ob); W.toArr(vel, ob);
        }
      }

      // Cursor repulsion
      if (interact) {
        diff.copy(C).sub(I);
        const d = diff.len();
        const ir = cfg.interactR;
        if (d < ir && d > 0.0001) {
          const ov = ir - d;
          push.copy(diff).norm().scale(ov * 0.25);
          V.sub(push);
          // Add spin from cursor
          rotVel[i] += push.x * 2.5;
        }
      }

      // Bowl floor dynamically calculated from waveFrac container height relative to canvas height
      const nx = Math.max(-1, Math.min(1, I.x / cfg.maxX));
      const f = cfg.waveFrac || 0.32;
      // Derived from viewBox="0 0 1440 100" with M0,42 and C...,96... -> visual center drops ~0.80 of SVG height
      const centerCy = 1.0 - f * 0.20; // 0.80 = 1 - 0.20
      const sidesCy = 1.0 - f * 0.58; // 0.42 = 1 - 0.58
      const bowlBaseWorldNorm = (0.5 - centerCy) * 2;
      const sidesWorldNorm = (0.5 - sidesCy) * 2;
      
      const bowlBase = cfg.maxY * bowlBaseWorldNorm;
      const bowlDepth = cfg.maxY * (sidesWorldNorm - bowlBaseWorldNorm);
      const floorY = bowlBase + (nx * nx) * bowlDepth;

      if (I.y - ri < floorY) {
        I.y = floorY + ri;

        // Bounce on curved normal
        const slope = 2 * nx * (bowlDepth / cfg.maxX);
        const dn = Math.sqrt(slope * slope + 1);
        const normX = -slope / dn;
        const normY = 1 / dn;

        const dot = V.x * normX + V.y * normY;
        if (dot < 0) {
          V.x -= 1.6 * dot * normX;
          V.y -= 1.6 * dot * normY;
        }

        V.scale(cfg.wallBounce);
        V.x *= 0.95;
        rotVel[i] *= 0.90;
      }
      // Side walls
      if (Math.abs(I.x) + ri > cfg.maxX) {
        I.x = Math.sign(I.x) * (cfg.maxX - ri);
        V.x = -V.x * cfg.wallBounce;
        rotVel[i] *= 0.85;
      }
      // Soft top cap (so icons don't escape upward forever)
      if (I.y + ri > cfg.maxY * 3.2) {
        I.y = cfg.maxY * 3.2 - ri;
        V.y = -Math.abs(V.y) * 0.4;
      }

      I.toArr(pos, b);
      V.toArr(vel, b);
    }
  }
}



let loadedIcons = null;
function getLoadedIcons() {
  if (loadedIcons) return loadedIcons;
  if (typeof window === 'undefined') return []; // safety for SSR
  
  loadedIcons = [];
  for (let i = 0; i < IMAGE_URLS.length; i++) {
    const url = IMAGE_URLS[i];
    const img = new window.Image();
    img.src = url;
    loadedIcons.push({ img });
  }
  return loadedIcons;
}

// ─── Canvas drawing helpers ────────────────────────────────────────────────────
function drawIconBox(ctx, icon, cx, cy, sz, angle) {
  const half = sz / 2;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // If the image is loaded, draw it exactly as it is without extra shadows
  if (icon.img && icon.img.complete && icon.img.naturalWidth > 0) {
    ctx.drawImage(icon.img, -half, -half, sz, sz);
  }

  ctx.restore();
}

// ─── TechTools component ──────────────────────────────────────────────────────
export default function TechTools() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const waveRef = useRef(null);
  const physRef = useRef(null);  
  const started = useRef(false);

  // ── Start / restart the simulation ───────────────────────────────────────
  function startSim(canvas) {
    if (physRef.current) {
      cancelAnimationFrame(physRef.current.animId);
      physRef.current = null;
    }

    const parent = canvas.parentElement;
    const W = parent.offsetWidth;
    const H = parent.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const minScale = window.innerWidth < 768 ? 38 : 45;
    let scale = W / 28;
    if (scale < minScale) scale = minScale;

    const WORLD_W = W / scale;
    const maxX = WORLD_W / 2;
    const maxY = (H / scale) / 2;

    const icons = getLoadedIcons();
    const COUNT = icons.length;

    const waveEl = waveRef.current;
    const initialWaveFrac = waveEl ? (waveEl.offsetHeight / H) : 0.32;

    const cfg = {
      count: COUNT,
      minSize: 0.48, // Unify sizes
      maxSize: 0.48, // Unify sizes
      gravity: 0.15,
      friction: 0.9970,
      wallBounce: 0.72,
      maxVel: 0.18,
      maxX,
      maxY,
      waveFrac: initialWaveFrac,
      interactR: 2.0,
    };

    const physics = new Physics2D(cfg);
    const ctx = canvas.getContext('2d');
    let lastTime = performance.now();

    function render(now) {
      const id = requestAnimationFrame(render);
      physRef.current.animId = id;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      physics.update(dt);

      // Resize guard
      const cW = canvas.width;
      const cH = canvas.height;
      ctx.clearRect(0, 0, cW, cH);

      const sc = physRef.current.scale;

      for (let i = 0; i < COUNT; i++) {
        const wx = physics.pos[2 * i];
        const wy = physics.pos[2 * i + 1];
        const sx = wx * sc + cW / 2;
        const sy = -wy * sc + cH / 2;

        if (sy < -80 || sy > cH + 80) continue;

        const szPx = physics.size[i] * sc * 2.0;
        drawIconBox(ctx, icons[i], sx, sy, szPx, physics.rot[i]);
      }
    }

    physRef.current = { physics, animId: requestAnimationFrame(render), WORLD_W, scale };

    // ── Resize observer ──
    const ro = new ResizeObserver(() => {
      if (!physRef.current) return;
      const nW = parent.offsetWidth;
      const nH = parent.offsetHeight;
      canvas.width = nW;
      canvas.height = nH;

      const minS = window.innerWidth < 768 ? 38 : 45;
      let sc2 = nW / 28;
      if (sc2 < minS) sc2 = minS;

      const waveEl = waveRef.current;
      if (waveEl) {
        physRef.current.physics.cfg.waveFrac = waveEl.offsetHeight / nH;
      }

      physRef.current.physics.cfg.maxX = (nW / sc2) / 2;
      physRef.current.physics.cfg.maxY = (nH / sc2) / 2;
      physRef.current.scale = sc2;
    });
    ro.observe(parent);
    physRef.current.ro = ro;

    // ── Pointer / touch interaction ──
    function worldCoords(ex, ey) {
      const rect = canvas.getBoundingClientRect();
      const sc3 = physRef.current.scale;
      return {
        wx: (ex - rect.left) / sc3 - (canvas.width / sc3) / 2,
        wy: -((ey - rect.top) / sc3 - (canvas.height / sc3) / 2),
      };
    }

    function onMove(e) {
      const { wx, wy } = worldCoords(e.clientX, e.clientY);
      physics.cursor.set(wx, wy);
      physics.interact = true;
    }
    function onLeave() { physics.interact = false; }
    function onTouch(e) {
      e.preventDefault();
      if (e.touches.length) onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
    }
    function onTouchEnd() { physics.interact = false; }

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('touchmove', onTouch, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    physRef.current.cleanup = () => {
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }

  // ── Intersection observer — trigger once when visible ──────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        startSim(canvas);
      }
    }, { threshold: 0.12 });

    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => {
      obs.disconnect();
      if (physRef.current) {
        cancelAnimationFrame(physRef.current.animId);
        physRef.current.cleanup?.();
        physRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      {/*
       * Canvas now covers the FULL 100vh section.
       * Icons can travel anywhere in the section without being clipped.
       * z-stack: canvas(z-10) → wave(z-20) → header text(z-30)
       */}
      <section
        ref={sectionRef}
        className="relative w-full bg-white overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* ── Full-section canvas — spans entire 100vh ─────────────────── */}
        {/* Removing the inner physics div means icons are never clipped    */}
        {/* by a smaller container when they bounce toward the header area. */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-10"
          style={{ display: 'block', touchAction: 'none', userSelect: 'none' }}
        />

        {/* ── Header overlay — sits above canvas ───────────────────────── */}
        {/* z-30 keeps text readable; icons slide under/over it naturally.  */}
        <div
          className="relative z-30 flex flex-col items-center text-center pointer-events-none"
          style={{ paddingTop: 'clamp(32px, 5vw, 60px)', paddingBottom: '8px' }}
        >
          <Container>
            <div className="flex flex-col items-center text-center">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 border border-[#0099CC]/40
                           rounded-full px-4 py-1.5 mb-3 text-[#0099CC] text-sm
                           font-medium tracking-wide bg-white/80 shadow-sm"
              >
                <span className="text-base">★</span>
                Technology &amp; Tools
              </div>

              {/* Subtitle */}
              <p className="text-[#555] text-sm md:text-base leading-relaxed max-w-sm md:max-w-md">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
                Etiam eu turpis molestie, dictum est a,
              </p>
            </div>
          </Container>
        </div>

        {/* ── Blue bowl wave responsive container ─────────────────────── */}
        {/* z-20: above canvas so wave renders over icons at the boundary;  */}
        {/* icons that settle IN the bowl appear to sit on its surface.     */}
        <div
          ref={waveRef}
          className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
          style={{ height: 'clamp(120px, 18vw, 300px)' }}
        >
          <svg
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <path
              d="M0,42 C420,96 1020,96 1440,42 L1440,100 L0,100 Z"
              fill="#2AABEE"
            />
          </svg>
        </div>
      </section>

      {/* ── Blue → white gradient blend ───────────────────────────────────── */}
      {/* Sits directly below the section so the blue fades cleanly to white  */}
      <div
        style={{
          width: '100%',
          height: '110px',
          background: 'linear-gradient(to bottom, #2AABEE 0%, #ffffff 100%)',
          marginTop: '-3px',          /* robustly eliminate sub-pixel hairline gaps */
          position: 'relative',       /* required for z-index to overlay the gap */
          zIndex: 10,                 /* ensure the overlay rides above the section's white background seam */
          display: 'block',
        }}
      />
    </>
  );
}
