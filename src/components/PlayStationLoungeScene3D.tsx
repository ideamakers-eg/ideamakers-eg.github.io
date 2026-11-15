import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface PlayStationLoungeScene3DProps {
  className?: string;
  onInteractiveClick?: (targetName: string) => void;
}

export const PlayStationLoungeScene3D: React.FC<PlayStationLoungeScene3DProps> = ({
  className = '',
  onInteractiveClick
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeStationRef = useRef<number>(1);
  const targetStationRotationY = useRef<number>(0);
  const [activeStation, setActiveStation] = useState<number>(1);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);

  // Update target rotation when activeStation changes without destroying the scene
  const handleStationChange = (id: number) => {
    setActiveStation(id);
    activeStationRef.current = id;
    if (id === 1) targetStationRotationY.current = 0;
    else if (id === 2) targetStationRotationY.current = -0.45;
    else if (id === 3) targetStationRotationY.current = 0.45;

    if (onInteractiveClick) {
      onInteractiveClick(`Station #${id}`);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number = 0;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL not supported or context error:', e);
      setIsWebGLSupported(false);
      return;
    }

    if (!renderer) {
      setIsWebGLSupported(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06060c, 0.045);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 2.2, 7.5);
    camera.lookAt(0, 0.2, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x181028, 1.8);
    scene.add(ambientLight);

    // Hero Purple Spotlight (Signature Brand Violet)
    const purpleSpot = new THREE.SpotLight(0xa855f7, 8, 20, Math.PI / 4, 0.5, 1.2);
    purpleSpot.position.set(0, 6, 4);
    purpleSpot.target.position.set(0, 0, 0);
    scene.add(purpleSpot);
    scene.add(purpleSpot.target);

    // Cyan Neon Accent Light
    const cyanPoint = new THREE.PointLight(0x06b6d4, 3.5, 12, 1.5);
    cyanPoint.position.set(-3, 1.5, 1.5);
    scene.add(cyanPoint);

    // Magenta Warm Rim Light
    const magentaPoint = new THREE.PointLight(0xd946ef, 3, 10, 1.5);
    magentaPoint.position.set(3.5, 1.8, 1);
    scene.add(magentaPoint);

    // Floor Grid with subtle reflective look
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x07070e,
      roughness: 0.2,
      metalness: 0.8
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.2;
    scene.add(floor);

    // Decorative Neon Floor Ring
    const ringGeo = new THREE.RingGeometry(2.8, 2.9, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.19;
    scene.add(ring);

    // Main Lounge Group
    const loungeGroup = new THREE.Group();
    scene.add(loungeGroup);

    // --- Station 1: Center PlayStation 5 Inspired Console Unit ---
    const consoleGroup = new THREE.Group();

    // Center Console Body
    const bodyGeo = new THREE.BoxGeometry(0.5, 2.0, 1.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x09090f,
      roughness: 0.3,
      metalness: 0.7
    });
    const consoleBody = new THREE.Mesh(bodyGeo, bodyMat);
    consoleGroup.add(consoleBody);

    // Outer White/Silver Curved Wings (PS5 Aesthetic)
    const wingGeo = new THREE.BoxGeometry(0.08, 2.2, 1.35);
    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.15,
      metalness: 0.4
    });
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.x = -0.28;
    leftWing.rotation.z = -0.04;
    consoleGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.x = 0.28;
    rightWing.rotation.z = 0.04;
    consoleGroup.add(rightWing);

    // Glowing LED Light Strips along Console
    const ledGeo = new THREE.BoxGeometry(0.03, 1.9, 0.04);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ledLeft = new THREE.Mesh(ledGeo, ledMat);
    ledLeft.position.set(-0.24, 0.05, 0.61);
    consoleGroup.add(ledLeft);

    const ledRight = new THREE.Mesh(ledGeo, ledMat);
    ledRight.position.set(0.24, 0.05, 0.61);
    consoleGroup.add(ledRight);

    // Console Stand / Platform with glowing purple edge
    const standGeo = new THREE.CylinderGeometry(0.9, 1.1, 0.15, 32);
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x12111d,
      roughness: 0.4,
      metalness: 0.8
    });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = -1.1;
    consoleGroup.add(stand);

    // Stand light ring
    const standLedGeo = new THREE.TorusGeometry(0.95, 0.03, 16, 64);
    const standLedMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const standLed = new THREE.Mesh(standLedGeo, standLedMat);
    standLed.rotation.x = Math.PI / 2;
    standLed.position.y = -1.02;
    consoleGroup.add(standLed);

    consoleGroup.position.set(-0.6, 0.2, 0.4);
    loungeGroup.add(consoleGroup);

    // --- Station 2: DualSense-inspired Floating Controller ---
    const controllerGroup = new THREE.Group();

    // Central Controller Shell
    const ctrlBodyGeo = new THREE.BoxGeometry(1.2, 0.5, 0.4);
    const ctrlBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0f1016,
      roughness: 0.25,
      metalness: 0.5
    });
    const ctrlBody = new THREE.Mesh(ctrlBodyGeo, ctrlBodyMat);
    controllerGroup.add(ctrlBody);

    // White Grip Covers
    const gripGeo = new THREE.CylinderGeometry(0.22, 0.15, 0.9, 16);
    const gripMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.2,
      metalness: 0.2
    });
    const leftGrip = new THREE.Mesh(gripGeo, gripMat);
    leftGrip.position.set(-0.6, -0.25, 0);
    leftGrip.rotation.z = 0.35;
    controllerGroup.add(leftGrip);

    const rightGrip = new THREE.Mesh(gripGeo, gripMat);
    rightGrip.position.set(0.6, -0.25, 0);
    rightGrip.rotation.z = -0.35;
    controllerGroup.add(rightGrip);

    // Touchpad with IDEA MAKERS Glowing Purple Edge
    const padGeo = new THREE.BoxGeometry(0.5, 0.28, 0.05);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x1e152d,
      roughness: 0.3,
      metalness: 0.7
    });
    const touchPad = new THREE.Mesh(padGeo, padMat);
    touchPad.position.set(0, 0.08, 0.2);
    controllerGroup.add(touchPad);

    // Glowing Lightbar around touchpad
    const padGlowGeo = new THREE.BoxGeometry(0.54, 0.32, 0.02);
    const padGlowMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });
    const padGlow = new THREE.Mesh(padGlowGeo, padGlowMat);
    padGlow.position.set(0, 0.08, 0.18);
    controllerGroup.add(padGlow);

    // Thumbsticks
    const stickGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.6 });
    const leftStick = new THREE.Mesh(stickGeo, stickMat);
    leftStick.position.set(-0.25, -0.15, 0.2);
    leftStick.rotation.x = Math.PI / 4;
    controllerGroup.add(leftStick);

    const rightStick = new THREE.Mesh(stickGeo, stickMat);
    rightStick.position.set(0.25, -0.15, 0.2);
    rightStick.rotation.x = Math.PI / 4;
    controllerGroup.add(rightStick);

    controllerGroup.position.set(1.5, 0.6, 1.2);
    controllerGroup.rotation.set(-0.35, -0.4, 0.1);
    loungeGroup.add(controllerGroup);

    // --- Station 3: Curved Holographic Monitor Display (Lounge Session UI) ---
    const displayGroup = new THREE.Group();

    // Frame
    const screenGeo = new THREE.BoxGeometry(3.0, 1.7, 0.08);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.1,
      metalness: 0.9
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    displayGroup.add(screen);

    // Screen graphics canvas
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width = 1024;
    displayCanvas.height = 576;
    const ctx = displayCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 1024, 576);
      grad.addColorStop(0, '#0c071e');
      grad.addColorStop(0.5, '#190a36');
      grad.addColorStop(1, '#05030a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 576);

      ctx.fillStyle = '#a855f7';
      ctx.fillRect(0, 0, 1024, 12);

      ctx.font = 'bold 36px "Tajawal", "Inter", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('IDEA MAKERS — صالة الأبطال VIP', 60, 80);

      ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.beginPath();
      ctx.roundRect(780, 50, 180, 48, [24]);
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = 'bold 22px "Tajawal", sans-serif';
      ctx.fillStyle = '#10b981';
      ctx.fillText('● جلسة نشطة الآن', 805, 82);

      const drawCard = (x: number, y: number, title: string, time: string, price: string, status: string, col: string) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(x, y, 280, 360, [16]);
        ctx.fill();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 28px "Tajawal", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(title, x + 24, y + 55);

        ctx.font = '20px "Tajawal", sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('الوقت المنقضي:', x + 24, y + 110);

        ctx.font = 'bold 38px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(time, x + 24, y + 165);

        ctx.font = '20px "Tajawal", sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('الحساب الحالي:', x + 24, y + 220);

        ctx.font = 'bold 32px "Tajawal", sans-serif';
        ctx.fillStyle = '#a855f7';
        ctx.fillText(price, x + 24, y + 270);

        ctx.fillStyle = col;
        ctx.font = 'bold 20px "Tajawal", sans-serif';
        ctx.fillText(status, x + 24, y + 325);
      };

      drawCard(60, 130, 'جهاز PS5 #01 (VIP)', '01:42:18', '85.00 ر.س', '● قيد اللعب - Multi', '#a855f7');
      drawCard(372, 130, 'جهاز PS5 #02 (Single)', '00:34:05', '30.00 ر.س', '● طلبات بوفيه مضافة', '#06b6d4');
      drawCard(684, 130, 'غرفة VIP #03', '02:15:40', '150.00 ر.س', '● جلسة مفتوحة', '#10b981');
    }

    const screenTexture = new THREE.CanvasTexture(displayCanvas);
    const screenFaceGeo = new THREE.PlaneGeometry(2.9, 1.6);
    const screenFaceMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    });
    const screenFace = new THREE.Mesh(screenFaceGeo, screenFaceMat);
    screenFace.position.z = 0.045;
    displayGroup.add(screenFace);

    const screenBaseGeo = new THREE.BoxGeometry(0.8, 0.06, 0.4);
    const screenBase = new THREE.Mesh(screenBaseGeo, screenMat);
    screenBase.position.y = -1.15;
    displayGroup.add(screenBase);

    const screenPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 16);
    const screenPole = new THREE.Mesh(screenPoleGeo, screenMat);
    screenPole.position.y = -0.85;
    displayGroup.add(screenPole);

    const backGlowGeo = new THREE.PlaneGeometry(3.1, 1.8);
    const backGlowMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const backGlow = new THREE.Mesh(backGlowGeo, backGlowMat);
    backGlow.position.z = -0.05;
    displayGroup.add(backGlow);

    displayGroup.position.set(-0.2, 0.9, -1.2);
    displayGroup.rotation.y = 0.1;
    loungeGroup.add(displayGroup);

    // Floating Particles
    const particlesCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const particleColors = new Float32Array(particlesCount * 3);

    const pColor1 = new THREE.Color(0xa855f7);
    const pColor2 = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.3) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const mixed = pColor1.clone().lerp(pColor2, Math.random());
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse / Pointer Parallax Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const normX = (clientX - rect.left) / rect.width;
      const normY = (clientY - rect.top) / rect.height;

      const mouseX = (normX - 0.5) * 2;
      const mouseY = (normY - 0.5) * 2;

      targetRotationY = mouseX * 0.35;
      targetRotationX = -mouseY * 0.18;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Combined target rotation (mouse parallax + station offset)
      const totalTargetY = targetRotationY + targetStationRotationY.current;
      loungeGroup.rotation.y += (totalTargetY - loungeGroup.rotation.y) * 0.05;
      loungeGroup.rotation.x += (targetRotationX - loungeGroup.rotation.x) * 0.05;

      // Subtle breathing float for Controller
      controllerGroup.position.y = 0.6 + Math.sin(elapsedTime * 1.8) * 0.08;
      controllerGroup.rotation.z = 0.1 + Math.sin(elapsedTime * 1.2) * 0.04;
      controllerGroup.rotation.x = -0.35 + Math.cos(elapsedTime * 1.5) * 0.03;

      // Subtle breathing pulse for Console
      consoleGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.4 + 1.0) * 0.04;

      // Pulse lighting intensity slightly
      purpleSpot.intensity = 7.5 + Math.sin(elapsedTime * 2.5) * 1.0;
      cyanPoint.intensity = 3.2 + Math.cos(elapsedTime * 2.0) * 0.6;

      // Animate floating tech particles
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.0015;
      }
      posAttr.needsUpdate = true;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('touchmove', handlePointerMove);

      if (renderer) {
        renderer.dispose();
      }
      particleGeo.dispose();
      particleMat.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
      wingGeo.dispose();
      wingMat.dispose();
      ctrlBodyGeo.dispose();
      ctrlBodyMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[580px] select-none rounded-3xl overflow-hidden glass border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)] ${className}`}
      dir="ltr"
    >
      {/* 3D Canvas */}
      {isWebGLSupported ? (
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block cursor-grab active:cursor-grabbing outline-none"
        />
      ) : (
        /* Fallback if browser environment lacks WebGL support */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-purple-950/40 via-black to-slate-950">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mb-4">
            <span className="text-3xl">🎮</span>
          </div>
          <h4 className="text-lg font-bold text-white mb-2">منظومة صُنّاع الفكرة لإدارة الصالات الذكية</h4>
          <p className="text-sm text-gray-400 max-w-md">تحكم شامل في الأجهزة، حساب دقيق للجلسات بالساعة والدقيقة، ونظام نقاط بيع كاشير متكامل.</p>
        </div>
      )}

      {/* Top Overlay Badge — 3D Cinema Indicator */}
      <div 
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/40 text-[11px] sm:text-xs text-purple-300 font-bold pointer-events-none shadow-lg"
        dir="rtl"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
        </span>
        <span>محاكاة 3D تفاعلية حية لصالة VIP</span>
      </div>

      {/* Bottom Interactive Controls & Switcher */}
      <div 
        className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto"
        dir="rtl"
      >
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 shadow-xl">
          <span className="text-[10px] sm:text-xs text-gray-400 font-medium ml-1">عرض الأجهزة:</span>
          {[
            { id: 1, label: 'منصة PS5 VIP' },
            { id: 2, label: 'يد التحكم الذكية' },
            { id: 3, label: 'شاشة الكاشير والمؤقت' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => handleStationChange(st.id)}
              className={`px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeStation === st.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] border border-purple-400/50'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Parallax / Gesture Instruction hint */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 backdrop-blur-md border border-purple-500/20 text-[11px] text-gray-300 font-medium">
          <svg className="w-3.5 h-3.5 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <span>حرّك الماوس للتفاعل بزوايا 360° ثلاثية الأبعاد</span>
        </div>
      </div>

      {/* Radial Vignette Lighting Effect for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(6,6,12,0.7)_100%)]" />
    </div>
  );
};
