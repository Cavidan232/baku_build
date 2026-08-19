import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  Scale, 
  ShoppingCart, 
  Star, 
  Truck, 
  ShieldCheck, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Building2, 
  Phone, 
  CheckCircle2, 
  Share2, 
  Info,
  Layers,
  MessageSquare,
  Award,
  Package
} from 'lucide-react';
import { Product, Review, UnitType } from '../types';
import { formatPrice, calculateItemPrice } from '../utils/helpers';
import { INITIAL_REVIEWS } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  isInComparison: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onToggleComparison: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isInWishlist,
  isInComparison,
  onAddToCart,
  onToggleWishlist,
  onToggleComparison
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'reviews' | 'calc'>('specs');
  const [isAddedRecently, setIsAddedRecently] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  // Review form states
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // In-modal quick area estimator
  const [areaInput, setAreaInput] = useState<number>(25);

  const currentImage = (product && selectedImage) || (product ? product.image : '');
  const priceCalc = product ? calculateItemPrice(product, quantity) : { unitPrice: 0, total: 0, discountApplied: 0 };
  const productReviews = product ? reviews.filter(r => r.productId === product.id) : [];

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !newReviewName || !newReviewComment) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId: product.id,
      userName: newReviewName,
      userRole: 'Müştəri',
      rating: newReviewRating,
      date: 'İndicə',
      comment: newReviewComment,
      isVerifiedBuyer: true
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setNewReviewName('');
    setNewReviewComment('');
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleAddToCart = () => {
    if (!product) return;
    onAddToCart(product, quantity);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-900 text-white flex items-center justify-between gap-2 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="px-2.5 py-0.5 bg-orange-600 text-white text-[11px] font-black rounded-md uppercase tracking-wider">
                  {product.brand}
                </span>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">SKU: {product.sku}</span>
                <span className="text-[11px] text-orange-300 font-medium truncate">{product.subcategory}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer relative"
                  title="Linki kopyala"
                >
                  <Share2 className="w-4 h-4" />
                  {isCopied && (
                    <span className="absolute -bottom-8 right-0 bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                      Kopyalandı!
                    </span>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isInWishlist ? 'bg-red-500 text-white' : 'text-slate-300 hover:text-red-400 hover:bg-slate-800'
                  }`}
                  title="Bəyəndiklərimə əlavə et"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleComparison(product)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isInComparison ? 'bg-orange-600 text-white' : 'text-slate-300 hover:text-orange-400 hover:bg-slate-800'
                  }`}
                  title="Müqayisə et"
                >
                  <Scale className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left: Gallery & Badges */}
                <div className="space-y-3">
                  <div className="relative h-60 sm:h-72 md:h-80 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden group">
                    <img 
                      src={currentImage} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                    {/* Overlay Tags */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                      {product.tags && product.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className={`px-2.5 py-0.5 text-[10px] font-black rounded-lg shadow-md flex items-center gap-1 ${
                            tag === 'Zavod qiyməti' 
                              ? 'bg-orange-600 text-white' 
                              : tag === 'Endirim' 
                              ? 'bg-red-600 text-white' 
                              : 'bg-slate-950 text-white'
                          }`}
                        >
                          {tag === 'Zavod qiyməti' && <Sparkles className="w-2.5 h-2.5 text-yellow-300" />}
                          {tag}
                        </span>
                      ))}
                    </div>

                    {product.weightKg && (
                      <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
                        Çəki: {product.weightKg} kq / {product.unit}
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.galleryImages && product.galleryImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {product.galleryImages.map((img, idx) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                            currentImage === img ? 'border-orange-600 ring-2 ring-orange-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Trust Highlights */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold text-slate-800">100% Zavod Zəmanəti</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                      <span className="font-semibold text-slate-800">Kranla Sürətli Çatdırılma</span>
                    </div>
                  </div>
                </div>

                {/* Right: Info & Actions */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                      {product.name}
                    </h1>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs flex-wrap">
                      <div className="flex items-center text-orange-500 font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-slate-800">{product.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal ml-0.5">({product.reviewCount} rəy)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        Anbarda: {product.stockCount} {product.unit} mövcuddur
                      </span>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200 space-y-2.5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-black text-slate-950">
                        {formatPrice(priceCalc.unitPrice)}
                      </span>
                      <span className="text-xs text-slate-600 font-bold">/ {product.unit}</span>
                      {product.oldPrice && product.oldPrice > product.price && (
                        <span className="text-sm text-slate-400 line-through font-semibold">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    {/* Bulk pricing tiered table */}
                    {product.bulkTiers && product.bulkTiers.length > 0 && (
                      <div className="pt-2.5 border-t border-orange-200/80">
                        <div className="text-[11px] font-bold text-orange-950 mb-1.5 flex items-center gap-1">
                          <Package className="w-3.5 h-3.5 text-orange-600" />
                          <span>Toplu Sifariş Endirimləri:</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                          {product.bulkTiers.map((tier, idx) => (
                            <div 
                              key={idx}
                              className={`p-2 rounded-xl border text-[11px] transition-all ${
                                quantity >= tier.minQty 
                                  ? 'bg-orange-600 text-white border-orange-600 font-bold shadow-xs' 
                                  : 'bg-white text-slate-700 border-orange-200'
                              }`}
                            >
                              <div className="font-semibold">{tier.minQty}+ {product.unit}</div>
                              <div className={quantity >= tier.minQty ? 'text-orange-100' : 'text-orange-600 font-bold'}>
                                -{tier.discountPercent}% Endirim
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Add to Cart Action */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Sifariş Miqdarı ({product.unit}):</span>
                      <span className="text-slate-950 font-black text-sm">Yekun: {formatPrice(priceCalc.total)}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between sm:justify-center bg-slate-100 rounded-2xl border border-slate-200 p-1">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setQuantity(Math.max(product.minOrder || 1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <input
                          type="number"
                          value={quantity}
                          min={product.minOrder || 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setQuantity(Math.max(product.minOrder || 1, val));
                          }}
                          className="w-16 text-center text-base font-black text-slate-900 bg-transparent focus:outline-none"
                        />
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleAddToCart}
                        className={`flex-1 py-3 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                          isAddedRecently 
                            ? 'bg-emerald-600 text-white shadow-emerald-600/30' 
                            : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/30'
                        }`}
                      >
                        <AnimatePresence mode="wait">
                          {isAddedRecently ? (
                            <motion.div 
                              key="added"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-5 h-5 text-white" />
                              <span>Səbətə Əlavə Edildi!</span>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="add"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="flex items-center gap-2"
                            >
                              <ShoppingCart className="w-5 h-5" />
                              <span>Səbətə Əlavə Et ({formatPrice(priceCalc.total)})</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Tabs: Specs / Features / Reviews / Estimator */}
              <div className="border-t border-slate-200 pt-5">
                <div className="flex border-b border-slate-200 gap-4 sm:gap-6 text-xs font-bold overflow-x-auto whitespace-nowrap scrollbar-none pb-0.5">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'specs' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Texniki Parametrlər
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'features' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Üstünlükləri & Standartlar
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'reviews' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Usta Rəyləri ({productReviews.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('calc')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer shrink-0 ${
                      activeTab === 'calc' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Sürətli Sərfiyyat Hesabla
                  </button>
                </div>

                <div className="pt-4">
                  {/* Tab 1: Specs */}
                  {activeTab === 'specs' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 text-xs"
                    >
                      <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                        {product.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {product.specifications && Array.isArray(product.specifications) ? (
                          product.specifications.map((spec, sIdx) => (
                            <div key={sIdx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                              <span className="font-semibold text-slate-500">{spec.key}:</span>
                              <span className="font-bold text-slate-900 text-right">{spec.value}</span>
                            </div>
                          ))
                        ) : null}
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 2: Features */}
                  {activeTab === 'features' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3 text-xs"
                    >
                      <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-orange-950 font-bold flex items-center gap-2">
                        <Award className="w-4 h-4 text-orange-600" />
                        <span>Sertifikatlaşdırılmış Zavod Standartları:</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {product.features && product.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-slate-200 text-slate-800 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 3: Quick Estimator */}
                  {activeTab === 'calc' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 space-y-3.5 text-xs"
                    >
                      <div className="flex items-center gap-2 text-orange-950 font-bold">
                        <Layers className="w-4 h-4 text-orange-600" />
                        <span>Bu məhsul üzrə sahə tələbatını dərhal hesablayın:</span>
                      </div>
                      <p className="text-slate-600">
                        Obyektinizin sahəsini (m²) daxil edin, standart inşaat sərfiyyat norması ilə tələb olunan {product.unit} miqdarını çıxaraq:
                      </p>

                      <div className="flex items-center gap-3">
                        <label className="font-bold text-slate-800">Tikinti / Təmir Sahəsi (m²):</label>
                        <input
                          type="number"
                          value={areaInput}
                          min={1}
                          onChange={(e) => setAreaInput(Math.max(1, parseFloat(e.target.value) || 1))}
                          className="w-28 p-2 bg-white border border-slate-300 rounded-xl font-black text-slate-900 text-sm focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      {/* Estimate result */}
                      {(() => {
                        let factor = 1;
                        if (product.category === 'sement-quru') factor = 0.4;
                        else if (product.category === 'armatur-metal') factor = 0.85;
                        else if (product.category === 'kafel-metlax') factor = 1.08;
                        else if (product.category === 'boya-kimyevi') factor = 0.22;
                        else if (product.category === 'kerpic-blok') factor = 12.5;
                        else if (product.category === 'dam-izolyasiya') factor = 1.1;

                        const estimatedQty = Math.ceil(areaInput * factor);

                        return (
                          <div className="p-3.5 bg-white rounded-xl border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                            <div>
                              <span className="font-bold text-slate-700">Tövsiyə olunan miqdar: </span>
                              <span className="font-black text-orange-600 text-base">{estimatedQty} {product.unit}</span>
                              <span className="text-slate-400 text-[10px] ml-1.5">(+8% ehtiyat daxil)</span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => {
                                setQuantity(estimatedQty);
                                setActiveTab('specs');
                              }}
                              className="px-4 py-2 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors cursor-pointer text-center"
                            >
                              Sifariş Miqdarına Tətbiq Et
                            </motion.button>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}

                  {/* Tab 4: Reviews */}
                  {activeTab === 'reviews' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 text-xs"
                    >
                      {/* Reviews List */}
                      <div className="space-y-2.5">
                        {productReviews.length === 0 ? (
                          <p className="text-slate-500 py-3 text-center bg-slate-50 rounded-xl border border-slate-200">
                            Hələlik bu məhsula rəy bildirilməyib. İlk rəyi siz yazın!
                          </p>
                        ) : (
                          productReviews.map((rev) => (
                            <div key={rev.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">{rev.userName}</span>
                                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">{rev.userRole}</span>
                                  {rev.isVerifiedBuyer && (
                                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                                      <Check className="w-3 h-3" /> Təsdiqlənmiş Alıcı
                                    </span>
                                  )}
                                </div>
                                <span className="text-slate-400 text-[10px]">{rev.date}</span>
                              </div>
                              <div className="flex text-amber-500 text-xs">
                                {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                              </div>
                              <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Review Form */}
                      <form onSubmit={handleAddReview} className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-3">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MessageSquare className="w-4 h-4 text-orange-600" />
                          <span>Rəy və Təcrübənizi Bölüşün</span>
                        </div>

                        {reviewSubmitted && (
                          <div className="p-2.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span>Rəyiniz qeydə alındı! Təşəkkür edirik.</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-medium mb-1">Adınız / Usta Titulunuz</label>
                            <input
                              type="text"
                              value={newReviewName}
                              onChange={(e) => setNewReviewName(e.target.value)}
                              placeholder="Məs: Rəşad Usta və ya Mehman M."
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 font-medium"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 font-medium mb-1">Qiymətləndirmə</label>
                            <select
                              value={newReviewRating}
                              onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500 font-medium"
                            >
                              <option value={5}>★★★★★ (5/5 Əla)</option>
                              <option value={4}>★★★★☆ (4/5 Yaxşı)</option>
                              <option value={3}>★★★☆☆ (3/5 Orta)</option>
                              <option value={2}>★★☆☆☆ (2/5 Zəif)</option>
                              <option value={1}>★☆☆☆☆ (1/5 Narazı)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-600 font-medium mb-1">Rəyiniz</label>
                          <textarea
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            placeholder="Materialın keyfiyyəti, tətbiq rahatlığı və çatdırılma barədə..."
                            rows={2}
                            className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                            required
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors cursor-pointer"
                        >
                          Rəyi Dərc Et
                        </motion.button>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
