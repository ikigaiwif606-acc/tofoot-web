import Link from "next/link";
import type { BlogPost } from "@/lib/db/queries";

export default function BlogCard({ post }: { post: BlogPost }) {
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" }).replace("/", ".")
    : "";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 items-start py-4 transition-colors hover:bg-[rgba(0,255,255,0.02)]"
      style={{ borderBottom: "1px solid #0a0a18" }}
    >
      {/* Thumbnail */}
      <div
        className="scanlines shrink-0 flex items-center justify-center text-2xl transition-all duration-200 group-hover:border-[rgba(0,255,255,0.27)]"
        style={{
          width: 70,
          height: 50,
          border: "1px solid #0d0d22",
          background: "#06060f",
        }}
      >
        {post.coverEmoji}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="font-tech text-[9px] tracking-[1px] text-neon-magenta">
          // {post.category?.toUpperCase() || "ARTICLE"}
        </div>
        <h3 className="mt-1 font-body text-[14px] font-bold leading-snug text-text-muted transition-colors duration-200 group-hover:text-white truncate">
          {post.title}
        </h3>
        <div className="mt-1 font-tech text-[10px] text-text-ghost">
          {dateStr} // {post.readTime || "5 MIN"}
        </div>
      </div>

      {/* Arrow */}
      <span className="shrink-0 text-text-ghost transition-all duration-200 group-hover:text-neon-cyan group-hover:translate-x-0.5 mt-3">
        →
      </span>
    </Link>
  );
}
