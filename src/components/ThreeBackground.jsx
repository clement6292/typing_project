import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Sphere,
  Stars,
  Environment,
  MeshDistortMaterial
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const AnimatedLight = () => {
  const lightRef = useRef();
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime) * 0.3;
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 6;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 6;
    }
  });
  return <directionalLight ref={lightRef} position={[6, 8, 6]} castShadow color="#2563eb" />;
};

const DataParticles = ({ count = 18 }) => {
  const meshRef = useRef();
  const colors = ["#2563eb", "#38bdf8", "#6366f1"];
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 + 1,
        (Math.random() - 0.5) * 10
      ],
      speed: Math.random() * 0.01 + 0.005,
      scale: Math.random() * 0.25 + 0.08,
      color: colors[i % colors.length]
    }));
  }, [count]);

  useFrame((state) => {
    meshRef.current?.children.forEach((child, i) => {
      const particle = particles[i];
      child.position.y += Math.sin(state.clock.elapsedTime * particle.speed + i) * 0.008;
      child.rotation.x += particle.speed;
      child.rotation.y += particle.speed * 0.5;
    });
  });

  return (
    <group ref={meshRef}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[0.09, 16, 16]} position={p.position} scale={p.scale}>
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.22}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const CentralBlob = () => (
  <Float speed={1.2} rotationIntensity={0.7} floatIntensity={0.7}>
    <Sphere args={[2.2, 64, 64]} position={[0, 0, 0]} castShadow receiveShadow>
      <MeshDistortMaterial
        color="#2563eb"
        distort={0.45}
        speed={2.2}
        roughness={0.08}
        metalness={0.85}
        emissive="#3b82f6"
        emissiveIntensity={0.5}
      />
    </Sphere>
  </Float>
);

function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        shadows
        style={{ background: '#0a1120' }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <Suspense fallback={null}>
          <Stars radius={60} depth={40} count={900} factor={2.2} saturation={0.12} fade speed={0.6} />
          <ambientLight intensity={0.5} color="#2563eb" />
          <AnimatedLight />
          <DataParticles count={18} />
          <CentralBlob />
          {/* Sol bleu foncé */}
          <mesh receiveShadow position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#1e293b" roughness={0.9} metalness={0.05} transparent opacity={0.85} />
          </mesh>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <Environment preset="city" />
          <EffectComposer>
            <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.97} height={300} intensity={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeBackground;
