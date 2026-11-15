import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  createPlayStationController, 
  createHolographicSymbols, 
  createNeonPortal, 
  createAtmosphericSparks, 
  isWebGLAvailable, 
  COLORS 
} from './ThreeSceneUtils';
import fallbackImage from '../../assets/images/ps5_lounge_atmosphere_1791828455267.jpg';
import { ShieldCheck, Zap, Lock, Sparkles, RotateCw, Eye, CheckCircle2 } from 'lucide-react';

interface Hero3DSceneProps {
  className?: string;
  onExploreFeatures?: () => void;
}

export type SessionLightState = 'active' | 'multiplayer' | 'ended' | 'vip';

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({ className = '', onExploreFeatures }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [webglSupported, setWebglSupported] = useState(true);
  const [activeSessionState, setActiveSessionState] = useState<SessionLightState>('active');
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isSceneReady, setIsSceneReady] = useState(false);

  // References for animation loop and interaction
  const sceneStateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    controller?: ReturnType<typeof createPlayStationController>;
    symbols?: ReturnType<typeof createHolographicSymbols>;
    portal?: ReturnType<typeof createNeonPortal>;
    sparks?: ReturnType<typeof createAtmosphericSparks>;
    mainGroup?: THREE.Group;
    targetRotation: { x: number; y: number };
    currentRotation: { x: number; y: number };
    mousePos: { x: number; y: number };
    isDragging: boolean;
    dragStart: { x: number; y: number };
    reqId?: number;
    isVisible: boolean;
  }>({
    targetRotation: { x: 0.35, y: -0.15 },
    currentRotation: { x: 0.35, y: -0.15 },
    mousePos: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    isVisible: true,
  });

  // Hotspots info
  const hotspots = [
    {
      id: 1,
      title: 'إدارة الجلسات الذكية',
      badge: 'Smart Session Mgmt',
      desc: 'حساب الوقت بالثانية وتنبيه الموظف فور انتهاء الوقت لضمان التحصيل.',
      icon: <Lock className="w-3.5 h-3.5 text-primary" />,
      color: '#a855f7',
      position: { top: '38%', right: '48%' },
    },
    {
      id: 2,
      title: 'إدارة وتتبع الجلسات',
      badge: 'Session Tracking',
      desc: 'متابعة دقيقة لأوقات الجلسات من داخل السيستم مع منع التلاعب بساعة النظام لضمان دقة الحسابات.',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      color: '#10b981',
      position: { top: '48%', right: '28%' },
    },
    {
      id: 3,
      title: 'ربط مبيعات البوفيه',
      badge: 'Lounge POS Sync',
      desc: 'إضافة المشروبات والمأكولات فوراً على فاتورة الجلسة بضغطة زر وطباعة إيصال ضريبي فوري.',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      color: '#f59e0b',
      position: { top: '48%', right: '70%' },
    },
  ];

  // Lightbar state mapping
  const setLightbarByState = useCallback((state: SessionLightState) => {
    setActiveSessionState(state);
    const controller = sceneStateRef.current.controller;
    if (!controller) return;

    switch (state) {
      case 'active':
        controller.setLightbarColor(COLORS.neonEmerald);
        break;
      case 'multiplayer':
        controller.setLightbarColor(COLORS.neonPurple);
        break;
      case 'ended':
        controller.setLightbarColor(COLORS.neonRed);
        break;
      case 'vip':
        controller.setLightbarColor(COLORS.neonCyan);
        break;
    }
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglSupported(false);
      return;
    }

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 650;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.045);
    sceneStateRef.current.scene = scene;

    // 2. Camera setup
    const isMobile = width < 768;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 8.2 : 6.8);
    sceneStateRef.current.camera = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    sceneStateRef.current.renderer = renderer;

    // 4. Lighting Rig
    // Ambient fill
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    // Key Light (warm-tinted white highlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3.5, 4.5, 5.0);
    scene.add(keyLight);

    // Rim Light (electric purple from behind for cinematic edge separation)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 4.0);
    rimLight.position.set(-3.0, 3.0, -3.5);
    scene.add(rimLight);

    // Cyan Fill Light (from lower right)
    const fillLight = new THREE.PointLight(0x06b6d4, 2.5, 12);
    fillLight.position.set(4.0, -2.0, 2.5);
    scene.add(fillLight);

    // 5. Main Hero Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    sceneStateRef.current.mainGroup = mainGroup;

    // Add DualSense Controller
    const controller = createPlayStationController({
      lightbarColor: COLORS.neonEmerald,
    });
    // Adjust scale for responsive framing
    const baseScale = isMobile ? 0.95 : 1.18;
    controller.group.scale.set(baseScale, baseScale, baseScale);
    mainGroup.add(controller.group);
    sceneStateRef.current.controller = controller;

    // Add Holographic PlayStation Symbols (△ ○ ✕ □)
    const symbols = createHolographicSymbols();
    symbols.group.scale.set(baseScale, baseScale, baseScale);
    mainGroup.add(symbols.group);
    sceneStateRef.current.symbols = symbols;

    // Add Neon Portal Frame
    const portal = createNeonPortal();
    portal.group.scale.set(baseScale, baseScale, baseScale);
    mainGroup.add(portal.group);
    sceneStateRef.current.portal = portal;

    // Add Atmospheric Sparks
    const sparks = createAtmosphericSparks(isMobile ? 40 : 80);
    scene.add(sparks.particles);
    sceneStateRef.current.sparks = sparks;

    setIsSceneReady(true);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      sceneStateRef.current.reqId = requestAnimationFrame(animate);

      if (!sceneStateRef.current.isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Controller and symbols updates
      controller.update(elapsedTime);
      symbols.update(elapsedTime);
      portal.update(elapsedTime);
      sparks.update(elapsedTime);

      // Smooth interpolation for mouse parallax or drag
      const s = sceneStateRef.current;
      s.currentRotation.x += (s.targetRotation.x - s.currentRotation.x) * 0.06;
      s.currentRotation.y += (s.targetRotation.y - s.currentRotation.y) * 0.06;

      mainGroup.rotation.x = s.currentRotation.x;
      mainGroup.rotation.y = s.currentRotation.y;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          const mobile = w < 768;
          camera.position.z = mobile ? 8.2 : 6.8;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(container);

    // 8. Visibility / Tab switch optimization
    const handleVisibility = () => {
      sceneStateRef.current.isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 9. Intersection Observer (pause rendering when scrolled down)
    const intersectionObserver = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        sceneStateRef.current.isVisible = entry.isIntersecting;
      }
    }, { threshold: 0.1 });
    intersectionObserver.observe(container);

    // Cleanup on unmount
    return () => {
      if (sceneStateRef.current.reqId) {
        cancelAnimationFrame(sceneStateRef.current.reqId);
      }
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);

      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Pointer move parallax handler
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

    const s = sceneStateRef.current;
    if (s.isDragging) {
      const deltaX = (e.clientX - s.dragStart.x) * 0.008;
      const deltaY = (e.clientY - s.dragStart.y) * 0.008;
      s.targetRotation.y += deltaX;
      s.targetRotation.x -= deltaY;
      s.dragStart = { x: e.clientX, y: e.clientY };
    } else {
      // Gentle parallax follow
      s.targetRotation.y = -0.15 + x * 0.45;
      s.targetRotation.x = 0.35 - y * 0.35;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    sceneStateRef.current.isDragging = true;
    sceneStateRef.current.dragStart = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    sceneStateRef.current.isDragging = false;
  };

  const resetCamera = () => {
    sceneStateRef.current.targetRotation = { x: 0.35, y: -0.15 };
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[460px] xs:h-[500px] sm:h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden select-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Three.js Canvas */}
      {webglSupported ? (
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        />
      ) : (
        /* Non-WebGL High-Fidelity Fallback */
        <div className="absolute inset-0 z-0">
          <img 
            src={fallbackImage} 
            alt="PlayStation VIP Lounge 3D Atmosphere" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/80" />
        </div>
      )}

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508]/70 z-10" />
      <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#050508]/20 to-[#050508]/90 z-10" />

      {/* Interactive 3D HUD Controls Bar */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-2.5 sm:px-4 pointer-events-auto">
        <div className="bg-[#09090f]/85 backdrop-blur-xl border border-white/10 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/80 flex flex-col gap-2.5">
          
          {/* Top Bar: Mode Switcher & Lightbar Session Status */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-gray-300">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>محاكاة إضاءة اليد (LED Status):</span>
            </div>

            {/* Session States Buttons */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {[
                { id: 'active', label: '🟢 نشطة', color: 'hover:border-emerald-500/50 text-emerald-400' },
                { id: 'multiplayer', label: '🟣 زوجي', color: 'hover:border-purple-500/50 text-purple-400' },
                { id: 'ended', label: '🔴 انتهى الوقت', color: 'hover:border-red-500/50 text-red-400' },
                { id: 'vip', label: '🔵 VIP', color: 'hover:border-cyan-500/50 text-cyan-400' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbarByState(btn.id as SessionLightState);
                  }}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                    activeSessionState === btn.id
                      ? 'bg-white/10 border-white/30 text-white shadow-sm'
                      : 'bg-transparent border-white/5 text-gray-400 ' + btn.color
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Reset Camera Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetCamera();
              }}
              title="إعادة ضبط زاوية الكاميرا"
              className="p-1.5 rounded-lg border border-white/10 hover:border-primary/40 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Status Explanation Pill */}
          <div className="text-[11px] text-gray-400 flex items-center justify-between border-t border-white/5 pt-2 px-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              {activeSessionState === 'active' && 'جلسة لعب قيد التشغيل — العداد يحسب الوقت بالثانية.'}
              {activeSessionState === 'multiplayer' && 'لعب جماعي / أجهزة متعددة — حساب مبيعات وتوقيت مضاعف.'}
              {activeSessionState === 'ended' && 'انتهى الوقت — يُرجى إبلاغ العميل وإغلاق الجلسة فوراً.'}
              {activeSessionState === 'vip' && 'غرفة VIP مع تسعيرة خاصة وطلبات مشروبات حصرية.'}
            </span>
            <span className="hidden sm:inline text-[10px] text-gray-500 font-mono">اسحب بالماوس للتدوير 360°</span>
          </div>
        </div>
      </div>

      {/* Floating 3D Hotspot Badges on Desktop */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
        {hotspots.map((h) => (
          <div
            key={h.id}
            style={h.position}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <div className="relative group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot === h.id ? null : h.id);
                }}
                className="w-7 h-7 rounded-full bg-[#0a0a10]/90 border border-primary/50 text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-transform cursor-pointer"
              >
                {h.icon}
              </button>

              {/* Tooltip Card */}
              <div className={`absolute top-9 right-0 w-64 bg-[#0d0d16]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl text-right transition-all ${
                activeHotspot === h.id ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{h.title}</span>
                  <span className="text-[10px] font-mono text-primary font-bold px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">{h.badge}</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed font-light">{h.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Spatial Helper on Top Right */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-gray-400 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-primary animate-pulse" />
          <span>Interactive 3D DualSense Studio</span>
        </span>
      </div>
    </div>
  );
};

export default Hero3DScene;
