import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Monitor, Plus, CheckCircle2, Zap } from 'lucide-react';
import { isWebGLAvailable } from './WebGLUtils';

interface InteractiveStationHUD3DProps {
  hourlyRate?: number;
  currency?: string;
}

export const InteractiveStationHUD3D: React.FC<InteractiveStationHUD3DProps> = ({
  hourlyRate = 35,
  currency = 'ج.م',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeStation, setActiveStation] = useState(1);
  const [sessionType, setSessionType] = useState<'single' | 'multi'>('single');
  const [isPlaying, setIsPlaying] = useState(true);
  const [seconds, setSeconds] = useState(4820); // 1h 20m 20s
  const [snacksTotal, setSnacksTotal] = useState(45); // Café items total
  const [snacksCount, setSnacksCount] = useState(2);

  // Live timer interval
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Format time (HH:MM:SS)
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculations
  const rateMultiplier = sessionType === 'single' ? 1.0 : 1.4;
  const currentHourlyRate = Math.round(hourlyRate * rateMultiplier);
  const timeCost = Math.round((seconds / 3600) * currentHourlyRate);
  const grandTotal = timeCost + snacksTotal;

  // Three.js holographic console visualizer
  useEffect(() => {
    if (!isWebGLAvailable()) return;
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Holographic Base Ring
    const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.2, 32);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x111119,
      roughness: 0.3,
      metalness: 0.6,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.7;
    scene.add(baseMesh);

    // Glowing Neon Ring
    const ringGeo = new THREE.TorusGeometry(1.5, 0.04, 16, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: isPlaying ? 0x10b981 : 0xa855f7 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -0.58;
    scene.add(ringMesh);

    // Mini PS5 Console Model standing on base
    const consoleGroup = new THREE.Group();
    const consoleBodyGeo = new THREE.BoxGeometry(0.5, 1.5, 1.0);
    const consoleBodyMat = new THREE.MeshStandardMaterial({
      color: 0x08080c,
      roughness: 0.2,
      metalness: 0.4,
    });
    const consoleBody = new THREE.Mesh(consoleBodyGeo, consoleBodyMat);
    consoleGroup.add(consoleBody);

    // Outer curved collar plates (white/silver like PS5)
    const plateGeo = new THREE.BoxGeometry(0.08, 1.6, 1.08);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.18,
      metalness: 0.1,
    });
    const leftPlate = new THREE.Mesh(plateGeo, plateMat);
    leftPlate.position.x = -0.28;
    const rightPlate = new THREE.Mesh(plateGeo, plateMat);
    rightPlate.position.x = 0.28;
    consoleGroup.add(leftPlate, rightPlate);

    // Console Blue Light Strip
    const stripGeo = new THREE.BoxGeometry(0.02, 1.4, 0.9);
    const stripMat = new THREE.MeshBasicMaterial({ color: isPlaying ? 0x38bdf8 : 0xf43f5e });
    const stripMesh = new THREE.Mesh(stripGeo, stripMat);
    stripMesh.position.set(0.18, 0.05, 0);
    consoleGroup.add(stripMesh);

    consoleGroup.position.set(0, 0.2, 0);
    consoleGroup.rotation.y = 0.45;
    scene.add(consoleGroup);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xa855f7, 3, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    let animId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animId = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();

      // Slow elegant turn
      consoleGroup.rotation.y = 0.45 + Math.sin(elapsed * 0.8) * 0.25;
      ringMesh.rotation.z = elapsed * 0.5;

      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      baseGeo.dispose();
      baseMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      consoleBodyGeo.dispose();
      consoleBodyMat.dispose();
      plateGeo.dispose();
      plateMat.dispose();
      stripGeo.dispose();
      stripMat.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [isPlaying]);

  return (
    <div className="bg-[#09090f]/95 border border-primary/30 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-lg shadow-primary/20">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>محاكي شاشة الكاشير والتحكم الفوري</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                LIVE DEMO
              </span>
            </h3>
            <p className="text-xs text-gray-400 font-medium">تحكم لحظي في الوقت ومبيعات الكافيه ومنع التلاعب</p>
          </div>
        </div>

        {/* Station Tabs */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          {[
            { id: 1, name: 'جهاز 01 (VIP)' },
            { id: 2, name: 'جهاز 02 (صالة)' },
            { id: 3, name: 'جهاز 03 (PS4)' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStation(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeStation === st.id
                  ? 'bg-primary text-white shadow-md shadow-primary/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {st.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 3D Console holographic render */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-2xl p-4 relative min-h-[260px]">
          <div ref={mountRef} className="w-full h-[220px] flex items-center justify-center" />
          
          <div className="flex items-center justify-between w-full px-4 pt-2 border-t border-white/5 text-[11px] font-bold">
            <span className="text-gray-400 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              حالة الشاشة: {isPlaying ? 'متصلة (ON)' : 'مفصولة (OFF)'}
            </span>
            <span className="text-primary font-mono">HDMI SYNC · آمن 100%</span>
          </div>
        </div>

        {/* Right Column: Live Session Control Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Timer Display Card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                الوقت المحسوب بدقة الثانية
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                <span className={isPlaying ? 'text-white' : 'text-amber-400'}>{formatTime(seconds)}</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-gray-300 font-sans font-bold">
                  {isPlaying ? 'نشطة الآن' : 'مؤقتة'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md ${
                  isPlaying
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPlaying ? 'إيقاف مؤقت' : 'استئناف'}</span>
              </button>

              <button
                onClick={() => setSeconds(0)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="تصفير الجلسة"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pricing Mode Toggle & Café add-on */}
          <div className="grid sm:grid-cols-2 gap-3">
            {/* Single vs Multi */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
              <span className="text-[10px] font-bold text-gray-400 block mb-2">نوع اللعب والتسعيرة:</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSessionType('single')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sessionType === 'single'
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  فردي ({hourlyRate} {currency}/س)
                </button>
                <button
                  onClick={() => setSessionType('multi')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sessionType === 'multi'
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  زوجي ({Math.round(hourlyRate * 1.4)} {currency}/س)
                </button>
              </div>
            </div>

            {/* Quick Café items order */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-1">
                <span>طلبات البوفيه / المشروبات:</span>
                <span className="text-emerald-400">{snacksCount} طلبات ({snacksTotal} {currency})</span>
              </div>
              <button
                onClick={() => {
                  setSnacksCount((c) => c + 1);
                  setSnacksTotal((t) => t + 25);
                }}
                className="w-full py-1.5 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-primary" />
                <span>إضافة مشروب (+25 {currency})</span>
              </button>
            </div>
          </div>

          {/* Real-time Calculation Ledger */}
          <div className="bg-gradient-to-r from-primary/10 via-purple-950/20 to-black/40 border border-primary/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                إجمالي الفاتورة المستحقة حتى اللحظة:
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white flex items-baseline gap-2">
                <span>{grandTotal}</span>
                <span className="text-xs text-primary font-bold">{currency}</span>
                <span className="text-[11px] text-gray-400 font-normal">
                  (وقت: {timeCost} + بوفيه: {snacksTotal})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>مغلق آلياً بتقرير الخزينة اليومية</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InteractiveStationHUD3D;
