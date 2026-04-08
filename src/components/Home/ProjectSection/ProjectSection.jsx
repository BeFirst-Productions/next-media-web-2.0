"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const projects = [
  { id: 1, image: 'noor-01.png', tags: ['Graphic Design', 'Branding'] },
  { id: 2, image: 'noor-02.png', tags: ['Development', 'Branding'] },
  { id: 3, image: 'adl.png', tags: ['Branding', 'Social Media'] },
  { id: 4, image: 'bizdoc.png', tags: ['UI UX Design', 'Development'] },
  { id: 5, image: 'naspixels.png', tags: ['Graphic Design', 'Branding'] },
  { id: 6, image: 'breeq-alqeeq.png', tags: ['Development', 'Branding'] },
  { id: 7, image: 'nexzone-01.png', tags: ['Development', 'Branding'] },
  { id: 8, image: 'next.png', tags: ['Development', 'Branding'] },
  { id: 9, image: 'nexzone-02.png', tags: ['Company Profile', 'Branding'] },
];

export default function ProjectSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Start transition when the section hits the top of the viewport
      const start = rect.top;
      const scrollableDist = sectionHeight - windowHeight;

      if (start <= 0) {
        // Progress goes from 0 to 1 as we scroll through the section
        const progress = Math.min(Math.max(-start / (scrollableDist + 100), 0), 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth Interpolation Logic (White to Black)
  // Replicating ProcessSection transition logic for consistency
  const colorFactor = Math.min(Math.max((scrollProgress - 0.1) / 0.5, 0), 1);
  const inverseFactor = 1 - colorFactor;
  
  // Background from White (255,255,255) to Black (0,0,0)
  const bgVal = inverseFactor * 255;
  const bgColor = `rgb(${bgVal}, ${bgVal}, ${bgVal})`;
  
  // Text from Black (0,0,0) to White (255,255,255)
  const textVal = colorFactor * 255;
  const textColor = `rgb(${textVal}, ${textVal}, ${textVal})`;

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full md:py-24 py-16 transition-colors duration-200 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <Container>

        {/* Section Badge with theme-aware colors */}
        <div className="mb-16">
          <SectionBadge 
            className="flex items-center gap-2 py-1.5 px-4 shadow-sm transition-colors! duration-200"
            style={{ 
              color: textColor, 
              borderColor: colorFactor > 0.5 ? '#00B4D8' : '#00B4D8',
              backgroundColor: colorFactor > 0.5 ? 'transparent' : 'white'
            }}
          >
            <span className="text-[#00B4D8] text-xl">★</span>
            Our Projects
          </SectionBadge>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="relative aspect-square rounded-[32px] overflow-hidden group transition-all duration-700 hover:-translate-y-3 shadow-xl">
              <Image
                src={`/images/projects/${project.image}`}
                alt={`Project ${project.id}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Tags Overlay */}
              <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-5 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-[11px] font-medium text-white tracking-tight"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section with theme-aware button */}
        <div className="mt-28 flex flex-col items-center">
          <div className="flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-200">
            <button className="flex items-center gap-6 group cursor-pointer transition-all duration-500">
              <div 
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 transform group-hover:rotate-45 ${
                  colorFactor > 0.5 ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
              <span 
                className="text-xl font-medium tracking-tight transition-colors duration-200" 
                style={{ color: textColor }}
              >
                View More
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
