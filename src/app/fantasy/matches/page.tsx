"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { worldCupMatches } from "@/lib/fantasy-data";
import { getUser, setUser } from "@/lib/fantasy-store";
import MatchPredictionCard from "@/components/fantasy/MatchPredictionCard";
import JoinForm from "@/components/fantasy/JoinForm";

type Tab = "upcoming" | "finished";

export default function MatchesPage() {
  const [user, setUserState] = useState<{ name: string } | null>(null);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [groupFilter, setGroupFilter] = useState<string>("all");

  useEffect(() => {
    setUserState(getUser());
  }, []);

  const handleJoin = (name: string) => {
    const u = setUser(name);
    setUserState(u);
  };

  const upcoming = worldCupMatches.filter((m) => m.status === "upcoming");
  const finished = worldCupMatches.filter((m) => m.status === "finished");
  const currentMatches = tab === "upcoming" ? upcoming : finished;

  const groups = Array.from(
    new Set(currentMatches.filter((m) => m.group).map((m) => m.group!))
  ).sort();

  const filteredMatches =
    groupFilter === "all"
      ? currentMatches
      : currentMatches.filter((m) => m.group === groupFilter);

  // Count matches closing within 24h
  const urgentCount = upcoming.filter((m) => {
    const diff = new Date(m.kickoff).getTime() - Date.now();
    return diff > 0 && diff < 24 * 60 * 60 * 1000;
  }).length;

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">比賽預測</h1>
            <p className="mt-1 text-muted">Match Predictions</p>
          </div>
          {user && (
            <div className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-4 py-2">
              <span className="text-lg">⚽</span>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
          )}
        </div>

        {!user ? (
          <div className="mt-12">
            <JoinForm onJoin={handleJoin} />
          </div>
        ) : (
          <>
            {/* Urgent deadline warning */}
            {urgentCount > 0 && tab === "upcoming" && (
              <div className="mt-6 flex items-center gap-3 rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm">
                <span className="animate-pulse-soft text-lg">⏰</span>
                <span className="text-orange-400">
                  <strong>{urgentCount}</strong> 場比賽即將在 24 小時內截止預測！
                </span>
              </div>
            )}

            {/* Tabs */}
            <div className="mt-8 flex gap-2">
              <button
                onClick={() => { setTab("upcoming"); setGroupFilter("all"); }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tab === "upcoming"
                    ? "bg-accent text-black"
                    : "bg-card-bg text-muted hover:text-foreground"
                }`}
              >
                即將開始 ({upcoming.length})
              </button>
              <button
                onClick={() => { setTab("finished"); setGroupFilter("all"); }}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tab === "finished"
                    ? "bg-accent text-black"
                    : "bg-card-bg text-muted hover:text-foreground"
                }`}
              >
                已結束 ({finished.length})
              </button>
            </div>

            {/* Group filter */}
            {groups.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setGroupFilter("all")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    groupFilter === "all"
                      ? "bg-accent/20 text-accent"
                      : "bg-card-bg text-muted hover:text-foreground"
                  }`}
                >
                  全部
                </button>
                {groups.map((g) => (
                  <button
                    key={g}
                    onClick={() => setGroupFilter(g)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      groupFilter === g
                        ? "bg-accent/20 text-accent"
                        : "bg-card-bg text-muted hover:text-foreground"
                    }`}
                  >
                    Group {g}
                  </button>
                ))}
              </div>
            )}

            {/* Match cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {filteredMatches.map((match) => (
                <MatchPredictionCard
                  key={match.id}
                  match={match}
                  isLoggedIn={true}
                />
              ))}
            </div>

            {filteredMatches.length === 0 && (
              <div className="mt-12 text-center text-muted">
                沒有符合條件的比賽
              </div>
            )}

            {/* Nav */}
            <div className="mt-12 flex justify-center gap-4">
              <Link
                href="/fantasy/leaderboard"
                className="rounded-lg border border-card-border px-6 py-2 text-sm font-medium transition-colors hover:bg-card-bg"
              >
                查看排行榜
              </Link>
              <Link
                href="/fantasy/dashboard"
                className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
              >
                我的面板
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
