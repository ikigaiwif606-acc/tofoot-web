"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import type { Match, Prediction } from "@/lib/db/queries";
import { calculateScore } from "@/lib/scoring";
import { submitPrediction } from "../actions";
import JoinModal from "@/components/world-cup/JoinModal";

type Tab = "upcoming" | "finished";

// ---- Match Prediction Card ----

function MatchCard({
  match,
  existingPrediction,
}: {
  match: Match;
  existingPrediction?: Prediction;
}) {
  const [homeScore, setHomeScore] = useState(existingPrediction?.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(existingPrediction?.awayScore ?? 0);
  const [state, formAction, pending] = useActionState(submitPrediction, {
    success: false,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  const isUpcoming = match.status === "upcoming";
  const kickoffTime = new Date(match.kickoff).getTime();
  const isClosed = kickoffTime <= Date.now();
  const canPredict = isUpcoming && !isClosed;

  // Countdown to kickoff for upcoming matches
  const getKickoffLabel = () => {
    if (!isUpcoming) return null;
    const diff = kickoffTime - Date.now();
    if (diff <= 0) return "已截止";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}天 ${hours}時後開賽`;
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 0) return `${hours}時 ${mins}分後開賽`;
    return `${mins}分後開賽`;
  };

  // Score breakdown for finished matches
  const scoreBreakdown = existingPrediction && match.status === "finished"
    ? calculateScore(existingPrediction, match)
    : null;

  return (
    <div className="card">
      {/* Header: stage & kickoff */}
      <div className="flex items-center justify-between text-xs text-muted mb-3">
        <span>{match.stage}{match.groupName ? ` - ${match.groupName}` : ""}</span>
        {isUpcoming && (
          <span className={`${!isClosed && kickoffTime - Date.now() < 24 * 60 * 60 * 1000 ? "text-accent" : ""}`}>
            {getKickoffLabel()}
          </span>
        )}
        {match.status === "finished" && (
          <span className="text-secondary">已結束</span>
        )}
      </div>

      {/* Teams + score */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex-1 text-center">
          <div className="text-2xl">{match.homeFlag}</div>
          <div className="mt-1 text-xs font-medium truncate">{match.homeTeam}</div>
        </div>

        {/* Score area */}
        <div className="flex items-center gap-2">
          {canPredict ? (
            <>
              <ScoreInput value={homeScore} onChange={setHomeScore} />
              <span className="text-muted font-bold">:</span>
              <ScoreInput value={awayScore} onChange={setAwayScore} />
            </>
          ) : isUpcoming && isClosed ? (
            <div className="text-center">
              {existingPrediction ? (
                <div className="font-mono text-lg font-bold">
                  {existingPrediction.homeScore} : {existingPrediction.awayScore}
                </div>
              ) : (
                <div className="text-sm text-muted">未預測</div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <div className="font-mono text-lg font-bold text-accent">
                {match.homeScore} : {match.awayScore}
              </div>
              {existingPrediction && (
                <div className="text-xs text-muted mt-1">
                  你: {existingPrediction.homeScore} : {existingPrediction.awayScore}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1 text-center">
          <div className="text-2xl">{match.awayFlag}</div>
          <div className="mt-1 text-xs font-medium truncate">{match.awayTeam}</div>
        </div>
      </div>

      {/* Save button for upcoming */}
      {canPredict && (
        <form action={formAction} className="mt-3">
          <input type="hidden" name="matchId" value={match.id} />
          <input type="hidden" name="homeScore" value={homeScore} />
          <input type="hidden" name="awayScore" value={awayScore} />
          <button
            type="submit"
            disabled={pending}
            className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50 ${
              saved
                ? "bg-green-600 text-white"
                : "bg-accent text-white hover:bg-accent-hover"
            }`}
          >
            {pending ? "儲存中..." : saved ? "已儲存 \u2713" : existingPrediction ? "更新預測" : "儲存預測"}
          </button>
          {state.error && (
            <p className="mt-1 text-xs text-danger text-center">{state.error}</p>
          )}
        </form>
      )}

      {/* Points for finished matches */}
      {scoreBreakdown && match.status === "finished" && (
        <div className={`mt-3 text-center text-sm font-medium ${
          scoreBreakdown.type === "exact"
            ? "text-gold"
            : scoreBreakdown.type === "wrong"
            ? "text-danger"
            : "text-accent"
        }`}>
          +{scoreBreakdown.points} 分 - {scoreBreakdown.reason}
        </div>
      )}

      {/* Not predicted for finished */}
      {!existingPrediction && match.status === "finished" && (
        <div className="mt-3 text-center text-xs text-muted">未預測此場比賽</div>
      )}
    </div>
  );
}

// ---- Score Input ----

function ScoreInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.min(value + 1, 20))}
        className="flex h-6 w-8 items-center justify-center rounded border border-card-border text-xs hover:bg-surface-hover transition-colors"
      >
        +
      </button>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-background font-mono text-lg font-bold">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.max(value - 1, 0))}
        className="flex h-6 w-8 items-center justify-center rounded border border-card-border text-xs hover:bg-surface-hover transition-colors"
      >
        -
      </button>
    </div>
  );
}

// ---- Main Client Component ----

export default function PredictClient({
  matches,
  predictions,
  userId,
}: {
  matches: Match[];
  predictions: Prediction[];
  userId: number | null;
}) {
  const [tab, setTab] = useState<Tab>("upcoming");
  const [groupFilter, setGroupFilter] = useState("all");

  // Build prediction lookup by matchId
  const predictionMap = new Map(predictions.map((p) => [p.matchId, p]));

  const upcoming = matches.filter((m) => m.status === "upcoming");
  const finished = matches.filter((m) => m.status === "finished");
  const currentMatches = tab === "upcoming" ? upcoming : finished;

  const groups = Array.from(
    new Set(currentMatches.filter((m) => m.groupName).map((m) => m.groupName!))
  ).sort();

  const filteredMatches =
    groupFilter === "all"
      ? currentMatches
      : currentMatches.filter((m) => m.groupName === groupFilter);

  // Count matches closing within 24h
  const urgentCount = upcoming.filter((m) => {
    const diff = new Date(m.kickoff).getTime() - Date.now();
    return diff > 0 && diff < 24 * 60 * 60 * 1000;
  }).length;

  if (!userId) {
    return (
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">比賽預測</h1>
            <p className="mt-1 text-muted">Match Predictions</p>
          </div>
          <JoinModal />
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">比賽預測</h1>
            <p className="mt-1 text-muted">Match Predictions</p>
          </div>
        </div>

        {/* Urgent deadline warning */}
        {urgentCount > 0 && tab === "upcoming" && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm">
            <span className="animate-pulse text-lg">{"\u23F0"}</span>
            <span className="text-accent">
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
                ? "bg-accent text-white"
                : "border border-card-border text-muted hover:text-foreground hover:bg-surface-hover"
            }`}
          >
            即將開始 ({upcoming.length})
          </button>
          <button
            onClick={() => { setTab("finished"); setGroupFilter("all"); }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === "finished"
                ? "bg-accent text-white"
                : "border border-card-border text-muted hover:text-foreground hover:bg-surface-hover"
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
                  : "border border-card-border text-muted hover:text-foreground"
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
                    : "border border-card-border text-muted hover:text-foreground"
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
            <MatchCard
              key={match.id}
              match={match}
              existingPrediction={predictionMap.get(match.id)}
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
            href="/world-cup/leaderboard"
            className="rounded-lg border border-card-border px-6 py-2 text-sm font-medium transition-colors hover:bg-surface-hover"
          >
            查看排行榜
          </Link>
          <Link
            href="/world-cup/dashboard"
            className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            我的面板
          </Link>
        </div>
      </section>
    </main>
  );
}
