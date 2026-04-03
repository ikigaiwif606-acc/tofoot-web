"use client";

import { useRouter } from "next/navigation";
import { leaveGame } from "../actions";

export default function LeaveGameButton() {
  const router = useRouter();

  const handleLeave = async () => {
    if (!confirm("確定要離開遊戲嗎？你的預測紀錄不會被刪除。")) return;
    await leaveGame();
    router.push("/world-cup/predict");
  };

  return (
    <button
      onClick={handleLeave}
      className="rounded-lg border border-card-border px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
    >
      登出
    </button>
  );
}
