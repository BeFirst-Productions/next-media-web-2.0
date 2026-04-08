'use client';

import React, { useState } from 'react';
import Container from '../Common/Container/Container';

export default function ServiceSecondaryContent({ service }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!service) return null;

  const currentHighlight = service.highlights?.[activeIndex] || service.highlights?.[0];

  return (
    <section className="bg-black py-10 md:py-20 overflow-hidden">
      <Container>
        {/* Header Section */}
        <div className="mb-20 animate-fade-in-up">
          <h2 className="text-3xl md:text-[2rem] font-bold text-white mb-6 uppercase tracking-tight">
            {service.highlight} {service.titleSuffix}
          </h2>
          <p className="max-w-3xl text-base md:text-lg leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left Column: Interactive Highlights */}
          <div className="space-y-0 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            {service.highlights?.map((highlight, index) => (
              <button 
                key={index} 
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left py-8 border-t border-[#00B4D8] transition-all duration-500 group relative ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight group-hover:pl-4 transition-all duration-300">
                    {highlight.name}
                  </h3>
                  {/* Active Indicator Arrow */}
                  <div className={`transition-all duration-500 ${activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B4D8" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
            <div className="border-t border-[#00B4D8]"></div>
          </div>

          {/* Right Column: Dynamic Content based on Selection */}
          <div 
            key={activeIndex} // Key helps trigger animation on state change
            className="space-y-12 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
          >
            <div className="text-gray-300 text-lg leading-relaxed min-h-[100px]">
              <p>{currentHighlight?.content}</p>
            </div>

            {/* Bullet Points */}
            <div className="space-y-6">
              {currentHighlight?.features?.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-3 h-3 bg-[#00B4D8] rounded-full shadow-[0_0_10px_#00B4D8] transition-transform duration-300 group-hover:scale-125"></div>
                  <span className="text-white text-lg md:text-xl font-medium tracking-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
