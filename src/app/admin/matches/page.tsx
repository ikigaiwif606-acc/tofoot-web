import { verifyAdmin } from "@/lib/auth";
import { getMatches } from "@/lib/db/queries";
import { updateMatchScore, createMatch, updateMatch, deleteMatch } from "../actions";
import AdminMatchRow from "./AdminMatchRow";
import AdminCreateMatchForm from "./AdminCreateMatchForm";

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
          <AdminCreateMatchForm action={createMatch} />
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
