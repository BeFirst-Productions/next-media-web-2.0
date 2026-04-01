'use client';

import IconBallpit from './Iconballpit';

export default function TechToolsSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '520px',
        width: '100%',
        background: '#ffffff',
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header badge + text */}
      <div style={{ textAlign: 'center', paddingTop: '36px', zIndex: 10, position: 'relative' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: '1.5px solid #d0d5dd',
            borderRadius: '999px',
            padding: '4px 14px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#344054',
            background: '#fff',
            marginBottom: '12px',
          }}
        >
          <span style={{ color: '#6941c6', fontSize: '15px' }}>✦</span>
          Technology &amp; Tools
        </div>
        <p style={{ margin: 0, fontSize: '15px', color: '#667085', lineHeight: 1.6, maxWidth: '380px' }}>
          Gorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          Etiam eu turpis molestie, dictum est a,
        </p>
      </div>

      {/* Icon physics pit */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
          minHeight: '380px',
        }}
      >
        {/* The canvas */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <IconBallpit
            count={20}
            gravity={0.55}
            friction={0.9975}
            wallBounce={0.80}
            followCursor={true}
          />
        </div>

        {/* Blue wave overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            pointerEvents: 'none',
            zIndex: 5,
          }}
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,60 C240,110 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
              fill="#38bdf8"
              opacity="0.9"
            />
            <path
              d="M0,80 C360,40 720,110 1080,60 C1260,35 1380,70 1440,80 L1440,120 L0,120 Z"
              fill="#0ea5e9"
              opacity="0.75"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}