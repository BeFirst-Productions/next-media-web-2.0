"use client";

import React, { useState, useEffect } from 'react';
import Container from '../../Common/Container/Container';

export default function HeroDetails() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
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
  }, []);

  // Animation values based on progress
  // BLUE TRIANGLE: Settles on the left side
  const blueTransform = `translate(${-150 * (1 - scrollProgress) - 50}px, ${(-40 + (scrollProgress * 45)) * 1}vh) rotate(${90 * scrollProgress}deg)`;

  // WHITE TRIANGLE: Settles on the right side
  const whiteTransform = `translate(${120 * (1 - scrollProgress) + 50}px, ${(65 - (scrollProgress * 60))}vh) rotate(${280 * scrollProgress}deg)`;

  return (
    <section className="relative w-full py-20 md:py-32 bg-black overflow-hidden">
      <Container>
        <div className="flex flex-col space-y-16 md:space-y-24">

          {/* Top Heading Block */}
          <div className="max-w-4xl">
            <h2 className="text-white text-3xl md:text-4xl 2xl:text-5xl font-light leading-tight tracking-tight">
              <span className="font-semibold">Etiam eu turpis molestie</span>, <br />
              <span className="font-semibold text-white">dictum est a</span>, <span className="text-[#a0a0a0]">mattis tellus.</span>
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

              <div className="relative w-full h-full max-w-[450px]">
                {/* 1. Teal/Blue Triangle (Falling from the center/marquee area) */}
                <div
                  className={`absolute top-0 left-0 w-[80%] z-10 transition-all duration-100 ease-out ${scrollProgress > 0 ? 'opacity-80' : 'opacity-0'}`}
                  style={{ transform: blueTransform }}
                >
                  <svg viewBox="0 0 372 293" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_0_30px_rgba(43,197,238,0.4)]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.92648 51.4617C-6.63634 30.5211 8.37766 6.63646 31.3938 6.17506L339.042 0.007034C367.065 -0.554742 382.218 32.6276 363.442 53.4377L157.307 281.898C141.885 298.99 114.002 294.694 104.439 273.754L2.92648 51.4617ZM61.9147 22.2983C38.8987 22.7598 23.8855 46.644 33.4483 67.5845L112.244 240.131C121.807 261.071 149.689 265.367 165.11 248.275L325.116 70.9409C343.892 50.1309 328.739 16.9497 300.716 17.5112L61.9147 22.2983Z" fill="#29ABE2" />
                  </svg>
                </div>

                {/* 2. White Triangle (Focal position background) */}
                <div
                  className="absolute bottom-0 right-0 w-[80%] z-20 transition-transform duration-100 ease-out"
                  style={{ transform: whiteTransform }}
                >
                  <svg viewBox="0 0 372 293" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M2.92648 51.4617C-6.63634 30.5211 8.37766 6.63646 31.3938 6.17506L339.042 0.007034C367.065 -0.554742 382.218 32.6276 363.442 53.4377L157.307 281.898C141.885 298.99 114.002 294.694 104.439 273.754L2.92648 51.4617ZM61.9147 22.2983C38.8987 22.7598 23.8855 46.644 33.4483 67.5845L112.244 240.131C121.807 261.071 149.689 265.367 165.11 248.275L325.116 70.9409C343.892 50.1309 328.739 16.9497 300.716 17.5112L61.9147 22.2983Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Description Text */}
            <div className="flex flex-col space-y-8">
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-light">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.
                Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti nostra, per inceptos himenaeos.
                Class aptent taciti nostra, per inceptos himenaeos.
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
