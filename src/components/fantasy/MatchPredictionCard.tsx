"use client";

import { useState, useEffect } from "react";
import type { Match } from "@/lib/fantasy-data";
import { getPredictionForMatch, savePrediction } from "@/lib/fantasy-store";
import { calculateScore } from "@/lib/scoring";

export default function MatchPredictionCard({
  match,
  isLoggedIn,
}: {
  match: Match;
  isLoggedIn: boolean;
}) {
  const [homeScore, setHomeScore] = useState<string>("");
  const [awayScore, setAwayScore] = useState<string>("");
  const [saved, setSaved] = useState(false);
  const [existingPrediction, setExistingPrediction] = useState<{
    homeScore: number;
    awayScore: number;
  } | null>(null);

  useEffect(() => {
    const pred = getPredictionForMatch(match.id);
    if (pred) {
      setHomeScore(String(pred.homeScore));
      setAwayScore(String(pred.awayScore));
      setExistingPrediction(pred);
      setSaved(true);
    }
  }, [match.id]);

  const kickoffDate = new Date(match.kickoff);
  const isLocked = match.status !== "upcoming";

  const handleSave = () => {
    if (homeScore === "" || awayScore === "") return;
    const pred = {
      matchId: match.id,
      homeScore: parseInt(homeScore),
      awayScore: parseInt(awayScore),
      pointsEarned: null,
      createdAt: new Date().toISOString(),
    };
    savePrediction(pred);
    setExistingPrediction({ homeScore: pred.homeScore, awayScore: pred.awayScore });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const scoreBreakdown =
    match.status === "finished" && existingPrediction
      ? calculateScore(existingPrediction, match)
      : null;

  return (
    <div className="rounded-xl border border-card-border bg-card-bg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-card-border bg-background/50 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded bg-accent/10 px-2 py-0.5 font-medium text-accent">
            {match.stage}
          </span>
          {match.group && <span>Group {match.group}</span>}
        </div>
        <span className="text-xs text-muted">
          {kickoffDate.toLocaleDateString("zh-TW", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* Match */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between gap-2">
          {/* Home team */}
          <div className="flex-1 text-center">
            <div className="text-3xl">{match.homeFlag}</div>
            <div className="mt-1 text-sm font-semibold">{match.homeTeam}</div>
          </div>

          {/* Score / Prediction */}
          <div className="flex items-center gap-2">
            {match.status === "finished" ? (
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <div className="text-xs text-muted mb-1">實際</div>
                  <div className="flex items-center gap-1">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-lg font-bold text-accent">
                      {match.homeScore}
                    </span>
                    <span className="text-muted">:</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-lg font-bold text-accent">
                      {match.awayScore}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {isLoggedIn ? (
                  <>
                    <div className="text-xs text-muted mb-1">你的預測</div>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={homeScore}
                        onChange={(e) => {
                          setHomeScore(e.target.value);
                          setSaved(false);
                        }}
                        disabled={isLocked}
                        className="h-10 w-10 rounded-lg border border-card-border bg-background text-center text-lg font-bold focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                        placeholder="-"
                      />
                      <span className="text-muted font-bold">:</span>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={awayScore}
                        onChange={(e) => {
                          setAwayScore(e.target.value);
                          setSaved(false);
                        }}
                        disabled={isLocked}
                        className="h-10 w-10 rounded-lg border border-card-border bg-background text-center text-lg font-bold focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                        placeholder="-"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-2xl font-bold text-muted">VS</div>
                )}
              </div>
            )}
          </div>

          {/* Away team */}
          <div className="flex-1 text-center">
            <div className="text-3xl">{match.awayFlag}</div>
            <div className="mt-1 text-sm font-semibold">{match.awayTeam}</div>
          </div>
        </div>

        {/* Prediction result for finished matches */}
        {scoreBreakdown && (
          <div
            className={`mt-4 rounded-lg p-3 text-center text-sm font-medium ${
              scoreBreakdown.type === "exact"
                ? "bg-yellow-500/10 text-yellow-400"
                : scoreBreakdown.type === "difference"
                ? "bg-accent/10 text-accent"
                : scoreBreakdown.type === "result"
                ? "bg-blue-500/10 text-blue-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {existingPrediction && (
              <span className="text-muted">
                你的預測: {existingPrediction.homeScore}-{existingPrediction.awayScore} →{" "}
              </span>
            )}
            +{scoreBreakdown.points} 分 — {scoreBreakdown.reason}
          </div>
        )}

        {/* Save button */}
        {isLoggedIn && match.status === "upcoming" && (
          <div className="mt-4 text-center">
            <button
              onClick={handleSave}
              disabled={homeScore === "" || awayScore === ""}
              className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {saved ? "已儲存 ✓" : existingPrediction ? "更新預測" : "送出預測"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
