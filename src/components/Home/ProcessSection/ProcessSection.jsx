'use client';

import React, { useState, useEffect, useRef } from 'react';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

export default function ProcessSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackMultiplier, setTrackMultiplier] = useState(205); 
  // Reduced to prevent empty space at the end
  const sectionRef = useRef(null);

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
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    const handleResize = () => {
      // Precise multipliers to ensure the last item is framed perfectly at scrollProgress = 1
      const width = window.innerWidth;
      if (width < 768) {
        setTrackMultiplier(655); // Adjusted for 8 items mobile to show last item fully
      } else if (width >= 768 && width < 1200) {
        setTrackMultiplier(320); // Adjusted for MD/Tablet fixed-width items
      } else {
        setTrackMultiplier(210); // Standard desktop multiplier
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const items = [
    { id: '01', title: 'Discovery', desc: 'Understanding your unique business needs, project goals, and target audience to build a solid foundation.' },
    { id: '02', title: 'Planning', desc: 'Creating an actionable roadmap and strategic plan that aligns with your key objectives and timelines.' },
    { id: '03', title: 'Ideation', desc: 'Brainstorming creative concepts and innovative solutions that set your brand apart in a crowded market.' },
    { id: '04', title: 'Design', desc: 'Crafting premium, user-centric visual experiences that seamlessly blend high-end aesthetics with functionality.' },
    { id: '05', title: 'Development', desc: 'Transforming approved designs into high-performance, scalable products using cutting-edge technologies.' },
    { id: '06', title: 'Testing', desc: 'Comprehensive quality assurance to ensure flawless performance across all environments and user devices.' },
    { id: '07', title: 'Launch', desc: 'Deploying your solution with meticulous care to ensure a smooth, successful transition into the live market.' },
    { id: '08', title: 'Optimization', desc: 'Ongoing performance monitoring and data-driven updates to maximize long-term impact and growth.' },
  ];

  const horizontalOffset = 15 - (scrollProgress * trackMultiplier);

  // Smooth Interpolation Logic (White to Black)
  // Reversing the ServicesList logic: 1 -> 0 transition
  // Start transition immediately at progress = 0 (reach full screen)
  const colorFactor = Math.min(Math.max((scrollProgress - 0) / 0.1, 0), 1);
  const inverseFactor = 1 - colorFactor;
  
  // Background from White (255,255,255) to Black (0,0,0)
  const bgVal = inverseFactor * 255;
  const bgColor = `rgb(${bgVal}, ${bgVal}, ${bgVal})`;
  
  // Text from Black (17,17,17) to White (255,255,255)
  const textVal = 17 + (colorFactor * (255 - 17));
  const textColor = `rgb(${textVal}, ${textVal}, ${textVal})`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[500vh]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden">

        {/* Fixed Top Header (Synced with background transition) */}
        <Container className="absolute top-16 left-0 right-0 z-20">
          <SectionBadge style={{ color: textColor, borderColor: textColor }} className="!text-inherit">
            Process
          </SectionBadge>
        </Container>

        {/* Scrollable Horizontal Track */}
        <div
          className="relative flex items-start transition-transform duration-100 ease-out h-[80vh] mt-[15vh] will-change-transform"
          style={{ transform: `translateX(${horizontalOffset}vw)` }}
        >
          {items.map((item, index) => {
            const baseStagger = index < 2 ? index * 8 : (16 + (index - 1) * 10.5);
            const itemFocusPoint = (index / items.length);
            const riseSpeed = (typeof window !== 'undefined' && window.innerWidth < 768) ? 8 : 4;
            const riseProgress = Math.min(Math.max((scrollProgress - itemFocusPoint + 0.1) * riseSpeed, 0), 1);
            const currentY = baseStagger * (1 - riseProgress);
            const lineHeight = 80 - currentY;

            return (
              <div
                key={item.id}
                className="relative flex flex-col shrink-0 w-[80vw] md:w-[320px] lg:w-[25vw] mr-[12vw] md:mr-[10vw] transition-transform duration-300 ease-out z-20"
                style={{ transform: `translateY(${currentY}vh)` }}
              >
                {/* Vertical Blue Line */}
                <div
                  className="absolute left-0 top-1 w-px bg-[#00A3FF] pointer-events-none shadow-[0_0_8px_rgba(0,163,255,0.4)]"
                  style={{ height: `${lineHeight}vh` }}
                ></div>

                {/* Text Content */}
                <div className="pl-6 sm:pl-8 flex flex-col">
                  <div className="flex items-baseline space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                    <span className="text-[#888888] font-mono text-base sm:text-lg font-light">
                      [{item.id}]
                    </span>
                    <h3 className="text-3xl md:text-4xl 2xl:text-5xl font-medium tracking-tighter uppercase transition-colors duration-200" style={{ color: textColor }}>
                      {item.title}
                    </h3>
                  </div>

                  <p className=" text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-[280px] sm:max-w-[320px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Static Horizontal Baseline */}
        <div className="absolute top-[95vh] left-0 w-full z-10 pointer-events-none">
          <div className="w-[8000vw] h-px bg-[#00A3FF] opacity-60 shadow-[0_0_15px_rgba(0,163,255,0.4)]"></div>
        </div>

      </div>
    </section>
  );
}
