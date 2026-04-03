import { verifyAdmin } from "@/lib/auth";
import { getMatches } from "@/lib/db/queries";
import { updateMatchScore, createMatch, updateMatch, deleteMatch } from "../actions";
import AdminMatchRow from "./AdminMatchRow";

export default async function AdminMatchesPage() {
  await verifyAdmin();
  const matches = await getMatches();

  const upcoming = matches.filter((m) => m.status === "upcoming");
  const live = matches.filter((m) => m.status === "live");
  const finished = matches.filter((m) => m.status === "finished");

  return (
    <div>
      <h1 className="text-2xl font-bold">Matches</h1>
      <p className="mt-1 text-sm text-muted">
        Manage match scores and status ({matches.length} total)
      </p>

      {/* Create match */}
      <details className="mt-6 rounded-xl border border-card-border bg-card-bg">
        <summary className="cursor-pointer px-6 py-4 font-semibold text-accent">
          + Add New Match
        </summary>
        <div className="border-t border-card-border p-6">
          <form action={createMatch} className="grid gap-4 sm:grid-cols-2">
            <input
              name="home_team"
              placeholder="Home team"
              required
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <input
              name="away_team"
              placeholder="Away team"
              required
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <input
              name="home_flag"
              placeholder="Home flag emoji"
              required
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <input
              name="away_flag"
              placeholder="Away flag emoji"
              required
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <input
              type="datetime-local"
              name="kickoff"
              required
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <input
              name="stage"
              placeholder="Stage (e.g. 小組賽)"
              required
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <input
              name="group_name"
              placeholder="Group (optional, e.g. A)"
              className="rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black hover:bg-accent-dark"
            >
              Add Match
            </button>
          </form>
        </div>
      </details>

      {/* Live matches */}
      {live.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-red-400">
            Live ({live.length})
          </h2>
          <div className="mt-3 space-y-3">
            {live.map((m) => (
              <AdminMatchRow
                key={m.id}
                match={m}
                updateAction={updateMatchScore}
                deleteAction={deleteMatch}
                editAction={updateMatch}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      <section className="mt-8">
        <h2 className="text-lg font-bold">Upcoming ({upcoming.length})</h2>
        <div className="mt-3 space-y-3">
          {upcoming.map((m) => (
            <AdminMatchRow
              key={m.id}
              match={m}
              updateAction={updateMatchScore}
              deleteAction={deleteMatch}
              editAction={updateMatch}
            />
          ))}
        </div>
      </section>

      {/* Finished */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-muted">
          Finished ({finished.length})
        </h2>
        <div className="mt-3 space-y-3">
          {finished.map((m) => (
            <AdminMatchRow
              key={m.id}
              match={m}
              updateAction={updateMatchScore}
              deleteAction={deleteMatch}
              editAction={updateMatch}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
