import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MoveHorizontal, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Sparkles,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/helpers';

interface CatalogCarouselViewProps {
  products: Product[];
  wishlist: Product[];
  comparison: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleComparison: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

const GAP = 16; // 16px (gap-4)

export const CatalogCarouselView: React.FC<CatalogCarouselViewProps> = ({
  products,
  wishlist,
  comparison,
  onAddToCart,
  onToggleWishlist,
  onToggleComparison,
  onSelectProduct
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Dynamic responsive items per page calculation based on the actual container width
  const getItemsPerPage = useCallback((width: number) => {
    if (width < 580) return 1;
    if (width < 960) return 2;
    return 3;
  }, []);

  const itemsPerPage = containerWidth > 0 ? getItemsPerPage(containerWidth) : 3;

  // Track exact container width using ResizeObserver to ensure 100% responsive accuracy
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el) {
        setContainerWidth(el.clientWidth);
      }
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Reset index if products change or itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [products.length, itemsPerPage]);

  const maxIndex = Math.max(0, products.length - itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  // Exact card width and step offset in pixels
  const cardWidth = containerWidth > 0 
    ? (containerWidth - (itemsPerPage - 1) * GAP) / itemsPerPage 
    : 280;
  const stepOffset = cardWidth + GAP;

  const handleDragEnd = (_e: any, info: any) => {
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

  if (products.length === 0) return null;

  return (
    <div className="w-full max-w-full space-y-4 select-none overflow-hidden font-sans">
      {/* Top Carousel Navigation Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-5 py-3.5 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-xs">
          <MoveHorizontal className="w-4 h-4 text-orange-400 animate-pulse shrink-0" />
          <span className="font-bold">Ekranda sürüşdürərək vərəqləyin</span>
          <span className="hidden sm:inline text-slate-400">
            ({currentIndex + 1} - {Math.min(products.length, currentIndex + itemsPerPage)} / {products.length})
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Progress bar */}
          <div className="w-20 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden mr-1 hidden sm:block">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${maxIndex > 0 ? ((currentIndex) / maxIndex) * 100 : 100}%` }}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              currentIndex === 0
                ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-orange-600 text-white border-slate-700'
            }`}
            aria-label="Əvvəlki"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          <span className="text-xs font-mono font-bold text-orange-400 px-1">
            {currentIndex + 1}/{totalPages}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              currentIndex >= maxIndex
                ? 'bg-slate-800 text-slate-600 border-slate-700 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-orange-600 text-white border-slate-700'
            }`}
            aria-label="Növbəti"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div 
        ref={containerRef}
        className="w-full max-w-full overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing relative"
      >
        <motion.div
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
            damping: 30
          }}
          className="flex touch-pan-y"
          style={{ gap: `${GAP}px` }}
        >
          {products.map((product) => {
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
                whileHover={{ y: -4 }}
                onClick={() => {
                  if (!isDragging) onSelectProduct(product);
                }}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10 transition-all flex flex-col justify-between overflow-hidden cursor-pointer relative font-sans"
              >
                {/* Product Image */}
                <div className="relative pt-[70%] bg-slate-100 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 pointer-events-none"
                  />

                  {/* Tags */}
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
                    {product.tags && product.tags.slice(0, 2).map((tag, tIdx) => (
                      <span 
                        key={tIdx}
                        className={`px-2 py-0.5 text-[10px] font-black rounded-md shadow-xs flex items-center gap-1 ${
                          tag === 'Zavod qiyməti' ? 'bg-orange-600 text-white' : 'bg-slate-900 text-white'
                        }`}
                      >
                        {tag === 'Zavod qiyməti' && <Sparkles className="w-2.5 h-2.5 text-yellow-300" />}
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                      }}
                      className={`p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
                        inWish ? 'bg-red-500 text-white shadow-md' : 'bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 shadow-xs'
                      }`}
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
                      className={`p-2 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
                        inComp ? 'bg-orange-600 text-white shadow-md' : 'bg-white/90 hover:bg-white text-slate-700 hover:text-orange-600 shadow-xs'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>

                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 text-white text-[10px] font-bold rounded-md backdrop-blur-xs">
                    {product.brand}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="font-semibold text-orange-700">{product.subcategory}</span>
                      <span>{product.sku}</span>
                    </div>

                    <h3 className="font-extrabold text-xs text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price and Cart */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-base font-black text-slate-950">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">
                          /{product.unit}
                        </span>
                      </div>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="text-[10px] text-slate-400 line-through font-semibold block -mt-1">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Əlavə edildi</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Səbətə</span>
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

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {Array.from({ length: totalPages }).map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => setCurrentIndex(dotIdx * itemsPerPage)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              dotIdx === Math.floor(currentIndex / itemsPerPage)
                ? 'w-7 bg-orange-600'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Səhifə ${dotIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
