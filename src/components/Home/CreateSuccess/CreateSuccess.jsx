'use client';

import { useEffect, useRef, useState } from 'react';

const CITY_IMG_SRC = '/images/success-image-scaled.webp';

// ─── Single wispy cloud puff (used in multiple animated layers) ──────────────
function CloudBand({ opacity = 1 }) {
  return (
    <svg
      viewBox="0 0 1440 180"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dense base */}
      <ellipse cx="80"   cy="155" rx="90"  ry="45" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="240"  cy="145" rx="135" ry="58" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="450"  cy="138" rx="165" ry="68" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="700"  cy="134" rx="180" ry="72" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="960"  cy="138" rx="170" ry="68" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="1190" cy="144" rx="148" ry="60" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="1370" cy="153" rx="110" ry="50" fill={`rgba(255,255,255,${opacity})`} />
      {/* Upper bumps */}
      <ellipse cx="190"  cy="108" rx="78"  ry="54" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="390"  cy="94"  rx="98"  ry="62" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="600"  cy="86"  rx="115" ry="68" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="810"  cy="82"  rx="120" ry="72" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="1020" cy="88"  rx="110" ry="66" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="1210" cy="100" rx="95"  ry="58" fill={`rgba(255,255,255,${opacity})`} />
      {/* Wispy peaks */}
      <ellipse cx="520"  cy="54"  rx="72"  ry="48" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="700"  cy="44"  rx="82"  ry="54" fill={`rgba(255,255,255,${opacity})`} />
      <ellipse cx="890"  cy="50"  rx="76"  ry="50" fill={`rgba(255,255,255,${opacity})`} />
    </svg>
  );
}

export default function CreateSuccess() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
        minHeight: '80vh',
        background: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      {/* ── Keyframes ────────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes cs-drift-r { from { transform: translateX(-40%); } to { transform: translateX(40%); } }
        @keyframes cs-drift-l { from { transform: translateX(30%);  } to { transform: translateX(-50%); } }
        @keyframes cs-breathe {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-10px) scale(1.005); }
        }
        @keyframes cs-fade-up {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cs-breathe { animation: cs-breathe 12s ease-in-out infinite; }
        .cs-c1 { animation: cs-drift-r 32s linear infinite; }
        .cs-c2 { animation: cs-drift-l 44s linear infinite; animation-delay: -12s; }
        .cs-c3 { animation: cs-drift-r 26s linear infinite; animation-delay: -8s;  }
        .cs-c4 { animation: cs-drift-l 52s linear infinite; animation-delay: -24s; }
      `}</style>

      {/* ── Top bleed: the blue from TechTools fades into white here ─────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '12vh',
        background: 'linear-gradient(to bottom, rgba(42,171,238,0.08) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── City skyline ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          // maxWidth: '1360px',
          zIndex: 10,
          /**
           * Scroll-triggered reveal: slides up + fades in once the section
           * enters the viewport (IntersectionObserver sets `visible`).
           */
          transform: visible ? 'translateY(0)' : 'translateY(52px)',
          opacity:   visible ? 1 : 0,
          transition: 'opacity 1.3s ease, transform 1.3s ease',
        }}
      >
        {/* City image — NO horizontal mirror */}
        <div className="cs-breathe">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={CITY_IMG_SRC}
            alt="Dubai skyline rising above clouds"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        {/* ── Animated cloud layers over the lower portion of the image ──────── */}
        {/*
          4 layers at different depths, blur, speed and vertical position
          give a convincing parallax fog that wraps the building bases.
          The mask fades the cloud block into the image above seamlessly.
        */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '58%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 5,
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, black 52%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%, black 52%)',
        }}>
          {/* Layer 1 — dense foreground, drifts right */}
          <div className="cs-c1" style={{
            position: 'absolute', bottom: '-4%', left: '-50%', width: '200%',
            filter: 'blur(4px)',
            willChange: 'transform',
          }}>
            <CloudBand opacity={1} />
          </div>

          {/* Layer 2 — mid depth, drifts left */}
          <div className="cs-c2" style={{
            position: 'absolute', bottom: '8%', left: '-60%', width: '210%',
            filter: 'blur(9px)', opacity: 0.90,
            willChange: 'transform',
          }}>
            <CloudBand opacity={1} />
          </div>

          {/* Layer 3 — slightly higher, faster right */}
          <div className="cs-c3" style={{
            position: 'absolute', bottom: '22%', left: '-70%', width: '220%',
            filter: 'blur(16px)', opacity: 0.70,
            willChange: 'transform',
          }}>
            <CloudBand opacity={0.9} />
          </div>

          {/* Layer 4 — high wispy tendrils, slow left */}
          <div className="cs-c4" style={{
            position: 'absolute', bottom: '36%', left: '-20%', width: '170%',
            filter: 'blur(25px)', opacity: 0.45,
            willChange: 'transform',
          }}>
            <CloudBand opacity={0.8} />
          </div>
        </div>

        {/* Hard white fade at the very bottom of the image — merges into page */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '22%',
          background: 'linear-gradient(to bottom, transparent, #ffffff)',
          zIndex: 10,
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  );
}
