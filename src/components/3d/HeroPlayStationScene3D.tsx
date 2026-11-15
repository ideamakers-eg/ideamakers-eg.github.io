import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable, prefersReducedMotion } from './WebGLUtils';

interface HeroPlayStationScene3DProps {
  className?: string;
}

export const HeroPlayStationScene3D: React.FC<HeroPlayStationScene3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const reducedMotion = prefersReducedMotion();

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 550;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 7.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // --- MATERIALS ---
    // Chassis matte dark
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x121218,
      roughness: 0.38,
      metalness: 0.18,
    });

    // Faceplate dark gloss
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x09090d,
      roughness: 0.18,
      metalness: 0.35,
    });

    // Chrome triggers / analog sticks
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x22222d,
      roughness: 0.12,
      metalness: 0.85,
    });

    // Grip texture material
    const gripMat = new THREE.MeshStandardMaterial({
      color: 0x161622,
      roughness: 0.45,
      metalness: 0.1,
    });

    // Neon Purple Glow (Portal & Accents)
    const neonPurpleMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
    });

    // Neon Cyan Glow (Portal Rim & Accents)
    const neonCyanMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });

    // Crystal Glass for PlayStation symbols (Cyan / Violet)
    const crystalVioletMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x581c87,
      emissiveIntensity: 0.5,
      roughness: 0.08,
      metalness: 0.15,
      transmission: 0.65,
      thickness: 0.5,
      transparent: true,
      opacity: 0.9,
    });

    const crystalCyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.5,
      roughness: 0.08,
      metalness: 0.15,
      transmission: 0.65,
      thickness: 0.5,
      transparent: true,
      opacity: 0.9,
    });

    // --- CONTROLLER HIERARCHY ---
    const controllerGroup = new THREE.Group();

    // Central Chassis
    const centerBodyGeo = new THREE.BoxGeometry(2.3, 1.4, 0.75, 4, 4, 4);
    // Bevel position vertices
    const centerBodyMesh = new THREE.Mesh(centerBodyGeo, bodyMat);
    centerBodyMesh.scale.set(1, 0.95, 1);
    controllerGroup.add(centerBodyMesh);

    // Left Wing / Grip
    const leftGripGeo = new THREE.CylinderGeometry(0.48, 0.38, 2.5, 24);
    const leftGripMesh = new THREE.Mesh(leftGripGeo, gripMat);
    leftGripMesh.position.set(-1.45, -0.65, 0.15);
    leftGripMesh.rotation.set(0.18, 0, 0.42);
    controllerGroup.add(leftGripMesh);

    // Right Wing / Grip
    const rightGripGeo = new THREE.CylinderGeometry(0.48, 0.38, 2.5, 24);
    const rightGripMesh = new THREE.Mesh(rightGripGeo, gripMat);
    rightGripMesh.position.set(1.45, -0.65, 0.15);
    rightGripMesh.rotation.set(0.18, 0, -0.42);
    controllerGroup.add(rightGripMesh);

    // Center Touchpad (Elevated gloss plate)
    const touchpadGeo = new THREE.BoxGeometry(1.25, 0.8, 0.12);
    const touchpadMesh = new THREE.Mesh(touchpadGeo, plateMat);
    touchpadMesh.position.set(0, 0.32, 0.4);
    touchpadMesh.rotation.x = -0.08;
    controllerGroup.add(touchpadMesh);

    // Touchpad Neon Lightbar rim
    const lightbarGeo = new THREE.BoxGeometry(1.28, 0.04, 0.14);
    const lightbarMesh = new THREE.Mesh(lightbarGeo, neonCyanMat);
    lightbarMesh.position.set(0, 0.74, 0.38);
    controllerGroup.add(lightbarMesh);

    // Analog Sticks (Left & Right)
    const stickBaseGeo = new THREE.SphereGeometry(0.32, 24, 16);
    const stickCapGeo = new THREE.CylinderGeometry(0.38, 0.34, 0.16, 28);

    // Left Stick
    const leftStickGroup = new THREE.Group();
    const leftStickBase = new THREE.Mesh(stickBaseGeo, chromeMat);
    const leftStickCap = new THREE.Mesh(stickCapGeo, gripMat);
    leftStickCap.position.y = 0.28;
    leftStickGroup.add(leftStickBase);
    leftStickGroup.add(leftStickCap);
    leftStickGroup.position.set(-0.62, -0.22, 0.42);
    leftStickGroup.rotation.x = 0.2;
    controllerGroup.add(leftStickGroup);

    // Right Stick
    const rightStickGroup = new THREE.Group();
    const rightStickBase = new THREE.Mesh(stickBaseGeo, chromeMat);
    const rightStickCap = new THREE.Mesh(stickCapGeo, gripMat);
    rightStickCap.position.y = 0.28;
    rightStickGroup.add(rightStickBase);
    rightStickGroup.add(rightStickCap);
    rightStickGroup.position.set(0.62, -0.22, 0.42);
    rightStickGroup.rotation.x = 0.2;
    controllerGroup.add(rightStickGroup);

    // D-Pad Cross (Left side)
    const dpadGroup = new THREE.Group();
    const dpadHorizGeo = new THREE.BoxGeometry(0.68, 0.22, 0.16);
    const dpadVertGeo = new THREE.BoxGeometry(0.22, 0.68, 0.16);
    const dpadHoriz = new THREE.Mesh(dpadHorizGeo, chromeMat);
    const dpadVert = new THREE.Mesh(dpadVertGeo, chromeMat);
    dpadGroup.add(dpadHoriz);
    dpadGroup.add(dpadVert);
    dpadGroup.position.set(-1.08, 0.32, 0.42);
    controllerGroup.add(dpadGroup);

    // Action Buttons Cluster (Right side: Triangle, Circle, Cross, Square)
    const buttonGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);
    const actionButtonsGroup = new THREE.Group();
    actionButtonsGroup.position.set(1.08, 0.32, 0.42);

    const triangleBtn = new THREE.Mesh(buttonGeo, crystalCyanMat);
    triangleBtn.position.set(0, 0.28, 0);
    triangleBtn.rotation.x = Math.PI / 2;

    const circleBtn = new THREE.Mesh(buttonGeo, crystalVioletMat);
    circleBtn.position.set(0.28, 0, 0);
    circleBtn.rotation.x = Math.PI / 2;

    const crossBtn = new THREE.Mesh(buttonGeo, crystalCyanMat);
    crossBtn.position.set(0, -0.28, 0);
    crossBtn.rotation.x = Math.PI / 2;

    const squareBtn = new THREE.Mesh(buttonGeo, crystalVioletMat);
    squareBtn.position.set(-0.28, 0, 0);
    squareBtn.rotation.x = Math.PI / 2;

    actionButtonsGroup.add(triangleBtn, circleBtn, crossBtn, squareBtn);
    controllerGroup.add(actionButtonsGroup);

    // Top Shoulder Triggers (L1 / R1, L2 / R2)
    const bumperGeo = new THREE.BoxGeometry(0.75, 0.26, 0.4);
    const leftBumper = new THREE.Mesh(bumperGeo, chromeMat);
    leftBumper.position.set(-0.95, 0.88, -0.05);
    leftBumper.rotation.z = -0.12;

    const rightBumper = new THREE.Mesh(bumperGeo, chromeMat);
    rightBumper.position.set(0.95, 0.88, -0.05);
    rightBumper.rotation.z = 0.12;

    controllerGroup.add(leftBumper, rightBumper);

    // Subtle PS Logo badge
    const psBadgeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16);
    const psBadge = new THREE.Mesh(psBadgeGeo, neonPurpleMat);
    psBadge.position.set(0, -0.02, 0.43);
    psBadge.rotation.x = Math.PI / 2;
    controllerGroup.add(psBadge);

    // Position & tilt controller gracefully like the reference photo
    controllerGroup.rotation.set(-0.18, 0.35, -0.15);
    controllerGroup.position.set(0.1, -0.1, 0.2);
    scene.add(controllerGroup);

    // --- NEON PORTAL RECTANGLE FRAME (FROM REFERENCE IMAGE) ---
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0.3, 0.2, -1.2);
    portalGroup.rotation.set(-0.12, 0.28, -0.08);

    const portalFrameWidth = 4.2;
    const portalFrameHeight = 4.8;
    const portalThickness = 0.06;

    // Left neon bar (Purple)
    const portalLeft = new THREE.Mesh(
      new THREE.BoxGeometry(portalThickness, portalFrameHeight, portalThickness),
      neonPurpleMat
    );
    portalLeft.position.x = -portalFrameWidth / 2;

    // Right neon bar (Cyan)
    const portalRight = new THREE.Mesh(
      new THREE.BoxGeometry(portalThickness, portalFrameHeight, portalThickness),
      neonCyanMat
    );
    portalRight.position.x = portalFrameWidth / 2;

    // Top neon bar
    const portalTop = new THREE.Mesh(
      new THREE.BoxGeometry(portalFrameWidth, portalThickness, portalThickness),
      neonCyanMat
    );
    portalTop.position.y = portalFrameHeight / 2;

    // Bottom neon bar
    const portalBottom = new THREE.Mesh(
      new THREE.BoxGeometry(portalFrameWidth, portalThickness, portalThickness),
      neonPurpleMat
    );
    portalBottom.position.y = -portalFrameHeight / 2;

    // Portal translucent volumetric glow plane inside frame
    const portalBackdropGeo = new THREE.PlaneGeometry(portalFrameWidth * 0.98, portalFrameHeight * 0.98);
    const portalBackdropMat = new THREE.MeshBasicMaterial({
      color: 0x1e1238,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const portalBackdrop = new THREE.Mesh(portalBackdropGeo, portalBackdropMat);

    portalGroup.add(portalLeft, portalRight, portalTop, portalBottom, portalBackdrop);
    scene.add(portalGroup);

    // --- FLOATING 3D PLAYSTATION CRYSTAL SYMBOLS (▲ ● ✖ ■) ---
    const floatingSymbols: {
      mesh: THREE.Object3D;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      floatSpeed: number;
      floatOffset: number;
    }[] = [];

    // 1. Crystal Triangle (▲)
    const createTriangle = () => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0.55);
      shape.lineTo(0.5, -0.35);
      shape.lineTo(-0.5, -0.35);
      shape.closePath();
      const extrudeSettings = { depth: 0.18, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      return new THREE.Mesh(geom, crystalCyanMat);
    };

    // 2. Crystal Circle / Ring (●)
    const createCircle = () => {
      const geom = new THREE.TorusGeometry(0.38, 0.12, 16, 32);
      return new THREE.Mesh(geom, crystalVioletMat);
    };

    // 3. Crystal Cross (✖)
    const createCross = () => {
      const group = new THREE.Group();
      const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.18), crystalCyanMat);
      const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.85, 0.18), crystalCyanMat);
      group.add(bar1, bar2);
      group.rotation.z = Math.PI / 4;
      return group;
    };

    // 4. Crystal Square (■)
    const createSquare = () => {
      const shape = new THREE.Shape();
      const s = 0.42;
      shape.moveTo(-s, -s);
      shape.lineTo(s, -s);
      shape.lineTo(s, s);
      shape.lineTo(-s, s);
      shape.closePath();
      const extrudeSettings = { depth: 0.18, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.04, bevelThickness: 0.04 };
      const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geom.center();
      return new THREE.Mesh(geom, crystalVioletMat);
    };

    const symbolsData = [
      { factory: createTriangle, x: -2.3, y: 1.8, z: 0.4, sx: 0.9, sy: 0.9, sz: 0.9 },
      { factory: createCircle, x: -0.4, y: 2.2, z: -0.8, sx: 0.85, sy: 0.85, sz: 0.85 },
      { factory: createSquare, x: 2.4, y: 2.0, z: -0.5, sx: 0.85, sy: 0.85, sz: 0.85 },
      { factory: createTriangle, x: 2.5, y: 0.4, z: 0.6, sx: 0.95, sy: 0.95, sz: 0.95 },
      { factory: createCross, x: 1.8, y: -1.7, z: 0.2, sx: 0.8, sy: 0.8, sz: 0.8 },
      { factory: createCircle, x: -1.2, y: -1.9, z: 0.8, sx: 0.9, sy: 0.9, sz: 0.9 },
      { factory: createCross, x: -2.4, y: -1.8, z: 0.3, sx: 0.75, sy: 0.75, sz: 0.75 },
      { factory: createSquare, x: 0.2, y: -1.4, z: -0.6, sx: 0.7, sy: 0.7, sz: 0.7 },
    ];

    symbolsData.forEach((item, idx) => {
      const mesh = item.factory();
      mesh.scale.set(item.sx, item.sy, item.sz);
      mesh.position.set(item.x, item.y, item.z);
      scene.add(mesh);
      floatingSymbols.push({
        mesh,
        baseX: item.x,
        baseY: item.y,
        baseZ: item.z,
        rotSpeedX: 0.008 + idx * 0.002,
        rotSpeedY: 0.012 + idx * 0.003,
        rotSpeedZ: 0.006 + idx * 0.002,
        floatSpeed: 1.2 + idx * 0.2,
        floatOffset: idx * 0.8,
      });
    });

    // --- AMBIENT DUST / PARTICLES ---
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const purpleColor = new THREE.Color(0xa855f7);
    const cyanColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.5;

      const chosenColor = Math.random() > 0.4 ? purpleColor : cyanColor;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- LIGHTING ---
    // Ambient deep charcoal
    const ambientLight = new THREE.AmbientLight(0x0e0e18, 1.8);
    scene.add(ambientLight);

    // Key Light: High-intensity Violet/Purple directional light
    const purpleKeyLight = new THREE.DirectionalLight(0xa855f7, 4.2);
    purpleKeyLight.position.set(-3.5, 3.5, 4);
    scene.add(purpleKeyLight);

    // Rim Backlight: Ice Cyan rim light
    const cyanRimLight = new THREE.DirectionalLight(0x38bdf8, 4.5);
    cyanRimLight.position.set(4, 2.5, -2.5);
    scene.add(cyanRimLight);

    // Bottom soft fill
    const bottomFillLight = new THREE.DirectionalLight(0x4c1d95, 2.0);
    bottomFillLight.position.set(0, -3.5, 2);
    scene.add(bottomFillLight);

    // Point Light behind controller for volumetric glow
    const portalPointLight = new THREE.PointLight(0xa855f7, 3.5, 8);
    portalPointLight.position.set(0.3, 0.2, -1.0);
    scene.add(portalPointLight);

    // --- INTERACTIVE DRAG & MOUSE PARALLAX ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let dragRotY = 0;
    let dragRotX = 0;
    let targetDragRotY = 0;
    let targetDragRotX = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      container.setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = Math.max(-1, Math.min(1, x));
      targetMouseY = Math.max(-1, Math.min(1, y));

      if (isDragging) {
        const deltaX = (e.clientX - startX) * 0.008;
        const deltaY = (e.clientY - startY) * 0.008;
        targetDragRotY += deltaX;
        targetDragRotX = Math.max(-0.6, Math.min(0.6, targetDragRotX + deltaY));
        startX = e.clientX;
        startY = e.clientY;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        container.releasePointerCapture?.(e.pointerId);
      } catch {
        // ignore pointer capture release if not captured
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // Click impulse animation
    let impulseTime = 0;
    const handleContainerClick = () => {
      impulseTime = 1.0;
    };
    container.addEventListener('click', handleContainerClick);

    // Visibility Observer to pause rendering when out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth drag and mouse lerping
      dragRotY += (targetDragRotY - dragRotY) * 0.1;
      dragRotX += (targetDragRotX - dragRotX) * 0.1;
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      // Controller idle breathing and gentle tilt
      if (!reducedMotion) {
        const floatY = Math.sin(elapsed * 1.5) * 0.12;
        const floatX = Math.cos(elapsed * 1.0) * 0.06;

        controllerGroup.position.y = -0.1 + floatY;
        controllerGroup.position.x = 0.1 + floatX;

        // Base tilt + mouse tilt + drag tilt
        controllerGroup.rotation.y = 0.35 + dragRotY + currentMouseX * 0.25;
        controllerGroup.rotation.x = -0.18 + dragRotX - currentMouseY * 0.2;
        controllerGroup.rotation.z = -0.15 + (currentMouseX + dragRotY * 0.1) * 0.1;

        // Portal follows with subtle parallax
        portalGroup.rotation.y = 0.28 + dragRotY * 0.35 + currentMouseX * 0.12;
        portalGroup.rotation.x = -0.12 + dragRotX * 0.35 - currentMouseY * 0.1;

        // Floating symbols animation
        floatingSymbols.forEach((sym) => {
          sym.mesh.rotation.x += sym.rotSpeedX;
          sym.mesh.rotation.y += sym.rotSpeedY;
          sym.mesh.rotation.z += sym.rotSpeedZ;

          const sFloat = Math.sin(elapsed * sym.floatSpeed + sym.floatOffset) * 0.18;
          sym.mesh.position.y = sym.baseY + sFloat + currentMouseY * 0.2;
          sym.mesh.position.x = sym.baseX + currentMouseX * 0.25;
        });

        // Rotate particles slowly
        particles.rotation.y = elapsed * 0.04;
        particles.rotation.x = elapsed * 0.02;

        // Handle click impulse
        if (impulseTime > 0) {
          controllerGroup.scale.setScalar(1 + impulseTime * 0.08);
          impulseTime = Math.max(0, impulseTime - delta * 3.5);
        } else {
          controllerGroup.scale.setScalar(1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // --- CLEANUP ---
    return () => {
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleContainerClick);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Recursive disposal of geometries, materials, renderer
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          if (obj.geometry) obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (!hasWebGL) {
    // Non-WebGL Fallback
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-3xl ${className}`}>
        {/* Fallback Glowing Portal */}
        <div className="absolute inset-4 rounded-3xl border-2 border-primary/40 shadow-[0_0_50px_rgba(168,85,247,0.3)] bg-gradient-to-tr from-purple-950/40 via-black to-cyan-950/30 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-3xl text-primary font-black">PS5</span>
            </div>
            <p className="text-white font-bold text-sm">IDEA MAKERS PlayStation POS</p>
            <p className="text-xs text-gray-400 mt-1">تجربة ثلاثية الأبعاد تفاعلية لإدارة صالات البلايستيشن</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[260px] xs:min-h-[290px] sm:min-h-[350px] md:min-h-[420px] lg:min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Subtle indicator hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-white/10 backdrop-blur-md text-[10px] font-medium text-gray-300">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span>3D تفاعلي · اسحب للتدوير 360°</span>
      </div>
    </div>
  );
};
export default HeroPlayStationScene3D;
