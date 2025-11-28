"use client";

import { motion } from "framer-motion";

interface GlowingBracketProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function GlowingBracket({ position }: GlowingBracketProps) {
  // Define the path for a rounded corner based on position
  // We'll use a 30x30 SVG.
  // Stroke width 3.

  const getPath = () => {
    switch (position) {
      case "top-left":
        // Start bottom, go up, curve right
        return "M 2 30 L 2 15 Q 2 2 15 2 L 30 2";
      case "top-right":
        // Start left, go right, curve down
        return "M 0 2 L 15 2 Q 28 2 28 15 L 28 30";
      case "bottom-left":
        // Start top, go down, curve right
        return "M 2 0 L 2 15 Q 2 28 15 28 L 30 28";
      case "bottom-right":
        // Start left, go right, curve up (wait, bottom right is: start left, go right, curve up? No.)
        // Bottom right: Start top, go down? Or start left?
        // Let's mirror top-left.
        // Start left, go right, curve up? No, corner is bottom-right.
        // Start at left edge of the box (0, 28) -> right -> curve up to (28, 0)?
        return "M 0 28 L 15 28 Q 28 28 28 15 L 28 0";
    }
  };

  const getPositionStyle = () => {
    switch (position) {
      case "top-left":
        return { top: "-10px", left: "-10px" };
      case "top-right":
        return { top: "-10px", right: "-10px" };
      case "bottom-left":
        return { bottom: "-10px", left: "-10px" };
      case "bottom-right":
        return { bottom: "-10px", right: "-10px" };
    }
  };

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "30px",
        height: "30px",
        zIndex: 3,
        pointerEvents: "none",
        background: "transparent", // Explicitly transparent
        border: "none", // Explicitly no border
        boxShadow: "none", // Explicitly no shadow
        ...getPositionStyle(),
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={getPath()}
          stroke="var(--accent-cyan)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            // Removed filter animation to debug "square" look
          }}
          transition={{
            pathLength: { duration: 0.8, ease: "easeInOut" },
            opacity: { duration: 0.2 },
          }}
          style={{ filter: "drop-shadow(0 0 5px var(--accent-cyan))" }} // Static glow
        />
      </svg>
    </motion.div>
  );
}
