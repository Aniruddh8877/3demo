"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div className="h-lvh w-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[1, 5, 5]} />
        <OrbitControls />
        <mesh>
          <sphereGeometry scale={[3, 3, 3]} />
          <meshBasicMaterial color="black"  wireframe={true}/>
        </mesh>
      </Canvas>
    </div>
  );
}
