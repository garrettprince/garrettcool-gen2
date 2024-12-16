import React, { Suspense, useState, useEffect } from "react";
import FloatingHead from "./FloatingHead";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  PresentationControls,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars2Icon,
  Bars3Icon,
  ChatBubbleOvalLeftIcon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

function DynamicCommand() {
  const [command, setCommand] = useState("home");

  const variants = {
    home: {
      width: 90,
      height: 50,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 50,
        duration: 0.2,
      },
    },
    menu: {
      width: 200,
      height: 50,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 50,
        duration: 0.2,
      },
    },
    chat: {
      width: 350,
      height: 150,
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
      animate={
        command === "menu" ? "menu" : command === "chat" ? "chat" : "home"
      }
      variants={variants}
      className="flex justify-between mx-auto mb-8  rounded-[1.25rem] border border-gray-200 bg-white"
    >
      <motion.div
        className={`${
          command === "chat" ? "w-12 h-12" : "w-12 h-12"
        } rounded-full`}
      >
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
      </motion.div>

      {/* <div onClick={() => setCommand("home")}>
        <Bars2Icon className="w-6 h-6" />
      </div> */}
      {command === "menu" && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-between items-center"
          >
            <Bars2Icon
              onClick={() => setCommand("home")}
              className="w-8 h-8 mr-2"
            />
            <ChatBubbleOvalLeftIcon
              onClick={() => setCommand("chat")}
              className="w-6 h-6 mr-2"
            />
            <UserIcon className="w-6 h-6 mr-2" />
          </motion.div>
        </AnimatePresence>
      )}


      {command === "chat" && (
        <div>
          <div className="mt-3">
            Chat
          </div>
          
        </div>
      )}

      {/* Home Button */}
      {command === "home" ? (
        <div onClick={() => setCommand("menu")}>
          <Bars3Icon className="w-6 h-6 mr-2 mt-3 cursor-pointer" />
        </div>
      ) : (
        <div onClick={() => setCommand("home")}>
          <XMarkIcon className="w-6 h-6 mr-2 mt-3 cursor-pointer" />
        </div>
      )}

      {/* {command === "chat" && (
        <div className="mt-3 flex">
          <input type="text" placeholder="Type your message here..." />
        </div>
      )} */}
    </motion.div>
  );
}

export default DynamicCommand;

