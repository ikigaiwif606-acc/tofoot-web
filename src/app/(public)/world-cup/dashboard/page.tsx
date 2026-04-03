import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  getMatches,
  getUserPredictions,
  getUserStreak,
  getFantasyUserById,
} from "@/lib/db/queries";
import { getFantasyUserId } from "@/lib/fantasy-session";
import { calculateScore } from "@/lib/scoring";
import LeaveGameButton from "./LeaveGameButton";

export const metadata: Metadata = {
  title: "我的面板 | ToFoot 世界盃",
  description: "查看你的世界盃預測紀錄和統計數據",
};

export default async function DashboardPage() {
  const userId = await getFantasyUserId();
  if (!userId) redirect("/world-cup/predict");

  const [user, predictions, allMatches, streak] = await Promise.all([
    getFantasyUserById(userId),
    getUserPredictions(userId),
    getMatches(),
    getUserStreak(userId),
  ]);

  if (!user) redirect("/world-cup/predict");

  // Build match lookup
  const matchMap = new Map(allMatches.map((m) => [m.id, m]));

  // Enrich predictions with match data and scores
  const predictionsWithScores = predictions.map((pred) => {
    const match = matchMap.get(pred.matchId);
    const score = match ? calculateScore(pred, match) : null;
    return { ...pred, match, score };
  });

  // Calculate stats
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

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Profile */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl">
              {user.avatar || "\u26BD"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-muted">我的面板 Dashboard</p>
            </div>
          </div>
          <LeaveGameButton />
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="card text-center">
            <div className="text-3xl font-bold text-accent">{totalPoints}</div>
            <div className="mt-1 text-xs text-muted">總積分</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-foreground">
              {predictions.length}
            </div>
            <div className="mt-1 text-xs text-muted">預測數</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-gold">
              {exactScores}
            </div>
            <div className="mt-1 text-xs text-muted">完美預測</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-secondary">{accuracy}%</div>
            <div className="mt-1 text-xs text-muted">正確率</div>
          </div>
          <div className="col-span-2 card text-center sm:col-span-1">
            <div className="text-3xl font-bold text-accent">{streak.current}</div>
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
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm">
              <span>{"\u{1F525}"}</span>
              <span className="font-semibold text-accent">
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
            <div className="mt-6 card text-center">
              <p className="text-muted">你還沒有任何預測</p>
              <Link
                href="/world-cup/predict"
                className="mt-4 inline-block rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
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
                    className="flex items-center justify-between card"
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
                      <div className="text-lg font-bold font-mono">
                        {pred.homeScore} : {pred.awayScore}
                      </div>
                    </div>
                    {m.status === "finished" ? (
                      <div className="text-center">
                        <div className="text-xs text-muted">結果</div>
                        <div className="text-lg font-bold text-accent font-mono">
                          {m.homeScore} : {m.awayScore}
                        </div>
                        {pred.score && (
                          <div
                            className={`text-xs font-medium ${
                              pred.score.type === "exact"
                                ? "text-gold"
                                : pred.score.type === "wrong"
                                ? "text-danger"
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
            href="/world-cup/predict"
            className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            繼續預測
          </Link>
          <Link
            href="/world-cup/leaderboard"
            className="rounded-lg border border-card-border px-6 py-2 text-sm font-medium transition-colors hover:bg-surface-hover"
          >
            排行榜
          </Link>
        </div>
      </section>
    </main>
  );
}
