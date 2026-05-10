"use client";

import { useRef } from "react";
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

  return (
    <>
      <LoadingScreen />

      <main className="flex min-h-dvh flex-col items-center bg-neutral-300">
        <section
          ref={section1Ref}
          className="
          relative flex h-dvh w-full flex-col items-center
          overflow-hidden border border-[#C8B9A8] bg-[#9AAABB]
          md:h-[844px] md:w-[390px]
          md:shadow-2xl
        "
        >
          {/* ── HERO PHOTO ── */}
          <div
            className="relative w-full"
            style={{ height: "45dvh", minHeight: "240px" }}
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
          <div className="relative z-20 -mt-8 flex flex-1 flex-col items-center gap-5 px-8 pt-8 pb-10 text-center">
            {/* Names — overlap photo from below */}
            <div className="relative z-30 -mt-[7rem] flex flex-col items-center leading-none">
              <RevealItem delay={200}>
                <span
                  className={`${script.className} text-[86px] text-[#F5F0EB]`}
                >
                  Anthony
                </span>
              </RevealItem>
              <RevealItem delay={350}>
                <span
                  className={`${script.className} relative -top-3 text-[48px] text-[#DCE6EE]`}
                >
                  and
                </span>
              </RevealItem>
              <RevealItem delay={500}>
                <span
                  className={`${script.className} text-[86px] text-[#F5F0EB]`}
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
              <p className="font-[family-name:var(--font-cormorant)] text-lg italic text-[#EDF3F8]">
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
              <p className="font-[family-name:var(--font-cormorant)] text-base italic text-[#F5F0EB]">
                Saturday, May 28, 2026
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-sm tracking-wide text-[#D7E1EA]">
                Nine o'Clock in the Morning
              </p>
            </RevealItem>

            {/* Venue */}
            <RevealItem delay={1300} className="-mt-1">
              <p className="font-[family-name:var(--font-cormorant)] text-lg font-medium tracking-wide text-[#F5F0EB]">
                Saint Francis Xavier Parish
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-sm text-[#D7E1EA]">
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full translate-y-[42%] opacity-75">
            <FloralLottie
              className="w-full origin-bottom scale-[1.22]"
              animationData={flower3Animation}
              startEvent="wedding-content-reveal"
            />
          </div>

          {/* ── FLORAL — pinned to top-right ── */}
          {/* <div className="pointer-events-none absolute top-0 right-0 z-20 w-[46%] translate-x-[16%] -translate-y-[12%]">
            <FloralLottie className="w-full" />
          </div> */}
        </section>

        {false && <WeddingCountdownSection />}

        <section
          ref={section2Ref}
          className="
          relative -mt-px flex h-dvh w-full flex-col items-center justify-center
          overflow-hidden border border-t-0 border-[#C8B9A8] bg-[#F5F0EB]
          px-8 text-center
          md:h-[844px] md:w-[390px]
          md:shadow-2xl
        "
        >
          <div className="relative z-20 -mt-24 flex w-full max-w-[320px] flex-col gap-5 py-8 text-left">
            <RevealItem delay={1600}>
              <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#9AAABB]">
                Our Journey
              </p>
              <h3 className="mt-1 whitespace-nowrap font-[family-name:var(--font-cormorant)] text-[1.55rem] leading-none text-[#3A5060]">
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
          <div ref={flowers2SentinelRef} className="absolute bottom-0 left-0 w-full h-px" />

          <div className="pointer-events-none absolute top-0 right-0 z-10 w-[60%] translate-x-[24%] -translate-y-[56%] rotate-[15deg] opacity-80">
            <FloralLottie
              className="w-full origin-top-right scale-[1.08]"
              startOnView
              triggerRef={section2Ref}
            />
          </div>

          {/* Centre flower */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[44%] -translate-x-1/2 translate-y-[54%] opacity-75">
            <FloralLottie
              className="w-full origin-bottom scale-[1.5]"
              startOnView
              animationData={flower4Animation}
              loopMode="none"
              triggerRef={flowers2SentinelRef}
            />
          </div>
          {/* Left flower */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[34%] -translate-x-[160%] translate-y-[54%] opacity-75">
            <FloralLottie
              className="w-full origin-bottom scale-[1.35] -scale-x-100"
              startOnView
              animationData={flower4Animation}
              loopMode="none"
              triggerRef={flowers2SentinelRef}
            />
          </div>
          {/* Right flower */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[34%] translate-x-[60%] translate-y-[54%] opacity-75">
            <FloralLottie
              className="w-full origin-bottom scale-[1.35]"
              startOnView
              animationData={flower4Animation}
              loopMode="none"
              triggerRef={flowers2SentinelRef}
            />
          </div>
        </section>
      </main>
    </>
  );
}
