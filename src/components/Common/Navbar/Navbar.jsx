'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Container from '../Container/Container';
import MenuOverlay from './MenuOverlay';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PROJECTS', href: '/projects' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT US', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Hide only when reaching the HeroSection end threshold (4vh)
      // but still track "isScrolled" for minor visual changes if needed
      if (window.scrollY > window.innerHeight * 4) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <nav
        className={`${isHome ? 'fixed top-0' : 'relative'} w-full z-40 transition-all duration-500 ${isScrolled
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 bg-black py-6'
          }`}
      >
        <Container>
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <Link href="/" className="group block focus:outline-none focus:ring-0 focus-visible:outline-none border-none no-underline outline-none select-none">
              <div className="relative w-28 h-8 sm:w-36 sm:h-12 md:w-44 md:h-16 overflow-visible pointer-events-none">
                <Image
                  src="/logo.svg"
                  alt="Next Media Logo"
                  fill
                  className="object-contain object-left transition-transform duration-500 group-hover:scale-[1.03] will-change-transform transform-gpu backface-hidden"
                  priority
                />
              </div>
            </Link>

            {/* Hamburger Menu Icon */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col justify-center items-end w-12 h-12 group cursor-pointer focus:outline-none"
              aria-label="Open Menu"
            >
              <div className="space-y-2.5">
                <span className="block w-10 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:-translate-y-1"></span>
                <span className="block w-10 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:opacity-70 group-hover:scale-x-90"></span>
                <span className="block w-10 h-[2px] bg-white transition-all duration-300 ease-in-out group-hover:translate-y-1"></span>
              </div>
            </button>
          </div>
        </Container>
      </nav>

      {/* Reusable Menu Overlay */}
      <MenuOverlay isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
}
