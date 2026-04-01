import React from 'react';

const SectionBadge = ({ children, className = "" }) => {
  return (
    <div className={`inline-block px-5 py-2 border border-[#29ABE2] rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
};

export default SectionBadge;
