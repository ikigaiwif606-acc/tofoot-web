import type { Video } from "@/lib/db/queries";

const categoryLabels: Record<string, string> = {
  analysis: "ANALYSIS",
  news: "NEWS",
  prediction: "PREDICTION",
  culture: "CULTURE",
};

export default function VideoCard({ video }: { video: Video }) {
  const dateStr = video.date
    ? new Date(video.date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }).replace("/", ".")
    : "";

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group card card-interactive"
      style={{ padding: 0 }}
    >
      <div className="scanlines relative" style={{ aspectRatio: "16/9" }}>
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        {/* Duration badge */}
        <div
          className="absolute bottom-2 left-2 font-tech text-[10px]"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            border: "1px solid rgba(0, 255, 255, 0.27)",
            color: "#00ffff",
            textShadow: "0 0 6px #00ffff",
            padding: "2px 8px",
          }}
        >
          {video.duration}
        </div>
        {/* Play button */}
        <div
          className="absolute bottom-2 right-2 font-display text-[9px] font-bold tracking-[1px]"
          style={{
            background: "rgba(255, 0, 255, 0.15)",
            border: "1px solid rgba(255, 0, 255, 0.4)",
            color: "#ff00ff",
            textShadow: "0 0 6px #ff00ff",
            padding: "3px 10px",
          }}
        >
          PLAY ▶
        </div>
      </div>
      <div className="p-4">
        <div
          className="font-tech text-[9px] tracking-[1px]"
          style={{ color: "#ffee00", textShadow: "0 0 5px #ffee00" }}
        >
          // {categoryLabels[video.category] || video.category.toUpperCase()}
        </div>
        <h3 className="mt-2 font-body text-[14px] font-bold uppercase leading-snug text-[#8899bb] transition-colors duration-200 group-hover:text-white">
          {video.title}
        </h3>
        <div className="mt-2 font-tech text-[10px] text-text-ghost">
          {dateStr} // {video.views?.toLocaleString() || "0"} VIEWS
        </div>
      </div>
    </a>
  );
}
