'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '../Common/Container/Container';
import { projects } from '../../data/ProjectData';

export default function ProjectListing() {
  const [isWhite, setIsWhite] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjusted threshold to trigger earlier (0.8vh instead of 1.8vh)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsWhite(true);
      } else {
        setIsWhite(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`min-h-screen pt-24 pb-32 overflow-hidden transition-colors duration-1000 ${
      isWhite ? 'bg-white text-black' : 'bg-black text-white'
    }`}>
      <Container>
        {/* Massive Header inspired by image */}
        <div className="mb-24 flex items-start gap-4">
          <h1 className={`text-4xl md:text-5xl tracking-tighter uppercase leading-none transition-colors duration-1000 ${
            isWhite ? 'text-black' : 'text-white'
          }`}>
            Gorem ipsum <span className="text-[#2bc5ee]">doloretiam</span> sit amet
            <span className="ml-4 inline-flex items-center">
              <svg 
                width="27" 
                height="25" 
                viewBox="0 0 27 25" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 md:w-11 md:h-11  transition-colors duration-1000"
              >
                <path 
                  fillRule="evenodd" 
                  clipRule="evenodd" 
                  d="M0.514922 6.05523C-0.773929 4.13911 0.494769 1.54587 2.79847 1.38744L22.909 0.00743464C25.2129 -0.150695 26.8242 2.24472 25.8091 4.31909L16.9494 22.4255C15.9342 24.4995 13.054 24.6969 11.7652 22.7808L0.514922 6.05523ZM5.33361 2.62805C3.02986 2.78628 1.76099 5.37887 3.04952 7.29504L11.5718 19.965C12.8607 21.8812 15.741 21.6839 16.7561 19.6097L23.4673 5.89427C24.4824 3.8199 22.8711 1.42448 20.5672 1.58261L5.33361 2.62805Z" 
                  fill="#29ABE2"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <div key={project.id} className="group relative">
              {/* Image Card Container */}
              <div 
                className={`relative aspect-[4/3.2] rounded-[2.5rem] overflow-hidden mb-6 border transition-all duration-700 hover:-translate-y-2 shadow-2xl ${
                  isWhite 
                    ? 'border-black/5 bg-[#f5f5f5]' 
                    : 'border-white/5 bg-[#0a0a0a]'
                }`}
              >
                <Image
                  src={`/images/projects/${project.image}`}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Visual Glassmorphism Tags Over Image */}
                <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`px-4 py-1.5 backdrop-blur-xl border rounded-full text-[10px] md:text-base tracking-tight uppercase shadow-lg transition-all duration-700 ${
                      
                           'bg-white/10 border-white/20 text-white'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Minimal Project Title */}
              <div className="pl-4">
                <h3 className={`text-base md:text-lg font-medium transition-colors duration-700 tracking-tight group-hover:text-[#2bc5ee] ${
                  isWhite ? 'text-black' : 'text-white'
                }`}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
