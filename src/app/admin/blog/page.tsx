import { verifyAdmin } from "@/lib/auth";
import { getBlogPosts } from "@/lib/db/queries";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "../actions";
import { DeleteButton } from "../DeleteButton";
import AdminBlogForm from "./AdminBlogForm";

export default async function AdminBlogPage() {
  await verifyAdmin();
  const posts = await getBlogPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <p className="mt-1 text-sm text-muted">
        Manage blog posts ({posts.length} total)
      </p>

      <details className="mt-6 rounded-xl border border-card-border bg-card-bg">
        <summary className="cursor-pointer px-6 py-4 font-semibold text-accent">
          + Add New Post
        </summary>
        <div className="border-t border-card-border p-6">
          <AdminBlogForm action={createBlogPost} />
        </div>
      </details>

      <div className="mt-6 space-y-4">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="rounded-xl border border-card-border bg-card-bg p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">
                  {post.coverEmoji} {post.title}
                </h3>
                <p className="mt-1 text-sm text-muted line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-2 flex gap-3 text-xs text-muted">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <span className="font-mono text-muted/60">{post.slug}</span>
                </div>
              </div>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-accent">
                Edit
              </summary>
              <div className="mt-4 border-t border-card-border pt-4">
                <AdminBlogForm
                  action={updateBlogPost.bind(null, post.slug)}
                  defaultValues={post}
                />
              </div>
            </details>

            <div className="mt-2">
              <DeleteButton
                action={deleteBlogPost.bind(null, post.slug)}
                confirmMessage="Delete this post?"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
