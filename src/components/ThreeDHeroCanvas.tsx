import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Layers, Eye, Compass } from 'lucide-react';

export type TileMaterialType = 'statuario' | 'onyx' | 'black' | 'emerald';
export type TileFinishType = 'gloss' | 'matte';

interface ThreeDHeroCanvasProps {
  onOpenFlipbook?: () => void;
}

// Procedural high-res texture generation for realistic stone surfaces
function createProceduralTileTexture(type: TileMaterialType, isGloss: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  if (type === 'statuario') {
    // Statuario Royal White Italian Marble
    ctx.fillStyle = '#f8f8fa';
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle background marbling
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = `rgba(220, 222, 228, ${Math.random() * 0.08})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 80 + 20, 0, Math.PI * 2);
      ctx.fill();
    }

    // Dramatic grey & slate veins
    const drawVein = (startX: number, startY: number, color: string, width: number, branches: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      let x = startX;
      let y = startY;
      ctx.moveTo(x, y);

      for (let j = 0; j < 40; j++) {
        x += (Math.random() - 0.45) * 45;
        y += Math.random() * 32 + 10;
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Branching veins
      for (let b = 0; b < branches; b++) {
        ctx.lineWidth = width * 0.4;
        ctx.beginPath();
        let bx = startX + (Math.random() * 300 - 150);
        let by = startY + (Math.random() * 600);
        ctx.moveTo(bx, by);
        for (let k = 0; k < 20; k++) {
          bx += (Math.random() - 0.3) * 35;
          by += Math.random() * 25 + 5;
          ctx.lineTo(bx, by);
        }
        ctx.stroke();
      }
    };

    drawVein(250, 0, 'rgba(85, 90, 100, 0.45)', 9, 3);
    drawVein(700, 0, 'rgba(110, 115, 125, 0.4)', 6, 2);
    drawVein(480, 100, 'rgba(180, 150, 95, 0.35)', 4, 1); // Subtle gold vein

  } else if (type === 'onyx') {
    // Armani Gold Onyx
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#cda165');
    grad.addColorStop(0.3, '#ebd4a8');
    grad.addColorStop(0.6, '#b88646');
    grad.addColorStop(1, '#9b6c31');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Warm translucent layers
    for (let i = 0; i < 60; i++) {
      ctx.fillStyle = `rgba(255, 245, 220, ${Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.ellipse(Math.random() * 1024, Math.random() * 1024, Math.random() * 200 + 50, Math.random() * 80 + 20, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Honey crystalline bands
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 5;
    for (let c = 0; c < 5; c++) {
      ctx.beginPath();
      let cx = 100 * c;
      let cy = 0;
      ctx.moveTo(cx, cy);
      for (let s = 0; s < 30; s++) {
        cx += Math.sin(s * 0.4) * 20 + 25;
        cy += 35;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

  } else if (type === 'black') {
    // Z Black Galaxy Mirror Granite
    ctx.fillStyle = '#111215';
    ctx.fillRect(0, 0, 1024, 1024);

    // Granite crystalline grain
    for (let i = 0; i < 3000; i++) {
      const shade = Math.floor(Math.random() * 80 + 40);
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade + 10}, ${Math.random() * 0.35})`;
      ctx.fillRect(Math.random() * 1024, Math.random() * 1024, Math.random() * 4 + 1, Math.random() * 4 + 1);
    }

    // Golden galaxy speckles
    for (let g = 0; g < 400; g++) {
      ctx.fillStyle = `rgba(245, 215, 120, ${Math.random() * 0.7 + 0.3})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 2.2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Fine quartz highlights
    for (let q = 0; q < 180; q++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

  } else {
    // Emerald Jade Marble
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#0c2e24');
    grad.addColorStop(0.5, '#16483a');
    grad.addColorStop(1, '#081e18');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Deep jade swirls
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `rgba(32, 110, 88, ${Math.random() * 0.25})`;
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 1024, Math.random() * 180 + 40, 0, Math.PI * 2);
      ctx.fill();
    }

    // Crisp white calcite veins
    ctx.strokeStyle = 'rgba(235, 250, 242, 0.55)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    let ex = 150;
    let ey = 0;
    ctx.moveTo(ex, ey);
    for (let m = 0; m < 35; m++) {
      ex += (Math.random() - 0.4) * 40;
      ey += Math.random() * 30 + 15;
      ctx.lineTo(ex, ey);
    }
    ctx.stroke();
  }

  // Edge bevel highlight for 3D realism
  ctx.strokeStyle = isGloss ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, 1018, 1018);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  return texture;
}

export const ThreeDHeroCanvas: React.FC<ThreeDHeroCanvasProps> = ({
  onOpenFlipbook
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<TileMaterialType>('statuario');
  const [selectedFinish, setSelectedFinish] = useState<TileFinishType>('gloss');
  const [isRotating, setIsRotating] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  // Scene references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const tileMeshRef = useRef<THREE.Mesh | null>(null);
  const pointerLightRef = useRef<THREE.PointLight | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const rotationVelocityRef = useRef({ x: 0, y: 0.005 });
  const mousePreviousRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initialize Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Add Lighting Setup (Architectural Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const mainStudioLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    mainStudioLight.position.set(4, 5, 5);
    scene.add(mainStudioLight);

    const rimLight = new THREE.DirectionalLight(0xd4e2ff, 1.2);
    rimLight.position.set(-5, -3, 3);
    scene.add(rimLight);

    // Interactive mouse cursor point light
    const pointerLight = new THREE.PointLight(0xffffff, 1.2, 12);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);
    pointerLightRef.current = pointerLight;

    // 3. Create 3D Tile Slab Geometry (1200 x 2400 mm proportion)
    // Box width: 2.3, height: 4.4, depth: 0.12 (chamfered slab look)
    const geometry = new THREE.BoxGeometry(2.3, 4.3, 0.12, 4, 4, 2);

    // Generate initial texture
    const tileTexture = createProceduralTileTexture('statuario', true);

    const tileMaterial = new THREE.MeshPhysicalMaterial({
      map: tileTexture,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0e2e6,
      roughness: 0.35,
      metalness: 0.2
    });

    // Multi-material for front/back face vs slab edges
    const materials = [
      edgeMaterial, // right
      edgeMaterial, // left
      edgeMaterial, // top
      edgeMaterial, // bottom
      tileMaterial, // front face (vitrified gloss)
      edgeMaterial  // back face (bisque ceramic)
    ];

    const tileMesh = new THREE.Mesh(geometry, materials);
    // Initial slight luxury tilt
    tileMesh.rotation.x = 0.15;
    tileMesh.rotation.y = -0.35;
    scene.add(tileMesh);
    tileMeshRef.current = tileMesh;

    // 4. Add subtle floating particles
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xcca86e,
      size: 0.04,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 5. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (tileMeshRef.current) {
        // Subtle floating oscillation
        tileMeshRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.08;

        // Auto-rotation if enabled and user not actively dragging
        if (isRotating && !isUserInteracting) {
          tileMeshRef.current.rotation.y += 0.005;
        }
      }

      // Slowly rotate particle field
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize handling
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

    // Clean up
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      tileMaterial.dispose();
      edgeMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update texture when material or finish toggles
  useEffect(() => {
    if (!tileMeshRef.current) return;
    const isGloss = selectedFinish === 'gloss';
    const newTexture = createProceduralTileTexture(selectedMaterial, isGloss);

    const materials = tileMeshRef.current.material as THREE.Material[];
    const frontMat = materials[4] as THREE.MeshPhysicalMaterial;

    if (frontMat) {
      frontMat.map = newTexture;
      frontMat.roughness = isGloss ? 0.08 : 0.65;
      frontMat.clearcoat = isGloss ? 1.0 : 0.15;
      frontMat.clearcoatRoughness = isGloss ? 0.05 : 0.5;
      frontMat.needsUpdate = true;
    }

    // Update edge color to match material tone
    const edgeMat = materials[0] as THREE.MeshStandardMaterial;
    if (edgeMat) {
      if (selectedMaterial === 'black') {
        edgeMat.color.setHex(0x1a1a1c);
      } else if (selectedMaterial === 'onyx') {
        edgeMat.color.setHex(0xb5925e);
      } else if (selectedMaterial === 'emerald') {
        edgeMat.color.setHex(0x13382c);
      } else {
        edgeMat.color.setHex(0xe5e7eb);
      }
      edgeMat.needsUpdate = true;
    }
  }, [selectedMaterial, selectedFinish]);

  // Pointer drag controls for 3D rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsUserInteracting(true);
    mousePreviousRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Dynamic lighting follows cursor position
    if (containerRef.current && pointerLightRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerLightRef.current.position.x = nx * 3.5;
      pointerLightRef.current.position.y = ny * 3.5;
    }

    if (!isUserInteracting || !tileMeshRef.current) return;

    const deltaX = e.clientX - mousePreviousRef.current.x;
    const deltaY = e.clientY - mousePreviousRef.current.y;

    tileMeshRef.current.rotation.y += deltaX * 0.01;
    tileMeshRef.current.rotation.x += deltaY * 0.008;

    mousePreviousRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsUserInteracting(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const resetRotation = () => {
    if (tileMeshRef.current) {
      tileMeshRef.current.rotation.x = 0.15;
      tileMeshRef.current.rotation.y = -0.35;
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-neutral-900 to-black border border-white/10 shadow-2xl p-4 sm:p-6 group">
      
      {/* Top Glass Header Overlay */}
      <div className="flex items-center justify-between z-10 relative mb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
            Interactive 3D Porcelain Slab
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-all flex items-center space-x-1 ${
              isRotating
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
            title="Toggle 360° Auto-Rotation"
          >
            <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isRotating ? 'Rotating' : 'Paused'}</span>
          </button>

          <button
            onClick={resetRotation}
            className="px-2 py-1 text-[10px] font-bold uppercase rounded-md bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset Angle"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-[320px] sm:h-[390px] cursor-grab active:cursor-grabbing touch-none select-none relative"
      >
        {/* Subtle helper watermark */}
        <div className="absolute bottom-2 left-2 pointer-events-none text-[9px] uppercase tracking-widest font-mono text-white/30 flex items-center space-x-1">
          <Compass className="w-3 h-3 text-amber-400/50" />
          <span>Drag in any direction to inspect 360° bevel & thickness</span>
        </div>

        {/* Dimension pill */}
        <div className="absolute top-2 right-2 pointer-events-none bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-mono text-gray-300">
          1200 × 2400 mm • 9mm Slim Slabs
        </div>
      </div>

      {/* Bottom Material Selector Bar */}
      <div className="mt-3 pt-3 border-t border-white/10 space-y-2.5 z-10 relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Surface Material Switcher */}
          <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest mr-1 font-bold">Surface:</span>
            
            <button
              onClick={() => setSelectedMaterial('statuario')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all border ${
                selectedMaterial === 'statuario'
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Statuario White
            </button>

            <button
              onClick={() => setSelectedMaterial('onyx')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all border ${
                selectedMaterial === 'onyx'
                  ? 'bg-amber-400 text-black border-amber-300 shadow-md font-extrabold'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Gold Onyx
            </button>

            <button
              onClick={() => setSelectedMaterial('black')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all border ${
                selectedMaterial === 'black'
                  ? 'bg-neutral-800 text-white border-neutral-600 shadow-md ring-1 ring-amber-400/50'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Z-Black Galaxy
            </button>

            <button
              onClick={() => setSelectedMaterial('emerald')}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md transition-all border ${
                selectedMaterial === 'emerald'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
              }`}
            >
              Emerald Jade
            </button>
          </div>

          {/* Sheen Switcher (Gloss / Matte) */}
          <div className="flex items-center space-x-1 bg-black/50 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setSelectedFinish('gloss')}
              className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${
                selectedFinish === 'gloss'
                  ? 'bg-amber-400 text-black font-extrabold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ✨ High Gloss
            </button>
            <button
              onClick={() => setSelectedFinish('matte')}
              className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded transition-all ${
                selectedFinish === 'matte'
                  ? 'bg-white text-black font-extrabold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🪵 Satin Matte
            </button>
          </div>
        </div>

        {/* Quick CTA row below 3D canvas */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center space-x-3 text-[10px] text-gray-400 uppercase tracking-widest font-mono">
            <span className="flex items-center text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5" />
              100% Vitrified GVT
            </span>
            <span>•</span>
            <span>Zero Water Absorption</span>
          </div>
        </div>
      </div>

    </div>
  );
};
