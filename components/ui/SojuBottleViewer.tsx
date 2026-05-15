"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Types ───────────────────────────────────────────────────────────────────

interface BottleModelProps {
  url: string;
}

// ─── 3D Model ────────────────────────────────────────────────────────────────

function BottleModel({ url }: BottleModelProps) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  // Floating + slow spin animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    // Float up/down
    // groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    // Gentle sway
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.025;
    // Slow continuous Y-axis spin
    groupRef.current.rotation.y = t * 0.35;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.45} />
    </group>
  );
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);

    // Simulate progress (real progress needs a loader callback)
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) return p; // Hold near end until model is truly ready
        return p + Math.random() * 6;
      });
    }, 300);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm bg-transparent">
      {/* Animated soju glass icon */}
      <div className="relative mb-10 flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-[#a3e635]/10" />
        <div className="absolute inset-2 animate-pulse rounded-full bg-[#a3e635]/20" />
        <svg
          viewBox="0 0 48 48"
          className="relative h-12 w-12 text-[#a3e635]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Soju bottle silhouette */}
          <path
            d="M20 6 h8 v4 l2 4 v22 a2 2 0 0 1-2 2 H20 a2 2 0 0 1-2-2 V14 l2-4 V6 z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="18" y1="20" x2="30" y2="20" strokeOpacity="0.5" />
          <line x1="24" y1="6" x2="24" y2="10" />
        </svg>
      </div>

      {/* Korean label styling */}
      <p className="mb-1 font-mono text-xs uppercase tracking-[0.3em] text-[#a3e635]/60">
        Loading
      </p>
      <p className="mb-8 font-['Noto_Serif_KR',_serif] text-2xl font-bold text-white">
        소주 <span className="text-[#a3e635]">3D</span>
      </p>

      {/* Progress bar */}
      <div className="w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-1 rounded-full bg-[#a3e635] transition-all duration-300"
          style={{ width: `${Math.min(progress, 92)}%` }}
        />
      </div>

      <p className="mt-4 font-mono text-xs text-white/30">
        {Math.round(Math.min(progress, 92))}% — please wait{dots}
      </p>
    </div>
  );
}

// ─── Scene Setup ──────────────────────────────────────────────────────────────

function SceneSetup() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 3.5);
  }, [camera]);

  return null;
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface SojuBottle3DProps {
  /**
   * Path or URL to your .glb / .gltf model file.
   * Example: "/models/soju_bottle.glb"
   */
  modelUrl?: string;
}

export default function SojuBottle3D({
  modelUrl = "/models/soju-bottle.glb",
}: SojuBottle3DProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-transparent">
      {/* Loading overlay — hidden once model is ready */}
      {!loaded && <LoadingScreen />}

      {/* Canvas */}
      <Canvas
        className="absolute inset-0"
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <SceneSetup />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight
          position={[-4, 2, -4]}
          intensity={0.4}
          color="#a3e635"
        />
        <pointLight position={[0, -3, 2]} intensity={0.6} color="#00ffe7" />

        <Suspense fallback={null}>
          <BottleModel url={modelUrl} />
          <Environment preset="city" />
          {/* Signal that everything inside Suspense has resolved */}
          <OnLoaded onLoaded={() => setLoaded(true)} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
          rotateSpeed={0.55}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>

      {/* UI overlays */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
          Drag to rotate
        </p>
        {/* Rotate hint icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 animate-spin-slow text-white/20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4"
            strokeLinecap="round"
          />
          <polyline points="18 4 20 8 16 8" />
          <polyline points="6 20 4 16 8 16" />
        </svg>
      </div>

      {/* Brand badge */}
      <div
        className={`absolute left-6 top-6 transition-opacity duration-700 hidden ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="font-['Noto_Serif_KR',_serif] text-sm font-bold text-[#a3e635]">
          소주
        </p>
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
          3D Viewer
        </p>
      </div>
    </div>
  );
}

// ─── Helper: fires once Suspense resolves ─────────────────────────────────────

function OnLoaded({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
}
