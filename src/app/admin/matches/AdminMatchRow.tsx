"use client";

import type { MatchRow } from "@/lib/db";

export default function AdminMatchRow({
  match,
  action,
}: {
  match: MatchRow;
  action: (id: string, formData: FormData) => Promise<void>;
}) {
  const boundAction = action.bind(null, match.id);

  return (
    <form
      action={boundAction}
      className="flex flex-wrap items-center gap-3 rounded-xl border border-card-border bg-card-bg p-4"
    >
      {/* Teams */}
      <div className="flex items-center gap-2 text-sm font-medium min-w-[200px]">
        <span>{match.home_flag}</span>
        <span>{match.home_team}</span>
        <span className="text-muted">vs</span>
        <span>{match.away_team}</span>
        <span>{match.away_flag}</span>
      </div>

      {/* Meta */}
      <div className="text-xs text-muted">
        {match.stage}
        {match.group_name ? ` · Group ${match.group_name}` : ""}
      </div>

      {/* Score inputs */}
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

      {/* Status */}
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
    </form>
  );
}
