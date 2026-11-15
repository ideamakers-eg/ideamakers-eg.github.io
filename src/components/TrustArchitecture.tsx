import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CertificateViewerModal } from './CertificateViewerModal';
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
  ExternalLink,
  ZoomIn,
  X,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

// =========================================================================
// 🖼️ روابط شهادات الأمن السيبراني وحماية البنية التحتية الرسمية
// =========================================================================
export const OPSWAT_CERTIFICATE_ARABIC_IMAGE_URL = "/assets/aistudio/Arabic_ICIP_Certificate_Design_1facd76f.png";
export const OPSWAT_CERTIFICATE_ENGLISH_IMAGE_URL = "/assets/aistudio/introduction_to_cip__1__e377c599.png";
export const OPSWAT_VERIFY_URL = "https://learn.opswatacademy.com/certificate/MN4A5aUoGg";
export const OPSWAT_CREDENTIAL_ID = "MN4A5aUoGg";

export const DEFAULT_CISCO_CERTIFICATE_IMAGE_URL = "https://i.postimg.cc/0Q38JF7k/cisco-certificate.png";
export const CISCO_VERIFY_URL = "https://www.credly.com/badges/910cf85b-b5ce-4b11-82fc-dfb906b038a0";
export const CISCO_CREDENTIAL_ID = "1553a1d2-37f1-48b6-9d5919d35f98";

interface TrustArchitectureProps {
  onContactFounder: (message: string) => void;
  certificateImageUrl?: string;
}

export const TrustArchitecture: React.FC<TrustArchitectureProps> = ({ 
  onContactFounder,
  certificateImageUrl = DEFAULT_CISCO_CERTIFICATE_IMAGE_URL
}) => {
  const [activeTab, setActiveTab] = useState<'learning' | 'standards' | 'principles' | 'responsibility'>('learning');
  const [selectedCert, setSelectedCert] = useState<'opswat' | 'cisco'>('opswat');
  const [cipLanguage, setCipLanguage] = useState<'ar' | 'en'>('ar');
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const currentCiscoUrl = certificateImageUrl || DEFAULT_CISCO_CERTIFICATE_IMAGE_URL;

  const handleCopyId = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

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
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-white/[0.02] border border-white/5 text-gray-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>فلسفة الأمان والنزاهة الرقمية</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[1.25] tracking-tight font-cairo"
          >
            الأمان ليس ميزةً مضافة، <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-primary-dark bg-clip-text text-transparent">بل لغة البناء البرمجي الأساسية</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
          >
            نحن نرفض التسويات البرمجية والادعاءات التسويقية الزائفة. في <span className="text-white font-medium">IDEA Makers</span>، نلتزم بمبادئ هندسية واعية وثقافة تعلم مستمر تضمن حماية مشروعك من الجذور.
          </motion.p>
        </div>

        {/* ================= EDUCATIONAL COMMITMENT & DIGITAL CERTIFICATE SHOWCASE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-28" id="education-certificate-block">
          
          {/* Certificate Column (CSS-crafted high-fidelity replica with bilingual toggle) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 relative group"
          >
            {/* Ambient glow behind card */}
            <div className="absolute inset-0 bg-primary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
            
            {/* Real CSS Digital Certificate Box */}
            <div className="relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 md:p-9 border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-black/85 shadow-3xl overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-44 h-44 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
              
              {/* ================= CERTIFICATE SELECTOR TABS ================= */}
              <div className="mb-4 sm:mb-6 pb-4 sm:pb-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedCert('opswat')}
                    className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCert === 'opswat'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 border border-primary/50'
                        : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">OPSWAT (CIP)</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold shrink-0">جديدة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCert('cisco')}
                    className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedCert === 'cisco'
                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30 border border-primary/50'
                        : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.07] border border-white/5'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                    <span className="truncate">Cisco Academy</span>
                  </button>
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-2 text-left text-[11px] text-gray-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-gray-300 font-medium">سجل رسمي نشط وموثق</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 sm:hidden">معتمد</span>
                </div>
              </div>

              {/* ================= CERTIFICATE HEADER ================= */}
              <div className="flex justify-between items-start border-b border-white/[0.05] pb-4 mb-4">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-black block mb-1">
                    {selectedCert === 'opswat' ? 'OPSWAT ACADEMY — CRITICAL INFRASTRUCTURE' : 'CISCO NETWORKING ACADEMY'}
                  </span>
                  <span className="text-xs text-gray-300 block font-light">
                    {selectedCert === 'opswat' 
                      ? 'أكاديمية حماية البنى التحتية الحيوية والأنظمة الرقمية الحساسة' 
                      : 'مؤسسة تدريب وتأهيل أمن الشبكات والأنظمة الرقمية العالمية'}
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 bg-primary/10 border border-primary/20 rounded-xl text-primary shrink-0">
                  {selectedCert === 'opswat' ? <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" /> : <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
                </div>
              </div>

              {/* ================= BILINGUAL TOGGLE BUTTON (ARABIC / ENGLISH) ================= */}
              {selectedCert === 'opswat' && (
                <div className="mb-4 sm:mb-5 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-950/40 via-black/50 to-purple-950/20 border border-primary/25 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shadow-inner">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary shrink-0 animate-pulse" />
                    <span className="text-xs text-gray-200 font-bold">لغة الشهادة:</span>
                    <span className="text-[11px] text-gray-400">
                      ({cipLanguage === 'ar' ? 'النسخة المترجمة المعتمدة بالعربية' : 'Official English Master Copy'})
                    </span>
                  </div>

                  {/* Responsive Segmented control */}
                  <div className="grid grid-cols-2 sm:flex sm:items-center p-1 rounded-xl bg-black/70 border border-white/10 shadow-lg gap-1">
                    <button
                      type="button"
                      onClick={() => setCipLanguage('ar')}
                      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cipLanguage === 'ar'
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md shadow-primary/30 border border-white/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      aria-pressed={cipLanguage === 'ar'}
                      title="عرض الشهادة باللغة العربية"
                    >
                      <span>🇸🇦</span>
                      <span>عرض بالعربي</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCipLanguage('en')}
                      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        cipLanguage === 'en'
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-md shadow-primary/30 border border-white/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                      aria-pressed={cipLanguage === 'en'}
                      title="View Certificate in English"
                    >
                      <span>🌐</span>
                      <span>English (إنجليزي)</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ================= CERTIFICATE IMAGE FRAME (ULTRA HIGH DEFINITION & FULLY RESPONSIVE) ================= */}
              <div 
                onClick={() => setIsZoomModalOpen(true)}
                className="mb-3 relative group rounded-xl sm:rounded-2xl overflow-hidden border border-primary/30 bg-black/60 cursor-pointer shadow-[0_12px_36px_rgba(0,0,0,0.85)] hover:border-primary/60 transition-all active:scale-[0.99]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsZoomModalOpen(true);
                  }
                }}
                aria-label="تكبير الشهادة في عارض كامل الشاشة عالي الدقة"
              >
                <div className="p-2 sm:p-4 flex items-center justify-center min-h-[220px] sm:min-h-[320px] md:min-h-[380px] bg-gradient-to-b from-black/40 via-transparent to-black/60">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={selectedCert === 'opswat' ? `opswat-${cipLanguage}` : 'cisco'}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      src={
                        selectedCert === 'opswat'
                          ? (cipLanguage === 'ar' ? OPSWAT_CERTIFICATE_ARABIC_IMAGE_URL : OPSWAT_CERTIFICATE_ENGLISH_IMAGE_URL)
                          : currentCiscoUrl
                      } 
                      alt={
                        selectedCert === 'opswat'
                          ? (cipLanguage === 'ar' ? 'شهادة مقدمة في حماية البنية التحتية الحيوية - إسلام عرفة' : 'OPSWAT Academy - Introduction to CIP - Eslam Arafa')
                          : 'Cisco Introduction to Cybersecurity Certificate - Eslam Arafa'
                      }
                      className="w-full h-auto max-h-[320px] sm:max-h-[440px] md:max-h-[480px] object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </AnimatePresence>
                </div>

                {/* Mobile & Desktop Interactive Zoom Hint Bar */}
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between gap-2 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                    <ZoomIn className="w-4 h-4 text-primary animate-pulse shrink-0" />
                    <span className="truncate">اضغط للتكبير والفحص عالي الدقة (Full HD)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-primary to-purple-600 text-white shadow-sm shrink-0">
                    تكبير
                  </span>
                </div>
              </div>

              {/* Quick Actions Row directly under Certificate */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => setIsZoomModalOpen(true)}
                  className="px-2 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/30 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">تكبير الشاشة</span>
                </button>
                <a
                  href={selectedCert === 'opswat' ? OPSWAT_VERIFY_URL : CISCO_VERIFY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer text-center shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">فحص الرابط</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyId(selectedCert === 'opswat' ? OPSWAT_CREDENTIAL_ID : CISCO_CREDENTIAL_ID)}
                  className="px-2 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                  <span className="truncate">{copiedId ? 'تم النسخ!' : 'نسخ الكود'}</span>
                </button>
              </div>

              {/* ================= CERTIFICATE CONTENT & META ================= */}
              <div className="space-y-4 sm:space-y-5 text-right">
                <div>
                  <span className="text-[11px] text-gray-500 block">يُمنح ميثاق الحضور والتأهيل المعتمد لـ</span>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <span className="text-xl sm:text-3xl font-black text-white block mt-1 font-cairo">إسلام عرفة</span>
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      خريج معتمد
                    </span>
                  </div>
                  <span className="text-xs text-primary font-medium block mt-1 font-mono">Founder & CEO, Lead Engineer – IDEA Makers</span>
                </div>

                {/* Course Details Block */}
                <div className="py-3.5 sm:py-4 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.05] inline-block w-full">
                  <span className="text-[11px] text-gray-500 block mb-1">البرنامج والمادة المنجزة بنجاح:</span>
                  <span className="text-sm sm:text-lg font-bold text-white block font-cairo">
                    {selectedCert === 'opswat' 
                      ? (cipLanguage === 'ar' ? 'مقدمة في حماية البنية التحتية الحيوية (CIP - ICIP)' : 'Introduction to Critical Infrastructure Protection (ICIP)')
                      : 'مقدمة في الأمن السيبراني (Introduction to Cybersecurity)'}
                  </span>
                  <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                    {selectedCert === 'opswat'
                      ? 'تأهيل معتمد من أكاديمية OPSWAT لحماية البيئات الحساسة والشبكات المعزولة (Air-gapped) ومحطات التشغيل من الهجمات الخبيثة وضمان استمرارية تشغيل صالات الألعاب كبنية مستقلة ومحمية 100%.'
                      : 'تأكيد منهجي على كفاءات فحص الثغرات الأمنية، تأمين قواعد البيانات المحلية والشبكات، وفهم آليات الاختراق ومكافحتها لبناء أنظمة مرنة.'}
                  </p>
                  
                  {selectedCert === 'opswat' && (
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-primary-light font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span>اعتمادات التعليم المهني المستمر: 0.50 CPE Credits</span>
                    </div>
                  )}
                </div>

                {/* Official Verification Box */}
                <div className="py-3 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl bg-[#0F0D13] border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-purple-500/20 border border-primary/30 flex items-center justify-center text-primary-light shrink-0">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-light">
                        {selectedCert === 'opswat' ? 'التحقق الرسمي من أكاديمية OPSWAT' : 'الشارة الرقمية المعتمدة من Cisco'}
                      </span>
                      <span className="text-xs text-gray-200 font-bold block mt-0.5">
                        {selectedCert === 'opswat' ? 'سجل رسمي نشط وموثق برقم الاعتماد' : 'موثق ومعتمد على منصة Credly الدولية'}
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    href={selectedCert === 'opswat' ? OPSWAT_VERIFY_URL : CISCO_VERIFY_URL} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/20 shrink-0"
                  >
                    <span>{selectedCert === 'opswat' ? 'التحقق من الشهادة (OPSWAT)' : 'تحقق من الشارة (Credly)'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Certificate Meta Details with Copy Button */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 border-t border-white/[0.04] text-xs text-gray-500 font-mono">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block mb-1">CERTIFICATE ID</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-300 font-medium truncate max-w-[120px] sm:max-w-none">
                        {selectedCert === 'opswat' ? OPSWAT_CREDENTIAL_ID : CISCO_CREDENTIAL_ID}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyId(selectedCert === 'opswat' ? OPSWAT_CREDENTIAL_ID : CISCO_CREDENTIAL_ID)}
                        className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                        title="نسخ رقم الاعتماد"
                      >
                        {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block mb-1">
                      {selectedCert === 'opswat' ? 'VALID THROUGH' : 'DATE COMPLETED'}
                    </span>
                    <span className="text-gray-300 font-medium text-xs">
                      {selectedCert === 'opswat' ? '10/2026 – 10/2027' : '17 June 2026'}
                    </span>
                  </div>
                </div>

                {/* Signatures & Architectural scope */}
                <div className="pt-2 flex justify-between items-end border-t border-white/[0.03]">
                  <div className="text-left font-serif">
                    <span className="text-xs text-gray-300 block">
                      {selectedCert === 'opswat' ? 'Benny Czarny & Irfan Shakeel' : 'Lynn Bloomer'}
                    </span>
                    <span className="text-[9px] text-gray-500 block">
                      {selectedCert === 'opswat' ? 'OPSWAT Academy Leadership' : 'Cisco Academy Board'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-gray-500 block">نطاق الاستخدام الهيكلي</span>
                    <span className="text-[11px] text-primary font-medium block">
                      {selectedCert === 'opswat' ? 'تأمين الشبكات المعزولة ومحطات الألعاب' : 'تأمين كود الكاشير وإدارة الخزينة'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Explanation Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 space-y-6 text-right"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/20 text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>شهادات سيبرانية معتمدة عالمياً</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-cairo leading-snug">
              التعلم ليس بهدف "جمع الألقاب"، بل لبناء عقلية هندسية واعية تحمي صالتك
            </h3>
            
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
              نحن نؤمن بأن الأمان لا يأتي عبر شهادة تُعلّق على الحائط لتضمن سلامة البرمجيات تلقائياً؛ فكل نظام برمجيات بحاجة لتيقظ وتحديث مستمر وهندسة دفاعية استباقية. 
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-start gap-2.5">
                <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-white block mb-0.5">OPSWAT Academy — Introduction to CIP</strong>
                  اعتماد تخصصي في <span className="text-primary-light">حماية البنية التحتية الحيوية (Critical Infrastructure Protection)</span>، يضمن بناء نظام IDEA Makers كبنية تحتية محلية مغلقة ومحصنة ضد أي برمجيات ضارة أو اختراقات طرفية داخل الصالة.
                </p>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-white/5">
                <Award className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-white block mb-0.5">Cisco Networking Academy — Cybersecurity</strong>
                  تأهيل أكاديمي موثق عبر منصة Credly العالمية لتطبيق أفضل ممارسات التشفير المحلي، وسد ثغرات الكاشير والتلاعب بالأوقات، وتأمين قواعد البيانات بنسبة 100%.
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed font-light">
              هذه الخلفية العلمية لمؤسسنا المهندس <span className="text-white font-medium">إسلام عرفة</span> تضمن لك راحة البال؛ فنظام صالتك مُصمم بعقلية مهندسي أمن معلومات، لا مجرد مبرمجين عاديين.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5 justify-end">
              <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-300 font-medium">حماية البنية التحتية (CIP)</span>
              <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-300 font-medium">نظام محلي معزول 100% Offline</span>
              <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-300 font-medium">غلق الورديات الأعمى</span>
              <span className="px-3 py-1 rounded-lg text-xs bg-white/[0.02] border border-white/5 text-gray-300 font-medium">منع التلاعب بالوقت والأسعار</span>
            </div>
          </motion.div>
        </div>

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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                          transition={{ duration: 1.5, ease: "easeOut" }} 
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
                        <Lock className="w-6 h-6 animate-pulse" />
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
                      <span className="text-xs text-gray-400 block font-light">خصوصية كاملة للبيانات (نظام محلي أوفلاين)</span>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
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
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-[2.5rem] p-8 sm:p-16 text-center border border-white/[0.03] bg-gradient-to-b from-white/[0.01] to-transparent relative overflow-hidden"
          id="trust-cta-block"
        >
          {/* Subtle concentric decorative background lights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
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

      {/* High-Resolution Responsive Fullscreen Certificate Viewer */}
      <CertificateViewerModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        imageUrl={
          selectedCert === 'opswat'
            ? (cipLanguage === 'ar' ? OPSWAT_CERTIFICATE_ARABIC_IMAGE_URL : OPSWAT_CERTIFICATE_ENGLISH_IMAGE_URL)
            : currentCiscoUrl
        }
        title={
          selectedCert === 'opswat'
            ? (cipLanguage === 'ar' ? 'شهادة OPSWAT Academy — حماية البنية التحتية الحيوية (CIP)' : 'OPSWAT Academy — Introduction to Critical Infrastructure Protection (ICIP)')
            : 'شهادة Cisco السيبرانية الرسمية — إسلام عرفة'
        }
        recipientName="إسلام عرفة (Eslam Arafa)"
        courseName={
          selectedCert === 'opswat'
            ? (cipLanguage === 'ar' ? 'مقدمة في حماية البنية التحتية الحيوية (CIP)' : 'Introduction to Critical Infrastructure Protection (ICIP)')
            : 'مقدمة في الأمن السيبراني (Introduction to Cybersecurity)'
        }
        credentialId={selectedCert === 'opswat' ? OPSWAT_CREDENTIAL_ID : CISCO_CREDENTIAL_ID}
        verifyUrl={selectedCert === 'opswat' ? OPSWAT_VERIFY_URL : undefined}
        credlyUrl={selectedCert === 'cisco' ? CISCO_VERIFY_URL : undefined}
        verifyLabel={selectedCert === 'opswat' ? 'التحقق عبر OPSWAT Academy' : 'التحقق عبر Credly'}
        supportsBilingual={selectedCert === 'opswat'}
        currentLanguage={cipLanguage}
        onLanguageToggle={(lang) => setCipLanguage(lang)}
      />
    </section>
  );
};
