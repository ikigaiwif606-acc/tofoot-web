"use client";

import { useState } from "react";
import VideoCard from "@/components/VideoCard";
import type { Video } from "@/lib/db/queries";

interface Category {
  key: string;
  label: string;
  labelEn: string;
}

export default function VideosClient({
  videos,
  categories,
}: {
  videos: Video[];
  categories: Category[];
}) {
  const [filter, setFilter] = useState("all");
  const [featured, setFeatured] = useState(videos[0]);

  const filteredVideos =
    filter === "all"
      ? videos
      : videos.filter((v) => v.category === filter);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">影片 Videos</h1>
        <p className="mt-2 text-muted">
          所有 ToFoot 頻道影片。點擊觀看完整內容。
        </p>

        {/* Featured video embed */}
        {featured && (
          <div className="mt-8 overflow-hidden rounded-xl border border-card-border bg-card-bg">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${featured.youtubeId}`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold">{featured.title}</h2>
              <p className="mt-1 text-sm text-muted">
                {featured.description}
              </p>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === cat.key
                  ? "bg-accent/20 text-accent"
                  : "bg-card-bg text-muted hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setFeatured(video)}
              className="cursor-pointer"
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="mt-12 text-center text-muted">
            這個類別還沒有影片
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@ToFootwn?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            訂閱頻道看更多影片
          </a>
        </div>
      </section>
    </main>
  );
}
