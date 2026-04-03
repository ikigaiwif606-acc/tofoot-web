"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function WorldCupError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="card mx-auto max-w-md">
          <div className="text-4xl">😵</div>
          <h2 className="mt-4 text-xl font-bold">出了點問題</h2>
          <p className="mt-2 text-sm text-muted">
            {error.message || "發生未預期的錯誤，請重新嘗試。"}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => unstable_retry()}
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              重新嘗試
            </button>
            <Link
              href="/world-cup"
              className="rounded-lg border border-card-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              回到首頁
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
