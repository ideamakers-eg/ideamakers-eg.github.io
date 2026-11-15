import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Receipt, 
  Coffee, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  WifiOff, 
  Play, 
  Clock, 
  Sparkles,
  Layers,
  MonitorCheck
} from 'lucide-react';
import { ThreeSceneCanvas } from './ThreeSceneCanvas';

import heroDeviceImg from '../../assets/images/hero_device_session_1791830324822.jpg';
import heroCashierImg from '../../assets/images/hero_smart_cashier_1791830336913.jpg';
import heroInventoryImg from '../../assets/images/hero_sales_inventory_1791830349922.jpg';
import heroRevenueImg from '../../assets/images/hero_revenue_analytics_1791830360334.jpg';

interface CarouselItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  kpis: { label: string; value: string; desc: string }[];
  image: string;
  icon: React.ReactNode;
  sceneThemeColor: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 'device-session',
    category: 'إدارة الأجهزة والجلسات',
    badge: 'دقة حسابية بالثانية',
    title: 'تحكم دقيق ومتابعة للجلسات',
    subtitle: 'متابعة لحظية للجلسات وتنبيهات فورية للموظفين',
    description: 'ربط لحظي لجميع أجهزة PlayStation مع كاشير الصالة. تسعير مرن للجلسات الفردية والزوجية وغرف الـ VIP مع حساب دقيق للثانية الواحدة يمنع أي تسريب مالي.',
    kpis: [
      { label: 'حساب الوقت', value: 'دقة 100%', desc: 'بالثانية دون تقريب' },
      { label: 'تنبيهات الجلسات', value: 'تنبيه فوري', desc: 'لضمان التحصيل' },
      { label: 'أنواع الجلسات', value: 'فردي / زوجي', desc: 'وتسعير VIP مرن' }
    ],
    image: heroDeviceImg,
    icon: <Gamepad2 className="w-5 h-5" />,
    sceneThemeColor: '#a855f7'
  },
  {
    id: 'smart-cashier',
    category: 'الكاشير وإغلاق الورديات',
    badge: 'نظام محاسبي محكم',
    title: 'كاشير ذكي وتسليم شيفتات بفرز إلكتروني صارم',
    subtitle: 'حماية تامة من التلاعب وتطابق آلي لعهدة الخزينة',
    description: 'برنامج كاشير متطور يتيح تحديد صلاحيات مخصصة لكل موظف، مع إمكانية فتح وإغلاق الشيفتات ومطابقة الخزنة لحظياً، وطباعة فواتير وإيصالات حرارية رسمية بهوية صالتك.',
    kpis: [
      { label: 'تسليم الشيفت', value: 'جرد فوري', desc: 'مطابقة رقمية للخزنة' },
      { label: 'طباعة الإيصال', value: '80mm / 58mm', desc: 'فواتير حرارية بشعارك' },
      { label: 'أمان النظام', value: 'صلاحيات دقيقة', desc: 'منع تعديل الأسعار يدوياً' }
    ],
    image: heroCashierImg,
    icon: <Receipt className="w-5 h-5" />,
    sceneThemeColor: '#c084fc'
  },
  {
    id: 'sales-inventory',
    category: 'المبيعات وجرد بوفيه الصالة',
    badge: 'ضبط استهلاك الكافيه',
    title: 'ربط مباشر للمشروبات والوجبات بفاتورة العميل',
    subtitle: 'خصم تلقائي من المخزن وتنبيهات فورية لنواقص الأصناف',
    description: 'قائمة بوفيه ومشروبات متكاملة ترفع مبيعات الصالة بمتوسط 40%. يخصم النظام استهلاك الكافيه آلياً من المخزن ويدمج الحساب في فاتورة الجلسة دون أي عجز في نهاية اليوم.',
    kpis: [
      { label: 'مبيعات الكافيه', value: '+40% نمو', desc: 'في أرباح البوفيه' },
      { label: 'جرد المخزون', value: 'خصم لحظي', desc: 'مع كل طلب أو مشروب' },
      { label: 'فاتورة موحدة', value: 'دمج شامل', desc: 'وقت اللعب والمشتريات' }
    ],
    image: heroInventoryImg,
    icon: <Coffee className="w-5 h-5" />,
    sceneThemeColor: '#8b5cf6'
  },
  {
    id: 'revenue-analytics',
    category: 'ذكاء الأعمال والإيرادات',
    badge: 'تقارير أرباح تنفيذية',
    title: 'رؤية مالية واضحة ومؤشرات لنمو أرباح الصالة',
    subtitle: 'تقارير يومية وشهرية توضح الأرباح الصافية وساعات الذروة',
    description: 'لوحات بيانية تفاعلية تكشف الأجهزة الأكثر تشغيلاً، وساعات الذروة المربحة، مع حساب دقيق للأرباح الصافية بعد خصم المصروفات والصيانة لتمكينك من التوسع والسيطرة.',
    kpis: [
      { label: 'تحليل الأرباح', value: 'صافي الربح', desc: 'بعد خصم المصاريف' },
      { label: 'ساعات الذروة', value: 'تحليل الإشغال', desc: 'لكل جهاز وغرفة VIP' },
      { label: 'رخصة النظام', value: 'ملكية للأبد', desc: 'بدون أي اشتراك شهري' }
    ],
    image: heroRevenueImg,
    icon: <TrendingUp className="w-5 h-5" />,
    sceneThemeColor: '#d8b4fe'
  }
];

interface HeroControlCenterCarouselProps {
  onStartTrial: () => void;
  onWatchDemo: () => void;
  selectedCountry: { name: string; flag: string; currency: string };
  heroTag?: string;
  heroTitlePrefix?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
}

export const HeroControlCenterCarousel: React.FC<HeroControlCenterCarouselProps> = ({
  onStartTrial,
  onWatchDemo,
  selectedCountry,
  heroTag,
  heroTitlePrefix,
  heroTitleHighlight,
  heroDescription
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [pointerOffset, setPointerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Motion transition lock duration (650ms TOONHUB spec)
  const TRANSITION_DURATION = 650;

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [isTransitioning]);

  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, [isTransitioning]);

  const handleSelect = (idx: number) => {
    if (isTransitioning || idx === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(idx);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  };

  // Auto-play interval with pause on hover
  useEffect(() => {
    if (!isAutoPlay || reducedMotion) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay, handleNext, reducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // In Arabic RTL, ArrowRight moves to previous in reading order or next based on intent
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Pointer movement on desktop for subtle 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointerOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe Right (in RTL, advances previous)
        handlePrev();
      } else {
        // Swipe Left (advances next)
        handleNext();
      }
    }
    touchStartXRef.current = null;
  };

  const activeItem = CAROUSEL_ITEMS[activeIndex];

  // Helper to determine relative position in the 4-item carousel loop
  const getCardPosition = (itemIndex: number) => {
    const diff = (itemIndex - activeIndex + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length;
    if (diff === 0) return 'center';
    if (diff === 1) return 'next';
    if (diff === CAROUSEL_ITEMS.length - 1) return 'prev';
    return 'far';
  };

  return (
    <section 
      ref={heroContainerRef}
      className="relative pt-24 sm:pt-28 md:pt-32 pb-16 lg:pb-24 overflow-hidden bg-[#050508] text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="مركز تحكم صُنّاع الفكرة"
    >
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 bg-radial from-purple-950/20 via-black to-[#050508] pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none" />
      
      {/* Deep Violet Ambient Glow Orbs */}
      <div 
        className="purple-glow w-[550px] h-[550px] bg-primary/25 top-[-10%] right-[-5%] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${pointerOffset.x * 25}px, ${pointerOffset.y * 25}px)`
        }}
      />
      <div 
        className="purple-glow w-[450px] h-[450px] bg-purple-700/15 bottom-[5%] left-[-8%] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${-pointerOffset.x * 20}px, ${-pointerOffset.y * 20}px)`
        }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Header Badge & Strategic Kicker */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-primary/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] text-xs font-bold text-primary tracking-wide mb-4"
          >
            <Gamepad2 className="w-4 h-4 text-primary animate-pulse" />
            <span>{heroTag || `النظام الأذكى لإدارة صالات الألعاب والترفيه في ${selectedCountry.name} ${selectedCountry.flag}`}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.25] tracking-tight text-balance"
          >
            <span>{heroTitlePrefix || 'نظام إدارة صالات البلايستيشن والكافيه المحترف'}</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-white block sm:inline">
              {heroTitleHighlight || '— إدارة ذكية متكاملة'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed text-balance"
          >
            {heroDescription || 'برنامج أوفلاين 100% مدى الحياة بدون اشتراكات شهرية متكررة. مصمم بدقة لمنع التلاعب بتوقيت الأجهزة وضبط مبيعات الكافيه والبوفيه بالكامل مع إصدار فواتير احترافية.'}
          </motion.p>
        </div>

        {/* =========================================================================
            THE 3D CAROUSEL: "THE CONTROL CENTER"
            Four Visual Representations with 650ms Cubic-Bezier depth motion
           ========================================================================= */}
        <div 
          className="relative mt-4 sm:mt-6 select-none"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Main Cinematic Visual Stage */}
          <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] lg:h-[540px] flex items-center justify-center perspective-[1200px]">

            {/* Render Peripheral and Active Items in Spatial 3D Stack */}
            {CAROUSEL_ITEMS.map((item, idx) => {
              const position = getCardPosition(idx);
              const isActive = position === 'center';
              const isPrev = position === 'prev';
              const isNext = position === 'next';
              const isFar = position === 'far';

              // Depth calculations inspired by TOONHUB 3D Carousel spec
              let translateX = '0%';
              let translateZ = '0px';
              let rotateY = '0deg';
              let scale = 1.0;
              let opacity = 1.0;
              let zIndex = 30;
              let blur = 'blur(0px)';
              let pointerEvents: 'auto' | 'none' = 'auto';

              if (isPrev) {
                // In Arabic RTL, "prev" is positioned to the right side
                translateX = '68%';
                translateZ = '-180px';
                rotateY = '-16deg';
                scale = 0.82;
                opacity = 0.45;
                zIndex = 15;
                blur = 'blur(2px)';
              } else if (isNext) {
                // In Arabic RTL, "next" is positioned to the left side
                translateX = '-68%';
                translateZ = '-180px';
                rotateY = '16deg';
                scale = 0.82;
                opacity = 0.45;
                zIndex = 15;
                blur = 'blur(2px)';
              } else if (isFar) {
                translateX = '0%';
                translateZ = '-350px';
                scale = 0.65;
                opacity = 0;
                zIndex = 5;
                blur = 'blur(6px)';
                pointerEvents = 'none';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => !isActive && handleSelect(idx)}
                  className={`absolute inset-0 flex items-center justify-center transition-all cursor-pointer ${
                    isActive ? 'cursor-default' : 'hover:opacity-75'
                  }`}
                  style={{
                    transform: `translate3d(${translateX}, 0, ${translateZ}) rotateY(${rotateY}) scale(${scale})`,
                    opacity,
                    zIndex,
                    filter: blur,
                    pointerEvents,
                    transitionDuration: `${TRANSITION_DURATION}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  aria-hidden={!isActive}
                >
                  <div className="relative w-full max-w-[92%] sm:max-w-[82%] md:max-w-[760px] lg:max-w-[860px] h-[340px] sm:h-[410px] md:h-[460px] lg:h-[490px] rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0b0a13]/90 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.15)] group">
                    
                    {/* Background Backdrop Texture with Measured Contrast Scrim */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                          isActive ? 'scale-100 opacity-30' : 'scale-105 opacity-25'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090810] via-[#090810]/75 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#090810]/90 via-transparent to-[#090810]/90" />
                    </div>

                    {/* Active Real-Time Three.js 3D Interactive Canvas */}
                    {isActive && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <ThreeSceneCanvas activeIndex={activeIndex} pointerOffset={pointerOffset} />
                      </div>
                    )}

                    {/* Glass Surface Rim & Ambient Neon Glow */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#07070c] via-[#07070c]/80 to-transparent z-20 pointer-events-none" />

                    {/* Semantic DOM Overlay (Accessible HTML, not embedded into canvas pixels) */}
                    <div className="relative z-20 h-full flex flex-col justify-between p-5 sm:p-7 md:p-9 text-right">
                      
                      {/* Top Card Kicker & Category Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-primary shadow-inner">
                            {item.icon}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-primary block leading-none">{item.category}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{item.badge}</span>
                          </div>
                        </div>

                        {/* Interactive Status Indicator */}
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                          </span>
                          <span className="text-[10px] font-bold text-gray-300 font-mono tracking-wider">
                            0{idx + 1} / 0{CAROUSEL_ITEMS.length}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Contextual Info & KPIs (Rendered prominently on Active item) */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="max-w-xl">
                          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight drop-shadow-md">
                            {item.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-none font-normal leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* 3-Point Operational KPIs */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 border-t border-white/[0.08]">
                          {item.kpis.map((kpi, kpiIdx) => (
                            <div 
                              key={kpiIdx} 
                              className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                            >
                              <div className="text-[11px] sm:text-xs font-black text-white tabular-nums flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                                <span>{kpi.value}</span>
                              </div>
                              <div className="text-[10px] text-gray-400 font-medium truncate mt-0.5">
                                {kpi.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Carousel Minimal Circular Arrow Controls (Accessible, visible focus states) */}
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-2 right-2 sm:left-4 sm:right-4 z-40 pointer-events-none">
            
            {/* Previous Button (In RTL, points right visually) */}
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              aria-label="الحالة السابقة في مركز التحكم"
              className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#12111d]/90 hover:bg-primary/20 text-white hover:text-primary border border-white/15 hover:border-primary/50 backdrop-blur-xl shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black cursor-pointer group disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            </button>

            {/* Next Button (In RTL, points left visually) */}
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label="الحالة التالية في مركز التحكم"
              className="pointer-events-auto w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#12111d]/90 hover:bg-primary/20 text-white hover:text-primary border border-white/15 hover:border-primary/50 backdrop-blur-xl shadow-xl flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black cursor-pointer group disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Bottom Segmented Carousel Navigator Tabs */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4">
            
            {/* Segmented 4-State Navigation Bar */}
            <div 
              role="tablist"
              aria-label="أقسام مركز التحكم"
              className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl max-w-full overflow-x-auto scrollbar-none"
            >
              {CAROUSEL_ITEMS.map((item, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={item.category}
                    onClick={() => handleSelect(idx)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]'
                        : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="hidden md:inline">{item.category}</span>
                    <span className="md:hidden">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Segmented Progress Indicators */}
            <div className="flex items-center gap-2">
              {CAROUSEL_ITEMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  aria-label={`الانتقال إلى الشريحة ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeIndex
                      ? 'w-8 bg-primary shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

        {/* =========================================================================
            PRIMARY HERO ACTIONS & PRESERVED CTA (Exact Free-Trial flow)
           ========================================================================= */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4 sm:gap-5 text-center">
          
          <div className="relative group w-full sm:w-auto">
            {/* Free Trial Offer Ribbon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 220 }}
              className="absolute -top-3.5 -right-2 sm:-right-4 z-20 bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg shadow-orange-500/40 border border-white/20 whitespace-nowrap"
            >
              تجربة مجانية 3 أيام (72 ساعة)
            </motion.div>

            {/* Primary Action Button */}
            <button
              onClick={onStartTrial}
              className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white px-8 py-4 sm:px-12 sm:py-4.5 rounded-2xl shadow-2xl shadow-primary/35 font-black text-base sm:text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group/btn"
            >
              <span>ابدأ تجربتك المجانية الآن</span>
              <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-1" />
            </button>
          </div>

          {/* Secondary Watch Demo Action & Trust Note */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>لا يلزم بطاقة ائتمان — وصول كامل لمدة 72 ساعة</span>
            </span>
            <span className="hidden sm:inline text-white/20">·</span>
            <button
              onClick={onWatchDemo}
              className="text-gray-300 hover:text-primary transition-colors font-bold underline underline-offset-4 decoration-primary/40 flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>شاهد فيديو النظام وهو يعمل</span>
            </button>
          </div>

          {/* 3 Pillars of Trust Architecture */}
          <div className="mt-8 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl text-right">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <WifiOff className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">نظام أوفلاين 100%</h4>
                <p className="text-[11px] text-gray-400">يعمل بدون إنترنت بثبات تام</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">ملكية مدى الحياة</h4>
                <p className="text-[11px] text-gray-400">شراء مرة واحدة بدون اشتراكات</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <MonitorCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">+500 صالة ناجحة</h4>
                <p className="text-[11px] text-gray-400">الخيار الأول في مصر والخليج</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
