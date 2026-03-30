"use client";

import { useState, useEffect } from "react";
import type { Match } from "@/lib/fantasy-data";
import { getPredictionForMatch, savePrediction } from "@/lib/fantasy-store";
import { calculateScore } from "@/lib/scoring";

function getTimeUntilKickoff(kickoff: string): { hours: number; minutes: number; urgent: boolean } | null {
  const diff = new Date(kickoff).getTime() - Date.now();
  if (diff <= 0) return null;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes, urgent: hours < 24 };
}

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
  const [justSaved, setJustSaved] = useState(false);
  const [existingPrediction, setExistingPrediction] = useState<{
    homeScore: number;
    awayScore: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

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
  const timeUntil = match.status === "upcoming" ? getTimeUntilKickoff(match.kickoff) : null;

  const adjustScore = (current: string, delta: number, setter: (v: string) => void) => {
    const val = Math.max(0, Math.min(20, (parseInt(current) || 0) + delta));
    setter(String(val));
    setSaved(false);
  };

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
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1500);
  };

  const handleShare = () => {
    const text = `My prediction for ${match.homeFlag} ${match.homeTeam} vs ${match.awayFlag} ${match.awayTeam}: ${homeScore}-${awayScore} | ToFoot 夢幻足球 🏆`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const scoreBreakdown =
    match.status === "finished" && existingPrediction
      ? calculateScore(existingPrediction, match)
      : null;

  return (
    <div className={`rounded-xl overflow-hidden transition-all glass ${
      justSaved ? "animate-save-flash !border-accent neon-glow" : ""
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border bg-black/20 px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded bg-accent/10 px-2 py-0.5 font-medium text-accent">
            {match.stage}
          </span>
          {match.group && <span>Group {match.group}</span>}
        </div>
        <div className="flex items-center gap-2">
          {timeUntil?.urgent && (
            <span className="animate-pulse-soft rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-medium text-orange-400">
              {timeUntil.hours}h {timeUntil.minutes}m
            </span>
          )}
          <span className="text-xs text-muted">
            {kickoffDate.toLocaleDateString("zh-TW", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
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
              <div className="text-center">
                <div className="text-xs text-muted mb-1">實際</div>
                <div className="flex items-center gap-1">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg scoreboard-digit text-lg font-bold">
                    {match.homeScore}
                  </span>
                  <span className="text-muted">:</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg scoreboard-digit text-lg font-bold">
                    {match.awayScore}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {isLoggedIn ? (
                  <>
                    <div className="text-xs text-muted mb-1">你的預測</div>
                    <div className="flex items-center gap-1">
                      {/* Home score stepper */}
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => adjustScore(homeScore, 1, setHomeScore)}
                          disabled={isLocked}
                          className="flex h-5 w-12 items-center justify-center rounded-t-md bg-card-border/50 text-xs text-muted hover:bg-accent/20 hover:text-accent disabled:opacity-30 transition-colors sm:w-12"
                        >
                          +
                        </button>
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
                          className="h-12 w-12 rounded-lg border border-card-border bg-background text-center text-xl font-bold focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 sm:w-12"
                          placeholder="-"
                        />
                        <button
                          onClick={() => adjustScore(homeScore, -1, setHomeScore)}
                          disabled={isLocked}
                          className="flex h-5 w-12 items-center justify-center rounded-b-md bg-card-border/50 text-xs text-muted hover:bg-accent/20 hover:text-accent disabled:opacity-30 transition-colors sm:w-12"
                        >
                          -
                        </button>
                      </div>

                      <span className="text-muted font-bold px-1">:</span>

                      {/* Away score stepper */}
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => adjustScore(awayScore, 1, setAwayScore)}
                          disabled={isLocked}
                          className="flex h-5 w-12 items-center justify-center rounded-t-md bg-card-border/50 text-xs text-muted hover:bg-accent/20 hover:text-accent disabled:opacity-30 transition-colors sm:w-12"
                        >
                          +
                        </button>
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
                          className="h-12 w-12 rounded-lg border border-card-border bg-background text-center text-xl font-bold focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50 sm:w-12"
                          placeholder="-"
                        />
                        <button
                          onClick={() => adjustScore(awayScore, -1, setAwayScore)}
                          disabled={isLocked}
                          className="flex h-5 w-12 items-center justify-center rounded-b-md bg-card-border/50 text-xs text-muted hover:bg-accent/20 hover:text-accent disabled:opacity-30 transition-colors sm:w-12"
                        >
                          -
                        </button>
                      </div>
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
            className={`mt-4 rounded-lg p-3 text-center text-sm font-medium animate-slide-up ${
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

        {/* Save + Share buttons */}
        {isLoggedIn && match.status === "upcoming" && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={handleSave}
              disabled={homeScore === "" || awayScore === ""}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                justSaved
                  ? "btn-neon"
                  : "btn-neon"
              }`}
            >
              {justSaved ? "已儲存 ✓" : existingPrediction ? "更新預測" : "送出預測"}
            </button>
            {existingPrediction && (
              <button
                onClick={handleShare}
                className="rounded-lg border border-card-border px-3 py-2.5 text-sm text-muted transition-colors hover:bg-card-bg hover:text-foreground"
                title="分享預測"
              >
                {copied ? "已複製!" : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}

        {/* Share for finished matches too */}
        {isLoggedIn && match.status === "finished" && existingPrediction && scoreBreakdown && (
          <div className="mt-3 text-center">
            <button
              onClick={() => {
                const text = `${match.homeFlag} ${match.homeTeam} ${match.homeScore}-${match.awayScore} ${match.awayTeam} ${match.awayFlag}\nMy prediction: ${existingPrediction.homeScore}-${existingPrediction.awayScore} → +${scoreBreakdown.points}pts ${scoreBreakdown.reason}\n| ToFoot 夢幻足球 🏆`;
                navigator.clipboard.writeText(text).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                });
              }}
              className="rounded-lg border border-card-border px-4 py-1.5 text-xs text-muted transition-colors hover:bg-card-bg hover:text-foreground"
            >
              {copied ? "已複製!" : "分享結果"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
