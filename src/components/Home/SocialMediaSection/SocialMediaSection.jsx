'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Container from '../../Common/Container/Container';
import SectionBadge from '../../Common/SectionBadge/SectionBadge';

const fallbackPosters = [
  { id: 1, image: '01.jpg', text: 'Celebrating new possibilities as we move forward.' },
  { id: 2, image: '02.jpg', text: 'This Christmas, we celebrate gratitude and joy.' },
  { id: 3, image: '03.jpg', text: 'Great content creates great impact.' },
  { id: 4, image: '04.jpg', text: 'Think what is next for your brand.' },
  { id: 5, image: '05.jpg', text: 'Think what is next for your brand.' },
  { id: 6, image: '06.jpg', text: 'Think what is next for your brand.' },
  { id: 7, image: '07.jpg', text: 'Think what is next for your brand.' },
  { id: 8, image: '08.jpg', text: 'Think what is next for your brand.' },
];

export default function SocialMediaSection() {
  const [feed, setFeed] = useState([]);
  const [isError, setIsError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchInstagram = async () => {
      const token = "IGAAQuj3ItftxBZAFp2TzFRMjRnVUNNWi1jSXphNFAtWmRMZA0IxS3JFM0NmUFl0b2hOc3NyeDJqeG0tNXdMcDlWYnlSSkRSQkgycmhPdEcyMmVWeEtuZAmZAjeTIwVGR5ZADBWclEzWTZAhZA2p3d092R3VmODRsVGs0SWRycFo2VFZAkWQZDZD";
      // Added media_type to the fields query
      const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=${token}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        
        if (data.data) {
          // FILTER: Only keep items that are NOT videos
          const onlyImages = data.data.filter(item => 
            item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
          );
          setFeed(onlyImages);
        }
      } catch (err) {
        console.error("Instagram Filter Error:", err);
        setIsError(true);
      }
    };
    fetchInstagram();
  }, []);

  const displayData = isError || feed.length === 0 ? fallbackPosters : feed;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 374; 
      const newPos = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: newPos, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden font-sans">
      <Container>
        <div className="flex items-center justify-between mb-16">
          <SectionBadge>
            <span className="text-[#00B4D8] mr-2">★</span>
            Social Media
          </SectionBadge>

          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-[#00B4D8] hover:border-[#00B4D8] hover:scale-105 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-[#00B4D8] hover:border-[#00B4D8] hover:scale-105 active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </Container>

      <div ref={scrollRef} className="relative w-full flex overflow-x-auto no-scrollbar scroll-smooth">
        <div 
          className="flex w-max gap-6 px-4 pb-10"
          style={{ 
            animation: 'marquee-left 100s linear infinite',
            animationPlayState: 'running' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {[...displayData, ...displayData, ...displayData].map((post, index) => {
            const imageUrl = post.media_url ? post.media_url : `/images/social-media/${post.image}`;
            const caption = post.caption || post.text;

            return (
              <div key={`${post.id}-${index}`} className="shrink-0 w-[280px] md:w-[350px] bg-[#111111] rounded-[2.5rem] overflow-hidden border border-white/5 flex flex-col group">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="Social Media"
                    fill
                    unoptimized={!!post.media_url}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 bg-[#0A0A0A] border-t border-white/5">
                  <p className="text-white text-sm leading-relaxed line-clamp-2 italic">
                    "{caption}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}