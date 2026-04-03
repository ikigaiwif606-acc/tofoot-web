import type { Metadata } from "next";
import Link from "next/link";
import { getLeaderboard, getMatches } from "@/lib/db/queries";
import { getFantasyUserId } from "@/lib/fantasy-session";
import LeaderboardTable from "@/components/world-cup/LeaderboardTable";

export const metadata: Metadata = {
  title: "排行榜 | ToFoot 世界盃",
  description: "世界盃預測排行榜 - 看看誰的預測最準！",
};

export default async function LeaderboardPage() {
  const [leaderboardRaw, allMatches, userId] = await Promise.all([
    getLeaderboard(),
    getMatches(),
    getFantasyUserId(),
  ]);

  // Add rank numbers
  const leaderboard = leaderboardRaw.map((entry, i) => ({
    ...entry,
    rank: i + 1,
  }));

  const totalPlayers = leaderboard.length;
  const totalPredictions = leaderboard.reduce((s, e) => s + e.totalPredictions, 0);
  const finishedMatches = allMatches.filter((m) => m.status === "finished").length;

  // Find current user rank
  const userEntry = userId ? leaderboard.find((e) => e.id === userId) : null;

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">排行榜</h1>
            <p className="mt-1 text-muted">Leaderboard</p>
          </div>
          <Link
            href="/world-cup/predict"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            去預測
          </Link>
        </div>

        {/* Stats summary */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="card text-center">
            <div className="text-2xl font-bold text-accent">{totalPlayers}</div>
            <div className="mt-1 text-xs text-muted">參賽玩家</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-accent">{totalPredictions}</div>
            <div className="mt-1 text-xs text-muted">總預測數</div>
          </div>
          <div className="card text-center">
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
              <div className="mt-2 flex h-28 w-20 items-center justify-center rounded-t-lg bg-yellow-500/20 text-2xl font-bold text-gold sm:w-24">
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
        {userEntry && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-sm">
              <span className="text-muted">你的排名：</span>
              <span className="font-bold text-accent">#{userEntry.rank}</span>
              <span className="text-muted">/ {leaderboard.length} 位玩家</span>
            </div>
          </div>
        )}

        {/* Full table */}
        <div className="mt-10">
          <LeaderboardTable entries={leaderboard} highlightId={userId} />
        </div>

        <div className="mt-6 text-center text-xs text-muted">
          排行榜每場比賽結束後自動更新
        </div>
      </section>
    </main>
  );
}
