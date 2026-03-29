import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "關於 About | ToFoot 火光足球",
  description: "認識 Tofu（李火光）——一位住在台灣的法國人，用中文帶你看懂歐洲足球。",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">關於 About</h1>

        <div className="mt-10 space-y-8">
          {/* Profile */}
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-card-border bg-card-bg p-8 sm:flex-row sm:items-start">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-accent/10 text-5xl">
              ⚽
            </div>
            <div>
              <h2 className="text-xl font-bold">
                Tofu / 李火光
              </h2>
              <p className="mt-1 text-sm text-accent">法國人 · 台灣六年 · 馬賽球迷</p>
              <p className="mt-4 text-muted leading-relaxed">
                大家好！我是 Tofu，來自法國馬賽，從小就是 Olympique de Marseille 的死忠球迷。
                六年前來到台灣，愛上了這裡的一切。我發現台灣有很多人對足球有興趣，
                但缺少用中文深入分析歐洲足球的內容。所以我決定創立 ToFoot 火光足球，
                用我的歐洲足球知識和經驗，帶台灣的朋友們一起享受足球的魅力！
              </p>
            </div>
          </div>

          {/* What we cover */}
          <div>
            <h2 className="text-2xl font-bold">頻道內容</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                {
                  emoji: "🏆",
                  title: "世界盃預測",
                  desc: "深入分析各國國家隊實力，預測2026世界盃走向。",
                },
                {
                  emoji: "📊",
                  title: "賽事分析",
                  desc: "歐冠、五大聯賽賽後分析，戰術拆解，數據解讀。",
                },
                {
                  emoji: "🌍",
                  title: "足球文化",
                  desc: "分享歐洲獨特的足球文化，從球場氛圍到球迷傳統。",
                },
                {
                  emoji: "📰",
                  title: "轉會新聞",
                  desc: "第一手歐洲轉會消息，深入解讀球員動態和俱樂部策略。",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-card-border bg-card-bg p-5"
                >
                  <div className="text-3xl">{item.emoji}</div>
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <h2 className="text-2xl font-bold">社群連結</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@ToFootwn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 transition-colors hover:border-red-500/50"
              >
                <span className="text-xl">▶</span>
                <span className="font-medium">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/tofu_twn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 transition-colors hover:border-pink-500/50"
              >
                <span className="text-xl">📷</span>
                <span className="font-medium">Instagram</span>
              </a>
              <a
                href="mailto:tofudafucontact@gmail.com"
                className="flex items-center gap-2 rounded-lg border border-card-border bg-card-bg px-5 py-3 transition-colors hover:border-accent/50"
              >
                <span className="text-xl">✉️</span>
                <span className="font-medium">Email</span>
              </a>
            </div>
          </div>

          {/* Collaboration */}
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-8">
            <h2 className="text-2xl font-bold">合作邀約</h2>
            <p className="mt-3 text-muted">
              如果你有任何合作想法——品牌贊助、聯名內容、活動邀請——歡迎來信聯繫！
            </p>
            <p className="mt-2 font-medium text-accent">
              tofudafucontact@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-12">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
