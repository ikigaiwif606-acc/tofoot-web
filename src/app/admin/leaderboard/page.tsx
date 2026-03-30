import { verifyAdmin } from "@/lib/auth";
import { getLeaderboard } from "@/lib/db";

export default async function AdminLeaderboardPage() {
  await verifyAdmin();
  const leaderboard = await getLeaderboard();

  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mt-1 text-sm text-muted">
        Fantasy game rankings ({leaderboard.length} players)
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-card-border bg-card-bg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-card-border text-left text-xs text-muted">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3 text-right">Points</th>
              <th className="px-4 py-3 text-right">Exact</th>
              <th className="px-4 py-3 text-right">Correct</th>
              <th className="px-4 py-3 text-right">Predictions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, i) => (
              <tr
                key={entry.name}
                className="border-b border-card-border/50 last:border-0"
              >
                <td className="px-4 py-3 font-medium">
                  {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                </td>
                <td className="px-4 py-3">
                  <span className="mr-2">{entry.avatar}</span>
                  {entry.name}
                </td>
                <td className="px-4 py-3 text-right font-bold text-accent">
                  {entry.total_points}
                </td>
                <td className="px-4 py-3 text-right">{entry.exact_scores}</td>
                <td className="px-4 py-3 text-right">
                  {entry.correct_results}
                </td>
                <td className="px-4 py-3 text-right">
                  {entry.total_predictions}
                </td>
              </tr>
            ))}
            {leaderboard.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted"
                >
                  No players yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
