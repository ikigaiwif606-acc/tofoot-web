"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { demoLeaderboard, worldCupMatches } from "@/lib/fantasy-data";
import type { LeaderboardEntry } from "@/lib/fantasy-data";
import { getUser, getPredictions } from "@/lib/fantasy-store";
import { calculateScore } from "@/lib/scoring";
import LeaderboardTable from "@/components/fantasy/LeaderboardTable";

function buildLeaderboardWithUser(userName: string | null): LeaderboardEntry[] {
  if (!userName) return demoLeaderboard;

  const predictions = getPredictions();
  if (predictions.length === 0) return demoLeaderboard;

  let totalPoints = 0;
  let exactScores = 0;
  let correctResults = 0;

  for (const pred of predictions) {
    const match = worldCupMatches.find((m) => m.id === pred.matchId);
    if (!match || match.status !== "finished") continue;
    const score = calculateScore(pred, match);
    totalPoints += score.points;
    if (score.type === "exact") exactScores++;
    if (score.type === "result" || score.type === "difference") correctResults++;
  }

  const userEntry: LeaderboardEntry = {
    rank: 0,
    name: userName,
    avatar: "🎯",
    totalPoints,
    exactScores,
    correctResults,
    totalPredictions: predictions.length,
  };

  const combined = [...demoLeaderboard.map((e) => ({ ...e })), userEntry];
  combined.sort((a, b) => b.totalPoints - a.totalPoints);
  combined.forEach((entry, i) => (entry.rank = i + 1));

  return combined;
}

export default function LeaderboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [leaderboard, setLeaderboard] = useState(demoLeaderboard);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setLeaderboard(buildLeaderboardWithUser(u?.name ?? null));
  }, []);

  const totalPlayers = leaderboard.length;
  const totalPredictions = leaderboard.reduce((s, e) => s + e.totalPredictions, 0);
  const finishedMatches = worldCupMatches.filter((m) => m.status === "finished").length;

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
            <div className="text-2xl font-bold text-accent">{totalPlayers}</div>
            <div className="mt-1 text-xs text-muted">參賽玩家</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{totalPredictions}</div>
            <div className="mt-1 text-xs text-muted">總預測數</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-2xl font-bold text-accent">{finishedMatches}</div>
            <div className="mt-1 text-xs text-muted">已結束比賽</div>
          </div>
        </div>

        {/* Podium */}
        {leaderboard.length >= 3 && (
          <div className="mt-10 flex items-end justify-center gap-4">
            {/* 2nd */}
            <div className="flex flex-col items-center">
              <div className="text-3xl">{leaderboard[1].avatar}</div>
              <div className="mt-1 text-sm font-medium truncate max-w-[80px]">
                {leaderboard[1].name}
              </div>
              <div className="mt-2 flex h-20 w-20 items-center justify-center rounded-t-lg bg-gray-400/20 text-xl font-bold text-gray-300 sm:w-24">
                {leaderboard[1].totalPoints}
              </div>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center">
              <div className="text-4xl">{leaderboard[0].avatar}</div>
              <div className="mt-1 text-sm font-bold truncate max-w-[80px]">
                {leaderboard[0].name}
              </div>
              <div className="mt-2 flex h-28 w-20 items-center justify-center rounded-t-lg bg-yellow-500/20 text-2xl font-bold text-yellow-400 sm:w-24">
                {leaderboard[0].totalPoints}
              </div>
            </div>
            {/* 3rd */}
            <div className="flex flex-col items-center">
              <div className="text-3xl">{leaderboard[2].avatar}</div>
              <div className="mt-1 text-sm font-medium truncate max-w-[80px]">
                {leaderboard[2].name}
              </div>
              <div className="mt-2 flex h-14 w-20 items-center justify-center rounded-t-lg bg-amber-700/20 text-xl font-bold text-amber-600 sm:w-24">
                {leaderboard[2].totalPoints}
              </div>
            </div>
          </div>
        )}

        {/* User rank highlight */}
        {user && (
          <div className="mt-6 text-center">
            {(() => {
              const userEntry = leaderboard.find((e) => e.name === user.name);
              if (!userEntry) return null;
              return (
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm">
                  <span className="text-muted">你的排名：</span>
                  <span className="font-bold text-accent">#{userEntry.rank}</span>
                  <span className="text-muted">/ {leaderboard.length} 位玩家</span>
                </div>
              );
            })()}
          </div>
        )}

        {/* Full table */}
        <div className="mt-10">
          <LeaderboardTable
            entries={leaderboard}
            highlightName={user?.name}
          />
        </div>

        <div className="mt-6 text-center text-xs text-muted">
          排行榜每場比賽結束後自動更新
        </div>
      </section>
    </main>
  );
}
