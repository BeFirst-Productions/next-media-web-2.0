'use client';

import React, { useState, useEffect, useRef } from 'react';
import Container from '../../Common/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import { BlogData as blogItems } from '../../../data/BlogData';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

export default function BlogSection() {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isWhite, setIsWhite] = useState(false);
  const sectionRef = useRef(null);
  const targetProgress = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const start = rect.top;
      const scrollableDist = sectionHeight - windowHeight;

      if (start <= 0) {
        const progress = Math.min(Math.max(-start / scrollableDist, 0), 1);
        targetProgress.current = progress;

        if (progress > 0.02 && progress < 0.98) {
          setIsAutoRotating(false);
        }
      } else {
        targetProgress.current = 0;
      }

      if (rect.bottom < windowHeight * 0.6) {
        setIsWhite(true);
      } else {
        setIsWhite(false);
      }
    };

    const updateSmooth = () => {
      const lerp = 0.08;
      setSmoothProgress(prev => {
        const diff = targetProgress.current - prev;
        if (Math.abs(diff) < 0.0001) return targetProgress.current;
        return prev + diff * lerp;
      });
      rafRef.current = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(updateSmooth);

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setIsAutoRotating(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const displayedItems = blogItems.slice(0, 4);
  const totalItems = displayedItems.length;
  const activeIndex = Math.min(Math.floor(smoothProgress * totalItems), totalItems - 1);
  const currentItem = displayedItems[activeIndex] || displayedItems[0]; // Fallback

  // Helper function to guarantee an image is always returned, looping if necessary
  const getImage = (index) => {
    const item = displayedItems[index % totalItems] || displayedItems[0]; 
    return item?.homeImage || item?.image || '';
  };

const getRotationStyle = () => {
    if (isAutoRotating) return {};
    
    // Changed rotateX from -20deg to -10deg to reduce the downward tilt
    const globalTilt = `rotateX(-10deg) rotateY(10deg)`;

    switch (activeIndex) {
      case 0: return { transform: `${globalTilt} rotateX(0deg) rotateY(0deg)` };
      case 1: return { transform: `${globalTilt} rotateY(-90deg)` };
      case 2: return { transform: `${globalTilt} rotateX(90deg)` };
      case 3: return { transform: `${globalTilt} rotateX(-90deg)` };
      default: return { transform: `${globalTilt}` };
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full h-[400vh] transition-colors duration-1000 ease-in-out ${isWhite ? 'bg-white' : 'bg-black'}`}
    >
      <div className={`sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden transition-colors duration-1000 ease-in-out ${isWhite ? 'bg-white' : 'bg-black'}`}>

        <Container className="absolute top-16 left-0 right-0 z-50">
          <div className="flex flex-col items-start space-y-4">
            <SectionBadge className={`flex items-center gap-2 transition-all duration-700 ${isWhite ? '!text-black !border-black/20 !bg-black/5' : ''}`}>
              <span className="text-[#00B4D8] text-xl">★</span>
              Blog
            </SectionBadge>
            <p className={`transition-colors duration-700 text-lg md:text-xl font-light leading-relaxed max-w-3xl ${isWhite ? 'text-black' : 'text-white'}`}>
              Our blog brings you expert perspectives, creative inspiration, and practical strategies to help your business grow.
            </p>
          </div>
        </Container>

        <Container className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-0 pt-56 sm:pt-48 md:pt-40">

          {/* CUBE AREA */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center">
            <div className="cube-wrapper">
              <div
                className={`cube ${isAutoRotating ? 'auto-rotate' : ''}`}
                style={getRotationStyle()}
              >
                {/* 1. FRONT */}
                <div className="side front">
                    <Image src={getImage(0)} alt="Blog Front" fill className="object-cover object-[20%_center]" />
                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 0 ? 'opacity-0' : 'opacity-60 bg-black'}`} />
                </div>
                {/* 2. RIGHT */}
                <div className="side right">
                    <Image src={getImage(1)} alt="Blog Right" fill className="object-cover object-[20%_center]" />
                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 1 ? 'opacity-0' : 'opacity-60 bg-black'}`} />
                </div>
                {/* 3. BACK */}
                <div className="side back">
                    <Image src={getImage(2)} alt="Blog Back" fill className="object-cover object-[20%_center]" />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                {/* 4. LEFT */}
                <div className="side left">
                    <Image src={getImage(3)} alt="Blog Left" fill className="object-cover object-[20%_center]" />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                {/* 5. BOTTOM */}
                <div className="side bottom">
                    <Image src={getImage(2)} alt="Blog Bottom" fill className="object-cover object-[20%_center]" />
                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 2 ? 'opacity-0' : 'opacity-60 bg-black'}`} />
                </div>
                {/* 6. TOP */}
                <div className="side top">
                    <Image src={getImage(3)} alt="Blog Top" fill className="object-cover object-[20%_center]" />
                    <div className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === 3 ? 'opacity-0' : 'opacity-60 bg-black'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT AREA */}
          <div className="w-full md:w-1/2 xl:w-1/3 flex flex-col items-center md:items-start pl-0 md:pl-20 px-6 sm:px-0 text-center md:text-left">
            <div key={activeIndex} className="flex flex-col items-center md:items-start animate-in fade-in slide-in-from-bottom-8 duration-1000 transition-all">
              <h3 className={`text-2xl md:text-3xl 2xl:text-4xl font-medium tracking-tighter mb-4 sm:mb-6 uppercase transition-colors duration-700 drop-shadow-2xl ${isWhite ? 'text-black' : 'text-white'}`}>
                {currentItem.title}
              </h3>
              <p className={`text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-[420px] mb-8 md:mb-12 transition-colors duration-700 ${isWhite ? 'text-black' : 'text-white'}`}>
                {currentItem.desc}
              </p>

              <Link
                href={`/blogs/${currentItem.slug}`}
                className={`group relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full transition-all duration-300 hover:rotate-45 shadow-xl ${isWhite ? 'bg-black text-white' : 'bg-white text-black'}`}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <style jsx>{`
        .cube-wrapper {
          perspective: 2500px;
          filter: drop-shadow(0px 50px 100px rgba(0, 180, 216, 0.25));
        }

        .cube {
          width: clamp(200px, 45vw, 350px);
          height: clamp(200px, 45vw, 350px);
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform;
        }

        @media (min-width: 1536px) {
          .cube { width: 450px; height: 450px; }
        }

        .auto-rotate {
          animation: rotate 20s infinite linear;
        }

        .side {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0px;
          overflow: hidden;
          backface-visibility: visible;
          border: 1.5px solid ${isWhite ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
          background-color: ${isWhite ? '#ffffff' : '#0a0a0a'};
          box-shadow: inset 0 0 40px rgba(0,0,0,0.6);
        }

        /* All 6 sides properly translated from the center */
        .front  { transform: rotateY(0deg) translateZ(calc(clamp(200px, 45vw, 350px) / 2)); }
        .right  { transform: rotateY(90deg) translateZ(calc(clamp(200px, 45vw, 350px) / 2)); }
        .back   { transform: rotateY(180deg) translateZ(calc(clamp(200px, 45vw, 350px) / 2)); }
        .left   { transform: rotateY(-90deg) translateZ(calc(clamp(200px, 45vw, 350px) / 2)); }
        .bottom { transform: rotateX(-90deg) translateZ(calc(clamp(200px, 45vw, 350px) / 2)); }
        .top    { transform: rotateX(90deg) translateZ(calc(clamp(200px, 45vw, 350px) / 2)); }

        @media (min-width: 1536px) {
          .front  { transform: rotateY(0deg) translateZ(225px); }
          .right  { transform: rotateY(90deg) translateZ(225px); }
          .back   { transform: rotateY(180deg) translateZ(225px); }
          .left   { transform: rotateY(-90deg) translateZ(225px); }
          .bottom { transform: rotateX(-90deg) translateZ(225px); }
          .top    { transform: rotateX(90deg) translateZ(225px); }
        }

        /* Auto-rotate animation fixed to respect the isometric tilt */
      /* Auto-rotate animation fixed to respect the new isometric tilt */
        @keyframes rotate {
          from { transform: rotateX(-10deg) rotateY(10deg) rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(-10deg) rotateY(10deg) rotateX(0deg) rotateY(360deg); }
        }
      `}</style>
    </section>
  );
}