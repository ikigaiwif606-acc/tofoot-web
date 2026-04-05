"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NextMatchBannerProps {
  match?: {
    homeTeam: string;
    awayTeam: string;
    homeFlag: string;
    awayFlag: string;
    kickoff: string;
  } | null;
}

export default function NextMatchBanner({ match }: NextMatchBannerProps) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!match) return null;

  const diff = new Date(match.kickoff).getTime() - now;
  if (diff <= 0 || diff > 7 * 24 * 60 * 60 * 1000) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return (
    <div
      className="border-b"
      style={{
        background: "rgba(0, 255, 255, 0.06)",
        borderColor: "rgba(0, 255, 255, 0.2)",
        padding: "7px 0",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span
            className="animate-blink-live font-display text-[9px] font-bold tracking-[1px]"
            style={{
              border: "1px solid rgba(0, 255, 255, 0.4)",
              color: "#00ffff",
              padding: "2px 8px",
            }}
          >
            LIVE
          </span>
          <span className="font-tech text-[11px] text-muted">
            {match.homeFlag} {match.homeTeam} vs {match.awayTeam}{" "}
            {match.awayFlag}
            <span className="hidden sm:inline" style={{ color: "#ff00ff" }}>
              {" "}// {days > 0 ? `${days}D ` : ""}{hours}H
            </span>
          </span>
        </div>
        <Link
          href="/world-cup/predict"
          className="font-display text-[9px] font-bold tracking-[1px] text-neon-magenta transition-colors hover:text-neon-cyan"
          style={{ textShadow: "0 0 6px #ff00ff" }}
        >
          PREDICT →
        </Link>
      </div>
    </div>
  );
}
