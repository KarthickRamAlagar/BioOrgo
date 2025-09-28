// EntryPage.jsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import NameIntro from "../components/NameIntro";

function ForestScene({ autoSpin = 0.2 }) {
  const group = useRef();
  const { scene } = useGLTF("/modals/animations/realistic_forest.glb");

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += autoSpin * delta;
    }
  });

  return <primitive ref={group} object={scene} />;
}

export default function EntryPage() {
  const scrollTargetRef = useRef();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 6], fov: 60 }}
        style={{
          width: "100vw",
          height: "100vh",
          display: "block",
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <Center>
          <ForestScene autoSpin={0.2} />
        </Center>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>

      <NameIntro scrollTargetRef={scrollTargetRef} />

      <div
        ref={scrollTargetRef}
        style={{
          position: "absolute",
          top: "100vh",
          width: "100vw",
          height: "1px",
        }}
      />
    </div>
  );
}
