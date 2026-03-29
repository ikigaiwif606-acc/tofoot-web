"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { demoLeaderboard } from "@/lib/fantasy-data";
import { getUser } from "@/lib/fantasy-store";
import LeaderboardTable from "@/components/fantasy/LeaderboardTable";

export default function LeaderboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">排行榜</h1>
            <p className="mt-1 text-muted">Leaderboard</p>
          </div>
          <Link
            href="/fantasy/matches"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
          >
            去預測
          </Link>
        </div>

        {/* Stats summary */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-2xl font-bold text-accent">10</div>
            <div className="mt-1 text-xs text-muted">參賽玩家</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-2xl font-bold text-accent">30</div>
            <div className="mt-1 text-xs text-muted">總預測數</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-2xl font-bold text-accent">3</div>
            <div className="mt-1 text-xs text-muted">已結束比賽</div>
          </div>
        </div>

        {/* Podium */}
        <div className="mt-10 flex items-end justify-center gap-4">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="text-3xl">{demoLeaderboard[1].avatar}</div>
            <div className="mt-1 text-sm font-medium truncate max-w-[80px]">
              {demoLeaderboard[1].name}
            </div>
            <div className="mt-2 flex h-20 w-20 items-center justify-center rounded-t-lg bg-gray-400/20 text-xl font-bold text-gray-300 sm:w-24">
              {demoLeaderboard[1].totalPoints}
            </div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center">
            <div className="text-4xl">{demoLeaderboard[0].avatar}</div>
            <div className="mt-1 text-sm font-bold truncate max-w-[80px]">
              {demoLeaderboard[0].name}
            </div>
            <div className="mt-2 flex h-28 w-20 items-center justify-center rounded-t-lg bg-yellow-500/20 text-2xl font-bold text-yellow-400 sm:w-24">
              {demoLeaderboard[0].totalPoints}
            </div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="text-3xl">{demoLeaderboard[2].avatar}</div>
            <div className="mt-1 text-sm font-medium truncate max-w-[80px]">
              {demoLeaderboard[2].name}
            </div>
            <div className="mt-2 flex h-14 w-20 items-center justify-center rounded-t-lg bg-amber-700/20 text-xl font-bold text-amber-600 sm:w-24">
              {demoLeaderboard[2].totalPoints}
            </div>
          </div>
        </div>

        {/* Full table */}
        <div className="mt-10">
          <LeaderboardTable
            entries={demoLeaderboard}
            highlightName={user?.name}
          />
        </div>

        <div className="mt-6 text-center text-xs text-muted">
          排行榜每場比賽結束後自動更新。Demo data shown for preview.
        </div>
      </section>
    </main>
  );
}
