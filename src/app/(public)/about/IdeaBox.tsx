"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { submitSuggestion } from "./actions";

export default function IdeaBox() {
  const [state, formAction, pending] = useActionState(submitSuggestion, {
    success: false,
  });

  useEffect(() => {
    if (state.success) toast.success("感謝你的建議！");
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">💡 點子箱 Idea Box</h2>
      <p className="mt-2 text-sm text-muted">
        想看什麼主題？有什麼建議？告訴我！
      </p>

      {state.success ? (
        <div className="mt-4 rounded-lg bg-success/10 border border-success/20 p-4 text-sm text-success animate-fade-in">
          已收到你的建議，謝謝！
        </div>
      ) : (
        <form action={formAction} className="mt-4 space-y-3">
          <input
            name="name"
            placeholder="你的暱稱（選填）"
            maxLength={50}
            className="w-full rounded-lg border border-card-border bg-black/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
          <textarea
            name="content"
            placeholder="你的想法或建議..."
            required
            rows={3}
            maxLength={1000}
            className="w-full rounded-lg border border-card-border bg-black/20 px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 resize-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            {pending ? "送出中..." : "送出建議"}
          </button>
        </form>
      )}
    </div>
  );
}
