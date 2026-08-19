import React from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Layers, 
  Boxes, 
  Trees, 
  ShieldCheck, 
  Paintbrush, 
  Wrench, 
  Zap, 
  Hammer,
  ArrowRight
} from 'lucide-react';
import { Category } from '../types';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return <Package className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Boxes': return <Boxes className="w-5 h-5" />;
      case 'Trees': return <Trees className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Hammer': return <Hammer className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
          <span>Əsas Tikinti Bölmələri</span>
        </h2>
        {selectedCategory !== 'all' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-orange-600 hover:underline cursor-pointer"
          >
            Bütün mallara bax
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories.map((cat, index) => {
          const isSelected = selectedCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.25 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectCategory(cat.id)}
              className={`group p-3 rounded-2xl border transition-colors cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-600/25'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-orange-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'
                }`}>
                  {getIcon(cat.iconName)}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.itemCount} məhsul
                </span>
              </div>

              <div>
                <h3 className="font-bold text-xs leading-snug line-clamp-2">
                  {cat.name}
                </h3>
                <p className={`text-[10px] line-clamp-1 mt-0.5 ${
                  isSelected ? 'text-orange-100' : 'text-slate-400'
                }`}>
                  {cat.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

