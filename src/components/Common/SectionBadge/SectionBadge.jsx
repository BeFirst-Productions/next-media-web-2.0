import React from 'react';

const SectionBadge = ({ children, className = "", style = {} }) => {
  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 border border-[#2bc5ee] rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-xl ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default SectionBadge;
