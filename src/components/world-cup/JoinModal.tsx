"use client";

import { useActionState, useEffect, useState } from "react";
import { joinGame } from "@/app/(public)/world-cup/actions";

const AVATAR_OPTIONS = [
  "\u26BD", "\u{1F3C6}", "\u{1F3C0}", "\u{1F3AF}", "\u{1F525}",
  "\u{1F31F}", "\u{1FA84}", "\u{1F40D}", "\u{1F981}", "\u{1F985}",
  "\u{1F43A}", "\u{1F47E}",
];

export default function JoinModal() {
  const [state, formAction, pending] = useActionState(joinGame, {
    success: false,
  });
  const [selectedAvatar, setSelectedAvatar] = useState("\u26BD");

  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state.success]);

  return (
    <div className="mx-auto max-w-md">
      <div className="card text-center">
        <h2 className="text-2xl font-bold">加入世界盃預測</h2>
        <p className="mt-2 text-sm text-muted">
          輸入你的名字開始預測比賽結果
        </p>

        <form action={formAction} className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="你的名字..."
            required
            minLength={2}
            maxLength={20}
            className="w-full rounded-lg border border-card-border bg-background px-4 py-2.5 text-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />

          <input type="hidden" name="avatar" value={selectedAvatar} />

          <div>
            <p className="text-xs text-muted mb-2">選擇頭像</p>
            <div className="grid grid-cols-6 gap-2">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`flex h-10 w-full items-center justify-center rounded-lg text-xl transition-all ${
                    selectedAvatar === emoji
                      ? "bg-accent/20 border border-accent ring-1 ring-accent/50"
                      : "border border-card-border hover:bg-surface-hover"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {state.error && (
            <p className="text-sm text-danger">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {pending ? "加入中..." : "開始預測"}
          </button>
        </form>
      </div>
    </div>
  );
}
