"use client";

import Image from "next/image";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeaderQuestion({ totalSeconds }: { totalSeconds: number }) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/logoo.png"
            alt="Logo"
            width={52}
            height={52}
            className="h-11 w-11 rounded-xl object-contain sm:h-[52px] sm:w-[52px]"
          />

          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Assessment
            </p>
            <h1 className="truncate text-xl font-bold text-blue-600 sm:text-2xl">Nexus</h1>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 rounded-2xl bg-indigo-950 px-3 py-2 text-white shadow-sm sm:px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Timer className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-100/70">
              Time Left
            </p>
            <span className="text-sm font-semibold tabular-nums sm:text-base">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
