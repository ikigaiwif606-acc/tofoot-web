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
    <section className="relative overflow-hidden rounded-2xl glass-strong p-8 text-center sm:p-12">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-accent/5 blur-[80px]" />
      <div className="relative">
        <h2 className="text-2xl font-bold sm:text-3xl tracking-[-0.02em]">
          跟上最新動態
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-muted">
          訂閱 YouTube 頻道獲得最新影片通知，或留下 Email 搶先收到世界盃預測分析。
        </p>

        {/* YouTube subscribe CTA */}
        <div className="mt-6">
          <a
            href="https://www.youtube.com/@ToFootwn?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            訂閱 YouTube 頻道
          </a>
        </div>

        <div className="mx-auto mt-6 flex items-center gap-3 max-w-xs">
          <div className="h-px flex-1 bg-glass-border" />
          <span className="text-xs text-muted">或</span>
          <div className="h-px flex-1 bg-glass-border" />
        </div>

        {status === "success" ? (
          <div className="mt-6 rounded-lg glass p-4 text-accent neon-text animate-fade-in">
            已收到！我們會在世界盃前寄出精選分析給你
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-glass-border bg-black/30 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-lg btn-neon px-6 py-3 text-sm"
            >
              Email 訂閱
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
