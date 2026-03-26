'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../Container/Container';
import MenuOverlay from './MenuOverlay';

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Works', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only after the HeroSection's scroll distance (4vh)
      const threshold = window.innerHeight * 4;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Floating Bottom Navbar */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-100 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="bg-[#EDEDEDB3]/70 backdrop-blur-xl border border-white/20 px-3 py-2 rounded-[30px] shadow-2xl flex items-center space-x-6 sm:space-x-10 min-w-[320px] sm:min-w-[500px]">
          
          {/* Logo in Black Box */}
          <Link href="/" className="bg-black rounded-[22px] p-2 sm:px-4 sm:py-2.5 flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300">
            <div className="relative w-16 h-6 sm:w-20 sm:h-7">
              <Image 
                src="/logo.svg" 
                alt="Logo" 
                fill 
                className="object-contain filter brightness-200"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-black/80 hover:text-black font-medium text-base transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Flexible Spacer */}
          <div className="flex-1"></div>

          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col justify-center space-y-1.5 pr-2 sm:pr-4 group"
            aria-label="Open Menu"
          >
            <span className="block w-8 h-[2px] bg-black rounded-full transition-all group-hover:w-6"></span>
            <span className="block w-8 h-[2px] bg-black rounded-full"></span>
            <span className="block w-8 h-[2px] bg-black rounded-full transition-all group-hover:w-6"></span>
          </button>
        </div>
      </div>

      {/* Reusable Menu Overlay - Expanding from bottom */}
      <MenuOverlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} origin="bottom" />
    </>
  );
}
