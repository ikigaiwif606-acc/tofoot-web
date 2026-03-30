import type { Metadata } from "next";
import Link from "next/link";
import CountdownTimer from "@/components/fantasy/CountdownTimer";

export const metadata: Metadata = {
  title: "ToFoot 夢幻足球 | 2026世界盃預測遊戲",
  description: "預測2026世界盃比賽結果，和台灣球迷一起競爭排行榜！",
};

const rules = [
  { points: "10", label: "完美預測", desc: "比分完全正確", color: "text-neon-gold", glow: "neon-text-gold" },
  { points: "5", label: "淨勝球正確", desc: "球差正確但比分不同", color: "text-accent", glow: "neon-text" },
  { points: "3", label: "結果正確", desc: "猜對勝負或平手", color: "text-neon-blue", glow: "neon-text-blue" },
  { points: "0", label: "預測錯誤", desc: "結果完全不對", color: "text-red-400", glow: "" },
];

const features = [
  { emoji: "🎯", title: "預測比分", desc: "在比賽開始前預測每場比賽的最終比分" },
  { emoji: "🏆", title: "排行榜", desc: "和其他台灣球迷一起競爭，爭奪排行榜冠軍" },
  { emoji: "📊", title: "個人面板", desc: "追蹤你的預測紀錄、正確率和積分變化" },
  { emoji: "🎥", title: "Tofu 分析", desc: "搭配 Tofu 的影片分析，做出更精準的預測" },
];

export default function FantasyPage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative border-b border-glass-border overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-10 left-20 h-80 w-80 rounded-full bg-accent/6 blur-[120px] animate-float" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-neon-blue/5 blur-[100px] animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-neon-gold/4 blur-[80px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-block rounded-full glass px-4 py-1.5 text-sm font-medium text-accent">
            🏆 2026 FIFA World Cup
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-[-0.02em] sm:text-6xl">
            ToFoot <span className="text-accent neon-text">夢幻足球</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted">
            預測世界盃每場比賽的比分，累積積分，和台灣球迷一起爭奪排行榜冠軍！
          </p>

          <div className="mt-10">
            <CountdownTimer />
            <p className="mt-3 text-sm text-muted">距離世界盃開幕</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/fantasy/matches"
              className="inline-flex items-center gap-2 rounded-lg btn-neon px-8 py-3 text-lg"
            >
              開始預測
            </Link>
            <Link
              href="/fantasy/leaderboard"
              className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-8 py-3 text-lg font-semibold transition-all"
            >
              排行榜
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl tracking-[-0.02em]">
          怎麼玩？
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl glass glass-hover p-6 text-center transition-all duration-300 group"
            >
              <div className="text-4xl transition-transform duration-300 group-hover:scale-125">{f.emoji}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring rules */}
      <section className="border-y border-glass-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold sm:text-3xl tracking-[-0.02em]">
            計分規則
          </h2>
          <div className="mx-auto mt-10 grid max-w-2xl gap-4">
            {rules.map((rule) => (
              <div
                key={rule.label}
                className="flex items-center gap-4 rounded-xl glass p-4"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg glass-strong text-xl font-bold font-mono ${rule.color} ${rule.glow}`}
                >
                  {rule.points}
                </div>
                <div>
                  <div className={`font-semibold ${rule.color}`}>
                    {rule.label}
                  </div>
                  <div className="text-sm text-muted">{rule.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl tracking-[-0.02em]">範例</h2>
        <div className="mx-auto mt-8 max-w-lg rounded-xl glass-strong p-6">
          <div className="text-center text-muted text-sm mb-4">
            假設比賽結果是 🇫🇷 法國 <span className="font-mono font-bold text-accent">2 : 1</span> 巴西 🇧🇷
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-lg glass p-3">
              <span>你預測 <span className="font-mono font-semibold">2:1</span></span>
              <span className="font-bold text-neon-gold neon-text-gold">+10 分 完美！</span>
            </div>
            <div className="flex items-center justify-between rounded-lg glass p-3">
              <span>你預測 <span className="font-mono font-semibold">3:2</span></span>
              <span className="font-bold text-accent neon-text">+5 分 球差正確</span>
            </div>
            <div className="flex items-center justify-between rounded-lg glass p-3">
              <span>你預測 <span className="font-mono font-semibold">1:0</span></span>
              <span className="font-bold text-neon-blue neon-text-blue">+3 分 猜對法國贏</span>
            </div>
            <div className="flex items-center justify-between rounded-lg glass p-3">
              <span>你預測 <span className="font-mono font-semibold">0:2</span></span>
              <span className="font-bold text-red-400">+0 分 猜錯了</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl glass-strong p-8 text-center sm:p-12">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/8 blur-[80px]" />
          <div className="relative">
            <h2 className="text-2xl font-bold sm:text-3xl tracking-[-0.02em]">
              準備好了嗎？
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted">
              免費加入，開始預測世界盃比賽！看看你的足球直覺有多準。
            </p>
            <Link
              href="/fantasy/matches"
              className="mt-6 inline-flex items-center gap-2 rounded-lg btn-neon px-8 py-3 text-lg"
            >
              立即開始
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
