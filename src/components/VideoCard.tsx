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
      <div className="scanlines relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {/* Hover play overlay */}
        <div className="video-play-overlay">
          <div className="video-play-icon">
            <svg className="h-5 w-5 text-neon-cyan ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Bottom gradient for readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}
        />
        {/* Duration badge */}
        <div
          className="absolute bottom-2 left-2 font-tech text-[10px]"
          style={{
            background: "rgba(0, 0, 0, 0.85)",
            border: "1px solid rgba(0, 255, 255, 0.27)",
            color: "#00ffff",
            padding: "2px 8px",
          }}
        >
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <div className="font-tech text-[9px] tracking-[1px] text-neon-yellow">
          // {categoryLabels[video.category] || video.category.toUpperCase()}
        </div>
        <h3 className="mt-2 font-body text-[14px] font-bold leading-snug text-[#8899bb] transition-colors duration-200 group-hover:text-white">
          {video.title}
        </h3>
        <div className="mt-2 font-tech text-[10px] text-text-ghost">
          {dateStr} // {video.views?.toLocaleString() || "0"} VIEWS
        </div>
      </div>
    </a>
  );
}
