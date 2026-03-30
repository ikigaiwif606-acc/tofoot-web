"use client";

import { useState } from "react";
import type { LeaderboardRow as LeaderboardEntry } from "@/lib/db";

export default function LeaderboardRow({
  entry,
  rank,
  updateAction,
  deleteAction,
}: {
  entry: LeaderboardEntry;
  rank: number;
  updateAction: (id: number, formData: FormData) => Promise<void>;
  deleteAction: (id: number) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);

  const rankDisplay =
    rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : rank + 1;

  if (editing) {
    return (
      <tr className="border-b border-card-border/50 last:border-0">
        <td className="px-4 py-3 font-medium">{rankDisplay}</td>
        <td colSpan={5} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updateAction(entry.id, formData);
              setEditing(false);
            }}
            className="flex items-center gap-3"
          >
            <input
              name="avatar"
              defaultValue={entry.avatar}
              className="w-12 rounded border border-card-border bg-background px-2 py-1 text-center text-sm focus:border-accent focus:outline-none"
              placeholder="Emoji"
            />
            <input
              name="name"
              defaultValue={entry.name}
              required
              className="w-48 rounded border border-card-border bg-background px-2 py-1 text-sm focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="rounded bg-accent px-3 py-1 text-xs font-semibold text-black hover:bg-accent-dark"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="text-xs text-muted hover:text-foreground"
            >
              Cancel
            </button>
          </form>
        </td>
        <td />
      </tr>
    );
  }

  return (
    <tr className="border-b border-card-border/50 last:border-0">
      <td className="px-4 py-3 font-medium">{rankDisplay}</td>
      <td className="px-4 py-3">
        <span className="mr-2">{entry.avatar}</span>
        {entry.name}
      </td>
      <td className="px-4 py-3 text-right font-bold text-accent">
        {entry.total_points}
      </td>
      <td className="px-4 py-3 text-right">{entry.exact_scores}</td>
      <td className="px-4 py-3 text-right">{entry.correct_results}</td>
      <td className="px-4 py-3 text-right">{entry.total_predictions}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-accent hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (
                confirm(
                  `Delete "${entry.name}" and all their predictions?`
                )
              ) {
                deleteAction(entry.id);
              }
            }}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
