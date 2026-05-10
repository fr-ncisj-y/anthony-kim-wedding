"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";
import Lottie from "lottie-react";
import floralAnimation from "@/public/lottie/flowers1.json";

interface Props {
  className?: string;
  startOnView?: boolean;
  animationData?: object;
  loopMode?: "custom" | "continuous" | "none";
  triggerRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
  startEvent?: string;
}

export default function FloralLottie({
  className = "",
  startOnView = false,
  animationData = floralAnimation,
  loopMode = "custom",
  triggerRef,
  startEvent = "wedding-floral-start",
}: Props) {
  const lottieRef = useRef<any>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const startOnViewRef = useRef(startOnView);
  const [started, setStarted] = useState(false);

  const loopStartFrame = Math.max(
    1,
    Math.round(((animationData as any)?.fr ?? 60) * 1.6),
  );

  function handleComplete() {
    if (loopMode === "custom") {
      lottieRef.current?.goToAndPlay(loopStartFrame, true);
    } else if (loopMode === "none") {
      const totalFrames = (animationData as any)?.op ?? 60;
      lottieRef.current?.goToAndStop(totalFrames - 1, true);
    }
  }

  function play() {
    setStarted(true);
    lottieRef.current?.goToAndPlay(0, true);
  }

  useEffect(() => {
    startOnViewRef.current = startOnView;
  }, [startOnView]);

  useEffect(() => {
    // Only use the global event when not driven by scroll — prevents section 2
    // flowers from firing early when the loading screen dispatches the event.
    if (startOnViewRef.current) return;
    window.addEventListener(startEvent, play);
    return () => window.removeEventListener(startEvent, play);
  }, [startEvent]);

  useEffect(() => {
    if (!startOnView) return;
    const target = triggerRef?.current ?? wrapperRef.current;
    if (!target) return;
    const isVeryNarrow = window.matchMedia("(max-width: 360px)").matches;

    let hasPlayed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || hasPlayed || !entry.isIntersecting) return;
        hasPlayed = true;
        play();
        observer.disconnect();
      },
      {
        threshold: isVeryNarrow ? 0.18 : 0.25,
        rootMargin: isVeryNarrow ? "0px 0px -6% 0px" : "0px",
      },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [startOnView]);

  return (
    <div
      ref={wrapperRef}
      className="w-full"
      style={{
        opacity: startOnView && !started ? 0 : 1,
        transition: started
          ? window.matchMedia("(max-width: 360px)").matches
            ? "opacity 0.56s ease"
            : "opacity 0.7s ease"
          : "none",
      }}
    >
      <div className={className}>
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={loopMode === "continuous"}
          autoplay={false}
          onComplete={loopMode !== "continuous" ? handleComplete : undefined}
          className="w-full"
        />
      </div>
    </div>
  );
}
