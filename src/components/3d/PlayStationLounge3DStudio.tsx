import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  createPlayStationController, 
  createHolographicSymbols, 
  createAtmosphericSparks, 
  COLORS, 
  isWebGLAvailable 
} from './ThreeSceneUtils';
import { 
  Monitor, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Coffee, 
  Receipt, 
  ChevronRight, 
  ArrowLeft, 
  Check, 
  Gamepad2,
  Lock,
  Layers
} from 'lucide-react';

interface Props {
  onStartTrial?: () => void;
  hourlyRate?: number;
  currency?: string;
}

export const PlayStationLounge3DStudio: React.FC<Props> = ({ 
  onStartTrial, 
  hourlyRate = 35, 
  currency = 'EGP' 
}) => {
  const [activeTab, setActiveTab] = useState<'sessions' | 'pos' | 'security'>('sessions');
  const [simulatedDevice, setSimulatedDevice] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [simulatedMinutes, setSimulatedMinutes] = useState(45);
  const [simulatedDrinks, setSimulatedDrinks] = useState(2);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Scene state
  const studioRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    controller?: ReturnType<typeof createPlayStationController>;
    symbols?: ReturnType<typeof createHolographicSymbols>;
    sparks?: ReturnType<typeof createAtmosphericSparks>;
    mainGroup?: THREE.Group;
    reqId?: number;
    isVisible: boolean;
  }>({
    isVisible: true,
  });

  // Calculate simulated cost
  const timeCost = Math.round((simulatedMinutes / 60) * hourlyRate);
  const drinksCost = simulatedDrinks * 15;
  const totalCost = timeCost + drinksCost;

  // Setup Three.js studio
  useEffect(() => {
    if (!isWebGLAvailable()) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060c, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 5.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambient = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(3, 4, 4);
    scene.add(key);

    const purpleRim = new THREE.DirectionalLight(COLORS.neonPurple, 3.5);
    purpleRim.position.set(-3, 2, -3);
    scene.add(purpleRim);

    const blueFill = new THREE.PointLight(COLORS.neonCyan, 2.2, 10);
    blueFill.position.set(2, -2, 2);
    scene.add(blueFill);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    studioRef.current.mainGroup = mainGroup;

    // Controller
    const controller = createPlayStationController({
      lightbarColor: isPlaying ? COLORS.neonEmerald : COLORS.neonRed,
    });
    controller.group.scale.set(0.95, 0.95, 0.95);
    mainGroup.add(controller.group);
    studioRef.current.controller = controller;

    // Symbols
    const symbols = createHolographicSymbols();
    symbols.group.scale.set(0.85, 0.85, 0.85);
    symbols.group.position.z = -0.5;
    mainGroup.add(symbols.group);
    studioRef.current.symbols = symbols;

    // Sparks
    const sparks = createAtmosphericSparks(35);
    scene.add(sparks.particles);
    studioRef.current.sparks = sparks;

    studioRef.current.renderer = renderer;
    studioRef.current.scene = scene;
    studioRef.current.camera = camera;

    let clock = new THREE.Clock();

    const animate = () => {
      studioRef.current.reqId = requestAnimationFrame(animate);
      if (!studioRef.current.isVisible) return;

      const elapsed = clock.getElapsedTime();

      controller.update(elapsed);
      symbols.update(elapsed);
      sparks.update(elapsed);

      // Gentle interactive rotation based on active tab
      if (activeTab === 'sessions') {
        mainGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.25 - 0.1;
        mainGroup.rotation.x = 0.45;
      } else if (activeTab === 'pos') {
        mainGroup.rotation.y = 0.4 + Math.sin(elapsed * 0.4) * 0.15;
        mainGroup.rotation.x = 0.55;
      } else {
        mainGroup.rotation.y = -0.5 + Math.cos(elapsed * 0.4) * 0.15;
        mainGroup.rotation.x = 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        studioRef.current.isVisible = entry.isIntersecting;
      }
    });
    intersectionObserver.observe(container);

    return () => {
      if (studioRef.current.reqId) cancelAnimationFrame(studioRef.current.reqId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.dispose();
      scene.clear();
    };
  }, [activeTab, isPlaying]);

  // Update lightbar color on play status change
  const handleTogglePlay = (playing: boolean) => {
    setIsPlaying(playing);
    const controller = studioRef.current.controller;
    if (controller) {
      controller.setLightbarColor(playing ? COLORS.neonEmerald : COLORS.neonRed);
    }
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#06060c]">
      {/* Background Ambience */}
      <div className="absolute inset-0 tech-grid opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>محاكاة حيّة ثلاثية الأبعاد (Live 3D Studio)</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            شاهد كيف يحمي نظام IDEA Makers كل ثانية وكل قرش في صالتك
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            جرّب بنفسك التفاعل مع محطة اللعب الذكية، واكتشف كيف يربط النظام بين اليد، الشاشة، الكاشير، والبوفيه في منظومة واحدة متكاملة.
          </p>
        </div>

        {/* Studio Interactive Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-[#090912]/90 border border-white/10 rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Left/Middle Column: 3D Interactive Viewport (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Module Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/5 rounded-2xl">
              {[
                { id: 'sessions', label: '🎮 عداد الوقت والجلسة', icon: <Clock className="w-3.5 h-3.5" /> },
                { id: 'pos', label: '🧾 الكاشير والبوفيه', icon: <Receipt className="w-3.5 h-3.5" /> },
                { id: 'security', label: '🛡️ الحماية ومنع الهدر', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[1] || tab.label}</span>
                </button>
              ))}
            </div>

            {/* 3D Canvas Box */}
            <div 
              ref={containerRef}
              className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] rounded-2xl bg-gradient-to-b from-[#0a0a14] to-[#040408] border border-white/5 overflow-hidden flex items-center justify-center"
            >
              <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

              {/* Floating Real-time HUD on Canvas */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 backdrop-blur-md ${
                  isPlaying 
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' 
                    : 'bg-red-500/15 border-red-500/40 text-red-300'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                  <span>{isPlaying ? 'الجلسة نشطة (Playing)' : 'الجلسة منتهية (Ended)'}</span>
                </span>
              </div>

              {/* Quick Controller Light Switcher */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-1.5">
                <button
                  onClick={() => handleTogglePlay(true)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    isPlaying ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40' : 'text-gray-400'
                  }`}
                >
                  🟢 تشغيل
                </button>
                <button
                  onClick={() => handleTogglePlay(false)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    !isPlaying ? 'bg-red-500/30 text-red-300 border border-red-500/40' : 'text-gray-400'
                  }`}
                >
                  🔴 إنهاء الجلسة
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 text-center font-mono">
              💡 يمكنك لمس وتدوير المجسم ثلاثي الأبعاد لاكتشاف زوايا يد التحكم وتفاصيل العتاد.
            </p>
          </div>

          {/* Right Column: Live Data & Feature Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Content Depending on Active Tab */}
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white mb-1">محاكاة جهاز بلايستيشن #{simulatedDevice}</h3>
                  <p className="text-xs text-gray-400">حساب فوري للوقت بالثانية بدون أي فرصة للتسريب</p>
                </div>

                {/* Device Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-bold">اختر الشاشة:</span>
                  {[1, 2, 3, 4].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSimulatedDevice(d)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        simulatedDevice === d
                          ? 'bg-primary text-white border border-primary'
                          : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/20'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Live Duration Slider */}
                <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-300">مدة اللعب الحالية:</span>
                    <span className="text-primary font-mono">{simulatedMinutes} دقيقة</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    value={simulatedMinutes}
                    onChange={(e) => setSimulatedMinutes(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                    <span>15 د</span>
                    <span>ساعة (60 د)</span>
                    <span>3 ساعات</span>
                  </div>
                </div>

                {/* Feature checklist */}
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تسجيل دقيق لوقت البدء والانتهاء وطباعة فاتورة رسمية</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>نظام أوفلاين 100% يعمل حتى لو انقطع الإنترنت تماماً</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pos' && (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white mb-1">كاشير البوفيه والمشروبات</h3>
                  <p className="text-xs text-gray-400">إضافة الطلبات على طاولة العميل بضغطة زر واحدة</p>
                </div>

                {/* Drinks Counter */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">مشروبات ومأكولات الصالة</p>
                      <p className="text-[10px] text-gray-400 font-mono">15 {currency} للطلب الواحد</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSimulatedDrinks(Math.max(0, simulatedDrinks - 1))}
                      className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold font-mono text-sm">{simulatedDrinks}</span>
                    <button
                      onClick={() => setSimulatedDrinks(simulatedDrinks + 1)}
                      className="w-7 h-7 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>خصم المشروبات آلياً من المخزن وجرد الوردية بدقة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>منع تسريب المشروبات أو تقديم طلبات مجانية للأصدقاء</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white mb-1">حصن الأمان ومنع التلاعب</h3>
                  <p className="text-xs text-gray-400">حماية صاحب الصالة من الثغرات المالية الشائعة</p>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-primary/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>تقارير مفصلة للمالك عبر الهاتف / الإيميل</span>
                  </div>
                  <p className="text-gray-300 text-[11px] leading-relaxed">
                    يتم إغلاق الوردية بمطابقة الدرج والخزينة مع إجمالي الدقائق المسجلة، مما ينهي تماماً أي فارق في الإيراد اليومي.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تشفير كامل لقواعد البيانات لمنع التعديل اليدوي</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>سجل تاريخي بكل عمليات الحذف أو الإلغاء المشبوهة</span>
                  </div>
                </div>
              </div>
            )}

            {/* Live Invoice Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 shadow-lg">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                <span>إجمالي الفاتورة التقديري:</span>
                <span className="font-mono text-[10px] text-gray-500">جهاز #{simulatedDevice}</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-white font-mono">
                  {totalCost} <span className="text-sm font-bold text-primary">{currency}</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-bold">
                  (وقت: {timeCost} + بوفيه: {drinksCost})
                </span>
              </div>

              {/* CTA Button */}
              <button
                onClick={onStartTrial}
                className="mt-4 w-full py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-black text-xs sm:text-sm shadow-xl shadow-primary/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>احصل على نسختك التجريبية مجاناً (3 أيام)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayStationLounge3DStudio;
