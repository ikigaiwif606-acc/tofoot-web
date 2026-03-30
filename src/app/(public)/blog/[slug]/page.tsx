import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPost } from "@/lib/db";

export const dynamic = "force-dynamic";
import NewsletterForm from "@/components/NewsletterForm";

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

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="my-4 space-y-2 pl-6 list-disc text-muted"
        >
          {listItems.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item.includes("**") ? (
                <span>
                  <strong className="text-foreground">
                    {item.match(/\*\*(.*?)\*\*/)?.[1]}
                  </strong>
                  {item.replace(/\*\*.*?\*\*/, "")}
                </span>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${i}`}
          className="mt-10 mb-4 text-xl font-bold text-foreground sm:text-2xl"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed.match(/^\d+\.\s/)) {
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
    } else if (trimmed === "") {
      flushList();
    } else {
      flushList();
      elements.push(
        <p key={`p-${i}`} className="my-4 leading-relaxed text-muted">
          {trimmed.includes("**") ? (
            <>
              {trimmed.split(/(\*\*.*?\*\*)/).map((part, j) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <strong key={j} className="text-foreground">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </>
          ) : (
            trimmed
          )}
        </p>
      );
    }
  }

  flushList();
  return elements;
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
          {renderContent(post.content)}
        </div>

        <div className="mt-12">
          <NewsletterForm />
        </div>
      </article>
    </main>
  );
}
