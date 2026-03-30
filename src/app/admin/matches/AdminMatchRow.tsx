"use client";

import { useState } from "react";
import type { MatchRow } from "@/lib/db";

const inputClass =
  "rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

export default function AdminMatchRow({
  match,
  updateAction,
  deleteAction,
  editAction,
}: {
  match: MatchRow;
  updateAction: (id: string, formData: FormData) => Promise<void>;
  deleteAction: (id: string) => Promise<void>;
  editAction: (id: string, formData: FormData) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const boundUpdate = updateAction.bind(null, match.id);
  const boundEdit = editAction.bind(null, match.id);

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-4">
      {/* Score & Status row */}
      <form
        action={boundUpdate}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="flex items-center gap-2 text-sm font-medium min-w-[200px]">
          <span>{match.home_flag}</span>
          <span>{match.home_team}</span>
          <span className="text-muted">vs</span>
          <span>{match.away_team}</span>
          <span>{match.away_flag}</span>
        </div>

        <div className="text-xs text-muted">
          {match.stage}
          {match.group_name ? ` · Group ${match.group_name}` : ""}
        </div>

        <div className="flex items-center gap-1">
          <input
            type="number"
            name="home_score"
            defaultValue={match.home_score ?? ""}
            min={0}
            max={20}
            placeholder="-"
            className="w-14 rounded border border-card-border bg-background px-2 py-1 text-center text-sm focus:border-accent focus:outline-none"
          />
          <span className="text-muted">:</span>
          <input
            type="number"
            name="away_score"
            defaultValue={match.away_score ?? ""}
            min={0}
            max={20}
            placeholder="-"
            className="w-14 rounded border border-card-border bg-background px-2 py-1 text-center text-sm focus:border-accent focus:outline-none"
          />
        </div>

        <select
          name="status"
          defaultValue={match.status}
          className="rounded border border-card-border bg-background px-2 py-1 text-sm focus:border-accent focus:outline-none"
        >
          <option value="upcoming">Upcoming</option>
          <option value="live">Live</option>
          <option value="finished">Finished</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-black hover:bg-accent-dark"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => setEditing(!editing)}
          className="text-xs text-accent hover:underline"
        >
          {editing ? "Cancel" : "Edit"}
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirm("Delete this match and all its predictions?")) {
              deleteAction(match.id);
            }
          }}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Delete
        </button>
      </form>

      {/* Edit details */}
      {editing && (
        <form
          action={async (formData) => {
            await boundEdit(formData);
            setEditing(false);
          }}
          className="mt-4 border-t border-card-border pt-4 grid gap-3 sm:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-xs text-muted">Home Team</label>
            <input name="home_team" defaultValue={match.home_team} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Away Team</label>
            <input name="away_team" defaultValue={match.away_team} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Home Flag</label>
            <input name="home_flag" defaultValue={match.home_flag} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Away Flag</label>
            <input name="away_flag" defaultValue={match.away_flag} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Kickoff</label>
            <input
              type="datetime-local"
              name="kickoff"
              defaultValue={new Date(match.kickoff).toISOString().slice(0, 16)}
              required
              className={inputClass + " w-full"}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Stage</label>
            <input name="stage" defaultValue={match.stage} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Group</label>
            <input name="group_name" defaultValue={match.group_name ?? ""} placeholder="Optional" className={inputClass + " w-full"} />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black hover:bg-accent-dark"
            >
              Update Match
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
