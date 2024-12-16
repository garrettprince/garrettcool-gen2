import React, { Suspense, useState, useEffect } from "react";
import FloatingHead from "./FloatingHead";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  PresentationControls,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Bars2Icon, Bars3Icon } from "@heroicons/react/24/outline";

function DynamicCommand() {
  const [command, setCommand] = useState("home");

  const variants = {
    home: {
      width: 100,
      height: 55,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 50,
        duration: 0.2,
      },
    },
    menu: {
      width: 200,
      height: 55,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 50,
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="home"
      animate={command === "menu" ? "menu" : "home"}
      variants={variants}
      className="flex justify-between items-center border mx-auto mb-8 shadow-lg rounded-[1.25rem]"
    >
      <div className="w-11 h-11 rounded-full ml-1">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0.25, 18]} fov={10} />
          <Suspense>
            <spotLight
              position={[5, 5, 5]}
              angle={0.5}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={[512, 512]}
            />
            <ambientLight intensity={0.2} />
            <Environment preset="sunset" />
            <PresentationControls>
              <FloatingHead command={command} />
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>
      <div onClick={() => setCommand("menu")}>
        <Bars3Icon className="w-8 h-8 mr-2" />
      </div>
      {/* <div onClick={() => setCommand("home")}>
        <Bars2Icon className="w-6 h-6" />
      </div> */}
      {command === "menu" && (
        <motion.div onClick={() => setCommand("home")}>
          <Bars2Icon className="w-8 h-8 mr-2" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default DynamicCommand;
