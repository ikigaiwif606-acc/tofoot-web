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
      <div className="text-center font-display text-xl font-bold text-neon-cyan" style={{ textShadow: "0 0 12px #00ffff" }}>
        WORLD CUP HAS STARTED
      </div>
    );
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const units = [
    { value: days, label: "DAYS" },
    { value: hours, label: "HRS" },
    { value: minutes, label: "MIN" },
    { value: seconds, label: "SEC" },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <div className="count-number text-[26px] sm:text-[32px]">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="count-label mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
