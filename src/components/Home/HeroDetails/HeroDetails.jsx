"use client";

import React, { useState, useEffect } from 'react';
import Container from '../../Common/Container/Container';

export default function HeroDetails() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    /* 
    const handleScroll = () => {
      // We want to track scroll specifically within this section's entrance
      const sectionOffset = window.innerHeight * 4; // End of HeroSection
      const distance = window.innerHeight; // Track over 1vh
      const progress = Math.min(Math.max((window.scrollY - sectionOffset) / distance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
    */
  }, []);

  // Animation values based on progress (Commented as requested)
  /*
  // BLUE TRIANGLE: Settles on the left side
  const blueTransform = `translate(${-150 * (1 - scrollProgress) - 50}px, ${(-40 + (scrollProgress * 45)) * 1}vh) rotate(${10 * scrollProgress}deg)`;

  // WHITE TRIANGLE: Settles on the right side
  const whiteTransform = `translate(${120 * (1 - scrollProgress) + 120}px, ${(60 - (scrollProgress * 80))}vh) rotate(${200 * scrollProgress}deg)`;
  */

  return (
    <section className="relative w-full py-20 md:py-32 bg-black overflow-hidden">
      <Container>
        <div className="flex flex-col space-y-16 md:space-y-24">

          {/* Top Heading Block */}
          <div className="max-w-4xl">
            <h2 className="text-white text-3xl md:text-4xl 2xl:text-5xl font-light leading-tight tracking-tight">
              <span className="font-semibold">Best Branding Agency Dubai
              </span> <br />
              <span className="font-semibold text-white">Design. Strategy. Brand Excellence.
              </span>
              <span className="inline-block ml-4 text-[#2bc5ee]">
                <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0 3.00408C0.000186338 0.694829 2.50007 -0.748234 4.5 0.406423L21.9648 10.4894C23.9648 11.6441 23.9648 14.531 21.9648 15.6857L4.5 25.7687C2.5 26.9234 0 25.4805 0 23.1711V3.00408ZM5.91113 2.85076C3.91119 1.69639 1.41113 3.14011 1.41113 5.44939V20.7267C1.4114 23.0359 3.91127 24.4788 5.91113 23.3244L19.1416 15.6857C21.1416 14.531 21.1416 11.6441 19.1416 10.4894L5.91113 2.85076Z" fill="#29ABE2" />
                </svg>
              </span>
            </h2>
          </div>

          {/* Bottom Split Layout Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">

            {/* Left Column: Overlapping Triangles with Scroll Animation */}
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Radial glow background */}
              <div className="absolute inset-0 bg-[#2bc5ee]/5 blur-[130px] rounded-full scale-125 opacity-30"></div>

              <div className="relative w-full h-full max-w-[550px] flex items-center justify-center">
                {/* User Provided SVG Shape */}
                <svg width="550" height="488" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_0_50px_rgba(43,197,238,0.2)] -rotate-12">
                  <path d="M288.82,211.21c0,3.03-.87,10.6-8.76,15.16l-47.98,27.7,24.48,14.14,35.74-20.64c27.98-16.16,27.98-56.59,0-72.74l-34.8-20.09-24.48,14.14,47.04,27.15c7.89,4.56,8.76,12.13,8.76,15.18ZM81,363.18c6.99,0,14.16-1.79,20.92-5.71l95.19-54.95,10.36-5.97,24.48-14.14-1.88-1.09-22.6-13.05-22.6,13.05-1.88,1.09-93.31,53.87c-2.77,1.6-5.69,2.41-8.68,2.41h-.02c-8.44,0-17.57-6.72-17.57-17.59V101.3c0-10.87,9.13-17.59,17.59-17.59,2.99,0,5.91.81,8.68,2.41l93.31,53.87,1.88,1.09,22.6,13.05,22.6-13.05,1.88-1.09-24.48-14.14-10.36-5.97-95.19-54.95c-6.76-3.92-13.93-5.71-20.92-5.71-21.94,0-42.07,17.55-42.07,42.07v219.81c0,24.52,20.13,42.07,42.07,42.07Z" fill="#2baae2" />
                  <path d="M123.64,247.57l60.35,34.84,24.48,14.14,10.36,5.97,95.19,54.95c6.76,3.92,13.93,5.71,20.92,5.71,21.94,0,42.07-17.55,42.07-42.07V101.3c0-24.52-20.13-42.07-42.07-42.07-6.99,0-14.16,1.79-20.92,5.71l-95.19,54.95-10.36,5.97-24.48,14.14-60.35,34.84c-27.98,16.16-27.98,56.59,0,72.74ZM135.88,196.04l72.59-41.9,22.6-13.05,1.88-1.09,93.31-53.87c2.77-1.6,5.69-2.41,8.68-2.41,8.46,0,17.59,6.72,17.59,17.59v219.81c0,10.87-9.13,17.59-17.59,17.59-2.99,0-5.91-.81-8.68-2.41l-93.31-53.87-1.88-1.09-22.6-13.05-72.59-41.9c-7.89-4.56-8.76-12.13-8.76-15.16s.87-10.62,8.76-15.18Z" fill="white" />
                </svg>
              </div>
            </div>

            {/* Right Column: Description Text */}
            <div className="flex flex-col space-y-8">
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light">
                We are a Creative agency in Dubai, we are ambitious and kind-hearted individuals who come from various parts of the world. This implies that we offer a global viewpoint on every assignment and mix it with the local culture. This especially applies to design.

              </p>
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light">
                In a crowded market where brands continually vie for consumers' attention, distinctive design is the most effective weapon to set yourself apart. As a top branding agency  Dubai, we develop progressive brand strategies and corporate identities that not only mirror the latest trends but are also designed to be flexible and sustained over time.

              </p>

              <div className="flex items-center space-x-4">
                <div className="h-px flex-1 bg-linear-to-r from-[#2bc5ee] to-transparent"></div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
