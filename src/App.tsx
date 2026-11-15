import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  WifiOff, 
  Clock, 
  Shield,
  ShieldCheck, 
  Settings, 
  Users, 
  MessageCircle, 
  ChevronDown, 
  Star, 
  Zap, 
  Trophy,
  ArrowLeft,
  Menu,
  X,
  Play,
  Monitor,
  Plus,
  Minus,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Calculator,
  Handshake,
  Eye,
  Target,
  Gamepad2,
  Quote,
  Send,
  Gift,
  CreditCard,
  Percent
} from 'lucide-react';
import SmartForm from './components/SmartForm';
import { SocialIcons } from './components/SocialIcons';
import { Testimonials } from './components/Testimonials';
import ScrollProgress from './components/ScrollProgress';
import GrayscaleImage from './components/GrayscaleImage';
import Footer from './components/Footer';
import { MediaRenderer } from './components/MediaRenderer';
import { TrustArchitecture } from './components/TrustArchitecture';
import { CustomerJourneyRoadmap } from './components/CustomerJourneyRoadmap';
import { localizationData } from './localizationData';
import HeroSection from './components/HeroSection';
import { useI18n, SUPPORTED_COUNTRIES } from './i18n';
import { OFFICIAL_PRICING_PACKAGES, formatPriceEGP } from './pricingConfig';
import { SEO_PILLAR_PAGES } from './data/seoPillars';
import { SeoPillarView } from './components/SeoPillarView';
import { GuidesHubView } from './components/GuidesHubView';
import CompanyProfileViewerModal from './components/CompanyProfileViewerModal';
import CompanyProfileSection from './components/CompanyProfileSection';
import CompanyProfilePageView from './components/CompanyProfilePageView';
import { BookOpen, FileText } from 'lucide-react';
import { Analytics } from './lib/analytics';

const WHATSAPP_NUMBER = "201121778205";

export const packages = OFFICIAL_PRICING_PACKAGES;


export const internationalPricing: Record<string, { price: string; currency: string }> = {
  egypt: { price: "10000", currency: "EGP" },
  saudi: { price: "1200", currency: "SAR" },
  uae: { price: "1200", currency: "AED" },
  qatar: { price: "1200", currency: "QAR" },
  kuwait: { price: "100", currency: "KWD" }
};

export const faqs = [
  {
    q: "ما أفضل برنامج لإدارة صالات البلايستيشن وكيف تختاره؟",
    a: "أفضل برنامج هو الذي يوفر استقرارًا تامًا بدون الحاجة اتصال مستمر بالإنترنت (Offline System)، ويضمن لك ملكية كاملة مدى الحياة بدون اشتراكات، مع دقة حسابية متناهية للثانية تمنع التسريب المالي بالكامل. نظام IDEA Makers PlayStation POS يجمع بين هذه الميزات مع تصميم بلمسة هندسية احترافية."
  },
  {
    q: "هل يعمل نظام إدارة صالات البلايستيشن هذا بدون إنترنت؟",
    a: "نعم، هذا برنامج إدارة بلايستيشن أوفلاين بنسبة 100%. يتم تثبيت قواعد البيانات والبرنامج بأمان تام على جهاز الكمبيوتر الخاص بك بمركز الصالة، مما يعني عملاً مستمراً للمقاعد والأجهزة حتى لو انقطعت التغطية تماماً."
  },
  {
    q: "هل يدعم البرنامج إدارة الكاشير والموظفين (تسليم الشيفتات)؟",
    a: "أكيد، يدعم نظامنا تحديد صلاحيات مخصصة لكل موظف، مع إمكانية إغلاق وفتح الشيفتات واستلام الخزنة بمطابقة حسابية آلية دقيقة، مما يضع حدًا نهائيًا لجميع أشكال التسريب المالي أو التلاعب بالوقت."
  },
  {
    q: "هل يدعم تخصيص أسعار اللعب المختلفة (فردي، زوجي، VIP، غرف)؟",
    a: "نعم بالكامل وبمرونة مطلقة. يتيح لك برنامج كاشير صالات الألعاب ضبط الأسعار حسب نوع الجهاز (PS4, PS5, VR, PC) وتحديد تسعيرة متغيرة للساعة (لعب فردي Single أو زوجي/جماعي Multiplayer)، بالإضافة إلى تعريف أسعار غرف الـ VIP بدقة متناهية."
  },
  {
    q: "هل يمكن تشغيل النظام على أكثر من جهاز في نفس الصالة؟",
    a: "نعم، يدعم نظامنا بيئة الشبكة المحلية الهجينة، حيث يمكن تشغيل شاشة الكاشير الرئيسية على جهاز كمبيوتر مركزي وشاشات استعراض الجلسات أو شاشات فرعية للموظفين على أجهزة أخرى مرتبطة بنفس الشبكة الداخلية للصالات."
  },
  {
    q: "هل يدعم النظام إدارة تعدد الفروع والربط المركزي للبيانات؟",
    a: "على الرغم من أن الباقات الجاهزة مطورة لتعمل بملكية محلية (Offline) لضمان الأمان والسرعة الاستثنائية، إلا أن مهندسينا في IDEA Makers لديهم القدرة على بناء نسخ مخصصة لشركتك تدعم تعدد الفروع وتربطها سحابيًا لمتابعة كافة صالاتك من هاتفك."
  },
  {
    q: "هل يتوفر في البرنامج نظام لإدارة مبيعات المشروبات والمأكولات والمخازن؟",
    a: "نعم، يتضمن نظام إدارة Gaming Lounge متكامل قائمة بار (مشروبات ووجبات خفيفة) ويقوم بخصم استهلاك المطبخ والمشروبات تلقائيًا من مخزن الصالة مع كل حركة بيع وإضافتها فورًا على فاتورة جلسة العميل المناسبة."
  },
  {
    q: "هل يوجد حماية وضمان لعدم التعديل اليدوي للوقت وأسعار الجلسات؟",
    a: "بالتأكيد. يحتوي نظامنا براءات حماية برمجية تمنع الكاشير أو الموظف من تعديل وقت النظام الخاص بنظام التشغيل أو التلاعب بالتوقيت الداخلي للجلسات، مما يضمن تدفق مالي آمن تماماً يمتثل لتقارير الفرز اليومية."
  },
  {
    q: "ماذا يحدث لبيانات جلسات اللعب عند انقطاع الكهرباء فجأة؟",
    a: "لا تقلق أبداً، فالنظام يدعم الحماية التلقائية للبيانات الآمنة. يتم حفظ تفاصيل الجلسة النشطة والطلبات تلقائياً وبصفة دورية كل بضع ثوانٍ. عند إعادة التشغيل، سيستأنف النظام عمله تماماً من النقطة التي توقف عندها."
  },
  {
    q: "هل يدعم البرنامج طباعة الفواتير والباركود وتخصيص البيانات؟",
    a: "نعم، يدعم كافة أنواع طابعات الإيصالات الحرارية (Receipt/POS Printers) بمقاسات 80mm و 58mm، ويتيح لك كتابة اسم صالتك، رقم الهاتف، وإضافة لوجو الصالة وشروط اللعب في تذييل الفاتورة."
  },
  {
    q: "هل هناك اشتراك شهري أو سنوي مطلوب بعد الشراء؟",
    a: "لا إطلاقاً، رخصتنا تعتمد فلسفة الدفع مرة واحدة لامتلاك البرامج للأبد. تحصل على ملكية مدى الحياة للنسخة دون أي رسوم تجديد دورية أو نسب مئوية من حجم أرباح الصالة."
  },
  {
    q: "كيف يساهم نظام إدارة Gaming Lounge في زيادة أرباح صالتي بنسبة 30%؟",
    a: "من خلال ثلاثة محاور: 1) القضاء على تسريب الدقائق المحاسبية المجانية للأصدقاء، 2) تنظيم الحساب وجرد بوفيه وصالة الألعاب آلياً دون أي ثغرة عجز، 3) فهم الخدمات الأكثر ربحية من خلال التقارير المالية الذكية والمؤشرات التحليلية."
  },
  {
    q: "ما هي المتطلبات الفنية الدنيا للأجهزة لتشغيل البرنامج بنجاح؟",
    a: "إن برنامج PlayStation POS System خفيف ومحسن تقنيًا للغاية. يعمل بسلاسة تامة على أي جهاز كمبيوتر أو لابتوب يعمل بنظام تشغيل Windows 7 أو 10 أو 11، وبمواصفات اقتصادية جداً (معالج ثنائي النواة ورامات 4 جيجابايت فقط)."
  },
  {
    q: "هل نوفر خدمات الدعم والتحديثات المجانية لعملاء البرنامج؟",
    a: "نعم وبفخر، ملتزمون في صُنّاع الفكرة (IDEA Makers) بتقديم دعم فني متميز ومتابعة ما بعد الشراء لضمان سلامة العمل، بالإضافة إلى تثريات دورية لتحسين واجهات المستخدم ومميزات النظام."
  },
  {
    q: "هل يدعم البرنامج حسابات العروض الترويجية والخصومات لزبائن الصالة؟",
    a: "نعم، يدعم نظام حسابات صالات بلايستيشن تخصيص عروض مسبقة الدفع مثل (لعب 3 ساعات والحصول على ساعة مجانية) أو تطبيق خصومات حرة للعملاء المميزين وتفصيلها بالفاتورة لمراجعتها بالتقارير الإدارية."
  },
  {
    q: "هل يدعم نظام إدارة كافيه ألعاب حجز الأجهزة بشكل مسبق؟",
    a: "نعم بالتأكيد، يوفر واجهة رسومية ومخططاً تفاعلياً واضحاً يوضح للأدمن الأجهزة الشاغرة، والأجهزة المحجوزة مسبقاً بالتاريخ والساعة لتفادي تداخل أدوار العملاء وزيادة مستويات رضاهم."
  }
];

const FloatingCard = ({ children, className, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    animate={{ y: [0, -10, 0] }}
    transition={{ 
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      opacity: { duration: 0.5, delay }
    }}
    className={`absolute glass p-4 rounded-2xl border border-white/10 shadow-2xl z-20 hidden lg:block ${className}`}
  >
    {children}
  </motion.div>
);

const ParticleBackground = () => null;

const RippleButton = ({ children, onClick, className, primary = false, shimmer = false }: any) => {
  const [ripples, setRipples] = useState<any[]>([]);
  
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = { x, y, size, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    if (onClick) onClick();
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(ripples.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <button
      onClick={createRipple}
      className={`btn-ripple group relative overflow-hidden ${className} ${primary ? 'animate-glow-pulse' : ''}`}
    >
      {shimmer && (
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] z-0"
          />
        </div>
      )}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </span>
    </button>
  );
};

const ScrollIndicator = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
    onClick={() => {
      const el = document.getElementById('story');
      el?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">استكشف</span>
    <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent relative overflow-hidden">
      <motion.div 
        animate={{ y: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-primary"
      />
    </div>
  </motion.div>
);

const Logo = ({ className = "", onClick }: { className?: string; onClick?: () => void }) => (
  <a 
    href="/"
    className={`flex items-center gap-2 sm:gap-2.5 group cursor-pointer logo-aura shrink min-w-0 select-none ${className}`} 
    onClick={(e) => {
      e.preventDefault();
      if (onClick) onClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }}
    aria-label="الرئيسية — IDEA MAKERS"
  >
    <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 shrink-0">
      {/* Hexagon Background */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
        <path 
          d="M50 5 L93.3 30 L93.3 70 L50 95 L6.7 70 L6.7 30 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3.5"
          className="animate-pulse"
        />
      </svg>
      {/* Controller Icon */}
      <Gamepad2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] relative z-10" />
    </div>
    <div className="flex flex-col items-start leading-tight min-w-0">
      <span className="text-sm sm:text-base md:text-lg font-black tracking-tight group-hover:text-primary transition-colors duration-300 truncate">IDEA MAKERS</span>
      <span className="text-[9px] sm:text-[10px] font-bold text-primary/90 tracking-wider hidden xs:block">صُنّاع الفكرة</span>
    </div>
  </a>
);

const countries = {
  egypt: {
    id: 'egypt',
    name: 'مصر',
    flag: '🇪🇬',
    currency: 'EGP',
    fullName: 'جنيه مصري',
    hourlyPrice: 20,
    hourlyCurrencyName: 'جنيه',
    rate: 1
  },
  saudi: {
    id: 'saudi',
    name: 'السعودية',
    flag: '🇸🇦',
    currency: 'SAR',
    fullName: 'ريال سعودي',
    hourlyPrice: 10,
    hourlyCurrencyName: 'ريال',
    rate: 0.12
  },
  uae: {
    id: 'uae',
    name: 'الإمارات',
    flag: '🇦🇪',
    currency: 'AED',
    fullName: 'درهم إماراتي',
    hourlyPrice: 10,
    hourlyCurrencyName: 'درهم',
    rate: 0.12
  },
  qatar: {
    id: 'qatar',
    name: 'قطر',
    flag: '🇶🇦',
    currency: 'QAR',
    fullName: 'ريال قطري',
    hourlyPrice: 10,
    hourlyCurrencyName: 'ريال',
    rate: 0.12
  },
  kuwait: {
    id: 'kuwait',
    name: 'الكويت',
    flag: '🇰🇼',
    currency: 'KWD',
    fullName: 'دينار كويتي',
    hourlyPrice: 1,
    hourlyCurrencyName: 'دينار',
    rate: 0.01
  }
};

const Counter = ({ value }: { value: number }) => {
  return <span>{value.toLocaleString()}</span>;
};

const getCountryFromPath = (path: string) => {
  if (path.includes('playstation-pos-egypt')) return countries.egypt;
  if (path.includes('playstation-pos-saudi')) return countries.saudi;
  if (path.includes('playstation-pos-uae')) return countries.uae;
  if (path.includes('playstation-pos-kuwait')) return countries.kuwait;
  if (path.includes('playstation-pos-qatar')) return countries.qatar;
  return null;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerVisibleRef = useRef(true);
  const scrolledRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => 
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  const { country: selectedCountry, t, setCountry: setI18nCountry, formatCurrency, formatNumber } = useI18n();

  // Canonical route computations
  const currentSlug = currentPath.replace(/^\//, '');
  const activePillar = (SEO_PILLAR_PAGES as any)[currentSlug];
  const isGuidesHub = currentPath === '/guides';
  const isGuideArticle = currentPath.startsWith('/guides/');
  const articleSlug = isGuideArticle ? currentPath.replace('/guides/', '') : null;
  const isCompanyProfilePage = currentPath === '/company-profile' || currentPath === '/company-profile/' || currentPath === '/profile';
  const isHomepage = !isGuidesHub && !isGuideArticle && !activePillar && !isCompanyProfilePage;

  // Reusable Section Aliases Map
  const SECTION_ALIASES: Record<string, string> = {
    'journey': 'roadmap',
    'roadmap': 'roadmap',
    'why-us': 'comparison',
    'whyus': 'comparison',
    'comparison': 'comparison',
    'pricing': 'pricing',
    'features': 'features',
    'free-trial': 'smart-form',
    'freetrial': 'smart-form',
    'request-trial': 'smart-form',
    'requesttrial': 'smart-form',
    'trial': 'smart-form',
    'smart-form': 'smart-form',
    'calculator': 'calculator',
    'profit-calculator': 'calculator',
    'faq': 'faq',
    'demo-video': 'demo-video',
    'video': 'demo-video',
    'about': 'about',
    'company-profile': 'company-profile',
    'profile': 'company-profile',
    'proposal': 'company-profile',
  };

  const [isCompanyProfileViewerOpen, setIsCompanyProfileViewerOpen] = useState(false);
  const [companyProfileInitialPage, setCompanyProfileInitialPage] = useState(1);

  const handleOpenCompanyProfile = (pageNumber: number = 1) => {
    setCompanyProfileInitialPage(pageNumber);
    setIsCompanyProfileViewerOpen(true);
  };

  const [pendingSectionScroll, setPendingSectionScroll] = useState<string | null>(null);

  const scrollToSectionElement = (targetId: string, smooth: boolean = true): boolean => {
    const resolvedId = SECTION_ALIASES[targetId] || targetId;
    const el = document.getElementById(resolvedId);
    if (el) {
      const offset = 95; // Account for fixed/sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = Math.max(0, elementPosition - offset);

      window.scrollTo({
        top: offsetPosition,
        behavior: smooth ? 'smooth' : 'auto'
      });
      return true;
    }
    return false;
  };

  const headerRef = useRef<HTMLElement>(null);
  const isHeaderFocusedRef = useRef(false);
  const isMenuOpenRef = useRef(isMenuOpen);
  const isCountryDropdownOpenRef = useRef(isCountryDropdownOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  const showHeader = useCallback(() => {
    headerVisibleRef.current = true;
    setHeaderVisible(true);
    if (headerRef.current) {
      headerRef.current.classList.remove('header-hidden');
    }
  }, []);

  const hideHeader = useCallback(() => {
    headerVisibleRef.current = false;
    setHeaderVisible(false);
    if (headerRef.current) {
      headerRef.current.classList.add('header-hidden');
    }
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    lastScrollYRef.current = 0;
    showHeader();
  };

  const navigateHome = () => {
    const path = selectedCountry.id === 'egypt' ? '/' : `/playstation-pos-${selectedCountry.id}`;
    window.history.pushState({ countryId: selectedCountry.id }, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
    lastScrollYRef.current = 0;
    showHeader();
  };

  const navigateToSection = (rawSectionId: string) => {
    const resolvedId = SECTION_ALIASES[rawSectionId] || rawSectionId;
    setIsMenuOpen(false);
    showHeader();

    if (isHomepage) {
      // Already on homepage: smooth scroll directly and update hash without full reload
      scrollToSectionElement(resolvedId, true);
      const currentBase = currentPath === '/' ? '' : currentPath;
      window.history.pushState(null, '', `${currentBase}#${resolvedId}`);
    } else {
      // On an internal page (Guides hub, article, or pillar):
      // Navigate to homepage first, and schedule the scroll after mount
      const homePath = selectedCountry.id === 'egypt' ? '/' : `/playstation-pos-${selectedCountry.id}`;
      window.history.pushState({ countryId: selectedCountry.id }, '', `${homePath}#${resolvedId}`);
      setCurrentPath(homePath);
      setPendingSectionScroll(resolvedId);
    }
  };

  const scrollToSection = (id: string) => {
    navigateToSection(id);
  };

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
    if (isMenuOpen) {
      showHeader();
    }
  }, [isMenuOpen, showHeader]);

  useEffect(() => {
    isCountryDropdownOpenRef.current = isCountryDropdownOpen;
    if (isCountryDropdownOpen) {
      showHeader();
    }
  }, [isCountryDropdownOpen, showHeader]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      const outsideDesktop = !dropdownRef.current || !dropdownRef.current.contains(target);
      const outsideMobile = !mobileDropdownRef.current || !mobileDropdownRef.current.contains(target);
      if (outsideDesktop && outsideMobile) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsCountryDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [localizations, setLocalizations] = useState(() => {
    const stored = localStorage.getItem('playstation_pos_localization_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return localizationData;
      }
    }
    return localizationData;
  });

  const [packagesData, setPackagesData] = useState(() => {
    const stored = localStorage.getItem('playstation_pos_packages_data');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // If it's old data (e.g. price is 4000 instead of 6000 or missing official features), upgrade to official packages
        if (
          !parsed[0] ||
          Number(parsed[0].price) !== 6000 ||
          !parsed[1] ||
          Number(parsed[1].price) !== 8000 ||
          !parsed[2] ||
          Number(parsed[2].price) !== 10000
        ) {
          localStorage.setItem('playstation_pos_packages_data', JSON.stringify(packages));
          return packages;
        }
        return parsed;
      } catch (e) {
        return packages;
      }
    }
    return packages;
  });

  const [intPricing, setIntPricing] = useState(() => {
    const stored = localStorage.getItem('playstation_pos_international_pricing');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return internationalPricing;
      }
    }
    return internationalPricing;
  });

  const [selectedPackage, setSelectedPackage] = useState(() => {
    const pkgs = localStorage.getItem('playstation_pos_packages_data');
    if (pkgs) {
      try {
        const parsed = JSON.parse(pkgs);
        return parsed[1] || packages[1];
      } catch (e) {}
    }
    return packages[1];
  }); // Default to Professional

  // Landing Page customizable content managed by Admin Dashboard
  const [cmsContent, setCmsContent] = useState(() => {
    const defaultCms = {
      heroTag: "المعيار الذهبي لإدارة الصالات 2026",
      heroTitlePrefix: "نظام إدارة صالات البلايستيشن",
      heroTitleHighlight: "سيستم كاشير بلايسيتشن",
      heroDescription: "نظام متكامل لإدارة البلايستيشن، الكافيه، والمخازن. صُمم خصيصاً لرفع أرباحك وتقليل أخطاء الموظفين بنسبة 99%.",
      demoVideoUrl: "https://www.youtube.com/watch?v=tmfoL7IcuJk",
      demoVideoThumbnailUrl: "https://img.youtube.com/vi/tmfoL7IcuJk/maxresdefault.jpg",
      contactPhone: "201121778205",
      whatsappMessage: "مرحباً فريق صُنّاع الفكرة، أودّ الاستفسار عن نظام إدارة صالات البلايستيشن.",
      authTag: "شريكك الهندسي في النجاح",
      authTitle: "IDEA MAKERS: أكثر من مجرد برنامج",
      authDescription: "نحن لا نبيع لك أكوادًا برمجية، نحن نبني معك بنية تحتية رقمية تضمن لك السيادة الكاملة على مشروعك. نظامنا صُمم بأيدي مهندسين يفهمون طبيعة السوق المصري والخليجي.",
      authStat1Title: "ثقة متزايدة يومياً",
      authStat1Desc: "يستخدمه أصحاب صالات بلايستيشن في مصر والسعودية والإمارات والكويت وقطر",
      authStat2Title: "100%",
      authStat2Desc: "تحت سيطرتك أوفلاين",
      authImageUrl: "https://i.postimg.cc/k56Vy6yG/3-200.jpg",
      
      // Pricing Section Header
      pricingTitle: "استثمار سيادي.. لمرة واحدة",
      pricingSubtitle: "اختر الباقة التي تناسب طموحك. لا توجد رسوم خفية، لا توجد اشتراكات، لا توجد تبعية.",
      
      // Multi-Branch Banner Section
      branchesTitle: "هل تمتلك فروعاً متعددة؟",
      branchesText: "على الرغم من أن الباقات الجاهزة لا تشمل إدارة الفروع، إلا أننا في IDEA Makers يمكننا تصميم وتطوير نظام مخصص لك بالكامل يشمل إدارة الفروع المتعددة والربط السحابي الموحد.",
      branchesBtnText: "اطلب نظامك المخصص الآن",
      
      // Free Trial Banner Section
      trialTitle: "\"ابدأ الآن وقرر بنفسك\"",
      trialText: "خلال 3 أيام فقط، ستسترد قيمة نظام الكاشير بالكامل من الأرباح الإضافية التي ستحققها!\nنحن لا نمنحك مجرد \"تجربة مجانية\"، بل نضع بين يديك **أداة تدقيق مالي وإداري** متكاملة مصممة خصيصاً لإدارة صالات الألعاب والكافيه وسد ثغرات الكاشير. شغل النظام لمدة 3 أيام، وقارن أرباحك الحالية بما كنت تحققه سابقاً.. وستصدمك الفروقات الحقيقية.",
      trialBtnText: "ابدأ تجربة مجانية الآن",

      // Why choose us section
      whyChooseTitle: "لماذا تختار IDEA Makers؟",
      why1Title: "نظام أوفلاين بالكامل",
      why1Desc: "لا حاجة للإنترنت، عملك مستمر دائماً وبدون انقطاع.",
      why2Title: "ملكية مدى الحياة",
      why2Desc: "ادفع مرة واحدة وامتلك النظام للأبد بدون اشتراكات شهرية.",
      why3Title: "تجربة مجانية",
      why3Desc: "3 أيام لاكتشاف القوة الحقيقية للنظام قبل اتخاذ قرار الشراء.",
      why4Title: "تخصيص كامل",
      why4Desc: "تحكّم في الهوية البصرية بما يناسب براند صالتك وشعارك.",
      why5Title: "تركيب احترافي",
      why5Desc: "فريقنا يتولى الإعداد والتشغيل والربط في مكانك.",
      why6Title: "تدريب ودعم فني",
      why6Desc: "نضمن لك ولطاقمك إتقان التعامل مع النظام مع دعم مستمر.",
      why7Title: "صُمم خصيصاً",
      why7Desc: "حلول هندسية موجهة بدقة تلبية احتياجات صالات البلايستيشن.",
      whyChooseFooterText: "اختيار IDEA Makers هو القرار الأذكى لمستقبل صالتك",
      whyChooseFooterBtnText: "تحدث مع خبيرنا التقني الآن",

      // Founder Story section
      founderStorySubtitle: "الرؤية خلف الابتكار",
      founderStoryTitle: "صُنّاع الفكرة",
      founderQuote: "فكرة النظام بدأت عندما لاحظنا الفوضى التي يعاني منها أصحاب صالات البلايستيشن. كمهندس برمجيات، لم أستطع تجاهل حجم الخسائر التي يسببها غياب النظام الدقيق.",
      founderPara1: "لاحظ إسلام عرفة أن العديد من الصالات تعاني من سوء الإدارة، وضياع الأرباح، وغياب التقارير الواضحة. هذا الواقع كان الدافع الأساسي لبناء نظام احترافي صُمم خصيصاً ليفهم لغة هذا البيزنس ويحل مشاكله من الجذور.",
      founderPara2: "تحول IDEA Makers PlayStation POS من مجرد كود برمججي إلى رحلة نجاح ساعدت مئات أصحاب الصالات على الانتقال من الفوضى اليدوية إلى الإدارة الرقمية الذكية التي تضمن السيادة الكاملة والنمو المستدام.",
      founderPara3: "الهدف لم يكن أبداً مجرد بيع برنامج، بل تمكين أصحاب المشاريع من مضاعفة أرباحهم، وإدارة صالاتهم بسهولة، والعمل باحترافية تليق بطموحاتهم.",
      founderBtnText: "اقرأ القصة الكاملة للابتكار",
      founderImgUrl: "/assets/aistudio/IDEA_MAKERS__Neon_Visionary_Founder_Poster_f63e4b3b.png",
      founderName: "Eslam Arafa",
      founderRole: "Founder & CEO – IDEA Makers",
      founderExpTitle: "Expertise",
      founderExpDesc: "Systems Engineer",

      // Brand Authority/About Us section
      aboutUsBadge: "القوة الهندسية خلف مشروعك",
      aboutUsTitle: "من نحن: IDEA Makers",
      aboutUsText1: "نحن شركة تكنولوجيا رائدة متخصصة في تطوير الأنظمة البرمجية وحلول الإدارة الذكية التي تهدف إلى رفع كفاءة الأعمال وزيادة الأرباح.",
      aboutUsText2: "في IDEA Makers، نحن لسنا مجرد بائعي برامج؛ نحن شركة هندسية متكاملة تركز على ابتكار حلول تقنية تعالج التحديات الحقيقية التي تواجه أصحاب المشاريع، مما يضمن لك السيادة الكاملة على بيئة عملك.",
      aboutUsTag1: "تطوير أنظمة الأعمال",
      aboutUsTag2: "حلول الإدارة الذكية",
      aboutUsTag3: "أتمتة العمليات",
      aboutUsBannerType: "Engineering Excellence",
      aboutUsBannerText: "نصمم المستقبل.. لا نكتفي ببرمجته",

      // Vision & Mission
      visionTitle: "رؤيتنا",
      visionText: "نسعى لأن نكون المزوّد الأول والملهم لأنظمة إدارة الأعمال الذكية في قطاع الألعاب والترفيه، من خلال الابتكار المستمر والأتمتة التي تساعد الشركات على النمو والتوسع عالمياً، وتحويل كل صالة إلى كيان مؤسسي ناجح.",
      missionTitle: "رسالتنا",
      missionText: "مهمتنا هي تمكين أصحاب صالات البلايستيشن من إدارة مشاريعهم باحترافية وسهولة، والقضاء على الفوضى التشغيلية، وتحويل التكنولوجيا إلى أداة بسيطة تضاعف الأرباح وتضمن الاستدامة والنمو المستمر.",
      
      // Core Values
      coreValuesTitle: "قيمنا الجوهرية",
      coreValuesSubtitle: "المبادئ التي تحرك كل سطر برمججي نكتبه وكل قرار نتخذه",
      val1Title: "الابتكار",
      val1Desc: "نسابق الزمن لتقديم أحدث الحلول.",
      val2Title: "الموثوقية",
      val2Desc: "أنظمتنا هي العمود الفقري لمشروعك.",
      val3Title: "الشفافية",
      val3Desc: "وضوح كامل في كل تفصيلة تقنية ومالية.",
      val4Title: "التطوير المستمر",
      val4Desc: "لا نتوقف عن تحسين أدواتنا.",
      val5Title: "نجاح العميل",
      val5Desc: "نجاحك هو المقياس الحقيقي لنجاحنا."
    };
    const stored = localStorage.getItem('playstation_pos_cms_content');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed) {
          if (parsed.heroTitleHighlight === "برنامج كاشير وإدارة جلسات الألعاب") {
            parsed.heroTitleHighlight = "سيستم كاشير بلايسيتشن";
          }
          if (parsed.demoVideoUrl === "https://www.youtube.com/watch?v=1CWmNEt6xVs" || !parsed.demoVideoUrl) {
            parsed.demoVideoUrl = "https://www.youtube.com/watch?v=tmfoL7IcuJk";
            parsed.demoVideoThumbnailUrl = "https://img.youtube.com/vi/tmfoL7IcuJk/maxresdefault.jpg";
          }
          localStorage.setItem('playstation_pos_cms_content', JSON.stringify(parsed));
        }
        return { ...defaultCms, ...parsed };
      } catch (e) {
        return defaultCms;
      }
    }
    return defaultCms;
  });

  const activeLocal = {
    problemSectionTitle: t.problems.title,
    problems: t.problems.items,
    solutionSectionTitle: t.solutions.title,
    solutions: t.solutions.items,
    justificationText: t.justification.title,
    justificationPoints: t.justification.points,
    testimonials: t.testimonials.items,
    faqs: t.faq.items,
    ...(localizations[selectedCountry.id as keyof typeof localizations] || {}),
  };

  const hasCustomCms = typeof window !== 'undefined' && !!localStorage.getItem('playstation_pos_cms_content');

  const getActiveField = (fieldKey: 'heroTag' | 'heroTitlePrefix' | 'heroTitleHighlight' | 'heroDescription') => {
    const localVal = activeLocal[fieldKey];
    const defaultLocalVal = localizationData[selectedCountry.id]?.[fieldKey];
    const isLocalCustomized = localVal !== defaultLocalVal;

    if (isLocalCustomized) {
      return localVal || cmsContent[fieldKey];
    }
    if (hasCustomCms) {
      return cmsContent[fieldKey] || localVal;
    }
    return localVal || cmsContent[fieldKey];
  };

  const activeCmsContent = {
    ...cmsContent,
    heroTag: getActiveField('heroTag'),
    heroTitlePrefix: getActiveField('heroTitlePrefix'),
    heroTitleHighlight: getActiveField('heroTitleHighlight'),
    heroDescription: getActiveField('heroDescription'),
  };

  // Sync CMS contents upon update triggers
  useEffect(() => {
    const stored = localStorage.getItem('playstation_pos_cms_content');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.heroTitleHighlight === "برنامج كاشير وإدارة جلسات الألعاب") {
          parsed.heroTitleHighlight = "سيستم كاشير بلايسيتشن";
          localStorage.setItem('playstation_pos_cms_content', JSON.stringify(parsed));
        }
        setCmsContent(parsed);
      } catch (e) {}
    }

    const storedLoc = localStorage.getItem('playstation_pos_localization_data');
    if (storedLoc) {
      try {
        setLocalizations(JSON.parse(storedLoc));
      } catch (e) {}
    }

    const storedPkgs = localStorage.getItem('playstation_pos_packages_data');
    if (storedPkgs) {
      try {
        setPackagesData(JSON.parse(storedPkgs));
      } catch (e) {}
    }

    const storedIntPr = localStorage.getItem('playstation_pos_international_pricing');
    if (storedIntPr) {
      try {
        setIntPricing(JSON.parse(storedIntPr));
      } catch (e) {}
    }
  }, []);

  // Handle country change and auto-select package, syncing the URL
  const handleCountryChange = (country: any) => {
    setI18nCountry(country);
    const targetPath = `/playstation-pos-${country.id}`;
    setCurrentPath(targetPath);
    setHeaderVisible(true);
    if (country.id !== 'egypt') {
      const intPkg = packagesData.find(p => p.id === 'international');
      if (intPkg) setSelectedPackage(intPkg);
    } else {
      setSelectedPackage(packagesData[1]);
    }
  };

  // Sync state with back/forward history events and hash scrolling
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      const currentCountry = getCountryFromPath(path) || countries.egypt;
      setI18nCountry(currentCountry.id as any);
      localStorage.setItem('playstation_pos_selected_country', currentCountry.id);
      if (currentCountry.id !== 'egypt') {
        const intPkg = packagesData.find(p => p.id === 'international');
        if (intPkg) setSelectedPackage(intPkg);
      } else {
        setSelectedPackage(packagesData[1]);
      }

      // Check if URL has a section hash on Back/Forward navigation
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        const resolved = SECTION_ALIASES[hash] || hash;
        setPendingSectionScroll(resolved);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [packagesData]);

  // Effect to perform scroll once homepage is mounted/rendered
  useEffect(() => {
    if (!pendingSectionScroll) return;
    if (!isHomepage) return;

    let attempts = 0;
    const maxAttempts = 8;
    let timeoutId: any;

    const checkAndScroll = () => {
      const scrolled = scrollToSectionElement(pendingSectionScroll, true);
      if (scrolled) {
        setPendingSectionScroll(null);
      } else if (attempts < maxAttempts) {
        attempts++;
        timeoutId = setTimeout(checkAndScroll, 60);
      } else {
        setPendingSectionScroll(null);
      }
    };

    timeoutId = setTimeout(checkAndScroll, 40);
    return () => clearTimeout(timeoutId);
  }, [pendingSectionScroll, isHomepage, currentPath]);

  // Effect for initial page load or direct URL with hash (e.g. /#pricing or /playstation-pos-egypt#features)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && isHomepage) {
      const resolved = SECTION_ALIASES[hash] || hash;
      const timer = setTimeout(() => {
        scrollToSectionElement(resolved, true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isHomepage]);

  // Update localized HTML Page Title and Description tags dynamically for SEO discovery of separate country pages
  useEffect(() => {
    // Preserve dedicated SEO titles for pillar pages and practical guides
    const slugKey = currentPath.replace(/^\//, '');
    const isPillar = Boolean((SEO_PILLAR_PAGES as any)[slugKey]);
    const isGuide = currentPath === '/guides' || currentPath.startsWith('/guides/');
    if (isPillar || isGuide) return;

    if (currentPath === '/company-profile' || currentPath === '/company-profile/') {
      document.title = 'الملف التعريفي للشركة والعرض الفني الرسمي | IDEA MAKERS Company Profile 2026';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content', 
          'الملف التعريفي الرسمي (26 صفحة بدقة عالية) لشركة IDEA MAKERS لنظام إدارة صالات البلايستيشن والكافيهات. تفاصيل بنية الأوفلاين 100%، استعراض الواجهات الحقيقية، والجدوى الاستثمارية لصالتك.'
        );
      }
      return;
    }

    let countrySuffix = '';
    if (selectedCountry.id === 'egypt') countrySuffix = ' في مصر';
    else if (selectedCountry.id === 'saudi') countrySuffix = ' في السعودية';
    else if (selectedCountry.id === 'uae') countrySuffix = ' في الإمارات';
    else if (selectedCountry.id === 'kuwait') countrySuffix = ' في الكويت';
    else if (selectedCountry.id === 'qatar') countrySuffix = ' في قطر';

    document.title = `برنامج كاشير وإدارة صالات البلايستيشن والكافيهات${countrySuffix} | IDEA MAKERS`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content', 
        `امتلك أقوى نظام لإدارة صالات البلايستيشن والكافيهات، كاشير وسستم تشغيل ألعاب${countrySuffix}. نظام أوفلاين 100% بملكية مدى الحياة بدون اشتراكات أو رسوم شهرية متكررة.`
      );
    }
  }, [selectedCountry, currentPath]);

  const heroRef = useRef(null);
  const [calcDevices, setCalcDevices] = useState(5);
  const [calcHours, setCalcHours] = useState(8);
  const [leakRate, setLeakRate] = useState(20);

  const potentialProfit = calcDevices * calcHours * selectedCountry.hourlyPrice * 30;
  const estimatedLoss = Math.round(potentialProfit * (leakRate / 100));
  const recoveredProfit = estimatedLoss;

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const getActualScrollPosition = (): number => {
      return Math.max(
        0,
        window.scrollY ?? 0,
        window.pageYOffset ?? 0,
        document.documentElement?.scrollTop ?? 0,
        document.scrollingElement?.scrollTop ?? 0,
        document.body?.scrollTop ?? 0
      );
    };

    // Initialize previous position with actual current scroll position
    lastScrollYRef.current = getActualScrollPosition();

    const handleScroll = () => {
      const currentY = getActualScrollPosition();
      const previousY = lastScrollYRef.current;
      const delta = currentY - previousY;

      // Update scrolled visual treatment (blur / border padding)
      const isScrolled = currentY > 15;
      if (scrolledRef.current !== isScrolled) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }

      // Safety Guards: Always show header if menu open, dropdown open, or keyboard focus inside
      if (isMenuOpenRef.current || isCountryDropdownOpenRef.current || isHeaderFocusedRef.current) {
        if (!headerVisibleRef.current) {
          showHeader();
        }
        lastScrollYRef.current = currentY;
        return;
      }

      // Rule C: At the top (currentY <= 0), header MUST ALWAYS be visible
      if (currentY <= 0) {
        if (!headerVisibleRef.current) {
          showHeader();
        }
        lastScrollYRef.current = 0;
        return;
      }

      // Rule A: First actual downward movement (delta > 0) -> IMMEDIATELY hide header!
      if (delta > 0.05) {
        if (headerVisibleRef.current) {
          hideHeader();
        }
      } 
      // Rule B: First actual upward movement (delta < 0) -> IMMEDIATELY reveal header at ANY depth!
      else if (delta < -0.05) {
        if (!headerVisibleRef.current) {
          showHeader();
        }
      }

      // Update previous scroll position on every valid scroll event
      lastScrollYRef.current = currentY;
    };

    // Single authoritative scroll listener on window
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial evaluation on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showHeader, hideHeader]);

  const handleWhatsApp = (message?: string) => {
    const finalMessage = message || activeCmsContent.whatsappMessage || "مرحباً فريق صُنّاع الفكرة، أودّ الاستفسار عن نظام إدارة صالات البلايستيشن.";
    Analytics.clickWhatsApp('whatsapp_cta', finalMessage);
    const encoded = encodeURIComponent(finalMessage);
    const phone = activeCmsContent.contactPhone || "201121778205";
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
  };

  const handleWhatsAppRedirect = (pkgId: string) => {
    const pkg = packages.find(p => p.id === pkgId);
    if (!pkg) return;

    Analytics.packageSelect(pkgId, pkg.price, selectedCountry.currency);
    const message = `*مرحباً فريق صُنّاع الفكرة* 👋

أرغب في شراء باقة *${pkg.name}* لنظام إدارة البلايستيشن.`;
    handleWhatsApp(message);
  };

  const getYoutubeId = (url: string) => {
    if (!url) return 'tmfoL7IcuJk';
    if (url.includes('v=')) {
      return url.split('v=')[1]?.split('&')[0] || 'tmfoL7IcuJk';
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || 'tmfoL7IcuJk';
    }
    if (url.includes('embed/')) {
      return url.split('embed/')[1]?.split('?')[0] || 'tmfoL7IcuJk';
    }
    return url;
  };

  const videoId = getYoutubeId(activeCmsContent.demoVideoUrl);
  const demoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&vq=hd1080`;

  return (
    <div className="min-h-screen font-cairo bg-[#050505] text-white selection:bg-primary/30 pb-20 lg:pb-0 overflow-x-hidden">
      <ScrollProgress />

      {/* App Header Navigation - Fixed on top everywhere like a native app */}
      <nav 
        ref={headerRef}
        role="navigation"
        aria-label="التنقل الرئيسي"
        onFocusCapture={() => {
          isHeaderFocusedRef.current = true;
          showHeader();
        }}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            isHeaderFocusedRef.current = false;
          }
        }}
        className={`site-nav-header bg-[#07070d]/92 backdrop-blur-xl border-b border-white/[0.08] ${
          scrolled ? 'py-2 sm:py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.85)]' : 'py-2.5 sm:py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
        } ${headerVisible ? '' : 'header-hidden'}`}
      >
        {/* Futuristic glowing top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-90 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          <Logo onClick={navigateHome} />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 text-sm font-medium">
            <a 
              href="/#features" 
              onClick={(e) => { e.preventDefault(); navigateToSection('features'); }} 
              className="px-2.5 py-1.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t.navigation.features}
            </a>
            <a 
              href="/#roadmap" 
              onClick={(e) => { e.preventDefault(); navigateToSection('roadmap'); }} 
              className="px-2.5 py-1.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-1"
            >
              <span>{t.navigation.roadmap}</span>
            </a>
            <a 
              href="/#comparison" 
              onClick={(e) => { e.preventDefault(); navigateToSection('comparison'); }} 
              className="px-2.5 py-1.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t.navigation.whyUs}
            </a>
            <a 
              href="/#pricing" 
              onClick={(e) => { e.preventDefault(); navigateToSection('pricing'); }} 
              className="px-2.5 py-1.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t.navigation.pricing}
            </a>
            <a 
              href="/company-profile" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (isCompanyProfilePage) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigateTo('/company-profile'); 
                }
              }} 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isCompanyProfilePage
                  ? 'bg-primary/25 text-white border border-primary/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                  : 'text-purple-300 hover:text-white hover:bg-white/[0.05]'
              }`}
              title="الملف التعريفي للشركة والعرض الفني"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>الملف التعريفي</span>
            </a>
            <a 
              href="/guides" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (isGuidesHub) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigateTo('/guides'); 
                }
              }} 
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isGuidesHub
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                  : 'text-cyan-400 hover:text-cyan-200 hover:bg-white/[0.05]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>دليل الصالات</span>
            </a>
            <a 
              href="/#smart-form" 
              onClick={(e) => { e.preventDefault(); navigateToSection('smart-form'); }} 
              className="px-2.5 py-1.5 rounded-xl text-gray-200 hover:text-white hover:bg-white/[0.04] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t.navigation.freeTrial}
            </a>
            
            {/* Country Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                aria-haspopup="listbox"
                aria-expanded={isCountryDropdownOpen}
                aria-label={t.navigation.selectCountry}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] transition-all text-xs font-semibold text-gray-200 cursor-pointer"
              >
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
              
              <AnimatePresence>
                {isCountryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2.5 w-48 rounded-2xl border border-white/10 bg-[#0d0d14]/98 backdrop-blur-xl shadow-2xl shadow-black/90 overflow-hidden py-1.5 z-[250] text-right"
                  >
                    {SUPPORTED_COUNTRIES.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => {
                          handleCountryChange(country);
                          setIsCountryDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors cursor-pointer ${
                          selectedCountry.id === country.id
                            ? 'bg-primary/15 text-primary font-bold'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">{country.currency}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <RippleButton 
              primary
              onClick={() => navigateToSection('smart-form')}
              className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full transition-all"
            >
              {t.common.tryFree}
            </RippleButton>
          </div>

          {/* Mobile App Header Controls (<= 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 xs:gap-2 shrink-0">
            {/* Mobile Country Selector Badge - Responsive Pill */}
            <div className="relative" ref={mobileDropdownRef}>
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="h-10 min-h-[40px] px-2.5 rounded-xl border border-primary/25 bg-primary/10 hover:bg-primary/20 transition-all flex items-center gap-1.5 text-xs font-bold text-white cursor-pointer"
                aria-label="اختر الدولة"
                aria-haspopup="listbox"
                aria-expanded={isCountryDropdownOpen}
              >
                <span className="text-sm leading-none">{selectedCountry.flag}</span>
                <span className="text-[11px] font-bold text-white whitespace-nowrap">{selectedCountry.name}</span>
                <ChevronDown className={`w-3 h-3 text-primary transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCountryDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-48 max-w-[calc(100vw-24px)] rounded-2xl border border-white/15 bg-[#0e0e16]/98 backdrop-blur-2xl shadow-2xl shadow-black overflow-hidden py-1.5 z-[1050] text-right"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 tracking-wider border-b border-white/5 uppercase select-none mb-1 text-center">
                      {t.navigation.selectCountry}
                    </div>
                    {SUPPORTED_COUNTRIES.map((country) => (
                      <button
                        key={country.id}
                        onClick={() => {
                          handleCountryChange(country);
                          setIsCountryDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs cursor-pointer transition-colors ${
                          selectedCountry.id === country.id
                            ? 'bg-primary/20 text-primary font-bold'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{country.flag}</span>
                          <span>{country.name}</span>
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{country.currency}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Mobile Action CTA - Only on screens with enough space (>= 640px) */}
            <button
              onClick={() => navigateToSection('smart-form')}
              className="hidden sm:inline-flex items-center gap-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white text-[11px] font-bold px-2.5 sm:px-3 h-10 rounded-xl shadow-md shadow-primary/25 transition-all cursor-pointer shrink-0"
            >
              <span>3 أيام مجاناً</span>
            </button>

            {/* Mobile Menu Button - 40x40px touch target */}
            <button 
              className="text-white w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] rounded-xl glass border border-white/10 hover:border-primary/40 flex items-center justify-center transition-all cursor-pointer shrink-0" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التصفح"
            className="fixed inset-0 z-[1000000] bg-[#07070d]/98 backdrop-blur-3xl lg:hidden flex flex-col overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/10">
              <Logo onClick={navigateHome} />

              <button 
                className="w-10 h-10 rounded-full glass border border-white/15 hover:border-primary text-white flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
                aria-label="إغلاق القائمة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 px-5 py-6">
              {/* Mobile Country Selector Card */}
              <div className="w-full p-3.5 bg-white/[0.03] border border-white/10 rounded-2xl text-right">
                <span className="block text-xs text-gray-300 font-bold mb-2.5 text-center">🗺️ {t.navigation.selectCountry}</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {SUPPORTED_COUNTRIES.map((country) => (
                    <button
                      key={country.id}
                      onClick={() => {
                        handleCountryChange(country);
                        setIsMenuOpen(false);
                      }}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all duration-300 cursor-pointer ${
                        selectedCountry.id === country.id
                          ? 'bg-primary/20 border-primary text-white font-bold scale-[1.04] shadow-md shadow-primary/20'
                          : 'bg-[#0a0a0e]/60 border-white/5 text-gray-400 hover:border-white/15'
                      }`}
                    >
                      <span className="text-lg mb-0.5">{country.flag}</span>
                      <span className="text-[10px] font-bold tracking-tight">{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Links with Icons */}
              <div className="flex flex-col gap-1.5 text-sm font-semibold">
                {[
                  { id: 'features', title: t.navigation.features, icon: <Gamepad2 className="w-4 h-4 text-primary" />, isPath: false, path: '' },
                  { id: 'roadmap', title: t.navigation.roadmap, icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, isPath: false, path: '' },
                  { id: 'guides', title: 'دليل ومقالات الصالات', icon: <BookOpen className="w-4 h-4 text-cyan-400" />, isPath: true, path: '/guides' },
                  { id: 'comparison', title: t.navigation.whyUs, icon: <Zap className="w-4 h-4 text-amber-400" />, isPath: false, path: '' },
                  { id: 'calculator', title: t.navigation.calculator, icon: <Percent className="w-4 h-4 text-purple-400" />, isPath: false, path: '' },
                  { id: 'pricing', title: t.navigation.pricing, icon: <CreditCard className="w-4 h-4 text-blue-400" />, isPath: false, path: '' },
                  { id: 'company-profile', title: 'الملف التعريفي للشركة (PDF)', icon: <FileText className="w-4 h-4 text-purple-400" />, isPath: true, path: '/company-profile' },
                  { id: 'smart-form', title: t.navigation.freeTrial, icon: <Gift className="w-4 h-4 text-pink-400" />, isPath: false, path: '' },
                  { id: 'faq', title: t.navigation.faq, icon: <HelpCircle className="w-4 h-4 text-cyan-400" />, isPath: false, path: '' },
                ].map((item, idx) => (
                  <motion.a 
                    key={item.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    href={item.isPath ? item.path : `/#${item.id}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.isPath) {
                        navigateTo(item.path);
                      } else {
                        navigateToSection(item.id);
                      }
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] hover:text-primary transition-all border border-white/5"
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-gray-200 font-bold">{item.title}</span>
                  </motion.a>
                ))}
              </div>

              {/* Action Buttons inside Drawer */}
              <div className="flex flex-col gap-2.5 pt-2">
                <RippleButton 
                  primary
                  onClick={() => {
                    navigateToSection('smart-form');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl shadow-xl shadow-primary/30 font-black text-sm flex items-center justify-center gap-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>ابدأ التجربة المجانية (3 أيام)</span>
                </RippleButton>

                <button
                  onClick={() => {
                    handleWhatsApp('مرحباً فريق صُنّاع الفكرة، أرغب في استفسار سريع عن نظام PlayStation POS.');
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>تواصل فوري عبر الواتساب</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Route-Based Dynamic View Rendering (SEO Pillars, Guides, or Homepage) */}
      {(() => {
        const currentSlug = currentPath.replace(/^\//, '');
        const activePillar = (SEO_PILLAR_PAGES as any)[currentSlug];
        const isGuidesHub = currentPath === '/guides';
        const isGuideArticle = currentPath.startsWith('/guides/');
        const articleSlug = isGuideArticle ? currentPath.replace('/guides/', '') : null;

        if (activePillar) {
          return (
            <SeoPillarView
              page={activePillar}
              onNavigateHome={navigateHome}
              onNavigatePillar={(slug) => navigateTo(`/${slug}`)}
              onOpenTrialForm={() => navigateToSection('smart-form')}
            />
          );
        }

        if (isGuidesHub || isGuideArticle) {
          return (
            <GuidesHubView
              activeSlug={articleSlug}
              onNavigateHome={navigateHome}
              onNavigateArticle={(slug) => navigateTo(`/guides/${slug}`)}
              onNavigateHub={() => navigateTo('/guides')}
              onOpenTrialForm={() => navigateToSection('smart-form')}
            />
          );
        }

        if (currentPath === '/company-profile' || currentPath === '/company-profile/' || currentPath === '/profile') {
          return (
            <CompanyProfilePageView
              onNavigateHome={navigateHome}
              onOpenViewer={handleOpenCompanyProfile}
              onOpenTrialForm={() => navigateToSection('smart-form')}
            />
          );
        }

        return (
          <>
            {/* PS5 Cinematic Hero Experience */}
            <HeroSection 
              onPrimaryCta={() => scrollToSection('smart-form')}
              onSecondaryCta={() => scrollToSection('demo-video')}
            />

      {/* Video Showcase Section */}
      <section id="demo-video" className="scroll-mt-24 sm:scroll-mt-28 relative pt-16 sm:pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-black mb-6">شاهد النظام وهو يعمل في الواقع</h2>
            <p className="text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto">
              عرض حي يوضح طريقة إدارة صالات البلايستيشن باحتراف
            </p>
          </motion.div>

          {/* Live System Indicator Badge */}
          <div className="flex justify-center mt-8 sm:mt-10 mb-5 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="px-6 py-2 rounded-full glass border border-primary/30 text-[11px] sm:text-xs font-bold text-white uppercase tracking-[0.2em] flex items-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </span>
              <span className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">نظام مباشر الآن</span>
            </motion.div>
          </div>

          <div className="relative max-w-[900px] mx-auto px-4 sm:px-0">
            {/* Floating UI Elements */}
            <FloatingCard className="-top-12 -right-12 w-72" delay={0}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">إجمالي الأرباح</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-black text-white">12,450</p>
                    <span className="text-[10px] text-accent font-bold">+18%</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            <FloatingCard className="top-1/4 -left-20 w-64" delay={1.5}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">نشاط الصالة</p>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-primary" 
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-gray-500">الأجهزة المشغولة</span>
                    <span>75%</span>
                  </div>
                </div>
              </div>
            </FloatingCard>

            {/* Video Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 0.4 }
              }}
              className="relative group rounded-2xl sm:rounded-[40px] overflow-hidden glass border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:shadow-[0_0_80px_rgba(168,85,247,0.4)] aspect-video bg-black transition-shadow duration-500"
            >
              {/* 1. Video (Bottom Layer) */}
              <div className="absolute inset-0 w-full h-full z-0">
                <MediaRenderer
                  src={activeCmsContent.demoVideoUrl}
                  poster={activeCmsContent.demoVideoThumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  type="video"
                  controls={true}
                  className="w-full h-full absolute top-0 left-0 object-cover rounded-none border-none shadow-none"
                />
              </div>

              {/* 2. Overlay Effects */}
              <div className="absolute inset-0 z-10 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none" />
              
              {/* 3. Tech Scanner Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <motion.div 
                  animate={{ top: ['-10%', '110%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-primary/40 shadow-[0_0_20px_rgba(168,85,247,1)]"
                />
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20 rounded-tr-[40px] pointer-events-none z-30" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20 rounded-bl-[40px] pointer-events-none z-30" />
            </motion.div>
          </div>

          {/* YouTube CTA Button */}
          <div className="flex justify-center mt-8 sm:mt-10 mb-10 sm:mb-12 px-4">
            <motion.a
              href={activeCmsContent.demoVideoUrl || "https://www.youtube.com/watch?v=tmfoL7IcuJk"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group/yt-btn flex items-center gap-6 bg-white text-black px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(168,85,247,0.3)] hover:bg-primary hover:text-white transition-all duration-500 w-full sm:w-[340px] justify-center"
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover/yt-btn:opacity-100 transition-opacity">شاهد بوضوح على</span>
                <span className="text-xl font-black tracking-tighter">YOUTUBE</span>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 group-hover/yt-btn:opacity-40 transition-opacity animate-pulse" />
                <div className="relative w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/40 group-hover/yt-btn:rotate-[360deg] transition-transform duration-700">
                  <Play className="w-6 h-6 fill-white text-white" />
                </div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-white/[0.05] bg-white/[0.01]">
        <div className="container">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-8">موثوق من قبل رواد الأعمال في</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-30 grayscale">
            <span className="text-2xl font-black">EGYPT</span>
            <span className="text-2xl font-black">SAUDI ARABIA</span>
            <span className="text-2xl font-black">UAE</span>
            <span className="text-2xl font-black">KUWAIT</span>
            <span className="text-2xl font-black">QATAR</span>
          </div>
        </div>
      </section>

      {/* Customer Journey Roadmap Section */}
      <CustomerJourneyRoadmap 
        onNavigateToSection={navigateToSection}
        onWhatsAppClick={handleWhatsApp}
      />

      {/* Problem Agitation Section */}
      <section className="py-24 bg-white/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">{activeLocal.problemSectionTitle}</h2>
            <p className="text-xl text-gray-400 font-light">في كل ساعة تمر بدون نظام دقيق، هناك أرباح تضيع في الزحام.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 features-grid text-right">
            {activeLocal.problems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.7 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 rounded-3xl border-red-500/10 hover:border-red-500/30 transition-all group feature-card-glow"
              >
                <div className="mb-6 p-4 bg-red-500/10 rounded-2xl w-fit group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  {item.iconType === 'theft' ? (
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  ) : item.iconType === 'time' ? (
                    <Clock className="w-8 h-8 text-red-500" />
                  ) : (
                    <Monitor className="w-8 h-8 text-red-500" />
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Silent Realization Block */}
      <section className="py-24 relative">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto glass p-8 md:p-16 lg:p-20 rounded-[48px] border-primary/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32" />
            
            <div className="relative z-10 text-center">
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 0.5 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <HelpCircle className="w-16 h-16 text-primary mx-auto mb-8" />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black mb-12">{t.questions.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-right">
                {t.questions.items.map((q, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + idx * 0.2 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-primary font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-xl md:text-2xl font-medium leading-tight">{q}</p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16">
                <RippleButton 
                  onClick={() => {
                    const el = document.getElementById('calculator');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary font-bold text-xl hover:underline flex items-center justify-center gap-2 mx-auto"
                >
                  {t.questions.cta}
                  <ArrowLeft className="w-5 h-5" />
                </RippleButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="scroll-mt-24 sm:scroll-mt-28 py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-6">{activeLocal.solutionSectionTitle}</h2>
            <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              نظامنا يتجاوز مجرد كونه برنامج لحساب الوقت، إنه شريكك الرقمي لتأمين أرباح مشروعك بالثانية ورفع مبيعات الضيافة.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              {activeLocal.solutions.map((item, idx) => (
                <div key={idx} className="glass p-8 rounded-[32px] border-emerald-500/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between h-full relative group">
                  <div className="absolute top-4 left-4 bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2.5 py-1 rounded-lg">
                    {item.badge}
                  </div>
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Story Section */}
      <section id="story" className="scroll-mt-24 sm:scroll-mt-28 py-24 relative overflow-hidden bg-white/[0.01]">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">قصة الابتكار: <span className="text-gradient">لماذا صنعنا هذا النظام؟</span></h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              خلف كل سطر برمججي في IDEA Makers POS، هناك قصة حقيقية من داخل صالات البلايستيشن.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-primary/50 hidden md:block" />

            <div className="space-y-24">
              {/* 1. The Reality */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="md:text-left order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-[32px] border-red-500/20"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold mb-4">
                      <AlertTriangle className="w-3 h-3" />
                      الواقع السابق
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">فوضى الإدارة اليدوية</h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      كان أصحاب الصالات يعانون يومياً من <span className="text-white font-medium">صعوبة تتبع الأجهزة</span>، والارتباك في حساب الوقت، وضياع الأرباح بسبب الخطأ البشري أو عدم التسجيل. كانت ساعات الذروة تتحول إلى كابوس تنظيمي.
                    </p>
                  </motion.div>
                </div>
                <div className="flex justify-center order-1 md:order-2 relative">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center z-10 bg-[#050505] hidden md:flex absolute left-[-24px]">
                    <XCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-48 h-48 bg-red-500/5 rounded-full blur-3xl absolute"
                  />
                  <XCircle className="w-24 h-24 text-red-500/20 md:w-32 md:h-32" />
                </div>
              </div>

              {/* 2. The Turning Point */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center z-10 bg-[#050505] hidden md:flex absolute right-[-24px]">
                    <Gamepad2 className="w-6 h-6 text-primary" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-48 h-48 bg-primary/5 rounded-full blur-3xl absolute"
                  />
                  <Gamepad2 className="w-24 h-24 text-primary/20 md:w-32 md:h-32" />
                </div>
                <div className="md:text-right">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-[32px] border-primary/20"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                      <Handshake className="w-3 h-3" />
                      نقطة التحول
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">رؤية المهندسين</h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      لاحظ مهندسو <span className="text-primary font-medium text-gradient">IDEA Makers</span> هذه الفجوة. قررنا ألا نصنع مجرد برنامج كاشير، بل أن نصمم <span className="text-white font-medium">عقلاً إلكترونياً</span> يفهم لغة صالات البلايستيشن ويحل مشاكلها من الجذور.
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* 3. The Solution */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="md:text-left order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-[32px] border-accent/20"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4">
                      <ShieldCheck className="w-3 h-3" />
                      الحل المتكامل
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">IDEA Makers POS</h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      وُلد النظام ليكون <span className="text-accent font-medium">السيادة الكاملة</span> لصاحب الصالة. تحكم في الأجهزة، تتبع الجلسات بالثانية، وراقب أرباحك لحظة بلحظة. نظام احترافي يعمل <span className="text-white font-medium">أوفلاين 100%</span> ليضمن استقرار عملك.
                    </p>
                  </motion.div>
                </div>
                <div className="flex justify-center order-1 md:order-2 relative">
                  <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center z-10 bg-[#050505] hidden md:flex absolute left-[-24px]">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-48 h-48 bg-accent/5 rounded-full blur-3xl absolute"
                  />
                  <CheckCircle2 className="w-24 h-24 text-accent/20 md:w-32 md:h-32" />
                </div>
              </div>

              {/* 4. The Result */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center relative">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center z-10 bg-[#050505] hidden md:flex absolute right-[-24px]">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-48 h-48 bg-primary/5 rounded-full blur-3xl absolute"
                  />
                  <Trophy className="w-24 h-24 text-primary/20 md:w-32 md:h-32" />
                </div>
                <div className="md:text-right">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-[32px] border-primary/20"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                      <TrendingUp className="w-3 h-3" />
                      النتيجة النهائية
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">بيزنس مُدار بذكاء</h3>
                    <p className="text-gray-400 leading-relaxed font-light">
                      اليوم، تتحول صالات البلايستيشن التي تستخدم نظامنا إلى <span className="text-white font-medium">مؤسسات منظمة ومربحة</span>. إدارة سهلة، كفاءة عالية، وراحة بال تامة لصاحب العمل. تخيل صالتك تعمل بسلاسة تامة.. هذا هو الواقع مع IDEA Makers.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <p className="text-2xl font-bold mb-8 italic text-gray-300">"هذا النظام يفهم عملك أكثر مما تتخيل."</p>
            <RippleButton 
              primary
              onClick={() => {
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg"
            >
              ابدأ رحلة النجاح الآن
            </RippleButton>
          </motion.div>
        </div>
      </section>

      {/* Authority Introduction */}
      <section className="py-24 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 relative"
            >
              <div className="glass rounded-[40px] p-4 border-white/10 shadow-2xl relative z-10 group overflow-hidden">
                <GrayscaleImage 
                  src={activeCmsContent.authImageUrl || "https://i.postimg.cc/k56Vy6yG/3-200.jpg"} 
                  alt="Engineering Partnership" 
                  className="rounded-[32px]"
                  aspectRatio="aspect-auto"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold text-primary mb-6 border-primary/30">
                <Handshake className="w-4 h-4" />
                {activeCmsContent.authTag || "شريكك الهندسي في النجاح"}
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight whitespace-pre-line">
                {activeCmsContent.authTitle || "IDEA MAKERS: \nأكثر من مجرد برنامج"}
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {activeCmsContent.authDescription || "نحن لا نبيع لك أكوادًا برمجية، نحن نبني معك بنية تحتية رقمية تضمن لك السيادة الكاملة على مشروعك. نظامنا صُمم بأيدي مهندسين يفهمون طبيعة السوق المصري والخليجي."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-2xl border-primary/10"
                >
                  <div className="text-lg font-black text-primary mb-2">
                    {activeCmsContent.authStat1Title || "ثقة متزايدة يومياً"}
                  </div>
                  <div className="text-xs text-gray-400 font-bold leading-relaxed">
                    {activeCmsContent.authStat1Desc || "يستخدمه أصحاب صالات بلايستيشن في مصر والسعودية والإمارات والكويت وقطر"}
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-2xl border-primary/10"
                >
                  <div className="text-3xl font-black text-primary mb-2">
                    {activeCmsContent.authStat2Title || "100%"}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-widest">
                    {activeCmsContent.authStat2Desc || "تحت سيطرتك أوفلاين"}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="font-bold mb-4 sm:mb-6">لماذا يختار المحترفون IDEA Makers؟</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light">نظام مصمم خصيصاً ليلبي احتياجات أصحاب الصالات في مصر والخليج</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <WifiOff className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
                title: "حصانة أوفلاين كاملة",
                desc: "لا تقلق من انقطاع الخدمة. النظام يعمل أوفلاين بالكامل ويحفظ بياناتك محلياً، مما يضمن استمرارية العمل في أصعب الظروف."
              },
              {
                icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
                title: "ملكية أصل للأبد",
                desc: "ادفع مرة واحدة فقط وامتلك النظام للأبد. لا توجد رسوم تجديد، لا توجد اشتراكات شهرية، ولا توجد مفاجآت مالية."
              },
              {
                icon: <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
                title: "تخصيص سيادي",
                desc: "أضف شعار صالتك، عدل الأسعار، وخصص التقارير بما يناسب أسلوب إدارتك الخاص لفرض هويتك التجارية."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
                title: "إدارة جلسات اللعب ومتابعة الأجهزة",
                desc: "إدارة دقيقة لوقت اللعب لكل جهاز من داخل السيستم ومتابعة انتهاء الجلسات بوضوح لضمان الشفافية والانضباط."
              },
              {
                icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
                title: "إدارة الفريق الاحترافية",
                desc: "نظام صلاحيات متقدم يضمن لك مراقبة أداء الموظفين ومنع السرقات، مع تقارير أداء لكل فرد."
              },
              {
                icon: <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />,
                title: "ذكاء الأعمال والتقارير",
                desc: "احصل على إحصائيات دقيقة عن الأرباح، ساعات التشغيل، والأصناف الأكثر مبيعاً لاتخاذ قرارات مبنية على البيانات."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="glass p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] border-white/[0.05] transition-all group feature-card-glow"
              >
                <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-primary/10 w-fit rounded-2xl group-hover:bg-primary/20 group-hover:rotate-12 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-base sm:text-lg font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 bg-white/[0.01] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="font-bold mb-4 sm:mb-6">المقارنة التي ستحسم قرارك</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light">اكتشف لماذا يهرب أصحاب الصالات من الأنظمة التقليدية إلى IDEA Makers</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto overflow-hidden rounded-[24px] sm:rounded-[32px] glass border-white/[0.05] shadow-2xl"
          >
            <div className="table-responsive">
              <table className="comparison-table">
                <thead>
                  <tr className="bg-white/[0.03]">
                    <th className="p-4 sm:p-8 text-lg sm:text-xl font-bold border-b border-white/[0.05] col-criteria">المعيار</th>
                    <th className="p-4 sm:p-8 text-lg sm:text-xl font-bold border-b border-white/[0.05] text-center text-gray-500 col-traditional">الأنظمة التقليدية</th>
                    <th className="p-4 sm:p-8 text-lg sm:text-xl font-bold border-b border-white/[0.05] text-center text-primary bg-primary/5 col-ideamakers">IDEA Makers</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["الاعتماد على الإنترنت", "إجباري (يتوقف العمل بانقطاعه)", "غير موجود (أوفلاين 100%)"],
                    ["التكلفة التشغيلية", "اشتراك شهري (نزيف مستمر)", "دفع لمرة واحدة (ملكية للأبد)"],
                    ["ملكية البيانات", "مخزنة عند طرف ثالث", "مخزنة محلياً تحت سيطرتك"],
                    ["تخصيص الهوية", "محدود جداً", "كامل (شعارك وألوانك)"],
                    ["إدارة الجلسات والأجهزة", "معقدة وبطيئة", "إدارة الأجهزة والجلسات من خلال السيستم"],
                    ["الدعم الفني", "تذاكر انتظار", "دعم استراتيجي مباشر"]
                  ].map((row, i) => (
                    <tr key={i} className="comparison-row border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 sm:p-8 font-bold text-base sm:text-lg col-criteria">{row[0]}</td>
                      <td className="p-4 sm:p-8 text-center text-gray-500 font-medium text-sm sm:text-base col-traditional">
                        <div className="flex items-center justify-center gap-2">
                          <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500/40" />
                          {row[1]}
                        </div>
                      </td>
                      <td className="p-4 sm:p-8 text-center font-bold text-primary bg-primary/[0.02] group-hover:bg-primary/[0.04] transition-colors text-sm sm:text-base col-ideamakers">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                          {row[2]}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profit Calculator Section */}
      <section id="calculator" className="scroll-mt-24 sm:scroll-mt-28 py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6">{t.calculator.title}</h2>
              <p className="text-xl text-gray-400 mb-8">{t.calculator.subtitle}</p>
              
              {/* Country Selector */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {SUPPORTED_COUNTRIES.map((country) => (
                  <button
                    key={country.id}
                    onClick={() => handleCountryChange(country)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                      selectedCountry.id === country.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                        : 'glass hover:bg-white/10 text-gray-400'
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <span>{country.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass p-6 md:p-12 rounded-[40px] border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] -mr-32 -mt-32" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">
                <div className="space-y-4 sm:space-y-6">
                  {/* Devices Control */}
                  <div className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-white/5 hover:border-primary/20 transition-all group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-4 sm:mb-6 text-center sm:text-right">{t.calculator.devicesLabel}</label>
                    <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        title="تقليل (-)"
                        onClick={() => setCalcDevices(Math.max(1, calcDevices - 1))} 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 shadow-lg shadow-red-500/10 flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <Minus className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3.5} />
                      </motion.button>
                      
                      <div className="relative group/input">
                        <input 
                          type="number" 
                          value={calcDevices}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) setCalcDevices(Math.min(50, Math.max(1, val)));
                          }}
                          className="text-3xl sm:text-5xl font-black w-20 sm:w-24 text-center bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full group-hover/input:w-12 group-hover/input:bg-primary transition-all" />
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        title="زيادة (+)"
                        onClick={() => setCalcDevices(Math.min(50, calcDevices + 1))} 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <Plus className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3.5} />
                      </motion.button>
                    </div>
                    <div className="mt-4 sm:mt-6 text-center">
                      <p className="text-[10px] text-primary/60 font-bold mb-1">➕ لزيادة العدد — ➖ لتقليل العدد</p>
                      <p className="text-[10px] text-gray-500 font-bold">{t.calculator.devicesHint}</p>
                    </div>
                  </div>

                  {/* Hours Control */}
                  <div className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-white/5 hover:border-primary/20 transition-all group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-wider mb-4 sm:mb-6 text-center sm:text-right">{t.calculator.hoursLabel}</label>
                    <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-10">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        title="تقليل (-)"
                        onClick={() => setCalcHours(Math.max(1, calcHours - 1))} 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 shadow-lg shadow-red-500/10 flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <Minus className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3.5} />
                      </motion.button>
                      
                      <div className="relative group/input">
                        <input 
                          type="number" 
                          value={calcHours}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) setCalcHours(Math.min(24, Math.max(1, val)));
                          }}
                          className="text-3xl sm:text-5xl font-black w-20 sm:w-24 text-center bg-transparent border-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-white"
                        />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full group-hover/input:w-12 group-hover/input:bg-primary transition-all" />
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        title="زيادة (+)"
                        onClick={() => setCalcHours(Math.min(24, calcHours + 1))} 
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <Plus className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3.5} />
                      </motion.button>
                    </div>
                    <div className="mt-4 sm:mt-6 text-center">
                      <p className="text-[10px] text-primary/60 font-bold mb-1">➕ لزيادة العدد — ➖ لتقليل العدد</p>
                      <p className="text-[10px] text-gray-500 font-bold">{t.calculator.hoursHint}</p>
                    </div>
                  </div>

                  {/* Leak Rate (Fraud & Abuse Control) */}
                  <div className="glass p-6 rounded-3xl border-white/5 hover:border-primary/20 transition-all group">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center sm:text-right">{t.calculator.leakLabel}</label>
                    <div className="flex items-center justify-center gap-6">
                      <motion.button 
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        title="تقليل (-)"
                        onClick={() => setLeakRate(Math.max(5, leakRate - 5))} 
                        className="w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 shadow-lg shadow-red-500/10 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Minus className="w-6 h-6" strokeWidth={3.5} />
                      </motion.button>
                      
                      <div className="text-center">
                        <span className="text-4xl font-black text-red-400">{leakRate}%</span>
                        <p className="text-[10px] text-gray-500 font-bold mt-1">{t.calculator.leakHint}</p>
                      </div>

                      <motion.button 
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        title="زيادة (+)"
                        onClick={() => setLeakRate(Math.min(40, leakRate + 5))} 
                        className="w-12 h-12 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Plus className="w-6 h-6" strokeWidth={3.5} />
                      </motion.button>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-[10px] text-gray-400 leading-relaxed">{t.calculator.leakExplanation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Total Expected Revenue Card */}
                  <motion.div 
                    layout
                    className="bg-white/[0.02] rounded-[24px] p-6 border border-white/5 flex flex-col justify-between items-center text-center relative overflow-hidden"
                  >
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">{t.calculator.potentialProfitLabel}</div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="text-4xl font-black text-white tracking-tight">
                        <Counter value={potentialProfit} />
                      </div>
                      <div className="text-sm font-bold text-gray-400">{selectedCountry.hourlyCurrencyName}</div>
                    </div>
                    <p className="text-[10px] text-gray-500">{t.calculator.potentialProfitHint}: عدد الأجهزة × الساعات × سعر ساعة اللعب ({selectedCountry.hourlyPrice} {selectedCountry.hourlyCurrencyName})</p>
                  </motion.div>

                  {/* Monthly Loss / Waste Card (CRIMSON RED for Loss Aversion) */}
                  <motion.div 
                    layout
                    className="bg-gradient-to-br from-red-950/20 to-red-900/10 rounded-[24px] p-6 border border-red-500/20 flex flex-col justify-between items-center text-center relative overflow-hidden group"
                  >
                    <div className="absolute top-2 right-2 text-red-500/30">
                      <AlertTriangle className="w-12 h-12" />
                    </div>
                    <div className="text-xs text-red-400 font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>{t.calculator.lossLabel}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="text-4xl font-black text-red-500 tracking-tight">
                        <Counter value={estimatedLoss} />
                      </div>
                      <div className="text-sm font-bold text-red-400">{selectedCountry.hourlyCurrencyName}</div>
                    </div>
                    <p className="text-[10px] text-red-400/80 max-w-[300px] leading-relaxed">{t.calculator.lossHint}</p>
                  </motion.div>

                  {/* Recovered Extra Profit Card (GLOWING EMERALD for Gain Motivation) */}
                  <motion.div 
                    layout
                    className="bg-gradient-to-br from-emerald-950/20 to-emerald-900/10 rounded-[24px] p-6 border border-emerald-500/20 flex flex-col justify-between items-center text-center relative overflow-hidden group shadow-lg shadow-emerald-500/5"
                  >
                    <div className="absolute top-2 right-2 text-emerald-500/30">
                      <ShieldCheck className="w-12 h-12 animate-pulse" />
                    </div>
                    <div className="text-xs text-emerald-400 font-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>{t.calculator.recoveredProfitLabel}</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <div className="text-5xl font-black text-emerald-400 tracking-tight">
                        <Counter value={recoveredProfit} />
                      </div>
                      <div className="text-sm font-bold text-emerald-400">{selectedCountry.hourlyCurrencyName}</div>
                    </div>
                    <p className="text-[11px] text-emerald-400/90 font-bold max-w-[320px] leading-relaxed">{t.calculator.recoveredProfitHint}</p>
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <RippleButton 
                  primary
                  onClick={() => handleWhatsApp(`*مرحبًا فريق صُنّاع الفكرة* 👋\n\nقمت بحساب الخسائر في صالتي (${selectedCountry.name})، وتبين أني أخسر حوالي ${estimatedLoss} ${selectedCountry.hourlyCurrencyName} شهرياً دون سيستم حماية. أريد بدء التشغيل الفوري وتجربة النظام مجاناً لسد الثغرات.`)}
                  className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-primary/30 hover:scale-105 transition-all w-full sm:w-auto"
                >
                  {t.calculator.cta}
                </RippleButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Financial Justification Section */}
      <section className="py-24 bg-white/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-right">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6">{activeLocal.justificationText || "الاستثمار الذكي vs الخسارة المستمرة"}</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass p-10 rounded-[40px] border-red-500/20"
              >
                <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                  بدون نظام (خسارة متكررة)
                </h3>
                <ul className="space-y-4 text-gray-400">
                  {[
                    "نزيف كاش مستمر وتسريب مالي بالشيفتات غير مكتشف يدوياً.",
                    "أخطاء بشرية متكررة في حساب ساعات اللعب والمشروبات والكافية.",
                    "صعوبة جرد المخزون وحساب الأرباح اليومية لكل مقعد وجهاز بدقة.",
                    "عجز كامل عن متابعة صالتك ومراقبة موظفيك عن بُعد بثقة تامة."
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-right">
                      <span className="text-red-500 mt-1">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass p-10 rounded-[40px] border-emerald-500/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">استثمار لمرة واحدة</div>
                <h3 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6" />
                  مع IDEA MAKERS (نمو مستدام)
                </h3>
                <ul className="space-y-4 text-gray-400">
                  {activeLocal.justificationPoints?.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-right">
                      <span className="text-emerald-500 mt-1">●</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="purple-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/10" />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="font-bold mb-4 sm:mb-6">{activeCmsContent.pricingTitle || t.pricing.title}</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light mb-12">{activeCmsContent.pricingSubtitle || t.pricing.subtitle}</p>
            
            {/* Country Selector for Pricing */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
              {SUPPORTED_COUNTRIES.map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountryChange(country)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-6 sm:py-3 rounded-2xl text-xs sm:text-base font-bold transition-all cursor-pointer ${
                    selectedCountry.id === country.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                      : 'glass hover:bg-white/10 text-gray-400'
                  }`}
                >
                  <span className="text-base sm:text-xl">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
            {selectedCountry.id !== 'egypt' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-emerald-500 font-bold mt-4 text-xs sm:text-sm"
              >
                {t.pricing.internationalNotice}
              </motion.p>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 max-w-7xl mx-auto items-stretch pricing-grid">
            {packagesData.map((pkg, idx) => {
              const isLocked = selectedCountry.id !== 'egypt' && pkg.id !== 'international';
              const isRecommended = selectedCountry.id !== 'egypt' && pkg.id === 'international';
              
              const colorMap: Record<string, any> = {
                primary: {
                  border: 'border-primary/20',
                  borderFeatured: 'border-primary/50',
                  bg: 'from-primary/10',
                  text: 'text-primary',
                  shadow: 'shadow-primary/30',
                  button: 'bg-primary',
                  glow: 'rgba(168,85,247,0.5)',
                  icon: 'text-primary'
                },
                accent: {
                  border: 'border-accent/20',
                  borderFeatured: 'border-accent/50',
                  bg: 'from-accent/10',
                  text: 'text-accent',
                  shadow: 'shadow-accent/30',
                  button: 'bg-accent',
                  glow: 'rgba(16,185,129,0.5)',
                  icon: 'text-accent'
                },
                blue: {
                  border: 'border-blue-500/20',
                  borderFeatured: 'border-blue-500/50',
                  bg: 'from-blue-500/10',
                  text: 'text-blue-500',
                  shadow: 'shadow-blue-500/30',
                  button: 'bg-blue-500',
                  glow: 'rgba(59,130,246,0.5)',
                  icon: 'text-blue-500'
                }
              };
              const colors = colorMap[pkg.color || 'primary'];

              return (
                <motion.div 
                  key={pkg.id} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.8 }}
                  whileHover={!isLocked ? { y: -15 } : {}}
                  animate={pkg.id === 'international' ? {
                    scale: [1, 1.02, 1],
                    transition: { duration: 0.5 }
                  } : {}}
                  className={`relative glass p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] flex flex-col transition-all duration-500 ${pkg.popular ? `pricing-card-featured ${colors.borderFeatured} lg:scale-105 shadow-[0_0_50px_${colors.glow}] py-8 sm:py-10 lg:py-16 z-20 bg-gradient-to-b ${colors.bg} to-transparent` : 'hover:border-white/20'} ${pkg.id === 'international' ? 'border-blue-500/30' : ''} ${isLocked ? 'opacity-40 grayscale pointer-events-none' : ''} ${selectedPackage.id === pkg.id ? 'ring-4 ring-primary ring-offset-4 ring-offset-black' : ''}`}
                  onClick={() => !isLocked && setSelectedPackage(pkg)}
                >
                  {pkg.popular && selectedCountry.id === 'egypt' && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: 'spring' }}
                      className={`absolute -top-5 left-1/2 -translate-x-1/2 ${colors.button} text-white text-[10px] sm:text-sm font-black px-6 sm:px-8 py-2 rounded-full shadow-[0_0_30px_${colors.glow}] uppercase tracking-widest whitespace-nowrap`}
                    >
                      {t.pricing.popularBadge}
                    </motion.div>
                  )}

                  {/* Professional Badge - الأكثر اختيارًا */}
                  {pkg.id === 'professional' && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent via-emerald-400 to-accent text-black text-xs sm:text-sm font-black px-6 sm:px-8 py-2 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] uppercase tracking-wider whitespace-nowrap z-30"
                    >
                      {pkg.badge || 'الأكثر اختيارًا'}
                    </motion.div>
                  )}

                  {/* Supporting label for International Package */}
                  {pkg.id === 'international' && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white text-[11px] sm:text-xs font-bold px-4 sm:px-6 py-1.5 rounded-full shadow-lg border border-blue-400/30 whitespace-nowrap z-30">
                      {pkg.supportingLabel || 'للصالات الاحترافية والتوسع الخارجي'}
                    </div>
                  )}

                  {isLocked && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-500/80 text-white text-[10px] sm:text-xs font-black px-4 sm:px-6 py-1.5 rounded-full shadow-lg uppercase tracking-wider whitespace-nowrap z-30">
                      {t.pricing.lockedBadge || 'متاحة لمصر فقط'}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className={`text-2xl sm:text-3xl font-black ${colors.text}`}>{pkg.name}</h3>
                    {pkg.supportingLabel && (
                      <p className="text-xs text-blue-400/90 font-medium mt-1">
                        {pkg.supportingLabel}
                      </p>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-6 sm:mb-8 min-h-[56px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pkg.id === 'international' ? selectedCountry.id : 'static'}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-baseline gap-2"
                      >
                        <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                          {pkg.id === 'international' && selectedCountry.id !== 'egypt' && intPricing[selectedCountry.id]
                            ? formatPriceEGP(Number(intPricing[selectedCountry.id].price))
                            : formatPriceEGP(Number(pkg.price))}
                        </span>
                        <span className="text-gray-400 font-bold text-base sm:text-lg">
                          {pkg.id === 'international' && selectedCountry.id !== 'egypt' && intPricing[selectedCountry.id]
                            ? intPricing[selectedCountry.id].currency
                            : pkg.currency}
                        </span>
                        {pkg.id === 'international' && selectedCountry.id !== 'egypt' && (
                          <div className="text-[11px] text-gray-500 mr-2 font-medium">
                            (يعادل {formatPriceEGP(Number(pkg.price))} {pkg.currency})
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <div className="h-px bg-white/10 mb-6 sm:mb-8" />

                  <ul className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10 flex-grow text-right" dir="rtl">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5 ${colors.icon}`} />
                        <span className="text-gray-300 font-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <RippleButton 
                    primary={pkg.popular}
                    onClick={() => {
                      setSelectedPackage(pkg);
                      const el = document.getElementById('smart-form');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all flex items-center justify-center gap-3 ${pkg.popular ? `${colors.button} text-white shadow-[0_20px_40px_${colors.glow}]` : 'glass glass-hover'}`}
                  >
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    ابدأ الآن وقرر بنفسك
                  </RippleButton>
                </motion.div>
              );
            })}
          </div>

          {/* Comparative Decision Guide (Sales Psychology) */}
          <div className="mt-24 sm:mt-32 max-w-6xl mx-auto space-y-12">
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-5 py-2 rounded-full text-xs font-black mb-4"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>دليل اتخاذ القرار الذكي • كيف تختار باقتك المثالية؟</span>
              </motion.div>
              <h3 className="text-2xl sm:text-4xl font-black text-white mt-2">دليل مقارنة القيمة وعلم النفس المالي ⚖️</h3>
              <p className="text-sm sm:text-base text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
                مقارنة صريحة تظهر العائد الفعلي على الاستثمار (ROI) لتتخذ قرارًا واعيًا يحمي أرباحك مدى الحياة ويقضي تماماً على تلاعب الكادر التشغيلي.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {/* Starter Card */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0c0c0e]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-primary/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4 text-right">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">الباقة الاقتصادية</div>
                  <h4 className="text-xl font-black text-white flex items-center gap-2 justify-start">
                    <span>Starter Package</span>
                    <span className="text-xs text-gray-400 font-normal">(للملاك الجدد)</span>
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    تم تصميم هذه الباقة لتوفير **الأمان الحسابي الأساسي** للمبتدئين الذين يديرون صالتهم بأنفسهم، ولا يملكون فريق عمل خارجي يحتاج لرقابة صارمة، أو مبيعات كافيه ضخمة.
                  </p>
                  <div className="h-px bg-white/5 my-4" />
                  <ul className="space-y-3 text-xs text-gray-400">
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>تسجيل آلي لجلسات اللعب بدقة</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>نظام محلي لا ينقطع أوفلاين 100%</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start text-red-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>لا توجد حماية متقدمة ضد تلاعب الموظفين</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start text-red-400/90">
                      <X className="w-4 h-4 shrink-0" />
                      <span>لا تشمل مبيعات الكافيه والمشروبات (البوفيه)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 bg-primary/5 border border-primary/10 p-4 rounded-2xl text-center">
                  <div className="text-[10px] text-primary font-black uppercase">القرار المالي الذكي:</div>
                  <div className="text-xs text-white font-bold mt-1">«اخترها فقط إذا كنت المدير الوحيد للصالة وتعمل بمفردك بنسبة 100%!»</div>
                </div>
              </motion.div>

              {/* Professional Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-accent/10 to-transparent border-2 border-accent/40 p-8 rounded-3xl relative overflow-hidden group shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between scale-100 md:scale-105 z-10"
              >
                <div className="absolute top-0 left-0 bg-accent text-black text-[9px] font-black px-4 py-1.5 rounded-br-2xl uppercase tracking-widest">
                  أعلى عائد استثماري (ROI) 🔥
                </div>
                <div className="space-y-4 text-right">
                  <div className="text-accent text-xs font-bold uppercase tracking-wider">الباقة الذهبية الموصى بها</div>
                  <h4 className="text-xl font-black text-white flex items-center gap-2 justify-start">
                    <span>Professional Package</span>
                    <span className="text-xs text-accent font-black">(الحصن السيادي)</span>
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    الباقة المفضلة لـ **90% من أصحاب الصالات** لأنها تساعدك على إدارة الصالة باحترافية: **متابعة أداء العمل وتسجيل كافة الجلسات بدقة**. فجوة السعر الضئيلة لمرة واحدة (2,000 ج.م) ستستردها خلال أول أسبوع تشغيل فقط بفضل دمج الكافيه وإدارة الأجهزة والجلسات من خلال السيستم!
                  </p>
                  <div className="h-px bg-white/5 my-4" />
                  <ul className="space-y-3 text-xs text-gray-300">
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-bold text-white">رقابة إدارية دقيقة لضمان تسجيل كافة الجلسات</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-bold text-white">نظام الكافيه والمخزن (تتبع علب الكانز والمشروبات)</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>تخصيص كامل للبراند (لوجو الصالة على الإيصالات)</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>تقارير ذكاء مالي وصيانة دورية للأجهزة والدراعات</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 bg-accent/15 border border-accent/30 p-4 rounded-2xl text-center">
                  <div className="text-[10px] text-accent font-black uppercase">القرار المالي الذكي:</div>
                  <div className="text-xs text-white font-bold mt-1">«الباقة الأكثر أماناً وحماية لأرباح الصالة في غيابك. تمنع تسريب مليم واحد!»</div>
                </div>
              </motion.div>

              {/* International Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0c0c0e]/60 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4 text-right">
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">باقة التوسع والخليج</div>
                  <h4 className="text-xl font-black text-white flex items-center gap-2 justify-start">
                    <span>International Package</span>
                    <span className="text-xs text-blue-400 font-normal">(للمحترفين والخليج)</span>
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    مخصصة للصالات الكبرى والشركات التي تبحث عن **امتثال تام لاشتراطات بلدي والبلدية في السعودية والخليج**، أو تلك التي تهدف للتوسع العابر للحدود وتغيير العملات وضبط المنطقة الزمنية بدقة تامة.
                  </p>
                  <div className="h-px bg-white/5 my-4" />
                  <ul className="space-y-3 text-xs text-gray-400">
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>دعم كامل وتثبيت لعملات الخليج ومصر</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>الامتثال للمنطقة الزمنية والضريبة الرسمية (VAT)</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>قناة دعم دولي مخصصة فائقة السرعة</span>
                    </li>
                    <li className="flex items-center gap-2 justify-start">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>جاهزية للتوسع والربط السحابي للفروع (قيد التطوير النشط حالياً ⏳)</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8 bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl text-center">
                  <div className="text-[10px] text-blue-400 font-black uppercase">القرار المالي الذكي:</div>
                  <div className="text-xs text-white font-bold mt-1">«خيارك الحتمي إذا كانت صالتك في السعودية أو الخليج، أو تخطط لبراند متعدد الفروع.»</div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Comparison Details Table */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0c0c0e]/80 border border-white/10 rounded-[32px] p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden text-right"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full pointer-events-none" />
              <h4 className="text-lg sm:text-xl font-black text-white mb-6 text-right flex items-center gap-2 justify-start">
                <Zap className="w-5 h-5 text-amber-400" />
                <span>جدول الفروقات الحاسمة والأثر المالي (Sovereign Value Matrix)</span>
              </h4>
              
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse min-w-[650px] text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400">
                      <th className="pb-4 font-black text-right">الميزة / وجه المقارنة</th>
                      <th className="pb-4 font-black text-center text-primary">Starter (الأساسية)</th>
                      <th className="pb-4 font-black text-center text-accent">Professional (الاحترافية) 🔥</th>
                      <th className="pb-4 font-black text-center text-blue-400">International (الدولية)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    <tr>
                      <td className="py-4 font-bold text-white">نوع الملكية والترخيص</td>
                      <td className="py-4 text-center">أصل مدى الحياة لفرع واحد (مرة واحدة)</td>
                      <td className="py-4 text-center text-accent font-black bg-accent/5">أصل مدى الحياة لفرع واحد (مرة واحدة)</td>
                      <td className="py-4 text-center">أصل مدى الحياة للفرع الحالي (مع ترخيص ترقية للفروع مستقبلاً)</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-white">إدارة الأجهزة والجلسات من خلال السيستم</td>
                      <td className="py-4 text-center text-gray-500">❌ حماية أساسية (يدوية)</td>
                      <td className="py-4 text-center text-accent font-black bg-accent/5">👑 رقابة إدارية دقيقة لضمان تسجيل كافة الجلسات</td>
                      <td className="py-4 text-center text-blue-400 font-bold">👑 رقابة إدارية دقيقة لضمان تسجيل كافة الجلسات</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-white">نظام الكافيه والمشروبات والمخازن</td>
                      <td className="py-4 text-center text-red-400">❌ غير متوفر</td>
                      <td className="py-4 text-center text-accent font-black bg-accent/5">☕ متكامل مع جرد تلقائي لكل مشروب</td>
                      <td className="py-4 text-center text-blue-400 font-bold">☕ متكامل مع جرد تلقائي لكل مشروب</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-white">هوية الصالة واللوجو والشعار المخصص</td>
                      <td className="py-4 text-center text-gray-500">اسم الصالة نصياً فقط</td>
                      <td className="py-4 text-center text-accent font-black bg-accent/5">🎨 لوجو مخصص وهوية براند كاملة بالإيصالات</td>
                      <td className="py-4 text-center text-blue-400 font-bold">🎨 لوجو مخصص وهوية براند كاملة بالإيصالات</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-white">دعم عملات الخليج وتوقيت البلدية والضرائب</td>
                      <td className="py-4 text-center text-red-400">❌ غير مدعوم</td>
                      <td className="py-4 text-center text-red-400">❌ غير مدعوم</td>
                      <td className="py-4 text-center text-blue-400 font-black bg-blue-500/5">🇸🇦✔️ امتثال كامل لاشتراطات الخليج والضرائب</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-white">قناة الدعم الفني والضمان المباشر</td>
                      <td className="py-4 text-center">خلال فترة الضمان الأساسية</td>
                      <td className="py-4 text-center text-accent font-bold bg-accent/5">دعم فني استراتيجي VIP وأولوية قصوى</td>
                      <td className="py-4 text-center text-blue-400 font-bold">دعم فني عابر للحدود 24/7 مع التحديثات</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-bold text-white">العائد المالي المتوقع (Expected ROI)</td>
                      <td className="py-4 text-center text-gray-400">سد التسريبات الأساسية</td>
                      <td className="py-4 text-center text-accent font-black bg-accent/10">زيادة 30% - 40% في الأرباح الإجمالية 🔥</td>
                      <td className="py-4 text-center text-blue-400">توسع مستقبلي وإدارة الفروع (قيد التطوير حالياً ⏳)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Custom System Offer */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto glass p-8 sm:p-12 rounded-[40px] border-emerald-500/20 text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mx-auto mb-6">
                <Handshake className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4">{activeCmsContent.branchesTitle || "هل تمتلك فروعاً متعددة؟"}</h3>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                {activeCmsContent.branchesText || <>على الرغم من أن الباقات الجاهزة لا تشمل إدارة الفروع، إلا أننا في <span className="text-emerald-500 font-bold">IDEA Makers</span> يمكننا تصميم وتطوير <span className="text-white font-bold">نظام مخصص لك بالكامل</span> يشمل إدارة الفروع المتعددة والربط السحابي الموحد.</>}
              </p>
              <RippleButton 
                onClick={() => handleWhatsApp(activeCmsContent.whatsappMessage || "*مرحبًا فريق صُنّاع الفكرة* 👋\n\nأرغب في تصميم نظام مخصص لإدارة فروع متعددة لصالة البلايستيشن الخاصة بي.")}
                className="bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
              >
                {activeCmsContent.branchesBtnText || "اطلب نظامك المخصص الآن"}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-10" />
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-primary/10 blur-[60px] sm:blur-[80px] rounded-full" />
            <div className="relative z-10">
              <h2 className="font-black mb-6">{activeCmsContent.trialTitle || "\"ابدأ الآن وقرر بنفسك\""}</h2>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto font-light whitespace-pre-line">
                {activeCmsContent.trialText || <>خلال 3 أيام فقط، ستسترد قيمة نظام الكاشير بالكامل من الأرباح الإضافية التي ستحققها!<br/>نحن لا نمنحك مجرد "تجربة مجانية"، بل نضع بين يديك **أداة تدقيق مالي وإداري** متكاملة لضبط مبيعات الصالة وسد ثغرات الكاشير. شغل النظام لمدة 3 أيام، وقارن أرباحك الحالية بما كنت تحققه سابقاً.. وستصدمك الفروقات الحقيقية.</>}
              </p>
              <RippleButton 
                primary
                onClick={() => {
                  const el = document.getElementById('smart-form');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-accent text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all shadow-2xl shadow-accent/20"
              >
                {activeCmsContent.trialBtnText || "ابدأ تجربة مجانية"}
              </RippleButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials customTestimonials={activeLocal.testimonials} />

      {/* Enterprise Company Profile & Technical Proposal Section */}
      <CompanyProfileSection 
        onOpenViewer={handleOpenCompanyProfile}
        onWhatsAppInquiry={handleWhatsApp}
      />

      {/* Brand Authority Section */}
      <section id="about" className="scroll-mt-24 sm:scroll-mt-28 py-24 bg-white/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Section 1: About Us */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-bold text-primary mb-6 border-primary/30">
                <Gamepad2 className="w-4 h-4" />
                {activeCmsContent.aboutUsBadge || "القوة الهندسية خلف مشروعك"}
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">من نحن: <br/><span className="text-gradient">{activeCmsContent.aboutUsTitle || "IDEA Makers"}</span></h2>
              <p className="text-xl text-gray-400 mb-6 leading-relaxed font-light">
                {activeCmsContent.aboutUsText1 || "نحن شركة تكنولوجيا رائدة متخصصة في تطوير الأنظمة البرمجية وحلول الإدارة الذكية التي تهدف إلى رفع كفاءة الأعمال وزيادة الأرباح."}
              </p>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed font-light">
                {activeCmsContent.aboutUsText2 || "في IDEA Makers، نحن لسنا مجرد بائعي برامج؛ نحن شركة هندسية متكاملة تركز على ابتكار حلول تقنية تعالج التحديات الحقيقية التي تواجه أصحاب المشاريع، مما يضمن لك السيادة الكاملة على بيئة عملك."}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="glass px-6 py-3 rounded-2xl border-primary/20 text-primary font-bold">{activeCmsContent.aboutUsTag1 || "تطوير أنظمة الأعمال"}</div>
                <div className="glass px-6 py-3 rounded-2xl border-primary/20 text-primary font-bold">{activeCmsContent.aboutUsTag2 || "حلول الإدارة الذكية"}</div>
                <div className="glass px-6 py-3 rounded-2xl border-primary/20 text-primary font-bold">{activeCmsContent.aboutUsTag3 || "أتمتة العمليات"}</div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="glass aspect-video rounded-[40px] p-1 overflow-hidden">
                <div className="w-full h-full rounded-[38px] bg-gradient-to-br from-primary/20 to-black flex items-center justify-center relative group">
                  <div className="absolute inset-0 tech-grid opacity-20" />
                  <Gamepad2 className="w-24 h-24 text-primary animate-pulse" />
                  <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border-white/10">
                    <div className="text-sm text-gray-400 mb-1 uppercase tracking-widest font-bold">{activeCmsContent.aboutUsBannerType || "Engineering Excellence"}</div>
                    <div className="text-xl font-black">{activeCmsContent.aboutUsBannerText || "نصمم المستقبل.. لا نكتفي ببرمجته"}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section 2 & 3: Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] border-primary/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all" />
              <Target className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-3xl font-black mb-6">{activeCmsContent.visionTitle || "رؤيتنا"}</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                {activeCmsContent.visionText || "نسعى لأن نكون المزوّد الأول والملهم لأنظمة إدارة الأعمال الذكية في قطاع الألعاب والترفيه، من خلال الابتكار المستمر والأتمتة التي تساعد الشركات على النمو والتوسع عالمياً، وتحويل كل صالة إلى كيان مؤسسي ناجح."}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-10 rounded-[40px] border-accent/20 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl -mr-16 -mt-16 group-hover:bg-accent/20 transition-all" />
              <TrendingUp className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-3xl font-black mb-6">{activeCmsContent.missionTitle || "رسالتنا"}</h3>
              <p className="text-lg text-gray-400 leading-relaxed font-light">
                {activeCmsContent.missionText || "مهمتنا هي تمكين أصحاب صالات البلايستيشن من إدارة مشاريعهم باحترافية وسهولة، والقضاء على الفوضى التشغيلية، وتحويل التكنولوجيا إلى أداة بسيطة تضاعف الأرباح وتضمن الاستدامة والنمو المستمر."}
              </p>
            </motion.div>
          </div>

          {/* Section 4: Values */}
          <div className="mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-black mb-4">{activeCmsContent.coreValuesTitle || "قيمنا الجوهرية"}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{activeCmsContent.coreValuesSubtitle || "المبادئ التي تحرك كل سطر برمججي نكتبه وكل قرار نتخذه"}</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: <Gamepad2 />, title: activeCmsContent.val1Title || "الابتكار", desc: activeCmsContent.val1Desc || "نسابق الزمن لتقديم أحدث الحلول." },
                { icon: <ShieldCheck />, title: activeCmsContent.val2Title || "الموثوقية", desc: activeCmsContent.val2Desc || "أنظمتنا هي العمود الفقري لمشروعك." },
                { icon: <Eye />, title: activeCmsContent.val3Title || "الشفافية", desc: activeCmsContent.val3Desc || "وضوح كامل في كل تفصيلة تقنية ومالية." },
                { icon: <TrendingUp />, title: activeCmsContent.val4Title || "التطوير المستمر", desc: activeCmsContent.val4Desc || "لا نتوقف عن تحسين أدواتنا." },
                { icon: <Trophy />, title: activeCmsContent.val5Title || "نجاح العميل", desc: activeCmsContent.val5Desc || "نجاحك هو المقياس الحقيقي لنجاحنا." }
              ].map((value, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass p-8 rounded-3xl border-white/5 text-center group"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all text-primary">
                    {React.cloneElement(value.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 5: Why Choose Us */}
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-12 md:p-20 rounded-[48px] border-primary/20 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[120px] -ml-32 -mt-32" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">{activeCmsContent.whyChooseTitle || "لماذا تختار IDEA Makers؟"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
                  {[
                    { icon: <WifiOff />, title: activeCmsContent.why1Title || "نظام أوفلاين بالكامل", desc: activeCmsContent.why1Desc || "لا حاجة للإنترنت، عملك مستمر دائماً وبدون انقطاع." },
                    { icon: <Clock />, title: activeCmsContent.why2Title || "ملكية مدى الحياة", desc: activeCmsContent.why2Desc || "ادفع مرة واحدة وامتلك النظام للأبد بدون اشتراكات شهرية." },
                    { icon: <Star />, title: activeCmsContent.why3Title || "تجربة مجانية", desc: activeCmsContent.why3Desc || "3 أيام لاكتشاف القوة الحقيقية للنظام قبل اتخاذ قرار الشراء." },
                    { icon: <Settings />, title: activeCmsContent.why4Title || "تخصيص كامل", desc: activeCmsContent.why4Desc || "تحكّم في الهوية البصرية بما يناسب براند صالتك وشعارك." },
                    { icon: <Monitor />, title: activeCmsContent.why5Title || "تركيب احترافي", desc: activeCmsContent.why5Desc || "فريقنا يتولى الإعداد والتشغيل والربط في مكانك." },
                    { icon: <HelpCircle />, title: activeCmsContent.why6Title || "تدريب ودعم فني", desc: activeCmsContent.why6Desc || "نضمن لك ولطاقمك إتقان التعامل مع النظام مع دعم مستمر." },
                    { icon: <Play />, title: activeCmsContent.why7Title || "صُمم خصيصاً", desc: activeCmsContent.why7Desc || "حلول هندسية موجهة بدقة لتلبية احتياجات صالات البلايستيشن." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-5"
                    >
                      <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-16 text-center">
                  <p className="text-xl font-bold text-white mb-8">{activeCmsContent.whyChooseFooterText || "اختيار IDEA Makers هو القرار الأذكى لمستقبل صالتك"}</p>
                  <RippleButton 
                    primary
                    onClick={() => handleWhatsApp(activeCmsContent.whatsappMessage || "*مرحبًا فريق صُنّاع الفكرة* 👋\n\nأريد معرفة المزيد عن حلول IDEA Makers وكيف يمكنكم مساعدتي في تطوير صالتي.")}
                    className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all"
                  >
                    {activeCmsContent.whyChooseFooterBtnText || "تحدث مع خبيرنا التقني الآن"}
                  </RippleButton>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Founder Story Section */}
      <section id="founder" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column: Founder Image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="relative glass p-2 sm:p-2.5 rounded-[36px] sm:rounded-[44px] border border-primary/30 overflow-hidden shadow-[0_25px_80px_rgba(168,85,247,0.3)] bg-[#090914] group">
                  <div className="relative rounded-[30px] sm:rounded-[38px] overflow-hidden aspect-[1218/1292] bg-[#070710]">
                    <img 
                      src={(!activeCmsContent.founderImgUrl || activeCmsContent.founderImgUrl.includes('CEO-Eslam-Arafa.jpg') || activeCmsContent.founderImgUrl.includes('Neon_Idea_Makers_Founder_Poster_882efcf0.png')) ? "/assets/aistudio/IDEA_MAKERS__Neon_Visionary_Founder_Poster_f63e4b3b.png" : activeCmsContent.founderImgUrl} 
                      alt={`${activeCmsContent.founderName || "Eslam Arafa"} - ${activeCmsContent.founderRole || "Founder & CEO – IDEA Makers"}`} 
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                    {/* Subtle neon rim highlight */}
                    <div className="absolute inset-0 rounded-[30px] sm:rounded-[38px] ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>
                </div>
                
                {/* Floating Badge */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 glass px-6 py-4 rounded-2xl border-primary/30 shadow-xl z-20 hidden md:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{activeCmsContent.founderExpTitle || "Expertise"}</p>
                      <p className="text-sm font-bold">{activeCmsContent.founderExpDesc || "Systems Engineer"}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column: Story Content */}
              <div className="text-right">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">{activeCmsContent.founderStorySubtitle || "الرؤية خلف الابتكار"}</span>
                  <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">تعرف على مؤسس <br/><span className="text-gradient">{(activeCmsContent.founderStoryTitle || "صُنّاع الفكرة").replace(/^تعرف على مؤسس\s*/, '') || "صُنّاع الفكرة"}</span></h2>
                </motion.div>

                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                  >
                    <Quote className="absolute -top-4 -right-8 w-12 h-12 text-primary/10 rotate-180" />
                    <p className="text-xl text-gray-300 leading-relaxed font-light italic">
                      "{activeCmsContent.founderQuote || "فكرة النظام بدأت عندما لاحظنا الفوضى التي يعاني منها أصحاب صالات البلايستيشن. كمهندس برمجيات، لم أستطع تجاهل حجم الخسائر التي يسببها غياب النظام الدقيق."}"
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6 text-gray-400 text-lg leading-relaxed font-light"
                  >
                    <p>
                      {activeCmsContent.founderPara1 || <>لاحظ <span className="text-white font-medium">إسلام عرفة</span> أن العديد من الصالات تعاني من <span className="text-red-400">سوء الإدارة، وضياع الأرباح، وغياب التقارير الواضحة</span>. هذا الواقع كان الدافع الأساسي لبناء نظام احترافي صُمم خصيصاً ليفهم لغة هذا البيزنس ويحل مشاكله من الجذور.</>}
                    </p>
                    <p>
                      {activeCmsContent.founderPara2 || <>تحول <span className="text-primary font-medium">IDEA Makers PlayStation POS</span> من مجرد كود برمججي إلى رحلة نجاح ساعدت مئات أصحاب الصالات على الانتقال من <span className="text-white font-medium">الفوضى اليدوية إلى الإدارة الرقمية الذكية</span> التي تضمن السيادة الكاملة والنمو المستدام.</>}
                    </p>
                    <p className="bg-white/5 p-6 rounded-2xl border-r-4 border-primary">
                      {activeCmsContent.founderPara3 || <>الهدف لم يكن أبداً مجرد بيع برنامج، بل تمكين أصحاب المشاريع من <span className="text-white font-bold">مضاعفة أرباحهم، وإدارة صالاتهم بسهولة، والعمل باحترافية تليق بطموحاتهم.</span></>}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="pt-8"
                  >
                    <RippleButton 
                      onClick={() => {
                        const el = document.getElementById('story');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-primary font-bold text-lg hover:underline flex items-center gap-2 mr-auto lg:mr-0"
                    >
                      {activeCmsContent.founderBtnText || "اقرأ القصة الكاملة للابتكار"}
                      <ArrowLeft className="w-5 h-5" />
                    </RippleButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Architecture Section */}
      <TrustArchitecture onContactFounder={handleWhatsApp} />

      {/* Smart Form Section */}
      <SmartForm initialPackage={selectedPackage} initialCountry={selectedCountry} />

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 sm:scroll-mt-28 py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5" />
        <div className="container max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="font-bold mb-4">{t.faq.title}</h2>
            <p className="text-gray-400 text-base sm:text-lg">{t.faq.subtitle}</p>
          </motion.div>

          <div className="space-y-4">
            {(activeLocal.faqs && activeLocal.faqs.length > 0 ? activeLocal.faqs : faqs).map((faq, i) => (
              <motion.details 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl group"
              >
                <summary className="p-5 sm:p-6 cursor-pointer font-bold flex items-center justify-between list-none text-base sm:text-lg">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                  {faq.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
          </>
        );
      })()}

      {/* Social Media Icons Section */}
      <SocialIcons />

      {/* Professional Footer */}
      <Footer 
        onNavigatePath={navigateTo} 
        selectedCountryId={selectedCountry.id}
        onSelectCountry={handleCountryChange}
      />

      {/* Sticky Mobile CTA Bar */}
      <div className="sticky-cta-bar flex gap-2.5 sm:gap-3">
        <button 
          onClick={() => navigateToSection('smart-form')}
          className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-primary/25 cursor-pointer transition-colors"
        >
          ابدأ التجربة المجانية (3 أيام)
        </button>
        <button 
          onClick={() => handleWhatsApp("*مرحبًا فريق صُنّاع الفكرة* 👋\n\nأرغب في شراء نظام البلايستيشن.")}
          className="glass hover:bg-white/10 text-white px-4 py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>واتساب</span>
        </button>
      </div>

      {/* World-Class Enterprise Company Profile & Technical Proposal Viewer Modal */}
      <CompanyProfileViewerModal
        isOpen={isCompanyProfileViewerOpen}
        onClose={() => setIsCompanyProfileViewerOpen(false)}
        initialPage={companyProfileInitialPage}
        onConsultationClick={handleWhatsApp}
      />
    </div>
  );
}
