"use client";

import React, { useEffect, useState } from "react";
import RevealItem from "@/components/RevealItem";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const WEDDING_DATE = new Date("2026-05-28T09:00:00");
const CHURCH_NAME = "Saint Francis Xavier Parish";
const CHURCH_ADDRESS = "Halawig-gogon, Goa, Camarines Sur";
const RECEPTION_NAME = "RMG Flowing Resort";
const RECEPTION_ADDRESS = "Zone 6 Danlog, San Jose, Camarines Sur";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&origin=" +
  encodeURIComponent(`${CHURCH_NAME}, ${CHURCH_ADDRESS}`) +
  "&destination=" +
  encodeURIComponent(`${RECEPTION_NAME}, ${RECEPTION_ADDRESS}`) +
  "&travelmode=driving";
const MAP_EMBED_URL =
  "https://maps.google.com/maps?saddr=" +
  encodeURIComponent(`${CHURCH_NAME}, ${CHURCH_ADDRESS}`) +
  "&daddr=" +
  encodeURIComponent(`${RECEPTION_NAME}, ${RECEPTION_ADDRESS}`) +
  "&output=embed";

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, done: false };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-w-[58px] flex-col items-center rounded-xl border border-[#B4C6D6] bg-[#EAF1F7] px-2 py-2.5 max-[360px]:min-w-[54px] max-[360px]:px-1.5 sm:min-w-[66px] sm:px-3 sm:py-3">
      <span className="font-[family-name:var(--font-cormorant)] text-[1.58rem] font-semibold leading-none text-[#2F475A] max-[360px]:text-[1.42rem] sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-[family-name:var(--font-cormorant)] text-[10px] uppercase tracking-[0.16em] text-[#6B8192] max-[360px]:text-[9px] max-[360px]:tracking-[0.13em] sm:text-[11px] sm:tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

export default function WeddingCountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    done: false,
  });

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
      relative -mt-px flex min-h-svh w-full flex-col items-center
      overflow-hidden border border-t-0 border-[#8DA5B8] bg-[#A7B8C8]
      px-4 py-12 text-center max-[360px]:px-3 sm:px-6 sm:py-14
      md:w-[390px]
      md:shadow-2xl
    "
    >
      {/* ── PARTICLES ── */}
      <div className="wedding-particle-layer" aria-hidden="true">
        {(
          [
            { x: '12%', y: '18%', size: '5px', color: 'rgba(255,255,255,0.75)', dur: '8s',   delay: '0.6s', anim: 'weddingParticleFloatRight' },
            { x: '35%', y: '45%', size: '6px', color: 'rgba(220,235,245,0.80)', dur: '7s',   delay: '2s',   anim: 'weddingParticleFloatLeft'  },
            { x: '58%', y: '28%', size: '5px', color: 'rgba(255,255,255,0.70)', dur: '9.5s', delay: '1s',   anim: 'weddingParticleFloatRight' },
            { x: '80%', y: '60%', size: '6px', color: 'rgba(220,235,245,0.75)', dur: '6.5s', delay: '3s',   anim: 'weddingParticleFloatLeft'  },
            { x: '22%', y: '72%', size: '5px', color: 'rgba(255,255,255,0.70)', dur: '10s',  delay: '4s',   anim: 'weddingParticleFloatRight' },
            { x: '90%', y: '30%', size: '6px', color: 'rgba(220,235,245,0.80)', dur: '7.5s', delay: '1.5s', anim: 'weddingParticleFloatLeft'  },
            { x: '48%', y: '82%', size: '5px', color: 'rgba(255,255,255,0.70)', dur: '8.5s', delay: '0.3s', anim: 'weddingParticleFloatRight' },
            { x: '68%', y: '12%', size: '6px', color: 'rgba(220,235,245,0.75)', dur: '6s',   delay: '2.8s', anim: 'weddingParticleFloatLeft'  },
          ] as Array<{ x: string; y: string; size: string; color: string; dur: string; delay: string; anim: string }>
        ).map((p, i) => (
          <div
            key={i}
            className="wedding-particle"
            style={{
              '--p-x': p.x, '--p-y': p.y, '--p-size': p.size,
              '--p-color': p.color, '--p-dur': p.dur, '--p-delay': p.delay,
              '--p-anim': p.anim,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <RevealItem delay={1200}>
        <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#E9F0F5]">
          Event Details
        </p>
      </RevealItem>

      <RevealItem delay={1350}>
        <h2 className="mt-2 max-w-[16ch] font-[family-name:var(--font-cormorant)] text-[clamp(1.72rem,8.2vw,2.35rem)] italic leading-[0.98] text-[#F3F7FB] max-[360px]:text-[1.56rem]">
          Countdown, Church & Reception
        </h2>
      </RevealItem>

      <RevealItem delay={1500}>
        <p className="mt-3 font-[family-name:var(--font-cormorant)] text-base text-[#E1EAF1] max-[360px]:text-[0.93rem]">
          May 28, 2026 • 9:00 AM
        </p>
      </RevealItem>

      <RevealItem delay={1650}>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 max-[360px]:gap-2">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
      </RevealItem>

      <RevealItem delay={1800}>
        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-lg italic text-[#E7EFF6] max-[360px]:text-[1.02rem]">
          {timeLeft.done
            ? "Today we say I do."
            : "Every second brings us closer to forever."}
        </p>
      </RevealItem>

      <RevealItem delay={1950}>
        <div className="mt-7 w-full max-w-[340px] overflow-hidden rounded-[1.75rem] border border-[#B4C6D6] bg-[#EDF3F8] text-left shadow-[0_18px_40px_rgba(47,71,90,0.08)]">
          <div className="px-4 pt-4 pb-3 sm:px-5 sm:pt-5">
            <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.24em] text-[#6D8394]">
              Event Details
            </p>
            <h3 className="mt-1 max-w-[15ch] font-[family-name:var(--font-cormorant)] text-[1.42rem] italic leading-[0.96] text-[#2F475A] max-[360px]:text-[1.28rem] sm:text-[1.58rem]">
              Ceremony, reception, and route
            </h3>
          </div>

          <div className="px-4 pb-4 sm:px-5 sm:pb-5">
            <div className="flex items-center gap-3 border-t border-[#D3DEE8] pt-3.5 text-[#6D8394]">
              <span className="font-[family-name:var(--font-cormorant)] text-[10px] uppercase tracking-[0.24em]">
                From altar
              </span>
              <span className="h-px flex-1 bg-[#C7D5E0]" />
              <span className="font-[family-name:var(--font-cormorant)] text-[10px] uppercase tracking-[0.24em]">
                To celebration
              </span>
            </div>

            <div className="mt-4 grid gap-3 text-left sm:grid-cols-12">
              <div className="rounded-[1.35rem] border border-[#C2D1DD] bg-[#F5F9FC] p-4 sm:col-span-7 sm:p-4.5">
                <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#6D8394]">
                  Church Ceremony
                </p>
                <p className="mt-1 max-w-[20ch] font-[family-name:var(--font-cormorant)] text-[1.14rem] font-medium leading-tight text-[#2F475A] max-[360px]:text-[1.02rem] sm:text-[1.22rem]">
                  {CHURCH_NAME}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-cormorant)] text-sm leading-relaxed text-[#546A7B]">
                  {CHURCH_ADDRESS}
                </p>
              </div>

              <div className="rounded-[1.35rem] border border-[#C2D1DD] bg-[#F0F5F9] p-4 sm:col-span-5 sm:self-end sm:p-4">
                <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#7A8E9D]">
                  Reception
                </p>
                <p className="mt-1 max-w-[18ch] font-[family-name:var(--font-cormorant)] text-[1.02rem] italic leading-tight text-[#2F475A] sm:text-[1.08rem]">
                  {RECEPTION_NAME}
                </p>
                <p className="mt-1.5 font-[family-name:var(--font-cormorant)] text-sm leading-relaxed text-[#546A7B]">
                  {RECEPTION_ADDRESS}
                </p>
              </div>
            </div>

            <div className="mt-3 overflow-hidden rounded-[1.35rem] border border-[#C2D1DD] bg-[#F8FBFD]">
              <div className="border-b border-[#D4E0E9] px-4 py-3 sm:px-4.5">
                <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#6D8394]">
                  Route Map
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-sm text-[#546A7B]">
                  Follow the path from church to reception
                </p>
              </div>
              <div className="relative w-full overflow-hidden pb-[60%] sm:pb-[52%]">
                <iframe
                  title="Route from church to reception"
                  src={MAP_EMBED_URL}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#D4E0E9] px-4 py-3 sm:px-4.5">
                <p className="font-[family-name:var(--font-cormorant)] text-[0.82rem] text-[#6B8192] max-[360px]:text-[0.76rem]">
                  Ceremony first, reception after.
                </p>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center rounded-full border border-[#9AB1C3] bg-[#F2F7FB] px-3.5 py-2 font-[family-name:var(--font-cormorant)] text-[0.82rem] tracking-wide text-[#2F475A] transition hover:bg-[#DEEAF3] max-[360px]:px-3 max-[360px]:text-[0.76rem] sm:px-4 sm:text-sm"
                >
                  Open Navigation
                </a>
              </div>
            </div>

          </div>
        </div>
      </RevealItem>
    </section>
  );
}
