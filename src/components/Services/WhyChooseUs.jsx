'use client';

import React from 'react';
import Container from '../Common/Container/Container';

const reasons = [
  {
    title: "Expertise & Innovation",
    description: "We combine years of industry expertise with the latest technological innovations to deliver cutting-edge solutions for your business."
  },
  {
    title: "Strategic Approach",
    description: "Our data-driven strategies ensure that every move we make is calculated to maximize your return on investment and long-term growth."
  },
  {
    title: "Dedicated Support",
    description: "We pride ourselves on providing exceptional, round-the-clock support to ensure your projects run smoothly and your goals are met."
  },
  {
    title: "Measurable Results",
    description: "We focus on key performance indicators and tangible outcomes, providing transparent reporting so you can see the real impact of our work."
  },
  {
    title: "Creative Excellence",
    description: "Our award-winning creative team pushes boundaries to ensure your brand stands out in a crowded digital marketplace with unique visuals."
  },
  {
    title: "Client-Centric Focus",
    description: "Your success is our priority. We take the time to understand your unique challenges and tailor our solutions to your specific needs."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black py-10 md:py-20">
      <Container>
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-20">
          <div>
            <div className="inline-block px-6 py-2 border border-[#00B4D8] rounded-full text-sm font-semibold text-white tracking-wide">
              Why Choose Us
            </div>
          </div>
          <div className="md:max-w-xl">
            <p className=" text-sm md:text-base leading-relaxed">
              We are dedicated to providing the highest quality digital services that combine creativity, technology, and strategy to help your business thrive in the modern landscape. Our commitment to excellence drives everything we do.
            </p>
          </div>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-black border border-[#00B4D8]/30 rounded-2xl p-8 hover:border-[#00B4D8] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-white rounded-full shrink-0 flex items-center justify-center">
                  {/* Icon Placeholder - Small Star/Dot */}
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </div>
                <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-[#00B4D8] transition-colors">
                  {reason.title}
                </h3>
              </div>
              <p className=" text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
