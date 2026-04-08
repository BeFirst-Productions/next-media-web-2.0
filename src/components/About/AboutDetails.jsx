'use client';

import React from 'react';
import Container from '../Common/Container/Container';
import Image from 'next/image';
import SectionBadge from '../Common/SectionBadge/SectionBadge';

const DetailCard = ({ badge, text, image, reverse = false }) => {
  return (
    <div className={`flex flex-col space-y-8 ${reverse ? 'flex-col' : 'flex-col'}`}>
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-gray-100">
        <Image 
          src={image} 
          alt={badge}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col space-y-6">
        <div className="flex">
          <SectionBadge className="!text-[#00B4D8] !border-[#00B4D8]/30 !bg-[#00B4D8]/5 flex items-center space-x-2 px-6 py-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.261L12 19.451l-7.416 3.847L6 15.27 0 9.423l8.332-1.268L12 .587z"/>
            </svg>
            <span className="font-bold">{badge}</span>
          </SectionBadge>
        </div>
        <p className="text-[#333333] text-lg leading-relaxed font-light">
          {text}
        </p>
      </div>
    </div>
  );
};

export default function AboutDetails() {
  const dummyText = "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti nostra, per inceptos himenaeos.";
  const dummyTextShort = "Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. ";

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <Container>
        {/* About Us Section (Row 1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-32 items-center">
          <div className="flex flex-col space-y-8 order-2 md:order-1">
            <div className="flex">
              <SectionBadge className="!text-[#00B4D8] !border-[#00B4D8]/30 !bg-[#00B4D8]/5 flex items-center space-x-2 px-6 py-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.261L12 19.451l-7.416 3.847L6 15.27 0 9.423l8.332-1.268L12 .587z"/>
                </svg>
                <span className="font-bold">About Us</span>
              </SectionBadge>
            </div>
            <div className="flex flex-col space-y-6">
              <p className="text-[#333333] text-lg md:text-xl leading-relaxed font-light">
                At Next Media, we believe the greatest brands are made at the intersection of creativity, strategy, and technology. We are a full-service digital marketing agency in Dubai, that offers integrated solutions in digital marketing, web development, media production, and branding across the GCC and India.
              </p>
              <p className="text-[#333333] text-lg md:text-xl leading-relaxed font-light">
                Our main focus is on achieving measurable results, telling engaging stories, and making experiences that really link people to businesses in roll-out times of the digital world.
              </p>
              <p className="text-[#333333] text-lg md:text-xl leading-relaxed font-light">
                Next Media was started by Rasheeq and Anas who share the same interest in design, marketing, and media. They wanted to create an agency down to earth and able to camisa-west businesses through new ideas and execution planning.
              </p>
              <p className="text-[#333333] text-lg md:text-xl leading-relaxed font-light">
                Our services range from branding to launching software, managing a portfolio of the most resonant marketing campaigns, and producing content that ultimately hits the mark. We are dedicated to delivering world-class solutions that our clients will reap the benefits of By connecting people and exposing them to a lifestyle,
              </p>
              <p className="text-[#333333] text-lg md:text-xl leading-relaxed font-light">
                We build brand recognition, cultivate loyalty, hope for one, and ultimately drive business with trust and growth continuity.
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gray-100 shadow-xl order-1 md:order-2">
            <Image 
              src="/images/about/details_1.png" 
              alt="About Us"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission & Vision Section (Row 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <DetailCard 
            badge="Mission"
            text="We aim to provide intelligent, original, and measurable digital marketing solutions that facilitate business growth, help in building trust, and connecting with the audience. As one of the Best branding Agency Dubai, we deal with creating simple but highly effective strategies that increase brand visibility, promote interaction, and deliver measurable results. The digital experience that we create will have a significant impact on a business and help in its success over time even in a highly competitive market."
            image="/images/about/mission.png"
          />
          <DetailCard 
            badge="Vision"
            text="We want to be among the creative agency in Dubai that are top-rated and at the same time recognized globally as a branding agency Dubai that besides beauty, attention-grabbing designs, and other aspects of creative branding also focuses on business growth. Our aspiration is to be the leaders in the digital marketing arena by delivering quality branding, orchestrating well-planned campaigns, and providing user-friendly digital solutions at the same time keeping marketing simple, effective, and business result-oriented for all types of businesses."
            image="/images/about/vision.png"
          />
        </div>
      </Container>
    </section>
  );
}
