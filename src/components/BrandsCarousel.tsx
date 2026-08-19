import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Building, 
  Factory,
  MoveHorizontal
} from 'lucide-react';

export interface BrandInfo {
  name: string;
  category: string;
  country: string;
  flag: string;
  badge: string;
  itemCount: number;
  highlight: string;
  accentColor: string;
}

export const BRANDS_DATA: BrandInfo[] = [
  {
    name: 'Norm Sement',
    category: 'sement-quru',
    country: 'Azərbaycan',
    flag: '🇦🇿',
    badge: 'Qaradağ Zavodu',
    itemCount: 42,
    highlight: 'Klass 400, CEM II sementi',
    accentColor: 'from-orange-600 to-amber-600'
  },
  {
    name: 'Mətanət A',
    category: 'sement-quru',
    country: 'Azərbaycan',
    flag: '🇦🇿',
    badge: 'Ağdağ & FasNatural',
    itemCount: 38,
    highlight: 'Gips, astar, şpatlyovka',
    accentColor: 'from-amber-600 to-yellow-600'
  },
  {
    name: 'Knauf',
    category: 'sement-quru',
    country: 'Almaniya',
    flag: '🇩🇪',
    badge: 'Alman Standartı',
    itemCount: 29,
    highlight: 'Alçipan, gips suvaqlar',
    accentColor: 'from-blue-600 to-indigo-600'
  },
  {
    name: 'Baku Steel Company',
    category: 'armatur-metal',
    country: 'Azərbaycan',
    flag: '🇦🇿',
    badge: 'A500C Polad',
    itemCount: 36,
    highlight: 'Ø12-Ø32 armatur, şveller',
    accentColor: 'from-red-600 to-rose-700'
  },
  {
    name: 'TexnoNikol',
    category: 'dam-izolyasiya',
    country: 'Beynəlxalq',
    flag: '🌐',
    badge: 'İstilik & Su İzol.',
    itemCount: 34,
    highlight: 'Daş yunu, ruberoid, mastika',
    accentColor: 'from-emerald-600 to-teal-600'
  },
  {
    name: 'Dyo Boya',
    category: 'boya-kimyevi',
    country: 'Türkiyə',
    flag: '🇹🇷',
    badge: 'Nanotexnoloji',
    itemCount: 27,
    highlight: 'Dinamik fasad & daxili boya',
    accentColor: 'from-pink-600 to-rose-600'
  },
  {
    name: 'Fab Boya',
    category: 'boya-kimyevi',
    country: 'Azərbaycan',
    flag: '🇦🇿',
    badge: 'Zavod İstehsalı',
    itemCount: 31,
    highlight: 'Emulsiya, astar, sintetik boya',
    accentColor: 'from-cyan-600 to-blue-600'
  },
  {
    name: 'Akfix',
    category: 'boya-kimyevi',
    country: 'Türkiyə',
    flag: '🇹🇷',
    badge: 'Montaj Köpükləri',
    itemCount: 24,
    highlight: 'Köpük, silikon, yapışdırıcı',
    accentColor: 'from-amber-600 to-orange-600'
  },
  {
    name: 'Sika',
    category: 'boya-kimyevi',
    country: 'İsveçrə',
    flag: '🇨🇭',
    badge: 'İsveçrə Kimyası',
    itemCount: 22,
    highlight: 'Beton qatqısı, hidrofobizator',
    accentColor: 'from-red-600 to-amber-600'
  },
  {
    name: 'Bosch Professional',
    category: 'alet-avadanliq',
    country: 'Almaniya',
    flag: '🇩🇪',
    badge: 'Ağır İnşaat Alətləri',
    itemCount: 19,
    highlight: 'Perforator, laqonda, lazer',
    accentColor: 'from-blue-700 to-slate-800'
  },
  {
    name: 'Makita',
    category: 'alet-avadanliq',
    country: 'Yaponiya',
    flag: '🇯🇵',
    badge: 'Yapon Dəqiqliyi',
    itemCount: 18,
    highlight: 'Akkumulyatorlu drel, mişar',
    accentColor: 'from-teal-600 to-cyan-700'
  },
  {
    name: 'Schneider Electric',
    category: 'elektrik-isiq',
    country: 'Fransa',
    flag: '🇫🇷',
    badge: 'Avropa Standartı',
    itemCount: 28,
    highlight: 'Avtomat, şit, kabel kanalı',
    accentColor: 'from-emerald-600 to-green-700'
  },
  {
    name: 'Gəncə Kabel (Ganja Cable)',
    category: 'elektrik-isiq',
    country: 'Azərbaycan',
    flag: '🇦🇿',
    badge: 'QOST / AZS Standartı',
    itemCount: 25,
    highlight: 'Mis naqillər, VVG, NYM kabel',
    accentColor: 'from-orange-600 to-red-600'
  },
  {
    name: 'Pilsa / Wavin',
    category: 'santexnika-boru',
    country: 'Türkiyə',
    flag: '🇹🇷',
    badge: 'PPR Boru Sistemləri',
    itemCount: 30,
    highlight: 'İsti-soyuq su və kanalizasiya',
    accentColor: 'from-blue-600 to-sky-600'
  },
  {
    name: 'Kronospan',
    category: 'taxta-dosheme',
    country: 'Avstriya',
    flag: '🇦🇹',
    badge: 'OSB-3 & Laminat',
    itemCount: 21,
    highlight: 'Rütubətədavamlı OSB plitələr',
    accentColor: 'from-amber-700 to-stone-700'
  },
  {
    name: 'Göytəpə Kərpic Zavodu',
    category: 'kerpic-blok',
    country: 'Azərbaycan',
    flag: '🇦🇿',
    badge: 'Qırmızı Bişmiş Gil',
    itemCount: 14,
    highlight: 'M150 hörgü və fasad kərpici',
    accentColor: 'from-orange-700 to-red-800'
  }
];

interface BrandsCarouselProps {
  selectedBrand?: string;
  onSelectBrand: (brandName: string) => void;
}

export const BrandsCarousel: React.FC<BrandsCarouselProps> = ({
  selectedBrand,
  onSelectBrand
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(4);

  const filterCategories = [
    { id: 'all', label: 'Bütün Zavodlar' },
    { id: 'sement-quru', label: 'Sement & Gips' },
    { id: 'armatur-metal', label: 'Armatur & Polad' },
    { id: 'dam-izolyasiya', label: 'Dam & İzolyasiya' },
    { id: 'boya-kimyevi', label: 'Boya & Tikinti Kimyası' },
    { id: 'alet-avadanliq', label: 'Alətlər & Avadanlıq' },
    { id: 'elektrik-isiq', label: 'Elektrik & Kabel' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsVisible(1);
      else if (window.innerWidth < 1024) setItemsVisible(2);
      else if (window.innerWidth < 1280) setItemsVisible(3);
      else setItemsVisible(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredBrands = activeCategory === 'all' 
    ? BRANDS_DATA 
    : BRANDS_DATA.filter(b => b.category === activeCategory);

  const maxIndex = Math.max(0, filteredBrands.length - itemsVisible);

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
      setCurrentIndex(prev => Math.min(maxIndex, prev + (Math.abs(offset) > 180 ? 2 : 1)));
    } else if (offset > 40 || velocity > 200) {
      setCurrentIndex(prev => Math.max(0, prev - (Math.abs(offset) > 180 ? 2 : 1)));
    }
    setTimeout(() => setIsDragging(false), 50);
  };

  const cardWidthPercent = 100 / itemsVisible;

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl overflow-hidden text-white font-sans select-none">
      {/* Background Lighting Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header with Certified Seal */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center gap-1">
              <Factory className="w-3 h-3 text-orange-400" />
              <span>Rəsmi Təchizat Şəbəkəsi</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Laboratoriya Sertifikatlı</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Rəsmi İstehsalçı və Zavod Tərəfdaşlarımız</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Məhsullar aralıq vasitəçi olmadan, birbaşa zavod anbarlarından daşınır və zəmanətlə təhvil verilir.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2 self-end md:self-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              currentIndex === 0 
                ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed' 
                : 'bg-slate-800/80 hover:bg-orange-600 text-slate-300 hover:text-white border-slate-700'
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
                : 'bg-slate-800/80 hover:bg-orange-600 text-slate-300 hover:text-white border-slate-700'
            }`}
            aria-label="Sağa sürüşdür"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-md shadow-orange-600/30'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-700/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Swipe Indicator */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-medium pb-2">
        <div className="flex items-center gap-1.5">
          <MoveHorizontal className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span>Sürükləyərək vərəqləyin və ya brend seçin</span>
        </div>
        <div className="text-orange-400 font-semibold">
          {currentIndex + 1} - {Math.min(filteredBrands.length, currentIndex + itemsVisible)} / {filteredBrands.length} tərəfdaş
        </div>
      </div>

      {/* Interactive Horizontal Drag Cards Carousel */}
      <div className="relative z-10 overflow-hidden pb-2 pt-1 cursor-grab active:cursor-grabbing">
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
          className="flex gap-3.5 touch-pan-y"
        >
          {filteredBrands.map((brand, idx) => {
            const isSelected = selectedBrand === brand.name;

            return (
              <motion.div
                key={brand.name}
                style={{ 
                  width: `calc(${cardWidthPercent}% - ${(14 * (itemsVisible - 1)) / itemsVisible}px)`,
                  flexShrink: 0 
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => {
                  if (!isDragging) {
                    onSelectBrand(isSelected ? '' : brand.name);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-orange-950 via-slate-900 to-slate-900 border-orange-500 shadow-xl shadow-orange-600/30 ring-2 ring-orange-500'
                    : 'bg-slate-800/40 hover:bg-slate-800/80 border-slate-700/70 hover:border-orange-500/50 hover:shadow-lg'
                }`}
              >
                {/* Brand Card Top */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" title={brand.country}>{brand.flag}</span>
                      <div>
                        <h3 className="font-extrabold text-sm text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                          <span>{brand.name}</span>
                        </h3>
                        <span className="text-[10px] text-slate-400 block">{brand.country} İstehsalı</span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold rounded-md shadow-xs animate-pulse">
                        Seçilib
                      </span>
                    )}
                  </div>

                  {/* Badge & Speciality */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-slate-900/80 text-orange-300 text-[10px] font-semibold rounded-md border border-slate-700/50">
                      {brand.badge}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-900/60 text-slate-300 text-[10px] rounded-md">
                      {brand.itemCount} məhsul
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 line-clamp-1 font-medium">
                    {brand.highlight}
                  </p>
                </div>

                {/* Bottom link trigger */}
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-semibold group-hover:text-orange-400 transition-colors">
                    {isSelected ? 'Kataloqda Filterləndi' : 'Məhsullarına bax'}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-slate-700/50 group-hover:bg-orange-600 text-slate-300 group-hover:text-white flex items-center justify-center transition-colors">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
