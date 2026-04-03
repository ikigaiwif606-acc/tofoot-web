"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { ActionResult } from "@/lib/validations";

const inputClass =
  "rounded-lg border border-card-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none";

export default function AdminCreateMatchForm({
  action,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction, pending] = useActionState(action, {
    success: false,
  });

  useEffect(() => {
    if (state.success) toast.success("Match created");
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <input
        name="home_team"
        placeholder="Home team"
        required
        className={inputClass}
      />
      <input
        name="away_team"
        placeholder="Away team"
        required
        className={inputClass}
      />
      <input
        name="home_flag"
        placeholder="Home flag emoji"
        required
        className={inputClass}
      />
      <input
        name="away_flag"
        placeholder="Away flag emoji"
        required
        className={inputClass}
      />
      <input
        type="datetime-local"
        name="kickoff"
        required
        className={inputClass}
      />
      <input
        name="stage"
        placeholder="Stage (e.g. 小組賽)"
        required
        className={inputClass}
      />
      <input
        name="group_name"
        placeholder="Group (optional, e.g. A)"
        className={inputClass}
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black hover:bg-accent-dark disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add Match"}
      </button>
      {state.error && (
        <p className="sm:col-span-2 text-sm text-danger">{state.error}</p>
      )}
    </form>
  );
}
