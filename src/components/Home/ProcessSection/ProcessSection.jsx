'use client';

import React, { useState, useEffect, useRef } from 'react';
import Container from '../../Common/Container/Container';

export default function ProcessSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trackMultiplier, setTrackMultiplier] = useState(230);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress (0 to 1) as section scrolls through viewport
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
      // Calculate multiplier based on device screen width
      if (window.innerWidth < 768) {
        setTrackMultiplier(660); // Fine-tuned for 8 items on mobile
      } else {
        setTrackMultiplier(230); // Fine-tuned for 8 items on desktop
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

  // horizontalOffset moves the track left correctly.
  const horizontalOffset = 15 - (scrollProgress * trackMultiplier); 

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[450vh] bg-black text-white" 
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start overflow-hidden">
        
        {/* Fixed Top Header */}
        <Container className="absolute top-16 left-0 right-0 z-20">
          <div className="inline-block px-5 py-2 border border-white/20 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white bg-white/5 backdrop-blur-xl">
            Process
          </div>
        </Container>

        {/* Scrollable Horizontal Track - Starts at 20vh height */}
        <div 
          className="relative flex items-start transition-transform duration-100 ease-out h-[60vh] mt-[20vh] will-change-transform"
          style={{ transform: `translateX(${horizontalOffset}vw)` }}
        >
          {items.map((item, index) => {
            // Initial stagger position: index * 6vh
            const baseStagger = index * 6; 
            
            // Climb progress calculation
            const itemFocusPoint = (index / items.length);
            const riseSpeed = (typeof window !== 'undefined' && window.innerWidth < 768) ? 8 : 4;
            const riseProgress = Math.min(Math.max((scrollProgress - itemFocusPoint + 0.1) * riseSpeed, 0), 1);
            const currentY = baseStagger * (1 - riseProgress); 
            
            // MATH FOR THE VERTICAL LINE:
            const lineHeight = 60 - currentY;

            return (
              <div 
                key={item.id} 
                className="relative flex flex-col shrink-0 w-[80vw] md:w-[320px] lg:w-[25vw] mr-[12vw] md:mr-[10vw] transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${currentY}vh)` }}
              >
                {/* Vertical Blue Line - Locked perfectly to baseline */}
                <div 
                  className="absolute left-0 top-1 w-px bg-[#00A3FF] pointer-events-none shadow-[0_0_8px_rgba(0,163,255,0.4)]"
                  style={{ height: `${lineHeight}vh` }} 
                ></div>
                
                {/* Text Content */}
                <div className="pl-6 sm:pl-8 flex flex-col">
                  {/* ID and Title Row */}
                  <div className="flex items-baseline space-x-2 sm:space-x-3 mb-2 sm:mb-4">
                    <span className="text-[#888888] font-mono text-base sm:text-lg font-light">
                      [{item.id}]
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white uppercase italic/not">
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white/60 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-[280px] sm:max-w-[320px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Static Horizontal Baseline - Set precisely at 80vh */}
        <div className="absolute top-[80vh] left-0 w-full z-10 pointer-events-none">
          <div className="w-[8000vw] h-px bg-[#00A3FF] opacity-60 shadow-[0_0_15px_rgba(0,163,255,0.4)]"></div>
        </div>

      </div>
    </section>
  );
}
