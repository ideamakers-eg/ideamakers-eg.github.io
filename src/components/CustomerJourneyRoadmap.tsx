import React, { useState } from 'react';
import { 
  Gift, 
  Wrench, 
  BarChart3, 
  CreditCard, 
  Key, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  Zap,
  MessageCircle
} from 'lucide-react';
import { useI18n } from '../i18n';

interface Step {
  id: number;
  title: string;
  badge: string;
  duration: string;
  icon: React.ReactNode;
  summary: string;
  details: string[];
  ctaText: string;
  ctaAction: 'smart-form' | 'pricing' | 'whatsapp';
}

interface CustomerJourneyRoadmapProps {
  onNavigateToSection: (sectionId: string) => void;
  onWhatsAppClick: (customMessage?: string) => void;
}

export const CustomerJourneyRoadmap: React.FC<CustomerJourneyRoadmapProps> = ({
  onNavigateToSection,
  onWhatsAppClick,
}) => {
  const { country, t } = useI18n();
  const [activeStep, setActiveStep] = useState<number>(1);

  const stepIcons = [
    <Gift className="w-6 h-6 text-primary" key="1" />,
    <Wrench className="w-6 h-6 text-blue-400" key="2" />,
    <BarChart3 className="w-6 h-6 text-purple-400" key="3" />,
    <CreditCard className="w-6 h-6 text-amber-400" key="4" />,
    <Key className="w-6 h-6 text-emerald-400" key="5" />
  ];
  const stepActions: ('smart-form' | 'pricing' | 'whatsapp')[] = ['smart-form', 'whatsapp', 'pricing', 'pricing', 'smart-form'];

  const steps: Step[] = (t.roadmap?.steps && t.roadmap.steps.length === 5)
    ? t.roadmap.steps.map((s, idx) => ({
        id: idx + 1,
        title: s.title,
        badge: s.badge,
        duration: s.duration,
        icon: stepIcons[idx],
        summary: s.summary,
        details: s.details,
        ctaText: s.ctaText,
        ctaAction: stepActions[idx],
      }))
    : [
    {
      id: 1,
      title: 'طلب التجربة المجانية (3 أيام / 72 ساعة)',
      badge: 'مجاناً 100% - بدون بطاقة ائتمان',
      duration: 'دقيقة واحدة',
      icon: <Gift className="w-6 h-6 text-primary" />,
      summary: 'ابدأ فوراً بتجربة النسخة الاحترافية الكاملة المزايا في صالتك بدون أي رسوم أو التزام مالية.',
      details: [
        'وصول كامل لجميع شاشات الكاشير، الكافيه، وحساب الجلسات',
        'تفعيل فوري لـ 72 ساعة (3 أيام عمل كاملة)',
        'بدون أي طلب لبيانات الفيزا أو البطاقات البنكية',
        'بدون قيود على عدد الأجهزة أو شاشات اللعب'
      ],
      ctaText: 'احصل على التجربة المجانية الآن',
      ctaAction: 'smart-form'
    },
    {
      id: 2,
      title: 'التثبيت والتهيئة الفنية المجانية',
      badge: 'تركيب عن بُعد في 5 دقائق',
      duration: '5 - 10 دقائق',
      icon: <Wrench className="w-6 h-6 text-blue-400" />,
      summary: 'يتولى فريقنا التقني إعداد وتجهيز البرنامج بالكامل على أجهزة صالتك عبر AnyDesk أو TeamViewer.',
      details: [
        'تثبيت محلي آمن يعمل أوفلاين 100% بدون إنترنت',
        'إضافة أسماء الأجهزة والغرف (PS4, PS5, VIP, PC)',
        'ضبط تسعيرات اللعب المتغيرة (Single / Multi / VIP)',
        'إدخال قائمة المشروبات والمأكولات الخاصة بالبار'
      ],
      ctaText: 'تحدث مع مهندس التثبيت مباشرة',
      ctaAction: 'whatsapp'
    },
    {
      id: 3,
      title: 'التشغيل الحي واختبار التدقيق المالي',
      badge: 'سد ثغرات الكاشير والتسريب',
      duration: '72 ساعة حية',
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      summary: 'شغّل النظام في صالتك الحقيقية، وراقب بنفسك كيف يمنع التلاعب بالوقت ويحسب الأرباح بالثانية.',
      details: [
        'تسليم واستلام الشيفتات بمطابقة الخزنة الآلية',
        'تقارير مالية تفصيلية يومية لكافة المبيعات والحجز',
        'حماية كاملة تمنع الكاشير من التلاعب بتوقيت النظام',
        'مقارنة أرباح الصالة قبل وبعد استخدام النظام'
      ],
      ctaText: 'احسب أرباح صالتك المتوقعة',
      ctaAction: 'pricing'
    },
    {
      id: 4,
      title: 'اختيار الباقة والشراء الدائم',
      badge: 'ملكية مدى الحياة - دفع مرة واحدة',
      duration: 'دقيقتان',
      icon: <CreditCard className="w-6 h-6 text-amber-400" />,
      summary: 'اختر الباقة المناسبة لحجم نشاطك (Standard, Professional, International) بملكية دائمة بدون اشتراكات.',
      details: [
        'دفع مرن وآمن مرة واحدة فقط بدون رسوم شهرية أو سنوية',
        'تغطية كاملة لجميع الأجهزة والخدمات والدعم الفني',
        'دعم جميع وسائل الدفع المتاحة في دولتك (فودافون كاش، مدى، تحويل بنكي)',
        'ضمان استعادة الأموال وسند ملكية معتمد للبرنامج'
      ],
      ctaText: 'استعراض الباقات والأسعار',
      ctaAction: 'pricing'
    },
    {
      id: 5,
      title: 'استلام السيريال والملكية والدعم الفني الدائم',
      badge: 'ترخيص رسمي + دعم VIP',
      duration: 'فوري وحاضر دائماً',
      icon: <Key className="w-6 h-6 text-emerald-400" />,
      summary: 'تحصل على سيريال تفعيل دائم مخصص باسم صالتك، مع فتح قناة الدعم الفني المباشرة والأولوية للتحديثات.',
      details: [
        'تسليم مفتاح التفعيل الرسمي الدائم (Permanent License Key)',
        'نسخة احتياطية آمنة لبياناتك وحماية استعادتها بأي وقت',
        'قناة دعم فني هندسي مخصصة لحل أي طوارئ فوراً',
        'تحديثات مستمرة وتطويرات مجانية للنظام'
      ],
      ctaText: 'احصل على نسختك الدائمة الآن',
      ctaAction: 'smart-form'
    }
  ];

  const currentStepData = steps.find(s => s.id === activeStep) || steps[0];

  const handleCtaClick = (step: Step) => {
    if (step.ctaAction === 'smart-form') {
      onNavigateToSection('smart-form');
    } else if (step.ctaAction === 'pricing') {
      onNavigateToSection('pricing');
    } else if (step.ctaAction === 'whatsapp') {
      onWhatsAppClick(`مرحباً فريق صُنّاع الفكرة، أرغب في الاستفسار عن الخطوة ${step.id}: (${step.title}) والتثبيت الفوري.`);
    }
  };

  return (
    <section 
      id="roadmap" 
      data-section="journey"
      className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#08080c] via-[#050505] to-[#08080c] scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Background Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="container relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold mb-3.5 tracking-wide">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{country.flag} {t.roadmap.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.3] mb-3.5">
            كيف تحصل على نظام <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-accent">PlayStation POS</span> بـ 5 خطوات سهلة؟
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed px-2">
            {t.roadmap.subtitle}
          </p>
        </div>

        {/* Mobile Stepper: Horizontal Snap Bar with zero ugly scrollbars & clear labels */}
        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between gap-1 bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 mb-3">
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              const isCompleted = step.id < activeStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-[1.03]'
                      : isCompleted
                      ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-label={`الخطوة ${step.id}`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black ${
                    isActive ? 'bg-white text-primary' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-300'
                  }`}>
                    {isCompleted ? '✓' : step.id}
                  </span>
                  <span className="text-[10px] leading-tight truncate max-w-[55px] font-medium">
                    {step.id === 1 ? 'التجربة' : step.id === 2 ? 'التثبيت' : step.id === 3 ? 'التدقيق' : step.id === 4 ? 'الشراء' : 'الترخيص'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Active Step Indicator for Mobile */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs">
            <span className="text-primary font-bold">
              الخطوة {activeStep} من 5: <span className="text-white font-semibold">{currentStepData.title.split('(')[0]}</span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium">⏱️ {currentStepData.duration}</span>
          </div>
        </div>

        {/* Desktop & Tablet Stepper Bar */}
        <div className="hidden md:grid md:grid-cols-5 gap-2.5 lg:gap-3 mb-8 lg:mb-10">
          {steps.map((step) => {
            const isActive = step.id === activeStep;
            const isCompleted = step.id < activeStep;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`relative flex flex-col items-center text-center p-3.5 lg:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary/20 border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]'
                    : isCompleted
                    ? 'bg-white/[0.04] border-emerald-500/30 text-emerald-300 hover:bg-white/[0.08]'
                    : 'bg-white/[0.02] border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm mb-2 transition-colors ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/40'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : step.id}
                </div>
                <span className="text-xs lg:text-sm font-bold leading-snug line-clamp-2">
                  {step.title.split('(')[0]}
                </span>
                <span className="text-[11px] text-gray-400 mt-1 font-medium">
                  {step.duration}
                </span>

                {/* Top Glowing Indicator */}
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_#a855f7]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-[#0c0c12] border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-9 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow inside Card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left/Main Column: Step Information */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-bold text-xs flex items-center gap-1.5">
                  الخطوة {currentStepData.id} من 5
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-semibold text-xs flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {currentStepData.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 font-semibold text-xs flex items-center gap-1.5 mr-auto">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  المدة: {currentStepData.duration}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
                  {currentStepData.icon}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                    {currentStepData.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {currentStepData.summary}
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 sm:p-5">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  أبرز ما تشمله هذه الخطوة:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentStepData.details.map((detail, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls inside card */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    disabled={activeStep === 1}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-gray-300 transition-all border border-white/10"
                  >
                    الخطوة السابقة
                  </button>
                  <button
                    onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                    disabled={activeStep === 5}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-gray-300 transition-all border border-white/10"
                  >
                    الخطوة التالية
                  </button>
                </div>

                <button
                  onClick={() => handleCtaClick(currentStepData)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-sm transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentStepData.ctaText}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side Callout Banner: Why 3-Day Trial? */}
            <div className="lg:col-span-4 bg-gradient-to-br from-primary/20 via-purple-950/40 to-black/60 border border-primary/30 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/30 border border-primary/40 flex items-center justify-center text-primary font-bold mb-4">
                  <Gift className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-black text-white mb-2">
                  لماذا التجربة المجانية 3 أيام هي خطوتك الأولى؟
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  نحن نؤمن بالشفافية المطلقة. يمكنك تشغيل النظام بجميع مميزاته في صالتك الحقيقية لمدة 72 ساعة مجاناً، ومراقبة مطابقة الشيفتات والأرباح بنفسك قبل دفع أي جنيه.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <button
                  onClick={() => onNavigateToSection('smart-form')}
                  className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>طلب تجربة 3 أيام فوراً</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onWhatsAppClick('مرحباً فريق صُنّاع الفكرة، أرغب في استفسار سريع عن التجربة المجانية 3 أيام.')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>استفسار فوري عبر الواتساب</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourneyRoadmap;
