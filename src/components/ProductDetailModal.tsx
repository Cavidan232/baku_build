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
  MessageSquare
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
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'calc'>('specs');
  const [isAddedRecently, setIsAddedRecently] = useState<boolean>(false);
  
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

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-lg">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-500 font-medium">SKU: {product.sku}</span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleWishlist(product)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isInWishlist ? 'bg-red-50 text-red-600' : 'hover:bg-slate-200 text-slate-600'
                  }`}
                  title="Bəyəndiklərimə əlavə et"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleComparison(product)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isInComparison ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-600'
                  }`}
                  title="Müqayisə et"
                >
                  <Scale className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-900 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left: Gallery */}
                <div className="space-y-3">
                  <div className="relative pt-[80%] rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden">
                    <img 
                      src={currentImage} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
                    />
                    {product.weightKg && (
                      <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                        Təxmini çəki: {product.weightKg} kq
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.galleryImages && product.galleryImages.length > 1 && (
                    <div className="flex gap-2">
                      {product.galleryImages.map((img, idx) => (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          key={idx}
                          onClick={() => setSelectedImage(img)}
                          className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            currentImage === img ? 'border-orange-600 ring-2 ring-orange-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Trust Badges */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                      <span className="font-medium">100% Zavod Sertifikatlı</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                      <span className="font-medium">Kranla ünvana boşaltma</span>
                    </div>
                  </div>
                </div>

                {/* Right: Info & Actions */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
                      {product.name}
                    </h1>
                    
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <div className="flex items-center text-orange-500 font-bold">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-slate-800">{product.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal ml-0.5">({product.reviewCount} rəy)</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Anbarda: {product.stockCount} {product.unit}
                      </span>
                    </div>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200/80 space-y-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-slate-900">
                        {formatPrice(priceCalc.unitPrice)}
                      </span>
                      <span className="text-xs text-slate-600 font-bold">/{product.unit}</span>
                      {product.oldPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    {/* Bulk pricing tiered table */}
                    {product.bulkTiers && product.bulkTiers.length > 0 && (
                      <div className="pt-2 border-t border-orange-200/60">
                        <div className="text-[11px] font-bold text-orange-950 mb-1">Toplu Qiymət Cədvəli:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {product.bulkTiers.map((tier, idx) => (
                            <div 
                              key={idx}
                              className={`p-2 rounded-xl border text-[11px] ${
                                quantity >= tier.minQty 
                                  ? 'bg-orange-600 text-white border-orange-600 font-bold' 
                                  : 'bg-white text-slate-700 border-orange-200'
                              }`}
                            >
                              <div>{tier.minQty}+ {product.unit}</div>
                              <div className={quantity >= tier.minQty ? 'text-orange-100' : 'text-orange-600 font-bold'}>
                                {formatPrice(tier.price)} (-{tier.discountPercent}%)
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity & Add to cart */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Sifariş Miqdarı ({product.unit}):</span>
                      <span>Məbləğ: {formatPrice(priceCalc.total)}</span>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex items-center bg-slate-100 rounded-2xl border border-slate-200 p-1">
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setQuantity(Math.max(product.minOrder || 1, quantity - 1))}
                          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1;
                            setQuantity(Math.max(product.minOrder || 1, val));
                          }}
                          className="w-14 text-center text-sm font-black text-slate-900 bg-transparent focus:outline-none"
                        />
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleAddToCart}
                        className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
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
                              <CheckCircle2 className="w-5 h-5" />
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

              {/* Bottom Tabs: Specs / Reviews / Estimator */}
              <div className="border-t border-slate-200 pt-6">
                <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'specs' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Xüsusiyyətlər & Təlimat
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'reviews' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Müştəri Rəyləri ({productReviews.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('calc')}
                    className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                      activeTab === 'calc' ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Sürətli Tələbat Hesabla
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
                      <p className="text-slate-600 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                          <div key={key} className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                            <span className="font-semibold text-slate-500">{key}:</span>
                            <span className="font-bold text-slate-800">{val}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 2: Quick Area Calculator for this product */}
                  {activeTab === 'calc' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80 space-y-3 text-xs"
                    >
                      <div className="flex items-center gap-2 text-orange-950 font-bold">
                        <Layers className="w-4 h-4 text-orange-600" />
                        <span>Layihəniz üçün bu məhsuldan nə qədər lazımdır?</span>
                      </div>
                      <p className="text-slate-600">
                        Sahəni (m²) və ya həcmi daxil edin, orta sərfiyyat norması ilə tələb olunan {product.unit} sayını təyin edək:
                      </p>

                      <div className="flex items-center gap-3">
                        <label className="font-bold text-slate-700">Təmir / Hörgü Sahəsi (m²):</label>
                        <input
                          type="number"
                          value={areaInput}
                          onChange={(e) => setAreaInput(Math.max(1, parseFloat(e.target.value) || 1))}
                          className="w-24 p-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-900"
                        />
                      </div>

                      {/* Estimate result */}
                      {(() => {
                        let factor = 1;
                        if (product.category === 'sement-quru') factor = 0.4;
                        else if (product.category === 'kafel-metlax') factor = 1.08;
                        else if (product.category === 'boya-lak') factor = 0.2;
                        else if (product.category === 'horgu-blok') factor = 12.5;

                        const estimatedQty = Math.ceil(areaInput * factor);

                        return (
                          <div className="p-3 bg-white rounded-xl border border-orange-200 flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-900">Tövsiyə olunan miqdar: </span>
                              <span className="font-black text-orange-600 text-sm">{estimatedQty} {product.unit}</span>
                              <span className="text-slate-400 text-[10px] ml-1">(+8% ehtiyat daxil)</span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setQuantity(estimatedQty);
                                setActiveTab('specs');
                              }}
                              className="px-3 py-1.5 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer"
                            >
                              Miqdara Tətbiq Et
                            </motion.button>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}

                  {/* Tab 3: Reviews */}
                  {activeTab === 'reviews' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 text-xs"
                    >
                      {/* Reviews List */}
                      <div className="space-y-3">
                        {productReviews.length === 0 ? (
                          <p className="text-slate-500 py-2">Hələlik rəy bildirilməyib. İlk rəyi siz yazın!</p>
                        ) : (
                          productReviews.map((rev) => (
                            <div key={rev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">{rev.userName}</span>
                                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">{rev.userRole}</span>
                                  {rev.isVerifiedBuyer && (
                                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                                      <Check className="w-3 h-3" /> Təsdiqlənmiş Alıcı
                                    </span>
                                  )}
                                </div>
                                <span className="text-slate-400 text-[10px]">{rev.date}</span>
                              </div>
                              <div className="flex text-orange-500 text-xs">
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
                          <span>Rəy və Qiymətləndirmə Əlavə Edin</span>
                        </div>

                        {reviewSubmitted && (
                          <div className="p-2.5 bg-emerald-100 text-emerald-800 font-bold rounded-xl flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            <span>Rəyiniz uğurla əlavə edildi!</span>
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-medium mb-1">Adınız və ya Usta Titulunuz</label>
                            <input
                              type="text"
                              value={newReviewName}
                              onChange={(e) => setNewReviewName(e.target.value)}
                              placeholder="Məs: Rəşad Usta"
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-slate-600 font-medium mb-1">Qiymət (Ulduz)</label>
                            <select
                              value={newReviewRating}
                              onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
                              className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
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
                          <label className="block text-slate-600 font-medium mb-1">Şərhiniz</label>
                          <textarea
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            placeholder="Materialın keyfiyyəti, tətbiq rahatlığı və ya çatdırılma haqqında fikirləriniz..."
                            rows={2}
                            className="w-full p-2 bg-white border border-slate-300 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                            required
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          type="submit"
                          className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
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
