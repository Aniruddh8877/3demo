"use client";
import { Environment, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useMemo } from "react";
import * as THREE from "three";

// Define the cinematic shots (keyframes) for the scroll journey
const CAMERA_KEYFRAMES = [
  { t: 0.00, pos: [7, 2, 6], lookAt: [0, 0.5, 0] },     // 1. Intro Wide
  { t: 0.15, pos: [2.5, 0.8, 3.8], lookAt: [1, 0.5, 2] }, // 2. Headlight close-up
  { t: 0.30, pos: [2, 0.4, 0.8], lookAt: [0, 0.2, 0.8] }, // 3. Alloy Rims (Side Low)
  { t: 0.45, pos: [0.3, 1.25, 0.2], lookAt: [0.35, 1.15, -0.5] }, // 4. Driver's Cockpit / Steering
  { t: 0.55, pos: [0.3, 1.2, 0.2], lookAt: [0, 1.1, -0.2] }, // 4b. Dashboard Pan
  { t: 0.70, pos: [0, 1.3, 1.9], lookAt: [0, 1.1, -0.5] }, // 5. Back Seat View
  { t: 0.85, pos: [-3, 1.2, -3.5], lookAt: [0, 0.7, -2] }, // 6. Tail Lights
  { t: 1.00, pos: [-6, 3, 4], lookAt: [0, 0, 0] },      // 7. Final Top Wide
];

function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const offset = scroll.offset; // 0 to 1

    // Find the current keyframe segment
    let startFrame = CAMERA_KEYFRAMES[0];
    let endFrame = CAMERA_KEYFRAMES[CAMERA_KEYFRAMES.length - 1];

    for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
      if (offset >= CAMERA_KEYFRAMES[i].t && offset <= CAMERA_KEYFRAMES[i + 1].t) {
        startFrame = CAMERA_KEYFRAMES[i];
        endFrame = CAMERA_KEYFRAMES[i + 1];
        break;
      }
    }

    // Normalize t between the two keyframes (0 to 1 for this segment)
    const range = endFrame.t - startFrame.t;
    const progress = (offset - startFrame.t) / range;

    // Interpolate Position
    const p1 = new THREE.Vector3(...startFrame.pos);
    const p2 = new THREE.Vector3(...endFrame.pos);
    currentPos.lerpVectors(p1, p2, progress);

    // Interpolate LookAt Target
    const l1 = new THREE.Vector3(...startFrame.lookAt);
    const l2 = new THREE.Vector3(...endFrame.lookAt);
    currentLook.lerpVectors(l1, l2, progress);

    // Apply to camera
    camera.position.copy(currentPos);
    camera.lookAt(currentLook);
  });

  return null;
}

function Model() {
  const result = useLoader(GLTFLoader, '/bmw_g20_330i/scene.gltf');
  return <primitive object={result.scene} scale={[2, 2, 2]} />;
}

export default function Home() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-950 to-black">
      <Canvas camera={{ position: [7, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <spotLight position={[-5, 5, 0]} intensity={1} angle={0.5} penumbra={1} />
        <Environment preset="night" />

        <ScrollControls pages={8} damping={0.15}>
          <CameraRig />
          <Model />

          <Scroll html style={{ width: '100%' }}>
            {/* 1. Intro */}
            <section className="h-screen w-full flex flex-col justify-center items-start p-20 text-white pointer-events-none">
              <h1 className="text-8xl font-bold mb-4 drop-shadow-2xl">The BMW 330i</h1>
              <p className="text-2xl font-light opacity-90">Sheer Driving Pleasure defined.</p>
            </section>

            {/* 2. Headlights */}
            <section className="h-screen w-full flex flex-col justify-center items-end p-20 text-white pointer-events-none">
              <div className="max-w-md text-right">
                <h2 className="text-5xl font-bold mb-4 text-blue-200">Laserlight Technology</h2>
                <p className="text-xl">
                  Adaptive LED headlights that illuminate the road like never before.
                </p>
              </div>
            </section>

            {/* 3. Rims */}
            <section className="h-screen w-full flex flex-col justify-end items-start p-20 pb-40 text-white pointer-events-none">
              <div className="max-w-md">
                <h2 className="text-5xl font-bold mb-4 text-gray-300">19" M Light Alloys</h2>
                <p className="text-xl">
                  Double-spoke style 791 M with performance tyres.
                </p>
              </div>
            </section>

            {/* 4. Cockpit */}
            <section className="h-screen w-full flex flex-col justify-center items-center p-20 text-white pointer-events-none">
              <div className="max-w-lg text-center bg-black/30 backdrop-blur-sm p-8 rounded-2xl">
                <h2 className="text-5xl font-bold mb-4 text-orange-100">Driver-Centric Cockpit</h2>
                <p className="text-xl">
                  BMW Live Cockpit Professional with fully digital display.
                </p>
              </div>
            </section>

            {/* 4b. Dashboard Details (Hidden Spacer or Extra Text) */}
            <section className="h-screen w-full hidden"></section>

            {/* 5. Back Seat */}
            <section className="h-screen w-full flex flex-col justify-center items-start p-20 text-white pointer-events-none">
              <div className="max-w-md bg-black/40 backdrop-blur-md p-6 rounded-xl">
                <h2 className="text-5xl font-bold mb-4">First-Class Comfort</h2>
                <p className="text-xl">
                  Spacious rear seating with dedicated climate control.
                </p>
              </div>
            </section>

            {/* 6. Tail Lights */}
            <section className="h-screen w-full flex flex-col justify-center items-end p-20 text-white pointer-events-none">
              <div className="max-w-md text-right">
                <h2 className="text-5xl font-bold mb-4 text-red-400">Iconic L-Shape Lights</h2>
                <p className="text-xl">
                  Full LED rear lights with 3D sculpted lenses.
                </p>
              </div>
            </section>

            {/* 7. Final CTA */}
            <section className="h-screen w-full flex flex-col justify-center items-center p-20 text-white text-center pointer-events-none">
              <h2 className="text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                Own the Road
              </h2>
              <button className="px-10 py-4 bg-white text-black text-2xl font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 shadow-lg cursor-pointer pointer-events-auto">
                Schedule Test Drive
              </button>
            </section>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
