"use client";

import { useEffect, useState } from "react";
import RevealItem from "@/components/RevealItem";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

const WEDDING_DATE = new Date("2026-05-28T09:00:00");

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
    <div className="flex min-w-[64px] flex-col items-center rounded-xl border border-[#CFC2B3] bg-[#F8F4EF] px-3 py-3">
      <span className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold leading-none text-[#3A5060]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.2em] text-[#8A9BA8]">
        {label}
      </span>
    </div>
  );
}

export default function WeddingCountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="
      relative -mt-px flex h-dvh w-full flex-col items-center justify-center
      overflow-hidden border border-t-0 border-[#C8B9A8] bg-[#F5F0EB]
      px-8 text-center
      md:h-[844px] md:w-[390px]
      md:shadow-2xl
    "
    >
      <RevealItem delay={1550}>
        <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#8A9BA8]">
          Countdown To Our Wedding Day
        </p>
      </RevealItem>

      <RevealItem delay={1700}>
        <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-5xl italic leading-none text-[#3A5060]">
          Save The Date
        </h2>
      </RevealItem>

      <RevealItem delay={1850}>
        <p className="mt-3 font-[family-name:var(--font-cormorant)] text-base text-[#5C6D79]">
          May 28, 2026 • 9:00 AM
        </p>
      </RevealItem>

      <RevealItem delay={2000}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TimeBlock value={timeLeft.days} label="Days" />
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <TimeBlock value={timeLeft.seconds} label="Seconds" />
        </div>
      </RevealItem>

      <RevealItem delay={2150}>
        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-lg italic text-[#5B6B77]">
          {timeLeft.done
            ? "Today we say I do."
            : "Every second brings us closer to forever."}
        </p>
      </RevealItem>
    </section>
  );
}
