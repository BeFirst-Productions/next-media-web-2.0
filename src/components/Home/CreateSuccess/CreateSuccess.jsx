'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

const CITY_IMG_SRC = '/images/success-image-scaled.webp';

function useCloudBgs() {
  return useMemo(() => {
    // Generates mathematically seamless SVG clouds and applies a native Gaussian blur 
    // to transform flat hard circles into soft, photorealistic misty volumes.
    const makeCloud = (puffs, w = 1200, h = 340, opacity = 1) => {
      // 1. Replicate shapes beyond boundaries to completely eliminate cuts during repeating
      const wrapperPuffs = [];
      puffs.forEach(p => {
        wrapperPuffs.push(p);
        wrapperPuffs.push({ ...p, cx: p.cx - w });
        wrapperPuffs.push({ ...p, cx: p.cx + w });
      });

      // 2. SVG filter for massive soft-edge displacement 
      const defs = `
        <defs>
          <filter id="soft-cloud" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
          </filter>
        </defs>
      `;

      const shapes = wrapperPuffs
        .map(
          (p) =>
            `<ellipse cx="${p.cx}" cy="${p.cy}" rx="${p.rx}" ry="${p.ry}" fill="rgba(255,255,255,${(p.o ?? 1) * opacity})" filter="url(#soft-cloud)"/>`
        )
        .join('');
        
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs}${shapes}</svg>`;
      return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    };

    /* ── Layer 1 — foreground, tallest, fully opaque ── */
    const layer1 = makeCloud(
      [
        { cx: 60,   cy: 310, rx: 100, ry: 65,  o: 0.95 },
        { cx: 160,  cy: 285, rx: 130, ry: 80 },
        { cx: 260,  cy: 265, rx: 115, ry: 82 },
        { cx: 205,  cy: 225, rx: 88,  ry: 68,  o: 0.92 },
        { cx: 275,  cy: 205, rx: 70,  ry: 58,  o: 0.85 },
        { cx: 240,  cy: 178, rx: 55,  ry: 46,  o: 0.75 },
        { cx: 420,  cy: 315, rx: 105, ry: 62,  o: 0.88 },
        { cx: 530,  cy: 290, rx: 138, ry: 80 },
        { cx: 648,  cy: 272, rx: 128, ry: 85 },
        { cx: 592,  cy: 235, rx: 95,  ry: 70,  o: 0.90 },
        { cx: 665,  cy: 218, rx: 75,  ry: 60,  o: 0.83 },
        { cx: 628,  cy: 190, rx: 60,  ry: 48,  o: 0.72 },
        { cx: 810,  cy: 308, rx: 110, ry: 68,  o: 0.88 },
        { cx: 920,  cy: 285, rx: 135, ry: 82 },
        { cx: 1030, cy: 268, rx: 118, ry: 80 },
        { cx: 975,  cy: 230, rx: 90,  ry: 66,  o: 0.91 },
        { cx: 1042, cy: 212, rx: 72,  ry: 55,  o: 0.80 },
        { cx: 1010, cy: 185, rx: 52,  ry: 42,  o: 0.70 },
        { cx: 0,    cy: 330, rx: 80,  ry: 52,  o: 0.80 },
        { cx: 1200, cy: 330, rx: 80,  ry: 52,  o: 0.80 },
      ],
      1200, 340, 1.0
    );

    /* ── Layer 2 — mid depth ── */
    const layer2 = makeCloud(
      [
        { cx: 120,  cy: 320, rx: 115, ry: 70 },
        { cx: 235,  cy: 298, rx: 142, ry: 85 },
        { cx: 348,  cy: 278, rx: 120, ry: 78,  o: 0.92 },
        { cx: 292,  cy: 242, rx: 90,  ry: 66,  o: 0.86 },
        { cx: 358,  cy: 222, rx: 72,  ry: 56,  o: 0.78 },
        { cx: 580,  cy: 325, rx: 108, ry: 64,  o: 0.86 },
        { cx: 692,  cy: 302, rx: 140, ry: 82 },
        { cx: 808,  cy: 285, rx: 124, ry: 80,  o: 0.93 },
        { cx: 752,  cy: 250, rx: 92,  ry: 68,  o: 0.84 },
        { cx: 820,  cy: 232, rx: 75,  ry: 58,  o: 0.76 },
        { cx: 960,  cy: 318, rx: 102, ry: 62,  o: 0.84 },
        { cx: 1062, cy: 296, rx: 128, ry: 78,  o: 0.92 },
        { cx: 0,    cy: 340, rx: 92,  ry: 56,  o: 0.74 },
        { cx: 1200, cy: 340, rx: 92,  ry: 56,  o: 0.74 },
      ],
      1200, 340, 0.80
    );

    /* ── Layer 3 — distant wisps ── */
    const layer3 = makeCloud(
      [
        { cx: 180,  cy: 290, rx: 148, ry: 92 },
        { cx: 362,  cy: 268, rx: 130, ry: 82,  o: 0.88 },
        { cx: 310,  cy: 228, rx: 100, ry: 72,  o: 0.80 },
        { cx: 600,  cy: 300, rx: 155, ry: 95 },
        { cx: 770,  cy: 278, rx: 135, ry: 86,  o: 0.90 },
        { cx: 718,  cy: 240, rx: 104, ry: 74,  o: 0.78 },
        { cx: 960,  cy: 295, rx: 146, ry: 90,  o: 0.93 },
        { cx: 1060, cy: 272, rx: 115, ry: 78,  o: 0.85 },
        { cx: 0,    cy: 320, rx: 125, ry: 74,  o: 0.78 },
        { cx: 1200, cy: 320, rx: 125, ry: 74,  o: 0.78 },
      ],
      1200, 340, 0.68
    );

    return { layer1, layer2, layer3 };
  }, []);
}

/* Shared base style for every cloud layer div */
const cloudLayerBase = {
  backgroundRepeat: 'repeat-x',
  backgroundSize: 'auto 100%',
  backgroundPosition: 'bottom center',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '340px',
};

export default function CreateSuccess() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { layer1, layer2, layer3 } = useCloudBgs();

  /* Trigger the scroll-reveal animation once */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        background: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes cs-clouds-1 {
          from { background-position-x: 0px; }
          to   { background-position-x: -1200px; }
        }
        @keyframes cs-clouds-2 {
          from { background-position-x: -400px; }
          to   { background-position-x: -1600px; }
        }
        @keyframes cs-clouds-3 {
          from { background-position-x: -800px; }
          to   { background-position-x: 400px; }
        }
        @keyframes cs-breathe {
          0%,100% { transform: translateY(0px) scale(1);      }
          50%      { transform: translateY(-8px) scale(1.004); }
        }
        @keyframes cs-word-slide {
          0%, 25%  { transform: translateY(0%);    }
          33%, 58% { transform: translateY(-25%);  }
          66%, 91% { transform: translateY(-50%);  }
          100%     { transform: translateY(-75%);  }
        }

        .cs-breathe {
          animation: cs-breathe 12s ease-in-out infinite;
          position: relative;
          z-index: 2;
        }

        .cs-title-wrapper {
          position: absolute;
          top: 12%;
          left: 0;
          width: 100%;
          z-index: 5;
          pointer-events: none;
          mix-blend-mode: multiply;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-weight: 800;
          color: #c7cbd1;
          font-size: clamp(2.5rem, 6.5vw, 7rem);
          line-height: 1.25;
          letter-spacing: -0.02em;
          white-space: nowrap; /* Ensures text never randomly wraps on tight screens */
        }

        .cs-title-line-1 {
          transform: translateX(-10%);
        }

        .cs-title-line-2 {
          transform: translateX(2%);
          display: flex;
          align-items: center;
        }

        /* ── Mobile Layout Adjustments ── */
        @media (max-width: 768px) {
          .cs-title-wrapper {
            font-size: clamp(2rem, 8vw, 3.5rem); /* Allow text to scale down more safely */
            top: 10%;
          }
          .cs-title-line-1 {
            transform: translateX(-4%); /* Reduce extreme stagger to prevent bleeding off edge */
          }
          .cs-title-line-2 {
            transform: translateX(1%);
          }
        }

        .cs-slider-container {
          display: inline-flex;
          flex-direction: column;
          height: 1.25em;
          overflow: hidden;
          position: relative;
          vertical-align: bottom;
          padding-left: 0.25em;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
          clip-path: inset(0 0 0 0);
        }

        .cs-word-slider {
          display: flex;
          flex-direction: column;
          animation: cs-word-slide 9s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .cs-word-slider > span {
          display: flex;
          align-items: center;
          height: 1.25em;
          line-height: 1.25;
        }

        /* Fade clouds in from transparent at the top so they blend
           naturally into the city image above */
        .cs-cloud-top-fade {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 35%);
          mask-image: linear-gradient(to bottom, transparent 0%, black 35%);
        }
      `}</style>

      {/* ── Subtle top bleed from previous section ── */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '10vh',
          background: 'linear-gradient(to bottom, rgba(42,171,238,0.07) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── City image + cloud overlay — scroll-triggered reveal ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          zIndex: 2,
          transform: visible ? 'translateY(0)' : 'translateY(52px)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.3s ease, transform 1.3s ease',
        }}
      >
        {/* ── Animated title (mix-blend-mode: multiply = visible only over
            the light sky, disappears over dark buildings) ── */}
        <div className="cs-title-wrapper">
          <div className="cs-title-line-1">Take Your</div>
          <div className="cs-title-line-2">
            <span>Brand</span>
            <span className="cs-slider-container">
              <span className="cs-word-slider">
                <span>Higher</span>
                <span>Further</span>
                <span>Global</span>
                <span>Higher</span>
              </span>
            </span>
          </div>
        </div>

        {/* ── City image with gentle breathe ── */}
        <div className="cs-breathe" style={{ position: 'absolute', inset: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CITY_IMG_SRC}
            alt="Dubai skyline rising above clouds"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              objectPosition: 'bottom center',
              display: 'block' 
            }}
          />
        </div>

        {/* ════════════════════════════════════════════════════════
            CLOUD OVERLAY — 3 tiling layers at different depths
            SVG width is 1200px to match background-position-x
            animation distance, ensuring seamless looping.
            background-size: auto 100% scales height to fill the
            340 px wrapper; repeat-x tiles horizontally.
        ════════════════════════════════════════════════════════ */}
        <div
          className="cs-cloud-top-fade"
          style={{
            position: 'absolute',
            bottom: '-10px',
            left: 0,
            right: 0,
            height: '340px',   /* taller than original 260 px for better coverage */
            zIndex: 6,
            pointerEvents: 'none',
          }}
        >
          {/* Layer 1 — foreground, fastest, fully opaque */}
          <div
            style={{
              ...cloudLayerBase,
              backgroundImage: layer1,
              animation: 'cs-clouds-1 90s linear infinite',
              zIndex: 7,
            }}
          />

          {/* Layer 2 — mid depth, slower, slightly blurred */}
          <div
            style={{
              ...cloudLayerBase,
              backgroundImage: layer2,
              animation: 'cs-clouds-2 150s linear infinite',
              opacity: 0.65,
              filter: 'blur(1.5px)',
              zIndex: 6,
            }}
          />

          {/* Layer 3 — distant wisps, slowest, most blurred */}
          <div
            style={{
              ...cloudLayerBase,
              backgroundImage: layer3,
              animation: 'cs-clouds-3 120s linear infinite',
              opacity: 0.38,
              filter: 'blur(3px)',
              zIndex: 5,
            }}
          />
        </div>

        {/* ── White fade at bottom — merges into page background ── */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '18%',
            background: 'linear-gradient(to bottom, transparent, #ffffff)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}