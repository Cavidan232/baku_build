import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Send, Building2, Phone, Mail, CheckCircle2, ShieldCheck, UploadCloud } from 'lucide-react';
import { User } from '../types';

interface B2BQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const B2BQuoteModal: React.FC<B2BQuoteModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [contactName, setContactName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+994 ');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [materialList, setMaterialList] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !phone || !materialList) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Toplu Alış və Smeta Təklifi (B2B)</h2>
                  <p className="text-[11px] text-slate-400">Böyük layihələr üçün birbaşa zavod qiymətləri</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Smeta Tələbiniz Qeydə Alındı!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Korporativ satış menecerimiz 30 dəqiqə ərzində sizinlə əlaqə saxlayaraq xüsusi endirimli rəsmi qiymət təklifini təqdim edəcək.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Pəncərəni Bağla
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Şirkət / Obyekt Adı</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Məs: Qala Rezidens"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Məsul Şəxs (Ad/Soyad) *</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Məs: Fərid Məmmədov"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Əlaqə Nömrəsi *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994 50 123 45 67"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Ünvanı</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="satinalma@sirket.az"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tələb olunan materiallar və həcmləri *</label>
                  <textarea
                    value={materialList}
                    onChange={(e) => setMaterialList(e.target.value)}
                    placeholder="Məsələn: 200 kisə Norm Klass B Sement, 15 ton Ø14 armatur, 400 m² Keramika kafel..."
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 font-medium"
                    required
                  />
                </div>

                <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 flex items-center gap-2.5 text-[11px] text-orange-950 font-medium">
                  <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>ƏDV daxil rəsmi köçürmə yolu ilə ödəniş və ünvana birbaşa tırla çatdırılma mövcuddur.</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Smeta Tələbini Göndər</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
