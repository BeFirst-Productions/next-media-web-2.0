'use client';

import { useEffect, useRef } from 'react';

// ─── Physics Engine (same as Ballpit) ───────────────────────────────────────

function randFloat(low, high) {
  return low + Math.random() * (high - low);
}
function randFloatSpread(range) {
  return range * (0.5 - Math.random());
}

class Vec2 {
  constructor(x = 0, y = 0) { this.x = x; this.y = y; }
  set(x, y) { this.x = x; this.y = y; return this; }
  copy(v) { this.x = v.x; this.y = v.y; return this; }
  add(v) { this.x += v.x; this.y += v.y; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; return this; }
  multiplyScalar(s) { this.x *= s; this.y *= s; return this; }
  length() { return Math.sqrt(this.x * this.x + this.y * this.y); }
  normalize() { const l = this.length() || 1; this.x /= l; this.y /= l; return this; }
  clampLength(min, max) { const l = this.length(); if (l < min) this.multiplyScalar(min / (l || 1)); if (l > max) this.multiplyScalar(max / (l || 1)); return this; }
  fromArray(arr, offset = 0) { this.x = arr[offset]; this.y = arr[offset + 1]; return this; }
  toArray(arr, offset = 0) { arr[offset] = this.x; arr[offset + 1] = this.y; return this; }
}

class Physics2D {
  constructor(config) {
    this.config = config;
    this.count = config.count;
    this.positionData = new Float32Array(2 * config.count).fill(0);
    this.velocityData = new Float32Array(2 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.center = new Vec2();
    this._init();
    this._setSizes();
  }

  _init() {
    const { config: c, positionData: pd } = this;
    // Start all boxes above the viewport (falling in from top)
    for (let i = 0; i < c.count; i++) {
      const base = 2 * i;
      pd[base]     = randFloatSpread(c.maxX * 1.6);
      pd[base + 1] = c.maxY + randFloat(1, c.maxY * 3); // above top
    }
    // Give them a small initial downward velocity
    for (let i = 0; i < c.count; i++) {
      const base = 2 * i;
      this.velocityData[base]     = randFloatSpread(0.5);
      this.velocityData[base + 1] = -randFloat(0.5, 2);
    }
  }

  _setSizes() {
    const { config: c, sizeData: sd } = this;
    for (let i = 0; i < c.count; i++) {
      sd[i] = randFloat(c.minSize, c.maxSize);
    }
  }

  update(delta) {
    const { config: c, positionData: pd, velocityData: vd, sizeData: sd, center } = this;
    const I = new Vec2(), B = new Vec2();
    const O = new Vec2(), N = new Vec2();
    const diff = new Vec2(), push = new Vec2(), impulse = new Vec2();
    const F = new Vec2(center.x, center.y);
    const controlSphere = c.controlSphere0;

    for (let idx = 0; idx < c.count; idx++) {
      const base = 2 * idx;
      I.fromArray(pd, base);
      B.fromArray(vd, base);

      B.y -= delta * c.gravity * sd[idx];
      B.multiplyScalar(c.friction);
      B.clampLength(0, c.maxVelocity);
      I.add(B);

      I.toArray(pd, base);
      B.toArray(vd, base);
    }

    for (let idx = 0; idx < c.count; idx++) {
      const base = 2 * idx;
      I.fromArray(pd, base);
      B.fromArray(vd, base);
      const radius = sd[idx];

      for (let jdx = idx + 1; jdx < c.count; jdx++) {
        const oBase = 2 * jdx;
        O.fromArray(pd, oBase);
        N.fromArray(vd, oBase);
        const oRadius = sd[jdx];

        diff.copy(O).sub(I);
        const dist = diff.length();
        const sumR = radius + oRadius;

        if (dist < sumR && dist > 0) {
          const overlap = sumR - dist;
          push.copy(diff).normalize().multiplyScalar(0.5 * overlap);
          impulse.copy(push).multiplyScalar(Math.max(B.length(), 1));
          const impulseO = new Vec2().copy(push).multiplyScalar(Math.max(N.length(), 1));

          I.sub(push);
          B.sub(impulse);
          I.toArray(pd, base);
          B.toArray(vd, base);

          O.add(push);
          N.add(impulseO);
          O.toArray(pd, oBase);
          N.toArray(vd, oBase);
        }
      }

      // Cursor interaction
      if (controlSphere) {
        diff.copy(F).sub(I);
        const dist = diff.length();
        const interactRadius = c.interactRadius || 3;
        if (dist < interactRadius) {
          const overlap = interactRadius - dist;
          push.copy(diff).normalize().multiplyScalar(overlap * 0.15);
          B.sub(push);
        }
      }

      // Walls
      if (Math.abs(I.x) + radius > c.maxX) {
        I.x = Math.sign(I.x) * (c.maxX - radius);
        B.x = -B.x * c.wallBounce;
      }
      if (I.y - radius < -c.maxY) {
        I.y = -c.maxY + radius;
        B.y = -B.y * c.wallBounce;
      }
      // No top wall — let them fall in from above, but cap them
      if (I.y + radius > c.maxY * 2.5) {
        I.y = c.maxY * 2.5 - radius;
        B.y = -B.y * c.wallBounce;
      }

      I.toArray(pd, base);
      B.toArray(vd, base);
    }
  }
}

// ─── Icon definitions ─────────────────────────────────────────────────────────

const ICONS = [
  // Adobe suite — dark bg icons
  { bg: '#001E36', label: 'Ps',  color: '#31A8FF', title: 'Photoshop' },
  { bg: '#49021F', label: 'Ai',  color: '#FF9A00', title: 'Illustrator' },
  { bg: '#49021F', label: 'Id',  color: '#FF3366', title: 'InDesign' },
  { bg: '#00005B', label: 'Pr',  color: '#9999FF', title: 'Premiere' },
  { bg: '#3D0061', label: 'Ae',  color: '#9999FF', title: 'After Effects' },
  { bg: '#001C26', label: 'Lr',  color: '#31A8FF', title: 'Lightroom' },
  { bg: '#4B0018', label: 'Xd',  color: '#FF61F6', title: 'XD' },
  // Dev tools — colorful icons
  { bg: '#23272F', label: 'Re',  color: '#61DAFB', title: 'React', svg: 'react' },
  { bg: '#2D2D2D', label: 'Nd',  color: '#68A063', title: 'Node.js', svg: 'node' },
  { bg: '#24292E', label: 'Gh',  color: '#FFFFFF', title: 'GitHub', svg: 'github' },
  { bg: '#F24E1E', label: 'Fg',  color: '#FFFFFF', title: 'Figma', svg: 'figma' },
  { bg: '#0057E2', label: 'Li',  color: '#FFFFFF', title: 'LinkedIn', svg: 'linkedin' },
  { bg: '#FF6A00', label: 'Sv',  color: '#FFFFFF', title: 'SVG' },
  { bg: '#007ACC', label: 'Ts',  color: '#FFFFFF', title: 'TypeScript' },
  { bg: '#F7DF1E', label: 'Js',  color: '#000000', title: 'JavaScript' },
  { bg: '#E34F26', label: 'Ht',  color: '#FFFFFF', title: 'HTML5' },
  { bg: '#1572B6', label: 'Cs',  color: '#FFFFFF', title: 'CSS3' },
  { bg: '#CC6699', label: 'Sa',  color: '#FFFFFF', title: 'Sass' },
  { bg: '#0284C7', label: 'Tw',  color: '#FFFFFF', title: 'Tailwind' },
  { bg: '#764ABC', label: 'Rx',  color: '#FFFFFF', title: 'Redux' },
];

// ─── Canvas Renderer ──────────────────────────────────────────────────────────

function drawRoundRect(ctx, x, y, w, h, r) {
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

function drawIcon(ctx, icon, cx, cy, size) {
  const half = size / 2;
  const radius = size * 0.22;

  // Drop shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = size * 0.25;
  ctx.shadowOffsetY = size * 0.06;
  drawRoundRect(ctx, cx - half, cy - half, size, size, radius);
  ctx.fillStyle = icon.bg;
  ctx.fill();
  ctx.restore();

  // Box fill
  drawRoundRect(ctx, cx - half, cy - half, size, size, radius);
  ctx.fillStyle = icon.bg;
  ctx.fill();

  // Subtle highlight on top edge
  const grad = ctx.createLinearGradient(cx - half, cy - half, cx - half, cy - half + size * 0.4);
  grad.addColorStop(0, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  drawRoundRect(ctx, cx - half, cy - half, size, size, radius);
  ctx.fillStyle = grad;
  ctx.fill();

  // Label text
  const fontSize = size * 0.32;
  ctx.font = `700 ${fontSize}px 'Arial', sans-serif`;
  ctx.fillStyle = icon.color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(icon.label, cx, cy + size * 0.02);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IconBallpit({
  className = '',
  count = ICONS.length * 1,
  gravity = 0.6,
  friction = 0.9975,
  wallBounce = 0.82,
  followCursor = true,
}) {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    let animId;
    let mousePos = { x: 0, y: 0 };
    let isHovering = false;

    // Icons array (cycle through if count > ICONS.length)
    const icons = Array.from({ length: count }, (_, i) => ICONS[i % ICONS.length]);

    // World size in "units" (we'll scale to canvas pixels)
    const WORLD_W = 20; // total width in world units
    const BOX_SIZE_WORLD = randFloat(0.9, 1.1); // approx world units per box

    function getScale() {
      return canvas.width / WORLD_W;
    }

    function resize() {
      canvas.width  = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      if (!stateRef.current) return;
      const phys = stateRef.current.physics;
      phys.config.maxX = (canvas.width  / getScale()) / 2;
      phys.config.maxY = (canvas.height / getScale()) / 2;
    }

    const config = {
      count,
      minSize: 0.72,
      maxSize: 0.88,
      gravity,
      friction,
      wallBounce,
      maxVelocity: 0.3,
      maxX: 10,
      maxY: 10,
      interactRadius: 2.4,
      controlSphere0: false,
    };

    canvas.width  = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    config.maxX = (canvas.width  / (canvas.width / WORLD_W)) / 2;
    config.maxY = (canvas.height / (canvas.width / WORLD_W)) / 2;

    const physics = new Physics2D(config);
    stateRef.current = { physics };

    const ctx = canvas.getContext('2d');

    // Pointer interaction
    function onPointerMove(e) {
      if (!followCursor) return;
      const rect = canvas.getBoundingClientRect();
      const scale = getScale();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      // Convert to world coords (origin = center)
      physics.center.x =  (px / scale) - config.maxX;
      physics.center.y = -(py / scale) + config.maxY;
      physics.config.controlSphere0 = true;
      isHovering = true;
    }
    function onPointerLeave() {
      physics.config.controlSphere0 = false;
      isHovering = false;
    }
    function onTouchMove(e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        onPointerMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY });
      }
    }

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onPointerLeave);

    let lastTime = performance.now();

    function render(now) {
      animId = requestAnimationFrame(render);
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      physics.update(delta);

      const scale = getScale();
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Draw each icon box
      for (let i = 0; i < count; i++) {
        const base = 2 * i;
        const wx = physics.positionData[base];
        const wy = physics.positionData[base + 1];

        // World → screen: origin at center
        const sx =  wx * scale + W / 2;
        const sy = -wy * scale + H / 2;

        // Only draw if visible
        if (sy < -60 || sy > H + 60) continue;

        const sizeWorld = physics.sizeData[i];
        const sizePixels = sizeWorld * scale * 1.9;

        drawIcon(ctx, icons[i], sx, sy, sizePixels);
      }
    }

    render(performance.now());

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onPointerLeave);
    };
  }, [count, gravity, friction, wallBounce, followCursor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block', touchAction: 'none', userSelect: 'none' }}
    />
  );
}