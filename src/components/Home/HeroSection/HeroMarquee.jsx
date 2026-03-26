'use client';

import React from 'react';

export default function HeroMarquee({ marqueeTranslate, marqueeProgress, dropProgress = 0 }) {
  return (
    <div 
      className="absolute top-1/2 left-0 w-[initial] -translate-y-1/2 pointer-events-none flex items-center pr-[10vw]"
      style={{ 
        transform: `translateX(${marqueeTranslate})`,
        opacity: marqueeProgress > 0.01 ? 1 : 0,
        zIndex: 40 // Sits on top of the video completely!
      }}
    >
      <h1 className="text-[12vw] sm:text-[10vw] font-bold whitespace-nowrap flex items-center space-x-4 sm:space-x-8 px-10 leading-none drop-shadow-2xl mix-blend-overlay">
        <span className="bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">Dream big</span>
        
        {/* Custom SVG Wave Separator - Staggered Motion */}
        <svg width="114" height="65" viewBox="0 0 114 65" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18vw] sm:w-[14vw] h-auto object-contain shrink-0">
          <path className="animate-wave-1" d="M2.04834 10.4999C8.1039 4.8402 24.5516 -3.08335 41.8978 10.4999C59.244 24.0831 72.9569 16.1596 77.6451 10.4999C83.5053 5.33958 98.3903 -1.88484 111.048 10.4999" stroke="white" strokeWidth="6"/>
          <path className="animate-wave-2" d="M2.04834 32.4999C8.10389 26.8402 24.5516 18.9167 41.8978 32.4999C59.244 46.0831 72.9569 38.1596 77.6451 32.4999C83.5053 27.3396 98.3903 20.1152 111.048 32.4999" stroke="#29ABE2" strokeWidth="6"/>
          <path className="animate-wave-3" d="M2.04834 54.4999C8.10389 48.8402 24.5516 40.9167 41.8978 54.4999C59.244 68.0831 72.9569 60.1596 77.6451 54.4999C83.5053 49.3396 98.3903 42.1152 111.048 54.4999" stroke="white" strokeWidth="6"/>
        </svg>

        <span className="bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">Design smart</span>
        
        {/* Custom SVG Triangle Separator - Visible ONLY while marquee is moving */}
        {dropProgress <= 0.01 && (
          <svg width="372" height="293" viewBox="0 0 372 293" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15vw] sm:w-[12vw] h-auto object-contain shrink-0 mx-8">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.92648 51.4617C-6.63634 30.5211 8.37766 6.63646 31.3938 6.17506L339.042 0.007034C367.065 -0.554742 382.218 32.6276 363.442 53.4377L157.307 281.898C141.885 298.99 114.002 294.694 104.439 273.754L2.92648 51.4617ZM61.9147 22.2983C38.8987 22.7598 23.8855 46.644 33.4483 67.5845L112.244 240.131C121.807 261.071 149.689 265.367 165.11 248.275L325.116 70.9409C343.892 50.1309 328.739 16.9497 300.716 17.5112L61.9147 22.2983Z" fill="#29ABE2"/>
          </svg>
        )}

        <span className="bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent ml-8">Develop better</span>
      </h1>
    </div>
  );
}
