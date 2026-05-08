"use client";

import { useEffect, useState, ReactNode, CSSProperties } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  from?: "bottom" | "top" | "none";
  className?: string;
  style?: CSSProperties;
}

export default function RevealItem({
  children,
  delay = 0,
  from = "bottom",
  className = "",
  style,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleReveal() {
      setTimeout(() => setVisible(true), delay);
    }
    window.addEventListener("wedding-content-reveal", handleReveal);
    return () =>
      window.removeEventListener("wedding-content-reveal", handleReveal);
  }, [delay]);

  const initialY = from === "bottom" ? 24 : from === "top" ? -16 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : initialY }}
      transition={{
        duration: 0.9,
        ease: [0.32, 0.72, 0, 1],
      }}
      style={{
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
