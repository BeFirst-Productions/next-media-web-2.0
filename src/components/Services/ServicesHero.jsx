'use client';

import React from 'react';
import Image from 'next/image';
import Container from '../Common/Container/Container';

export default function ServicesHero({ 
  title = "Crafting Future", 
  highlight = "Experiences", 
  titleSuffix = "That Matter",
  heroImage = "/images/services/hero_bg.png",
  altText = "Our Services Workspace"
}) {
  return (
    <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-32 bg-black overflow-hidden">
      <Container>
        <div className="flex flex-col ">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-semibold text-white text-center mb-16 tracking-tight leading-tight max-w-5xl animate-fade-in-up">
            {title} <span className="text-[#00B4D8]">{highlight}</span> {titleSuffix}
            <span className="inline-block ml-4 align-middle">
              <svg width="32" height="42" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.514922 6.05523C-0.773929 4.13911 0.494769 1.54587 2.79847 1.38744L22.909 0.00743464C25.2129 -0.150695 26.8242 2.24472 25.8091 4.31909L16.9494 22.4255C15.9342 24.4995 13.054 24.6969 11.7652 22.7808L0.514922 6.05523ZM5.33361 2.62805C3.02986 2.78628 1.76099 5.37887 3.04952 7.29504L11.5718 19.965C12.8607 21.8812 15.741 21.6839 16.7561 19.6097L23.4673 5.89427C24.4824 3.8199 22.8711 1.42448 20.5672 1.58261L5.33361 2.62805Z" fill="#29ABE2"/>
              </svg>
            </span>
          </h1>

          {/* Hero Image */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden group shadow-2xl border border-white/10 animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            <Image
              src={heroImage}
              alt={altText}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Subtle Overlay to match the premium vibe */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          </div>
        </div>
      </Container>
    </section>
  );
}
