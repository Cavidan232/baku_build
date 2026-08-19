import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Scale, 
  User as UserIcon, 
  Phone, 
  Clock, 
  Truck, 
  Calculator, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  FileText,
  LogOut,
  Package,
  MapPin,
  Flame
} from 'lucide-react';
import { Product, User, Category, ActiveTab } from '../types';
import { formatPrice } from '../utils/helpers';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentUser?: User | null;
  cartCount?: number;
  cartTotal?: number;
  wishlistCount?: number;
  comparisonCount?: number;
  activeTab?: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenAuthModal?: (mode: 'login' | 'register') => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenComparison?: () => void;
  onOpenProfile?: () => void;
  onOpenCalculator?: () => void;
  onOpenB2B?: () => void;
  onOpenB2BQuote?: () => void;
  onSelectCategory?: (categoryId: string) => void;
  onSearch?: (query: string) => void;
  products?: Product[];
  categories?: Category[];
  onSelectProduct?: (product: Product) => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser = null,
  cartCount = 0,
  cartTotal = 0,
  wishlistCount = 0,
  comparisonCount = 0,
  activeTab = 'catalog',
  setActiveTab = (_tab: ActiveTab) => {},
  onOpenAuth,
  onOpenAuthModal,
  onOpenCart = () => {},
  onOpenWishlist = () => {},
  onOpenComparison = () => {},
  onOpenProfile = () => {},
  onOpenCalculator = () => {},
  onOpenB2B,
  onOpenB2BQuote,
  onSelectCategory = (_catId: string) => {},
  onSearch = (_query: string) => {},
  products = [],
  categories = [],
  onSelectProduct = (_prod: Product) => {},
  onLogout = () => {}
}) => {
  const handleOpenAuthAction = (mode: 'login' | 'register') => {
    if (onOpenAuth) onOpenAuth(mode);
    else if (onOpenAuthModal) onOpenAuthModal(mode);
  };

  const handleOpenB2BAction = () => {
    if (onOpenB2B) onOpenB2B();
    else if (onOpenB2BQuote) onOpenB2BQuote();
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = searchQuery.trim()
    ? products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setIsSearchFocused(false);
    setActiveTab('catalog');
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200 font-sans">
      {/* Top utility notification bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex items-center gap-1.5 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-bold text-white">*2026</span>
              <span className="hidden sm:inline text-slate-400">/ +994 (12) 555-20-26</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>Hər gün: 08:00 - 20:00</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Truck className="w-3.5 h-3.5 text-orange-500" />
              <span>Bakı və Abşeron üzrə 2 saatadək kranlı çatdırılma</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <button 
              onClick={handleOpenB2BAction}
              className="flex items-center gap-1.5 text-slate-300 hover:text-orange-400 transition-colors cursor-pointer font-medium"
            >
              <FileText className="w-3.5 h-3.5 text-orange-500" />
              <span>Toplu Alış və Smeta (B2B)</span>
            </button>
            <div className="hidden sm:block text-slate-700">|</div>
            <div className="flex items-center gap-1 text-slate-300">
              <span className="font-bold text-orange-400">AZN (₼)</span>
              <span className="text-slate-400">• AZ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Menyunu aç"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <div 
          onClick={() => { setActiveTab('catalog'); onSelectCategory('all'); }}
          className="cursor-pointer select-none"
        >
          <BrandLogo variant="dark" size="md" />
        </div>

        {/* Search Bar with live Auto-suggest */}
        <div ref={searchRef} className="relative flex-1 max-w-xl mx-4 hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Məhsul adı, marka (Norm, Ağdağ, Knauf), armatur və ya kod axtar..."
              className="w-full pl-11 pr-24 py-2.5 bg-slate-100 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-900 placeholder-slate-400 font-normal"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-1.5 px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
            >
              Axtar
            </button>
          </form>

          {/* Search dropdown suggestions */}
          <AnimatePresence>
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden"
              >
                {filteredSuggestions.length > 0 ? (
                  <div>
                    <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 flex justify-between">
                      <span>Axtarış nəticələri ({filteredSuggestions.length})</span>
                      <span className="text-orange-600 font-medium">Enter basaraq hamısına baxın</span>
                    </div>
                    {filteredSuggestions.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod);
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="p-3 hover:bg-orange-50/70 flex items-center gap-3 cursor-pointer border-b border-slate-100 last:border-0 transition-colors"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{prod.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                            <span className="font-semibold text-orange-700">{prod.brand}</span>
                            <span>•</span>
                            <span>{prod.subcategory}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs font-extrabold text-slate-900">{formatPrice(prod.price)}</div>
                          <span className="text-[10px] text-slate-500">/ {prod.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-5 text-center text-xs text-slate-500">
                    "<span className="font-semibold text-slate-800">{searchQuery}</span>" üzrə məhsul tapılmadı.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action icons & Account */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Construction Estimator Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCalculator}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
            title="Tikinti Materialı Kalkulyatoru"
          >
            <Calculator className="w-4 h-4 text-orange-600" />
            <span className="hidden xl:inline">Kalkulyator</span>
          </motion.button>

          {/* Comparison */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenComparison}
            className="relative p-2 text-slate-600 hover:text-orange-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Müqayisə et"
          >
            <Scale className="w-5 h-5" />
            {comparisonCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-slate-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {comparisonCount}
              </span>
            )}
          </motion.button>

          {/* Wishlist */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-600 hover:text-red-500 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Bəyəndiklərim"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </motion.button>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="flex items-center gap-2.5 px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="text-[10px] text-orange-100 font-medium">Səbət</div>
              <div className="text-xs font-extrabold">{formatPrice(cartTotal)}</div>
            </div>
          </motion.button>

          {/* User Account / Login button */}
          <div ref={userMenuRef} className="relative">
            {currentUser ? (
              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 cursor-pointer transition-colors"
                >
                  <div className="w-7 h-7 bg-orange-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block text-left text-xs pr-1">
                    <p className="font-bold text-slate-800 leading-none truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-orange-600 font-semibold mt-0.5">
                      {currentUser.role === 'contractor' ? 'Usta / B2B' : 'Müştəri'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </motion.button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 origin-top-right"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-orange-800 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100">
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span>Bonus Balansı: {currentUser.bonusPoints} bal (₼)</span>
                        </div>
                      </div>

                      <button
                        onClick={() => { onOpenProfile(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <span>Şəxsi Kabinet və Məlumatlar</span>
                      </button>

                      <button
                        onClick={() => { setActiveTab('orders'); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        <span>Sifarişlərim və İzləmə</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Çıxış et</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenAuthAction('login')}
                  className="text-slate-600 hover:text-orange-600 text-sm font-medium px-2 py-1 transition-colors cursor-pointer"
                >
                  Giriş
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenAuthAction('register')}
                  className="bg-orange-600 text-white px-3.5 py-2 rounded-lg hover:bg-orange-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Qeydiyyat
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <div className="bg-slate-900 text-white text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto scrollbar-none">
          {/* Mega Menu Toggle */}
          <div className="relative py-2.5 shrink-0">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
              <span>Bütün Kateqoriyalar</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* Mega Categories dropdown */}
            <AnimatePresence>
              {isCategoryMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800 origin-top-left"
                >
                  <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Tikinti Bölmələri
                  </div>
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsCategoryMenuOpen(false);
                        setActiveTab('catalog');
                      }}
                      className="px-4 py-2.5 hover:bg-orange-50 flex items-center justify-between cursor-pointer group transition-colors border-b border-slate-50 last:border-0"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform"></div>
                        <span className="font-bold text-xs text-slate-800 group-hover:text-orange-700">{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">({cat.itemCount})</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Category Chips / Navigation items */}
          <nav className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto whitespace-nowrap pl-4">
            <button
              onClick={() => { onSelectCategory('all'); setActiveTab('catalog'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'catalog' ? 'bg-slate-800 text-orange-400 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Kataloq
            </button>
            <button
              onClick={() => { onSelectCategory('sement-quru'); setActiveTab('catalog'); }}
              className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Sement & Quru Qarışıqlar
            </button>
            <button
              onClick={() => { onSelectCategory('armatur-metal'); setActiveTab('catalog'); }}
              className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Armatur & Metal
            </button>
            <button
              onClick={() => { onSelectCategory('kerpic-blok'); setActiveTab('catalog'); }}
              className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Kərpic & Blok
            </button>
            <button
              onClick={() => { onSelectCategory('dam-izolyasiya'); setActiveTab('catalog'); }}
              className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              İzolyasiya & Dam
            </button>
            <button
              onClick={() => { onSelectCategory('boya-kimyevi'); setActiveTab('catalog'); }}
              className="px-2.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Boya & Lak
            </button>
            <button
              onClick={() => { setActiveTab('deals'); }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'deals' ? 'bg-orange-600 text-white font-bold' : 'text-orange-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Günün Kampaniyaları</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="p-3 bg-slate-100 border-t border-slate-200 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Məhsul və ya marka axtar..."
            className="w-full pl-9 pr-20 py-2 bg-white border border-slate-300 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <button
            type="submit"
            className="absolute right-1 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded-full"
          >
            Axtar
          </button>
        </form>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Content Sheet */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative z-10 w-4/5 max-w-sm bg-white h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <BrandLogo variant="dark" size="sm" />
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {currentUser ? (
                  <div className="p-3.5 my-3 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-orange-700 font-semibold">{currentUser.role === 'contractor' ? 'Usta / B2B Hesabı' : 'Fərdi Alıcı'}</p>
                    <button 
                      onClick={() => { onOpenProfile(); setIsMobileMenuOpen(false); }}
                      className="mt-2 text-xs text-orange-800 font-bold underline cursor-pointer"
                    >
                      Profilə keçid
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 my-3">
                    <button
                      onClick={() => { handleOpenAuthAction('login'); setIsMobileMenuOpen(false); }}
                      className="py-2 text-center text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors cursor-pointer"
                    >
                      Giriş
                    </button>
                    <button
                      onClick={() => { handleOpenAuthAction('register'); setIsMobileMenuOpen(false); }}
                      className="py-2 text-center text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors cursor-pointer"
                    >
                      Qeydiyyat
                    </button>
                  </div>
                )}

                <div className="py-2 space-y-1">
                  <button
                    onClick={() => { onOpenCalculator(); setIsMobileMenuOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 text-xs font-bold flex items-center gap-2.5 text-slate-800 cursor-pointer"
                  >
                    <Calculator className="w-4 h-4 text-orange-600" />
                    <span>Tikinti Materialı Hesablayıcısı</span>
                  </button>
                  <button
                    onClick={() => { handleOpenB2BAction(); setIsMobileMenuOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 text-xs font-bold flex items-center gap-2.5 text-slate-800 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-orange-600" />
                    <span>Toplu Alış / Smeta Təklifi</span>
                  </button>
                  <button
                    onClick={() => { setActiveTab('orders'); setIsMobileMenuOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 text-xs font-bold flex items-center gap-2.5 text-slate-800 cursor-pointer"
                  >
                    <Package className="w-4 h-4 text-slate-600" />
                    <span>Sifarişlərimi İzlə</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kateqoriyalar</p>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCategory(c.id);
                        setActiveTab('catalog');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left py-2 px-2 text-xs font-medium text-slate-700 hover:text-orange-600 flex justify-between cursor-pointer"
                    >
                      <span>{c.name}</span>
                      <span className="text-slate-400 font-normal">({c.itemCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p className="font-bold text-slate-800">24/7 Dəstək: *2026</p>
                <p>Bakı şəh., Ziya Bünyadov pr. 118</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
