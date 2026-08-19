import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Eye, 
  Sparkles, 
  MoveHorizontal, 
  Flame, 
  Check, 
  Play, 
  Pause,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  Package,
  Award
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice, calculateItemPrice } from '../utils/helpers';

interface SwipeableProductCarouselProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  products: Product[];
  wishlist: Product[];
  comparison: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleComparison: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onViewAll?: () => void;
}

export const SwipeableProductCarousel: React.FC<SwipeableProductCarouselProps> = ({
  title = "Populyar Tikinti Materialları",
  subtitle = "Birbaşa zavod qiymətinə tələb olunan ən çox satılan materiallar",
  badge = "İnteraktiv Karusel",
  products,
  wishlist,
  comparison,
  onAddToCart,
  onToggleWishlist,
  onToggleComparison,
  onSelectProduct,
  onViewAll
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Dynamic responsive items per page calculation based on container width
  const getItemsPerPage = (width: number) => {
    if (width < 580) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
  };

  const itemsPerPage = containerWidth > 0 ? getItemsPerPage(containerWidth) : 4;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el) setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Filter products by selected carousel category tab
  const categoriesList = [
    { id: 'all', name: 'Hamısı' },
    { id: 'sement-quru', name: 'Sement & Suvaq' },
    { id: 'metal-armatur', name: 'Armatur & Metal' },
    { id: 'kerpic-blok', name: 'Kərpic & Blok' },
    { id: 'kafel-metlax', name: 'Kafel & Keramika' },
    { id: 'izolyasiya-dam', name: 'İzolyasiya & Dam' },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const GAP = 16;
  const cardWidth = containerWidth > 0 
    ? (containerWidth - (itemsPerPage - 1) * GAP) / itemsPerPage 
    : 280;
  const stepOffset = cardWidth + GAP;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const maxIndex = Math.max(0, filteredProducts.length - itemsPerPage);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoPlay, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Drag Gesture Handler
  const handleDragEnd = (_event: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let deltaSteps = 0;
    if (Math.abs(offset) > 40 || Math.abs(velocity) > 200) {
      if (offset < -40 || velocity < -200) {
        deltaSteps = Math.max(1, Math.round(Math.abs(offset) / stepOffset));
      } else if (offset > 40 || velocity > 200) {
        deltaSteps = -Math.max(1, Math.round(Math.abs(offset) / stepOffset));
      }
    }

    setCurrentIndex(prev => Math.max(0, Math.min(maxIndex, prev + deltaSteps)));
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

  return (
    <section className="space-y-4 my-8 font-sans">
      {/* Top Header with title, category tabs & swipe controller */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{badge}</span>
              </span>
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                <MoveHorizontal className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
                <span>Sürükləmə ilə keçid aktivdir</span>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2 flex items-center gap-2">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {subtitle}
            </p>
          </div>

          {/* Navigation and Auto-play controls */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            {/* Auto Play Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoPlay 
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title={isAutoPlay ? 'Avtomatik fırlanmanı dayandır' : 'Avtomatik fırlanmanı başlat'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="hidden sm:inline">{isAutoPlay ? 'Avto: Açıq' : 'Avto Slayd'}</span>
            </motion.button>

            {/* Slide Index Badge */}
            <div className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-extrabold text-slate-700 flex items-center gap-1 border border-slate-200">
              <span className="text-orange-600">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-slate-400">/</span>
              <span>{String(Math.max(1, filteredProducts.length)).padStart(2, '0')}</span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  currentIndex === 0
                    ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
                    : 'bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 border-slate-200 hover:border-orange-300 shadow-sm'
                }`}
                aria-label="Əvvəlki məhsullar"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  currentIndex >= maxIndex
                    ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed opacity-50'
                    : 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600 shadow-md shadow-orange-600/30'
                }`}
                aria-label="Növbəti məhsullar"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs with smooth hover */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 overflow-x-auto pb-1 no-scrollbar">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Swipeable Carousel Viewport Stage */}
      <div 
        ref={containerRef} 
        className="w-full max-w-full relative overflow-hidden rounded-3xl select-none"
      >
        {/* Interactive Gesture Hint Pill for touch & mouse */}
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            <span>Ekrana toxunaraq və ya siçanı basıb saxlayaraq sağa/sola sürüşdürün</span>
          </div>

          {/* Pagination progress bar */}
          <div className="w-32 sm:w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${maxIndex > 0 ? ((currentIndex) / maxIndex) * 100 : 100}%` 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Motion Track with Drag gestures */}
        <div className="w-full max-w-full overflow-hidden cursor-grab active:cursor-grabbing">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ 
              left: -maxIndex * stepOffset, 
              right: 0 
            }}
            dragElastic={0.15}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            animate={{
              x: -(currentIndex * stepOffset)
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 30,
              mass: 0.8
            }}
            className="flex touch-pan-y"
            style={{ gap: `${GAP}px` }}
          >
            {filteredProducts.map((product) => {
              const inWish = wishlist.some(p => p.id === product.id);
              const inComp = comparison.some(p => p.id === product.id);
              const isAdded = !!addedItemIds[product.id];

              return (
                <motion.div
                  key={product.id}
                  style={{ 
                    width: `${cardWidth}px`,
                    flexShrink: 0 
                  }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => {
                    if (!isDragging) {
                      onSelectProduct(product);
                    }
                  }}
                  className="group bg-white rounded-3xl border border-slate-200 hover:border-orange-400 hover:shadow-2xl hover:shadow-orange-500/10 transition-all flex flex-col justify-between overflow-hidden cursor-pointer relative font-sans"
                >
                  {/* Image & Badges Container */}
                  <div className="relative pt-[72%] bg-slate-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Product Tags Top-Left */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                      {product.tags && product.tags.slice(0, 2).map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className={`px-2.5 py-0.5 text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1 ${
                            tag === 'Zavod qiyməti' 
                              ? 'bg-orange-600 text-white' 
                              : tag === 'Endirim' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-slate-900 text-white'
                          }`}
                        >
                          {tag === 'Zavod qiyməti' && <Sparkles className="w-2.5 h-2.5 text-yellow-300" />}
                          {tag}
                        </span>
                      ))}
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded-lg shadow-sm">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    {/* Quick action buttons Top-Right */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(product);
                        }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                          inWish 
                            ? 'bg-red-500 text-white shadow-md' 
                            : 'bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 shadow-sm'
                        }`}
                        title="Bəyəndiklərimə əlavə et"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleComparison(product);
                        }}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                          inComp 
                            ? 'bg-orange-600 text-white shadow-md' 
                            : 'bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 shadow-sm'
                        }`}
                        title="Müqayisə et"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>

                    {/* Brand Pill Bottom-Left */}
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span className="px-2 py-0.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-extrabold rounded-md border border-white/10">
                        {product.brand}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span className="font-semibold text-orange-700">{product.subcategory}</span>
                        <span>Kod: {product.sku}</span>
                      </div>

                      <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>

                      {/* Technical Specs pills */}
                      {product.specifications && Array.isArray(product.specifications) && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {product.specifications.slice(0, 2).map((spec, sIdx) => (
                            <span key={sIdx} className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] text-slate-600 font-medium truncate max-w-[140px]">
                              {spec.key}: {spec.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price and Cart Button */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-slate-950">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-[11px] text-slate-500 font-bold">
                            / {product.unit}
                          </span>
                        </div>
                        {product.oldPrice && product.oldPrice > product.price && (
                          <span className="text-[11px] text-slate-400 line-through font-semibold block -mt-1">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={(e) => handleQuickAdd(e, product)}
                        className={`p-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                          isAdded
                            ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                            : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20'
                        }`}
                        title="Səbətə at"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="text-[11px] pr-1">Əlavə edildi</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span className="text-[11px] pr-0.5">Səbətə</span>
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

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: totalPages }).map((_, dotIdx) => {
            const isActive = dotIdx === Math.floor(currentIndex / itemsPerPage);
            return (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx * itemsPerPage)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-7 bg-orange-600 shadow-sm' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Səhifə ${dotIdx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
