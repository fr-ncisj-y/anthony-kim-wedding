"use client";

import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import FloralLottie from "@/components/FloralLottie";
import KenBurnsHeroImage from "@/components/KenBurnsHeroImage";
import MotionScrollArrow from "@/components/MotionScrollArrow";
import RevealItem from "@/components/RevealItem";
import WeddingCountdownSection from "@/components/WeddingCountdownSection";
import flower3Animation from "@/public/lottie/flowers3.json";
import flower4Animation from "@/public/lottie/flowers2.json";
import { Great_Vibes } from "next/font/google";

const script = Great_Vibes({ weight: "400", subsets: ["latin"] });

function Divider() {
  return (
    <div className="flex w-44 items-center gap-2.5">
      <div className="h-px flex-1 bg-[#C4B09A]" />
      <div className="h-1.5 w-1.5 rotate-45 bg-[#C4B09A]" />
      <div className="h-px flex-1 bg-[#C4B09A]" />
    </div>
  );
}

export default function Home() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const flowers2SentinelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showMusicPrompt, setShowMusicPrompt] = useState(false);

  useEffect(() => {
    const audio = new Audio("/bga.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    function handleContentReveal() {
      setShowMusicPrompt(true);
    }

    window.addEventListener("wedding-content-reveal", handleContentReveal);
    return () =>
      window.removeEventListener("wedding-content-reveal", handleContentReveal);
  }, []);

  function handleStartMusic() {
    setShowMusicPrompt(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }

  return (
    <>
      <LoadingScreen />

      {showMusicPrompt && (
        <button
          type="button"
          onClick={handleStartMusic}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(122,158,179,0.14)] px-4 pb-14 backdrop-blur-[2px]"
          aria-label="Tap to begin music"
        >
          <span className="rounded-full border border-[rgba(245,240,235,0.35)] bg-[rgba(245,240,235,0.12)] px-5 py-2 font-[family-name:var(--font-cormorant)] text-[13px] uppercase tracking-[0.28em] text-[#F5F0EB] shadow-[0_10px_30px_rgba(45,60,72,0.14)]">
            tap to begin
          </span>
        </button>
      )}

      <main className="flex min-h-svh flex-col items-center bg-neutral-300">
        <section
          ref={section1Ref}
          className="
          relative flex min-h-svh w-full flex-col items-center
          overflow-hidden border border-[#C8B9A8] bg-[#9AAABB]
          px-3 pb-8 max-[360px]:px-2.5 sm:px-4 md:h-[844px] md:w-[390px] md:px-0 md:pb-0
          md:shadow-2xl
        "
        >
          {/* ── PARTICLES ── */}
          <div className="wedding-particle-layer" aria-hidden="true">
            {(
              [
                {
                  x: "8%",
                  y: "15%",
                  size: "5px",
                  color: "rgba(255,255,255,0.75)",
                  dur: "8s",
                  delay: "0s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "25%",
                  y: "55%",
                  size: "6px",
                  color: "rgba(255,255,255,0.70)",
                  dur: "6s",
                  delay: "1.2s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "42%",
                  y: "30%",
                  size: "5px",
                  color: "rgba(255,255,255,0.65)",
                  dur: "9s",
                  delay: "2.5s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "60%",
                  y: "70%",
                  size: "7px",
                  color: "rgba(255,255,255,0.60)",
                  dur: "7s",
                  delay: "0.8s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "78%",
                  y: "20%",
                  size: "5px",
                  color: "rgba(255,255,255,0.70)",
                  dur: "10s",
                  delay: "3s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "90%",
                  y: "45%",
                  size: "6px",
                  color: "rgba(255,255,255,0.65)",
                  dur: "7.5s",
                  delay: "1.5s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "15%",
                  y: "80%",
                  size: "5px",
                  color: "rgba(255,255,255,0.70)",
                  dur: "8.5s",
                  delay: "4s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "55%",
                  y: "10%",
                  size: "6px",
                  color: "rgba(255,255,255,0.75)",
                  dur: "6.5s",
                  delay: "2s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "35%",
                  y: "60%",
                  size: "5px",
                  color: "rgba(255,255,255,0.65)",
                  dur: "9.5s",
                  delay: "0.4s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "70%",
                  y: "85%",
                  size: "6px",
                  color: "rgba(255,255,255,0.70)",
                  dur: "7s",
                  delay: "3.5s",
                  anim: "weddingParticleFloatLeft",
                },
              ] as Array<{
                x: string;
                y: string;
                size: string;
                color: string;
                dur: string;
                delay: string;
                anim: string;
              }>
            ).map((p, i) => (
              <div
                key={i}
                className="wedding-particle"
                style={
                  {
                    "--p-x": p.x,
                    "--p-y": p.y,
                    "--p-size": p.size,
                    "--p-color": p.color,
                    "--p-dur": p.dur,
                    "--p-delay": p.delay,
                    "--p-anim": p.anim,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          {/* ── HERO PHOTO ── */}
          <div
            className="relative w-full"
            style={{ height: "45svh", minHeight: "212px" }}
          >
            <KenBurnsHeroImage
              src="/images/prenup.jpeg"
              alt="Anthony & Kim"
              priority
              className="object-cover object-[center_2%] [mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_68%,transparent_100%)]"
            />

            {/* Eyebrow — top of photo */}
            <RevealItem
              from="top"
              delay={100}
              className="absolute top-8 left-0 right-0 text-center"
            >
              <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-white drop-shadow-sm">
                Together with our families
              </p>
            </RevealItem>
          </div>

          {/* ── INVITATION COPY ── */}
          <div className="relative z-20 -mt-6 flex flex-1 flex-col items-center gap-4 px-3 pt-8 pb-12 text-center max-[360px]:px-2.5 sm:px-8 md:-mt-8 md:gap-5 md:pb-10">
            {/* Names — overlap photo from below */}
            <div className="relative z-30 -mt-[5.1rem] flex flex-col items-center leading-none max-[360px]:-mt-[4.7rem] md:-mt-[7rem]">
              <RevealItem delay={200}>
                <span
                  className={`${script.className} text-[clamp(3.25rem,15.4vw,5.35rem)] max-[360px]:text-[3rem] text-[#F5F0EB]`}
                >
                  Anthony
                </span>
              </RevealItem>
              <RevealItem delay={350}>
                <span
                  className={`${script.className} relative -top-1 text-[clamp(1.9rem,8.8vw,3rem)] max-[360px]:text-[1.72rem] text-[#DCE6EE] md:-top-3`}
                >
                  and
                </span>
              </RevealItem>
              <RevealItem delay={500}>
                <span
                  className={`${script.className} text-[clamp(3.25rem,15.4vw,5.35rem)] max-[360px]:text-[3rem] text-[#F5F0EB]`}
                >
                  Kim
                </span>
              </RevealItem>
            </div>

            <RevealItem delay={700} className="-mb-2">
              <Divider />
            </RevealItem>

            {/* Request line */}
            <RevealItem delay={850}>
              <p className="font-[family-name:var(--font-cormorant)] text-[0.98rem] leading-snug italic text-[#EDF3F8] max-[360px]:text-[0.92rem] md:text-lg">
                request the honour of your presence
                <br />
                at the celebration of our marriage
              </p>
            </RevealItem>

            <RevealItem delay={1000} className="-mt-2">
              <Divider />
            </RevealItem>

            {/* Date & time */}
            <RevealItem delay={1150} className="-mt-1">
              <p className="font-[family-name:var(--font-cormorant)] text-[0.95rem] italic text-[#F5F0EB] max-[360px]:text-[0.88rem] md:text-base">
                Saturday, May 28, 2026
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-[0.82rem] tracking-wide text-[#D7E1EA] max-[360px]:text-[0.77rem] md:text-sm">
                Nine o'Clock in the Morning
              </p>
            </RevealItem>

            {/* Venue */}
            <RevealItem delay={1300} className="-mt-1">
              <p className="font-[family-name:var(--font-cormorant)] text-[1.03rem] font-medium tracking-wide text-[#F5F0EB] max-[360px]:text-[0.98rem] md:text-lg">
                Saint Francis Xavier Parish
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-[0.84rem] text-[#D7E1EA] max-[360px]:text-[0.79rem] md:text-sm">
                Halawig-gogon, Goa, Camarines Sur
              </p>
            </RevealItem>
          </div>

          <div className="pointer-events-none absolute bottom-5 left-1/2 z-40 -translate-x-1/2">
            <RevealItem
              from="none"
              delay={1500}
              className="flex flex-col items-center gap-1 text-[#DCE6EE]"
            >
              <MotionScrollArrow className="text-lg leading-none text-[#7A8A96]" />
            </RevealItem>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full translate-y-[36%] opacity-75 md:translate-y-[42%]">
            <FloralLottie
              className="w-full origin-bottom scale-[1.14] md:scale-[1.22]"
              animationData={flower3Animation}
              startEvent="wedding-content-reveal"
            />
          </div>

          {/* ── FLORAL — pinned to top-right ── */}
          {/* <div className="pointer-events-none absolute top-0 right-0 z-20 w-[46%] translate-x-[16%] -translate-y-[12%]">
            <FloralLottie className="w-full" />
          </div> */}
        </section>

        <section
          ref={section2Ref}
          className="
          relative -mt-px flex min-h-svh w-full flex-col items-center justify-center
          overflow-hidden border border-t-0 border-[#C8B9A8] bg-[#F5F0EB]
          px-5 py-14 text-center md:h-[844px] md:w-[390px] md:px-8 md:py-0
          md:shadow-2xl
        "
        >
          {/* ── PARTICLES ── */}
          <div className="wedding-particle-layer" aria-hidden="true">
            {(
              [
                {
                  x: "10%",
                  y: "20%",
                  size: "5px",
                  color: "rgba(196,168,136,0.80)",
                  dur: "9s",
                  delay: "0.5s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "30%",
                  y: "50%",
                  size: "6px",
                  color: "rgba(180,150,110,0.75)",
                  dur: "7s",
                  delay: "2s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "55%",
                  y: "25%",
                  size: "5px",
                  color: "rgba(196,168,136,0.70)",
                  dur: "8.5s",
                  delay: "1s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "75%",
                  y: "65%",
                  size: "6px",
                  color: "rgba(180,150,110,0.75)",
                  dur: "6.5s",
                  delay: "3s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "20%",
                  y: "75%",
                  size: "5px",
                  color: "rgba(196,168,136,0.70)",
                  dur: "10s",
                  delay: "4s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "85%",
                  y: "35%",
                  size: "6px",
                  color: "rgba(180,150,110,0.80)",
                  dur: "7.5s",
                  delay: "1.5s",
                  anim: "weddingParticleFloatLeft",
                },
                {
                  x: "45%",
                  y: "80%",
                  size: "5px",
                  color: "rgba(196,168,136,0.70)",
                  dur: "8s",
                  delay: "0.8s",
                  anim: "weddingParticleFloatRight",
                },
                {
                  x: "65%",
                  y: "15%",
                  size: "6px",
                  color: "rgba(180,150,110,0.75)",
                  dur: "6s",
                  delay: "2.5s",
                  anim: "weddingParticleFloatLeft",
                },
              ] as Array<{
                x: string;
                y: string;
                size: string;
                color: string;
                dur: string;
                delay: string;
                anim: string;
              }>
            ).map((p, i) => (
              <div
                key={i}
                className="wedding-particle"
                style={
                  {
                    "--p-x": p.x,
                    "--p-y": p.y,
                    "--p-size": p.size,
                    "--p-color": p.color,
                    "--p-dur": p.dur,
                    "--p-delay": p.delay,
                    "--p-anim": p.anim,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <div className="relative z-20 -mt-3 flex w-full max-w-[326px] flex-col gap-4 py-8 text-left md:-mt-24 md:gap-5">
            <RevealItem delay={1600}>
              <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#9AAABB]">
                Our Journey
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-cormorant)] text-[clamp(1.45rem,6.3vw,1.9rem)] leading-tight text-[#3A5060]">
                How We Found Each Other
              </h3>
              <p className="mt-2 font-[family-name:var(--font-cormorant)] text-[15px] leading-relaxed text-[#4A5A66]">
                Every great love begins with a single moment, a glance, a word,
                a smile. Anthony and Kim found theirs, and from that day on, the
                world became a more beautiful place for both of them.
              </p>
            </RevealItem>

            <RevealItem delay={1750}>
              <Divider />
            </RevealItem>

            <RevealItem delay={1900}>
              <div>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#3A5060]">
                  The Spark
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[#6E7E8A]">
                  The First Hello
                </p>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-[14px] leading-relaxed text-[#4A5A66]">
                  What started as a chance encounter quickly blossomed into
                  something neither of them could quite explain, only feel.
                </p>
              </div>
            </RevealItem>

            <RevealItem delay={2050}>
              <Divider />
            </RevealItem>

            <RevealItem delay={2200}>
              <div>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#3A5060]">
                  Growing Roots
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[#6E7E8A]">
                  Building a Life Together
                </p>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-[14px] leading-relaxed text-[#4A5A66]">
                  Through seasons of joy and quiet mornings, through adventures
                  near and far, they became each other's favourite person.
                </p>
              </div>
            </RevealItem>

            <RevealItem delay={2350}>
              <Divider />
            </RevealItem>

            <RevealItem delay={2500}>
              <div>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-lg font-medium text-[#3A5060]">
                  The Promise
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-sm italic text-[#6E7E8A]">
                  Forever, Starting Now
                </p>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-[14px] leading-relaxed text-[#4A5A66]">
                  With a ring and a question whispered from the heart, they
                  chose each other, not just for now, but for always.
                </p>
              </div>
            </RevealItem>
          </div>

          {/* Sentinel at bottom of section 2 — triggers flowers2 */}
          <div
            ref={flowers2SentinelRef}
            className="absolute bottom-0 left-0 w-full h-px"
          />

          <div className="pointer-events-none absolute top-0 right-0 z-10 w-[45%] translate-x-[16%] -translate-y-[42%] rotate-[15deg] opacity-80 max-[360px]:w-[41%] max-[360px]:translate-x-[13%] max-[360px]:-translate-y-[38%] md:w-[60%] md:translate-x-[24%] md:-translate-y-[56%]">
            <FloralLottie
              className="w-full origin-top-right scale-[0.95] max-[360px]:scale-[0.9] md:scale-[1.08]"
              startOnView
              triggerRef={section2Ref}
            />
          </div>

          {/* Centre flower */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[35%] -translate-x-1/2 translate-y-[36%] opacity-75 max-[360px]:w-[32%] max-[360px]:translate-y-[31%] md:w-[44%] md:translate-y-[54%]">
            <FloralLottie
              className="w-full origin-bottom scale-[1.15] max-[360px]:scale-[1.08] md:scale-[1.5]"
              startOnView
              animationData={flower4Animation}
              loopMode="none"
              triggerRef={flowers2SentinelRef}
            />
          </div>
          {/* Left flower */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[28%] -translate-x-[122%] translate-y-[36%] opacity-75 max-[360px]:w-[25%] max-[360px]:-translate-x-[115%] max-[360px]:translate-y-[31%] md:w-[34%] md:-translate-x-[160%] md:translate-y-[54%]">
            <FloralLottie
              className="w-full origin-bottom scale-[1.06] -scale-x-100 max-[360px]:scale-[0.99] md:scale-[1.35]"
              startOnView
              animationData={flower4Animation}
              loopMode="none"
              triggerRef={flowers2SentinelRef}
            />
          </div>
          {/* Right flower */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[28%] translate-x-[23%] translate-y-[36%] opacity-75 max-[360px]:w-[25%] max-[360px]:translate-x-[18%] max-[360px]:translate-y-[31%] md:w-[34%] md:translate-x-[60%] md:translate-y-[54%]">
            <FloralLottie
              className="w-full origin-bottom scale-[1.06] max-[360px]:scale-[0.99] md:scale-[1.35]"
              startOnView
              animationData={flower4Animation}
              loopMode="none"
              triggerRef={flowers2SentinelRef}
            />
          </div>
        </section>

        <WeddingCountdownSection />
      </main>
    </>
  );
}
