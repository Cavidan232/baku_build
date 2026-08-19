import React from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Calculator, 
  FileText,
  MessageCircle,
  Award,
  Sparkles
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenB2B: () => void;
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalculator,
  onOpenB2B,
  onSelectCategory
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs font-sans relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Guarantees Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">Kranla Sürətli Çatdırılma</h4>
                <p className="text-[11px] text-slate-400">Bakı və bütün Abşeron üzrə operativ daşınma</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">100% Zavod Zəmanəti</h4>
                <p className="text-[11px] text-slate-400">Norm, Knauf, Mətanət A laboratoriya sertifikatı</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">BirKart & TamKart Taksit</h4>
                <p className="text-[11px] text-slate-400">12 ayadək faizsiz hissə-hissə və qapıda ödəniş</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">B2B və Korporativ Smeta</h4>
                <p className="text-[11px] text-slate-400">Şirkətlər və briqadalar üçün ƏDV daxil e-qaimə</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Brand */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Azərbaycanın ən böyük onlayn tikinti və təmir materialları platforması. Bünövrədən açar təslimədək lazım olan bütün sement, armatur, kərpic, kafel, quru suvaq və izolyasiya mallarını birbaşa zavod qiymətinə sifariş edin.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={onOpenCalculator}
                className="px-3.5 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Calculator className="w-4 h-4" />
                <span>Material Hesablayıcısı</span>
              </button>
              <button
                onClick={onOpenB2B}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-orange-400" />
                <span>B2B Smeta Təklifi Al</span>
              </button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Əsas Bölmələr</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectCategory('sement-quru')} className="text-slate-400 hover:text-orange-400 transition-colors">
                  Sement və Quru Qarışıqlar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('metal-armatur')} className="text-slate-400 hover:text-orange-400 transition-colors">
                  Armatur və Metal Məmulatlar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kerpic-blok')} className="text-slate-400 hover:text-orange-400 transition-colors">
                  Kərpic, Qazobeton və Daş
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kafel-metlax')} className="text-slate-400 hover:text-orange-400 transition-colors">
                  Kafel, Metlax və Keramoqranit
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('izolyasiya-dam')} className="text-slate-400 hover:text-orange-400 transition-colors">
                  İzolyasiya və Dam Örtükləri
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('boya-astar')} className="text-slate-400 hover:text-orange-400 transition-colors">
                  Fasad və Daxili Boyalar
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links & Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Xidmətlər & Məlumat</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="hover:text-orange-400 cursor-pointer">Kranla Ünvana Boşaltma</span></li>
              <li><span className="hover:text-orange-400 cursor-pointer">Topdan Satış Şərtləri</span></li>
              <li><span className="hover:text-orange-400 cursor-pointer">BirKart ilə Faizsiz Taksit</span></li>
              <li><span className="hover:text-orange-400 cursor-pointer">Usta və Briqadalar üçün Bonus</span></li>
              <li><span className="hover:text-orange-400 cursor-pointer">Zavod Keyfiyyət Sertifikatları</span></li>
              <li><span className="hover:text-orange-400 cursor-pointer">Geri Qaytarma Qaydaları</span></li>
            </ul>
          </div>

          {/* Contact & Branches */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Əlaqə & Anbarlar</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Mərkəzi Anbar: Bakı ş., Dərnəgül Tikinti Bazarı, Sıra 4, Mağaza 18-22</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:*2026" className="text-white font-bold hover:text-orange-400">*2026 / +994 (12) 555 20 26</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/994501234567" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-semibold">
                  WhatsApp Sürətli Sifariş
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Hər gün: 08:00 – 19:30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} AZ-İNŞAAT. Bütün hüquqlar qorunur. Tikinti və təmir materiallarının onlayn satışı.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Gizlilik Siyasəti</span>
            <span className="hover:text-slate-400 cursor-pointer">İstifadəçi Qaydaları</span>
            <span className="hover:text-slate-400 cursor-pointer">Saytın Xəritəsi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
