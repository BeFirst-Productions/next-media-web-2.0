  'use client';

import React, { useState } from 'react';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const faqs = [
  {
    id: 1,
    question: "What is Next Media and what does it do as a creative agency in Dubai?",
    answer: "Next Media is a leading creative agency in Dubai that helps businesses grow through branding, web design, videography, and digital marketing. Founded by a graphic designer and digital marketing specialist alongside an IT professional, the agency blends creative storytelling with technology to deliver campaigns that engage audiences and drive measurable results across the UAE and GCC."
  },
  {
    id: 2,
    question: "Why should I choose a branding agency in Dubai like Next Media?",
    answer: "Partnering with a branding agency in Dubai gives your business a competitive edge in one of the world's fastest-growing markets. Next Media crafts brand identities that resonate locally and internationally combining logo design, visual guidelines, messaging strategy, and digital presence."
  },
  {
    id: 3,
    question: "What branding services does Next Media provide?",
    answer: "As a full-service branding agency in Dubai, Next Media offers brand identity design, logo creation, visual brand guidelines, creative campaign development, and brand strategy consulting."
  },
  {
    id: 4,
    question: "Is Next Media a social media marketing company in Dubai?",
    answer: "Yes. Next Media is a social media marketing company in Dubai offering end-to-end social media solutions from strategy and content creation to publishing and performance analysis. The team produces platform-native content for Instagram, LinkedIn, TikTok, and more, helping brands build engaged communities and convert followers into customers."
  },
  {
    id: 5,
    question: "What social media marketing services does Next Media offer in Dubai?",
    answer: "Next Media's social media marketing services in Dubai include social media strategy, content calendars, graphic design, short-form video and reels production, caption writing, hashtag research, paid social advertising, and monthly performance reporting. Every campaign is tailored to your brand voice and audience to maximise reach and engagement."
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative w-full py-10 md:py-20 bg-black text-white overflow-hidden">
      {/* Background Decor */}
      {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" /> */}

      <Container>
        
        {/* Section Badge */}
        <div className="mb-10">
          <SectionBadge>
            <span className="text-[#00B4D8] mr-2">✦</span>
            FAQ
          </SectionBadge>
        </div>

        {/* Header Text */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-light leading-[1.1] tracking-tight text-white">
            Quick answers to help you <br />
            <span className="">understand how we create and grow brands.</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="grid grid-cols-1 gap-5 max-w-6xl  mx-auto">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`group relative flex bg-[#1A1A1A] backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-500 rounded-2xl overflow-hidden cursor-pointer ${
                  isActive ? 'bg-[#1A1A1A] border-[#00B4D8]/30 shadow-[0_20px_50px_rgba(0,180,216,0.1)]' : ''
                }`}
                onClick={() => toggleFaq(index)}
              >
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#00B4D8] to-blue-600 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-100'}`} />
                
                <div className="flex-1 px-8 py-5 md:py-6">
                  <div className="flex justify-between items-center gap-6">
                    <h3 className={`text-base md:text-lg  2xl:text-xl font-medium tracking-wide transition-colors duration-300 ${isActive ? 'text-white' : 'text-white group-hover:text-white'}`}>
                      {faq.question}
                    </h3>
                    
                    {/* Plus Icon with Circle Backdrop */}
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 shrink-0 ${
                      isActive ? 'bg-[#00B4D8] border-[#00B4D8] rotate-45' : 'bg-white/5 border-white/10 group-hover:border-white/20'
                    }`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V18M6 12H18" stroke={isActive ? 'black' : 'white'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Answer Content */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-base md:text-lg text-white font-light leading-relaxed max-w-2xl  pl-6 ml-1">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
