"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export const Reveal = ({ children, width = "100%", delay = 0, direction = "up" }: RevealProps) => {
  const getInitial = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 75 };
      case "down": return { opacity: 0, y: -75 };
      case "left": return { opacity: 0, x: 75 };
      case "right": return { opacity: 0, x: -75 };
    }
  };

  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: getInitial(),
          visible: { opacity: 1, y: 0, x: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
