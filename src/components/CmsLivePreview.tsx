import React, { useState } from 'react';
import { 
  Monitor, Smartphone, Tablet, RotateCw, Moon, Sun, AlignRight, AlignLeft,
  Play, Check, HelpCircle, Phone, MessageSquare, Star, ArrowRight, Video,
  Sparkles, Layers, Landmark, Info
} from 'lucide-react';

interface CmsLivePreviewProps {
  cmsData: Record<string, any>;
}

export const CmsLivePreview: React.FC<CmsLivePreviewProps> = ({ cmsData }) => {
  // Preview configuration states
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [isRtl, setIsRtl] = useState<boolean>(true);

  // Helper values or defaults
  const primaryColor = cmsData.primaryColor || '#a855f7';
  const secondaryColor = cmsData.secondaryColor || '#3b82f6';
  const fontName = cmsData.primaryFont || 'Inter';

  // Toggle helpers
  const toggleOrientation = () => {
    setOrientation(prev => prev === 'portrait' ? 'landscape' : 'portrait');
  };

  // Determine viewport width classes based on device and orientation
  const getViewportWidthClass = () => {
    if (device === 'desktop') return 'w-full h-[620px]';
    if (device === 'tablet') {
      return orientation === 'portrait' 
        ? 'w-[480px] h-[650px] rounded-3xl' 
        : 'w-[768px] h-[450px] rounded-3xl';
    }
    // Mobile
    return orientation === 'portrait' 
      ? 'w-[320px] h-[550px] rounded-3xl' 
      : 'w-[520px] h-[320px] rounded-3xl';
  };

  return (
    <div className="bg-[#0c0c0e] border border-white/5 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl h-full">
      {/* Device Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-black/40 p-2.5 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] text-gray-400 font-bold">لوحة المعاينة الفورية (Webflow Mode)</span>
        </div>

        {/* Device select buttons */}
        <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-white/5">
          <button
            type="button"
            title="معاينة الشاشة العريضة (Desktop)"
            onClick={() => { setDevice('desktop'); }}
            className={`p-1.5 rounded transition-all cursor-pointer ${device === 'desktop' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="معاينة التابلت (Tablet)"
            onClick={() => { setDevice('tablet'); }}
            className={`p-1.5 rounded transition-all cursor-pointer ${device === 'tablet' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="معاينة الجوال (Mobile)"
            onClick={() => { setDevice('mobile'); }}
            className={`p-1.5 rounded transition-all cursor-pointer ${device === 'mobile' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Layout Modifiers */}
        <div className="flex items-center gap-1.5 text-xs">
          {/* Orientation rotation */}
          {device !== 'desktop' && (
            <button
              type="button"
              onClick={toggleOrientation}
              title="تدوير الشاشة"
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Theme mode selection */}
          <button
            type="button"
            onClick={() => setThemeMode(prev => prev === 'dark' ? 'light' : 'dark')}
            title="تغيير المظهر"
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all cursor-pointer flex items-center gap-1"
          >
            {themeMode === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-600" />}
          </button>

          {/* Direction direction preview */}
          <button
            type="button"
            onClick={() => setIsRtl(!isRtl)}
            title="اتجاه الكتابة (عربي / إنجليزي)"
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-all cursor-pointer flex items-center gap-1"
          >
            {isRtl ? <AlignRight className="w-3.5 h-3.5 text-purple-400" /> : <AlignLeft className="w-3.5 h-3.5 text-blue-400" />}
            <span className="text-[9px] font-bold">{isRtl ? 'عربي' : 'EN'}</span>
          </button>
        </div>
      </div>

      {/* Viewport Frame Box */}
      <div className="flex-1 flex justify-center items-center bg-black/20 p-2 rounded-xl overflow-hidden min-h-[400px]">
        <div 
          className={`transition-all duration-300 border border-white/10 bg-[#050505] shadow-2xl flex flex-col overflow-hidden relative ${getViewportWidthClass()} ${
            themeMode === 'light' ? 'bg-zinc-50 text-zinc-900 border-zinc-200 shadow-zinc-200/10' : 'bg-[#050505] text-white'
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
          style={{
            fontFamily: fontName === 'Inter' ? '"Inter", sans-serif' : fontName === 'Cairo' ? '"Cairo", sans-serif' : fontName
          }}
        >
          {/* Mock Browser/Device Header */}
          <div className="bg-zinc-900 border-b border-white/10 px-4 py-2 flex items-center justify-between text-xs shrink-0 select-none">
            {/* Dots */}
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            {/* URL text */}
            <div className="bg-white/5 border border-white/5 rounded px-8 py-0.5 text-[9px] text-gray-400 font-mono truncate max-w-xs select-all text-center">
              https://ideamakers.eg/pos-{cmsData.localeDefault || 'ar'}
            </div>
            <div className="w-10" />
          </div>

          {/* Scrolling Simulated Website Viewport */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-12 pb-12 text-right">
            
            {/* Live custom style variables applied only inside this frame */}
            <style>{`
              .preview-primary-btn {
                background-color: ${primaryColor} !important;
                color: #ffffff !important;
              }
              .preview-primary-btn:hover {
                opacity: 0.9;
              }
              .preview-secondary-btn {
                background-color: ${secondaryColor} !important;
                color: #ffffff !important;
              }
              .preview-text-primary {
                color: ${primaryColor} !important;
              }
              .preview-text-secondary {
                color: ${secondaryColor} !important;
              }
              .preview-border-primary {
                border-color: ${primaryColor} !important;
              }
            `}</style>

            {/* MOCK WEBSITE: Navbar */}
            <header className="px-4 py-3 flex justify-between items-center border-b border-white/5 sticky top-0 bg-black/90 backdrop-blur z-10 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-black text-white text-[10px]">
                  IM
                </div>
                <span className="font-black text-xs text-white">IDEA MAKERS</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px] text-gray-400">
                <span>{isRtl ? 'المميزات' : 'Features'}</span>
                <span>{isRtl ? 'الأسعار' : 'Pricing'}</span>
                <span>{isRtl ? 'المدونة' : 'Blog'}</span>
              </div>
              <button 
                type="button" 
                className="px-3 py-1 rounded-lg text-[9px] font-bold preview-primary-btn cursor-pointer shadow-lg shadow-purple-500/10 shrink-0"
              >
                {isRtl ? 'تحدث معنا' : 'Contact Us'}
              </button>
            </header>

            {/* MOCK WEBSITE: Hero Section */}
            <section className="px-4 text-center space-y-4 pt-4 relative">
              {/* Badge */}
              {cmsData.cmsTag && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-gray-300 mx-auto">
                  <span className="w-1.5 h-1.5 rounded-full preview-primary-btn animate-pulse" />
                  <span>{cmsData.cmsTag}</span>
                </div>
              )}

              {/* Title prefix & Highlighted title */}
              <h1 className="text-sm sm:text-lg font-black leading-tight max-w-md mx-auto text-white">
                {cmsData.cmsTitlePrefix || 'نظام إدارة صالات البلايستيشن'} <br />
                <span className="preview-text-primary underline decoration-2 decoration-purple-500/40 font-extrabold block sm:inline mt-1">
                  {cmsData.cmsTitleHighlight || 'سيستم كاشير بلايسيتشن'}
                </span>
              </h1>

              {/* Description */}
              <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed">
                {cmsData.cmsDescription || 'نظام متكامل لإدارة البلايستيشن والكافيه والمخازن. صُمم خصيصاً لرفع أرباحك وتقليل الفوضى.'}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center gap-2.5 pt-2">
                <button type="button" className="px-4 py-2 rounded-xl text-[9px] font-black preview-primary-btn flex items-center gap-1 shadow-md shadow-purple-500/20">
                  <span>{cmsData.cmsTrialBtnText || 'ابدأ تجربة مجانية'}</span>
                </button>
                <button type="button" className="px-4 py-2 rounded-xl text-[9px] font-black bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                  <span>{isRtl ? 'شاهد الشرح' : 'Demo video'}</span>
                </button>
              </div>

              {/* Video Mockup */}
              <div className="pt-4 max-w-sm mx-auto">
                <div className="aspect-video bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5 text-right">
                    <span className="text-[9px] font-bold text-white flex items-center gap-1.5">
                      <Video className="w-3 h-3 text-red-500 shrink-0" />
                      <span>فيديو العرض والتشغيل الاستراتيجي</span>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 text-white fill-white translate-x-[-1px]" />
                  </div>
                </div>
              </div>
            </section>

            {/* MOCK WEBSITE: Why Choose Us (Features) */}
            <section className="px-4 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-black tracking-wider preview-text-primary uppercase">مميزات حصرية</span>
                <h2 className="text-xs sm:text-sm font-black text-white">{cmsData.cmsWhyChooseTitle || 'لماذا تختارنا لسيادة صالتك؟'}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl space-y-1.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-[10px] font-bold">
                    ✓
                  </div>
                  <h3 className="text-[10px] font-bold text-white">{cmsData.cmsWhy1Title || 'نظام أوفلاين بالكامل'}</h3>
                  <p className="text-[9px] text-gray-400 leading-relaxed">{cmsData.cmsWhy1Desc || 'لا حاجة للاتصال بالإنترنت، عمل صالتك مستمر دائماً بأمان.'}</p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl space-y-1.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-bold">
                    ✓
                  </div>
                  <h3 className="text-[10px] font-bold text-white">{cmsData.cmsWhy2Title || 'ملكية مدى الحياة'}</h3>
                  <p className="text-[9px] text-gray-400 leading-relaxed">{cmsData.cmsWhy2Desc || 'ادفع لمرة واحدة فقط وامتلك الترخيص والسيستم للأبد.'}</p>
                </div>
              </div>
            </section>

            {/* MOCK WEBSITE: Founder Story */}
            <section className="px-4 bg-white/[0.01] border-y border-white/5 py-8">
              <div className="max-w-md mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* Photo mockup */}
                <div className="aspect-[4/5] bg-zinc-800 rounded-xl border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2 text-right">
                    <span className="text-[9px] font-bold text-white">م. إسلام عرفة</span>
                    <span className="text-[8px] text-gray-400">Founder & CEO</span>
                  </div>
                </div>
                {/* Story text */}
                <div className="sm:col-span-2 space-y-2">
                  <span className="text-[8px] tracking-wider font-bold text-primary">{cmsData.cmsFounderStorySubtitle || 'الرؤية والابتكار الميداني'}</span>
                  <h3 className="text-[10px] font-black text-white">{cmsData.cmsFounderStoryTitle || 'من هو صانع الفكرة؟'}</h3>
                  <p className="text-[9px] text-gray-400 leading-relaxed italic">
                    "{cmsData.cmsFounderQuote || 'النظام تم تطويره بمحاكاة ميدانية حقيقية لضمان سد كافة الثغرات المالية للكاشير.'}"
                  </p>
                </div>
              </div>
            </section>

            {/* MOCK WEBSITE: Pricing Packages */}
            <section className="px-4 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[9px] font-bold preview-text-secondary uppercase">خطط الاستثمار المالي</span>
                <h2 className="text-xs sm:text-sm font-black text-white">{cmsData.cmsPricingTitle || 'استثمار سيادي.. لمرة واحدة'}</h2>
                <p className="text-[9px] text-gray-400 max-w-xs mx-auto">{cmsData.cmsPricingSubtitle || 'لا توجد رسوم مخفية، لا توجد اشتراكات سنوية.'}</p>
              </div>

              {/* Cards row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="bg-white/[0.02] border border-white/10 p-3.5 rounded-xl space-y-2.5 relative">
                  <span className="text-[8px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded-full inline-block">باقة البداية</span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-white">4000</span>
                    <span className="text-[8px] text-gray-400 block">جنيه مصري / للأبد</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 space-y-1 text-[8px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      <span>رخصة لفرع واحد وللأبد</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      <span>نظام أوفلاين محلي 100%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.04] border-2 preview-border-primary p-3.5 rounded-xl space-y-2.5 relative shadow-xl">
                  <div className="absolute -top-2.5 left-3 bg-primary text-white text-[7px] font-black px-2 py-0.5 rounded-full">الأكثر طلباً 🔥</div>
                  <span className="text-[8px] font-black bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full inline-block">الباقة الاحترافية</span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-white">6000</span>
                    <span className="text-[8px] text-gray-400 block">جنيه مصري / للأبد</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 space-y-1 text-[8px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      <span>نظام صلاحيات متقدم ومراقبة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      <span>نظام الكافيه والمشروبات</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/10 p-3.5 rounded-xl space-y-2.5 relative">
                  <span className="text-[8px] font-black bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full inline-block">باقة الخليج</span>
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-white">10000</span>
                    <span className="text-[8px] text-gray-400 block">جنيه مصري / للأبد</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 space-y-1 text-[8px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      <span>دعم تغيير وتثبيت العملة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                      <span>دعم فني دولي ذو أولوية</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MOCK WEBSITE: Footer */}
            <footer className="border-t border-white/5 pt-6 px-4 text-center space-y-3">
              <p className="text-[9px] text-gray-500">© 2026 IDEA MAKERS. جميع الحقوق محفوظة.</p>
              <div className="flex justify-center gap-3 text-[9px] text-gray-400">
                <span>تليفون: {cmsData.cmsPhone || '201121778205'}</span>
                <span>واتساب متاح دائماً</span>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};
