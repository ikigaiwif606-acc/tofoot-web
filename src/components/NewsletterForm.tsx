"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder — connect to Resend/Buttondown API later
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="rounded-2xl border border-card-border bg-card-bg p-8 text-center sm:p-12">
      <h2 className="text-2xl font-bold sm:text-3xl">
        📬 訂閱週報 <span className="text-accent">Weekly Newsletter</span>
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-muted">
        每週收到 Tofu 精選的歐洲足球新聞、賽事分析和世界盃最新動態。免費訂閱，隨時取消。
      </p>

      {status === "success" ? (
        <div className="mt-6 rounded-lg bg-accent/10 p-4 text-accent">
          訂閱成功！感謝你的支持 🎉
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-lg border border-card-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="submit"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
          >
            訂閱
          </button>
        </form>
      )}
    </section>
  );
}
