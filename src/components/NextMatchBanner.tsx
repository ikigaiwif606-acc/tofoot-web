"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { worldCupMatches } from "@/lib/fantasy-data";

export default function NextMatchBanner() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const upcoming = worldCupMatches
    .filter((m) => m.status === "upcoming")
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());

  if (upcoming.length === 0) return null;

  const next = upcoming[0];
  const diff = new Date(next.kickoff).getTime() - now;
  if (diff <= 0 || diff > 7 * 24 * 60 * 60 * 1000) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return (
    <div className="border-b border-accent/10 bg-accent/[0.03]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3 text-sm">
          <span className="animate-neon-pulse rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
            NEXT
          </span>
          <span className="text-muted">
            {next.homeFlag} {next.homeTeam} vs {next.awayTeam} {next.awayFlag}
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            — {days > 0 ? `${days}天 ` : ""}{hours}小時後開賽
          </span>
        </div>
        <Link
          href="/fantasy/matches"
          className="rounded-md glass px-3 py-1 text-xs font-medium text-accent transition-all hover:shadow-[0_0_10px_rgba(0,255,136,0.15)]"
        >
          去預測
        </Link>
      </div>
    </div>
  );
}
