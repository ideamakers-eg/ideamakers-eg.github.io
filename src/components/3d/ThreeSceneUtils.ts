import * as THREE from 'three';

// Detect WebGL capability
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// Color palette matching IDEA MAKERS & PS5 reference
export const COLORS = {
  background: 0x050508,
  obsidianBody: 0x111116,
  charcoalMatte: 0x181820,
  darkTrim: 0x0a0a0d,
  metallicNeck: 0x475569,
  rubberGrip: 0x0d0d12,
  neonCyan: 0x06b6d4,
  neonBlue: 0x3b82f6,
  neonPurple: 0xa855f7,
  neonMagenta: 0xd946ef,
  neonEmerald: 0x10b981,
  neonRed: 0xef4444,
  glassRefract: 0x818cf8,
};

/**
 * Procedural PlayStation 5 DualSense Controller 3D Model
 */
export function createPlayStationController(options: {
  lightbarColor?: number;
} = {}): {
  group: THREE.Group;
  lightbarMesh: THREE.Mesh;
  lightbarMaterial: THREE.MeshStandardMaterial;
  analogLeft: THREE.Group;
  analogRight: THREE.Group;
  actionButtons: THREE.Group;
  portalMesh?: THREE.Mesh;
  update: (time: number) => void;
  setLightbarColor: (color: number) => void;
} {
  const group = new THREE.Group();
  group.name = 'PlayStation5_DualSense_Controller';

  // Base materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.obsidianBody,
    roughness: 0.35,
    metalness: 0.25,
  });

  const gripMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.rubberGrip,
    roughness: 0.7,
    metalness: 0.1,
  });

  const glossBlackMaterial = new THREE.MeshStandardMaterial({
    color: COLORS.darkTrim,
    roughness: 0.15,
    metalness: 0.6,
  });

  const thumbstickRubber = new THREE.MeshStandardMaterial({
    color: 0x1a1a24,
    roughness: 0.8,
    metalness: 0.05,
  });

  const chromeStemMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.1,
    metalness: 0.9,
  });

  // Glowing lightbar material
  const initialColor = options.lightbarColor || COLORS.neonPurple;
  const lightbarMaterial = new THREE.MeshStandardMaterial({
    color: initialColor,
    emissive: initialColor,
    emissiveIntensity: 2.4,
    roughness: 0.2,
    metalness: 0.1,
  });

  // 1. MAIN CENTRAL BODY
  const centerBodyGeo = new THREE.CylinderGeometry(1.4, 1.6, 1.2, 32);
  centerBodyGeo.scale(1.4, 0.45, 1.1);
  const centerBody = new THREE.Mesh(centerBodyGeo, bodyMaterial);
  centerBody.position.set(0, 0, 0);
  group.add(centerBody);

  // 2. ERGONOMIC HANDLES (LEFT & RIGHT GRIPS)
  const createHandle = (isLeft: boolean) => {
    const handleGroup = new THREE.Group();
    const sign = isLeft ? -1 : 1;

    // Curved handle cylinder
    const gripGeo = new THREE.CylinderGeometry(0.55, 0.38, 2.8, 24);
    gripGeo.scale(1.1, 1.0, 0.85);
    const gripMesh = new THREE.Mesh(gripGeo, gripMaterial);
    gripMesh.rotation.z = sign * 0.38;
    gripMesh.rotation.x = -0.15;
    gripMesh.position.set(sign * 1.9, -1.0, 0.1);
    handleGroup.add(gripMesh);

    // Bottom ergonomic bulb
    const bottomBulbGeo = new THREE.SphereGeometry(0.42, 20, 20);
    bottomBulbGeo.scale(0.9, 1.2, 0.8);
    const bottomBulb = new THREE.Mesh(bottomBulbGeo, bodyMaterial);
    bottomBulb.position.set(sign * 2.38, -2.1, 0.3);
    handleGroup.add(bottomBulb);

    // Upper bridge wing
    const wingGeo = new THREE.CylinderGeometry(0.65, 0.75, 1.2, 20);
    wingGeo.scale(1.2, 0.6, 1.0);
    const wing = new THREE.Mesh(wingGeo, bodyMaterial);
    wing.rotation.z = sign * 0.25;
    wing.position.set(sign * 1.3, -0.2, -0.05);
    handleGroup.add(wing);

    return handleGroup;
  };

  group.add(createHandle(true));
  group.add(createHandle(false));

  // 3. CENTRAL TOUCHPAD PLATE & GLOWING LIGHTBAR SURROUND
  // Touchpad surface
  const touchpadGeo = new THREE.BoxGeometry(1.6, 0.12, 1.1);
  const touchpadMesh = new THREE.Mesh(touchpadGeo, glossBlackMaterial);
  touchpadMesh.position.set(0, 0.28, -0.2);
  group.add(touchpadMesh);

  // Glowing Lightbar Contour hugging touchpad
  const lightbarGeo = new THREE.TorusGeometry(0.95, 0.045, 16, 40, Math.PI);
  lightbarGeo.scale(1.0, 0.3, 0.7);
  const lightbarMesh = new THREE.Mesh(lightbarGeo, lightbarMaterial);
  lightbarMesh.rotation.x = Math.PI / 2;
  lightbarMesh.rotation.z = Math.PI;
  lightbarMesh.position.set(0, 0.32, -0.22);
  group.add(lightbarMesh);

  // Second inner lightbar strip
  const lightbarStripGeo = new THREE.BoxGeometry(1.5, 0.04, 0.06);
  const lightbarStrip = new THREE.Mesh(lightbarStripGeo, lightbarMaterial);
  lightbarStrip.position.set(0, 0.33, 0.35);
  group.add(lightbarStrip);

  // 4. ANALOG THUMBSTICKS (LEFT & RIGHT)
  const createThumbstick = (xOffset: number) => {
    const stickGroup = new THREE.Group();
    stickGroup.position.set(xOffset, 0.15, 0.45);

    // Recessed well
    const wellGeo = new THREE.CylinderGeometry(0.55, 0.45, 0.15, 24);
    const well = new THREE.Mesh(wellGeo, glossBlackMaterial);
    well.position.y = 0.05;
    stickGroup.add(well);

    // Chrome stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.4, 16);
    const stem = new THREE.Mesh(stemGeo, chromeStemMaterial);
    stem.position.y = 0.22;
    stickGroup.add(stem);

    // Ergonomic concave rubber cap
    const capGeo = new THREE.CylinderGeometry(0.42, 0.36, 0.18, 24);
    const cap = new THREE.Mesh(capGeo, thumbstickRubber);
    cap.position.y = 0.4;

    // Ribbed perimeter ring
    const rimGeo = new THREE.TorusGeometry(0.38, 0.045, 12, 28);
    rimGeo.rotateX(Math.PI / 2);
    const rim = new THREE.Mesh(rimGeo, thumbstickRubber);
    rim.position.y = 0.48;
    stickGroup.add(cap);
    stickGroup.add(rim);

    return stickGroup;
  };

  const analogLeft = createThumbstick(-0.75);
  const analogRight = createThumbstick(0.75);
  group.add(analogLeft);
  group.add(analogRight);

  // 5. D-PAD (DIRECTIONAL BUTTONS ON LEFT)
  const dpadGroup = new THREE.Group();
  dpadGroup.position.set(-1.25, 0.28, -0.3);

  const dpadBaseGeo = new THREE.CylinderGeometry(0.6, 0.65, 0.12, 24);
  const dpadBase = new THREE.Mesh(dpadBaseGeo, glossBlackMaterial);
  dpadGroup.add(dpadBase);

  // Directional wings
  const wingPositions = [
    { pos: [0, 0.08, -0.28], rot: 0 }, // Up
    { pos: [0, 0.08, 0.28], rot: Math.PI }, // Down
    { pos: [-0.28, 0.08, 0], rot: Math.PI / 2 }, // Left
    { pos: [0.28, 0.08, 0], rot: -Math.PI / 2 }, // Right
  ];

  wingPositions.forEach((w) => {
    const wingGeo = new THREE.BoxGeometry(0.24, 0.16, 0.32);
    const wing = new THREE.Mesh(wingGeo, bodyMaterial);
    wing.position.set(w.pos[0], w.pos[1], w.pos[2]);
    dpadGroup.add(wing);

    // Subtle cyan arrow marker
    const arrowGeo = new THREE.ConeGeometry(0.06, 0.08, 3);
    const arrowMat = new THREE.MeshStandardMaterial({
      color: COLORS.neonCyan,
      emissive: COLORS.neonCyan,
      emissiveIntensity: 1.2,
    });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.rotation.y = w.rot;
    arrow.rotation.x = Math.PI / 2;
    arrow.position.set(w.pos[0], w.pos[1] + 0.09, w.pos[2]);
    dpadGroup.add(arrow);
  });

  group.add(dpadGroup);

  // 6. ACTION BUTTONS (△, ○, ✕, □ ON RIGHT)
  const actionGroup = new THREE.Group();
  actionGroup.position.set(1.25, 0.28, -0.3);

  const actionBaseGeo = new THREE.CylinderGeometry(0.6, 0.65, 0.12, 24);
  const actionBase = new THREE.Mesh(actionBaseGeo, glossBlackMaterial);
  actionGroup.add(actionBase);

  // The 4 iconic symbols with vibrant colored illumination
  const buttonsData = [
    { name: 'Triangle', color: 0x10b981, symbol: '△', x: 0, z: -0.28 }, // Green/Emerald
    { name: 'Circle', color: 0xef4444, symbol: '○', x: 0.28, z: 0 }, // Red
    { name: 'Cross', color: 0x3b82f6, symbol: '✕', x: 0, z: 0.28 }, // Blue
    { name: 'Square', color: 0xd946ef, symbol: '□', x: -0.28, z: 0 }, // Magenta/Pink
  ];

  buttonsData.forEach((b) => {
    // Button cylinder
    const btnGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.14, 20);
    const btnMesh = new THREE.Mesh(btnGeo, glossBlackMaterial);
    btnMesh.position.set(b.x, 0.08, b.z);
    actionGroup.add(btnMesh);

    // Glowing symbol cap
    const symbolMat = new THREE.MeshStandardMaterial({
      color: b.color,
      emissive: b.color,
      emissiveIntensity: 2.2,
      roughness: 0.2,
    });

    if (b.name === 'Triangle') {
      const triGeo = new THREE.ConeGeometry(0.065, 0.04, 3);
      const tri = new THREE.Mesh(triGeo, symbolMat);
      tri.position.set(b.x, 0.16, b.z);
      actionGroup.add(tri);
    } else if (b.name === 'Circle') {
      const circGeo = new THREE.TorusGeometry(0.055, 0.015, 8, 16);
      circGeo.rotateX(Math.PI / 2);
      const circ = new THREE.Mesh(circGeo, symbolMat);
      circ.position.set(b.x, 0.16, b.z);
      actionGroup.add(circ);
    } else if (b.name === 'Cross') {
      const crossPart1 = new THREE.BoxGeometry(0.09, 0.02, 0.02);
      const crossPart2 = new THREE.BoxGeometry(0.02, 0.02, 0.09);
      const cross1 = new THREE.Mesh(crossPart1, symbolMat);
      const cross2 = new THREE.Mesh(crossPart2, symbolMat);
      cross1.position.set(b.x, 0.16, b.z);
      cross2.position.set(b.x, 0.16, b.z);
      actionGroup.add(cross1);
      actionGroup.add(cross2);
    } else {
      // Square
      const sqGeo = new THREE.BoxGeometry(0.09, 0.02, 0.09);
      const sq = new THREE.Mesh(sqGeo, symbolMat);
      sq.position.set(b.x, 0.16, b.z);
      actionGroup.add(sq);
    }
  });

  group.add(actionGroup);

  // 7. CENTER PS LOGO BUTTON & MICRO BUTTONS
  const psBtnGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 20);
  const psBtnMat = new THREE.MeshStandardMaterial({
    color: 0x222230,
    emissive: COLORS.neonPurple,
    emissiveIntensity: 0.6,
    metalness: 0.8,
    roughness: 0.2,
  });
  const psBtn = new THREE.Mesh(psBtnGeo, psBtnMat);
  psBtn.position.set(0, 0.22, 0.65);
  group.add(psBtn);

  // Create & Options tiny buttons
  [-0.72, 0.72].forEach((x) => {
    const pillGeo = new THREE.CapsuleGeometry(0.04, 0.12, 8, 12);
    pillGeo.rotateX(Math.PI / 2);
    const pill = new THREE.Mesh(pillGeo, bodyMaterial);
    pill.position.set(x, 0.25, -0.42);
    group.add(pill);
  });

  // 8. SHOULDER TRIGGERS (L1, R1, L2, R2)
  [-1.35, 1.35].forEach((x) => {
    const bumperGeo = new THREE.BoxGeometry(0.75, 0.28, 0.4);
    const bumper = new THREE.Mesh(bumperGeo, glossBlackMaterial);
    bumper.position.set(x, 0.12, -0.85);
    bumper.rotation.x = -0.3;
    group.add(bumper);

    const triggerGeo = new THREE.BoxGeometry(0.65, 0.45, 0.35);
    const trigger = new THREE.Mesh(triggerGeo, bodyMaterial);
    trigger.position.set(x, -0.15, -1.05);
    trigger.rotation.x = -0.55;
    group.add(trigger);
  });

  // Tilt controller toward camera with natural heroic stance
  group.rotation.x = 0.55;
  group.rotation.y = -0.15;
  group.rotation.z = 0.08;

  // Helper animation loop
  const update = (time: number) => {
    // Subtle breathing / floating motion
    group.position.y = Math.sin(time * 1.5) * 0.08;

    // Gentle thumbstick organic idle motion
    analogLeft.rotation.x = Math.sin(time * 2.1) * 0.08;
    analogLeft.rotation.z = Math.cos(time * 1.8) * 0.08;
    analogRight.rotation.x = Math.cos(time * 1.9) * 0.06;
    analogRight.rotation.z = Math.sin(time * 2.3) * 0.06;

    // Lightbar breathing intensity pulse
    const pulse = 2.0 + Math.sin(time * 3.0) * 0.4;
    lightbarMaterial.emissiveIntensity = pulse;
  };

  const setLightbarColor = (hex: number) => {
    lightbarMaterial.color.setHex(hex);
    lightbarMaterial.emissive.setHex(hex);
  };

  return {
    group,
    lightbarMesh,
    lightbarMaterial,
    analogLeft,
    analogRight,
    actionButtons: actionGroup,
    update,
    setLightbarColor,
  };
}

/**
 * Procedural Floating Holographic Crystalline PlayStation Symbols
 * (Triangle △, Circle ○, Cross ✕, Square □)
 */
export function createHolographicSymbols(): {
  group: THREE.Group;
  symbols: Array<{ mesh: THREE.Mesh | THREE.Group; update: (t: number) => void }>;
  update: (time: number) => void;
} {
  const group = new THREE.Group();
  group.name = 'Holographic_PlayStation_Symbols';

  const symbols: Array<{ mesh: THREE.Mesh | THREE.Group; update: (t: number) => void }> = [];

  // Crystal glass shader material
  const createCrystalMaterial = (glowColor: number) =>
    new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: glowColor,
      emissiveIntensity: 1.8,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.85,
      thickness: 1.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.88,
    });

  // 1. TRIANGLE (△) - Upper Left
  const triMat = createCrystalMaterial(COLORS.neonCyan);
  const triGeo = new THREE.ConeGeometry(0.48, 0.35, 3);
  const triangle = new THREE.Mesh(triGeo, triMat);
  triangle.position.set(-2.8, 1.8, -1.2);
  triangle.rotation.x = 0.4;
  triangle.rotation.z = 0.2;
  group.add(triangle);

  symbols.push({
    mesh: triangle,
    update: (t) => {
      triangle.rotation.y = t * 0.6;
      triangle.position.y = 1.8 + Math.sin(t * 1.8) * 0.15;
    },
  });

  // 2. CIRCLE (○) - Upper Center Right
  const circMat = createCrystalMaterial(COLORS.neonBlue);
  const circGeo = new THREE.TorusGeometry(0.38, 0.08, 16, 32);
  const circle = new THREE.Mesh(circGeo, circMat);
  circle.position.set(2.4, 2.2, -1.5);
  circle.rotation.x = 0.6;
  group.add(circle);

  symbols.push({
    mesh: circle,
    update: (t) => {
      circle.rotation.x = 0.6 + Math.sin(t * 0.8) * 0.2;
      circle.rotation.y = t * 0.5;
      circle.position.y = 2.2 + Math.cos(t * 1.5) * 0.14;
    },
  });

  // 3. SQUARE (□) - Far Top Right
  const sqMat = createCrystalMaterial(COLORS.neonPurple);
  const sqGroup = new THREE.Group();
  sqGroup.position.set(3.2, 1.2, -0.8);

  const sqFrameGeo = new THREE.BoxGeometry(0.65, 0.65, 0.14);
  const sqFrame = new THREE.Mesh(sqFrameGeo, sqMat);
  sqGroup.add(sqFrame);
  sqGroup.rotation.z = 0.4;
  group.add(sqGroup);

  symbols.push({
    mesh: sqGroup,
    update: (t) => {
      sqGroup.rotation.y = t * 0.7;
      sqGroup.rotation.x = Math.sin(t * 1.2) * 0.3;
      sqGroup.position.y = 1.2 + Math.sin(t * 2.0 + 1) * 0.12;
    },
  });

  // 4. CROSS (✕) - Lower Right
  const crossMat = createCrystalMaterial(COLORS.neonMagenta);
  const crossGroup = new THREE.Group();
  crossGroup.position.set(2.6, -1.8, -0.6);

  const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.12), crossMat);
  const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, 0.12), crossMat);
  bar1.rotation.z = Math.PI / 4;
  bar2.rotation.z = Math.PI / 4;
  crossGroup.add(bar1);
  crossGroup.add(bar2);
  group.add(crossGroup);

  symbols.push({
    mesh: crossGroup,
    update: (t) => {
      crossGroup.rotation.z = Math.PI / 4 + t * 0.4;
      crossGroup.rotation.y = Math.cos(t * 1.1) * 0.25;
      crossGroup.position.y = -1.8 + Math.sin(t * 1.6 + 2) * 0.15;
    },
  });

  // 5. MINI TRIANGLE (△) - Lower Left
  const miniTri = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.22, 3), createCrystalMaterial(COLORS.neonBlue));
  miniTri.position.set(-2.5, -1.9, -0.4);
  miniTri.rotation.z = 0.8;
  group.add(miniTri);

  symbols.push({
    mesh: miniTri,
    update: (t) => {
      miniTri.rotation.y = -t * 0.8;
      miniTri.position.y = -1.9 + Math.cos(t * 1.4) * 0.12;
    },
  });

  const update = (time: number) => {
    symbols.forEach((s) => s.update(time));
  };

  return { group, symbols, update };
}

/**
 * Neon Gateway / Portal Frame
 * (Matches the glowing rectangular frame in reference image)
 */
export function createNeonPortal(): {
  group: THREE.Group;
  update: (time: number) => void;
} {
  const group = new THREE.Group();
  group.name = 'Neon_Portal_Frame';

  const frameWidth = 4.8;
  const frameHeight = 5.6;
  const tubeRadius = 0.055;

  // Outer glowing tube frame
  const portalCurve = new THREE.CurvePath<THREE.Vector3>();
  const hw = frameWidth / 2;
  const hh = frameHeight / 2;

  const p1 = new THREE.Vector3(-hw, -hh, 0);
  const p2 = new THREE.Vector3(hw, -hh, 0);
  const p3 = new THREE.Vector3(hw, hh, 0);
  const p4 = new THREE.Vector3(-hw, hh, 0);

  portalCurve.add(new THREE.LineCurve3(p1, p2));
  portalCurve.add(new THREE.LineCurve3(p2, p3));
  portalCurve.add(new THREE.LineCurve3(p3, p4));
  portalCurve.add(new THREE.LineCurve3(p4, p1));

  const portalGeo = new THREE.TubeGeometry(portalCurve, 64, tubeRadius, 12, true);

  const portalMat = new THREE.MeshStandardMaterial({
    color: COLORS.neonBlue,
    emissive: COLORS.neonPurple,
    emissiveIntensity: 3.0,
    roughness: 0.1,
    metalness: 0.2,
  });

  const portalMesh = new THREE.Mesh(portalGeo, portalMat);
  portalMesh.position.set(0.6, 0.3, -2.4);
  portalMesh.rotation.y = -0.1;
  group.add(portalMesh);

  // Soft translucent luminous plane inside frame
  const backdropPlaneGeo = new THREE.PlaneGeometry(frameWidth * 0.96, frameHeight * 0.96);
  const backdropPlaneMat = new THREE.MeshBasicMaterial({
    color: 0x1e1b4b,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });
  const backdropPlane = new THREE.Mesh(backdropPlaneGeo, backdropPlaneMat);
  backdropPlane.position.copy(portalMesh.position);
  backdropPlane.position.z -= 0.05;
  backdropPlane.rotation.copy(portalMesh.rotation);
  group.add(backdropPlane);

  const update = (time: number) => {
    // Dynamic color wave between cyan, blue and purple
    const hue = (Math.sin(time * 0.4) + 1) * 0.5;
    portalMat.emissive.setHSL(0.65 + hue * 0.15, 0.9, 0.55);
  };

  return { group, update };
}

/**
 * Atmospheric Floating Dust & Sparks
 */
export function createAtmosphericSparks(count = 75): {
  particles: THREE.Points;
  update: (time: number) => void;
} {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

    scales[i] = Math.random() * 0.06 + 0.02;

    velocities[i * 3] = (Math.random() - 0.5) * 0.008;
    velocities[i * 3 + 1] = Math.random() * 0.008 + 0.002;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: COLORS.neonCyan,
    size: 0.08,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
  });

  const particles = new THREE.Points(geometry, material);

  const update = () => {
    const pos = geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3] += velocities[i * 3];

      // Recycle if too high
      if (pos[i * 3 + 1] > 4.5) {
        pos[i * 3 + 1] = -4.0;
        pos[i * 3] = (Math.random() - 0.5) * 12;
      }
    }
    geometry.attributes.position.needsUpdate = true;
  };

  return { particles, update };
}
