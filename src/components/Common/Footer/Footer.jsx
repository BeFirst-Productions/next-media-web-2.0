'use client';

import React, { useState, useRef, useEffect } from 'react';
import Container from '../Container/Container';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [mousePos, setMousePos] = useState({ x: 400, y: 70 });
  const [isHovered, setIsHovered] = useState(false);
  const [circleRadius, setCircleRadius] = useState(180);
  const containerRef = useRef(null);

  const targetPos = useRef({ x: 400, y: 70 });
  const rafRef = useRef(null);

  const setRestPos = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPos.current = { x: rect.width - 150, y: rect.height / 2 };
    }
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  useEffect(() => {
    const handleResize = () => {
      setCircleRadius(
        window.innerWidth < 768 ? 60 :
          window.innerWidth < 1280 ? 100 : 140
      );
      setRestPos();
    };

    const updateSmoothPos = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.1,
        y: prev.y + (targetPos.current.y - prev.y) * 0.1
      }));
      rafRef.current = requestAnimationFrame(updateSmoothPos);
    };

    handleResize();
    rafRef.current = requestAnimationFrame(updateSmoothPos);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <footer className="relative w-full bg-black text-white pt-16 pb-28 md:pb-40 overflow-hidden border-t border-[#00A3FF]">

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-8 md:mb-2 ">

          {/* Left Block: Heading & Newsletter */}
          <div className="md:col-span-6">
            <h3 className="text-4xl md:text-[2.5rem] font-bold tracking-tighter mb-12 max-w-lg leading-tight uppercase">
              Stay Updated with <br /> Our Latest Insights
            </h3>

            <div className="relative w-full max-w-md">
              <div className="relative flex items-center p-1 md:p-1.5 bg-[#141414] rounded-2xl border border-white/5 overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="bg-transparent border-none outline-none flex-grow px-3 md:px-6 py-2.5 md:py-3 text-xs md:text-sm text-white placeholder:text-[#444] min-w-0"
                />
                <button className="whitespace-nowrap px-4 md:px-8 py-2 md:py-3 bg-[#29ABE2] hover:bg-[#0094d4] transition-all rounded-xl text-white text-[10px] md:text-xs font-bold uppercase tracking-wider shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Middle: Explore */}
          <div className="md:col-span-2 flex flex-col space-y-6">
            <h4 className="text-lg font-bold tracking-tight uppercase border-b border-white/10 pb-2 md:border-none">Explore</h4>
            <nav className="flex flex-col space-y-3">
              {['Home', 'About Us', 'Services', 'Blogs', 'Faq'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-[#00A3FF] transition-colors text-base font-light opacity-90">
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Connect */}
          <div className="md:col-span-4 flex flex-col space-y-8 md:space-y-12">
            <div className="flex flex-col space-y-6">
              <h4 className="text-lg font-bold tracking-tight uppercase border-b border-white/10 pb-2 md:border-none">Connect</h4>
              <div className="flex flex-col space-y-4">
                <a href="tel:+971525162071" className="flex items-center space-x-3 text-white hover:text-[#00A3FF] transition-colors group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-80"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
                  <span className="text-base font-medium">+971 52 516 2071</span>
                </a>
                <a href="mailto:info.nextdms@gmail.com" className="flex items-center space-x-3 text-white hover:text-[#00A3FF] transition-colors group">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-80"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  <span className="text-base font-light">info.nextdms@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Social Icons: Row on mobile, Column on desktop */}
            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-5 self-start md:self-end pr-0 md:pr-4">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[#2bc5ee] flex items-center justify-center hover:bg-[#2bc5ee] text-white hover:text-white transition-all">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[#2bc5ee] flex items-center justify-center hover:bg-[#2bc5ee] text-white hover:text-white transition-all">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[#2bc5ee] flex items-center justify-center hover:bg-[#2bc5ee] text-white hover:text-white transition-all">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Interactive Spotlight Logo */}
        <div className="pt-12 -mt-12 md:-mt-20 border-t border-white/5 flex flex-col md:flex-row items-center md:items-end justify-between gap-12 md:gap-8">

          {/* Logo with Spotlight/Lens Effect */}
          <div
            ref={containerRef}
            className="relative w-full max-w-[320px] md:w-[40vw] md:min-w-[500px] lg:w-[60vw] lg:min-w-[700px] xl:w-[65vw] xl:min-w-[850px] h-[100px] md:h-[18vw] md:min-h-[240px] lg:h-[16vw] lg:min-h-[280px] xl:h-[16vw] xl:min-h-[350px] group overflow-hidden md:-ml-8 lg:-ml-10"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setRestPos(); }}
          >
            {/* Lit Logo Layer */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                maskImage: `linear-gradient(to right, transparent, black 20%, black 80%, transparent)`,
                WebkitMaskImage: `linear-gradient(to right, transparent, black 20%, black 80%, transparent)`,
                maskSize: `${circleRadius * 4}px 100%`,
                WebkitMaskSize: `${circleRadius * 4}px 100%`,
                maskPosition: `${mousePos.x - circleRadius * 2}px 0`,
                WebkitMaskPosition: `${mousePos.x - circleRadius * 2}px 0`,
                maskRepeat: 'no-repeat'
              }}
            >
              <Image
                src="/footer-logo.svg"
                alt="Next Media"
                fill
                className="object-contain object-left drop-shadow-[0_0_30px_rgba(41,171,226,0.6)]"
              />
            </div>

          </div>

          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right pb-4 w-full md:w-auto">
            <div className="flex items-center gap-4 text-sm font-medium text-white/90">
              <Link href="/privacy" className="hover:text-[#00A3FF]">Privacy Policy</Link>
              <span className="opacity-30">|</span>
              <Link href="/career" className="hover:text-[#00A3FF]">Career</Link>
              <span className="opacity-30">|</span>
              <Link href="/terms" className="hover:text-[#00A3FF]">Terms of service</Link>
            </div>
            <div className="text-xs   mt-2">
              © 2025 Next Digital Marketing. All rights reserved.
            </div>
          </div>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;
