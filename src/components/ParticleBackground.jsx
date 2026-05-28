import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShapes({ mouse }) {
  const groupRef = useRef();
  const shapes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 15; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.01 + 0.005,
        type: Math.floor(Math.random() * 3)
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((mesh, i) => {
        const shape = shapes[i];
        mesh.rotation.x += shape.speed;
        mesh.rotation.y += shape.speed * 1.3;
        mesh.position.y += Math.sin(state.clock.elapsedTime + i) * 0.003;
        mesh.position.x += mouse.current[0] * 0.02;
        mesh.position.y += mouse.current[1] * 0.02;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} scale={shape.scale}>
          {shape.type === 0 && <octahedronGeometry args={[1, 0]} />}
          {shape.type === 1 && <tetrahedronGeometry args={[1, 0]} />}
          {shape.type === 2 && <icosahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={i % 2 === 0 ? '#6366f1' : '#8b5cf6'}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 800, mouse }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 8 + Math.random() * 15;

      temp.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        speed: 0.002 + Math.random() * 0.005,
        offset: Math.random() * Math.PI * 2,
        scale: 0.5 + Math.random() * 1
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      const { x, y, z, speed, offset, scale } = particle;

      dummy.position.set(
        x + Math.sin(time * speed + offset) * 2 + mouse.current[0] * 3,
        y + Math.cos(time * speed + offset) * 2 + mouse.current[1] * 3,
        z + Math.sin(time * speed * 0.5 + offset)
      );

      dummy.scale.setScalar(scale * (0.8 + Math.sin(time * 2 + offset) * 0.2));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

function GradientMesh({ mouse }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
      meshRef.current.rotation.z += 0.001;
      meshRef.current.position.x = mouse.current[0] * 0.5;
      meshRef.current.position.y = mouse.current[1] * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <torusGeometry args={[8, 3, 16, 100]} />
      <meshStandardMaterial
        color="#4f46e5"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function ConnectingLines({ mouse }) {
  const linesRef = useRef();
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 50; i++) {
      pts.push(new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10 - 5
      ));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];

    points.forEach((point, i) => {
      points.forEach((other, j) => {
        if (i < j && point.distanceTo(other) < 8) {
          positions.push(point.x, point.y, point.z);
          positions.push(other.x, other.y, other.z);
        }
      });
    });

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.1} />
    </lineSegments>
  );
}

function Scene({ mouse }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = 15;
    camera.far = 100;
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#8b5cf6" />
      <Particles mouse={mouse} />
      <FloatingShapes mouse={mouse} />
      <GradientMesh mouse={mouse} />
      <ConnectingLines mouse={mouse} />
    </>
  );
}

export default function ParticleBackground() {
  const mouse = useRef([0, 0]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      ];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
