import React, { useState, Suspense } from "react";
import {
  Canvas,
  PerspectiveCamera,
  Environment,
  PresentationControls,
} from "@react-three/drei";
import FloatingHead from "./FloatingHead";

function Scene({ command }) {
  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0.25, 18]} fov={12} />
        <Suspense>
          <spotLight
            position={[5, 5, 5]}
            angle={0.5}
            penumbra={1}
            intensity={1}
            castShadow
            shadow-mapSize={[512, 512]}
          />
          <ambientLight intensity={0.3} />
          <Environment preset="sunset" />
          <PresentationControls>
            <FloatingHead command={command} />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Scene;
