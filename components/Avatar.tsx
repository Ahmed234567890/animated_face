"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import VRMModel from "./VRMModel";

export default function Avatar() {
  return (
    <Canvas camera={{ position: [0, 1.2, 3], fov: 35 }}>
      <ambientLight intensity={2} />

      <directionalLight
        position={[3, 5, 3]}
        intensity={2}
      />

      <VRMModel />

      <OrbitControls
        target={[0, 1.0, 0]}
        enablePan={false}
      />
    </Canvas>
  );
}
