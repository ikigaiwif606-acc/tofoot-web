import type { Metadata } from "next";
import VideoCard from "@/components/VideoCard";
import { videos } from "@/lib/data";

export const metadata: Metadata = {
  title: "影片 Videos | ToFoot 火光足球",
  description: "所有 ToFoot 影片——2026世界盃預測、賽事分析、歐洲足球新聞。",
};

export default function VideosPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">影片 Videos</h1>
        <p className="mt-2 text-muted">
          所有 ToFoot 頻道影片。點擊前往 YouTube 觀看完整內容。
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@ToFootwn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            ▶ 前往 YouTube 觀看更多影片
          </a>
        </div>
      </section>
    </main>
  );
}
