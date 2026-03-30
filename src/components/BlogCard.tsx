import Link from "next/link";
import type { BlogPost } from "@/lib/data";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 rounded-xl glass glass-hover p-5 transition-all duration-300"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-3xl transition-transform duration-300 group-hover:scale-110">
        {post.coverEmoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">
            {post.category}
          </span>
          <span>{post.date}</span>
          <span>· {post.readTime}</span>
        </div>
        <h3 className="mt-1 font-semibold leading-snug group-hover:text-accent transition-colors truncate">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-muted line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
