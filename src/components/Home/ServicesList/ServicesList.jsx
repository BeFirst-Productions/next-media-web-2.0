'use client';

import React, { useState, useEffect, useRef } from 'react';
import Container from '../../Common/Container/Container';

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const progress = Math.min(Math.max(-rect.top / (sectionHeight - windowHeight), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { bold: "GRAPHIC", light: "DESIGN", image: "https://images.unsplash.com/photo-1541461946740-4f594514da7a?q=80&w=600" },
    { bold: "VIDEO", light: "EDITING", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600" },
    { bold: "SOCIAL MEDIA &", light: "MARKETING", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600" },
    { bold: "PHOTOGRAPHY", light: "SERVICES", image: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=600" },
    { bold: "CONTENT", light: "MARKETING", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600" },
    { bold: "WEB DESIGN &", light: "DEVELOPMENT", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600" },
    { bold: "BRANDING &", light: "IDENTITY", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600" },
  ];

  // Smooth Interpolation Logic
  // Transition background from 0.05 to 0.15 of scrollProgress
  const colorFactor = Math.min(Math.max((scrollProgress - 0.05) / 0.1, 0), 1);
  const bgColor = `rgb(${colorFactor * 255}, ${colorFactor * 255}, ${colorFactor * 255})`;
  // Text color from white (255,255,255) to nearly black (17,17,17)
  const textGray = 255 - (colorFactor * (255 - 17));
  const textColor = `rgb(${textGray}, ${textGray}, ${textGray})`;

  const listOpacity = Math.min(Math.max((scrollProgress - 0.2) / 0.3, 0), 1);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-[250vh]"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <Container>
          <div className="relative flex flex-col items-center justify-center w-full min-h-[600px] py-20 px-4">
            
            {/* Horizontal Split Line: "We [Gap] make" */}
            <div className="relative w-full flex items-center justify-center mb-12">
              <h2 
                className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter z-40 whitespace-nowrap pointer-events-none transition-transform duration-100 ease-out"
                style={{ transform: `translateX(-${scrollProgress * 75}vw)`, color: textColor }}
              >
                We
              </h2>
              
              <h2 
                className="text-5xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter z-40 whitespace-nowrap ml-4 pointer-events-none transition-transform duration-100 ease-out"
                style={{ transform: `translateX(${scrollProgress * 75}vw)`, color: textColor }}
              >
                make
              </h2>
            </div>

            {/* Middle Services List - Glides up from the bottom */}
            <div 
              className="flex flex-col items-center space-y-10 md:space-y-12 z-20 absolute inset-0 justify-center"
              style={{ opacity: listOpacity, pointerEvents: listOpacity > 0.5 ? 'auto' : 'none' }}
            >
              {services.map((service, index) => {
                const itemProgress = Math.min(Math.max((scrollProgress - 0.2 - (index * 0.05)) / 0.3, 0), 1);
                const isHovered = hoveredIndex === index;

                return (
                  <div 
                    key={index}
                    className="group relative flex flex-col md:flex-row items-center cursor-pointer transition-all duration-1000 ease-out"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ 
                      transform: `translateY(${(1 - itemProgress) * 300}px)`,
                      opacity: itemProgress
                    }}
                  >
                    {/* Floating Side Images - Left */}
                    <div className={`absolute -left-[15vw] lg:-left-[20vw] top-1/2 -translate-y-1/2 w-[12vw] aspect-[4/5] overflow-hidden rounded-lg transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 -translate-x-20 pointer-events-none'}`}>
                      <img src={service.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>

                    {/* Service Text with Underline */}
                    <div className="relative flex flex-col md:flex-row items-center space-x-0 md:space-x-4">
                      <span className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase transition-colors duration-300">
                        {service.bold}
                      </span>
                      <span className="text-2xl md:text-4xl lg:text-5xl font-light text-[#888888] group-hover:text-black uppercase transition-colors duration-300">
                        {service.light}
                      </span>
                      
                      {/* Animated Underline */}
                      <div className={`absolute -bottom-2 left-0 h-[2px] bg-black transition-all duration-500 ease-out ${isHovered ? 'w-full' : 'w-0'}`}></div>
                    </div>

                    {/* Floating Side Images - Right */}
                    <div className={`absolute -right-[15vw] lg:-right-[20vw] top-1/2 -translate-y-1/2 w-[12vw] aspect-[4/5] overflow-hidden rounded-lg transition-all duration-500 ease-elastic-out ${isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-20 pointer-events-none'}`}>
                      <img src={service.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 blur-[1px] hover:blur-0" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </Container>
      </div>

      {/* Decorative side text or minimalist design markers if needed */}
      <div className="absolute left-[5%] top-1/2 -translate-y-1/2 hidden lg:block opacity-5 select-none pointer-events-none">
        <span className="text-[20vh] font-black vertical-text">SERVICES</span>
      </div>
    </section>
  );
}
