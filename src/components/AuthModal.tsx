import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User as UserIcon, Lock, Mail, Phone, Building2, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { User } from '../types';
import { DEMO_USERS } from '../utils/helpers';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);
  const [role, setRole] = useState<'individual' | 'contractor'>('individual');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+994 ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('Zəhmət olmasa email və şifrənizi daxil edin.');
        return;
      }

      // Check if matches demo or custom user
      const foundDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (foundDemo) {
        setSuccessMsg(`Xoş gəldiniz, ${foundDemo.name}!`);
        setTimeout(() => {
          onLoginSuccess(foundDemo);
          onClose();
        }, 600);
      } else {
        // Create authenticated session for entered credentials
        const newUser: User = {
          id: 'user-' + Date.now(),
          name: email.split('@')[0],
          email: email,
          phone: '+994 50 000 00 00',
          role: 'individual',
          bonusPoints: 50,
          addresses: [],
          createdAt: new Date().toISOString().split('T')[0]
        };
        setSuccessMsg('Giriş uğurla tamamlandı!');
        setTimeout(() => {
          onLoginSuccess(newUser);
          onClose();
        }, 600);
      }
    } else if (mode === 'register') {
      if (!name || !email || !password) {
        setErrorMsg('Zəhmət olmasa tələb olunan bütün xanaları doldurun.');
        return;
      }

      if (password.length < 6) {
        setErrorMsg('Şifrə minimum 6 simvoldan ibarət olmalıdır.');
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg('Şifrələr uyğun gəlmir.');
        return;
      }

      const createdUser: User = {
        id: 'user-' + Date.now(),
        name,
        email,
        phone: phone.trim() || '+994 50 111 22 33',
        role,
        companyName: role === 'contractor' ? companyName : undefined,
        taxNumber: role === 'contractor' ? taxNumber : undefined,
        bonusPoints: 100, // 100 bonus points gift on registration!
        addresses: [],
        createdAt: new Date().toISOString().split('T')[0]
      };

      setSuccessMsg('Qeydiyyat uğurla tamamlandı! 100 bonus balı hesabınıza köçürüldü.');
      setTimeout(() => {
        onLoginSuccess(createdUser);
        onClose();
      }, 700);
    } else if (mode === 'forgot') {
      if (!email) {
        setErrorMsg('Zəhmət olmasa qeydiyyatlı emailinizi daxil edin.');
        return;
      }
      setSuccessMsg('Şifrə yeniləmə linki email ünvanınıza göndərildi.');
      setTimeout(() => {
        setMode('login');
      }, 1500);
    }
  };

  const handleQuickDemoLogin = (demoUser: User) => {
    setEmail(demoUser.email);
    setPassword('demo1234');
    setSuccessMsg(`${demoUser.name} kimi daxil olunur...`);
    setTimeout(() => {
      onLoginSuccess(demoUser);
      onClose();
    }, 400);
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
            className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header */}
            <div className="bg-slate-900 p-6 text-white text-center relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              <div className="w-12 h-12 bg-orange-600/20 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-orange-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <h2 className="text-lg font-black tracking-tight">
                {mode === 'login' && 'Şəxsi Hesaba Giriş'}
                {mode === 'register' && 'Yeni Hesab Yarat'}
                {mode === 'forgot' && 'Şifrənin Bərpası'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {mode === 'login' && 'Sifarişlərinizi izləyin, endirimlərdən və bonuslardan yararlanın'}
                {mode === 'register' && 'Qeydiyyatdan keçin və 100 bonus xalı qazanın'}
                {mode === 'forgot' && 'Email ünvanınızı daxil edərək şifrənizi yeniləyin'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            {mode !== 'forgot' && (
              <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-3 transition-colors cursor-pointer ${
                    mode === 'login' 
                      ? 'bg-white text-orange-600 border-b-2 border-orange-600 shadow-xs' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Giriş
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`py-3 transition-colors cursor-pointer ${
                    mode === 'register' 
                      ? 'bg-white text-orange-600 border-b-2 border-orange-600 shadow-xs' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Qeydiyyat
                </button>
              </div>
            )}

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              {errorMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium"
                >
                  {errorMsg}
                </motion.div>
              )}

              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{successMsg}</span>
                </motion.div>
              )}

              {/* REGISTER: Account Type Selector */}
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block">Hesab Növü:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('individual')}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        role === 'individual' 
                          ? 'border-orange-600 bg-orange-50/60 text-orange-800' 
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Fərdi Şəxs</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('contractor')}
                      className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        role === 'contractor' 
                          ? 'border-orange-600 bg-orange-50/60 text-orange-800' 
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Usta / Tikinti Şirkəti</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Name field for Register */}
              {mode === 'register' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ad və Soyad *</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Məs: Əli Əliyev"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 font-medium"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Contractor fields */}
              {mode === 'register' && role === 'contractor' && (
                <div className="space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Şirkət / Briqada Adı</label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Məs: Azər-Tikinti MMC və ya Rəşad Usta"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-slate-900 font-medium"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">VÖEN (Korporativ faktura üçün)</label>
                    <input
                      type="text"
                      value={taxNumber}
                      onChange={(e) => setTaxNumber(e.target.value)}
                      placeholder="Məs: 1234567891"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Ünvanı *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ad@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Phone for Register */}
              {mode === 'register' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Əlaqə Nömrəsi</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+994 50 123 45 67"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">Şifrə *</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] text-orange-600 hover:underline font-semibold cursor-pointer"
                      >
                        Şifrəni unutmusunuz?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 font-medium"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Confirm Password for Register */}
              {mode === 'register' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Şifrənin Təkrarı *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 focus:bg-white transition-all text-slate-900 font-medium"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-colors mt-2"
              >
                <span>
                  {mode === 'login' && 'Daxil Ol'}
                  {mode === 'register' && 'Hesab Yarat'}
                  {mode === 'forgot' && 'Bərpa Linkini Göndər'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="w-full text-center text-slate-600 hover:text-slate-900 font-semibold cursor-pointer pt-2"
                >
                  ← Giriş səhifəsinə qayıt
                </button>
              )}
            </form>

            {/* Quick Demo Logins Box */}
            {mode === 'login' && (
              <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Sınaq üçün Sürətli Demo Giriş:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleQuickDemoLogin(DEMO_USERS[0])}
                    className="p-2.5 bg-white hover:bg-orange-50/70 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-slate-800">{DEMO_USERS[0].name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">Fərdi Müştəri</p>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => handleQuickDemoLogin(DEMO_USERS[1])}
                    className="p-2.5 bg-white hover:bg-orange-50/70 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-slate-800 truncate">{DEMO_USERS[1].name.split(' ')[0]}</p>
                    <p className="text-[10px] text-orange-600 font-bold">Usta / B2B Hesabı</p>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
