"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function KenBurnsHeroImage({
  src,
  alt,
  priority = false,
  className = "",
}: Props) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.08 }}
      animate={{ scale: 1 }}
      transition={{ duration: 8, ease: [0.25, 0, 0.35, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={className}
      />
    </motion.div>
  );
}
