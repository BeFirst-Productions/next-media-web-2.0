"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../Common/Container/Container';
import SectionBadge from '../Common/SectionBadge/SectionBadge';
import { servicesData } from '../../data/ServiceData';

export default function ServicesDetailList() {
  const [stickyTop, setStickyTop] = React.useState(300);

  React.useEffect(() => {
    const handleResize = () => {
      setStickyTop(window.innerWidth < 768 ? 100 : 300);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="bg-black py-10 md:pt-20 md:pb-[40vh]">
      <Container>
        {/* Header Section */}
        <div className="md:sticky md:top-10 z-0 mb-12 md:mb-20">
          <SectionBadge className="mb-4 flex items-center gap-2">
            <span className="text-[#00B4D8] text-lg">✦</span> Our Services
          </SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-normal"> Our Services </h2>
          <p className="max-w-2xl text-white/70 text-base md:text-lg leading-relaxed">
            We provide a comprehensive range of creative and digital marketing services that help your business scale and reach its full potential.
          </p>
        </div>

        {/* Services List Rendering */}
        <div className="flex flex-col relative">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="sticky group bg-[#f5f5f7] rounded-[32px] md:rounded-[40px] p-5 md:py-8 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-16 border border-black/5 transition-all duration-500 hover:shadow-2xl mb-12"
              style={{
                top: `${index * 12 + stickyTop}px`,
                zIndex: index + 1,
                boxShadow: `0 ${(index + 1) * 8}px ${(index + 1) * 32}px -16px rgba(0,0,0,0.2)`
              }}
            >
              {/* Content Block */}
              <div className="flex-1 space-y-3 md:space-y-6">
                <div className="space-y-0.5 md:space-y-1">
                  <span className="text-[#00B4D8] font-mono text-[10px] md:text-xs tracking-widest uppercase">Service 0{index + 1}</span>
                  <h3 className="text-xl md:text-3xl font-bold text-black tracking-tight leading-tight">
                    {service.highlight} <br className="hidden md:block"/>
                    <span className="text-black/40 font-medium">{service.titleSuffix}</span>
                  </h3>
                </div>

                <p className="text-black/70 text-sm md:text-base leading-relaxed max-w-lg line-clamp-2 md:line-clamp-3">
                  {service.description}
                </p>

                <Link href={`/services/${service.id}`} className="inline-block group/link">
                  <div className="flex items-center gap-2 bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 hover:bg-[#00B4D8] hover:pr-8 translate-y-2 md:translate-y-0">
                    <span className="text-sm md:text-base font-medium">Explore More</span>
                    <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center transition-transform duration-300 group-hover/link:translate-x-2">
                      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Image Block */}
              <div className="w-full md:w-[38%] h-[160px] md:h-[280px] relative rounded-[20px] md:rounded-[30px] overflow-hidden shadow-xl">
                <Image
                  src={service.heroImage}
                  alt={service.highlight}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
