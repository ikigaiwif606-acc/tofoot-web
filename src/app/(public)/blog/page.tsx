import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import NewsletterForm from "@/components/NewsletterForm";
import { getBlogPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "文章 Blog | ToFoot 火光足球",
  description: "ToFoot 的足球文章——深度分析、球員故事、文化觀察。",
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold sm:text-4xl">文章 Blog</h1>
        <p className="mt-2 text-muted">
          深度分析、球員故事、足球文化——用文字帶你深入歐洲足球的世界。
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <NewsletterForm />
      </section>
    </main>
  );
}
