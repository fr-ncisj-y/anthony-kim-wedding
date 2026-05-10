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
  const [isVeryNarrow, setIsVeryNarrow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 360px)");
    const update = () => setIsVeryNarrow(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    function handleReveal() {
      const tunedDelay = isVeryNarrow ? Math.max(0, delay - 140) : delay;
      timeoutId = setTimeout(() => setVisible(true), tunedDelay);
    }

    window.addEventListener("wedding-content-reveal", handleReveal);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("wedding-content-reveal", handleReveal);
    };
  }, [delay, isVeryNarrow]);

  const initialY =
    from === "bottom"
      ? isVeryNarrow
        ? 18
        : 24
      : from === "top"
        ? isVeryNarrow
          ? -12
          : -16
        : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : initialY }}
      transition={{
        duration: isVeryNarrow ? 0.6 : 0.72,
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
