'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Container from '../Container/Container';

export default function MenuOverlay({ isMenuOpen, setIsMenuOpen, origin = 'top-right' }) {
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  // Logic for expansion origin
  const expansionStyles = {
    'top-right': {
      clipPath: isMenuOpen ? 'circle(200% at top right)' : 'circle(0% at top right)',
      rounding: 'rounded-bl-[50px] lg:rounded-bl-[90px]'
    },
    'bottom': {
      clipPath: isMenuOpen ? 'circle(200% at bottom center)' : 'circle(0% at bottom center)',
      rounding: 'rounded-t-[50px] lg:rounded-t-[90px]'
    }
  }[origin] || {
    clipPath: isMenuOpen ? 'circle(200% at top right)' : 'circle(0% at top right)',
    rounding: 'rounded-bl-[50px] lg:rounded-bl-[90px]'
  };

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 w-[96vw] lg:w-[94vw] z-200 bg-white ${expansionStyles.rounding} overflow-hidden transition-all duration-2000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isMenuOpen ? 'opacity-100 pointer-events-auto shadow-[-20px_0_100px_rgba(0,0,0,0.5)]' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        clipPath: expansionStyles.clipPath
      }}
    >
      <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
        {/* Header area for Close Button */}
        <Container className="pt-8 sm:pt-12 pb-4 shrink-0">
          <div className="flex justify-end pr-2 sm:pr-4">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="group flex justify-center items-center w-14 h-14 rounded-full transition-colors duration-300 focus:outline-none"
              aria-label="Close Menu"
            >
              <span className="text-black text-4xl sm:text-5xl font-light transform transition-transform duration-500 group-hover:rotate-90">
                X
              </span>
            </button>
          </div>
        </Container>

        {/* Menu Content Area */}
        <Container className="flex-1 flex flex-col justify-center pb-12 sm:pb-16 mt-4 sm:mt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full h-full gap-12 lg:gap-8">

            {/* Left Nav List */}
            <div className="w-full lg:w-[45%] flex flex-col items-start space-y-6 sm:space-y-8 lg:space-y-10 pl-2 sm:pl-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-[28px] sm:text-4xl lg:text-[40px] xl:text-[48px] font-medium tracking-wide transition-colors duration-300 ${link.name === 'SERVICES'
                    ? 'text-[#2bc5ee] hover:text-[#20abca]'
                    : 'text-[#111111] hover:text-[#2bc5ee]'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Image Container */}
            <div className="w-full lg:w-[55%] flex justify-center lg:justify-end px-4 lg:px-0 mt-8 lg:mt-0 max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] h-full overflow-hidden">
              <div className="relative w-full aspect-4/3 lg:aspect-auto lg:w-[90%] lg:h-full rounded-[24px] overflow-hidden shadow-2xl transition-transform duration-[1.2s] ease-out origin-center">
                <img
                  src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop"
                  alt="Developer working at night"
                  className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${isMenuOpen ? 'scale-100 rotate-0 filter-none opacity-100' : 'scale-110 blur-sm opacity-50'
                    }`}
                />
              </div>
            </div>

          </div>
        </Container>

        {/* Bottom Divider Line */}
        <Container className="shrink-0 mb-4 sm:mb-6 lg:mb-8">
          <div className="w-full h-[1.5px] bg-[#2bc5ee]"></div>
        </Container>

        {/* Contact Details Footer */}
        <Container className="shrink-0 pb-8 sm:pb-12 lg:pb-16 mt-2">
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-black space-y-6 md:space-y-0 text-sm md:text-base lg:text-lg font-medium">
            
            {/* Mail */}
            <a href="mailto:info.nextdms@gmail.com" className="flex items-center space-x-3 hover:text-[#2bc5ee] transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2bc5ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>info.nextdms@gmail.com</span>
            </a>

            {/* Phone */}
            <a href="tel:+971525162071" className="flex items-center space-x-3 hover:text-[#2bc5ee] transition-colors xl:-ml-12">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2bc5ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+971 52 516 2071</span>
            </a>

            {/* Socials */}
            <div className="flex items-center space-x-4 lg:space-x-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[#2bc5ee] flex items-center justify-center hover:bg-[#2bc5ee] hover:text-white transition-colors text-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[#2bc5ee] flex items-center justify-center hover:bg-[#2bc5ee] hover:text-white transition-colors text-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[#2bc5ee] flex items-center justify-center hover:bg-[#2bc5ee] hover:text-white transition-colors text-black">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
