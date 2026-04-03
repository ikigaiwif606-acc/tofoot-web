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
    <div className="border-b border-accent/10 bg-accent/[0.03]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-sm">
          <span className="animate-accent-pulse rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
            NEXT
          </span>
          <span className="text-muted">
            {match.homeFlag} {match.homeTeam} vs {match.awayTeam}{" "}
            {match.awayFlag}
          </span>
          <span className="hidden text-xs text-muted sm:inline">
            — {days > 0 ? `${days}天 ` : ""}
            {hours}小時後開賽
          </span>
        </div>
        <Link
          href="/world-cup/predict"
          className="rounded-md card px-3 py-1 text-xs font-medium text-accent transition-all hover:bg-surface-hover"
        >
          去預測
        </Link>
      </div>
    </div>
  );
}
