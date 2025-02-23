"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef } from "react";
import * as THREE from "three"; // Import THREE for proper typing

function Model() {
  const result = useLoader(GLTFLoader, '/bmw_g20_330i/scene.gltf');
  const modelRef = useRef<THREE.Group | null>(null); // Fix: Type ref correctly

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += .01; // Fix: TypeScript now recognizes `rotation`
      // modelRef.current.rotation.x += .01;
    }
  });

  return <primitive ref={modelRef} object={result.scene} scale={[2, 2, 2]} />;
}

export default function Home() {
  return (
    <div className="h-screen w-full ">
      <Canvas camera={{ position: [8, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />

        <OrbitControls />
        <Environment preset="sunset" />
        <Model />
      </Canvas>
    </div>
  );
}
