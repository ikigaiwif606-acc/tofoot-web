import { verifyAdmin } from "@/lib/auth";
import { getVideoRows } from "@/lib/db";
import { createVideo, updateVideo, deleteVideo } from "../actions";
import AdminVideoForm from "./AdminVideoForm";

export default async function AdminVideosPage() {
  await verifyAdmin();
  const videos = await getVideoRows();

  return (
    <div>
      <h1 className="text-2xl font-bold">Videos</h1>
      <p className="mt-1 text-sm text-muted">
        Manage YouTube videos ({videos.length} total)
      </p>

      {/* Create form */}
      <details className="mt-6 rounded-xl border border-card-border bg-card-bg">
        <summary className="cursor-pointer px-6 py-4 font-semibold text-accent">
          + Add New Video
        </summary>
        <div className="border-t border-card-border p-6">
          <AdminVideoForm action={createVideo} />
        </div>
      </details>

      {/* Video list */}
      <div className="mt-6 space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="rounded-xl border border-card-border bg-card-bg p-6"
          >
            <div className="flex items-start gap-4">
              <img
                src={`https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`}
                alt=""
                className="w-40 rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{video.title}</h3>
                <p className="text-sm text-muted">{video.title_en}</p>
                <div className="mt-1 flex gap-3 text-xs text-muted">
                  <span>{video.category}</span>
                  <span>{video.date}</span>
                  <span>{video.duration}</span>
                  <span>{video.views} views</span>
                </div>
              </div>
            </div>

            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-accent">
                Edit
              </summary>
              <div className="mt-4 border-t border-card-border pt-4">
                <AdminVideoForm
                  action={updateVideo.bind(null, video.id)}
                  defaultValues={video}
                />
              </div>
            </details>

            <form
              action={deleteVideo.bind(null, video.id)}
              className="mt-2"
            >
              <button
                type="submit"
                className="text-sm text-red-400 hover:text-red-300"
                onClick={(e) => {
                  if (!confirm("Delete this video?")) e.preventDefault();
                }}
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
