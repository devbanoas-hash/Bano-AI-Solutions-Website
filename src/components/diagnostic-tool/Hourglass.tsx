import React from 'react';

const Hourglass: React.FC = () => {
  return (
    <div className="relative w-32 h-48 flex flex-col items-center justify-center scale-75 md:scale-100">
      {/* Glass Container */}
      <div className="relative z-10 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
         <svg width="60" height="90" viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Bulb */}
            <path d="M5 5 H55 L30 45 L5 5 Z" stroke="#34d399" strokeWidth="1.5" fill="rgba(6, 78, 59, 0.3)" />
            {/* Bottom Bulb */}
            <path d="M5 85 H55 L30 45 L5 85 Z" stroke="#34d399" strokeWidth="1.5" fill="rgba(6, 78, 59, 0.3)" />
            {/* Caps */}
            <rect x="2" y="2" width="56" height="3" rx="1.5" fill="#10b981" />
            <rect x="2" y="85" width="56" height="3" rx="1.5" fill="#10b981" />
         </svg>
         
         {/* Sand Top (Draining) */}
         <div className="absolute top-[6px] left-[15px] w-[30px] h-[38px] bg-gradient-to-b from-lime-400 to-emerald-400"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', animation: 'scaleUp 3.5s infinite reverse ease-in-out' }}>
         </div>

         {/* The Stream */}
         <div className="absolute top-[45px] left-[29px] w-[2px] h-[40px] bg-lime-400 animate-pulse shadow-[0_0_8px_#84cc16]"></div>

         {/* Sand Bottom (Filling) */}
         <div className="absolute bottom-[6px] left-[15px] w-[30px] h-[38px] bg-gradient-to-t from-lime-400 to-emerald-400 origin-bottom"
              style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', animation: 'scaleUp 3.5s infinite ease-in-out' }}>
         </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse-glow"></div>
      
      {/* Particles around hourglass */}
      <div className="absolute w-full h-full animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-1 h-1 bg-lime-400 rounded-full blur-[1px]"></div>
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-green-400 rounded-full blur-[1px]"></div>
      </div>
    </div>
  );
};

export default Hourglass;