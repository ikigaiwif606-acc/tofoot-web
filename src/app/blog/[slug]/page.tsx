import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data";
import NewsletterForm from "@/components/NewsletterForm";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | ToFoot 火光足球`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <main className="flex-1">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link href="/blog" className="text-sm text-accent hover:underline">
          ← 返回文章列表
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>· {post.readTime}</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {post.coverEmoji} {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
        </div>

        <div className="mt-10 rounded-xl border border-card-border bg-card-bg p-8 text-center">
          <p className="text-lg text-muted">
            完整文章即將發布，敬請期待！
          </p>
          <p className="mt-2 text-sm text-muted">
            Full article coming soon. Stay tuned!
          </p>
        </div>

        <div className="mt-12">
          <NewsletterForm />
        </div>
      </article>
    </main>
  );
}
