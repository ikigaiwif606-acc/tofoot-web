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

function ScoreStepper({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const adjust = (delta: number) => {
    const val = Math.max(0, Math.min(20, (parseInt(value) || 0) + delta));
    onChange(String(val));
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => adjust(-1)}
        disabled={disabled}
        className="btn-press flex h-12 w-12 items-center justify-center text-lg font-bold text-muted transition-colors hover:bg-[rgba(0,255,255,0.1)] hover:text-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ border: "1px solid #0d0d22" }}
      >
        −
      </button>
      <input
        type="number"
        min="0"
        max="20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-14 w-14 border border-card-border bg-background text-center font-display text-2xl font-bold text-neon-cyan focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
        style={{ fontVariantNumeric: "tabular-nums" }}
        placeholder="-"
      />
      <button
        onClick={() => adjust(1)}
        disabled={disabled}
        className="btn-press flex h-12 w-12 items-center justify-center text-lg font-bold text-muted transition-colors hover:bg-[rgba(0,255,255,0.1)] hover:text-neon-cyan disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ border: "1px solid #0d0d22" }}
      >
        +
      </button>
    </div>
  );
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

  const handleScoreChange = (setter: (v: string) => void) => (v: string) => {
    setter(v);
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

  const handleShare = (text: string) => {
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
    <div
      className={`overflow-hidden transition-all ${
        justSaved ? "animate-save-flash" : ""
      }`}
      style={{
        background: justSaved ? "rgba(0, 255, 255, 0.04)" : "#06060f",
        border: justSaved
          ? "1px solid rgba(0, 255, 255, 0.4)"
          : "1px solid #0d0d22",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: "rgba(0, 255, 255, 0.02)",
          borderBottom: "1px solid #0d0d1a",
        }}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="font-display text-[9px] tracking-[1px] text-neon-cyan">
            {match.stage}
          </span>
          {match.group && (
            <span className="font-tech text-[10px] text-text-dim">
              Group {match.group}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {timeUntil?.urgent && (
            <span className="animate-pulse-soft font-tech text-[10px] font-medium text-orange-400">
              {timeUntil.hours}h {timeUntil.minutes}m
            </span>
          )}
          <span className="font-tech text-[10px] text-text-ghost">
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
            <div className="mt-1 font-body text-sm font-semibold">{match.homeTeam}</div>
          </div>

          {/* Score / Prediction */}
          <div className="flex items-center gap-1">
            {match.status === "finished" ? (
              <div className="text-center">
                <div className="font-tech text-[9px] text-text-ghost mb-1">ACTUAL</div>
                <div className="flex items-center gap-1">
                  <span className="flex h-12 w-12 items-center justify-center scoreboard-digit font-display text-xl font-bold">
                    {match.homeScore}
                  </span>
                  <span className="text-text-ghost font-bold px-0.5">:</span>
                  <span className="flex h-12 w-12 items-center justify-center scoreboard-digit font-display text-xl font-bold">
                    {match.awayScore}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {isLoggedIn ? (
                  <>
                    <div className="font-tech text-[9px] text-text-ghost mb-2">YOUR PREDICTION</div>
                    <div className="flex items-center gap-1">
                      <ScoreStepper
                        value={homeScore}
                        onChange={handleScoreChange(setHomeScore)}
                        disabled={isLocked}
                      />
                      <span className="text-text-ghost font-bold px-1">:</span>
                      <ScoreStepper
                        value={awayScore}
                        onChange={handleScoreChange(setAwayScore)}
                        disabled={isLocked}
                      />
                    </div>
                  </>
                ) : (
                  <div className="font-display text-2xl font-bold text-text-ghost">VS</div>
                )}
              </div>
            )}
          </div>

          {/* Away team */}
          <div className="flex-1 text-center">
            <div className="text-3xl">{match.awayFlag}</div>
            <div className="mt-1 font-body text-sm font-semibold">{match.awayTeam}</div>
          </div>
        </div>

        {/* Prediction result for finished matches */}
        {scoreBreakdown && (
          <div
            className={`mt-4 p-3 text-center text-sm font-medium animate-slide-up ${
              scoreBreakdown.type === "exact"
                ? "text-neon-yellow"
                : scoreBreakdown.type === "difference"
                ? "text-neon-cyan"
                : scoreBreakdown.type === "result"
                ? "text-blue-400"
                : "text-red-400"
            }`}
            style={{
              background:
                scoreBreakdown.type === "exact"
                  ? "rgba(255, 238, 0, 0.06)"
                  : scoreBreakdown.type === "difference"
                  ? "rgba(0, 255, 255, 0.06)"
                  : scoreBreakdown.type === "result"
                  ? "rgba(59, 130, 246, 0.06)"
                  : "rgba(239, 68, 68, 0.06)",
              border: "1px solid",
              borderColor:
                scoreBreakdown.type === "exact"
                  ? "rgba(255, 238, 0, 0.2)"
                  : scoreBreakdown.type === "difference"
                  ? "rgba(0, 255, 255, 0.2)"
                  : scoreBreakdown.type === "result"
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(239, 68, 68, 0.2)",
            }}
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
              className={`btn-press font-display text-[10px] font-bold tracking-[2px] px-8 py-3 transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                justSaved
                  ? "text-success border-success/40"
                  : "text-neon-cyan hover:bg-[rgba(0,255,255,0.1)]"
              }`}
              style={{
                border: justSaved
                  ? "1px solid rgba(34, 197, 94, 0.4)"
                  : "1px solid rgba(0, 255, 255, 0.4)",
              }}
            >
              {justSaved ? "✓ SAVED" : existingPrediction ? "更新預測" : "送出預測"}
            </button>
            {existingPrediction && (
              <button
                onClick={() => {
                  const text = `My prediction for ${match.homeFlag} ${match.homeTeam} vs ${match.awayFlag} ${match.awayTeam}: ${homeScore}-${awayScore} | ToFoot 夢幻足球 🏆`;
                  handleShare(text);
                }}
                className="btn-press flex h-11 w-11 items-center justify-center text-text-dim transition-colors hover:text-white"
                style={{ border: "1px solid #0d0d22" }}
                title="分享預測"
              >
                {copied ? (
                  <span className="text-success text-xs">✓</span>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186zm0-12.814a2.25 2.25 0 1 0 3.935-2.186 2.25 2.25 0 0 0-3.935 2.186z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}

        {/* Share for finished matches */}
        {isLoggedIn && match.status === "finished" && existingPrediction && scoreBreakdown && (
          <div className="mt-3 text-center">
            <button
              onClick={() => {
                const text = `${match.homeFlag} ${match.homeTeam} ${match.homeScore}-${match.awayScore} ${match.awayTeam} ${match.awayFlag}\nMy prediction: ${existingPrediction.homeScore}-${existingPrediction.awayScore} → +${scoreBreakdown.points}pts ${scoreBreakdown.reason}\n| ToFoot 夢幻足球 🏆`;
                handleShare(text);
              }}
              className="btn-press font-tech text-[10px] text-text-dim px-4 py-2 transition-colors hover:text-white"
              style={{ border: "1px solid #0d0d22" }}
            >
              {copied ? "已複製!" : "分享結果"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
