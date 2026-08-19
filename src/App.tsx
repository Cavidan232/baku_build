import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Sparkles, 
  Layers, 
  Calculator, 
  Truck, 
  ShieldCheck, 
  Phone, 
  ArrowUpDown, 
  Grid, 
  List, 
  PackageSearch,
  CheckCircle2,
  X,
  Scale,
  Heart,
  Tag,
  ChevronDown,
  MoveHorizontal,
  LayoutGrid
} from 'lucide-react';
import { 
  Product, 
  User, 
  CartItem, 
  Order, 
  FilterState, 
  SortOption,
  Category
} from './types';
import { 
  CATEGORIES, 
  INITIAL_PRODUCTS, 
  BRANDS_LIST, 
  DEMO_USERS, 
  INITIAL_ORDERS 
} from './data/mockData';
import { Header } from './components/Header';
import { BannerHero } from './components/BannerHero';
import { CategoryGrid } from './components/CategoryGrid';
import { ProductCard } from './components/ProductCard';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConstructionCalculatorModal } from './components/ConstructionCalculatorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { WishlistModal } from './components/WishlistModal';
import { ComparisonModal } from './components/ComparisonModal';
import { B2BQuoteModal } from './components/B2BQuoteModal';
import { BrandsCarousel } from './components/BrandsCarousel';
import { DealsCarousel } from './components/DealsCarousel';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import { SwipeableProductCarousel } from './components/SwipeableProductCarousel';
import { CatalogCarouselView } from './components/CatalogCarouselView';
import { Footer } from './components/Footer';

export default function App() {
  // Products and Category State
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories] = useState<Category[]>(CATEGORIES);

  // User State
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS[0]); // default logged in as Usta Rəşad for immediate rich preview
  const [userOrders, setUserOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Cart, Wishlist, Comparison States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 20 }, // 20 bags Norm cement initially in cart
    { product: INITIAL_PRODUCTS[3], quantity: 5 }   // 5 bags Rokol tile adhesive
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[4]]);
  const [comparison, setComparison] = useState<Product[]>([INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2]]);

  // Filter and Search States
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    subcategory: '',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 1000,
    brand: '',
    inStockOnly: false,
    tags: []
  });

  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals Open State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isB2BOpen, setIsB2BOpen] = useState(false);

  // Checkout discounts
  const [checkoutPromo, setCheckoutPromo] = useState({ code: '', discount: 0 });

  // Toast Notification System
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name}" səbətə əlavə edildi (${quantity} ${product.unit})`);
  };

  const handleAddMultipleToCart = (items: { product: Product; quantity: number }[]) => {
    setCartItems(prev => {
      let updated = [...prev];
      items.forEach(newItem => {
        const idx = updated.findIndex(i => i.product.id === newItem.product.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + newItem.quantity };
        } else {
          updated.push({ product: newItem.product, quantity: newItem.quantity });
        }
      });
      return updated;
    });
    showToast(`${items.length} adda inşaat materialı səbətə əlavə edildi!`);
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`"${product.name}" bəyənilənlərdən çıxarıldı`);
        return prev.filter(p => p.id !== product.id);
      } else {
        showToast(`"${product.name}" bəyənilənlərə əlavə edildi`);
        return [...prev, product];
      }
    });
  };

  // Comparison operations
  const handleToggleComparison = (product: Product) => {
    setComparison(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        showToast(`"${product.name}" müqayisədən çıxarıldı`);
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 4) {
          showToast(`Eyni vaxtda ən çox 4 məhsulu müqayisə edə bilərsiniz.`);
          return prev;
        }
        showToast(`"${product.name}" müqayisəyə əlavə edildi`);
        return [...prev, product];
      }
    });
  };

  // Filter handlers
  const handleUpdateFilter = (updates: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      category: 'all',
      subcategory: '',
      searchQuery: '',
      minPrice: 0,
      maxPrice: 1000,
      brand: '',
      inStockOnly: false,
      tags: []
    });
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filterState.category !== 'all' && product.category !== filterState.category) {
        return false;
      }
      // Subcategory filter
      if (filterState.subcategory && product.subcategory !== filterState.subcategory) {
        return false;
      }
      // Search filter
      if (filterState.searchQuery) {
        const q = filterState.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesSku) {
          return false;
        }
      }
      // Price filter
      if (filterState.minPrice && product.price < filterState.minPrice) {
        return false;
      }
      if (filterState.maxPrice && product.price > filterState.maxPrice) {
        return false;
      }
      // Brand filter
      if (filterState.brand && product.brand !== filterState.brand) {
        return false;
      }
      // Stock filter
      if (filterState.inStockOnly && !product.inStock) {
        return false;
      }
      // Tags filter
      if (filterState.tags.length > 0) {
        const hasAnyTag = filterState.tags.some(t => product.tags.includes(t));
        if (!hasAnyTag) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'discount') {
        const discA = a.oldPrice ? (a.oldPrice - a.price) / a.oldPrice : 0;
        const discB = b.oldPrice ? (b.oldPrice - b.price) / b.oldPrice : 0;
        return discB - discA;
      }
      if (sortOption === 'name') return a.name.localeCompare(b.name, 'az');
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, filterState, sortOption]);

  // Handle Order Completed
  const handleOrderCompleted = (newOrder: Order) => {
    setUserOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    if (currentUser) {
      // Award bonus points (1% of total)
      const earned = Math.floor(newOrder.total * 0.02);
      setCurrentUser(prev => prev ? { ...prev, bonusPoints: prev.bonusPoints + earned } : null);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthInitialTab(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Top Header with Navigation, Live Search & User Controls */}
      <Header
        currentUser={currentUser}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        comparisonCount={comparison.length}
        categories={categories}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenB2B={() => setIsB2BOpen(true)}
        onSearch={(query) => handleUpdateFilter({ searchQuery: query })}
        onSelectCategory={(categoryId) => handleUpdateFilter({ category: categoryId, subcategory: '' })}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Hero Slider & Promotional Section */}
        {filterState.category === 'all' && !filterState.searchQuery && (
          <BannerHero
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onSelectCategory={(catId) => handleUpdateFilter({ category: catId })}
            onViewDeals={() => handleUpdateFilter({ tags: ['Endirim'] })}
          />
        )}

        {/* Daily Flash Deals & Factory Pricing Carousel */}
        {filterState.category === 'all' && !filterState.searchQuery && (
          <DealsCarousel
            products={products}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setIsDetailModalOpen(true);
            }}
          />
        )}

        {/* Category Visual Cards */}
        {filterState.category === 'all' && !filterState.searchQuery && (
          <CategoryGrid
            categories={categories}
            selectedCategory={filterState.category}
            onSelectCategory={(catId) => handleUpdateFilter({ category: catId, subcategory: '' })}
          />
        )}

        {/* Official Factory Partners & Certified Brands Carousel */}
        <BrandsCarousel
          selectedBrand={filterState.brand}
          onSelectBrand={(brandName) => {
            handleUpdateFilter({ brand: brandName });
            // Scroll to catalog section if selected
            const catalogEl = document.getElementById('catalog-section');
            if (catalogEl) {
              catalogEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Quick Features Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs text-xs">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/50 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Kranla Çatdırılma</p>
              <p className="text-[11px] text-slate-500">Mərdəkan, Şüvəlan, Bakı və ətrafı</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/50 flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Smeta & Hesablayıcı</p>
              <p className="text-[11px] text-slate-500">Kərpic, kafel, sement sayını tap</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Laboratoriya Zəmanəti</p>
              <p className="text-[11px] text-slate-500">100% rəsmi zavod sertifikatı</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200/50 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Usta və Briqada Klubu</p>
              <p className="text-[11px] text-slate-500">Hər alışdan keşbek bonusu qazan</p>
            </div>
          </div>
        </div>

        {/* Featured Products Touch & Mouse Drag Carousel Showcase */}
        {filterState.category === 'all' && !filterState.searchQuery && (
          <SwipeableProductCarousel
            products={products}
            wishlist={wishlist}
            comparison={comparison}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onToggleComparison={handleToggleComparison}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setIsDetailModalOpen(true);
            }}
          />
        )}

        {/* Product Catalog Section */}
        <section id="catalog-section" className="space-y-4">
          {/* Catalog Top Toolbar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Filter className="w-4 h-4 text-orange-600" />
                <span>Filterlər</span>
              </button>

              <div>
                <h1 className="text-base font-extrabold text-slate-900">
                  {filterState.category === 'all' 
                    ? 'Bütün Tikinti Materialları' 
                    : categories.find(c => c.id === filterState.category)?.name || 'Tikinti Materialları'}
                </h1>
                <p className="text-xs text-slate-500">
                  <span className="font-bold text-slate-800">{filteredProducts.length}</span> adda çeşid tapıldı
                  {filterState.searchQuery && ` ("${filterState.searchQuery}" üzrə)`}
                </p>
              </div>
            </div>

            {/* Active Tag Filters Breadcrumbs */}
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              {/* View Switcher: Drag Carousel vs Grid */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'carousel'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Sürüklənən Karusel Görünüşü"
                >
                  <MoveHorizontal className="w-3.5 h-3.5" />
                  <span>Karusel</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Şəbəkə Görünüşü"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Şəbəkə</span>
                </button>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 whitespace-nowrap hidden sm:inline">Sıralama:</span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="featured">Seçilmişlər / Tövsiyə olunan</option>
                    <option value="price_asc">Qiymət: Ucuzdan Bahaya</option>
                    <option value="price_desc">Qiymət: Bahadan Ucuza</option>
                    <option value="rating">Reytinqə görə</option>
                    <option value="discount">Endirim Faizinə görə</option>
                    <option value="name">Ada görə (A - Z)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Active Applied Filters Chips */}
          {(filterState.category !== 'all' || filterState.brand || filterState.subcategory || filterState.inStockOnly || filterState.tags.length > 0 || filterState.searchQuery) && (
            <div className="flex items-center gap-2 flex-wrap text-xs bg-orange-50/70 p-3 rounded-2xl border border-orange-200">
              <span className="font-semibold text-orange-950">Aktiv filterlər:</span>
              
              {filterState.category !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-orange-200 text-orange-900 rounded-xl font-bold text-[11px] shadow-xs">
                  {categories.find(c => c.id === filterState.category)?.name}
                  <button onClick={() => handleUpdateFilter({ category: 'all', subcategory: '' })} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {filterState.subcategory && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-orange-200 text-orange-900 rounded-xl font-bold text-[11px] shadow-xs">
                  {filterState.subcategory}
                  <button onClick={() => handleUpdateFilter({ subcategory: '' })} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {filterState.brand && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-orange-200 text-orange-900 rounded-xl font-bold text-[11px] shadow-xs">
                  Brend: {filterState.brand}
                  <button onClick={() => handleUpdateFilter({ brand: '' })} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {filterState.searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-orange-200 text-orange-900 rounded-xl font-bold text-[11px] shadow-xs">
                  Axtarış: "{filterState.searchQuery}"
                  <button onClick={() => handleUpdateFilter({ searchQuery: '' })} className="hover:text-red-500 cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-[11px] font-bold text-red-600 hover:underline ml-auto cursor-pointer"
              >
                Bütün filterləri sil
              </button>
            </div>
          )}

          {/* Main Layout: Sidebar + Product Grid */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block shrink-0 sticky top-24">
              <FilterSidebar
                categories={categories}
                brands={BRANDS_LIST}
                filterState={filterState}
                onUpdateFilter={handleUpdateFilter}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMobileFilterOpen(false)}
                    className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
                  />
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative z-10 w-4/5 max-w-xs bg-white h-full p-5 overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-sm text-slate-900">Filterlər</h3>
                      <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <FilterSidebar
                      categories={categories}
                      brands={BRANDS_LIST}
                      filterState={filterState}
                      onUpdateFilter={(updates) => {
                        handleUpdateFilter(updates);
                      }}
                      onResetFilters={handleResetFilters}
                    />
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMobileFilterOpen(false)}
                      className="w-full mt-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs shadow-md shadow-orange-600/20 cursor-pointer transition-all"
                    >
                      Nəticələri göstər ({filteredProducts.length})
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Product Grid Area */}
            <div className="flex-1 w-full space-y-6">
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 shadow-xs">
                  <PackageSearch className="w-16 h-16 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">Axtarışınıza uyğun material tapılmadı</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Seçilmiş filterləri dəyişərək və ya axtarış sözünü sadələşdirərək yenidən yoxlayın.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Filterləri Sıfırla
                  </button>
                </div>
              ) : viewMode === 'carousel' ? (
                <CatalogCarouselView
                  products={filteredProducts}
                  wishlist={wishlist}
                  comparison={comparison}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onToggleComparison={handleToggleComparison}
                  onSelectProduct={(p) => {
                    setSelectedProduct(p);
                    setIsDetailModalOpen(true);
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isInWishlist={wishlist.some(p => p.id === product.id)}
                      isInComparison={comparison.some(p => p.id === product.id)}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={handleToggleWishlist}
                      onToggleComparison={handleToggleComparison}
                      onSelectProduct={(p) => {
                        setSelectedProduct(p);
                        setIsDetailModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Turnkey Construction & Project Bundle Packages Carousel */}
        {filterState.category === 'all' && !filterState.searchQuery && (
          <ProjectsCarousel
            products={products}
            onAddMultipleToCart={handleAddMultipleToCart}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}
      </main>

      {/* Floating Material Calculator Action Button */}
      <motion.button
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsCalculatorOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-5 py-3.5 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-600/30 flex items-center gap-2.5 cursor-pointer border border-orange-400/40 transition-all"
        title="Tikinti materialı kalkulyatorunu aç"
      >
        <Calculator className="w-5 h-5 text-orange-200" />
        <span className="hidden sm:inline">Material Hesabla (Kalkulyator)</span>
        <span className="sm:hidden">Kalkulyator</span>
      </motion.button>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-5 py-3 bg-slate-900 text-white text-xs font-bold rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <Footer
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenB2B={() => setIsB2BOpen(true)}
        onSelectCategory={(catId) => handleUpdateFilter({ category: catId })}
      />

      {/* MODALS */}
      {/* 1. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isInWishlist={selectedProduct ? wishlist.some(p => p.id === selectedProduct.id) : false}
        isInComparison={selectedProduct ? comparison.some(p => p.id === selectedProduct.id) : false}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onToggleComparison={handleToggleComparison}
      />

      {/* 2. Construction Calculator Modal */}
      <ConstructionCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        products={products}
        onAddMultipleToCart={handleAddMultipleToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 3. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={(promo) => {
          setCheckoutPromo(promo);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 4. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currentUser={currentUser}
        appliedDiscount={checkoutPromo.discount}
        promoCode={checkoutPromo.code}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* 5. Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authInitialTab}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Xoş gəldiniz, ${user.name}!`);
        }}
      />

      {/* 6. User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        orders={userOrders}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Hesabdan çıxış edildi');
        }}
        onUpdateUser={(updated) => {
          setCurrentUser(updated);
          showToast('Profil məlumatları yeniləndi');
        }}
      />

      {/* 7. Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setIsDetailModalOpen(true);
        }}
      />

      {/* 8. Comparison Modal */}
      <ComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        comparisonProducts={comparison}
        onRemoveFromComparison={handleToggleComparison}
        onAddToCart={handleAddToCart}
        onClearComparison={() => setComparison([])}
      />

      {/* 9. B2B Quote Modal */}
      <B2BQuoteModal
        isOpen={isB2BOpen}
        onClose={() => setIsB2BOpen(false)}
        currentUser={currentUser}
      />
    </div>
  );
}
