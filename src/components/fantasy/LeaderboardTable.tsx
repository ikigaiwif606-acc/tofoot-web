import type { LeaderboardEntry } from "@/lib/fantasy-data";

const rankGlow: Record<number, string> = {
  1: "neon-text-gold",
  2: "",
  3: "",
};

export default function LeaderboardTable({
  entries,
  highlightName,
}: {
  entries: LeaderboardEntry[];
  highlightName?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl glass">
      {/* Header */}
      <div className="grid grid-cols-[3rem_1fr_4rem_4rem_4rem_5rem] gap-2 border-b border-glass-border bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted sm:grid-cols-[3rem_1fr_5rem_5rem_5rem_6rem]">
        <div>#</div>
        <div>玩家</div>
        <div className="text-center">積分</div>
        <div className="text-center hidden sm:block">完美</div>
        <div className="text-center hidden sm:block">正確</div>
        <div className="text-center">預測數</div>
      </div>

      {/* Rows */}
      {entries.map((entry) => (
        <div
          key={entry.rank}
          className={`grid grid-cols-[3rem_1fr_4rem_4rem_4rem_5rem] gap-2 border-b border-glass-border/50 px-4 py-3 text-sm transition-all hover:bg-white/[0.03] sm:grid-cols-[3rem_1fr_5rem_5rem_5rem_6rem] ${
            highlightName && entry.name === highlightName
              ? "bg-accent/5 border-l-2 border-l-accent"
              : ""
          }`}
        >
          <div
            className={`font-bold ${rankGlow[entry.rank] ?? "text-muted"}`}
          >
            {entry.rank <= 3
              ? ["", "🥇", "🥈", "🥉"][entry.rank]
              : entry.rank}
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{entry.avatar}</span>
            <span className="font-medium truncate">{entry.name}</span>
          </div>
          <div className={`text-center font-bold font-mono text-accent ${entry.rank === 1 ? "neon-text" : ""}`}>
            {entry.totalPoints}
          </div>
          <div className="text-center hidden sm:block font-mono">{entry.exactScores}</div>
          <div className="text-center hidden sm:block font-mono">{entry.correctResults}</div>
          <div className="text-center text-muted font-mono">{entry.totalPredictions}</div>
        </div>
      ))}
    </div>
  );
}
