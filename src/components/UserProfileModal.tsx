import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User as UserIcon, 
  Package, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Mail, 
  Calendar, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  LogOut,
  FileCheck,
  Award
} from 'lucide-react';
import { User, Order, Address } from '../types';
import { formatPrice } from '../utils/helpers';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
  currentUser?: User | null;
  orders: Order[];
  onLogout?: () => void;
  onUpdateUser: (updatedUser: User) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  currentUser,
  orders = [],
  onLogout,
  onUpdateUser
}) => {
  const activeUser = user || currentUser;

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'bonus'>('orders');
  const [newAddressModal, setNewAddressModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCity, setNewCity] = useState('Bakı');
  const [newFullAddress, setNewFullAddress] = useState('');
  const [newContactPhone, setNewContactPhone] = useState(activeUser?.phone || '');
  const [requiresCrane, setRequiresCrane] = useState(false);

  if (!isOpen || !activeUser) return null;

  const userOrders = orders.filter(
    o => (activeUser.email && o.customerEmail === activeUser.email) || (activeUser.id && o.userId === activeUser.id)
  );

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newFullAddress) return;

    const newAddr: Address = {
      id: 'addr-' + Date.now(),
      title: newTitle,
      city: newCity,
      fullAddress: newFullAddress,
      contactName: activeUser.name,
      contactPhone: newContactPhone || activeUser.phone,
      requiresCrane: requiresCrane,
      isDefault: (activeUser.addresses?.length || 0) === 0
    };

    const updated = {
      ...activeUser,
      addresses: [...(activeUser.addresses || []), newAddr]
    };
    onUpdateUser(updated);
    setNewAddressModal(false);
    setNewTitle('');
    setNewFullAddress('');
  };

  return (
    <AnimatePresence>
      {isOpen && activeUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
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
            className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-orange-600/20">
                  {activeUser.name ? activeUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{activeUser.name}</h2>
                    <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold rounded-lg uppercase">
                      {activeUser.role === 'contractor' ? 'Peşəkar Usta / B2B' : 'Fərdi Müştəri'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{activeUser.email} • {activeUser.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {onLogout && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-red-950/40 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Hesabdan çıxış"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Çıxış</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-orange-600 text-orange-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Sifarişlərim ({userOrders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-orange-600 text-orange-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Şəxsi Məlumatlar</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3.5 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-orange-600 text-orange-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Çatdırılma Ünvanlarım ({activeUser.addresses?.length || 0})</span>
          </button>
          <button
            onClick={() => setActiveTab('bonus')}
            className={`py-3.5 px-4 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bonus'
                ? 'border-orange-600 text-orange-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>Bonus & Usta Klubu</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {userOrders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-sm font-bold text-slate-800">Hələ ki, heç bir sifarişiniz yoxdur</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Kataloqdan ehtiyacınız olan tikinti materiallarını seçib səbətə əlavə edin.
                  </p>
                </div>
              ) : (
                userOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    {/* Order header */}
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">Sifariş #{order.orderNumber}</span>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500">{order.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-slate-400" />
                          <span>Ünvan: {order.deliveryAddress}, {order.deliveryCity}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                          order.status === 'Təhvil verildi'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Yoldadır'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                        <div className="text-right">
                          <div className="text-xs font-extrabold text-orange-600">{formatPrice(order.total)}</div>
                          <div className="text-[10px] text-slate-400">{order.items.length} növ məhsul</div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline progress indicator */}
                    <div className="p-4 border-b border-slate-100">
                      <div className="grid grid-cols-4 gap-2 text-center relative">
                        {['Gözləyir', 'Hazırlanır', 'Yoldadır', 'Təhvil verildi'].map((step, idx) => {
                          const steps = ['Gözləyir', 'Hazırlanır', 'Yoldadır', 'Təhvil verildi'];
                          const currentIdx = steps.indexOf(order.status);
                          const isDone = currentIdx >= idx;
                          const isCurrent = currentIdx === idx;

                          return (
                            <div key={step} className="flex flex-col items-center">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                                isDone 
                                  ? 'bg-orange-600 text-white shadow-xs' 
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              } ${isCurrent ? 'ring-4 ring-orange-100' : ''}`}>
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <span className={`text-[11px] font-semibold ${isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="p-4 space-y-2">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                          <div className="flex items-center gap-2.5">
                            <img src={item.productImage} alt={item.productName} className="w-9 h-9 object-cover rounded-xl border border-slate-200" />
                            <div>
                              <p className="font-semibold text-slate-800">{item.productName}</p>
                              <p className="text-[10px] text-slate-500">{item.quantity} {item.unit} x {formatPrice(item.price)}</p>
                            </div>
                          </div>
                          <span className="font-bold text-slate-900">{formatPrice(item.total)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">Şəxsi Məlumatlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-500 block mb-1">Ad və Soyad</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800">{activeUser.name}</div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Email</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800">{activeUser.email}</div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Əlaqə Nömrəsi</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800">{activeUser.phone || 'Göstərilməyib'}</div>
                </div>
                <div>
                  <label className="text-slate-500 block mb-1">Müştəri Statusu</label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-orange-800 flex items-center justify-between">
                    <span>{activeUser.role === 'contractor' ? 'Peşəkar Usta / Podratçı' : 'Fərdi Müştəri'}</span>
                    <Award className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
              </div>

              {activeUser.role === 'contractor' && (
                <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl mt-4">
                  <h4 className="text-xs font-bold text-orange-950 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-orange-600" />
                    <span>Şirkət / Briqada Rekvizitləri</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500">Şirkət adı:</span>
                      <p className="font-semibold text-slate-800">{activeUser.companyName || 'Məlumat yoxdur'}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">VÖEN:</span>
                      <p className="font-semibold text-slate-800">{activeUser.taxNumber || 'Məlumat yoxdur'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Yadda Saxlanılmış Çatdırılma Ünvanları</h3>
                <button
                  onClick={() => setNewAddressModal(true)}
                  className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Ünvan Əlavə Et</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(activeUser.addresses || []).map((addr) => (
                  <div key={addr.id} className="p-4 bg-white rounded-2xl border border-slate-200 relative">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-600" />
                        <span>{addr.title}</span>
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md font-semibold">
                          Əsas ünvan
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{addr.fullAddress}</p>
                    <p className="text-[11px] text-slate-500">{addr.city} {addr.district && `• ${addr.district}`}</p>
                    {addr.requiresCrane && (
                      <div className="mt-2 text-[10px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        <span>Kran-manipulyator tələb olunur</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add address form modal / collapse */}
              {newAddressModal && (
                <form onSubmit={handleAddAddress} className="p-5 bg-orange-50/50 border border-orange-200 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-slate-900">Yeni Çatdırılma / Tikinti Sahəsi Ünvanı</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block mb-1 text-slate-600">Ünvan Başlığı (məs: Mərdəkan Tikinti Sahəsi)</label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Məs: Bağ evi / Obyekt"
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:border-orange-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-slate-600">Şəhər / Rayon</label>
                      <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:border-orange-600"
                      >
                        <option value="Bakı">Bakı və Abşeron</option>
                        <option value="Sumqayıt">Sumqayıt</option>
                        <option value="Xırdalan">Xırdalan</option>
                        <option value="Gəncə">Gəncə</option>
                        <option value="Region">Digər Regionlar</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-slate-600">Tam Dəqiq Ünvan və ya Orientir</label>
                    <textarea
                      value={newFullAddress}
                      onChange={(e) => setNewFullAddress(e.target.value)}
                      placeholder="Küçə, məhəllə, qəsəbə, yaxınlıqdakı obyekt..."
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs outline-none focus:border-orange-600"
                      rows={2}
                      required
                    />
                  </div>
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresCrane}
                      onChange={(e) => setRequiresCrane(e.target.checked)}
                      className="rounded text-orange-600"
                    />
                    <span>Ağır materiallar üçün kran-manipulyator girişi mümkündür</span>
                  </label>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setNewAddressModal(false)}
                      className="px-3.5 py-2 text-xs text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
                    >
                      Ləğv et
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-xs cursor-pointer"
                    >
                      Yadda saxla
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Bonus Tab */}
          {activeTab === 'bonus' && (
            <div className="space-y-4">
              <div className="p-6 bg-slate-900 rounded-2xl text-white border border-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-orange-400 uppercase tracking-wider font-semibold">Cari Bonus Balansınız</p>
                    <h3 className="text-3xl font-extrabold mt-1 text-white">{activeUser.bonusPoints || 0} <span className="text-lg text-orange-400">Bal (₼)</span></h3>
                    <p className="text-xs text-slate-400 mt-2">1 Bal = 1 AZN endirim (Səbətdə ödəniş zamanı çıxılır)</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center border border-orange-500/30">
                    <Sparkles className="w-7 h-7" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 mb-3">Necə Bal Qazanmaq Olar?</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-orange-600">Hər Alışda 2% Keşbek</p>
                    <p className="text-slate-500 mt-1">Hər tamamlanan sifarişin məbləğinin 2%-i bala çevrilir.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-orange-600">Usta Tövsiyə Proqramı</p>
                    <p className="text-slate-500 mt-1">Dostunuz və ya müştəriniz sizin kodla aldıqda hər ikiniz 20 bal qazanırsınız.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="font-bold text-orange-600">Toplu Sifariş Bonusu</p>
                    <p className="text-slate-500 mt-1">1000 ₼-dən yuxarı hər sifarişə əlavə 30 hədiyyə bal.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
