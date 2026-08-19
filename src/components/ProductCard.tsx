import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Scale, ShoppingCart, Plus, Minus, Check, Eye, Sparkles, Award } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, calculateItemPrice } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  isInWishlist: boolean;
  isInComparison: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleComparison: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  isInComparison,
  onAddToCart,
  onToggleWishlist,
  onToggleComparison,
  onSelectProduct
}) => {
  const [quantity, setQuantity] = useState(product.minOrder || 1);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const priceCalc = calculateItemPrice(product, quantity);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-orange-400 hover:shadow-xl hover:shadow-orange-500/10 transition-all flex flex-col justify-between overflow-hidden cursor-pointer relative font-sans"
    >
      {/* Top Badges & Actions */}
      <div className="relative pt-[70%] bg-slate-100 overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges Left */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.tags && product.tags.slice(0, 2).map((tag, idx) => (
            <motion.span 
              key={idx}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md shadow-xs flex items-center gap-1 ${
                tag === 'Zavod qiyməti' 
                  ? 'bg-orange-600 text-white' 
                  : tag === 'Endirim' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-slate-900 text-white'
              }`}
            >
              {tag === 'Zavod qiyməti' && <Sparkles className="w-2.5 h-2.5" />}
              {tag}
            </motion.span>
          ))}
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="px-1.5 py-0.5 bg-red-600 text-white text-[10px] font-black rounded-md shadow-xs">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Quick action buttons top-right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isInWishlist 
                ? 'bg-red-500 text-white shadow-md' 
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-red-500 shadow-xs'
            }`}
            title="Bəyəndiklərimə əlavə et"
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); onToggleComparison(product); }}
            className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
              isInComparison 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 shadow-xs'
            }`}
            title="Müqayisəyə əlavə et"
          >
            <Scale className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => { e.stopPropagation(); onSelectProduct(product); }}
            className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xs transition-opacity opacity-0 group-hover:opacity-100 hidden sm:block"
            title="Baxış"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Weight / Unit pill on bottom-right of image */}
        {product.weightKg && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold rounded-md">
            {product.weightKg} kq/{product.unit}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Subcategory */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-bold text-orange-600 uppercase tracking-wider">{product.brand}</span>
            <span className="truncate max-w-[120px]">{product.subcategory}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>

          {/* Ratings & Stock */}
          <div className="flex items-center justify-between mt-1.5 text-[11px]">
            <div className="flex items-center gap-1 text-orange-500 font-bold">
              <span>★</span>
              <span className="text-slate-800">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
            <div className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
              Anbarda: {product.stockCount} {product.unit}
            </div>
          </div>

          {/* Bulk discount tag */}
          {product.bulkTiers && product.bulkTiers.length > 0 && (
            <div className="mt-2 text-[10px] text-orange-950 bg-orange-50/90 p-2 rounded-xl border border-orange-200/70 flex items-center justify-between">
              <span className="font-semibold text-orange-800">Toplu endirim:</span>
              <span className="font-extrabold text-orange-600">
                {product.bulkTiers[0].minQty}+ {product.unit} olduqda -{product.bulkTiers[0].discountPercent}%
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          {/* Price breakdown */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-base font-black text-slate-900">
                {formatPrice(priceCalc.unitPrice)}
              </span>
              <span className="text-xs text-slate-500 font-medium ml-1">/{product.unit}</span>
            </div>
            {product.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Quantity Controls + Add Button */}
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {/* Quantity Stepper */}
            <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 p-0.5">
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={() => setQuantity(Math.max(product.minOrder || 1, quantity - 1))}
                className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </motion.button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(product.minOrder || 1, val));
                }}
                className="w-9 text-center text-xs font-bold text-slate-800 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-2 px-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer ${
                isAddedRecently
                  ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAddedRecently ? (
                  <motion.div
                    key="added"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Əlavə edildi!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Səbətə at</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

