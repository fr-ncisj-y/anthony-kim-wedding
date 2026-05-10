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
const CHURCH_NAME = "Saint Francis Xavier Parish";
const CHURCH_ADDRESS = "Halawig-gogon, Goa, Camarines Sur";
const RECEPTION_NAME = "Kim & Anthony Wedding Reception";
const RECEPTION_ADDRESS = "Goa, Camarines Sur";
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
    <div className="flex min-w-[58px] flex-col items-center rounded-xl border border-[#CFC2B3] bg-[#F8F4EF] px-2 py-2.5 max-[360px]:min-w-[54px] max-[360px]:px-1.5 sm:min-w-[66px] sm:px-3 sm:py-3">
      <span className="font-[family-name:var(--font-cormorant)] text-[1.58rem] font-semibold leading-none text-[#3A5060] max-[360px]:text-[1.42rem] sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-[family-name:var(--font-cormorant)] text-[10px] uppercase tracking-[0.16em] text-[#8A9BA8] max-[360px]:text-[9px] max-[360px]:tracking-[0.13em] sm:text-[11px] sm:tracking-[0.2em]">
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
      relative -mt-px flex min-h-dvh w-full flex-col items-center
      overflow-hidden border border-t-0 border-[#C8B9A8] bg-[#F5F0EB]
      px-4 py-12 text-center max-[360px]:px-3 sm:px-6 sm:py-14
      md:w-[390px]
      md:shadow-2xl
    "
    >
      <RevealItem delay={1200}>
        <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.22em] text-[#8A9BA8]">
          Event Details
        </p>
      </RevealItem>

      <RevealItem delay={1350}>
        <h2 className="mt-2 max-w-[16ch] font-[family-name:var(--font-cormorant)] text-[clamp(1.72rem,8.2vw,2.35rem)] italic leading-[0.98] text-[#3A5060] max-[360px]:text-[1.56rem]">
          Countdown, Church & Reception
        </h2>
      </RevealItem>

      <RevealItem delay={1500}>
        <p className="mt-3 font-[family-name:var(--font-cormorant)] text-base text-[#5C6D79] max-[360px]:text-[0.93rem]">
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
        <p className="mt-6 font-[family-name:var(--font-cormorant)] text-lg italic text-[#5B6B77] max-[360px]:text-[1.02rem]">
          {timeLeft.done
            ? "Today we say I do."
            : "Every second brings us closer to forever."}
        </p>
      </RevealItem>

      <RevealItem delay={1950}>
        <div className="mt-7 grid w-full max-w-[340px] grid-cols-1 gap-3 text-left">
          <div className="rounded-2xl border border-[#D8CCC0] bg-[#FCF9F5] p-3.5 max-[360px]:p-3 sm:p-4">
            <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.2em] text-[#8A9BA8]">
              Church Ceremony
            </p>
            <p className="mt-1 max-w-[22ch] font-[family-name:var(--font-cormorant)] text-[1.14rem] font-medium leading-tight text-[#3A5060] max-[360px]:text-[1.02rem] sm:text-xl">
              {CHURCH_NAME}
            </p>
            <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm leading-relaxed text-[#5C6D79]">
              {CHURCH_ADDRESS}
            </p>
          </div>

          <div className="rounded-2xl border border-[#D8CCC0] bg-[#FCF9F5] p-3.5 max-[360px]:p-3 sm:p-4">
            <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.2em] text-[#8A9BA8]">
              Reception Venue
            </p>
            <p className="mt-1 max-w-[22ch] font-[family-name:var(--font-cormorant)] text-[1.14rem] font-medium leading-tight text-[#3A5060] max-[360px]:text-[1.02rem] sm:text-xl">
              {RECEPTION_NAME}
            </p>
            <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm leading-relaxed text-[#5C6D79]">
              {RECEPTION_ADDRESS}
            </p>
          </div>
        </div>
      </RevealItem>

      <RevealItem delay={2100}>
        <div className="mt-4 w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#D8CCC0] bg-[#FCF9F5]">
          <div className="border-b border-[#E7DDD3] px-4 py-3 text-left">
            <p className="font-[family-name:var(--font-cormorant)] text-[11px] uppercase tracking-[0.2em] text-[#8A9BA8]">
              Route Map
            </p>
            <p className="font-[family-name:var(--font-cormorant)] text-sm text-[#5C6D79]">
              From church to reception
            </p>
          </div>
          <div className="relative w-full overflow-hidden pb-[68%] sm:pb-[62%]">
            <iframe
              title="Route from church to reception"
              src={MAP_EMBED_URL}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="px-4 py-3 text-center">
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center rounded-full border border-[#CBB9A8] px-3.5 py-2 font-[family-name:var(--font-cormorant)] text-[0.82rem] tracking-wide text-[#3A5060] transition hover:bg-[#F2EAE2] max-[360px]:px-3 max-[360px]:text-[0.76rem] sm:px-4 sm:text-sm"
            >
              Open Navigation
            </a>
          </div>
        </div>
      </RevealItem>
    </section>
  );
}
