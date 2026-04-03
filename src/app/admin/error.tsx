"use client";

import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-bold">Admin Error</h2>
        <p className="mt-2 text-sm text-muted">
          {error.message || "Something went wrong in the admin panel."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            Try again
          </button>
          <Link
            href="/admin"
            className="rounded-lg border border-card-border px-5 py-2 text-sm font-medium text-foreground hover:bg-surface-hover transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
