import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Truck, 
  CreditCard, 
  Banknote, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User as UserIcon, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Sparkles,
  PackageCheck
} from 'lucide-react';
import { CartItem, User, Order, PaymentMethod, DeliveryType, OrderItem } from '../types';
import { formatPrice, calculateItemPrice, calculateEstimatedDelivery } from '../utils/helpers';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currentUser: User | null;
  appliedDiscount: number;
  promoCode: string;
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currentUser,
  appliedDiscount,
  promoCode,
  onOrderCompleted
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Delivery details
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '+994 ');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [city, setCity] = useState(currentUser?.addresses?.[0]?.city || 'Bakı');
  const [address, setAddress] = useState(currentUser?.addresses?.[0]?.fullAddress || '');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('standard');

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card_online');
  const [taksitMonth, setTaksitMonth] = useState<number>(3);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Created order state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Calculate totals
  let subtotal = 0;
  let totalWeightKg = 0;
  const orderItems: OrderItem[] = cartItems.map(item => {
    const calc = calculateItemPrice(item.product, item.quantity);
    subtotal += calc.total;
    totalWeightKg += (item.product.weightKg || 1) * item.quantity;
    return {
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      price: calc.unitPrice,
      unit: item.product.unit,
      quantity: item.quantity,
      total: calc.total
    };
  });

  const deliveryInfo = calculateEstimatedDelivery(totalWeightKg, deliveryType);
  const finalTotal = Math.max(0, subtotal - appliedDiscount + deliveryInfo.cost);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderNumber = 'INS-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      date: new Date().toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' }),
      userId: currentUser?.id,
      customerName,
      customerPhone,
      customerEmail,
      items: orderItems,
      subtotal,
      discount: appliedDiscount,
      deliveryFee: deliveryInfo.cost,
      total: finalTotal,
      totalWeightKg,
      status: 'Gözləyir',
      deliveryType,
      deliveryAddress: address,
      deliveryCity: city,
      deliveryNotes,
      paymentMethod,
      isPaid: paymentMethod === 'card_online',
      taksitMonth: paymentMethod === 'birkart_taksit' ? taksitMonth : undefined,
      trackingUpdates: [
        {
          status: 'Gözləyir',
          timestamp: 'İndicə',
          description: 'Sifariş sistemdə qeydə alındı. Tikinti anbarına yönləndirildi.'
        }
      ]
    };

    setCompletedOrder(newOrder);
    onOrderCompleted(newOrder);
    setStep(3);

    // Trigger celebratory confetti blast
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step !== 3 ? onClose : undefined}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with progress */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                <h2 className="text-sm font-extrabold">
                  {step === 3 ? 'Sifariş Uğurla Rəsmiləşdirildi!' : 'Sifarişin Rəsmiləşdirilməsi'}
                </h2>
              </div>
              {step !== 3 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>

        {/* Steps indicator */}
        {step !== 3 && (
          <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 text-xs font-bold text-center">
            <div className={`py-2.5 flex items-center justify-center gap-2 ${step === 1 ? 'text-orange-600 bg-white border-b-2 border-orange-600' : 'text-slate-400'}`}>
              <div className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">1</div>
              <span>Ünvan və Çatdırılma</span>
            </div>
            <div className={`py-2.5 flex items-center justify-center gap-2 ${step === 2 ? 'text-orange-600 bg-white border-b-2 border-orange-600' : 'text-slate-400'}`}>
              <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">2</div>
              <span>Ödəniş və Təsdiq</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: Delivery Details */}
          {step === 1 && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Çatdırılma və Əlaqə Məlumatları</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ad və Soyad *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Məs: Cavidan Vəlizadə"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Əlaqə Telefonu *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+994 50 123 45 67"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Şəhər / Rayon *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="Bakı">Bakı və Ətraf qəsəbələr</option>
                    <option value="Sumqayıt">Sumqayıt</option>
                    <option value="Xırdalan">Xırdalan / Masazır</option>
                    <option value="Gəncə">Gəncə</option>
                    <option value="Region">Digər Region</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Tikinti Sahəsi / Dəqiq Ünvan *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Məs: Mərdəkan qəsəbəsi, Mayak yolu, ev 14"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                      required
                    />
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>
              </div>

              {/* Delivery Vehicle Selection */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Çatdırılma Xidməti və Nəqliyyat</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    onClick={() => setDeliveryType('standard')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      deliveryType === 'standard'
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold flex justify-between">
                      <span>Standart Yük Nəqliyyatı</span>
                      <span className="text-orange-700">{formatPrice(deliveryInfo.cost)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-normal">Bortlu Qazel və ya yük avtomobili ilə ünvana çatdırılma</p>
                  </div>

                  <div
                    onClick={() => setDeliveryType('crane_truck')}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      deliveryType === 'crane_truck'
                        ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold flex justify-between">
                      <span>Kran-Manipulyator</span>
                      <span className="text-orange-700">45.00 ₼</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-normal">Ağır paletlərin kranla həyətə boşaldılması daxil</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Kuryer və ya Sürücü üçün Qeyd (İstəyə görə)</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Məs: Darvazanın qarşısında boşaldılsın, gəlməzdən 30 dəq əvvəl zəng edin..."
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-sm">Ödəniş Üsulunu Seçin</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Online Card */}
                <div
                  onClick={() => setPaymentMethod('card_online')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card_online'
                      ? 'border-orange-600 bg-orange-50 text-orange-950 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    <CreditCard className="w-4 h-4 text-orange-600" />
                    <span>Onlayn Kartla Ödəniş</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Visa, Mastercard və digər bank kartları</p>
                </div>

                {/* Taksit */}
                <div
                  onClick={() => setPaymentMethod('birkart_taksit')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'birkart_taksit'
                      ? 'border-orange-600 bg-orange-50 text-orange-950 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>BirKart / TamKart Taksit</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Faizsiz 3, 6 və ya 12 aya bölün</p>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-orange-600 bg-orange-50 text-orange-950 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    <Banknote className="w-4 h-4 text-slate-700" />
                    <span>Qapıda Nağd Ödəniş</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Malı təhvil alarkən sürücüyə nağd ödəyin</p>
                </div>

                {/* Card on Delivery */}
                <div
                  onClick={() => setPaymentMethod('card_on_delivery')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card_on_delivery'
                      ? 'border-orange-600 bg-orange-50 text-orange-950 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    <CreditCard className="w-4 h-4 text-slate-700" />
                    <span>Qapıda POS-Terminal ilə</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Sürücü POS-terminal ilə ünvana gələcək</p>
                </div>
              </div>

              {/* Taksit Months Selector if chosen */}
              {paymentMethod === 'birkart_taksit' && (
                <div className="p-3.5 bg-orange-50/70 border border-orange-200 rounded-2xl space-y-2">
                  <label className="font-bold text-orange-950">Taksit Müddətini Seçin:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 6, 12].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setTaksitMonth(m)}
                        className={`p-2 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          taksitMonth === m
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        <div>{m} Ay</div>
                        <div className="text-[10px] font-normal">{formatPrice(finalTotal / m)} / ay</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card inputs mock for online card */}
              {paymentMethod === 'card_online' && (
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Kart Nömrəsi</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4169 •••• •••• ••••"
                      maxLength={19}
                      className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">Bitmə Tarixi</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-center outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 font-medium mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        maxLength={3}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl font-mono text-center outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Recap */}
              <div className="p-3.5 bg-slate-100 rounded-2xl space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Məhsullar ({orderItems.length}):</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Xüsusi Endirim:</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Çatdırılma:</span>
                  <span className="font-semibold">{formatPrice(deliveryInfo.cost)}</span>
                </div>
                <div className="border-t border-slate-200 pt-1.5 flex justify-between font-bold text-sm text-slate-900">
                  <span>Yekun Məbləğ:</span>
                  <span className="text-slate-900 font-black">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Order Completed Success Screen */}
          {step === 3 && completedOrder && (
            <div className="text-center py-6 space-y-4 text-xs">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Sifarişiniz Uğurla Qəbul Edildi!</h3>
                <p className="text-slate-500 mt-1">
                  Sifariş Nömrəsi: <span className="font-black text-orange-600 text-sm">#{completedOrder.orderNumber}</span>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Müştəri:</span>
                  <span className="font-bold text-slate-800">{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Çatdırılma Ünvanı:</span>
                  <span className="font-bold text-slate-800">{completedOrder.deliveryAddress}, {completedOrder.deliveryCity}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Ödəniş Üsulu:</span>
                  <span className="font-bold text-slate-800">
                    {completedOrder.paymentMethod === 'card_online' && 'Onlayn Kartla'}
                    {completedOrder.paymentMethod === 'birkart_taksit' && `BirKart Taksit (${completedOrder.taksitMonth} ay)`}
                    {completedOrder.paymentMethod === 'cash_on_delivery' && 'Qapıda Nağd'}
                    {completedOrder.paymentMethod === 'card_on_delivery' && 'Qapıda POS-Terminal'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-900 font-bold">Ödənilən Məbləğ:</span>
                  <span className="text-slate-900 font-black text-sm">{formatPrice(completedOrder.total)}</span>
                </div>
              </div>

              <p className="text-slate-500 text-[11px] max-w-sm mx-auto">
                Operatorlarımız 15 dəqiqə ərzində sizinlə əlaqə saxlayaraq kran və ya yük maşınının hərəkət qrafikini təsdiqləyəcək.
              </p>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all inline-flex items-center gap-2"
              >
                <span>Alış-verişə Davam Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step !== 3 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>
            ) : (
              <div></div>
            )}

            {step === 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  if (!customerName || !customerPhone || !address) {
                    alert('Zəhmət olmasa tələb olunan xanaları doldurun.');
                    return;
                  }
                  setStep(2);
                }}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-orange-600/20 transition-colors"
              >
                <span>Ödənişə Keçid</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handlePlaceOrder}
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md shadow-orange-600/20 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sifarişi Tamamla ({formatPrice(finalTotal)})</span>
              </motion.button>
            )}
          </div>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
