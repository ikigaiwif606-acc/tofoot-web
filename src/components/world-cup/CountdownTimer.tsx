"use client";

import { useState, useEffect } from "react";

const WORLD_CUP_START = new Date("2026-06-11T00:00:00Z").getTime();

export default function CountdownTimer() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = WORLD_CUP_START - now;
  if (diff <= 0) {
    return (
      <div className="text-center text-2xl font-bold text-accent">
        世界盃已經開始！
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const units = [
    { value: days, label: "天", labelEn: "Days" },
    { value: hours, label: "時", labelEn: "Hrs" },
    { value: minutes, label: "分", labelEn: "Min" },
    { value: seconds, label: "秒", labelEn: "Sec" },
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {units.map((unit, i) => (
        <div key={unit.labelEn} className="flex flex-col items-center">
          <div className="scoreboard-digit px-4 py-3 sm:px-8 sm:py-5 rounded-xl animate-glow-border">
            <div className="text-2xl font-bold font-mono tabular-nums sm:text-4xl">
              {String(unit.value).padStart(2, "0")}
            </div>
          </div>
          <div className="mt-2 text-[10px] text-muted sm:text-xs">
            {unit.label}
          </div>
          {/* Separator colon between digits */}
          {i < units.length - 1 && (
            <span className="absolute" />
          )}
        </div>
      ))}
    </div>
  );
}
