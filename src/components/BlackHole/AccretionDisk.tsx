import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 3000;

const AccretionDisk = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const radii = useRef(new Float32Array(PARTICLE_COUNT));
  const thetas = useRef(new Float32Array(PARTICLE_COUNT));
  const speeds = useRef(new Float32Array(PARTICLE_COUNT));
  const yOffsets = useRef(new Float32Array(PARTICLE_COUNT));

  const { positions, colors } = useMemo(() => {
    const accentHex =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accentColor")
        .trim() || "#c2a4ff";
    const accentColor = new THREE.Color(accentHex);
    const whiteColor = new THREE.Color(1, 1, 1);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 1.8 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.16;

      radii.current[i] = r;
      thetas.current[i] = theta;
      speeds.current[i] = 0.2 + Math.random() * 0.3;
      yOffsets.current[i] = y;

      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = r * Math.sin(theta);

      // Inner particles → white, outer → accent
      const t = (r - 1.8) / 1.8;
      const c = whiteColor.clone().lerp(accentColor, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const clampedDelta = Math.min(delta, 0.05);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Orbital step — slower farther out (Keplerian approximation)
      thetas.current[i] +=
        (speeds.current[i] / radii.current[i]) * clampedDelta;

      // Reset particles that spiral below the event horizon radius
      if (radii.current[i] < 1.3) {
        radii.current[i] = 3.0 + Math.random() * 0.6;
        thetas.current[i] = Math.random() * Math.PI * 2;
        yOffsets.current[i] = (Math.random() - 0.5) * 0.16;
      }

      pos[i * 3] = radii.current[i] * Math.cos(thetas.current[i]);
      pos[i * 3 + 1] = yOffsets.current[i];
      pos[i * 3 + 2] = radii.current[i] * Math.sin(thetas.current[i]);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default AccretionDisk;
