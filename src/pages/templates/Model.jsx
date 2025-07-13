import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Custom Spinner component
function Spinner() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      background: "rgba(255,255,255,0.7)",
      zIndex: 10
    }}>
      <div style={{
        border: "6px solid #f3f3f3",
        borderTop: "6px solid #3498db",
        borderRadius: "50%",
        width: 40,
        height: 40,
        animation: "spin 1s linear infinite"
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ModelContent({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

export default function Model({ modelPath, initialZoom = 5 }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas camera={{ position: [0, 0, initialZoom] }} style={{ width: "100%", height: "100%" }}>
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Suspense for loading */}
        <Suspense fallback={<Spinner />}>
          <ModelContent modelPath={modelPath} />
        </Suspense>
        {/* Orbit Controls */}
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
}

// Optionally, preload the model for better performance
useGLTF.preload = useGLTF.preload || (() => {});