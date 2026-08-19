import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  variant?: 'dark' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showBadge = true,
  variant = 'light' 
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group select-none cursor-pointer">
      {/* Dynamic 3D Hexagonal Steel & Laser Emblem */}
      <motion.div 
        whileHover={{ rotate: [0, -6, 6, 0], scale: 1.06 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        {/* Ambient Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 rounded-2xl blur-xs opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className={`relative ${isSm ? 'w-8 h-8 rounded-xl' : isLg ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10 rounded-xl'} bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950 p-0.5 border border-orange-500/40 shadow-lg flex items-center justify-center overflow-hidden`}>
          {/* Internal Geometric Mesh & Metallic Sheen */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/30 via-transparent to-transparent"></div>
          
          <svg 
            viewBox="0 0 40 40" 
            className={`${isSm ? 'w-5 h-5' : isLg ? 'w-7 h-7' : 'w-6 h-6'} text-orange-500 relative z-10 transition-transform duration-300 group-hover:scale-110`}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 3D Isometric Construction Blocks */}
            <path d="M20 3L34 11V29L20 37L6 29V11L20 3Z" stroke="url(#orangeGrad)" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M20 3V20M20 20L34 11M20 20L6 11M20 20V37" stroke="url(#orangeGrad)" strokeWidth="2" strokeLinecap="round" />
            
            {/* Center Core Pulse */}
            <circle cx="20" cy="20" r="3.2" fill="#FFA133" className="animate-pulse" />

            <defs>
              <linearGradient id="orangeGrad" x1="6" y1="3" x2="34" y2="37" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF7A00" />
                <stop offset="0.5" stopColor="#FF9E1B" />
                <stop offset="1" stopColor="#FF4D00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Typography and Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${isSm ? 'text-sm' : isLg ? 'text-2xl' : 'text-lg sm:text-xl'} ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}>
            BAKU<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">BUILD</span>
          </span>
          <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-[9px] rounded-md uppercase tracking-wider shadow-xs">
            PRO
          </span>
        </div>

        <div className="flex items-center gap-1 mt-0.5">
          <span className={`text-[9px] sm:text-[10px] font-bold tracking-wider uppercase ${variant === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
            Zavod Tikinti Ekosistemi
          </span>
          {showBadge && (
            <span className="hidden sm:inline-flex items-center gap-0.5 text-[8px] font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1 py-0.2 rounded">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>AZS</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
