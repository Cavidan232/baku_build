import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calculator, ArrowRight, Award, Flame, Sparkles } from 'lucide-react';

interface BannerHeroProps {
  onOpenCalculator: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewDeals: () => void;
}

export const BannerHero: React.FC<BannerHeroProps> = ({
  onOpenCalculator,
  onSelectCategory,
  onViewDeals
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const slides = [
    {
      id: 1,
      title: 'İnşaat Mövsümü Başladı!',
      subtitle: 'Birbaşa Zavod Qiymətinə Sement və Armatur',
      description: 'Norm Klass 400 sementi 7.80 ₼-dən və A500C armatur topdan qiymətlərlə. Şəhər və bağ sahələrinə kranla operativ çatdırılma.',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      badge: 'Zavod Tərəfdaşı',
      ctaText: 'Materiallara Bax',
      action: () => onSelectCategory('sement-quru'),
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Ağdağ və Knauf Quru Suvaqlar',
      subtitle: 'Bütün Suvaq Qarışıqlarına 15%-dək Endirim',
      description: 'Daxili və fasad suvaqları, kafel yapışdırıcıları və astar boyalar anbardan birbaşa qapınıza gəlir.',
      bgGradient: 'from-slate-900 via-slate-800 to-slate-950',
      badge: 'Günün Təklifi',
      ctaText: 'Kampaniyaya Keç',
      action: onViewDeals,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'Dəqiq Material Hesablayıcısı',
      subtitle: 'Artıq Xərclərə və Qalıqlara Son!',
      description: 'Evinizin və ya mənzilinizin ölçülərini yazın — tələb olunan kərpic, sement, kafel və suvaq sayını saniyələr içində hesablayın.',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-800',
      badge: 'Pulsuz Alət',
      ctaText: 'İndi Hesabla',
      action: onOpenCalculator,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection === 1) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 text-white min-h-[350px] md:min-h-[390px] flex items-center">
      {/* Animated Background Image */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} opacity-90 backdrop-blur-xs z-1`}></div>

      {/* Slide Content with Staggered Entrance */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col justify-between w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: direction > 0 ? 18 : -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -18 : 18 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="max-w-xl space-y-3"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm"
            >
              <Award className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              <span>{slide.badge}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md"
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-sm md:text-base font-bold text-orange-400"
            >
              {slide.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-xs md:text-sm text-slate-300 line-clamp-2 md:line-clamp-3 leading-relaxed"
            >
              {slide.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="pt-2 flex flex-wrap gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={slide.action}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs md:text-sm rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenCalculator}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs md:text-sm rounded-xl border border-white/20 flex items-center gap-2 cursor-pointer backdrop-blur-md transition-colors"
              >
                <Calculator className="w-4 h-4 text-orange-400" />
                <span>Tikinti Kalkulyatoru</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls & progress dots */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 relative z-20">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentSlide ? 1 : -1);
                  setCurrentSlide(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-9 bg-orange-500 shadow-md shadow-orange-500/50' 
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Slayd ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-colors"
              aria-label="Əvvəlki slayd"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer transition-colors"
              aria-label="Növbəti slayd"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

