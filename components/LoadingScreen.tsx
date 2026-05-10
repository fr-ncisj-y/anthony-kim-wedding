"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PathInfo {
  d: string;
  viewBox: string;
  strokeWidth: number;
  cx: number;
  cy: number;
  r: number;
}

const WARM_WHITE = "#FDF8F2";

export default function LoadingScreen() {
  const [pathInfo, setPathInfo] = useState<PathInfo | null>(null);
  const [entered, setEntered] = useState(false); // scale-in entrance
  const [drawing, setDrawing] = useState(false); // stroke trace
  const [filled, setFilled] = useState(false); // fill + dots
  const [spinning, setSpinning] = useState(false); // arc spinner
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  const pageReadyRef = useRef(false);
  const minTimeRef = useRef(0);

  // Track when the page is actually ready
  useEffect(() => {
    const isVeryNarrow = window.matchMedia("(max-width: 360px)").matches;
    minTimeRef.current = Date.now() + (isVeryNarrow ? 4300 : 4800);

    function markReady() {
      pageReadyRef.current = true;
    }

    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady, { once: true });
      return () => window.removeEventListener("load", markReady);
    }
  }, []);

  // Build glyph paths
  useEffect(() => {
    let cancelled = false;

    async function init() {
      const opentype = await import("opentype.js");
      const buffer = await fetch("/fonts/GreatVibes-Regular.ttf").then((r) =>
        r.arrayBuffer(),
      );
      const font = opentype.parse(buffer);
      if (cancelled) return;

      const fontSize = 220;
      const scale = (1 / font.unitsPerEm) * fontSize;
      let x = 0;
      const parts: string[] = [];
      let x1 = Infinity,
        y1 = Infinity,
        x2 = -Infinity,
        y2 = -Infinity;

      for (const char of "ak") {
        const glyph = font.charToGlyph(char);
        const glyphPath = glyph.getPath(x, fontSize, fontSize);
        parts.push(glyphPath.toPathData(2));
        const bb = glyphPath.getBoundingBox();
        x1 = Math.min(x1, bb.x1);
        y1 = Math.min(y1, bb.y1);
        x2 = Math.max(x2, bb.x2);
        y2 = Math.max(y2, bb.y2);
        x += (glyph.advanceWidth ?? 0) * scale;
      }

      const letterH = y2 - y1;
      const r = Math.max(x2 - x1, letterH) * 0.9;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2 + letterH * 0.06; // optical lift

      const pad = 14;
      const vbSize = r * 2 + pad * 2;

      setPathInfo({
        d: parts.join(" "),
        viewBox: `${cx - r - pad} ${cy - r - pad} ${vbSize} ${vbSize}`,
        strokeWidth: vbSize * 0.005,
        cx,
        cy,
        r,
      });
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sequence: entrance → trace → fill → spinner → dismiss when page ready
  useEffect(() => {
    if (!pathInfo) return;

    // Scale-in entrance
    const tEnter = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true)),
    );

    // Start tracing shortly after entrance
    const tDraw = setTimeout(() => setDrawing(true), 300);

    // Fill phase
    const tFill = setTimeout(() => setFilled(true), 3300);

    // Spinner appears after fill completes
    const tSpin = setTimeout(() => setSpinning(true), 4400);

    // Poll until page ready + min time elapsed, then signal floral → fade
    const tPoll = setInterval(() => {
      if (pageReadyRef.current && Date.now() >= minTimeRef.current) {
        clearInterval(tPoll);
        window.dispatchEvent(new Event("wedding-floral-start"));
        const isVeryNarrow = window.matchMedia("(max-width: 360px)").matches;
        setTimeout(
          () => {
            setFading(true);
            setTimeout(() => {
              setGone(true);
              window.dispatchEvent(new Event("wedding-content-reveal"));
            }, 900);
          },
          isVeryNarrow ? 140 : 220,
        );
      }
    }, 120);

    return () => {
      cancelAnimationFrame(tEnter);
      clearTimeout(tDraw);
      clearTimeout(tFill);
      clearTimeout(tSpin);
      clearInterval(tPoll);
    };
  }, [pathInfo]);

  if (gone) return null;

  const { cx, cy, r, strokeWidth } = pathInfo ?? {
    cx: 0,
    cy: 0,
    r: 0,
    strokeWidth: 0,
  };

  const dotRadius = r * 0.913;
  const compassDots = [
    { x: cx, y: cy - dotRadius },
    { x: cx, y: cy + dotRadius },
    { x: cx + dotRadius, y: cy },
    { x: cx - dotRadius, y: cy },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
      style={{
        backgroundColor: "#7A9EB3",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      {pathInfo && (
        <motion.svg
          viewBox={pathInfo.viewBox}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{
            scale: entered ? 1 : 0.82,
            opacity: entered ? 1 : 0,
          }}
          transition={{
            scale: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
            opacity: { duration: 0.5, ease: "easeOut" },
          }}
          style={{
            width: "min(72vw, 320px)",
            height: "auto",
          }}
        >
          <defs>
            <radialGradient id="circle-fill" cx="50%" cy="44%" r="56%">
              <stop offset="0%" stopColor="rgba(253,248,242,0.22)" />
              <stop offset="100%" stopColor="rgba(253,248,242,0.06)" />
            </radialGradient>
          </defs>

          {/* Soft backdrop */}
          <circle cx={cx} cy={cy} r={r * 0.97} fill="url(#circle-fill)" />

          {/* Outer ring — static */}
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={`rgba(253,248,242,0.45)`}
            strokeWidth={strokeWidth * 1.4}
          />

          {/* Spinning arc — overlaid on outer ring, appears after fill */}
          <motion.g
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            animate={{
              rotate: spinning ? 360 : 0,
              opacity: spinning ? 1 : 0,
            }}
            transition={{
              rotate: {
                duration: 2.2,
                ease: "linear",
                repeat: spinning ? Infinity : 0,
              },
              opacity: { duration: 0.6, ease: "easeOut" },
            }}
          >
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={WARM_WHITE}
              strokeWidth={strokeWidth * 1.4}
              pathLength="1"
              strokeDasharray="0.18 0.82"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Inner ring — static */}
          <circle
            cx={cx}
            cy={cy}
            r={r * 0.82}
            fill="none"
            stroke={`rgba(253,248,242,0.3)`}
            strokeWidth={strokeWidth * 0.7}
          />

          {/* Compass dots — pulse while spinner is active */}
          {compassDots.map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={strokeWidth * 1.1}
              fill={WARM_WHITE}
              animate={{
                opacity: filled ? (spinning ? [0.45, 0.85, 0.45] : 0.7) : 0,
                scale: spinning ? [1, 1.12, 1] : 1,
              }}
              transition={{
                opacity: spinning
                  ? {
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.18,
                    }
                  : {
                      duration: 0.9,
                      ease: [0.32, 0.72, 0, 1],
                      delay: filled ? i * 0.06 : 0,
                    },
                scale: spinning
                  ? {
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.18,
                    }
                  : { duration: 0 },
              }}
            />
          ))}

          {/* ak — trace then fill */}
          <motion.path
            d={pathInfo.d}
            stroke={WARM_WHITE}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            initial={{
              strokeDasharray: 1,
              strokeDashoffset: 1,
              fill: "transparent",
            }}
            animate={{
              strokeDashoffset: drawing ? 0 : 1,
              fill: filled ? WARM_WHITE : "transparent",
            }}
            transition={{
              strokeDashoffset: {
                duration: drawing ? 3 : 0,
                ease: [0.25, 0, 0.35, 1],
              },
              fill: {
                duration: 1,
                ease: [0.32, 0.72, 0, 1],
              },
            }}
          />
        </motion.svg>
      )}
    </motion.div>
  );
}
