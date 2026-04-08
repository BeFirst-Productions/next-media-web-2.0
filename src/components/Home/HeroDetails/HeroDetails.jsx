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
              </span>, <br />
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

              <div className="relative w-full h-full max-w-[450px] flex items-center justify-center">
                {/* User Provided SVG Shape */}
                <svg width="415" height="368" viewBox="0 0 415 368" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-[0_0_50px_rgba(43,197,238,0.2)]">
                  <mask id="path-1-inside-1_0_1" fill="white">
                    <path fillRule="evenodd" clipRule="evenodd" d="M78.0402 20.564C86.8055 -2.32392 116.993 -7.2657 132.599 11.6329L269.778 177.765C285.622 196.953 274.464 226.089 249.856 229.785L36.7977 261.788C12.5608 265.428 -6.60378 241.587 2.16112 218.699L78.0402 20.564ZM137.558 41.1102C121.953 22.2113 91.7657 27.1525 83.0003 50.0404L25.5412 200.077C16.7759 222.965 35.9404 246.807 60.1774 243.167L221.515 218.932C246.123 215.236 257.281 186.1 241.437 166.913L137.558 41.1102Z"/>
                  </mask>
                  <path fillRule="evenodd" clipRule="evenodd" d="M78.0402 20.564C86.8055 -2.32392 116.993 -7.2657 132.599 11.6329L269.778 177.765C285.622 196.953 274.464 226.089 249.856 229.785L36.7977 261.788C12.5608 265.428 -6.60378 241.587 2.16112 218.699L78.0402 20.564ZM137.558 41.1102C121.953 22.2113 91.7657 27.1525 83.0003 50.0404L25.5412 200.077C16.7759 222.965 35.9404 246.807 60.1774 243.167L221.515 218.932C246.123 215.236 257.281 186.1 241.437 166.913L137.558 41.1102Z" fill="#29ABE2" fillOpacity="0.5"/>
                  <path d="M132.599 11.6329L133.37 10.9962L133.37 10.9961L132.599 11.6329ZM269.778 177.765L269.007 178.402V178.402L269.778 177.765ZM249.856 229.785L249.708 228.796V228.796L249.856 229.785ZM36.7977 261.788L36.9462 262.777L36.9462 262.777L36.7977 261.788ZM2.16112 218.699L1.22726 218.342L1.22725 218.342L2.16112 218.699ZM137.558 41.1102L136.787 41.7469L136.787 41.7469L137.558 41.1102ZM83.0003 50.0404L82.0664 49.6827L82.0664 49.6827L83.0003 50.0404ZM60.1774 243.167L60.326 244.156L60.326 244.156L60.1774 243.167ZM221.515 218.932L221.664 219.921V219.921L221.515 218.932ZM241.437 166.913L242.208 166.276L242.208 166.276L241.437 166.913ZM78.0402 20.564L78.9741 20.9216C87.4655 -1.25106 116.71 -6.03838 131.828 12.2696L132.599 11.6329L133.37 10.9961C117.277 -8.49302 86.1456 -3.39679 77.1064 20.2064L78.0402 20.564ZM132.599 11.6329L131.828 12.2696L269.007 178.402L269.778 177.765L270.549 177.128L133.37 10.9962L132.599 11.6329ZM269.778 177.765L269.007 178.402C284.356 196.99 273.546 225.215 249.708 228.796L249.856 229.785L250.005 230.774C275.381 226.962 286.888 196.916 270.549 177.128L269.778 177.765ZM249.856 229.785L249.708 228.796L36.6491 260.799L36.7977 261.788L36.9462 262.777L250.005 230.774L249.856 229.785ZM36.7977 261.788L36.6491 260.799C13.1697 264.326 -5.39602 241.23 3.09499 219.057L2.16112 218.699L1.22725 218.342C-7.81156 241.945 11.9519 266.531 36.9462 262.777L36.7977 261.788ZM2.16112 218.699L3.09498 219.057L78.9741 20.9216L78.0402 20.564L77.1064 20.2064L1.22726 218.342L2.16112 218.699ZM137.558 41.1102L138.329 40.4734C122.237 20.984 91.1058 26.0796 82.0664 49.6827L83.0003 50.0404L83.9341 50.398C92.4257 28.2254 121.67 23.4386 136.787 41.7469L137.558 41.1102ZM83.0003 50.0404L82.0664 49.6827L24.6074 199.72L25.5412 200.077L26.4751 200.435L83.9341 50.398L83.0003 50.0404ZM25.5412 200.077L24.6074 199.72C15.5681 223.323 35.3316 247.91 60.326 244.156L60.1774 243.167L60.0289 242.178C36.5494 245.705 17.9837 222.608 26.4751 200.435L25.5412 200.077ZM60.1774 243.167L60.326 244.156L221.664 219.921L221.515 218.932L221.367 217.944L60.0289 242.178L60.1774 243.167ZM221.515 218.932L221.664 219.921C247.04 216.11 258.547 186.063 242.208 166.276L241.437 166.913L240.666 167.549C256.015 186.137 245.205 214.363 221.367 217.944L221.515 218.932ZM241.437 166.913L242.208 166.276L138.329 40.4734L137.558 41.1102L136.787 41.7469L240.666 167.549L241.437 166.913Z" fill="#29ABE2" fillOpacity="0.8" mask="url(#path-1-inside-1_0_1)"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M411.981 148.452C420.746 125.564 401.582 101.722 377.345 105.362L164.286 137.365C139.679 141.061 128.521 170.197 144.365 189.385L281.544 355.517C297.149 374.416 327.337 369.475 336.102 346.587L411.981 148.452ZM353.964 123.986C378.201 120.345 397.367 144.187 388.602 167.075L331.143 317.112C322.377 340 292.189 344.941 276.584 326.042L172.705 200.239C156.861 181.052 168.019 151.916 192.627 148.22L353.964 123.986Z" fill="white"/>
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
