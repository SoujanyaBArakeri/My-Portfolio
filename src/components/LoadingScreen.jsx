import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

function FloatingGeometry() {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh scale={1.2}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ParticleRing() {
  const pointsRef = useRef();
  const count = 100;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 2.5;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.005;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#06b6d4"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <FloatingGeometry />
      <ParticleRing />
    </>
  );
}

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.inOut',
        onComplete: () => setIsLoading(false)
      });
    }
  }, [progress]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="loader-3d">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <Scene />
        </Canvas>
      </div>
      <div className="loader-content" ref={textRef}>
        <div className="loader-text">SA</div>
        <div className="loader-name">Soujanya Arakeri</div>
        <div className="loader-progress">
          <div className="loader-bar-bg">
            <div
              className="loader-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="loader-percent">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>

      <style>{`
        .loading-screen {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          flex-direction: column;
        }

        .loader-3d {
          position: absolute;
          inset: 0;
          opacity: 0.8;
        }

        .loader-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .loader-text {
          font-family: 'Poppins', sans-serif;
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
        }

        .loader-name {
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          color: #94a3b8;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .loader-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .loader-bar-bg {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .loader-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
          border-radius: 2px;
          transition: width 0.15s ease-out;
        }

        .loader-percent {
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #6366f1;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
