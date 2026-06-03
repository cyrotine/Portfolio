import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import EventHorizon from "./EventHorizon";
import AccretionDisk from "./AccretionDisk";

interface Props {
  rotationRef: React.MutableRefObject<{ x: number }>;
}

const BlackHoleGroup = ({ rotationRef }: Props) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = rotationRef.current.x;
    }
  });

  return (
    <group ref={groupRef}>
      <EventHorizon />
      <AccretionDisk />
    </group>
  );
};

export default BlackHoleGroup;
