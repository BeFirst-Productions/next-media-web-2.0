'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const testimonials = [
  {
    id: 1,
    text: "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan,",
    name: "Sarah Chen",
    role: "Project Manager",
    image: "/images/dummy/1.png"
  },
  {
    id: 2,
    text: "Working with Next Media has elevated our brand to new heights. Their creative vision and technical execution are truly world-class and inspiring.",
    name: "John Smith",
    role: "Marketing Director",
    image: "/images/dummy/2.png"
  },
  {
    id: 3,
    text: "The speed and quality of delivery surpassed all our expectations. They didn't just meet our requirements; they redefined what was possible for our digital presence.",
    name: "Alex Rivera",
    role: "Founding Partner",
    image: "/images/dummy/3.png"
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const progress = ((currentIndex + 1) / testimonials.length) * 100;

  return (
    <section className="relative w-full py-24 bg-black text-white overflow-hidden">
      <Container className="relative z-10">
        
        {/* Section Badge */}
        <div className="mb-24">
          <SectionBadge>
            <span className="text-[#00B4D8]! mr-2">★</span>
            Testimonials
          </SectionBadge>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl 2xl:max-w-6xl mx-auto relative px-4 md:px-0">
          
          {/* Top Row: Profile Stack and Counter */}
          <div className="flex justify-between items-center mb-10">
            {/* Profile Stack */}
            <div className="flex -space-x-4">
              {testimonials.map((t, i) => (
                <div 
                  key={t.id} 
                  className={`relative w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-[#111] transition-all duration-500 ${i === currentIndex ? 'ring-2 ring-[#00B4D8] z-20 scale-110' : 'opacity-70 z-10'}`}
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Counter */}
            <div className="text-xl md:text-2xl font-medium tracking-tighter">
              <span className="text-white">0{currentIndex + 1}</span>
              <span className="text-[#444] mx-1">/</span>
              <span className="text-[#444]">0{testimonials.length}</span>
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="min-h-[160px] md:min-h-[200px] mb-12">
            <p className="text-xl md:text-2xl md:text-3xl 2xl:text-4xl font-normal leading-tight tracking-tight text-white/90 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {currentTestimonial.text}
            </p>
          </div>

          {/* Author Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 mt-8">
            <div className="flex items-center space-x-6">
              {/* Profile Image with blue ring */}
              <div className="relative w-24 h-24 rounded-full p-[3px] border border-[#00B3FF]/30">
                 <div className="relative w-full h-full rounded-full border border-[#00B3FF] overflow-hidden">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>

              {/* Vertical Blue Separator and Info */}
              <div className="flex items-center space-x-6">
                <div className="w-[1.5px] h-12 bg-[#00B3FF]"></div>
                <div>
                  <h4 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm md:text-base text-[#888888] font-light tracking-wide mt-1">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <button 
              onClick={handleNext}
              className="group relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28"
            >
              <div className="absolute inset-0 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
              <span className="relative z-10 text-black font-bold tracking-widest text-xs uppercase">
                Next
              </span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute -bottom-12 left-0 w-full">
            <div className="relative w-full h-[1px] bg-[#333]">
               <div 
                 className="absolute top-0 left-0 h-full bg-[#00B3FF] transition-all duration-700 ease-out shadow-[0_0_8px_rgba(0,179,255,0.6)]"
                 style={{ width: `${progress}%` }}
               ></div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
