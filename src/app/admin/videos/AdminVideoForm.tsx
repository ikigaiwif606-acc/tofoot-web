"use client";

import type { Video } from "@/lib/db/queries";

const inputClass =
  "w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export default function AdminVideoForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValues?: Video;
}) {
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs text-muted">Title (中文)</label>
        <input
          name="title"
          defaultValue={defaultValues?.title}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted">Title (EN)</label>
        <input
          name="title_en"
          defaultValue={defaultValues?.titleEn}
          required
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs text-muted">Description</label>
        <input
          name="description"
          defaultValue={defaultValues?.description}
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted">YouTube ID</label>
        <input
          name="youtube_id"
          defaultValue={defaultValues?.youtubeId}
          required
          placeholder="e.g. dQw4w9WgXcQ"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted">Category</label>
        <select
          name="category"
          defaultValue={defaultValues?.category || "analysis"}
          className={inputClass}
        >
          <option value="analysis">賽事分析</option>
          <option value="news">新聞</option>
          <option value="prediction">預測</option>
          <option value="culture">文化</option>
        </select>
      </div>
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
        <label className="mb-1 block text-xs text-muted">Duration</label>
        <input
          name="duration"
          defaultValue={defaultValues?.duration}
          required
          placeholder="e.g. 11:12"
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-muted">Views</label>
        <input
          name="views"
          defaultValue={defaultValues?.views}
          placeholder="e.g. 3,570"
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
        >
          {defaultValues ? "Update Video" : "Add Video"}
        </button>
      </div>
    </form>
  );
}
