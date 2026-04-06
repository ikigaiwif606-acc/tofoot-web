import Link from "next/link";
import VideoCard from "@/components/VideoCard";
import BlogCard from "@/components/BlogCard";
import CountdownTimer from "@/components/world-cup/CountdownTimer";
import { getVideos, getBlogPosts } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [videos, blogPosts] = await Promise.all([
    getVideos(),
    getBlogPosts(),
  ]);

  const featuredVideo = videos[0];
  const latestVideos = videos.slice(1, 5);
  const latestPosts = blogPosts.slice(0, 6);

  return (
    <main className="flex-1 relative z-10">
      {/* ===== HERO — World Cup Countdown ===== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(0, 255, 255, 0.03) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(0, 255, 255, 0.13)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20 text-center">
          <div className="animate-fade-in">
            <span className="font-tech text-[10px] tracking-[2px] text-neon-magenta">
              // FIFA_WORLD_CUP_2026
            </span>
            <h1
              className="mt-3 font-display text-[36px] sm:text-[48px] lg:text-[56px] font-black leading-[1.05] text-white tracking-[0.04em]"
            >
              WORLD CUP<br />
              <span className="text-neon-cyan" style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.4)" }}>
                COUNTDOWN
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-md font-body text-[15px] text-muted">
              法國人在台灣，用中文帶你看懂歐洲足球。加入預測遊戲，與其他球迷比賽！
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xs animate-fade-in-delay">
            <CountdownTimer />
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 animate-fade-in-delay-2">
            <Link
              href="/world-cup/predict"
              className="btn-press inline-block font-display text-[11px] font-bold tracking-[2px] text-neon-cyan transition-all duration-200 hover:bg-[rgba(0,255,255,0.12)]"
              style={{
                border: "1px solid rgba(0, 255, 255, 0.5)",
                padding: "12px 28px",
                textShadow: "0 0 8px #00ffff",
              }}
            >
              開始預測 →
            </Link>
            <Link
              href="/world-cup/leaderboard"
              className="btn-press inline-block font-display text-[11px] font-bold tracking-[2px] text-text-dim transition-all duration-200 hover:text-white"
              style={{
                border: "1px solid #0d0d22",
                padding: "12px 28px",
              }}
            >
              排行榜
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED VIDEO + TRENDING ===== */}
      <section className="border-b" style={{ borderColor: "rgba(0, 255, 255, 0.13)" }}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row">
            {/* Hero main — featured video */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <div className="animate-fade-in">
                {featuredVideo ? (
                  <a
                    href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="scanlines relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <img
                        src={`https://img.youtube.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`}
                        alt={featuredVideo.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="video-play-overlay">
                        <div className="video-play-icon">
                          <svg className="h-5 w-5 text-neon-cyan ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div
                        className="absolute bottom-3 left-3 font-tech text-[10px]"
                        style={{
                          background: "rgba(0, 0, 0, 0.85)",
                          border: "1px solid rgba(0, 255, 255, 0.27)",
                          color: "#00ffff",
                          padding: "2px 8px",
                        }}
                      >
                        {featuredVideo.duration}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-tech text-[9px] tracking-[1px] text-neon-yellow">
                        // FEATURED
                      </span>
                      <h2
                        className="mt-2 font-display text-[22px] sm:text-[26px] font-black leading-tight text-white transition-colors duration-200 group-hover:text-neon-cyan"
                      >
                        {featuredVideo.title}
                      </h2>
                      {featuredVideo.description && (
                        <p className="mt-2 font-body text-[14px] text-muted line-clamp-2">
                          {featuredVideo.description}
                        </p>
                      )}
                    </div>
                  </a>
                ) : (
                  <div>
                    <h2 className="font-display text-[26px] font-black leading-tight text-white">
                      TOFOOT 火光足球
                    </h2>
                    <p className="mt-2 font-body text-[14px] text-muted">
                      法國人在台灣，用中文帶你看懂歐洲足球。
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Trending sidebar */}
            <div
              className="w-full shrink-0 lg:w-[360px]"
              style={{ borderLeft: "1px solid rgba(0, 255, 255, 0.13)" }}
            >
              <div
                className="px-4 py-3"
                style={{
                  background: "rgba(0, 255, 255, 0.04)",
                  borderBottom: "1px solid rgba(0, 255, 255, 0.15)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[10px] font-bold tracking-[2px] text-neon-cyan">
                    // 熱門話題
                  </span>
                  <Link
                    href="/blog"
                    className="font-tech text-[10px] text-neon-magenta transition-colors hover:text-neon-cyan"
                  >
                    VIEW_ALL →
                  </Link>
                </div>
              </div>

              {latestPosts.slice(0, 5).map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-3 transition-colors hover:bg-[rgba(0,255,255,0.04)]"
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #0d0d1a",
                  }}
                >
                  <span
                    className="font-display text-[22px] font-black leading-none transition-colors group-hover:text-neon-cyan"
                    style={{ color: "#111128" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="font-tech text-[9px] tracking-[1px] text-neon-magenta">
                      // {post.category?.toUpperCase() || "ARTICLE"}
                    </span>
                    <h3 className="mt-0.5 font-body text-[14px] font-bold leading-snug text-[#8899bb] transition-colors group-hover:text-white truncate">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAIN CONTENT + SIDEBAR ===== */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          {/* Main feed */}
          <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10" style={{ borderRight: "1px solid #0d0d1a" }}>
            {/* Latest Videos */}
            <div className="section-title">
              最新影片 // LATEST_VIDEOS
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {latestVideos.map((video, i) => (
                <div key={video.id} className={`animate-fade-in opacity-0 stagger-${i + 1}`}>
                  <VideoCard video={video} />
                </div>
              ))}
            </div>

            {/* Article List */}
            <div className="section-title mt-10">
              文章 // ARTICLES
            </div>
            <div>
              {latestPosts.slice(0, 4).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <Link
              href="/blog"
              className="mt-4 inline-block font-display text-[10px] font-bold tracking-[2px] text-neon-cyan transition-colors hover:text-white"
            >
              查看全部 // VIEW_ALL →
            </Link>
          </div>

          {/* Right sidebar */}
          <div className="w-full shrink-0 px-4 py-8 lg:w-[300px] lg:px-5 lg:py-10">
            {/* Author Card */}
            <div
              className="relative overflow-hidden"
              style={{
                background: "#06060f",
                border: "1px solid rgba(255, 0, 255, 0.15)",
              }}
            >
              {/* Top accent */}
              <div
                className="h-[2px]"
                style={{ background: "linear-gradient(90deg, #ff00ff, #00ffff)" }}
              />
              <div className="p-5">
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center text-3xl"
                  style={{
                    border: "1px solid rgba(255, 0, 255, 0.3)",
                    background: "rgba(255, 0, 255, 0.06)",
                  }}
                >
                  ⚽
                </div>
                <div className="mt-3 text-center">
                  <h3 className="font-display text-[12px] font-bold tracking-[2px] text-neon-magenta">
                    TOFU_李火光
                  </h3>
                  <p className="mt-2 font-tech text-[11px] text-text-dim leading-relaxed">
                    法國馬賽人，在台灣住了六年。用中文帶你走進足球的世界。
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <a
                    href="https://www.youtube.com/@ToFootwn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press flex-1 text-center font-tech text-[10px] text-text-dim py-2.5 transition-colors hover:text-neon-cyan hover:border-[rgba(0,255,255,0.3)]"
                    style={{ border: "1px solid #0d0d22" }}
                  >
                    YOUTUBE
                  </a>
                  <a
                    href="https://www.instagram.com/tofu_twn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-press flex-1 text-center font-tech text-[10px] text-text-dim py-2.5 transition-colors hover:text-neon-magenta hover:border-[rgba(255,0,255,0.3)]"
                    style={{ border: "1px solid #0d0d22" }}
                  >
                    INSTAGRAM
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div
              className="mt-6"
              style={{
                background: "#06060f",
                border: "1px solid #0d0d22",
              }}
            >
              <div className="px-4 py-3" style={{ borderBottom: "1px solid #0d0d1a" }}>
                <span className="font-display text-[10px] font-bold tracking-[2px] text-text-dim">
                  // QUICK_LINKS
                </span>
              </div>
              {[
                { href: "/world-cup", label: "WORLD CUP 2026", accent: true },
                { href: "/daily", label: "每日猜球挑戰", accent: false },
                { href: "/videos", label: "全部影片", accent: false },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center justify-between px-4 py-3 font-body text-[13px] font-semibold transition-colors hover:bg-[rgba(0,255,255,0.04)] ${
                    link.accent ? "text-neon-cyan" : "text-text-muted"
                  }`}
                  style={{ borderBottom: "1px solid #0d0d1a" }}
                >
                  {link.label}
                  <span className="text-text-ghost transition-colors group-hover:text-neon-cyan">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
