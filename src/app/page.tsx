import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import BlogCard from "@/components/BlogCard";
import NewsletterForm from "@/components/NewsletterForm";
import { videos, blogPosts } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-card-border">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-blue-500/5" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
          <div className="animate-fade-in">
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              🇫🇷 法國人在台灣 🇹🇼
            </span>
          </div>
          <h1 className="animate-fade-in mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            用中文，帶你看懂
            <br />
            <span className="text-accent">歐洲足球</span>
          </h1>
          <p className="animate-fade-in-delay mt-6 max-w-xl text-lg text-muted">
            我是 Tofu（李火光），來自法國的馬賽球迷，在台灣住了六年。
            我用中文分享歐洲足球的深度分析、戰術解讀和文化觀察。
          </p>
          <div className="animate-fade-in-delay-2 mt-8 flex flex-wrap gap-4">
            <a
              href="https://www.youtube.com/@ToFootwn"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
            >
              ▶ YouTube 頻道
            </a>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-lg border border-card-border px-6 py-3 font-semibold transition-colors hover:bg-card-bg"
            >
              瀏覽影片
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-delay-2 mt-14 grid grid-cols-3 gap-6 rounded-xl border border-card-border bg-card-bg p-6 sm:max-w-md">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">2.5K+</div>
              <div className="mt-1 text-xs text-muted">訂閱者</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">49</div>
              <div className="mt-1 text-xs text-muted">影片</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">26K+</div>
              <div className="mt-1 text-xs text-muted">觀看次數</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">最新影片</h2>
            <p className="mt-1 text-muted">Latest Videos</p>
          </div>
          <Link
            href="/videos"
            className="text-sm font-medium text-accent hover:underline"
          >
            查看全部 →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(0, 3).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* World Cup Countdown */}
      <section className="border-y border-card-border bg-card-bg">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            🏆 2026 世界盃倒數
          </h2>
          <p className="mt-2 text-muted">FIFA World Cup 2026 — USA, Mexico, Canada</p>
          <div className="mt-8 flex justify-center gap-4 sm:gap-8">
            {[
              { value: "80", label: "天 Days" },
              { value: "12", label: "時 Hrs" },
              { value: "34", label: "分 Min" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-card-border bg-background px-6 py-4 sm:px-10 sm:py-6">
                <div className="text-3xl font-bold text-accent sm:text-5xl">{item.value}</div>
                <div className="mt-1 text-xs text-muted sm:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            跟著 ToFoot 一起準備世界盃！每週更新各隊分析和預測。
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">文章</h2>
            <p className="mt-1 text-muted">Blog Posts</p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-accent hover:underline"
          >
            查看全部 →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {blogPosts.slice(0, 4).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <NewsletterForm />
      </section>
    </main>
  );
}
