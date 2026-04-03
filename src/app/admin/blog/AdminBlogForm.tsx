"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import type { BlogPost } from "@/lib/db/queries";
import type { ActionResult } from "@/lib/validations";

const inputClass =
  "w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function AdminBlogForm({
  action,
  defaultValues,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  defaultValues?: BlogPost;
}) {
  const [state, formAction, pending] = useActionState(action, {
    success: false,
  });

  useEffect(() => {
    if (state.success) toast.success(defaultValues ? "Post updated" : "Post created");
    if (state.error) toast.error(state.error);
  }, [state, defaultValues]);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-muted">Title</label>
          <input
            name="title"
            defaultValue={defaultValues?.title}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">
            Slug {defaultValues ? "(read-only)" : ""}
          </label>
          <input
            name="slug"
            defaultValue={defaultValues?.slug}
            readOnly={!!defaultValues}
            placeholder="Auto-generated from title"
            className={`${inputClass} ${defaultValues ? "opacity-50" : ""}`}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs text-muted">Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={defaultValues?.excerpt}
          required
          rows={2}
          className={inputClass}
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-muted">
          Content (Markdown)
        </label>
        <textarea
          name="content"
          defaultValue={defaultValues?.content}
          required
          rows={12}
          className={`${inputClass} font-mono text-xs`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs text-muted">Date</label>
          <input
            type="date"
            name="date"
            defaultValue={defaultValues?.date}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Category</label>
          <input
            name="category"
            defaultValue={defaultValues?.category}
            required
            placeholder="e.g. 世界盃"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Read Time</label>
          <input
            name="read_time"
            defaultValue={defaultValues?.readTime}
            placeholder="e.g. 8 min"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Cover Emoji</label>
          <input
            name="cover_emoji"
            defaultValue={defaultValues?.coverEmoji}
            placeholder="e.g. 🇫🇷"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : defaultValues
              ? "Update Post"
              : "Create Post"}
        </button>
        {state.error && (
          <p className="mt-2 text-sm text-danger">{state.error}</p>
        )}
      </div>
    </form>
  );
}
