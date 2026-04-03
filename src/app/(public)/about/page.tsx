import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import IdeaBox from "./IdeaBox";

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
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-white to-red-500">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card-bg text-4xl font-bold">
                🇫🇷
              </div>
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
                className="flex items-center gap-3 rounded-lg border border-card-border bg-card-bg px-5 py-3 transition-colors hover:border-red-500/50 hover:bg-red-500/5"
              >
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-medium">YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/tofu_twn/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-card-border bg-card-bg px-5 py-3 transition-colors hover:border-pink-500/50 hover:bg-pink-500/5"
              >
                <svg className="h-5 w-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                <span className="font-medium">Instagram</span>
              </a>
              <a
                href="mailto:tofudafucontact@gmail.com"
                className="flex items-center gap-3 rounded-lg border border-card-border bg-card-bg px-5 py-3 transition-colors hover:border-accent/50 hover:bg-accent/5"
              >
                <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
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
          <IdeaBox />
        </div>

        <div className="mt-8">
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
