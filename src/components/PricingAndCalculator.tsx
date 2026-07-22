import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Globe, 
  Calculator, 
  TrendingUp, 
  Monitor, 
  Clock, 
  DollarSign, 
  ArrowRight,
  Zap,
  ShieldCheck,
  Headset
} from 'lucide-react';
import { COUNTRIES, INTERNATIONAL_PACKAGE_FEATURES } from '../constants';
import { Country } from '../types';
import { cn } from '../lib/utils';

export const PricingAndCalculator = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>('EG');
  const [devices, setDevices] = useState(5);
  const [hours, setHours] = useState(6);
  const [hourlyPrice, setHourlyPrice] = useState(COUNTRIES['EG'].defaultHourlyPrice);

  const countryConfig = COUNTRIES[selectedCountry];

  // Update hourly price when country changes
  useEffect(() => {
    setHourlyPrice(countryConfig.defaultHourlyPrice);
  }, [selectedCountry]);

  const monthlyRevenue = devices * hours * hourlyPrice * 30;

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const whatsappLink = `https://wa.me/201121778205?text=${encodeURIComponent('مرحبا شركة صناع الفكرة\nأريد تجربة نظام إدارة البلايستيشن')}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      {/* Hero / Header */}
      <header className="pt-16 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <h2 className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-3">IDEA Makers – صناع الفكرة</h2>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            نظام إدارة البلايستيشن <br className="hidden md:block" />
            <span className="text-emerald-600">الأكثر ذكاءً وربحية</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            تحكم كامل، تقارير دقيقة، وزيادة فورية في الأرباح مع نظام IDEA Makers المتطور.
          </p>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-24 space-y-24">
        
        {/* Section 1 & 2: Pricing & Country Switch */}
        <section id="pricing" className="relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">الباقة الدولية (International Package)</h2>
            <p className="text-slate-500">اختر دولتك لعرض السعر المناسب لسوقك</p>
            
            {/* Country Switch Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {(Object.keys(COUNTRIES) as Country[]).map((code) => (
                <button
                  key={code}
                  onClick={() => handleCountryChange(code)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 border-2",
                    selectedCountry === code 
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105" 
                      : "bg-white border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50"
                  )}
                >
                  <span className="text-xl">{COUNTRIES[code].flag}</span>
                  <span>{COUNTRIES[code].name === 'Egypt' ? 'مصر' : COUNTRIES[code].name === 'Saudi Arabia' ? 'السعودية' : 'الإمارات'}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-1 max-w-3xl mx-auto">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                  <div>
                    <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                      الأكثر طلباً دولياً
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900">International Package</h3>
                  </div>
                  <div className="text-right">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedCountry}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.12 }}
                        className="flex items-baseline justify-end gap-2"
                      >
                        <span className="text-5xl font-black text-slate-900 tracking-tight">
                          {countryConfig.basePackagePrice.toLocaleString()}
                        </span>
                        <span className="text-xl font-bold text-slate-400">{countryConfig.currency}</span>
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-slate-400 text-sm mt-1">دفع لمرة واحدة - ملكية مدى الحياة</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {INTERNATIONAL_PACKAGE_FEATURES.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="mt-1 bg-emerald-50 text-emerald-600 p-1 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-600 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                  <button 
                    onClick={() => {
                      const el = document.getElementById('smart-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300 group"
                  >
                    احصل على النظام الآن
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
                  </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 3, 4, 5: Profit Calculator */}
        <section id="calculator" className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative">
          {/* Background Accents */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold mb-6">
                <Calculator className="w-4 h-4" />
                أداة تخطيط الأرباح
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                احسب أرباحك المحتملة <br />
                <span className="text-emerald-400">بكل دقة</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-lg">
                أدخل بيانات صالتك الحالية وشاهد كيف يمكن لنظامنا أن يساعدك في تتبع وتنمية إيراداتك الشهرية.
              </p>

              <div className="space-y-8">
                {/* Number of Devices */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-emerald-400" />
                      عدد الأجهزة في الصالة
                    </label>
                    <span className="text-emerald-400 font-mono font-bold text-xl">{devices}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={devices} 
                    onChange={(e) => setDevices(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Working Hours */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      ساعات العمل اليومية
                    </label>
                    <span className="text-emerald-400 font-mono font-bold text-xl">{hours}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="24" 
                    value={hours} 
                    onChange={(e) => setHours(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Hourly Price */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      متوسط سعر الساعة ({countryConfig.currency})
                    </label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        value={hourlyPrice} 
                        onChange={(e) => setHourlyPrice(parseInt(e.target.value) || 0)}
                        className="w-24 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold text-right focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                layout
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-emerald-500/20 relative overflow-hidden"
              >
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                <div className="relative z-10 text-center">
                  <TrendingUp className="w-12 h-12 text-white/40 mx-auto mb-6" />
                  <h3 className="text-white/80 font-bold uppercase tracking-widest text-sm mb-2">إجمالي الإيراد الشهري المتوقع</h3>
                  <div className="flex items-baseline justify-center gap-3 mb-4">
                    <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                      {monthlyRevenue.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-white/70">{countryConfig.currency}</span>
                  </div>
                  <p className="text-emerald-100/70 text-sm mb-10">
                    هذا التقدير بناءً على متوسط سعر ساعة {hourlyPrice} {countryConfig.symbol}
                  </p>

                  <div className="h-px bg-white/20 mb-10" />

                  {/* Section 6: CTA Under Calculator */}
                  <button 
                    onClick={() => {
                      const el = document.getElementById('smart-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full inline-flex items-center justify-center gap-3 bg-white text-emerald-600 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl shadow-emerald-900/20 group"
                  >
                    اكتشف كيف تزيد أرباحك الآن
                    <Zap className="w-6 h-6 fill-current" />
                  </button>

                  {/* Section 8: Conversion Psychology */}
                  <p className="mt-8 text-white/80 text-sm leading-relaxed font-medium">
                    "في المتوسط يمكن لصالة بلايستيشن صغيرة أن تسترد ثمن النظام خلال أيام قليلة فقط."
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={() => {
                        const el = document.getElementById('smart-form');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-white underline underline-offset-4 font-bold hover:text-emerald-100 transition-colors"
                    >
                      ابدأ تجربتك المجانية الآن
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">أمان كامل</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">سرعة فائقة</span>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Headset className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">دعم 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="text-center pt-12 border-t border-slate-200">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} IDEA Makers – صناع الفكرة. جميع الحقوق محفوظة.
          </p>
        </footer>
      </main>
    </div>
  );
};
