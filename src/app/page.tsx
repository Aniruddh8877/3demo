"use client";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Scene from "./component/Scene";


function Model() {
  const result = useLoader(GLTFLoader, '/bmw_g20_330i/scene.gltf');
  return <primitive object={result.scene} scale={[50, 50, 50]} />
}
export default function Home() {
  return (
    <div className="h-screen w-full ">
      <Canvas camera={{ position: [8, 1, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />

        <OrbitControls />
        <Environment preset="city" />

        {/* <Scene />  */}
        <Model />
        {/* <mesh>
          <sphereGeometry args={[9, 10, 10]}   />
          <meshStandardMaterial  wireframe={true} color="red" />
        </mesh> */}
      </Canvas>
    </div>
  );
}
