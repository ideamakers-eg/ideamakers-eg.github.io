import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, ArrowLeft, Play, ShieldCheck, Zap, Sparkles, CheckCircle2 } from 'lucide-react';
import ps5ControllerImg from '../assets/images/ps5_dualsense_cinematic_1791901469417.jpg';
import { useI18n } from '../i18n';

interface HeroSectionProps {
  onPrimaryCta: () => void;
  onSecondaryCta: () => void;
}

// Authentic PlayStation Crystal Glyphs for ambient floating depth
const PsSymbols = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
    {/* Floating Triangle */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ 
        opacity: [0.3, 0.65, 0.3],
        y: [-5, 5, -5],
        rotate: [0, 8, 0]
      }}
      transition={{ 
        duration: 7, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="absolute top-[8%] left-[6%] w-7 h-7 sm:w-10 sm:h-10 text-primary/45 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <polygon points="12 3 22 21 2 21" />
      </svg>
    </motion.div>

    {/* Floating Circle */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: [0.25, 0.6, 0.25],
        y: [6, -6, 6],
        rotate: [0, -10, 0]
      }}
      transition={{ 
        duration: 8.5, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: 0.8
      }}
      className="absolute top-[14%] right-[4%] w-6 h-6 sm:w-9 sm:h-9 text-sky-400/45 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="12" cy="12" r="9" />
      </svg>
    </motion.div>

    {/* Floating Cross (X) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.25, 0.55, 0.25],
        y: [-6, 6, -6],
        rotate: [0, 15, 0]
      }}
      transition={{ 
        duration: 9, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: 1.5
      }}
      className="absolute bottom-[24%] left-[4%] w-6 h-6 sm:w-8 sm:h-8 text-primary/40 drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </motion.div>

    {/* Floating Square */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.2, 0.5, 0.2],
        y: [5, -5, 5],
        rotate: [0, -8, 0]
      }}
      transition={{ 
        duration: 7.8, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: 2.2
      }}
      className="absolute bottom-[18%] right-[8%] w-6 h-6 sm:w-8 sm:h-8 text-pink-500/40 drop-shadow-[0_0_12px_rgba(236,72,153,0.4)]"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect x="4" y="4" width="16" height="16" rx="2" />
      </svg>
    </motion.div>
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryCta,
  onSecondaryCta,
}) => {
  const { country, t } = useI18n();
  // Safe reduced motion check to prevent motion/react console warnings
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setShouldReduceMotion(media.matches);
      const listener = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroRafRef = useRef<number | null>(null);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  // Controller 3D Interactive Hover State & Refs
  const controllerCardRef = useRef<HTMLDivElement>(null);
  const controllerRafRef = useRef<number | null>(null);
  const [controllerImgLoaded, setControllerImgLoaded] = useState(true);
  const [isControllerHovered, setIsControllerHovered] = useState(false);
  const [supportsFinePointer, setSupportsFinePointer] = useState(true);

  // Check if current device supports fine hover pointer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      setSupportsFinePointer(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setSupportsFinePointer(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Coordinated Hero Parallax Move (updates CSS custom properties on heroRef)
  const handleHeroPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !supportsFinePointer || !heroRef.current || window.innerWidth < 1024) return;
    const heroEl = heroRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (heroRafRef.current !== null) {
      cancelAnimationFrame(heroRafRef.current);
    }

    heroRafRef.current = requestAnimationFrame(() => {
      const rect = heroEl.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Normalized coordinates [-1, 1] relative to center of the hero section
      const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));

      // Percentages for ambient studio light
      const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

      // 1. Background grid shifts inversely (-14px) for spatial depth
      heroEl.style.setProperty('--bg-shift-x', `${(-normX * 14).toFixed(1)}px`);
      heroEl.style.setProperty('--bg-shift-y', `${(-normY * 14).toFixed(1)}px`);

      // 2. Ambient studio lighting coordinates
      heroEl.style.setProperty('--hero-pointer-x', `${percentX.toFixed(1)}%`);
      heroEl.style.setProperty('--hero-pointer-y', `${percentY.toFixed(1)}%`);

      // 3. Middle layer: Floating PlayStation symbols parallax (+12px)
      heroEl.style.setProperty('--symbols-shift-x', `${(normX * 12).toFixed(1)}px`);
      heroEl.style.setProperty('--symbols-shift-y', `${(normY * 12).toFixed(1)}px`);

      // 4. Middle layer: Controller halo light (+10px)
      heroEl.style.setProperty('--halo-shift-x', `${(normX * 10).toFixed(1)}px`);
      heroEl.style.setProperty('--halo-shift-y', `${(normY * 10).toFixed(1)}px`);

      // 5. Content layer (text & CTA): Ultra-subtle grounding (max 2.8px)
      heroEl.style.setProperty('--content-shift-x', `${(normX * 2.8).toFixed(1)}px`);
      heroEl.style.setProperty('--content-shift-y', `${(normY * 2.8).toFixed(1)}px`);

      // 6. When the cursor is outside the controller card, give the controller a subtle ambient gaze
      if (!isControllerHovered && controllerCardRef.current) {
        const cardEl = controllerCardRef.current;
        cardEl.style.setProperty('--rot-x', `${(-normY * 2.2).toFixed(2)}deg`);
        cardEl.style.setProperty('--rot-y', `${(normX * 2.6).toFixed(2)}deg`);
        cardEl.style.setProperty('--shadow-x', `${(-normX * 6).toFixed(1)}px`);
        cardEl.style.setProperty('--shadow-y', `${(-normY * 6 + 18).toFixed(1)}px`);
        cardEl.style.setProperty('--card-scale', '1');
        cardEl.style.setProperty('--light-opacity', '0.25');
        cardEl.style.setProperty('--pointer-x', `${percentX.toFixed(1)}%`);
        cardEl.style.setProperty('--pointer-y', `${percentY.toFixed(1)}%`);
      }
    });
  }, [shouldReduceMotion, supportsFinePointer, isControllerHovered]);

  const handleHeroPointerEnter = useCallback(() => {
    if (shouldReduceMotion || !supportsFinePointer) return;
    setIsHeroHovered(true);
  }, [shouldReduceMotion, supportsFinePointer]);

  const handleHeroPointerLeave = useCallback(() => {
    setIsHeroHovered(false);
    if (!heroRef.current) return;

    if (heroRafRef.current !== null) {
      cancelAnimationFrame(heroRafRef.current);
      heroRafRef.current = null;
    }

    const heroEl = heroRef.current;
    heroEl.style.setProperty('--hero-pointer-x', '50%');
    heroEl.style.setProperty('--hero-pointer-y', '50%');
    heroEl.style.setProperty('--bg-shift-x', '0px');
    heroEl.style.setProperty('--bg-shift-y', '0px');
    heroEl.style.setProperty('--symbols-shift-x', '0px');
    heroEl.style.setProperty('--symbols-shift-y', '0px');
    heroEl.style.setProperty('--halo-shift-x', '0px');
    heroEl.style.setProperty('--halo-shift-y', '0px');
    heroEl.style.setProperty('--content-shift-x', '0px');
    heroEl.style.setProperty('--content-shift-y', '0px');

    if (!isControllerHovered && controllerCardRef.current) {
      const cardEl = controllerCardRef.current;
      cardEl.style.setProperty('--rot-x', '0deg');
      cardEl.style.setProperty('--rot-y', '0deg');
      cardEl.style.setProperty('--shadow-x', '0px');
      cardEl.style.setProperty('--shadow-y', '18px');
      cardEl.style.setProperty('--card-scale', '1');
      cardEl.style.setProperty('--light-opacity', '0');
    }
  }, [isControllerHovered]);

  // Focused 3D Tilt when hovering directly over the Controller Card
  const handleControllerPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !supportsFinePointer || !controllerCardRef.current) return;
    e.stopPropagation();

    const el = controllerCardRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (controllerRafRef.current !== null) {
      cancelAnimationFrame(controllerRafRef.current);
    }

    controllerRafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const normX = Math.max(-1, Math.min(1, (x / rect.width - 0.5) * 2));
      const normY = Math.max(-1, Math.min(1, (y / rect.height - 0.5) * 2));

      // Controlled 3D rotation limits (horizontal: ±4.8 deg, vertical: ±3.8 deg)
      const rotateY = normX * 4.8;
      const rotateX = -normY * 3.8;

      const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));

      const shadowX = -normX * 14;
      const shadowY = -normY * 14 + 18;

      el.style.setProperty('--rot-x', `${rotateX.toFixed(2)}deg`);
      el.style.setProperty('--rot-y', `${rotateY.toFixed(2)}deg`);
      el.style.setProperty('--pointer-x', `${percentX.toFixed(1)}%`);
      el.style.setProperty('--pointer-y', `${percentY.toFixed(1)}%`);
      el.style.setProperty('--shadow-x', `${shadowX.toFixed(1)}px`);
      el.style.setProperty('--shadow-y', `${shadowY.toFixed(1)}px`);
      el.style.setProperty('--light-opacity', '1');
      el.style.setProperty('--card-scale', '1.02');
    });
  }, [shouldReduceMotion, supportsFinePointer]);

  const handleControllerPointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !supportsFinePointer) return;
    e.stopPropagation();
    setIsControllerHovered(true);
  }, [shouldReduceMotion, supportsFinePointer]);

  const handleControllerPointerLeave = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsControllerHovered(false);
    if (!controllerCardRef.current) return;

    if (controllerRafRef.current !== null) {
      cancelAnimationFrame(controllerRafRef.current);
      controllerRafRef.current = null;
    }

    const el = controllerCardRef.current;
    // Return smoothly to ambient position
    el.style.setProperty('--rot-x', '0deg');
    el.style.setProperty('--rot-y', '0deg');
    el.style.setProperty('--pointer-x', '50%');
    el.style.setProperty('--pointer-y', '50%');
    el.style.setProperty('--shadow-x', '0px');
    el.style.setProperty('--shadow-y', '18px');
    el.style.setProperty('--light-opacity', '0');
    el.style.setProperty('--card-scale', '1');
  }, []);

  useEffect(() => {
    return () => {
      if (heroRafRef.current !== null) {
        cancelAnimationFrame(heroRafRef.current);
      }
      if (controllerRafRef.current !== null) {
        cancelAnimationFrame(controllerRafRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      onPointerMove={handleHeroPointerMove}
      onPointerEnter={handleHeroPointerEnter}
      onPointerLeave={handleHeroPointerLeave}
      className="hero-scene-container relative min-h-0 lg:min-h-[100dvh] pt-24 sm:pt-28 lg:pt-32 pb-10 xs:pb-12 sm:pb-16 lg:pb-20 flex items-center justify-center overflow-hidden bg-[#050508]"
      style={{
        background: `radial-gradient(1100px circle at var(--hero-pointer-x, 50%) var(--hero-pointer-y, 50%), rgba(168, 85, 247, 0.09) 0%, rgba(56, 189, 248, 0.03) 32%, rgba(11, 11, 20, 0.4) 55%, #050508 80%)`,
        transition: isHeroHovered ? 'none' : 'background 0.6s ease-out'
      }}
      aria-label="IDEA MAKERS Hero Section"
    >
      {/* Studio Background Ambience & Volumetric Layers */}
      <div 
        className="hero-parallax-bg absolute inset-0 tech-grid opacity-15 pointer-events-none" 
        style={{
          transition: isHeroHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
      
      {/* Top subtle rim vignette */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050508] via-transparent to-transparent pointer-events-none z-10" />
      
      {/* Studio Lighting Halos */}
      <div 
        className="purple-glow w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-primary/20 top-[-5%] left-[5%] pointer-events-none" 
        style={{ filter: 'blur(130px)' }}
      />
      <div 
        className="purple-glow w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] bg-sky-500/12 top-[20%] left-[20%] pointer-events-none" 
        style={{ filter: 'blur(120px)' }}
      />
      <div 
        className="purple-glow w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] bg-purple-700/18 bottom-[-10%] right-[0%] pointer-events-none" 
        style={{ filter: 'blur(150px)' }}
      />

      <div className="container relative z-20 mx-auto px-3.5 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* ========================================================
              LEFT COLUMN (Image moved to top on mobile)
              ======================================================== */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center z-10 order-1 w-full mb-6 lg:mb-0">
            
            {/* Ambient Floating PlayStation Symbols (Coordinated Middle-Layer Parallax) */}
            <div 
              className="hero-parallax-symbols absolute inset-0 pointer-events-none"
              style={{
                transition: isHeroHovered ? 'transform 0.16s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <PsSymbols />
            </div>

            {/* Tasteful Purple Energy Halo directly behind the controller (Coordinated Parallax) */}
            <div 
              className="hero-parallax-halo absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transition: isHeroHovered ? 'transform 0.16s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div 
                className="w-[200px] xs:w-[240px] sm:w-[320px] md:w-[380px] lg:w-[420px] h-[200px] xs:h-[240px] sm:h-[320px] md:h-[380px] lg:h-[420px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.42) 0%, rgba(139, 92, 246, 0.2) 40%, rgba(56, 189, 248, 0.06) 60%, transparent 72%)',
                  filter: 'blur(35px)',
                  transform: 'translateZ(0)'
                }}
              />

              {/* Subtle Cyan Edge Lighting Highlight */}
              <div 
                className="absolute -top-3 -right-3 w-[140px] sm:w-[180px] h-[140px] sm:h-[180px] rounded-full pointer-events-none opacity-35"
                style={{
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />
            </div>

            {/* ========================================================
                CINEMATIC ENTRANCE WRAPPER (600-800ms)
                Separate from pointer tilt transforms to prevent conflict
                ======================================================== */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94, y: 16 }}
              animate={
                shouldReduceMotion
                  ? { opacity: 1, scale: 1, y: 0 }
                  : {
                      opacity: 1,
                      scale: 1,
                      y: isControllerHovered ? 0 : [-3, 3, -3],
                    }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0.4 }
                  : {
                      opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                      scale: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                      y: isControllerHovered
                        ? { duration: 0.3, ease: 'easeOut' }
                        : { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
              className="relative w-full max-w-[220px] xs:max-w-[260px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[460px] flex items-center justify-center p-1"
              style={{ perspective: 1100 }}
            >
              {/* ========================================================
                  INTERACTIVE 3D CONTROLLER CARD (Pointer-responsive tilt)
                  ======================================================== */}
              <div
                ref={controllerCardRef}
                onPointerMove={handleControllerPointerMove}
                onPointerEnter={handleControllerPointerEnter}
                onPointerLeave={handleControllerPointerLeave}
                className="hero-controller-3d-card relative w-full aspect-square flex items-center justify-center select-none rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: shouldReduceMotion
                    ? 'none'
                    : 'scale(var(--card-scale, 1)) rotateX(var(--rot-x, 0deg)) rotateY(var(--rot-y, 0deg))',
                  transition: isControllerHovered
                    ? 'transform 0.08s ease-out, box-shadow 0.15s ease-out'
                    : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease-out',
                  boxShadow: `
                    var(--shadow-x, 0px) var(--shadow-y, 18px) 40px rgba(0, 0, 0, 0.85),
                    0 0 35px rgba(168, 85, 247, ${isControllerHovered ? '0.38' : '0.22'}),
                    0 0 1px 1px rgba(255, 255, 255, 0.1)
                  `,
                  willChange: 'transform, box-shadow',
                  WebkitMaskImage: 'radial-gradient(ellipse 94% 94% at 50% 50%, black 82%, transparent 100%)',
                  maskImage: 'radial-gradient(ellipse 94% 94% at 50% 50%, black 82%, transparent 100%)',
                }}
              >
                {/* Image Frame Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {controllerImgLoaded ? (
                    <img
                      src={ps5ControllerImg}
                      alt="PlayStation 5 DualSense Wireless Controller — IDEA MAKERS Gaming Lounge System"
                      className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.92)] drop-shadow-[0_0_25px_rgba(168,85,247,0.32)] transition-transform duration-300"
                      loading="eager"
                      fetchPriority="high"
                      onError={() => setControllerImgLoaded(false)}
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full aspect-square rounded-2xl sm:rounded-3xl bg-[#0c0c16] border border-primary/30 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                      <Gamepad2 className="w-16 h-16 text-primary animate-pulse mb-3" />
                      <span className="text-sm sm:text-base font-bold text-white">PlayStation 5 DualSense</span>
                      <span className="text-xs text-primary/80 mt-1">IDEA MAKERS Management Engine</span>
                    </div>
                  )}

                  {/* Dynamic Studio Lighting Highlight (Pointer-following) */}
                  {!shouldReduceMotion && (
                    <>
                      {/* Primary Soft Violet Moving Studio Light */}
                      <div
                        className="hero-controller-lighting absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none mix-blend-screen transition-opacity duration-300"
                        style={{
                          opacity: 'var(--light-opacity, 0)',
                          background: `
                            radial-gradient(
                              520px circle at var(--pointer-x, 50%) var(--pointer-y, 50%),
                              rgba(216, 180, 254, 0.22) 0%,
                              rgba(168, 85, 247, 0.14) 28%,
                              rgba(56, 189, 248, 0.05) 54%,
                              transparent 75%
                            )
                          `,
                        }}
                      />

                      {/* Opposing Edge Cyan Rim Reflection */}
                      <div
                        className="hero-controller-rim absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none mix-blend-color-dodge transition-opacity duration-300"
                        style={{
                          opacity: isControllerHovered ? 0.8 : 0,
                          background: `
                            radial-gradient(
                              380px circle at calc(100% - var(--pointer-x, 50%)) calc(100% - var(--pointer-y, 50%)),
                              rgba(56, 189, 248, 0.12) 0%,
                              rgba(14, 165, 233, 0.04) 45%,
                              transparent 70%
                            )
                          `,
                        }}
                      />
                    </>
                  )}

                  {/* Resting Micro Studio Glass Specular Sheen */}
                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-transparent via-white/[0.025] to-sky-400/[0.04] pointer-events-none mix-blend-screen"
                  />

                  {/* Subtle Ambient Floor Shadow */}
                  <div
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-[72%] h-5 bg-black/95 rounded-[100%] blur-md pointer-events-none transition-transform duration-300"
                    style={{
                      transform: `translateX(-50%) scaleY(0.4) translateX(calc(var(--shadow-x, 0px) * -0.3))`,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Repositioned Status Badges */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 select-none"
            >
              <div className="glass border border-primary/25 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] sm:text-xs font-bold text-white tracking-wide">
                  {t.hero.badgePS}
                </span>
              </div>

              <div className="glass border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300">
                  {t.hero.badgeTime}
                </span>
              </div>
            </motion.div>

          </div>

          {/* ========================================================
              RIGHT COLUMN (in Arabic RTL): Headline, Copy & CTAs
              ======================================================== */}
          <div 
            className="hero-parallax-content lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-right z-20 order-2"
            style={{
              transition: isHeroHovered ? 'transform 0.25s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            
            {/* 1. Regional Tag & Brand Pill */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-4 sm:mt-5 lg:mt-6 mb-2.5 sm:mb-3.5"
            >
              <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-primary/25 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)] text-[11px] xs:text-xs font-bold text-primary">
                <Gamepad2 className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                <span className="tracking-wide">{t.hero.tag || `${t.common.brandName} | ${country.name}`}</span>
              </div>
            </motion.div>

            {/* 2. Main Arabic Headline - Dynamically adapted to dialect */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black leading-[1.22] tracking-tight text-white mb-3 xs:mb-4 sm:mb-5"
              style={{ textWrap: 'balance' as any }}
            >
              <span>{t.hero.titlePrefix}</span>{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-l from-primary via-purple-300 to-white drop-shadow-[0_2px_12px_rgba(168,85,247,0.4)]">
                {t.hero.titleHighlight}
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-80" />
              </span>
            </motion.h1>

            {/* 3. Supporting Description */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
              className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal mb-5 xs:mb-6 sm:mb-8"
              style={{ textWrap: 'pretty' as any }}
            >
              {t.hero.description}
            </motion.p>

            {/* 4. Conversion CTA Group - Primary & Secondary */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 xs:gap-3 sm:gap-4 w-full sm:w-auto mb-5 xs:mb-6 sm:mb-8"
            >
              {/* Primary Free-Trial CTA */}
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                
                <button
                  onClick={onPrimaryCta}
                  className="relative w-full sm:w-auto min-h-[46px] xs:min-h-[48px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-primary via-purple-600 to-primary-dark hover:from-primary-dark hover:to-purple-700 text-white font-black text-sm xs:text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(168,85,247,0.35)] transition-all duration-200 cursor-pointer active:scale-[0.98] border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-white/90 shrink-0" />
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5 text-white group-hover:-translate-x-1 transition-transform shrink-0" />
                </button>
              </div>

              {/* Secondary CTA */}
              <button
                onClick={onSecondaryCta}
                className="w-full sm:w-auto min-h-[46px] xs:min-h-[48px] px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white hover:text-purple-200 font-bold text-xs xs:text-sm sm:text-base flex items-center justify-center gap-2 border border-white/10 hover:border-primary/40 backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Play className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-primary fill-primary/30 shrink-0" />
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </motion.div>

            {/* 5. Trust Markers - Clean, unboxed metadata */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3.5 sm:gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-400 font-medium pt-2.5 sm:pt-3 border-t border-white/[0.06] w-full"
            >
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                <span>{t.hero.trust1}</span>
              </div>
              <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                <span>{t.hero.trust2}</span>
              </div>
              <span aria-hidden="true" className="text-slate-600 hidden md:inline">·</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                <span>{t.hero.trust3}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Cinematic bottom transition gradient into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;
