'use client';

import { useEffect, useRef } from 'react';
import Container from '../../Common/Container/Container';

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

      // Bowl floor — recalculated for shallower wave:
      //   wave div   = bottom 32 % of canvas height H
      //   SVG path   = M0,42  C420,96  1020,96  1440,42  (viewBox 0 0 1440 100)
      //   Bezier centre y ≈ 80  →  canvas_y = 0.936 H  →  world_y = -0.872 maxY
      //   Sides y = 42          →  canvas_y = 0.814 H  →  world_y = -0.628 maxY
      //   bowlDepth = 0.872 − 0.628 = 0.244 maxY  (gentle shallow bowl)
      const nx = Math.max(-1, Math.min(1, I.x / cfg.maxX));
      const bowlBase  = -(cfg.maxY * 0.872); // world-Y of wave top at centre
      const bowlDepth =   cfg.maxY * 0.244;  // shallow rise centre → sides
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

// ─── Icon palette (same visual style as reference) ────────────────────────────
const ICONS = [
  { bg: '#001E36', label: 'Ps', color: '#31A8FF' },
  { bg: '#330000', label: 'Ai', color: '#FF9A00' },
  { bg: '#49021F', label: 'Id', color: '#FF3366' },
  { bg: '#2D0E45', label: 'Pr', color: '#9999FF' },
  { bg: '#00005B', label: 'Ae', color: '#9999FF' },
  { bg: '#001C26', label: 'Lr', color: '#31A8FF' },
  { bg: '#4B0018', label: 'Xd', color: '#FF61F6' },
  { bg: '#23272F', label: 'Re', color: '#61DAFB' },
  { bg: '#215732', label: 'Nd', color: '#68A063' },
  { bg: '#161B22', label: 'Gh', color: '#FFFFFF' },
  { bg: '#1E1E1E', label: 'Fi', color: '#F24E1E' },
  { bg: '#0057E2', label: 'in', color: '#FFFFFF' },
  { bg: '#007ACC', label: 'Ts', color: '#FFFFFF' },
  { bg: '#F7DF1E', label: 'Js', color: '#000000' },
  { bg: '#E34F26', label: 'Ht', color: '#FFFFFF' },
  { bg: '#1572B6', label: 'Cs', color: '#FFFFFF' },
  { bg: '#0284C7', label: 'Tw', color: '#FFFFFF' },
  { bg: '#764ABC', label: 'Rx', color: '#FFFFFF' },
  { bg: '#CC6699', label: 'Sa', color: '#FFFFFF' },
  { bg: '#001E36', label: 'Ps', color: '#31A8FF' },
];

// ─── Canvas drawing helpers ────────────────────────────────────────────────────
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawIconBox(ctx, icon, cx, cy, sz, angle) {
  const half = sz / 2;
  const r = sz * 0.21;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Drop shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.40)';
  ctx.shadowBlur = sz * 0.28;
  ctx.shadowOffsetY = sz * 0.07;
  roundRect(ctx, -half, -half, sz, sz, r);
  ctx.fillStyle = icon.bg;
  ctx.fill();
  ctx.restore();

  // Main fill
  roundRect(ctx, -half, -half, sz, sz, r);
  ctx.fillStyle = icon.bg;
  ctx.fill();

  // Top-edge gloss
  const gl = ctx.createLinearGradient(-half, -half, -half, -half + sz * 0.45);
  gl.addColorStop(0, 'rgba(255,255,255,0.14)');
  gl.addColorStop(1, 'rgba(255,255,255,0)');
  roundRect(ctx, -half, -half, sz, sz, r);
  ctx.fillStyle = gl;
  ctx.fill();

  // Label
  ctx.font = `700 ${sz * 0.30}px Arial, sans-serif`;
  ctx.fillStyle = icon.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(icon.label, 0, sz * 0.02);

  ctx.restore();
}

// ─── TechTools component ──────────────────────────────────────────────────────
export default function TechTools() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
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

    const WORLD_W = 28;
    const scale = W / WORLD_W;
    const maxX = (W / scale) / 2;
    const maxY = (H / scale) / 2;

    const COUNT = ICONS.length;
    const icons = ICONS.slice();

    const cfg = {
      count: COUNT,
      minSize: 0.38,
      maxSize: 0.52,
      gravity: 0.22,
      friction: 0.9970,
      wallBounce: 0.72,
      maxVel: 0.18,
      maxX,
      maxY,
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

      const sc = cW / WORLD_W;

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
      const sc2 = nW / WORLD_W;
      physRef.current.physics.cfg.maxX = (nW / sc2) / 2;
      physRef.current.physics.cfg.maxY = (nH / sc2) / 2;
    });
    ro.observe(parent);
    physRef.current.ro = ro;

    // ── Pointer / touch interaction ──
    function worldCoords(ex, ey) {
      const rect = canvas.getBoundingClientRect();
      const sc3 = canvas.width / WORLD_W;
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
          className="relative z-30 flex flex-col items-center text-center"
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

        {/* ── Blue bowl wave — bottom 32% of section ───────────────────── */}
        {/* z-20: above canvas so wave renders over icons at the boundary;  */}
        {/* icons that settle IN the bowl appear to sit on its surface.     */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
          style={{ height: '32%' }}
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
          marginTop: '-1px',          /* eliminate any hairline gap */
          display: 'block',
        }}
      />
    </>
  );
}
