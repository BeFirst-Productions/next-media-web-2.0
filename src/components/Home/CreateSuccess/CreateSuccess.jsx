'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function CreateSuccess() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Reveal Observer
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.15 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Smooth Parallax Scroll Effect
    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        // Calculate offset based on scroll position relative to viewport
        setOffsetY((window.innerHeight - top) * 0.15);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-[90vh] md:min-h-screen bg-[#ffffff] flex flex-col justify-end items-center overflow-hidden"
    >
      {/* Top soft blue gradient glow matching the wave from above section */}
      <div className="absolute top-0 left-0 w-full h-[10vh] md:h-[20vh] bg-linear-to-b from-[#1E86CA]/20 via-[#1E86CA]/5 to-transparent pointer-events-none z-40" />

      {/* Massive Background Text Layer */}
      <div 
        className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10
          transition-all duration-1000 delay-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
        style={{
          transform: isVisible ? `translateY(${-offsetY * 0.15 - 50}px) scale(1)` : undefined,
        }}
      >
        <h1 className="text-center font-black uppercase text-[#E8E8E8] tracking-tighter leading-[0.85] text-[100px] md:text-[220px]">
          Let&apos;s<br />Create<br />Success
        </h1>
      </div>

      {/* The skyline image layer strictly scaled to intrinsic aspect ratio, pushed to the bottom */}
      <div 
        className={`relative w-full max-w-[1920px] mx-auto mt-auto pointer-events-none z-20
          transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]
          ${isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.96] translate-y-16 blur-xs'}`}
        style={{
          transform: isVisible ? `translateY(${-offsetY * 0.3}px) scale(1)` : undefined,
        }}
      >
        <Image
          src="/images/success-image-scaled.webp"
          alt="Create Success Skyline"
          width={1920}
          height={800} /* General ultra-wide aspect ratio for a skyline */
          className="w-full h-auto object-bottom"
          style={{ animation: 'breathe 8s ease-in-out infinite alternate', transformOrigin: 'bottom center' }}
          sizes="100vw"
          priority
        />
      </div>

      {/* Layered Seamless Scrolling Fog Animations */}
      {isVisible && (
        <div 
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden" 
          style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)' }}
        >
          {/* Back Fog Layer (Slow floating) */}
          <div className="absolute bottom-0 left-0 w-full h-full opacity-50"
               style={{
                 backgroundImage: 'radial-gradient(ellipse 800px 600px at 30% 90%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 65%), radial-gradient(ellipse 700px 500px at 80% 85%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 65%)',
                 backgroundSize: '1600px 100%',
                 backgroundRepeat: 'repeat-x',
                 animation: 'panFogSlow 50s linear infinite, floatFog 12s ease-in-out infinite alternate',
               }}
          />

          {/* Middle Fog Layer (Medium floating) */}
          <div className="absolute bottom-[-10%] left-0 w-full h-[90%] opacity-70"
               style={{
                 backgroundImage: 'radial-gradient(ellipse 900px 400px at 50% 95%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 600px 350px at 10% 85%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
                 backgroundSize: '1800px 100%',
                 backgroundRepeat: 'repeat-x',
                 animation: 'panFogMedium 35s linear infinite',
               }}
          />

          {/* Front Fog Thick Layer (Fast rolling) */}
          <div className="absolute bottom-[-20%] left-0 w-full h-[70%] opacity-100"
               style={{
                 backgroundImage: 'radial-gradient(ellipse 1000px 300px at 20% 90%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%), radial-gradient(ellipse 900px 350px at 70% 80%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)',
                 backgroundSize: '1400px 100%',
                 backgroundRepeat: 'repeat-x',
                 animation: 'panFogFast 20s linear infinite, floatFog 8s ease-in-out infinite alternate-reverse',
               }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes breathe {
          0% { transform: scale(1) translateY(0); }
          100% { transform: scale(1.02) translateY(-1%); }
        }
        @keyframes panFogSlow {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1600px; }
        }
        @keyframes panFogMedium {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1800px; }
        }
        @keyframes panFogFast {
          0% { background-position-x: 0px; }
          100% { background-position-x: 1400px; }
        }
        @keyframes floatFog {
          0% { transform: translateY(0); }
          100% { transform: translateY(-30px); }
        }
      `}</style>
    </section>
  );
}
