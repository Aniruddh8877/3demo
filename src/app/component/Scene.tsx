"use client";
import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Scene() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        loader.load('/scene.gltf', function (gltf) {
            scene.add(gltf.scene);
            console.log("gltf is lodaded ",gltf);
        }, undefined, function (error) {
            console.error(error);
        });

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        return () => {
            document.body.removeChild(renderer.domElement);
        };
    }, []);

    return null;
}
