'use client';

import React from 'react';
import Image from 'next/image';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const projects = [
  { id: 1, image: 'noor-01.png', tags: ['Graphic Design', 'Branding'] },
  { id: 2, image: 'noor-02.png', tags: ['Development', 'Branding'] },
  { id: 3, image: 'adl.png', tags: ['Branding', 'Social Media'] },
  { id: 4, image: 'bizdoc.png', tags: ['UI UX Design', 'Development'] },
  { id: 5, image: 'naspixels.png', tags: ['Graphic Design', 'Branding'] },
  { id: 6, image: 'breeq-alqeeq.png', tags: ['Development', 'Branding'] },
  { id: 7, image: 'nexzone-01.png', tags: ['Development', 'Branding'] },
  { id: 8, image: 'next.png', tags: ['Development', 'Branding'] },
  { id: 9, image: 'nexzone-02.png', tags: ['Company Profile', 'Branding'] },
];

export default function ProjectSection() {
  return (
    <section className="relative w-full md:py-20 py-10 bg-white overflow-hidden">
      <Container>

        {/* Section Badge */}
        <div className="mb-16">
          <SectionBadge className="text-[#111111]! bg-white border-[#00B4D8]! flex items-center gap-2 py-1.5 px-4 shadow-sm">
            <span className="text-[#00B4D8] text-xl">★</span>
            Our Projects
          </SectionBadge>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="relative aspect-square rounded-3xl overflow-hidden group transition-all duration-500 hover:-translate-y-2">
              <Image
                src={`/images/projects/${project.image}`}
                alt={`Project ${project.id}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Tags Overlay */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-white/60 backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-black tracking-tight"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section with Transition and Button */}
        <div className="mt-24 flex flex-col items-center">
          {/* Split layout transition to black background */}
          <div className="w-[calc(100%+800px)] -ml-[400px]  py-20 flex flex-col items-center justify-center relative overflow-hidden">
            <button className="flex items-center gap-4 text-white group cursor-pointer transition-all duration-300">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black group-hover:bg-[#00B4D8] group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
              <span className="text-xl text-black font-medium tracking-tight">View More</span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
