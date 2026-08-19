import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, RotateCcw, Check, ChevronRight } from 'lucide-react';
import { Category, FilterState } from '../types';
import { formatPrice } from '../utils/helpers';

interface FilterSidebarProps {
  categories: Category[];
  brands: string[];
  filterState: FilterState;
  onUpdateFilter: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  filterState,
  onUpdateFilter,
  onResetFilters
}) => {
  const currentCategoryObj = categories.find(c => c.id === filterState.category);

  const toggleBrand = (brandName: string) => {
    onUpdateFilter({
      brand: filterState.brand === brandName ? '' : brandName
    });
  };

  const toggleTag = (tag: string) => {
    const exists = filterState.tags.includes(tag);
    const newTags = exists 
      ? filterState.tags.filter(t => t !== tag)
      : [...filterState.tags, tag];
    onUpdateFilter({ tags: newTags });
  };

  const TAGS_LIST = ['Zavod qiyməti', 'Endirim', 'Ən çox satılan', 'Toplu sərfəli', 'Premium', 'Usta tövsiyəsi'];

  return (
    <aside className="w-full lg:w-64 bg-white rounded-2xl border border-slate-200 p-4 space-y-5 text-xs font-sans shadow-xs">
      {/* Title and Reset */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 font-bold text-slate-900">
          <Filter className="w-4 h-4 text-orange-600" />
          <span>Filterlər</span>
        </div>
        <motion.button
          whileHover={{ rotate: -90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onResetFilters}
          className="text-[11px] text-slate-500 hover:text-orange-600 flex items-center gap-1 cursor-pointer font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Sıfırla</span>
        </motion.button>
      </div>

      {/* Category Selection */}
      <div>
        <h4 className="font-bold text-slate-900 mb-2">Kateqoriya</h4>
        <div className="space-y-1">
          <button
            onClick={() => onUpdateFilter({ category: 'all', subcategory: '' })}
            className={`w-full text-left py-1.5 px-2.5 rounded-xl transition-colors flex items-center justify-between font-medium cursor-pointer ${
              filterState.category === 'all'
                ? 'bg-orange-50 text-orange-900 font-bold border border-orange-100'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Bütün Materiallar</span>
          </button>

          {categories.map((c) => (
            <div key={c.id}>
              <button
                onClick={() => onUpdateFilter({ category: c.id, subcategory: '' })}
                className={`w-full text-left py-1.5 px-2.5 rounded-xl transition-colors flex items-center justify-between font-medium cursor-pointer ${
                  filterState.category === c.id
                    ? 'bg-orange-50 text-orange-900 font-bold border border-orange-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="truncate pr-1">{c.name}</span>
                <span className="text-[10px] text-slate-400">({c.itemCount})</span>
              </button>

              {/* Subcategories list if parent category active */}
              <AnimatePresence>
                {filterState.category === c.id && c.subcategories && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-3 py-1 space-y-1 border-l-2 border-orange-200 ml-2.5 mt-1 overflow-hidden"
                  >
                    {c.subcategories.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => onUpdateFilter({ subcategory: filterState.subcategory === sub ? '' : sub })}
                        className={`w-full text-left py-1 px-2 rounded-lg text-[11px] transition-colors cursor-pointer ${
                          filterState.subcategory === sub
                            ? 'bg-orange-600 text-white font-bold'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="font-bold text-slate-900 mb-2">Qiymət Aralığı (AZN ₼)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Min (₼)</label>
            <input
              type="number"
              min={0}
              value={filterState.minPrice || ''}
              onChange={(e) => onUpdateFilter({ minPrice: Number(e.target.value) || 0 })}
              placeholder="0 ₼"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-0.5">Maks (₼)</label>
            <input
              type="number"
              min={0}
              value={filterState.maxPrice === 1000 ? '' : filterState.maxPrice}
              onChange={(e) => onUpdateFilter({ maxPrice: Number(e.target.value) || 1000 })}
              placeholder="1000 ₼"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Brands Checklist */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="font-bold text-slate-900 mb-2">Brend və İstehsalçı</h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => {
            const isChecked = filterState.brand === brand;

            return (
              <label
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-2 py-1 px-1.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  isChecked ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isChecked && <Check className="w-3 h-3" />}
                </div>
                <span className={`text-xs ${isChecked ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                  {brand}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Tags Chips */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="font-bold text-slate-900 mb-2">Xüsusiyyətlər</h4>
        <div className="flex flex-wrap gap-1.5">
          {TAGS_LIST.map((tag) => {
            const isSelected = filterState.tags.includes(tag);

            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tag}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Stock Availability Toggle */}
      <div className="border-t border-slate-100 pt-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-semibold text-slate-700">Yalnız anbarda olanlar</span>
          <input
            type="checkbox"
            checked={filterState.inStockOnly}
            onChange={(e) => onUpdateFilter({ inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 cursor-pointer"
          />
        </label>
      </div>
    </aside>
  );
};
