import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', size = 'md' }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <a href="#home" className={`flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg ${className}`}>
      {/* Custom Original CAR LINES Automotive SVG Emblem */}
      <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-slate-900 via-obsidian-800 to-slate-950 border border-gold-500/30 flex items-center justify-center shadow-lg shadow-gold-500/10 group-hover:border-gold-500/60 transition-colors relative overflow-hidden flex-shrink-0`}>
        <svg viewBox="0 0 40 40" className="w-6 h-6 text-gold-500 transition-transform group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Aerodynamic Speed Lines & Car Silhouette */}
          <path d="M6 25C10 25 12 18 17 15C22 12 28 12 34 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M4 29C11 29 14 22 20 19C26 16 31 17 36 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
          {/* Subtle Wheel / Speed Dots */}
          <circle cx="12" cy="27" r="2.5" fill="currentColor" />
          <circle cx="28" cy="27" r="2.5" fill="currentColor" />
        </svg>
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <span className={`${textSizes[size]} font-black tracking-tight text-white group-hover:text-gold-400 transition-colors`}>
            CAR LINES
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-gold-500/90 block -mt-1">
          Pre-Owned Cars
        </span>
      </div>
    </a>
  );
};
