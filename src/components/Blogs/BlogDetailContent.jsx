'use client';

import React from 'react';
import Container from '../Common/Container/Container';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogDetailContent({ blog }) {
  if (!blog) return null;

  return (
    <article className="bg-black py-10 md:py-20 min-h-screen text-white">
      <Container>
        {/* Title Section */}
        <header className="max-w-[1000px] mb-16">
          <h1 className="text-4xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.1] mb-8 uppercase">
            {blog.title}.
          </h1>
        </header>

        {/* Main Image */}
        <div className="max-w-5xl mx-auto mb-16 overflow-hidden">
          <div className="relative aspect-video w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col text-white pb-32">
            {blog.content ? (
              blog.content.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                
                // Headers 1
                if (trimmedLine.startsWith('# ')) {
                  return <h2 key={index} className="text-3xl md:text-4xl font-bold mt-12 mb-6 leading-tight uppercase tracking-tighter">{trimmedLine.replace('# ', '')}</h2>;
                }
                
                // Headers 3
                if (trimmedLine.startsWith('### ')) {
                  return <h3 key={index} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-[#2bc5ee] tracking-tight">{trimmedLine.replace('### ', '')}</h3>;
                }
                
                // Bold text starts (treating as subheaders or callouts)
                if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                  return <h4 key={index} className="text-xl font-semibold mt-8 mb-3 text-white uppercase tracking-wider">{trimmedLine.replace(/\*\*/g, '')}</h4>;
                }

                // List items
                if (trimmedLine.startsWith('* ') || (trimmedLine.match(/^\d+\./))) {
                  return (
                    <div key={index} className="flex gap-4 mb-4 items-start group">
                      <span className="text-[#2bc5ee] mt-1.5 shrink-0">•</span>
                      <p className="text-lg md:text-xl font-light opacity-80 group-hover:opacity-100 transition-opacity">
                        {trimmedLine.replace(/^\* |^\d+\.\s*/, '')}
                      </p>
                    </div>
                  );
                }

                // Empty lines
                if (trimmedLine === '') return <div key={index} className="h-4" />;
                
                // Standard Paragraphs
                return (
                  <p key={index} className="text-lg md:text-xl font-light leading-relaxed mb-6 opacity-80">
                    {trimmedLine}
                  </p>
                );
              })
            ) : (
              <p className="text-xl font-light opacity-70">Content coming soon...</p>
            )}
          </div>
        </div>
      </Container>
    </article>
  );
}
