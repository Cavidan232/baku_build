import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Sparkles, ChevronRight } from 'lucide-react';

interface DesktopCalculatorFabProps {
  onOpenCalculator: () => void;
}

export const DesktopCalculatorFab: React.FC<DesktopCalculatorFabProps> = ({
  onOpenCalculator
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40 font-sans select-none">
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onOpenCalculator}
        className="group relative flex items-center bg-slate-950/90 hover:bg-slate-900 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-orange-500/40 hover:border-orange-500 transition-all cursor-pointer shadow-orange-600/10"
      >
        {/* Pulsing indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
        </span>

        {/* Icon */}
        <div className="w-8 h-8 rounded-xl bg-orange-600/90 text-white flex items-center justify-center mr-2.5 shadow-sm group-hover:bg-orange-600 transition-colors">
          <Calculator className="w-4 h-4 text-white" />
        </div>

        {/* Text Container with smooth transition */}
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-white tracking-wide">
              Material Hesabla
            </span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </div>
          <span className="text-[10px] text-slate-400 block font-medium group-hover:text-orange-300 transition-colors">
            Smeta və Həcm Kalkulyatoru
          </span>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-all ml-2" />
      </motion.button>
    </div>
  );
};
