import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../Common/Container/Container';
import SectionBadge from '../Common/SectionBadge/SectionBadge';
import { servicesData } from '../../data/ServiceData';

export default function ServicesDetailList() {
  return (
    <section className="bg-black py-10 md:py-20 ">
      <Container>
        {/* Header Section */}
        <div className="mb-16">
          <SectionBadge className="mb-6 flex items-center gap-2">
            <span className="text-[#00B4D8] text-lg">✦</span> Our Services
          </SectionBadge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"> Our Services </h2>
          <p className=" max-w-2xl leading-relaxed">
            We provide a comprehensive range of creative and digital marketing services that help your business scale and reach its full potential in an increasingly competitive digital landscape.
          </p>
        </div>

        {/* Services List Rendering */}
        <div className="flex flex-col gap-6">
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="group bg-[#f8fafc] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00B4D8]/10"
            >
              {/* Content Block */}
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-black tracking-tight">{service.highlight} {service.titleSuffix}</h3>
                <p className="text-black text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
                <Link href={`/services/${service.id}`} className="inline-block">
                  <button className="flex items-center gap-3 pt-2 text-black transition-opacity group/btn text-left">
                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                    <span className="text-base tracking-tight">View More</span>
                  </button>
                </Link>
              </div>

              {/* Image Block */}
              <div className="w-full md:w-[40%] aspect-video md:aspect-4/3 relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={service.heroImage}
                  alt={service.highlight}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
