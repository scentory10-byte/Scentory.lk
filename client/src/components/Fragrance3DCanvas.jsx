import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Fragrance3DCanvas() {
  const mountRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);

    // Group for the entire perfume bottle
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);

    // 1. Crystal Glass Outer Flacon (Chamfered luxury cylinder)
    const glassGeometry = new THREE.CylinderGeometry(1.1, 1.25, 2.8, 32);
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111116,
      transparent: true,
      opacity: 0.55,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      ior: 1.52,
    });
    const glassFlacon = new THREE.Mesh(glassGeometry, glassMaterial);
    bottleGroup.add(glassFlacon);

    // 2. Liquid Fragrance Nectar inside (Golden Amber / Honey Glow)
    const liquidGeometry = new THREE.CylinderGeometry(0.95, 1.1, 2.3, 32);
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdfa038,
      emissive: 0x734808,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.88,
      roughness: 0.2,
      metalness: 0.15,
      transmission: 0.3
    });
    const liquidMesh = new THREE.Mesh(liquidGeometry, liquidMaterial);
    liquidMesh.position.y = -0.15;
    bottleGroup.add(liquidMesh);

    // 3. Golden Label Plate on Bottle
    const labelGeometry = new THREE.PlaneGeometry(1.2, 1.2);
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0x181820,
      metalness: 0.7,
      roughness: 0.3,
      side: THREE.DoubleSide
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.set(0, -0.1, 1.15);
    bottleGroup.add(labelMesh);

    // Label Gold Border Trim
    const borderGeometry = new THREE.RingGeometry(0.65, 0.67, 32);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.2,
      emissive: 0x5a4510,
      emissiveIntensity: 0.2
    });
    const borderMesh = new THREE.Mesh(borderGeometry, goldMaterial);
    borderMesh.position.set(0, -0.1, 1.16);
    bottleGroup.add(borderMesh);

    // 4. Gold Atomizer Collar
    const collarGeometry = new THREE.CylinderGeometry(0.5, 0.75, 0.45, 32);
    const collarMesh = new THREE.Mesh(collarGeometry, goldMaterial);
    collarMesh.position.y = 1.55;
    bottleGroup.add(collarMesh);

    // 5. Heavy Luxury Gold Cap
    const capGeometry = new THREE.CylinderGeometry(0.65, 0.65, 0.85, 32);
    const capMesh = new THREE.Mesh(capGeometry, goldMaterial);
    capMesh.position.y = 2.15;
    bottleGroup.add(capMesh);

    // Cap Ring Accent (Onyx black inlay)
    const capRingGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.2, 32);
    const onyxMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.4, metalness: 0.8 });
    const capRing = new THREE.Mesh(capRingGeo, onyxMaterial);
    capRing.position.y = 2.15;
    bottleGroup.add(capRing);

    // 6. Fragrance Golden Mist / Particle Cloud
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.5;
      positions[i * 3 + 1] = 1.8 + Math.random() * 2.8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;

      velocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: 0.008 + Math.random() * 0.012,
        z: (Math.random() - 0.5) * 0.008,
        resetY: 1.8
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf1d279,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xfcf6ba, 2.5);
    goldKeyLight.position.set(4, 5, 5);
    scene.add(goldKeyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffc83b, 1.8, 10);
    pointLight.position.set(0, 1, 2);
    scene.add(pointLight);

    // Interactive mouse tracking
    let targetRotationX = 0.15;
    let targetRotationY = 0.4;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile devices
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        targetRotationY += deltaX * 0.012;
        targetRotationX += deltaY * 0.012;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const handleTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize handler
    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let reqId;

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating oscillation
      bottleGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Smooth interpolation to target rotation
      if (!isDragging) {
        targetRotationY += 0.004; // subtle continuous idle spin
      }
      bottleGroup.rotation.y += (targetRotationY - bottleGroup.rotation.y) * 0.08;
      bottleGroup.rotation.x += (targetRotationX - bottleGroup.rotation.x) * 0.08;

      // Animate scent mist particles rising
      const posArray = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3] += velocities[i].x + Math.sin(elapsedTime + i) * 0.002;
        posArray[i * 3 + 2] += velocities[i].z;

        // Reset particle when it floats too high
        if (posArray[i * 3 + 1] > 4.6) {
          posArray[i * 3 + 1] = velocities[i].resetY;
          posArray[i * 3] = (Math.random() - 0.5) * 0.8;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      dom.removeEventListener('touchstart', handleTouchStart);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-[#d4af37]/30 text-[11px] text-[#f3e5ab] tracking-wider uppercase flex items-center gap-1.5 shadow-lg pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
        3D Interactive • Drag To Rotate Scent Flacon
      </div>
    </div>
  );
}
