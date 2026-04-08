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
  const currentItem = displayedItems[activeIndex];

  const getRotationStyle = () => {
    if (isAutoRotating) return {};

    switch (activeIndex) {
      case 0: return { transform: 'rotateX(0deg) rotateY(0deg)' };
      case 1: return { transform: 'rotateX(0deg) rotateY(-90deg)' };
      case 2: return { transform: 'rotateX(-90deg) rotateY(0deg)' };
      case 3: return { transform: 'rotateX(90deg) rotateY(0deg)' };
      default: return { transform: 'rotateX(0deg)' };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[400vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-black">

        {/* Blog Badge & Description */}
        <Container className="absolute top-16 left-0 right-0 z-50">
          <div className="flex flex-col items-start space-y-4">
            <SectionBadge className="flex items-center gap-2">
              <span className="text-[#00B4D8] text-xl">★</span>
              Blog
            </SectionBadge>
            <p className="text-white text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              Stay updated with the latest insights, trends, and ideas in branding, design, and digital innovation. <br className="hidden md:block" />
              Our blog brings you expert perspectives, creative inspiration, and practical strategies to help your business grow.
            </p>
          </div>
        </Container>

        <Container className="relative h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 md:gap-0 pt-32 md:pt-40">

          {/* CUBE AREA */}
          <div className="relative w-full md:w-1/2 flex items-center justify-center pt-10 md:pt-0">
            <div className="cube-wrapper">
              <div
                className={`cube ${isAutoRotating ? 'auto-rotate' : ''}`}
                style={getRotationStyle()}
              >
                <div className="side front bg-black"><Image src={displayedItems[0].homeImage || displayedItems[0].image} alt="" fill className="object-cover" /></div>
                <div className="side right bg-black"><Image src={displayedItems[1].homeImage || displayedItems[1].image} alt="" fill className="object-cover" /></div>
                <div className="side bottom bg-black"><Image src={displayedItems[2].homeImage || displayedItems[2].image} alt="" fill className="object-cover" /></div>
                <div className="side top bg-black"><Image src={displayedItems[3].homeImage || displayedItems[3].image} alt="" fill className="object-cover" /></div>
              </div>
            </div>


          </div>

          {/* CONTENT AREA */}
          <div className="w-full md:w-1/2 xl:w-1/3 flex flex-col items-center md:items-start pl-0 md:pl-20 px-6 sm:px-0 text-center md:text-left">
            <div key={activeIndex} className="flex flex-col items-center md:items-start animate-in fade-in slide-in-from-bottom-8 duration-1200 transition-all">
              <h3 className="text-3xl md:text-4xl 2xl:text-5xl font-medium tracking-tighter mb-4 sm:mb-6 uppercase text-white drop-shadow-2xl">
                {currentItem.title}
              </h3>
              <p className=" text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-[420px] mb-8 md:mb-12">
                {currentItem.desc}
              </p>

              <Link
                href={`/blogs/${currentItem.slug}`}
                className="group relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-full text-black transition-all duration-300 hover:rotate-45 shadow-xl"
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
          perspective: 1500px;
          filter: drop-shadow(0px 30px 60px rgba(0, 163, 255, 0.2));
        }

        .cube {
          width: clamp(180px, 45vw, 400px);
          height: clamp(180px, 45vw, 400px);
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .auto-rotate {
          animation: rotate 18s infinite linear;
        }

        .side {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: #000;
          backface-visibility: hidden;
          transition: box-shadow 400ms ease, border-color 400ms ease;
        }

        .side:hover {
          box-shadow: 0 0 40px rgba(0, 163, 255, 0.2);
          border-color: rgba(0, 163, 255, 0.5);
        }

        /* Improved translateZ for better centering inside the warped perspective */
        .front  { transform: rotateY(0deg) translateZ(clamp(90px, 22.5vw, 200px)); }
        .bottom { transform: rotateX(-90deg) translateZ(clamp(90px, 22.5vw, 200px)); }
        .top    { transform: rotateX(90deg) translateZ(clamp(90px, 22.5vw, 200px)); }
        .right  { transform: rotateY(90deg) translateZ(clamp(90px, 22.5vw, 200px)); }

        @keyframes rotate {
          from { transform: rotateY(0deg) rotateX(0deg); }
          to { transform: rotateY(360deg) rotateX(360deg); }
        }
      `}</style>
    </section>
  );
}
