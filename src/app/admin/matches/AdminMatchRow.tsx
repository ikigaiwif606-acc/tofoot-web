"use client";

import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { Match } from "@/lib/db/queries";
import type { ActionResult } from "@/lib/validations";

const inputClass =
  "rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

export default function AdminMatchRow({
  match,
  updateAction,
  deleteAction,
  editAction,
}: {
  match: Match;
  updateAction: (id: string, prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  deleteAction: (id: string) => Promise<ActionResult>;
  editAction: (id: string, prev: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const [editing, setEditing] = useState(false);
  const boundUpdate = updateAction.bind(null, match.id);
  const boundEdit = editAction.bind(null, match.id);

  const [scoreState, scoreFormAction, scorePending] = useActionState(boundUpdate, { success: false });
  const [editState, editFormAction, editPending] = useActionState(boundEdit, { success: false });

  useEffect(() => {
    if (scoreState.success) toast.success("Score updated");
    if (scoreState.error) toast.error(scoreState.error);
  }, [scoreState]);

  useEffect(() => {
    if (editState.success) {
      toast.success("Match updated");
      setEditing(false);
    }
    if (editState.error) toast.error(editState.error);
  }, [editState]);

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-4">
      {/* Score & Status row */}
      <form
        action={scoreFormAction}
        className="flex flex-wrap items-center gap-3"
      >
        <div className="flex items-center gap-2 text-sm font-medium min-w-[200px]">
          <span>{match.homeFlag}</span>
          <span>{match.homeTeam}</span>
          <span className="text-muted">vs</span>
          <span>{match.awayTeam}</span>
          <span>{match.awayFlag}</span>
        </div>

        <div className="text-xs text-muted">
          {match.stage}
          {match.groupName ? ` · Group ${match.groupName}` : ""}
        </div>

        <div className="flex items-center gap-1">
          <input
            type="number"
            name="home_score"
            defaultValue={match.homeScore ?? ""}
            min={0}
            max={20}
            placeholder="-"
            className="w-14 rounded border border-card-border bg-background px-2 py-1 text-center text-sm focus:border-accent focus:outline-none"
          />
          <span className="text-muted">:</span>
          <input
            type="number"
            name="away_score"
            defaultValue={match.awayScore ?? ""}
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
          disabled={scorePending}
          className="rounded-lg bg-accent px-4 py-1.5 text-xs font-semibold text-black hover:bg-accent-dark disabled:opacity-50"
        >
          {scorePending ? "Saving..." : "Save"}
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
          onClick={async () => {
            if (confirm("Delete this match and all its predictions?")) {
              const result = await deleteAction(match.id);
              if (result.success) toast.success("Match deleted");
              else if (result.error) toast.error(result.error);
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
          action={editFormAction}
          className="mt-4 border-t border-card-border pt-4 grid gap-3 sm:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-xs text-muted">Home Team</label>
            <input name="home_team" defaultValue={match.homeTeam} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Away Team</label>
            <input name="away_team" defaultValue={match.awayTeam} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Home Flag</label>
            <input name="home_flag" defaultValue={match.homeFlag} required className={inputClass + " w-full"} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted">Away Flag</label>
            <input name="away_flag" defaultValue={match.awayFlag} required className={inputClass + " w-full"} />
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
            <input name="group_name" defaultValue={match.groupName ?? ""} placeholder="Optional" className={inputClass + " w-full"} />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={editPending}
              className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black hover:bg-accent-dark disabled:opacity-50"
            >
              {editPending ? "Saving..." : "Update Match"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
