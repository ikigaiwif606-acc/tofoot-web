import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import BlogCard from "@/components/BlogCard";
import NewsletterForm from "@/components/NewsletterForm";
import CountdownTimer from "@/components/fantasy/CountdownTimer";
import { getVideos, getBlogPosts } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const videos = await getVideos();
  const blogPosts = await getBlogPosts();
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-glass-border">
        {/* Ambient orbs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-accent/5 blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-20 h-56 w-56 rounded-full bg-neon-blue/5 blur-[80px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
          <div className="animate-fade-in">
            <span className="inline-block rounded-full glass px-4 py-1.5 text-sm font-medium text-accent">
              🇫🇷 法國人在台灣 🇹🇼
            </span>
          </div>
          <h1 className="animate-fade-in mt-6 text-4xl font-bold leading-tight tracking-[-0.02em] sm:text-6xl">
            用中文，帶你看懂
            <br />
            <span className="text-accent neon-text">歐洲足球</span>
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
              className="inline-flex items-center gap-2 rounded-lg bg-red-600/90 px-6 py-3 font-semibold text-white transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube 頻道
            </a>
            <Link
              href="/videos"
              className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-6 py-3 font-semibold transition-all"
            >
              瀏覽影片
            </Link>
          </div>

          {/* Stats — glass scoreboard style */}
          <div className="animate-fade-in-delay-2 mt-14 rounded-xl glass-strong p-6 sm:max-w-md">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-accent neon-text">2.5K+</div>
                <div className="mt-1 text-xs text-muted">訂閱者</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-accent neon-text">49</div>
                <div className="mt-1 text-xs text-muted">影片</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-accent neon-text">26K+</div>
                <div className="mt-1 text-xs text-muted">觀看次數</div>
              </div>
            </div>
            <div className="mt-3 text-center text-[10px] text-muted/60">
              最後更新：2026年3月
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Embed */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl tracking-[-0.02em]">最新影片</h2>
            <p className="mt-1 text-muted">Latest Videos</p>
          </div>
          <Link
            href="/videos"
            className="text-sm font-medium text-accent hover:underline"
          >
            查看全部 →
          </Link>
        </div>

        {/* Hero video embed */}
        <div className="mt-8 overflow-hidden rounded-xl glass">
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0]?.youtubeId}`}
              title={videos[0]?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg">{videos[0]?.title}</h3>
            <p className="mt-1 text-sm text-muted">{videos[0]?.description}</p>
          </div>
        </div>

        {/* More videos */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.slice(1, 4).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* World Cup Countdown + Fantasy CTA */}
      <section className="relative border-y border-glass-border overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl tracking-[-0.02em]">
            🏆 2026 世界盃倒數
          </h2>
          <p className="mt-2 text-muted">FIFA World Cup 2026 — USA, Mexico, Canada</p>
          <div className="mt-8">
            <CountdownTimer />
          </div>

          {/* Fan counter */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
            <div className="flex -space-x-1.5">
              <span className="text-sm">⚽</span>
              <span className="text-sm">🇫🇷</span>
              <span className="text-sm">🇹🇼</span>
            </div>
            <span className="text-sm text-muted">
              已有 <span className="font-semibold text-accent neon-text">150+</span> 位球迷加入預測
            </span>
          </div>

          <p className="mt-4 text-sm text-muted">
            跟著 ToFoot 一起準備世界盃！每週更新各隊分析和預測。
          </p>
          <Link
            href="/fantasy"
            className="mt-6 inline-flex items-center gap-2 rounded-lg btn-neon px-6 py-3"
          >
            🏆 加入夢幻足球預測遊戲
          </Link>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl tracking-[-0.02em]">文章</h2>
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
