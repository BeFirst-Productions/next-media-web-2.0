'use client';

import React from 'react';
import Container from '../Common/Container/Container';
import Image from 'next/image';
import SectionBadge from '../Common/SectionBadge/SectionBadge';

const FounderItem = ({ name, description, image, reverse = false }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${reverse ? 'md:flex-row-reverse' : ''} mb-24 md:mb-40 relative group`}>
      {/* Decorative Triangle Background with Floating Animation */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[300px] h-[300px] z-0 opacity-15 pointer-events-none transition-transform duration-1000 group-hover:scale-110 ${reverse ? 'right-0 md:-right-10' : 'left-0 md:-left-10'}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#00B4D8] fill-none stroke-current stroke-[1] animate-[pulse_6s_ease-in-out_infinite]">
          <path d="M50 5 L95 95 L5 95 Z" />
        </svg>
      </div>

      <div className="relative w-full md:w-3/12 aspect-square md:aspect-[4/5] rounded-[24px] md:rounded-[40px] overflow-hidden z-10 shadow-[0_0_50px_rgba(0,180,216,0.15)] group-hover:shadow-[0_0_80px_rgba(0,180,216,0.3)] transition-all duration-700">
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="flex flex-col space-y-8 w-full md:w-9/12 z-10 text-center md:text-left">
        <div className="flex flex-col space-y-4 w-fit">
          <h3 className="text-3xl md:text-5xl text-white tracking-tighter leading-none transition-colors group-hover:text-[#00B4D8]">
            {name}
          </h3>
          <div className="h-[2px] w-12 bg-[#00B4D8] origin-left group-hover:w-full transition-all duration-700"></div>
        </div>
        <p className="text-lg md:text-xl leading-relaxed font-light font-sans max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function AboutTeam() {
  const dummyText = "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.";

  const teamMembers = [
    {
      id: 1,
      name: 'SHAFIR',
      position: 'UI/UX Designer',
      image: '/images/about-us/team/shafir.png',
    },
    {
      id: 2,
      name: 'SARFAS',
      position: 'Graphic Designer',
      image: '/images/about-us/team/sarfas.png',
    },
    {
      id: 6,
      name: 'DIYA',
      position: 'Graphic Designer',
      image: '/images/about-us/team/diya.png',
    },
    {
      id: 3,
      name: 'DASARATH',
      position: 'Full-Stack Developer',
      image: '/images/about-us/team/dasarath.png',
    },
    {
      id: 5,
      name: 'ARJUN',
      position: 'Full-Stack Developer',
      image: '/images/about-us/team/arjun.png',
    },
    {
      id: 4,
      name: 'NAZMAL',
      position: 'Social Media Expert',
      image: '/images/about-us/team/nazmal.png',
    },
    {
      id: 7,
      name: 'DIYA KRISHNA',
      position: 'Digital Marketing Executive',
      image: '/images/about-us/team/diya-krishna.png',
    },
    {
      id: 8,
      name: 'Sana',
      position: 'Seo Expert',
      image: '/images/about-us/team/sana.png',
    }
  ];

  return (
    <section className="bg-black py-20 md:py-32 overflow-hidden relative border-t border-white/5">
      {/* Background Ambient Blobs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#00B4D8] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[#00B4D8] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>

      <Container>
        {/* Founders Header */}
        <div className="flex justify-center mb-20 md:mb-32">
          <SectionBadge>
            <div className="flex items-center space-x-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.261L12 19.451l-7.416 3.847L6 15.27 0 9.423l8.332-1.268L12 .587z"/>
              </svg>
              <span>Our Founders</span>
            </div>
          </SectionBadge>
        </div>

        {/* Founders Staggered Layout */}
        <div className="relative mb-40 md:mb-56">
          <FounderItem 
            name="Mr. Rasheeq Abdurahiman"
            description="Founder of Next Media, Mr. Rasheeq is a passionate graphic designer and social media marketing specialist with a strong entrepreneurial spirit. A serial entrepreneur, he also leads successful ventures including Invest First, Befirst Enterprises, Befirst HR, and Be Your Brand. With his expertise in branding, marketing, and business strategy, Rasheeq brings vision and creativity to every project, driving Next Media's mission to redefine branding and digital experiences."
            image="/images/about-us/rasheeq.jpg"
          />
          <FounderItem 
            name="Mr. Mohammed Anas"
            description="Co-founder of Next Media, Mr. Mohammed Anas is a seasoned IT and networking specialist with a deep passion for digital marketing, media production, and web development. Having worked with several prestigious companies in Dubai, Anas combines his technical expertise with creative flair to deliver innovative solutions. His dedication to blending technology with creativity plays a key role in shaping Next Media into a full-fledged creative powerhouse."
            image="/images/about-us/anas.jpg"
            reverse={true}
          />
        </div>

        {/* Team Section */}
        <div className="flex flex-col space-y-12 md:space-y-16">
          <div className="flex justify-between items-end gap-6 flex-wrap">
            <div className="flex flex-col items-start space-y-4">
              <SectionBadge>
                <div className="flex items-center space-x-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.261L12 19.451l-7.416 3.847L6 15.27 0 9.423l8.332-1.268L12 .587z"/>
                  </svg>
                  <span>Our Team</span>
                </div>
              </SectionBadge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14">
            {teamMembers.map((member, idx) => (
              <div 
                key={member.id} 
                className="flex flex-col space-y-6 group cursor-pointer"
                style={{ 
                  animation: `fade-in-up 1s ease-out forwards ${idx * 0.1}s`,
                  opacity: 0 
                }}
              >
                <div className="relative aspect-3/4 w-full rounded-[24px] md:rounded-[40px] overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-[#00B4D8]/50 group-hover:translate-y-[-10px] shadow-xl">
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-100"
                  />
                  {/* Glassmorphic Role Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm">
                    <p className="text-[#00B4D8] text-xs uppercase font-black tracking-[0.2em] mb-1">{member.position}</p>
                    <h4 className="text-white font-bold text-lg leading-tight">{member.name}</h4>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 group-hover:opacity-0 transition-opacity duration-300">
                  <h4 className="text-white font-bold text-xl tracking-tight leading-tight">{member.name}</h4>
                  <p className=" text-sm font-medium uppercase tracking-widest">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
