import { verifyAdmin } from "@/lib/auth";
import { getLeaderboard } from "@/lib/db";
import { deleteFantasyUser, updateFantasyUser } from "../actions";
import LeaderboardRow from "./LeaderboardRow";

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
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, i) => (
              <LeaderboardRow
                key={entry.id}
                entry={entry}
                rank={i}
                updateAction={updateFantasyUser}
                deleteAction={deleteFantasyUser}
              />
            ))}
            {leaderboard.length === 0 && (
              <tr>
                <td
                  colSpan={7}
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
