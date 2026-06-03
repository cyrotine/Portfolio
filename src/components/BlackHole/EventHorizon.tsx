const EventHorizon = () => {
  return (
    <mesh renderOrder={1}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshBasicMaterial color="black" depthWrite={true} />
    </mesh>
  );
};

export default EventHorizon;
