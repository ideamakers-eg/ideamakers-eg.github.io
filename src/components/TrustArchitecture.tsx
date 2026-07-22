import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  BookOpen, 
  Cpu, 
  Layers, 
  ArrowLeft, 
  MessageCircle, 
  Award, 
  CheckCircle, 
  Lock, 
  Terminal, 
  Zap,
  Globe,
  Database,
  ExternalLink
} from 'lucide-react';
import { MediaRenderer } from './MediaRenderer';
import ciscoCertificateImg from '../assets/images/cisco_certificate_1783313854566.jpg';

interface TrustArchitectureProps {
  onContactFounder: (message: string) => void;
  cmsContent?: any;
}

export const TrustArchitecture: React.FC<TrustArchitectureProps> = ({ onContactFounder, cmsContent }) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'standards' | 'principles' | 'responsibility'>('learning');
  
  const showMode = cmsContent?.trustCertShowMode || 'both';
  const certImg = cmsContent?.trustCertImgUrl || '';
  
  const [activeCertView, setActiveCertView] = useState<'replica' | 'image'>(
    showMode === 'image' ? 'image' : 'replica'
  );

  // Sync state if showMode changes
  useEffect(() => {
    if (showMode === 'image') {
      setActiveCertView('image');
    } else if (showMode === 'replica') {
      setActiveCertView('replica');
    }
  }, [showMode]);

  const trustCards = [
    {
      id: "learning",
      title: "التعلم والتطور المعرفي المستمر",
      icon: BookOpen,
      description: "سعينا الدائم نحو المعرفة الأكاديمية والمهنية — بما في ذلك دراسات الأمن السيبراني المتطورة — لا يهدف لجمع الألقاب، بل لترسيخ عقلية دفاعية متيقظة تواكب أحدث التطورات وتتفادى الثغرات قبل ظهورها.",
      valueMarker: "عقلية برمجية مواكبة للحاضر",
      iconColor: "text-amber-400",
      bgGradient: "from-amber-500/10 to-transparent",
      borderColor: "group-hover:border-amber-500/25",
      glowColor: "group-hover:shadow-amber-500/5",
      bulletPoints: [
        "متابعة دورية لأحدث ثغرات الأنظمة المحلية وقواعد البيانات",
        "تطبيق بروتوكولات حماية متجددة تتعدى مجرد البرمجة التقليدية",
        "الاستثمار المستمر في التدريب والتحصيل المعرفي لبناء دفاعات صلبة"
      ]
    },
    {
      id: "standards",
      title: "المعايير الهندسية المهنية",
      icon: Cpu,
      description: "نلتزم بكتابة كود نقي وموثق يخضع لمراجعات دقيقة واختبارات كفاءة صارمة. نصمم معمارية النظام لتكون مرنة وقادرة على معالجة البيانات بأعلى قدر من الدقة والاستقرار.",
      valueMarker: "هندسة برمجية من الدرجة الأولى",
      iconColor: "text-blue-400",
      bgGradient: "from-blue-500/10 to-transparent",
      borderColor: "group-hover:border-blue-500/25",
      glowColor: "group-hover:shadow-blue-500/5",
      bulletPoints: [
        "بناء كود نمطي (Modular Code) يسهل فصحه ومراجعته بشكل آلي",
        "تجنب الممارسات البرمجية العشوائية التي تؤدي لتباطؤ الأجهزة",
        "هيكلة قواعد بيانات متماسكة تمنع تعارض البيانات أو ضياع السجلات"
      ]
    },
    {
      id: "principles",
      title: "الوعي الشامل بمبادئ الأمن الرقمي",
      icon: Shield,
      description: "حماية تقاريرك المالية وسجلات صالتك تبدأ من مرحلة التخطيط الأولي. نعي تماماً أساليب الهندسة الاجتماعية ومحاولات التلاعب بكاشير الصالة، ونصمم الحماية في صلب كود النظام.",
      valueMarker: "تصميم واعٍ بالمخاطر والتهديدات",
      iconColor: "text-emerald-400",
      bgGradient: "from-emerald-500/10 to-transparent",
      borderColor: "group-hover:border-emerald-500/25",
      glowColor: "group-hover:shadow-emerald-500/5",
      bulletPoints: [
        "سد ثغرات الكاشير التقنية عبر نظام صلاحيات صارم",
        "تشفير السجلات الحساسة والتقارير المالية محلياً بنظام تشفير قوي",
        "التصدي المسبق لسيناريوهات الاحتيال وتغيير أوقات اللعب اليدوية"
      ]
    },
    {
      id: "responsibility",
      title: "التطوير المسؤول والسيادة الكاملة",
      icon: Layers,
      description: "تطوير البرمجيات مسؤولية أخلاقية أولاً. لهذا صممنا نظاماً يعمل محلياً بالكامل (100% Offline) بملكية كاملة وأبدية لصاحب العمل، لضمان استمرارية صالتك بمعزل عن انقطاع الإنترنت أو مخاطر الخوادم السحابية.",
      valueMarker: "ملكية مستقلة وسيادة تامة",
      iconColor: "text-purple-400",
      bgGradient: "from-purple-500/10 to-transparent",
      borderColor: "group-hover:border-purple-500/25",
      glowColor: "group-hover:shadow-purple-500/5",
      bulletPoints: [
        "بيانات صالتك ملكك بالكامل ولا تُخزن على خوادم خارجية مبهمة",
        "استقلالية تشغيلية تضمن عدم توقف أعمالك حتى عند انقطاع الإنترنت العالمي",
        "نظام ترخيص لمرة واحدة يعفيك من التزامات الاشتراكات الشهرية المرهقة"
      ]
    }
  ];

  const handleCTAClick = () => {
    const text = "*مرحبًا المهندس إسلام عرفة* 👋\n\nلقد اطلعت على ميثاق الثقة والأمان الهيكلي والتزامكم بالمعايير الهندسية للأمن السيبراني في أنظمة IDEA Makers. أود حجز استشارتي الفنية المجانية لمناقشة كيفية تأمين صالتي وتطوير أدائها التشغيلي.";
    onContactFounder(text);
  };

  const currentTabContent = trustCards.find(card => card.id === activeTab) || trustCards[0];

  return (
    <section id="trust-architecture-section" className="py-24 md:py-32 relative overflow-hidden bg-black text-white border-t border-white/[0.02]">
      {/* Premium Ambient Lights & Grids (Stripe / Linear visual style) */}
      <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />
      
      {/* Decorative Blur Spheres with custom layout to frame content */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-500/[0.03] blur-[130px] rounded-full pointer-events-none" />
      
      {/* Linear light bars */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* ================= HEADER BLOCK ================= */}
        <div id="trust-header-block" className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <motion.div 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/[0.02] border border-white/5 text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>فلسفة الأمان والنزاهة الرقمية</span>
          </motion.div>
          
          <motion.h2 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.25] tracking-tight font-cairo"
          >
            الأمان ليس ميزةً مضافة، <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-primary-dark bg-clip-text text-transparent">بل لغة البناء البرمجي الأساسية</span>
          </motion.h2>

          <motion.p 
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            نحن نرفض التسويات البرمجية والادعاءات التسويقية الزائفة. في <span className="text-white font-medium">IDEA Makers</span>، نلتزم بمبادئ هندسية واعية وثقافة تعلم مستمر تضمن حماية مشروعك من الجذور.
          </motion.p>
        </div>

        {/* ================= EDUCATIONAL COMMITMENT & DIGITAL CERTIFICATE SHOWCASE ================= */}
        {showMode !== 'none' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-28" id="education-certificate-block">
            
            {/* Certificate Column (Interactive & CMS Managed) */}
            <motion.div 
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-7 relative group"
            >
              {/* Ambient glow behind card */}
              <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
              
              {showMode === 'both' && (
                <div className="flex justify-center mb-6 relative z-20">
                  <div className="flex bg-[#0c0c0e]/90 border border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => setActiveCertView('image')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeCertView === 'image'
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>صورة الشهادة الرسمية</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCertView('replica')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        activeCertView === 'replica'
                          ? 'bg-primary text-white shadow-lg'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>النسخة الرقمية التفاعلية</span>
                    </button>
                  </div>
                </div>
              )}

              {activeCertView === 'image' ? (
                /* Actual Image rendering with elegant styling and verified seal */
                <div className="relative rounded-3xl p-3 sm:p-4 border border-white/[0.05] bg-gradient-to-b from-white/[0.03] to-transparent shadow-3xl overflow-hidden backdrop-blur-xl flex flex-col justify-between h-full min-h-[420px]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 w-full flex-1 flex items-center justify-center p-2 rounded-2xl bg-black/30 border border-white/5 overflow-hidden group/img">
                    <MediaRenderer 
                      src={certImg || ciscoCertificateImg} 
                      type="image" 
                      className="max-h-[380px] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-500 group-hover/img:scale-[1.02]" 
                      alt="Cisco Cybersecurity Certificate - Eslam Arafa" 
                    />
                  </div>

                  {/* Verification Bar */}
                  <div className="mt-4 py-3 px-4 rounded-2xl bg-[#0F0D13] border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-right relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center text-primary-light shrink-0">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-400 block font-light">الشهادة الرسمية الموثقة من Cisco</span>
                        <span className="text-xs text-gray-200 font-bold block mt-0.5">موثقة برقم معرف 1553a1d2 على منصة Credly الدولية</span>
                      </div>
                    </div>
                    
                    <a 
                      href="https://www.credly.com/badges/910cf85b-b5ce-4b11-82fc-dfb906b038a0" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <span>تحقق من الشارة الرسمية</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                /* Real CSS Digital Certificate Box */
                <div className="relative rounded-3xl p-6 sm:p-10 border border-white/[0.05] bg-gradient-to-b from-white/[0.03] to-transparent shadow-3xl overflow-hidden backdrop-blur-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
                  
                  {/* Header inside Certificate card */}
                  <div className="flex justify-between items-start border-b border-white/[0.05] pb-6 mb-6">
                    <div className="text-right">
                      <span className="text-[10px] uppercase tracking-widest text-primary font-black block mb-1">CISCO NETWORKING ACADEMY</span>
                      <span className="text-xs text-gray-400 block font-light">مؤسسة تدريب الأمن والشبكات العالمية</span>
                    </div>
                    <div className="p-2 bg-white/[0.02] border border-white/5 rounded-xl text-primary">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Certificate content */}
                  <div className="space-y-6 text-right">
                    <div>
                      <span className="text-[11px] text-gray-500 block">يُمنح ميثاق الحضور والتأهيل لـ</span>
                      <span className="text-2xl sm:text-3xl font-black text-white block mt-1 font-cairo">إسلام عرفة</span>
                      <span className="text-xs text-primary font-medium block mt-1">Founder & CEO, Lead Engineer – IDEA Makers</span>
                    </div>

                    <div className="py-4 px-4 rounded-2xl bg-white/[0.01] border border-white/[0.03] inline-block w-full">
                      <span className="text-[11px] text-gray-500 block mb-1">البرنامج والمادة المنجزة بنجاح:</span>
                      <span className="text-base sm:text-lg font-bold text-white block font-cairo">مقدمة في الأمن السيبراني (Introduction to Cybersecurity)</span>
                      <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                        تأكيد منهجي على كفاءات فحص الثغرات الأمنية، تأمين قواعد البيانات المحلية والشبكات، وفهم آليات الاختراق ومكافحتها لبناء أنظمة مرنة.
                      </p>
                    </div>

                    {/* Credly Digital Badge & Verification Link */}
                    <div className="py-3 px-4 rounded-2xl bg-[#0F0D13] border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
                      <div className="flex items-center gap-3">
                        {/* Simplified geometric representations of Credly Badge */}
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center text-primary-light shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] text-gray-400 block font-light">الشارة الرقمية المعتمدة من Cisco</span>
                          <span className="text-xs text-gray-200 font-bold block mt-0.5">موثق ومعتمد على منصة Credly الدولية</span>
                        </div>
                      </div>
                      
                      <a 
                        href="https://www.credly.com/badges/910cf85b-b5ce-4b11-82fc-dfb906b038a0" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <span>تحقق من الشارة</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Certificate Meta Details */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.03] text-xs text-gray-500 font-mono">
                      <div>
                        <span className="text-[10px] uppercase text-gray-600 block mb-1">CERTIFICATE ID</span>
                        <span className="text-gray-300 font-medium">1553a1d2-37f1-48b6-9d5919d35f98</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-gray-600 block mb-1">DATE COMPLETED</span>
                        <span className="text-gray-300 font-medium">17 June 2026</span>
                      </div>
                    </div>

                    {/* Certificate Signature */}
                    <div className="pt-4 flex justify-between items-end">
                      <div className="text-left font-serif">
                        <span className="text-xs text-gray-400 block">Lynn Bloomer</span>
                        <span className="text-[9px] text-gray-600 block">Cisco Academy Board</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-gray-500 block">نطاق الاستخدام الهيكلي</span>
                        <span className="text-[11px] text-primary font-medium block">تأمين كود الكاشير وإدارة الخزينة</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Explanation Text Column */}
            <motion.div 
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 space-y-6 text-right"
            >
              <span className="text-xs uppercase tracking-wider text-primary font-bold block">الفلسفة خلف الأكواد</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-cairo leading-snug">
                التعلم ليس بهدف "جمع الألقاب"، بل لبناء عقلية هندسية واعية
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                نحن نؤمن بأن الأمان لا يأتي عبر شهادة تُعلّق على الحائط لتضمن سلامة البرمجيات تلقائياً؛ فكل نظام برمجيات بحاجة لتيقظ وتحديث مستمر. 
              </p>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light">
                إن دراسات أمن المعلومات والأمن السيبراني المستمرة لمؤسسنا المهندس <span className="text-white font-medium">إسلام عرفة</span> تشكل الدعامة الأساسية لثقافة التطوير داخل <span className="text-primary">IDEA Makers</span>. نحن نوجه هذا الوعي العلمي والعملي المكتسب من أكاديميات عالمية مثل <span className="text-white font-medium">Cisco</span> لنصمم حلولاً تمنع التلاعب بالورديات وسرقة الكاشير، مع الحفاظ على كود متماسك وآمن بنسبة 100%. يمكنك التحقق بشكل رسمي من صحة هذه الشارة من خلال منصة <span className="text-white font-medium">Credly</span> العالمية الشهيرة لتوثيق الشهادات.
              </p>
              <div className="pt-4 flex flex-wrap gap-3 justify-end">
                <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-400 font-medium">تأمين الذاكرة المحلية</span>
                <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-400 font-medium">غلق الورديات الأعمى</span>
                <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-400 font-medium">حظر التعديلات الخارجية</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* ================= INTERACTIVE TRUST PILLARS SECTION (APPLE/STRIPE) ================= */}
        <div className="space-y-12" id="interactive-trust-pillars">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 className="text-xl sm:text-2xl font-black text-white font-cairo">ركائز الأمان الهيكلي الأربعة</h3>
            <p className="text-gray-400 text-sm sm:text-base font-light">
              اختر أحد الركائز الأساسية أدناه لتستكشف كيف نطبقها عملياً داخل كود وهيكل نظام التشغيل لصاللتك
            </p>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto border-b border-white/[0.03] pb-6">
            {trustCards.map((card) => {
              const IconComponent = card.icon;
              const isSelected = activeTab === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => setActiveTab(card.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-primary text-white shadow-lg shadow-primary/25 border-primary' 
                      : 'bg-white/[0.01] text-gray-400 border border-white/[0.03] hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <IconComponent className="w-4 h-4 shrink-0" />
                  <span className="font-cairo">{card.title}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Card Presentation Container */}
          <div className="max-w-4xl mx-auto relative min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="rounded-3xl border border-white/[0.04] bg-gradient-to-b from-white/[0.01] to-transparent p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-right"
              >
                {/* Information side (Col-7) */}
                <div className="md:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 justify-end">
                    <span className="text-xs text-primary font-black uppercase tracking-wider">{currentTabContent.valueMarker}</span>
                    <div className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/5 ${currentTabContent.iconColor}`}>
                      {React.createElement(currentTabContent.icon, { className: "w-5 h-5" })}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-cairo">{currentTabContent.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed font-light">{currentTabContent.description}</p>
                  
                  {/* Bullets List inside interactive card */}
                  <div className="space-y-3 pt-4 border-t border-white/[0.03]">
                    <span className="text-xs text-gray-500 font-bold block uppercase tracking-wider">كيف نطبقه في الواقع؟</span>
                    {currentTabContent.bulletPoints.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 justify-end text-sm text-gray-400 font-light">
                        <span>{bullet}</span>
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Aesthetic Visual Side (Col-5) */}
                <div className="md:col-span-5 w-full h-full min-h-[220px] rounded-2xl border border-white/[0.03] bg-black/[0.3] p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                  
                  {/* Mock Technical Visual Structure representing active tab */}
                  <div className="relative z-10 flex justify-between items-center border-b border-white/[0.05] pb-3 text-xs text-gray-500 font-mono">
                    <span className="flex items-center gap-1.5 text-emerald-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      SECURE
                    </span>
                    <span className="text-gray-400">PILLAR_0{trustCards.findIndex(c => c.id === activeTab) + 1}</span>
                  </div>

                  {activeTab === 'learning' && (
                    <div className="relative z-10 py-6 space-y-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-gray-400 block font-light">تكامل وتعلّم مستمر للأمن البرمجي</span>
                      <div className="h-1.5 w-full bg-white/[0.02] rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: "95%" }} 
                          transition={{ duration: 0.15, ease: "easeOut" }} 
                          className="h-full bg-amber-400" 
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'standards' && (
                    <div className="relative z-10 py-4 space-y-3 font-mono text-[11px] text-right text-gray-500">
                      <div className="text-blue-400 border-b border-white/[0.03] pb-1">class SecureDatabaseManager &#123;</div>
                      <div className="pr-2 text-gray-400">private static instance: Database;</div>
                      <div className="pr-2 text-gray-400">public secureWrite(payload: Log) &#123;</div>
                      <div className="pr-4 text-emerald-400">// Strict verification protocols</div>
                      <div className="pr-4 text-purple-400">validateDataSovereignty(payload);</div>
                      <div className="pr-2">&#125;</div>
                    </div>
                  )}

                  {activeTab === 'principles' && (
                    <div className="relative z-10 py-6 space-y-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                        <Lock className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-gray-400 block font-light">تأمين مبيعات الصالات ضد الاحتيال والسرقة</span>
                      <div className="flex gap-2 justify-center">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">BLIND SHIFT</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-bold border border-primary/20">SQL_CIPHER</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'responsibility' && (
                    <div className="relative z-10 py-6 space-y-4 text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
                        <Globe className="w-6 h-6" />
                      </div>
                      <span className="text-xs text-gray-400 block font-light">استقلالية سيادية تامة 100% أوفلاين</span>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <span>قواعد بيانات محلية مشفرة</span>
                        <Database className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}

                  <div className="relative z-10 border-t border-white/[0.05] pt-3 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>V_2.8.0</span>
                    <span>IDEA MAKERS ARCHITECTURE</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ================= APPLE-STYLE EXECUTIVE FOUNDER QUOTE ================= */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto my-28 border-r border-primary/40 pr-8 pl-0 py-2 text-right relative"
          id="trust-founder-quote"
        >
          {/* Quote Glow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
          
          <span className="text-primary text-6xl font-serif block mb-1 leading-none select-none">“</span>
          
          <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 leading-relaxed italic mb-6">
            "دراسة الأمن السيبراني والحصول على الشهادات المهنية لا ينبغي أبداً تقديمها كصكوك خارقة تضمن أماناً برمجياً مطلقاً؛ بل هي دليل على التزام هندسي نابع من عقلية واعية تفهم أن حماية أصول وبيانات العميل تتطلب تعلماً مستمراً وتطويراً مسؤولاً لا يتوقف أبداً."
          </blockquote>
          
          <cite className="not-italic block">
            <span className="text-white font-medium block text-base font-cairo">المهندس إسلام عرفة</span>
            <span className="text-gray-500 text-sm">المؤسس والمدير التنفيذي لـ IDEA Makers</span>
          </cite>
        </motion.div>

        {/* ================= PREMIUM CALL TO ACTION (CTA) ================= */}
        <motion.div 
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto rounded-[2.5rem] p-8 sm:p-16 text-center border border-white/[0.03] bg-gradient-to-b from-white/[0.01] to-transparent relative overflow-hidden"
          id="trust-cta-block"
        >
          {/* Subtle concentric decorative background lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight font-cairo">ابدأ خطوة التغيير وبناء السيادة الكاملة</h3>
            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed">
              احجز جلسة استشارة تقنية مباشرة ومجانية مع المهندس إسلام عرفة لمناقشة أبعاد الأمان، التثبيت، والربط التشغيلي لشبكة صالتك.
            </p>
            
            <div className="pt-6">
              <button
                type="button"
                onClick={handleCTAClick}
                className="inline-flex items-center gap-3 bg-white text-black hover:bg-gray-100 px-8 py-4 sm:px-10 sm:py-4.5 rounded-2xl font-bold text-base sm:text-lg transition-all active:scale-[0.98] shadow-2xl hover:shadow-white/10 cursor-pointer mr-auto ml-auto group"
              >
                <MessageCircle className="w-5 h-5 shrink-0" />
                <span className="font-cairo">ناقش المعايير الهندسية والتشغيلية لصالتك</span>
                <ArrowLeft className="w-4 h-4 shrink-0 mr-1 transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
