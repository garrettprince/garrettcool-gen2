import { useGLTF } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const FloatingHead = ({ command }) => {
  const { nodes, materials } = useGLTF("/models/facetest3.gltf");

  const { rotation } = useSpring({
    rotation: command === "menu" ? [0, 0.5, 0] : [0, 0, 0],
  });

  return (
    <animated.mesh
      castShadow
      receiveShadow
      geometry={nodes.FBHead003.geometry}
      material={materials["FBHead.001_preview_mat"]}
      rotation={rotation}
    />
  );
};

FloatingHead.displayName = "FloatingHead";

export default FloatingHead;

useGLTF.preload("/models/facetest3.gltf");
