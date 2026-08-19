import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Layers, 
  Calculator, 
  Scale, 
  Heart, 
  ShoppingCart 
} from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  wishlistCount: number;
  comparisonCount: number;
  onOpenCalculator: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenComparison: () => void;
  onScrollToCatalog: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  wishlistCount,
  comparisonCount,
  onOpenCalculator,
  onOpenCart,
  onOpenWishlist,
  onOpenComparison,
  onScrollToCatalog
}) => {
  return (
    <nav 
      aria-label="Mobil alt naviqasiya"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 font-sans"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Kataloq */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onScrollToCatalog}
          className="flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-orange-600 transition-colors cursor-pointer rounded-xl"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">Kataloq</span>
        </motion.button>

        {/* 2. Müqayisə */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenComparison}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-orange-600 transition-colors cursor-pointer rounded-xl"
        >
          <Scale className="w-5 h-5" />
          {comparisonCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-slate-900 text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {comparisonCount}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5">Müqayisə</span>
        </motion.button>

        {/* 3. Highlighted Center Action: KALKULYATOR (Material Hesabla) */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={onOpenCalculator}
          className="relative -top-3.5 flex flex-col items-center justify-center cursor-pointer group"
        >
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-600/35 border-3 border-white group-hover:scale-105 transition-transform">
            <Calculator className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-extrabold text-orange-700 mt-0.5">Hesabla</span>
        </motion.button>

        {/* 4. Bəyənilənlər */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-red-500 transition-colors cursor-pointer rounded-xl"
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5">Seçilmişlər</span>
        </motion.button>

        {/* 5. Səbət */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenCart}
          className="relative flex flex-col items-center justify-center py-1 px-2 text-slate-600 hover:text-orange-600 transition-colors cursor-pointer rounded-xl"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 bg-orange-600 text-white text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-medium mt-0.5">Səbət</span>
        </motion.button>
      </div>
    </nav>
  );
};
