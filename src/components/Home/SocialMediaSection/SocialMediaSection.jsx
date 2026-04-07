'use client';

import React from 'react';
import Image from 'next/image';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const posters = [
  { id: 1, image: 'poster1.png', text: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' },
  { id: 2, image: 'poster2.png', text: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' },
  { id: 3, image: 'poster3.png', text: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' },
  { id: 4, image: 'poster4.png', text: 'Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam' },
];

export default function SocialMediaSection() {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden font-sans">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        {/* Section Badge */}
        <div className="mb-20">
          <SectionBadge>
            <span className="text-[#00B4D8] mr-2">★</span>
            Social Media
          </SectionBadge>
        </div>
      </Container>

      {/* Marquee Slider */}
      <div className="relative w-full flex overflow-hidden">
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] gap-8 px-4">
          {/* Multiply items for seamless loop */}
          {[...posters, ...posters, ...posters, ...posters].map((poster, index) => (
            <div 
              key={index} 
              className="shrink-0 w-[300px] md:w-[380px] bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-white/10 group flex flex-col"
            >
              {/* Poster Image */}
              <div className="relative aspect-square w-full">
                <Image
                  src={`/images/social-media/${poster.image}`}
                  alt={`Next Media Social Media ${poster.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 300px, 380px"
                />
              </div>

              {/* Card Footer Content */}
              <div className="p-8 relative grow bg-[#111111]">
                <p className="text-white/70 text-base md:text-lg font-light leading-relaxed mb-4">
                  {poster.text}
                </p>
                
                {/* Visual Accent: Blue Bottom Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#00B4D8] shadow-[0_-2px_15px_rgba(0,180,216,0.3)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
