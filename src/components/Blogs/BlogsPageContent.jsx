'use client';

import React from 'react';
import Container from '../Common/Container/Container';
import Image from 'next/image';
import SectionBadge from '../Common/SectionBadge/SectionBadge';
import Link from 'next/link';
import { BlogData } from '../../data/BlogData';

const BlogItem = ({ slug, title, desc, image, isLarge = false }) => {
  return (
    <Link href={`/blogs/${slug}`} className="group cursor-pointer flex flex-col space-y-5">
      <div className={`relative ${isLarge ? 'aspect-video md:aspect-video lg:aspect-3/2' : 'aspect-video md:aspect-video lg:aspect-3/2'} w-full overflow-hidden rounded-[24px] sm:rounded-[40px] bg-white/5 transition-transform duration-500`}>
        <Image 
          src={image} 
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      <div className="flex justify-between items-start pt-2">
        <div className="flex flex-col space-y-1 sm:space-y-2 max-w-[85%]">
          <h3 className={`text-white transition-colors group-hover:text-[#2bc5ee] leading-tight font-semibold ${isLarge ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-lg sm:text-xl'}`}>
            {title}
          </h3>
          <p className={` font-light line-clamp-2 ${isLarge ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
            {desc}
          </p>
        </div>
        
        <button className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white rounded-full text-black transition-all duration-500 group-hover:bg-[#2bc5ee] group-hover:text-white group-hover:rotate-45 shrink-0 ml-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
      </div>
    </Link>
  );
};

export default function BlogsPageContent() {
  const featuredBlog = BlogData[0];
  const listBlogs = BlogData.slice(1, 5); // Take the next 4

  return (
    <section className="bg-black py-24 sm:py-32">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-16 sm:mb-24">
          <div className="flex items-center space-x-2">
            <SectionBadge>
               <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.261L12 19.451l-7.416 3.847L6 15.27 0 9.423l8.332-1.268L12 .587z"/>
               </svg>
               <span>Blog</span>
            </SectionBadge>
          </div>

          <div className="flex flex-col">
            <h1 className="text-5xl sm:text-7xl md:text-[6.25rem] font-black tracking-tighter leading-[0.8] text-white uppercase">
              OUR
            </h1>
            <h1 className="text-5xl sm:text-7xl md:text-[6.25rem] font-black tracking-tighter leading-[0.8] uppercase" 
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.4)', color: 'transparent' }}>
              INSIGHTS
            </h1>
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 md:gap-y-20 lg:gap-x-16 xl:gap-x-24 items-start">
          {/* Featured Post */}
          <div className="md:col-span-1 lg:col-span-6 lg:sticky lg:top-32">
            <BlogItem 
              slug={featuredBlog.slug}
              title={featuredBlog.title} 
              desc={featuredBlog.desc} 
              image={featuredBlog.image} 
              isLarge={true}
            />
          </div>

          {/* List Posts - Using components of the same grid on md */}
          <div className="md:contents lg:col-span-6 lg:flex lg:flex-col lg:space-y-16 xl:space-y-20">
            {listBlogs.map((blog, idx) => (
              <div key={idx} className="md:col-span-1">
                <BlogItem 
                  slug={blog.slug}
                  title={blog.title} 
                  desc={blog.desc} 
                  image={blog.image} 
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
