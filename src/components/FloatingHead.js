import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const FloatingHead = ({ command }) => {
  const { nodes, materials } = useGLTF("/models/facetest3.gltf");
  const meshRef = useRef();
  // const timeRef = useRef(0);
  // const isAnimating = useRef(command === "home");

  // State-based rotation animation
  const { rotation, scale } = useSpring({
    rotation:
      command === "menu"
        ? [0, 0.5, 0]
        : command === "chat"
        ? [0, 0.25, 0]
        : [0, 0, 0],
    // onChange: () => {
    //   // When state changes, stop the continuous rotation
    //   isAnimating.current = command === "home";
    // },
  });

  // useFrame((state, delta) => {
  //   if (!isAnimating.current || !meshRef.current) return;
    
  //   timeRef.current += delta;
    
  //   // Complete rotation takes 6 seconds
  //   const phase = (timeRef.current % 15) / 15;
    
  //   // First 90 degrees (slow)
  //   if (phase <= 1/3) {
  //     meshRef.current.rotation.y = (phase * 3) * Math.PI / 2;
  //   }
  //   // Next 180 degrees (fast)
  //   else if (phase <= 0.5) {
  //     const fastPhase = (phase - 1/3) * 6;
  //     meshRef.current.rotation.y = (Math.PI / 2) + (fastPhase * Math.PI);
  //   }
  //   // Final 90 degrees (slow)
  //   else {
  //     const slowPhase = (phase - 0.5) * 2;
  //     meshRef.current.rotation.y = (Math.PI * 3/2) + (slowPhase * Math.PI / 2);
  //   }
  // });

  return (
    <animated.mesh
      ref={meshRef}
      castShadow
      receiveShadow
      geometry={nodes.FBHead003.geometry}
      material={materials["FBHead.001_preview_mat"]}
      rotation={rotation}
      scale={scale}
    />
  );
};

FloatingHead.displayName = "FloatingHead";

export default FloatingHead;

useGLTF.preload("/models/facetest3.gltf");
