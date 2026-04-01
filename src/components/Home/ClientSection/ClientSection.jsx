'use client';

import React from 'react';
import Image from 'next/image';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const logos = [
  'ADL-Business.png',
  'AL-ADEED-BUSINESS-GROUP.png',
  'ASCENTAM.png',
  'B&B.png',
  'Cybotech.png',
  'EWF.png',
  'Invest-first.png',
  'NAS PIXELS.png',
  'NEXZONE.png',
  'NOORA.png',
  'adams-aurum.png',
  'bizdoc.png',
  'breeq-alqeeq.png',
  'business-first.png',
  'elevate.png',
  'emirates.png',
  'hayat.png',
  'kozhicode restaurant.png',
  'net-express.png',
  'shay-al-karam.png',
  'smash.png',
  'xavier.png'
];

// Split logos into two rows
const row1Logos = logos.slice(0, 11);
const row2Logos = logos.slice(11, 22);

export default function ClientSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        {/* Section Header Badge */}
        <SectionBadge className="mb-12 text-[#111111]! bg-white! border-[#00B3FF]! flex items-center gap-2 py-1.5 px-4 shadow-sm">
          <span className="text-[#00B4D8] text-xl">★</span>
          Our Clients
        </SectionBadge>
      </Container>

      {/* Slider Row 1 - Moves Left */}
      <div className="relative mb-8 pt-2">
        <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] gap-6">
          {[...row1Logos, ...row1Logos].map((logo, index) => (
            <div key={index} className="shrink-0 w-[180px] h-[100px] md:w-[240px] md:h-[135px] border border-[#00B3FF] rounded-xl flex items-center justify-center p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full h-full">
                <Image
                  src={`/images/logos/${logo}`}
                  alt={`Client Logo ${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Row 2 - Moves Right */}
      <div className="relative pt-2">
        <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] gap-6">
          {[...row2Logos, ...row2Logos].map((logo, index) => (
            <div key={index} className="shrink-0 w-[180px] h-[100px] md:w-[240px] md:h-[135px] border border-[#00B3FF] rounded-xl flex items-center justify-center p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative w-full h-full">
                <Image
                  src={`/images/logos/${logo}`}
                  alt={`Client Logo ${index}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
