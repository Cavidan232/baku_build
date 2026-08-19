import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Check, 
  Eye, 
  Sparkles, 
  Percent,
  TrendingUp,
  Award,
  MoveHorizontal
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/helpers';

interface DealsCarouselProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const DealsCarousel: React.FC<DealsCarouselProps> = ({
  products,
  onAddToCart,
  onSelectProduct
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [itemsVisible, setItemsVisible] = useState(4);

  // Countdown timer for daily flash deal
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsVisible(1);
      else if (window.innerWidth < 1024) setItemsVisible(2);
      else if (window.innerWidth < 1280) setItemsVisible(3);
      else setItemsVisible(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Filter products that have discounts or special tags
  const dealProducts = products.filter(p => (p.oldPrice && p.oldPrice > p.price) || p.tags.includes('Endirim') || p.tags.includes('Zavod qiyməti'));
  const maxIndex = Math.max(0, dealProducts.length - itemsVisible);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleDragEnd = (e: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -40 || velocity < -200) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + (Math.abs(offset) > 180 ? 2 : 1)));
    } else if (offset > 40 || velocity > 200) {
      setCurrentIndex(prev => Math.max(0, prev - (Math.abs(offset) > 180 ? 2 : 1)));
    }
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (isDragging) return;
    onAddToCart(product, product.minOrder || 1);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const cardWidthPercent = 100 / itemsVisible;

  return (
    <section className="relative bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden text-white font-sans select-none">
      {/* Decorative Shimmer Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-300/20 via-transparent to-black/30 pointer-events-none"></div>

      {/* Header bar with countdown timer */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/20 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg text-white">
            <Flame className="w-7 h-7 text-yellow-200 animate-bounce" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-yellow-200 border border-white/30 backdrop-blur-md">
                Günün Xüsusi Fürsəti
              </span>
              <span className="text-[11px] font-bold text-orange-100 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Məhdud Anbar Ehtiyatı</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              Flash Endirimlər & Zavod Qiymətləri
            </h2>
          </div>
        </div>

        {/* Live Timer and Swipe Controls */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Countdown Clock Box */}
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-inner">
            <Clock className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="flex items-center gap-1 text-xs font-mono font-bold tracking-wider">
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-yellow-200">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-yellow-200">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span>:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-yellow-200">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Swipe Buttons */}
          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                currentIndex === 0 
                  ? 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed' 
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
              }`}
              aria-label="Əvvəlki"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                currentIndex >= maxIndex 
                  ? 'bg-white/10 text-white/40 border-white/10 cursor-not-allowed' 
                  : 'bg-white/20 hover:bg-white/30 text-white border-white/30'
              }`}
              aria-label="Növbəti"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Swipe Hint */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-orange-100 font-medium pt-3 pb-1">
        <div className="flex items-center gap-1.5">
          <MoveHorizontal className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
          <span>Sürüşdürmək üçün toxunun və ya çəkin</span>
        </div>
        <div className="font-bold text-yellow-200">
          {currentIndex + 1} - {Math.min(dealProducts.length, currentIndex + itemsVisible)} / {dealProducts.length} məhsul
        </div>
      </div>

      {/* Horizontal Carousel Cards with Drag Gestures */}
      <div className="relative z-10 overflow-hidden pt-2 pb-2 cursor-grab active:cursor-grabbing">
        <motion.div 
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{
            x: `-${currentIndex * (100 / itemsVisible)}%`
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 28
          }}
          className="flex gap-4 touch-pan-y"
        >
          {dealProducts.map((product) => {
            const discountPercent = product.oldPrice 
              ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
              : 10;
            const isAdded = !!addedItemIds[product.id];
            const stockPercent = Math.min(95, Math.max(35, 100 - Math.round((product.stockCount % 60) * 1.2)));

            return (
              <motion.div
                key={product.id}
                style={{ 
                  width: `calc(${cardWidthPercent}% - ${(16 * (itemsVisible - 1)) / itemsVisible}px)`,
                  flexShrink: 0 
                }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  if (!isDragging) onSelectProduct(product);
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl border border-white/40 flex flex-col justify-between cursor-pointer group transition-all text-slate-900 font-sans"
              >
                {/* Product Image & Top Overlays */}
                <div className="relative pt-[65%] bg-slate-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 pointer-events-none"
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-[11px] rounded-lg shadow-md flex items-center gap-0.5">
                      <Percent className="w-3 h-3" />
                      <span>-{discountPercent}%</span>
                    </span>
                    <span className="px-1.5 py-0.5 bg-slate-900/90 text-yellow-300 font-bold text-[9px] rounded-md backdrop-blur-xs">
                      Günün Qiyməti
                    </span>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded-md backdrop-blur-xs">
                    {product.brand}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Stock progress bar */}
                    <div className="mt-2.5 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <span className="text-orange-600">{stockPercent}% satıldı</span>
                        <span className="text-slate-400">Qalıq: {product.stockCount} {product.unit}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" 
                          style={{ width: `${stockPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Cart Action */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <span className="text-base font-black text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium ml-1">/{product.unit}</span>
                      </div>
                      {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
                        isAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                          : 'bg-slate-900 hover:bg-orange-600 text-white shadow-slate-900/20'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Səbətə Əlavə Edildi!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Birbaşa Səbətə At</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
