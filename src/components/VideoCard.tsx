import type { Video } from "@/lib/data";

const categoryColors: Record<string, string> = {
  analysis: "bg-blue-500/20 text-blue-400",
  news: "bg-yellow-500/20 text-yellow-400",
  prediction: "bg-purple-500/20 text-purple-400",
  culture: "bg-orange-500/20 text-orange-400",
};

const categoryLabels: Record<string, string> = {
  analysis: "賽事分析",
  news: "新聞",
  prediction: "預測",
  culture: "文化",
};

export default function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={`https://www.youtube.com/@ToFootwn`}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-xl border border-card-border bg-card-bg transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="relative aspect-video bg-gray-800">
        <div className="flex h-full items-center justify-center text-6xl opacity-60 group-hover:opacity-100 transition-opacity">
          ▶
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs font-mono text-white">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[video.category]}`}>
            {categoryLabels[video.category]}
          </span>
          <span className="text-xs text-muted">{video.date}</span>
        </div>
        <h3 className="mt-2 font-semibold leading-snug group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        <p className="mt-1 text-sm text-muted line-clamp-2">{video.description}</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted">
          <span>👁 {video.views} views</span>
        </div>
      </div>
    </a>
  );
}
