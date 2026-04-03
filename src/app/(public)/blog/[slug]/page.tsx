import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPost } from "@/lib/db/queries";
import NewsletterForm from "@/components/NewsletterForm";
import BlogContent from "./BlogContent";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | ToFoot 火光足球`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
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

        <div className="mt-8 border-t border-card-border pt-8">
          <BlogContent content={post.content} />
        </div>

        <div className="mt-12">
          <NewsletterForm />
        </div>
      </article>
    </main>
  );
}
