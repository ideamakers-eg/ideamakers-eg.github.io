import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeSceneCanvasProps {
  activeIndex: number;
  pointerOffset: { x: number; y: number };
}

export const ThreeSceneCanvas: React.FC<ThreeSceneCanvasProps> = ({ activeIndex, pointerOffset }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // Group references for transitions
  const groupsRef = useRef<THREE.Group[]>([]);
  const targetIndexRef = useRef<number>(activeIndex);

  useEffect(() => {
    targetIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = false; // lightweight high-FPS
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting setup - Sophisticated dark lounge studio with purple/violet rim light
    const ambientLight = new THREE.AmbientLight(0x2e1065, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 3.8);
    rimLight.position.set(-3, 2, -3);
    scene.add(rimLight);

    const bottomVioletGlow = new THREE.PointLight(0x7c3aed, 2.0, 10);
    bottomVioletGlow.position.set(0, -1.8, 1);
    scene.add(bottomVioletGlow);

    // 5. Build 4 thematic 3D groups
    const groups: THREE.Group[] = [];

    // Shared materials
    const blackMat = new THREE.MeshStandardMaterial({
      color: 0x0f0e17,
      metalness: 0.85,
      roughness: 0.25,
    });
    const darkConsoleMat = new THREE.MeshStandardMaterial({
      color: 0x161522,
      metalness: 0.7,
      roughness: 0.3,
    });
    const neonPurpleMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
    });
    const glassGlyphMat = new THREE.MeshPhysicalMaterial({
      color: 0xddd6fe,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85,
      emissive: 0x9333ea,
      emissiveIntensity: 0.45,
    });

    // -------------------------------------------------------------------
    // GROUP 0: DEVICE & SESSION MANAGEMENT (PlayStation 5 Console, Controller, Glyphs)
    // -------------------------------------------------------------------
    const group0 = new THREE.Group();
    
    // PS5 Console Body
    const consoleBody = new THREE.Group();
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x09090e, roughness: 0.4 });
    const consoleCore = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.45, 1.4), coreMat);
    consoleBody.add(consoleCore);

    // Console Wings (top & bottom curved plates)
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x181824, roughness: 0.2, metalness: 0.4 });
    const topWing = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 1.5), wingMat);
    topWing.position.y = 0.26;
    topWing.rotation.z = 0.04;
    consoleBody.add(topWing);

    const bottomWing = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 1.5), wingMat);
    bottomWing.position.y = -0.26;
    bottomWing.rotation.z = -0.04;
    consoleBody.add(bottomWing);

    // Purple LED slit inside console
    const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.04, 0.04), neonPurpleMat);
    ledStrip.position.set(0, 0.15, 0.7);
    consoleBody.add(ledStrip);

    consoleBody.position.set(0, -0.65, 0);
    consoleBody.rotation.set(0.2, -0.35, 0.05);
    group0.add(consoleBody);

    // DualSense Controller (Floating above)
    const controller = new THREE.Group();
    const ctrlBody = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.35), darkConsoleMat);
    controller.add(ctrlBody);

    // Controller handles (left & right angled grips)
    const handleGeom = new THREE.CylinderGeometry(0.18, 0.12, 0.9, 16);
    const leftHandle = new THREE.Mesh(handleGeom, darkConsoleMat);
    leftHandle.position.set(-0.6, -0.3, 0);
    leftHandle.rotation.z = 0.45;
    controller.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeom, darkConsoleMat);
    rightHandle.position.set(0.6, -0.3, 0);
    rightHandle.rotation.z = -0.45;
    controller.add(rightHandle);

    // Analog sticks
    const stickGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0f, roughness: 0.8 });
    const leftStick = new THREE.Mesh(stickGeom, stickMat);
    leftStick.position.set(-0.25, -0.15, 0.2);
    leftStick.rotation.x = Math.PI / 2;
    controller.add(leftStick);

    const rightStick = new THREE.Mesh(stickGeom, stickMat);
    rightStick.position.set(0.25, -0.15, 0.2);
    rightStick.rotation.x = Math.PI / 2;
    controller.add(rightStick);

    // Touchpad lightbar
    const lightBar = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 0.02), neonPurpleMat);
    lightBar.position.set(0, 0.16, 0.19);
    controller.add(lightBar);

    controller.position.set(0.4, 0.6, 0.5);
    controller.rotation.set(-0.15, 0.4, -0.1);
    group0.add(controller);

    // 4 Floating PlayStation Glyphs (△, ○, ✕, □)
    const glyphGroup = new THREE.Group();
    // 1. Triangle
    const triGeom = new THREE.CylinderGeometry(0.28, 0.28, 0.08, 3);
    const glyphTriangle = new THREE.Mesh(triGeom, glassGlyphMat);
    glyphTriangle.position.set(-1.6, 1.1, 0.2);
    glyphTriangle.rotation.set(0.3, 0.2, 0.5);
    glyphGroup.add(glyphTriangle);

    // 2. Circle
    const circleGeom = new THREE.TorusGeometry(0.22, 0.06, 16, 32);
    const glyphCircle = new THREE.Mesh(circleGeom, glassGlyphMat);
    glyphCircle.position.set(-1.1, 0.3, 0.8);
    glyphCircle.rotation.set(0.2, 0.5, 0);
    glyphGroup.add(glyphCircle);

    // 3. Cross (X)
    const crossBar1 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.08), glassGlyphMat);
    crossBar1.rotation.z = Math.PI / 4;
    const crossBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.08, 0.08), glassGlyphMat);
    crossBar2.rotation.z = -Math.PI / 4;
    const glyphCross = new THREE.Group();
    glyphCross.add(crossBar1);
    glyphCross.add(crossBar2);
    glyphCross.position.set(1.6, 1.2, 0.1);
    glyphGroup.add(glyphCross);

    // 4. Square
    const squareMesh = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.08), glassGlyphMat);
    squareMesh.position.set(1.4, -0.1, 0.6);
    squareMesh.rotation.set(0.4, -0.3, 0.2);
    glyphGroup.add(squareMesh);

    group0.add(glyphGroup);
    groups.push(group0);
    scene.add(group0);

    // -------------------------------------------------------------------
    // GROUP 1: SMART CASHIER (POS Terminal, Receipt Tape, Tap Scanner)
    // -------------------------------------------------------------------
    const group1 = new THREE.Group();
    
    // Slanted POS Terminal
    const posBase = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.2, 0.2, 32), blackMat);
    posBase.position.y = -1.0;
    group1.add(posBase);

    const posStand = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.9, 16), blackMat);
    posStand.position.set(0, -0.5, 0);
    posStand.rotation.x = -0.2;
    group1.add(posStand);

    // POS Screen Chassis
    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.15), darkConsoleMat);
    screenFrame.position.set(0, 0.2, 0.2);
    screenFrame.rotation.x = -0.22;
    group1.add(screenFrame);

    // Interactive glowing display plane
    const displayMat = new THREE.MeshStandardMaterial({
      color: 0x121020,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.35,
      roughness: 0.1,
    });
    const displayScreen = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.35), displayMat);
    displayScreen.position.set(0, 0.2, 0.28);
    displayScreen.rotation.x = -0.22;
    group1.add(displayScreen);

    // Top screen accent LED
    const posLed = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.03, 0.02), neonPurpleMat);
    posLed.position.set(0, 0.9, 0.35);
    posLed.rotation.x = -0.22;
    group1.add(posLed);

    // Thermal Receipt Tape streaming down
    const receiptPaperMat = new THREE.MeshStandardMaterial({
      color: 0xf3f4f6,
      roughness: 0.7,
      side: THREE.DoubleSide,
    });
    const receiptGeom = new THREE.PlaneGeometry(0.7, 1.2, 10, 10);
    // Curl geometry slightly
    const posAttr = receiptGeom.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      posAttr.setZ(i, Math.sin(y * 3) * 0.12);
    }
    receiptGeom.computeVertexNormals();
    const receiptTape = new THREE.Mesh(receiptGeom, receiptPaperMat);
    receiptTape.position.set(1.1, -0.4, 0.7);
    receiptTape.rotation.set(0.3, -0.4, 0.1);
    group1.add(receiptTape);

    // Contactless Tap-to-Pay Pad
    const nfcPad = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 24), darkConsoleMat);
    nfcPad.position.set(-1.1, -0.5, 0.8);
    nfcPad.rotation.set(0.3, 0.2, 0);
    const nfcRing = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 16, 32), neonPurpleMat);
    nfcRing.position.set(-1.1, -0.45, 0.82);
    nfcRing.rotation.set(Math.PI / 2 + 0.3, 0, 0);
    group1.add(nfcPad);
    group1.add(nfcRing);

    group1.position.set(0, 0, 0);
    groups.push(group1);
    scene.add(group1);

    // -------------------------------------------------------------------
    // GROUP 2: SALES & INVENTORY (Lounge Cafe Shelves, Beverage Cans, Scanner)
    // -------------------------------------------------------------------
    const group2 = new THREE.Group();
    
    // Tiered display shelf
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x11101d, metalness: 0.9, roughness: 0.2 });
    const shelf1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 1.0), shelfMat);
    shelf1.position.set(0, -0.7, 0);
    group2.add(shelf1);

    const shelf2 = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.9), shelfMat);
    shelf2.position.set(0, 0.1, -0.1);
    group2.add(shelf2);

    // LED backlight strip underneath shelf
    const shelfLed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 0.04), neonPurpleMat);
    shelfLed.position.set(0, -0.74, 0.45);
    group2.add(shelfLed);

    // Cold Energy Drink Cans (Cylinder Geometry)
    const canMat1 = new THREE.MeshStandardMaterial({ color: 0x9333ea, metalness: 0.9, roughness: 0.2 });
    const canMat2 = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.9, roughness: 0.2 });
    const canMat3 = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.9, roughness: 0.2 });
    const canGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.65, 24);

    const can1 = new THREE.Mesh(canGeom, canMat1);
    can1.position.set(-0.7, -0.34, 0.1);
    group2.add(can1);

    const can2 = new THREE.Mesh(canGeom, canMat2);
    can2.position.set(-0.3, -0.34, 0.15);
    group2.add(can2);

    const can3 = new THREE.Mesh(canGeom, canMat3);
    can3.position.set(0.1, -0.34, 0.1);
    group2.add(can3);

    // Snack box packs on top shelf
    const snackMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 });
    const snack1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.2), snackMat);
    snack1.position.set(0.6, -0.4, 0.1);
    snack1.rotation.y = -0.2;
    group2.add(snack1);

    const snack2 = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 0.2), snackMat);
    snack2.position.set(0.3, 0.42, 0);
    snack2.rotation.y = 0.15;
    group2.add(snack2);

    // Barcode handheld scanner
    const scannerGroup = new THREE.Group();
    const scanHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.35, 0.6), darkConsoleMat);
    const scanHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.7, 16), blackMat);
    scanHandle.position.set(0, -0.4, -0.1);
    scanHandle.rotation.x = -0.3;
    scannerGroup.add(scanHead);
    scannerGroup.add(scanHandle);

    // Red/Purple laser beam plane
    const laserMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.65 });
    const laserPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.04), laserMat);
    laserPlane.position.set(0, 0, 0.45);
    scannerGroup.add(laserPlane);

    scannerGroup.position.set(-0.6, 0.55, 0.3);
    scannerGroup.rotation.set(0.3, -0.4, 0.2);
    group2.add(scannerGroup);

    group2.position.set(0, 0, 0);
    groups.push(group2);
    scene.add(group2);

    // -------------------------------------------------------------------
    // GROUP 3: REVENUE & BUSINESS OVERVIEW (3D Telemetry Pillars, Profit Rings)
    // -------------------------------------------------------------------
    const group3 = new THREE.Group();
    
    // Telemetry Stepped Bar Columns
    const barHeights = [0.8, 1.2, 1.7, 2.2, 2.8, 3.4];
    const barsGroup = new THREE.Group();

    barHeights.forEach((h, idx) => {
      const barGeom = new THREE.BoxGeometry(0.35, h, 0.35);
      const isMax = idx === barHeights.length - 1;
      const barMat = new THREE.MeshStandardMaterial({
        color: isMax ? 0xa855f7 : 0x2e1065,
        metalness: 0.7,
        roughness: 0.2,
        emissive: isMax ? 0xa855f7 : 0x581c87,
        emissiveIntensity: isMax ? 0.6 : 0.2,
      });
      const bar = new THREE.Mesh(barGeom, barMat);
      bar.position.set((idx - 2.5) * 0.48, -0.9 + h / 2, 0);
      barsGroup.add(bar);

      // Neon cap on top of each bar
      const capMat = new THREE.MeshBasicMaterial({ color: 0xd8b4fe });
      const cap = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.05, 0.37), capMat);
      cap.position.set((idx - 2.5) * 0.48, -0.9 + h + 0.02, 0);
      barsGroup.add(cap);
    });
    barsGroup.position.set(0, -0.2, 0);
    barsGroup.rotation.y = -0.3;
    group3.add(barsGroup);

    // Orbiting Floating Hologram Rings
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.03, 16, 64), neonPurpleMat);
    ring1.rotation.set(Math.PI / 3, 0.2, 0);
    group3.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.02, 16, 64), glassGlyphMat);
    ring2.rotation.set(-Math.PI / 4, 0.4, 0);
    group3.add(ring2);

    // Floating Data telemetry nodes
    const nodeGeom = new THREE.SphereGeometry(0.1, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const node1 = new THREE.Mesh(nodeGeom, nodeMat);
    node1.position.set(1.4, 1.2, 0.5);
    group3.add(node1);

    const node2 = new THREE.Mesh(nodeGeom, nodeMat);
    node2.position.set(-1.3, 0.9, -0.4);
    group3.add(node2);

    group3.position.set(0, 0, 0);
    groups.push(group3);
    scene.add(group3);

    groupsRef.current = groups;

    // 6. Handle Visibility change & offscreen pausing
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting && !document.hidden;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();
      const currentTarget = targetIndexRef.current;

      // Smoothly interpolate active group visibility & scale
      groups.forEach((grp, index) => {
        const isActive = index === currentTarget;
        const targetScale = isActive ? 1.0 : 0.001;
        const targetOpacity = isActive ? 1.0 : 0.0;

        grp.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        grp.visible = grp.scale.x > 0.05;

        // Subtle floating / dynamic rotation per active scene
        if (isActive) {
          if (index === 0) {
            // Group 0: Controller floats gently, glyphs orbit
            controller.position.y = 0.6 + Math.sin(elapsedTime * 1.5) * 0.08;
            controller.rotation.y = 0.4 + Math.sin(elapsedTime * 0.8) * 0.08;
            glyphGroup.rotation.y = elapsedTime * 0.25;
            glyphGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.05;
          } else if (index === 1) {
            // Group 1: Cashier terminal subtle tilt, tap ring pulses
            posStand.rotation.y = Math.sin(elapsedTime * 0.6) * 0.06;
            screenFrame.rotation.y = Math.sin(elapsedTime * 0.6) * 0.06;
            displayScreen.rotation.y = Math.sin(elapsedTime * 0.6) * 0.06;
            const pulse = 1.0 + Math.sin(elapsedTime * 3) * 0.06;
            nfcRing.scale.set(pulse, pulse, pulse);
          } else if (index === 2) {
            // Group 2: Barcode laser sweeps
            scannerGroup.position.y = 0.55 + Math.sin(elapsedTime * 2) * 0.06;
            laserPlane.scale.x = 0.9 + Math.sin(elapsedTime * 4) * 0.15;
          } else if (index === 3) {
            // Group 3: Orbit rings rotate continuously
            ring1.rotation.z = elapsedTime * 0.3;
            ring2.rotation.z = -elapsedTime * 0.2;
            barsGroup.rotation.y = -0.3 + Math.sin(elapsedTime * 0.7) * 0.08;
          }
        }
      });

      // Pointer parallax tilt (lerping toward offset)
      if (sceneRef.current) {
        sceneRef.current.rotation.y += (pointerOffset.x * 0.3 - sceneRef.current.rotation.y) * 0.06;
        sceneRef.current.rotation.x += (-pointerOffset.y * 0.2 - sceneRef.current.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

      // Dispose three.js resources
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return null; // Parent will display the polished CSS visual fallback
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative z-10 pointer-events-none select-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
};
