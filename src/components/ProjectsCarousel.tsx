import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Boxes, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShoppingCart, 
  Calculator, 
  Layers, 
  ArrowRight,
  Sparkles,
  Building,
  Hammer,
  MoveHorizontal,
  X,
  Phone,
  Truck,
  Check
} from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/helpers';

export interface ProjectBundleItem {
  productName: string;
  brand: string;
  quantity: number;
  unit: string;
  estimatedPrice: number;
}

export interface ProjectBundle {
  id: string;
  title: string;
  stageName: string;
  description: string;
  squareAreaEstimate: string;
  baseAreaM2: number;
  image: string;
  items: ProjectBundleItem[];
  totalOriginalPrice: number;
  discountedPrice: number;
  matchProductQuery: string[];
}

export const PROJECT_BUNDLES: ProjectBundle[] = [
  {
    id: 'bundle-foundation',
    title: 'Monolit Bünövrə və Karkas Paketi',
    stageName: 'Mərhələ 1: Təməl & Dəmir-Beton',
    description: '100 m² sahəli 1 mərtəbəli fərdi evin təməli və kəmərləri üçün tələb olunan Norm Klass 400 sementi, A500C armaturları və qəliblik materiallar.',
    squareAreaEstimate: '100 m² ev üçün',
    baseAreaM2: 100,
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80',
    items: [
      { productName: 'Norm Klass 400 Sement (50 kq)', brand: 'Norm', quantity: 80, unit: 'kisə', estimatedPrice: 624.00 },
      { productName: 'Armatur Ø14 mm A500C (12m)', brand: 'Baku Steel', quantity: 45, unit: 'ədəd', estimatedPrice: 607.50 },
      { productName: 'Armatur Ø8 mm A500C (Xamut üçün)', brand: 'Baku Steel', quantity: 30, unit: 'ədəd', estimatedPrice: 165.00 },
      { productName: 'Tikinti Taxtası 50x100x4000mm', brand: 'Rusiya', quantity: 25, unit: 'ədəd', estimatedPrice: 162.50 }
    ],
    totalOriginalPrice: 1559.00,
    discountedPrice: 1395.00,
    matchProductQuery: ['Norm Klass 400', 'Armatur Ø14', 'Armatur Ø8', 'Tikinti Taxtası']
  },
  {
    id: 'bundle-walls',
    title: '2 Mərtəbəli Evin Hörgü və Arakəsmə Paketi',
    stageName: 'Mərhələ 2: Hörgü & Divarlar',
    description: 'Xarici və daxili divarlar üçün qırmızı bişmiş gil kərpicləri, M200 hörgü qum-sement qarışığı və möhkəmləndirici hörgü torları.',
    squareAreaEstimate: '120 m² divar səthi',
    baseAreaM2: 120,
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&auto=format&fit=crop&q=80',
    items: [
      { productName: 'Qırmızı Bişmiş Hörgü Kərpici', brand: 'Göytəpə Zavodu', quantity: 2400, unit: 'ədəd', estimatedPrice: 840.00 },
      { productName: 'Hörgü Qarışığı M200 (40 kq)', brand: 'Mətanət A', quantity: 40, unit: 'kisə', estimatedPrice: 208.00 },
      { productName: 'Daxili Arakəsmə Kərpici (8x19x19)', brand: 'Göytəpə Zavodu', quantity: 900, unit: 'ədəd', estimatedPrice: 261.00 }
    ],
    totalOriginalPrice: 1309.00,
    discountedPrice: 1175.00,
    matchProductQuery: ['Kərpic', 'Hörgü', 'Göytəpə']
  },
  {
    id: 'bundle-interior',
    title: 'Mənzil Daxili Suvaq & Alçipan Dəsti',
    stageName: 'Mərhələ 3: Daxili Təmir & Astar',
    description: '3 otaqlı mənzilin daxili divarlarının lazerlə suvanması, tavan asma konstruksiyası üçün Ağdağ gipsi və Knauf alçipan dəsti.',
    squareAreaEstimate: '85 m² mənzil',
    baseAreaM2: 85,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    items: [
      { productName: 'Ağdağ Gips Suvağı (30 kq)', brand: 'Mətanət A', quantity: 50, unit: 'kisə', estimatedPrice: 275.00 },
      { productName: 'Knauf Nəmişliyədavamlı Alçipan 12.5mm', brand: 'Knauf', quantity: 20, unit: 'vərəq', estimatedPrice: 216.00 },
      { productName: 'Knauf Tavan Profili CD 60/27 (4m)', brand: 'Knauf', quantity: 35, unit: 'ədəd', estimatedPrice: 122.50 },
      { productName: 'Akrilik Dərin Hopan Astar (10 L)', brand: 'Fab Boya', quantity: 4, unit: 'qutu', estimatedPrice: 76.00 }
    ],
    totalOriginalPrice: 689.50,
    discountedPrice: 615.00,
    matchProductQuery: ['Ağdağ', 'Knauf', 'Alçipan', 'Astar']
  },
  {
    id: 'bundle-roof-insulation',
    title: 'Dam və Fasad İstilik-Nəm İzolyasiyası',
    stageName: 'Mərhələ 4: İzolyasiya & Hidroizol.',
    description: 'Evin qışda isti, yayda sərin qalması üçün TexnoNikol bazalt daş yunu, buxar izolyasiya membranı və bitum mastikası.',
    squareAreaEstimate: '150 m² dam sahəsi',
    baseAreaM2: 150,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    items: [
      { productName: 'TexnoNikol Bazalt Daş Yunu (50mm)', brand: 'TexnoNikol', quantity: 30, unit: 'bağlama', estimatedPrice: 435.00 },
      { productName: 'Buxar və Hidroizolyasiya Membranı (70m²)', brand: 'TexnoNikol', quantity: 3, unit: 'rulon', estimatedPrice: 147.00 },
      { productName: 'Bitum Hidroizolyasiya Mastikası (18 kq)', brand: 'TexnoNikol', quantity: 3, unit: 'qutu', estimatedPrice: 105.00 }
    ],
    totalOriginalPrice: 687.00,
    discountedPrice: 619.00,
    matchProductQuery: ['TexnoNikol', 'Daş yunu', 'Bitum', 'Penoplast']
  }
];

interface ProjectsCarouselProps {
  products: Product[];
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
  onOpenCalculator: () => void;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  products,
  onAddMultipleToCart,
  onOpenCalculator
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(2);
  const [selectedBundle, setSelectedBundle] = useState<ProjectBundle | null>(null);
  const [customArea, setCustomArea] = useState<number>(100);
  const [bundleAdded, setBundleAdded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsVisible(1);
      else if (window.innerWidth < 1280) setItemsVisible(2);
      else setItemsVisible(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, PROJECT_BUNDLES.length - itemsVisible);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  const handleDragEnd = (e: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -40 || velocity < -200) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    } else if (offset > 40 || velocity > 200) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleAddBundleToCart = (bundle: ProjectBundle, areaScale = 1) => {
    const itemsToAdd: { product: Product; quantity: number }[] = [];
    
    bundle.items.forEach(bItem => {
      const scaledQty = Math.ceil(bItem.quantity * areaScale);
      const matched = products.find(p => 
        p.name.toLowerCase().includes(bItem.brand.toLowerCase()) ||
        bItem.productName.toLowerCase().includes(p.name.toLowerCase().slice(0, 8))
      ) || products[0];

      if (matched) {
        itemsToAdd.push({ product: matched, quantity: scaledQty });
      }
    });

    if (itemsToAdd.length > 0) {
      onAddMultipleToCart(itemsToAdd);
      setBundleAdded(true);
      setTimeout(() => setBundleAdded(false), 2000);
    }
  };

  const openBundleDetail = (bundle: ProjectBundle) => {
    setSelectedBundle(bundle);
    setCustomArea(bundle.baseAreaM2);
  };

  const cardWidthPercent = 100 / itemsVisible;

  // Scaling factor for modal
  const areaScale = selectedBundle ? customArea / selectedBundle.baseAreaM2 : 1;
  const scaledPrice = selectedBundle ? selectedBundle.discountedPrice * areaScale : 0;
  const scaledOriginalPrice = selectedBundle ? selectedBundle.totalOriginalPrice * areaScale : 0;

  return (
    <section className="relative bg-slate-900 rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-2xl overflow-hidden text-white font-sans select-none my-8">
      {/* Glow gradient accent */}
      <div className="absolute -top-10 -right-10 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
              <Boxes className="w-3 h-3 text-orange-400" />
              <span>Açar Təslim Layihə Smetaları</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400">Toplu Sifariş Endirimi (-15%)</span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Mərhələli Tikinti və Təmir Paketləri</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Evinizin bünövrəsindən təmirinədək peşəkar mühəndislər tərəfindən hesablanmış tam material dəstləri.
          </p>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              currentIndex === 0 
                ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed' 
                : 'bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white border-slate-700'
            }`}
            aria-label="Sola sürüşdür"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              currentIndex >= maxIndex 
                ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed' 
                : 'bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white border-slate-700'
            }`}
            aria-label="Sağa sürüşdür"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Swipe Indicator */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium pt-3 pb-1">
        <div className="flex items-center gap-1.5">
          <MoveHorizontal className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>Paketləri vərəqləmək üçün ekranda sürüşdürün və ya klikləyin</span>
        </div>
        <div className="text-orange-400 font-semibold">
          {currentIndex + 1} - {Math.min(PROJECT_BUNDLES.length, currentIndex + itemsVisible)} / {PROJECT_BUNDLES.length} paket
        </div>
      </div>

      {/* Interactive Project Bundle Carousel with Drag */}
      <div className="relative z-10 overflow-hidden pt-2 pb-2 cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{
            x: `-${currentIndex * (100 / itemsVisible)}%`
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 28
          }}
          className="flex gap-4 touch-pan-y"
        >
          {PROJECT_BUNDLES.map((bundle) => (
            <motion.div
              key={bundle.id}
              style={{ 
                width: `calc(${cardWidthPercent}% - ${(16 * (itemsVisible - 1)) / itemsVisible}px)`,
                flexShrink: 0 
              }}
              whileHover={{ y: -5 }}
              onClick={() => {
                if (!isDragging) openBundleDetail(bundle);
              }}
              className="bg-slate-800/70 rounded-3xl border border-slate-700/80 p-4 sm:p-5 flex flex-col justify-between overflow-hidden hover:border-orange-500/80 transition-all shadow-xl cursor-pointer group"
            >
              {/* Top Banner and Stage */}
              <div>
                <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                  <img 
                    src={bundle.image} 
                    alt={bundle.title} 
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 pointer-events-none" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-orange-600 text-white font-extrabold text-[10px] rounded-lg shadow-md">
                    {bundle.squareAreaEstimate}
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3">
                    <span className="text-[10px] font-bold text-orange-400 tracking-wider uppercase block">
                      {bundle.stageName}
                    </span>
                    <h3 className="text-sm font-black text-white leading-tight mt-0.5 group-hover:text-orange-400 transition-colors">
                      {bundle.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                  {bundle.description}
                </p>

                {/* Items List Inside Bundle */}
                <div className="bg-slate-950/60 rounded-2xl p-3 border border-slate-700/50 space-y-1.5 mb-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1">
                    <span>Daxil olan əsas materiallar:</span>
                    <span>Say</span>
                  </div>
                  {bundle.items.map((bItem, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{bItem.productName}</span>
                      </div>
                      <span className="text-[11px] font-bold text-orange-400 shrink-0">
                        {bItem.quantity} {bItem.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing and Action */}
              <div className="pt-3 border-t border-slate-700/80">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2">
                      {formatPrice(bundle.totalOriginalPrice)}
                    </span>
                    <span className="text-lg font-black text-orange-400">
                      {formatPrice(bundle.discountedPrice)}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] rounded-md border border-emerald-500/30">
                    Qənaət: {formatPrice(bundle.totalOriginalPrice - bundle.discountedPrice)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDragging) handleAddBundleToCart(bundle);
                    }}
                    className="py-2.5 px-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 cursor-pointer transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Paketi Səbətə At</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isDragging) openBundleDetail(bundle);
                    }}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5 text-orange-400" />
                    <span>Detallı Bax</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Project Bundle Modal */}
      <AnimatePresence>
        {selectedBundle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans text-slate-900">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBundle(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 350 }}
              className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">
                      {selectedBundle.stageName}
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-white">
                      {selectedBundle.title}
                    </h2>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedBundle(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
                {/* Area Customizer Slider */}
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-orange-600" />
                      <span>Layihə Sahəsini Dəqiqləşdirin (m²):</span>
                    </div>
                    <span className="px-3 py-1 bg-orange-600 text-white font-black text-sm rounded-xl">
                      {customArea} m²
                    </span>
                  </div>

                  <input
                    type="range"
                    min={30}
                    max={400}
                    step={5}
                    value={customArea}
                    onChange={(e) => setCustomArea(parseInt(e.target.value))}
                    className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />

                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>30 m² (Kompakt)</span>
                    <span>100 m² (Standart fərdi ev)</span>
                    <span>400 m² (Böyük villa/obyekt)</span>
                  </div>
                </div>

                {/* Items Breakdown Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                    <span>Hesablanmış Dəqiq Material Siyahısı:</span>
                    <span className="text-orange-600">Avtomatik Kalibrasiya</span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-200">
                    {selectedBundle.items.map((item, idx) => {
                      const calculatedQty = Math.ceil(item.quantity * areaScale);
                      const calculatedPrice = (item.estimatedPrice * areaScale);

                      return (
                        <div key={idx} className="p-3 sm:p-3.5 flex items-center justify-between text-xs hover:bg-white transition-colors">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <div>
                              <p className="font-bold text-slate-900 leading-tight">{item.productName}</p>
                              <span className="text-[10px] text-slate-500 font-medium">Brend: {item.brand}</span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-black text-orange-600 text-xs sm:text-sm">
                              {calculatedQty} {item.unit}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              ~{formatPrice(calculatedPrice)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery & Logistics badge */}
                <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
                  <Truck className="w-5 h-5 text-orange-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900">Loqistika & Çatdırılma: </span>
                    <span>Bu həcmdə material Bakı və Abşeron ərazisinə 1 ədəd 10 tonluq kranlı yük maşını ilə birbaşa ünvana boşaldılacaqdır.</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400 line-through">
                    {formatPrice(scaledOriginalPrice)}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-slate-950">
                      {formatPrice(scaledPrice)}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      -15% Paket Endirimi
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddBundleToCart(selectedBundle, areaScale)}
                    className="flex-1 sm:flex-none py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-600/30 cursor-pointer transition-all"
                  >
                    {bundleAdded ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Səbətə Əlavə Edildi!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>Bütün Paketi Səbətə At</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
