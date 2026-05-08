"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import floralAnimation from "@/public/lottie/flowers1.json";

interface Props {
  className?: string;
  startOnView?: boolean;
  animationData?: object;
}

export default function FloralLottie({
  className = "",
  startOnView = false,
  animationData = floralAnimation,
}: Props) {
  const lottieRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleStart() {
      lottieRef.current?.play();
    }
    window.addEventListener("wedding-floral-start", handleStart);
    return () =>
      window.removeEventListener("wedding-floral-start", handleStart);
  }, []);

  useEffect(() => {
    if (!startOnView || !wrapperRef.current) return;

    let hasPlayed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || hasPlayed || !entry.isIntersecting) return;

        hasPlayed = true;
        lottieRef.current?.play();
        observer.disconnect();
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [startOnView]);

  return (
    <div ref={wrapperRef} className={className}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        className="w-full"
      />
    </div>
  );
}
