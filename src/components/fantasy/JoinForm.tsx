"use client";

import { useState } from "react";

export default function JoinForm({
  onJoin,
}: {
  onJoin: (name: string) => void;
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return;
    onJoin(name.trim());
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-card-border bg-card-bg p-8 text-center">
      <div className="text-5xl">⚽</div>
      <h2 className="mt-4 text-2xl font-bold">加入夢幻足球</h2>
      <p className="mt-2 text-sm text-muted">
        輸入你的暱稱開始預測比賽！
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="你的暱稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          className="rounded-lg border border-card-border bg-background px-4 py-3 text-center text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={name.trim().length < 2}
          className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dark disabled:opacity-30 disabled:cursor-not-allowed"
        >
          開始預測
        </button>
      </form>
    </div>
  );
}
