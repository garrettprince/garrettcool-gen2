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
import Scene from "./Scene";
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

  const menuItemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.1 // Delay animation until container expands
      }
    }
  };

  return (
    <motion.div
      initial="home"
      animate={
        command === "menu" ? "menu" : command === "chat" ? "chat" : "home"
      }
      variants={variants}
      className="flex justify-between mx-auto mb-8  rounded-[1rem]  bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_5px_15px] overflow-hidden"
    >
      <motion.div
        className={`${
          command === "chat" ? "w-12 h-12" : "w-12 h-12"
        } rounded-full`}
      >
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0.35, 18]} fov={12} />
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
            <FloatingHead command={command} />
          </Suspense>
        </Canvas>
        {/* <Scene command={command} /> */}
      </motion.div>

      {command === "menu" && (
        <AnimatePresence mode="wait">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuItemVariants}
            className="flex justify-between items-center flex-1 px-4"
          >
            <Bars2Icon
              onClick={() => setCommand("home")}
              className="w-6 h-6 cursor-pointer"
            />
            <ChatBubbleOvalLeftIcon
              onClick={() => setCommand("chat")}
              className="w-6 h-6 cursor-pointer"
            />
            <UserIcon className="w-6 h-6 cursor-pointer" />
          </motion.div>
        </AnimatePresence>
      )}

      {command === "chat" && (
        <div className="flex mt-3"> 
          <ChatBubbleOvalLeftIcon
              onClick={() => setCommand("chat")}
              className="w-6 h-6 mr-2"
            />
          <div className="">Chat</div>
        </div>
      )}

      {/* Home Button */}
      {command === "home" ? (
        <div onClick={() => setCommand("menu")}>
          <Bars3Icon className="w-6 h-6 mr-2 mt-[.8rem] cursor-pointer" />
        </div>
      ) : (
        <div onClick={() => setCommand("home")}>
          <XMarkIcon className="w-6 h-6 mr-2 mt-[.8rem] cursor-pointer" />
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
