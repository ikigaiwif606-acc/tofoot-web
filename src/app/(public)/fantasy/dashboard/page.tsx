"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { worldCupMatches } from "@/lib/fantasy-data";
import { getUser, getPredictions, clearUser } from "@/lib/fantasy-store";
import { calculateScore } from "@/lib/scoring";
import type { Prediction } from "@/lib/fantasy-data";

function calculateStreak(predictions: Prediction[]): { current: number; best: number } {
  const scored = predictions
    .map((pred) => {
      const match = worldCupMatches.find((m) => m.id === pred.matchId);
      if (!match || match.status !== "finished") return null;
      const score = calculateScore(pred, match);
      return score.points > 0;
    })
    .filter((v): v is boolean => v !== null);

  let current = 0;
  for (let i = scored.length - 1; i >= 0; i--) {
    if (scored[i]) current++;
    else break;
  }

  let best = 0;
  let run = 0;
  for (const correct of scored) {
    if (correct) { run++; best = Math.max(best, run); }
    else run = 0;
  }

  return { current, best };
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    setUser(getUser());
    setPredictions(getPredictions());
  }, []);

  if (!user) {
    return (
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <h1 className="text-3xl font-bold">我的面板</h1>
          <p className="mt-4 text-muted">你還沒有加入夢幻足球</p>
          <Link
            href="/fantasy/matches"
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-colors hover:bg-accent-dark"
          >
            立即加入
          </Link>
        </section>
      </main>
    );
  }

  // Calculate stats
  const predictionsWithScores = predictions.map((pred) => {
    const match = worldCupMatches.find((m) => m.id === pred.matchId);
    const score = match ? calculateScore(pred, match) : null;
    return { ...pred, match, score };
  });

  const totalPoints = predictionsWithScores.reduce(
    (sum, p) => sum + (p.score?.points ?? 0),
    0
  );
  const exactScores = predictionsWithScores.filter(
    (p) => p.score?.type === "exact"
  ).length;
  const scoredPredictions = predictionsWithScores.filter(
    (p) => p.match?.status === "finished"
  );
  const accuracy =
    scoredPredictions.length > 0
      ? Math.round(
          (scoredPredictions.filter((p) => (p.score?.points ?? 0) > 0).length /
            scoredPredictions.length) *
            100
        )
      : 0;

  const streak = calculateStreak(predictions);

  const handleLogout = () => {
    clearUser();
    setUser(null);
    setPredictions([]);
  };

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl">
              ⚽
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-muted">我的面板 Dashboard</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:bg-card-bg hover:text-foreground"
          >
            登出
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-3xl font-bold text-accent">{totalPoints}</div>
            <div className="mt-1 text-xs text-muted">總積分</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-3xl font-bold text-foreground">
              {predictions.length}
            </div>
            <div className="mt-1 text-xs text-muted">預測數</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {exactScores}
            </div>
            <div className="mt-1 text-xs text-muted">完美預測</div>
          </div>
          <div className="rounded-xl border border-card-border bg-card-bg p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">{accuracy}%</div>
            <div className="mt-1 text-xs text-muted">正確率</div>
          </div>
          <div className="col-span-2 rounded-xl border border-card-border bg-card-bg p-4 text-center sm:col-span-1">
            <div className="text-3xl font-bold text-orange-400">{streak.current}</div>
            <div className="mt-1 text-xs text-muted">
              連續正確
              {streak.best > streak.current && (
                <span className="block text-[10px]">最佳: {streak.best}</span>
              )}
            </div>
          </div>
        </div>

        {/* Streak badge */}
        {streak.current >= 2 && (
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm">
              <span>🔥</span>
              <span className="font-semibold text-orange-400">
                {streak.current} 連勝！
              </span>
              <span className="text-muted">繼續保持！</span>
            </div>
          </div>
        )}

        {/* Prediction history */}
        <div className="mt-10">
          <h2 className="text-xl font-bold">預測紀錄</h2>
          {predictions.length === 0 ? (
            <div className="mt-6 rounded-xl border border-card-border bg-card-bg p-8 text-center">
              <p className="text-muted">你還沒有任何預測</p>
              <Link
                href="/fantasy/matches"
                className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
              >
                開始預測
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {predictionsWithScores.map((pred) => {
                if (!pred.match) return null;
                const m = pred.match;
                return (
                  <div
                    key={pred.matchId}
                    className="flex items-center justify-between rounded-xl border border-card-border bg-card-bg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-sm">
                          {m.homeFlag} {m.homeTeam}
                        </div>
                        <div className="text-xs text-muted">vs</div>
                        <div className="text-sm">
                          {m.awayFlag} {m.awayTeam}
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted">你的預測</div>
                      <div className="text-lg font-bold">
                        {pred.homeScore} : {pred.awayScore}
                      </div>
                    </div>
                    {m.status === "finished" ? (
                      <div className="text-center">
                        <div className="text-xs text-muted">結果</div>
                        <div className="text-lg font-bold text-accent">
                          {m.homeScore} : {m.awayScore}
                        </div>
                        {pred.score && (
                          <div
                            className={`text-xs font-medium ${
                              pred.score.type === "exact"
                                ? "text-yellow-400"
                                : pred.score.type === "wrong"
                                ? "text-red-400"
                                : "text-accent"
                            }`}
                          >
                            +{pred.score.points}分
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-xs text-muted">狀態</div>
                        <div className="text-sm text-accent">等待中</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/fantasy/matches"
            className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
          >
            繼續預測
          </Link>
          <Link
            href="/fantasy/leaderboard"
            className="rounded-lg border border-card-border px-6 py-2 text-sm font-medium transition-colors hover:bg-card-bg"
          >
            排行榜
          </Link>
        </div>
      </section>
    </main>
  );
}
