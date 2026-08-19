import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Scale, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../utils/helpers';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparisonProducts: Product[];
  onRemoveFromComparison: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onClearComparison: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  comparisonProducts,
  onRemoveFromComparison,
  onAddToCart,
  onClearComparison
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 font-sans">
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
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-600/20 text-orange-500 flex items-center justify-center border border-orange-500/30">
                  <Scale className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-white">Tikinti Materiallarının Müqayisəsi ({comparisonProducts.length})</h2>
              </div>
              <div className="flex items-center gap-2">
                {comparisonProducts.length > 0 && (
                  <button
                    onClick={onClearComparison}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer mr-2 transition-colors"
                  >
                    Hamısını təmizlə
                  </button>
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

            <div className="p-5 overflow-x-auto overflow-y-auto flex-1 bg-slate-50">
              {comparisonProducts.length === 0 ? (
                <div className="text-center py-12 space-y-2 bg-white rounded-2xl border border-slate-200">
                  <Scale className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-800">Müqayisə üçün material seçilməyib</p>
                  <p className="text-xs text-slate-500">Məhsul kartlarındakı tərəzi simvoluna klikləyərək 2 və ya daha çox materialı müqayisə edin.</p>
                </div>
              ) : (
                <div className="min-w-[600px] bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/70">
                        <th className="p-4 w-40 font-bold text-slate-700">Parametrlər</th>
                        {comparisonProducts.map((p) => (
                          <th key={p.id} className="p-4 w-60 font-bold text-slate-900 border-l border-slate-200 align-top">
                            <div className="space-y-2">
                              <div className="relative pt-[70%] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                <img src={p.image} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                              </div>
                              <h4 className="font-extrabold text-xs text-slate-900 leading-snug line-clamp-2">{p.name}</h4>
                              <div className="flex items-center justify-between pt-1">
                                <span className="font-black text-orange-600 text-sm">{formatPrice(p.price)}/{p.unit}</span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onRemoveFromComparison(p)}
                                  className="text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                                  title="Sil"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onAddToCart(p, 1)}
                                className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Səbətə at</span>
                              </motion.button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Brend / İstehsalçı</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 text-slate-800 font-bold border-l border-slate-200">
                            {p.brand}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Kateqoriya</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 text-slate-700 font-medium border-l border-slate-200">
                            {p.category}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Ölçü vahidi</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 text-slate-700 font-semibold border-l border-slate-200">
                            {p.unit}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Təxmini Çəki</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 text-slate-700 font-semibold border-l border-slate-200">
                            {p.weightKg ? `${p.weightKg} kq` : '—'}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Mövcud Anbar</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 border-l border-slate-200">
                            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                              {p.stockCount} {p.unit}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Qiymətləndirmə</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 text-slate-800 font-bold border-l border-slate-200">
                            ⭐ {p.rating.toFixed(1)} ({p.reviewCount} rəy)
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-slate-600 bg-slate-50/70">Əsas Xüsusiyyətlər</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-3.5 text-slate-700 text-[11px] border-l border-slate-200 align-top space-y-1">
                            {p.specifications && Array.isArray(p.specifications) ? (
                              p.specifications.map((spec, sIdx) => (
                                <div key={sIdx} className="text-slate-800">
                                  <span className="font-semibold text-slate-500">{spec.key}: </span>
                                  <span className="font-bold">{spec.value}</span>
                                </div>
                              ))
                            ) : (
                              <span className="text-slate-400">Standart spesifikasiya</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
