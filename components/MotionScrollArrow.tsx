"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export default function MotionScrollArrow({ className = "" }: Props) {
  return (
    <motion.span
      className={className}
      animate={{ y: [0, 4, 0], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
    >
      ↓
    </motion.span>
  );
}
