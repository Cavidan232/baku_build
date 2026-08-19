import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calculator, 
  Layers, 
  Grid, 
  Paintbrush, 
  Box, 
  CheckCircle2, 
  ShoppingCart, 
  Sparkles, 
  Info,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { 
  calculateWall, 
  calculateFloor, 
  calculatePlaster, 
  calculateConcrete,
  WallCalcInput,
  FloorCalcInput,
  PlasterCalcInput,
  ConcreteCalcInput
} from '../utils/calculator';
import { Product } from '../types';
import { formatPrice } from '../utils/helpers';

interface ConstructionCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
  onOpenCart: () => void;
}

export const ConstructionCalculatorModal: React.FC<ConstructionCalculatorModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddMultipleToCart,
  onOpenCart
}) => {
  const [calcTab, setCalcTab] = useState<'wall' | 'floor' | 'plaster' | 'concrete'>('wall');
  const [addedNotice, setAddedNotice] = useState(false);

  // 1. Wall inputs
  const [wallInput, setWallInput] = useState<WallCalcInput>({
    length: 12,
    height: 3,
    openingsArea: 4.5,
    materialType: 'red_brick_8',
    wallThickness: 'single'
  });

  // 2. Floor inputs
  const [floorInput, setFloorInput] = useState<FloorCalcInput>({
    roomLength: 6,
    roomWidth: 4.5,
    tileWidthCm: 60,
    tileLengthCm: 60,
    boxCoverageM2: 1.44,
    layoutType: 'straight'
  });

  // 3. Plaster inputs
  const [plasterInput, setPlasterInput] = useState<PlasterCalcInput>({
    wallAreaM2: 45,
    thicknessMm: 15,
    plasterType: 'agdag_gypsum'
  });

  // 4. Concrete inputs
  const [concreteInput, setConcreteInput] = useState<ConcreteCalcInput>({
    length: 10,
    width: 0.4,
    depth: 0.8,
    concreteGrade: 'M300'
  });

  if (!isOpen) return null;

  // Calculation Results
  const wallRes = calculateWall(wallInput);
  const floorRes = calculateFloor(floorInput);
  const plasterRes = calculatePlaster(plasterInput);
  const concreteRes = calculateConcrete(concreteInput);

  // Auto-match corresponding products in our catalog
  const normCement = products.find(p => p.id === 'prod-norm-klass-400') || products[0];
  const redBrick = products.find(p => p.id === 'prod-kerpic-8goz') || products[0];
  const aacBlock = products.find(p => p.id === 'prod-qazobeton-aac') || products[0];
  const misharStone = products.find(p => p.id === 'prod-misar-dasi') || products[0];
  const rokolAdhesive = products.find(p => p.id === 'prod-rokol-kafel') || products[0];
  const agdagPlaster = products.find(p => p.id === 'prod-agdag-direk') || products[0];
  const rebar12 = products.find(p => p.id === 'prod-armatur-12mm') || products[0];

  const handleAddWallToCart = () => {
    let chosenBrick = redBrick;
    if (wallInput.materialType === 'aac_block') chosenBrick = aacBlock;
    if (wallInput.materialType === 'mishar_stone') chosenBrick = misharStone;

    onAddMultipleToCart([
      { product: chosenBrick, quantity: wallRes.totalPieces },
      { product: normCement, quantity: wallRes.cementBags }
    ]);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
      onOpenCart();
    }, 1200);
  };

  const handleAddFloorToCart = () => {
    onAddMultipleToCart([
      { product: rokolAdhesive, quantity: floorRes.adhesiveBags }
    ]);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
      onOpenCart();
    }, 1200);
  };

  const handleAddPlasterToCart = () => {
    onAddMultipleToCart([
      { product: agdagPlaster, quantity: plasterRes.bagsNeeded }
    ]);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
      onOpenCart();
    }, 1200);
  };

  const handleAddConcreteToCart = () => {
    onAddMultipleToCart([
      { product: normCement, quantity: concreteRes.cementBags50kg },
      { product: rebar12, quantity: Math.ceil(concreteRes.rebarKgEstimated / 0.888) }
    ]);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
      onOpenCart();
    }, 1200);
  };

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

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-600/20 text-orange-500 flex items-center justify-center border border-orange-500/30">
                  <Calculator className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Tikinti Materialı Hesablayıcısı</h2>
                  <p className="text-xs text-slate-400">
                    Obyektinizin ölçülərini daxil edin — dəqiq material həcmini hesablayıb birbaşa sifariş edin
                  </p>
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

        {/* Tab Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-slate-50 p-2 gap-1.5 text-xs font-bold">
          <button
            onClick={() => setCalcTab('wall')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              calcTab === 'wall'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Divar Hörgüsü</span>
          </button>
          <button
            onClick={() => setCalcTab('floor')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              calcTab === 'floor'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Kafel & Döşəmə</span>
          </button>
          <button
            onClick={() => setCalcTab('plaster')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              calcTab === 'plaster'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Paintbrush className="w-4 h-4" />
            <span>Suvaq & Şpatlyovka</span>
          </button>
          <button
            onClick={() => setCalcTab('concrete')}
            className={`py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              calcTab === 'concrete'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Beton & Bünövrə</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
          {addedNotice && (
            <div className="p-3 bg-emerald-600 text-white text-xs font-bold rounded-xl text-center shadow-xs">
              ✓ Hesablanmış materiallar səbətə əlavə edildi! Səbətə yönləndirilirsiniz...
            </div>
          )}

          {/* 1. WALL CALCULATOR */}
          {calcTab === 'wall' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inputs */}
              <div className="space-y-3.5 text-xs bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">Divarın Ölçüləri</h3>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-600 mb-1">Divarın Uzunluğu (metr)</label>
                    <input
                      type="number"
                      value={wallInput.length}
                      onChange={(e) => setWallInput({ ...wallInput, length: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Hündürlüyü (metr)</label>
                    <input
                      type="number"
                      value={wallInput.height}
                      onChange={(e) => setWallInput({ ...wallInput, height: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Qapı və Pəncərələrin Sahəsi (m²)</label>
                  <input
                    type="number"
                    value={wallInput.openingsArea}
                    onChange={(e) => setWallInput({ ...wallInput, openingsArea: Number(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Ümumi sahədən çıxılacaq boşluqlar</p>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Hörgü Materialı</label>
                  <select
                    value={wallInput.materialType}
                    onChange={(e) => setWallInput({ ...wallInput, materialType: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-none focus:border-orange-600"
                  >
                    <option value="red_brick_8">Qırmızı Bişmiş 8-gözlü Kərpic (25x12x8.8 sm)</option>
                    <option value="aac_block">AAC Qazobeton Blok (60x30x20 sm)</option>
                    <option value="mishar_stone">Qaradağ Mişar Daşı (39x19x18.8 sm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Hörgü Qalınlığı</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setWallInput({ ...wallInput, wallThickness: 'single' })}
                      className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer transition-all ${
                        wallInput.wallThickness === 'single'
                          ? 'border-orange-600 bg-orange-50/80 text-orange-950 ring-1 ring-orange-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      1 Qat (Arakəsmə)
                    </button>
                    <button
                      type="button"
                      onClick={() => setWallInput({ ...wallInput, wallThickness: 'double' })}
                      className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer transition-all ${
                        wallInput.wallThickness === 'double'
                          ? 'border-orange-600 bg-orange-50/80 text-orange-950 ring-1 ring-orange-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      2 Qat (Əsas Divar)
                    </button>
                  </div>
                </div>
              </div>

              {/* Results Box */}
              <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-3">
                    <span className="text-xs font-bold text-orange-950">Hesablanmış Tələbat</span>
                    <span className="text-xs font-semibold text-slate-600">Xalis Sahə: {wallRes.netArea} m²</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">Hörgü Materialı</p>
                        <p className="text-[10px] text-slate-500">5% kəsim itkisi daxil olmaqla</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-orange-600">{wallRes.totalPieces} ədəd</span>
                        <p className="text-[10px] text-slate-500 font-medium">~{wallRes.palletsCount} Palet</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">Norm Sement (50 kq)</p>
                        <p className="text-[10px] text-slate-500">M100 hörgü məhlulu üçün</p>
                      </div>
                      <span className="text-base font-extrabold text-orange-600">{wallRes.cementBags} kisə</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">İnşaat Qumu</p>
                        <p className="text-[10px] text-slate-500">Yuyulmuş kvars qumu</p>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{wallRes.sandCubicMeters} m³ (~{Math.round(wallRes.sandCubicMeters * 1.5)} Tonna)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddWallToCart}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Kərpic və Sementi Səbətə Əlavə Et</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. FLOOR & TILE CALCULATOR */}
          {calcTab === 'floor' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3.5 text-xs bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">Döşəmə Sahəsi və Plitə</h3>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-slate-600 mb-1">Otağın Uzunluğu (metr)</label>
                    <input
                      type="number"
                      value={floorInput.roomLength}
                      onChange={(e) => setFloorInput({ ...floorInput, roomLength: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Otağın Eni (metr)</label>
                    <input
                      type="number"
                      value={floorInput.roomWidth}
                      onChange={(e) => setFloorInput({ ...floorInput, roomWidth: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Döşəmə Forması (Kəsim itkisi)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFloorInput({ ...floorInput, layoutType: 'straight' })}
                      className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer transition-all ${
                        floorInput.layoutType === 'straight'
                          ? 'border-orange-600 bg-orange-50/80 text-orange-950 ring-1 ring-orange-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Düz Döşəmə (+7% itki)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFloorInput({ ...floorInput, layoutType: 'diagonal' })}
                      className={`p-2.5 rounded-xl border text-center font-semibold cursor-pointer transition-all ${
                        floorInput.layoutType === 'diagonal'
                          ? 'border-orange-600 bg-orange-50/80 text-orange-950 ring-1 ring-orange-500'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Diaqonal (+10% itki)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">1 Qutuda olan Kafel/Laminat Sahəsi (m²)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={floorInput.boxCoverageM2}
                    onChange={(e) => setFloorInput({ ...floorInput, boxCoverageM2: Number(e.target.value) || 1.44 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Standart 60x60 sm kafel qutusu: ~1.44 m²</p>
                </div>
              </div>

              {/* Results */}
              <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-3">
                    <span className="text-xs font-bold text-orange-950">Hesablanmış Döşəmə Materialı</span>
                    <span className="text-xs font-semibold text-slate-600">Otaq: {floorRes.areaM2} m²</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">Ümumi Kafel/Laminat</p>
                        <p className="text-[10px] text-slate-500">İtki ilə birlikdə</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-orange-600">{floorRes.totalAreaWithWasteM2} m²</span>
                        <p className="text-[10px] text-slate-500 font-medium">~{floorRes.boxesNeeded} Qutu</p>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">Rokol Kafel Yapışdırıcısı (25 kq)</p>
                        <p className="text-[10px] text-slate-500">Mətanət A polimer tərkibli</p>
                      </div>
                      <span className="text-base font-extrabold text-orange-600">{floorRes.adhesiveBags} kisə</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">Dərz Dolğusu (Fuga)</p>
                        <p className="text-[10px] text-slate-500">Plitəarası dərzi doldurmaq üçün</p>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{floorRes.groutKg} kq</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddFloorToCart}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Kafel Yapışdırıcısını Səbətə Əlavə Et</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. PLASTER CALCULATOR */}
          {calcTab === 'plaster' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3.5 text-xs bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">Suvaq və Astar Sahəsi</h3>
                
                <div>
                  <label className="block text-slate-600 mb-1">Suvanacaq Divarların Ümumi Sahəsi (m²)</label>
                  <input
                    type="number"
                    value={plasterInput.wallAreaM2}
                    onChange={(e) => setPlasterInput({ ...plasterInput, wallAreaM2: Number(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Misal üçün: 3 otaqlı mənzil ~180-250 m² divar sahəsidir</p>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Orta Qat Qalınlığı (millimetr)</label>
                  <input
                    type="number"
                    value={plasterInput.thicknessMm}
                    onChange={(e) => setPlasterInput({ ...plasterInput, thicknessMm: Number(e.target.value) || 10 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Standart daxili suvaq qalınlığı: 10 - 20 mm</p>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Suvaq Qarışığı Növü</label>
                  <select
                    value={plasterInput.plasterType}
                    onChange={(e) => setPlasterInput({ ...plasterInput, plasterType: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-none focus:border-orange-600"
                  >
                    <option value="agdag_gypsum">Ağdağ Direk / Knauf Gips Əl Suvağı (30 kq)</option>
                    <option value="cement_sand">Sement-Qum Fasad/Nəm Məkan Suvağı (50 kq)</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-3">
                    <span className="text-xs font-bold text-orange-950">Hesablanmış Suvaq Həcmi</span>
                    <span className="text-xs font-semibold text-slate-600">Ümumi: {plasterRes.totalMaterialKg} kq</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">
                          {plasterInput.plasterType === 'agdag_gypsum' ? 'Ağdağ Direk Gips (30 kq)' : 'Sement Qarışığı (50 kq)'}
                        </p>
                        <p className="text-[10px] text-slate-500">{plasterInput.thicknessMm} mm qalınlıq üçün</p>
                      </div>
                      <span className="text-base font-extrabold text-orange-600">{plasterRes.bagsNeeded} kisə</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <div>
                        <p className="font-bold text-slate-900">Astar Qatqısı (Betonkontakt / Primer)</p>
                        <p className="text-[10px] text-slate-500">Suvaqdan öncə səthə çəkilən astar</p>
                      </div>
                      <span className="text-sm font-bold text-slate-800">~{plasterRes.primerLiters} Litr</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddPlasterToCart}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Ağdağ Suvağını Səbətə Əlavə Et ({plasterRes.bagsNeeded} kisə)</span>
                </button>
              </div>
            </div>
          )}

          {/* 4. CONCRETE & FOUNDATION CALCULATOR */}
          {calcTab === 'concrete' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3.5 text-xs bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">Bünövrə / Monolit Örtük Ölçüləri</h3>
                
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-slate-600 mb-1">Uzunluq (m)</label>
                    <input
                      type="number"
                      value={concreteInput.length}
                      onChange={(e) => setConcreteInput({ ...concreteInput, length: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">En (m)</label>
                    <input
                      type="number"
                      value={concreteInput.width}
                      onChange={(e) => setConcreteInput({ ...concreteInput, width: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Dərinlik (m)</label>
                    <input
                      type="number"
                      value={concreteInput.depth}
                      onChange={(e) => setConcreteInput({ ...concreteInput, depth: Number(e.target.value) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 outline-none focus:border-orange-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Beton Markası</label>
                  <select
                    value={concreteInput.concreteGrade}
                    onChange={(e) => setConcreteInput({ ...concreteInput, concreteGrade: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 outline-none focus:border-orange-600"
                  >
                    <option value="M200">M200 (Yüngül bünövrə və həyət döşəmələri)</option>
                    <option value="M300">M300 (Standart villa bünövrəsi və kəmərlər)</option>
                    <option value="M350">M350 (Yüksək yüklü monolit və sütunlar)</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="p-5 bg-orange-50/60 border border-orange-200 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-orange-200 pb-2 mb-3">
                    <span className="text-xs font-bold text-orange-950">Hesablanmış Beton Həcmi</span>
                    <span className="text-xs font-bold text-orange-600">{concreteRes.volumeM3} m³</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <span className="font-bold text-slate-900">Norm Sement (50 kq)</span>
                      <span className="font-extrabold text-orange-600">{concreteRes.cementBags50kg} kisə</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <span className="font-bold text-slate-900">Qum və Qırmadaş</span>
                      <span className="font-semibold text-slate-700">{concreteRes.sandTons} T qum / {concreteRes.gravelTons} T qırmadaş</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-orange-100 flex justify-between items-center shadow-xs">
                      <span className="font-bold text-slate-900">Təxmini Armatur Ehtiyacı</span>
                      <span className="font-bold text-slate-800">~{concreteRes.rebarKgEstimated} kq (Ø12/14)</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleAddConcreteToCart}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sement və Armaturu Səbətə Əlavə Et</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
