import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Truck, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { CartItem, User, DeliveryType } from '../types';
import { formatPrice, calculateItemPrice, calculateEstimatedDelivery } from '../utils/helpers';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: User | null;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: (appliedPromo: { code: string; discount: number }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('standard');
  const [useBonusPoints, setUseBonusPoints] = useState(false);

  // Calculate totals
  let subtotal = 0;
  let regularSubtotal = 0;
  let totalWeightKg = 0;

  cartItems.forEach(item => {
    const calc = calculateItemPrice(item.product, item.quantity);
    subtotal += calc.total;
    regularSubtotal += item.product.price * item.quantity;
    totalWeightKg += (item.product.weightKg || 1) * item.quantity;
  });

  const bulkSavings = regularSubtotal - subtotal;
  const deliveryInfo = calculateEstimatedDelivery(totalWeightKg, deliveryType);
  const bonusDiscount = (useBonusPoints && currentUser) ? Math.min(currentUser.bonusPoints, subtotal * 0.3) : 0;
  const finalTotal = Math.max(0, subtotal - promoDiscount - bonusDiscount + deliveryInfo.cost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'USTA2026' || clean === 'INSAAT10') {
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoMessage('Təbriklər! 10% xüsusi usta endirimi tətbiq edildi.');
    } else if (clean === 'ZAVOD') {
      const discount = 15;
      setPromoDiscount(discount);
      setPromoMessage('15 ₼ birbaşa zavod endirimi tətbiq edildi.');
    } else {
      setPromoMessage('Kupon kodu etibarsızdır.');
      setPromoDiscount(0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Drawer Sheet */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                <h2 className="text-sm font-extrabold">Səbətiniz ({cartItems.length} növ məhsul)</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 space-y-3"
                >
                  <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto animate-bounce" />
                  <h3 className="text-sm font-bold text-slate-800">Səbətiniz boşdur</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Kataloqdan sement, armatur, kərpic və ya digər tikinti materiallarını seçib əlavə edin.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 bg-orange-600 text-white text-xs font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-xs cursor-pointer"
                  >
                    Məhsullara Bax
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Item List */}
                  <div className="space-y-3">
                    <AnimatePresence initial={false}>
                      {cartItems.map((item) => {
                        const calc = calculateItemPrice(item.product, item.quantity);
                        const itemWeight = ((item.product.weightKg || 1) * item.quantity).toFixed(1);

                        return (
                          <motion.div 
                            key={item.product.id}
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.9, marginBottom: 0 }}
                            transition={{ duration: 0.2 }}
                            className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 items-center"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {item.product.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                                <span>{formatPrice(calc.unitPrice)}/{item.product.unit}</span>
                                <span>•</span>
                                <span>{itemWeight} kq</span>
                              </div>

                              {calc.discountPercent > 0 && (
                                <span className="inline-block mt-0.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.2 rounded-md">
                                  Toplu endirim: -{calc.discountPercent}%
                                </span>
                              )}

                              {/* Quantity Stepper & Price in Item */}
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5">
                                  <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </motion.button>
                                  <span className="w-8 text-center text-xs font-bold text-slate-800">
                                    {item.quantity}
                                  </span>
                                  <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center text-slate-600 hover:text-slate-900 cursor-pointer"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </motion.button>
                                </div>

                                <div className="flex items-center gap-3">
                                  <span className="font-extrabold text-xs text-slate-900">
                                    {formatPrice(calc.total)}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => onRemoveItem(item.product.id)}
                                    className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                                    title="Sil"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Delivery Weight & Type */}
                  <div className="p-3 bg-slate-100 rounded-2xl space-y-2 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-orange-600" />
                        Çatdırılma Yükü:
                      </span>
                      <span className="text-orange-600">{totalWeightKg.toFixed(0)} kq ({deliveryInfo.vehicle})</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setDeliveryType('standard')}
                        className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                          deliveryType === 'standard'
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-[11px]">Standart</div>
                        <div className={`text-[10px] ${deliveryType === 'standard' ? 'text-orange-100' : 'text-slate-500'}`}>
                          24-48 saat ({formatPrice(calculateEstimatedDelivery(totalWeightKg, 'standard').cost)})
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryType('express_2h')}
                        className={`p-2 rounded-xl border text-left transition-colors cursor-pointer ${
                          deliveryType === 'express_2h'
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-[11px] flex items-center gap-1">
                          <span>Ekspres</span>
                          <span className="text-[9px] bg-orange-400 text-slate-950 px-1 py-0.2 rounded font-black">2-4 saat</span>
                        </div>
                        <div className={`text-[10px] ${deliveryType === 'express_2h' ? 'text-orange-100' : 'text-slate-500'}`}>
                          {formatPrice(calculateEstimatedDelivery(totalWeightKg, 'express_2h').cost)}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Promo Code Form */}
                  <form onSubmit={handleApplyPromo} className="space-y-1.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promokod (məs: USTA2026)"
                          className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 font-medium uppercase"
                        />
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        Tətbiq et
                      </motion.button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] font-semibold ${promoDiscount > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {promoMessage}
                      </p>
                    )}
                  </form>

                  {/* Bonus Points Toggle if user logged in */}
                  {currentUser && currentUser.bonusPoints > 0 && (
                    <label className="p-3 bg-orange-50/80 rounded-2xl border border-orange-200 flex items-center justify-between cursor-pointer text-xs">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={useBonusPoints}
                          onChange={(e) => setUseBonusPoints(e.target.checked)}
                          className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                        />
                        <div>
                          <span className="font-bold text-orange-950">Bonus Balından İstifadə Et</span>
                          <p className="text-[10px] text-orange-700">Mövcud balans: {currentUser.bonusPoints} bal</p>
                        </div>
                      </div>
                      {useBonusPoints && (
                        <span className="font-bold text-emerald-700">-{formatPrice(bonusDiscount)}</span>
                      )}
                    </label>
                  )}
                </>
              )}
            </div>

            {/* Footer Checkout Calculation Summary */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Məhsulların cəmi:</span>
                    <span className="font-semibold text-slate-800">{formatPrice(subtotal)}</span>
                  </div>
                  {bulkSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Toplu alış qənaəti:</span>
                      <span>-{formatPrice(bulkSavings)}</span>
                    </div>
                  )}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promokod endirimi:</span>
                      <span>-{formatPrice(promoDiscount)}</span>
                    </div>
                  )}
                  {bonusDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Bonus balı endirimi:</span>
                      <span>-{formatPrice(bonusDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Çatdırılma xidməti:</span>
                    <span className="font-semibold text-slate-800">{formatPrice(deliveryInfo.cost)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Yekun Ödəniləcək:</span>
                    <span className="text-xl font-black text-slate-900">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => onProceedToCheckout({ code: promoCode, discount: promoDiscount + bonusDiscount })}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Sifarişi Rəsmiləşdir</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
