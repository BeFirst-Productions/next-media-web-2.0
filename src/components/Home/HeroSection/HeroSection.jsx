"use client";

import React, { useState, useEffect } from 'react';
import Container from '../../Common/Container/Container';

import HeroMarquee from './HeroMarquee';

export default function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dropProgress, setDropProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // The section is 500vh tall, so there are exactly 4 viewports of scroll distance
      const vh = window.innerHeight;
      const maxScroll = vh * 4;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      setScrollProgress(progress);

      // Vertical Drop Progress (When marquee is done, before HeroDetails)
      const drop = Math.min(Math.max((window.scrollY - maxScroll) / vh, 0), 1);
      setDropProgress(drop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Text moves out of the way during the first 20% of the total scroll
  const textProgress = Math.min(scrollProgress / 0.2, 1);
  const translateYAmount = textProgress * 300;

  // 2. Video scales out continuously up to 30% of the scroll until fully opened
  const videoProgress = Math.min(scrollProgress / 0.3, 1);
  // Entire initial hero section instantly snaps to pure black exactly at 30% as marquee begins
  const heroOpacity = scrollProgress >= 0.3 ? 0 : 1;

  // 3. New Marquee Text scrolls horizontally across from 30% to 100% of the MARQUEE distance
  const marqueeProgress = Math.max(0, (scrollProgress - 0.3) / 0.7);
  // Moves from 100vw (off screen right) exactly to -100% of its OWN width + 100vw, parking the final word perfectly on-screen.
  const marqueeTranslate = `calc(100vw - ${marqueeProgress * 100}%)`;

  return (
    <section className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden pt-20">
        <Container>
          <div className="flex flex-col items-center text-center justify-center w-full relative">

            {/* Subtitle */}
            <h2
              className="text-white text-xs sm:text-sm md:text-base font-light tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-6 uppercase transition-transform duration-75 z-20 relative mix-blend-difference"
              style={{ transform: `translateY(-${translateYAmount}px)`, opacity: heroOpacity }}
            >
              A Leading <span className="text-[#2bc5ee]">Creative Agency</span> In Dubai
            </h2>

            {/* Main Typography Block */}
            <div
              className="relative inline-flex flex-col items-center md:items-start text-left z-20 transition-opacity duration-75"
              style={{ opacity: heroOpacity }}
            >

              {/* Top Content Wrapper - Moves UP to the top edge of the video */}
              <div
                className="transition-transform duration-75 z-20"
                style={{ transform: `translateY(-${translateYAmount}px)` }}
              >
                {/* Top Text Line */}
                <div className="flex items-center space-x-2 md:space-x-4 text-[21px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[76px] leading-[1.1] mix-blend-difference">
                  <span className="text-white whitespace-normal sm:whitespace-nowrap">
                    <span className="font-bold">Ready to </span>{' '}
                    <span className="font-light"> grow your</span>{' '}
                    <span className="font-bold"> brand?</span>
                  </span>
                  <svg
                    className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0 overflow-visible"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 3.00408C0.000186167 0.694829 2.50007 -0.748234 4.5 0.406423L21.9648 10.4894C23.9648 11.6441 23.9648 14.531 21.9648 15.6857L4.5 25.7687C2.5 26.9234 0 25.4805 0 23.1711V3.00408ZM5.91113 2.85076C3.91119 1.69639 1.41113 3.14011 1.41113 5.44939V20.7267C1.4114 23.0359 3.91127 24.4788 5.91113 23.3244L19.1416 15.6857C21.1416 14.531 21.1416 11.6441 19.1416 10.4894L5.91113 2.85076Z" fill="#29ABE2" />
                  </svg>
                </div>

                {/* Continuously Animated Separator Line */}
                <div
                  className="w-[105%] md:w-full h-[1px] md:h-[2px] my-2 sm:my-3 relative -ml-2 md:ml-0 flex  overflow-hidden transition-opacity duration-300"
                  style={{ opacity: Math.max(1 - (scrollProgress * 20), 0) }}
                >
                  <style>{`
                @keyframes breatheLine {
                  0%, 10% { transform: scaleX(0); opacity: 0; }
                  45%, 55% { transform: scaleX(1); opacity: 1; }
                  90%, 100% { transform: scaleX(0); opacity: 0; }
                }
                .animate-breathe-line {
                  animation: breatheLine 4s ease-in-out infinite;
                }
                @keyframes waveDraw {
                  0% { stroke-dashoffset: 400; }
                  45%, 55% { stroke-dashoffset: 0; }
                  100% { stroke-dashoffset: -400; }
                }
                .animate-wave-1, .animate-wave-2, .animate-wave-3 { 
                  stroke-dasharray: 400; 
                }
                .animate-wave-1 { animation: waveDraw 5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                .animate-wave-2 { animation: waveDraw 5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.4s; }
                .animate-wave-3 { animation: waveDraw 5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.8s; }
              `}</style>
                  {/* Left Half (Animates continuously from the Left) */}
                  <div className="h-full w-1/2 bg-[#2bc5ee] origin-left animate-breathe-line"></div>
                  {/* Right Half (Animates continuously from the Right) */}
                  <div className="h-full w-1/2 bg-[#2bc5ee] origin-right animate-breathe-line"></div>
                </div>
              </div>

              {/* Bottom Content Wrapper - Moves DOWN to the bottom edge of the video */}
              <div
                className="transition-transform duration-75 z-20"
                style={{ transform: `translateY(${translateYAmount}px)` }}
              >
                {/* Bottom Text Line */}
                <div className="flex items-center space-x-2 md:space-x-4 text-[21px] sm:text-[40px] md:text-[50px] lg:text-[60px] xl:text-[76px] leading-[1.1] ml-0 md:ml-12 lg:ml-16 mix-blend-difference">
                  <svg
                    className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 shrink-0 rotate-90 overflow-visible"
                    viewBox="0 0 24 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 3.00408C0.000186167 0.694829 2.50007 -0.748234 4.5 0.406423L21.9648 10.4894C23.9648 11.6441 23.9648 14.531 21.9648 15.6857L4.5 25.7687C2.5 26.9234 0 25.4805 0 23.1711V3.00408ZM5.91113 2.85076C3.91119 1.69639 1.41113 3.14011 1.41113 5.44939V20.7267C1.4114 23.0359 3.91127 24.4788 5.91113 23.3244L19.1416 15.6857C21.1416 14.531 21.1416 11.6441 19.1416 10.4894L5.91113 2.85076Z" fill="#29ABE2" />
                  </svg>
                  <span className="text-white whitespace-normal sm:whitespace-nowrap">
                    <span className="font-bold">We build</span>{' '}
                    <span className="font-light">brand identities.</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Expanding Video - Fully visible at 30% scroll */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-screen h-[90vh] md:left-0 md:translate-x-0 md:w-full md:h-[95vh] rounded-none md:rounded-3xl overflow-hidden bg-[#0d0d0d] shadow-[0_0_50px_rgba(43,197,238,0.2)] border border-[#2bc5ee]/20 pointer-events-none transition-transform duration-75 [--video-round:0px] md:[--video-round:32px]"
              style={{
                clipPath: `inset(${50 - (50 * videoProgress)}% 0 ${50 - (50 * videoProgress)}% 0 round var(--video-round))`,
                opacity: scrollProgress > 0.01 ? heroOpacity : 0,
                zIndex: videoProgress > 0.7 ? 30 : 10
              }}
            >
              {/* <div className="absolute inset-0 flex items-center justify-center text-[#2bc5ee]/50 font-light tracking-widest text-sm md:text-base border border-[#2bc5ee]/20 m-4 rounded-none md:rounded-2xl border-dashed">
                [ REPLACE WITH YOUR VIDEO ]
              </div> */}
              <video
                src="/video/herosection.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover relative z-20"
              />
            </div>

            {/* NEW: Giant Horizontal Marquee Text overlays the expanded video */}
            <HeroMarquee
              marqueeTranslate={marqueeTranslate}
              marqueeProgress={marqueeProgress}
              dropProgress={dropProgress}
            />

          </div>
        </Container>
      </div>
    </section>
  );
}
