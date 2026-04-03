import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import BlogSearch from "@/components/BlogSearch";
import NewsletterForm from "@/components/NewsletterForm";
import { getBlogPostsPaginated, searchBlogPosts } from "@/lib/db/queries";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "文章 Blog | ToFoot 火光足球",
  description: "ToFoot 的足球文章——深度分析、球員故事、文化觀察。",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cursor?: string }>;
}) {
  const { q, cursor } = await searchParams;

  const { posts, nextCursor } = q
    ? await searchBlogPosts(q, cursor)
    : await getBlogPostsPaginated(cursor);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">文章 Blog</h1>
            <p className="mt-2 text-muted">
              深度分析、球員故事、足球文化——用文字帶你深入歐洲足球的世界。
            </p>
          </div>
          <Suspense>
            <BlogSearch />
          </Suspense>
        </div>

        {q && (
          <div className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span>
              搜尋「<span className="text-accent">{q}</span>」找到{" "}
              {posts.length}
              {nextCursor ? "+" : ""} 篇文章
            </span>
            <Link href="/blog" className="text-accent hover:underline">
              清除搜尋
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="mt-12 text-center text-muted">
            {q ? `沒有找到與「${q}」相關的文章` : "目前沒有文章"}
          </div>
        )}

        {nextCursor && (
          <div className="mt-8 text-center">
            <Link
              href={`/blog?${new URLSearchParams({
                ...(q ? { q } : {}),
                cursor: nextCursor,
              })}`}
              className="inline-flex items-center rounded-lg border border-card-border px-6 py-2.5 text-sm font-medium transition-colors hover:bg-surface-hover"
            >
              載入更多
            </Link>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <NewsletterForm />
      </section>
    </main>
  );
}
