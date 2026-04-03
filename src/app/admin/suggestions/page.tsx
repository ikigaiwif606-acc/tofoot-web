import { verifyAdmin } from "@/lib/auth";
import { getSuggestions } from "@/lib/db/queries";

export default async function AdminSuggestionsPage() {
  await verifyAdmin();
  const suggestions = await getSuggestions();

  return (
    <div>
      <h1 className="text-2xl font-bold">Idea Box</h1>
      <p className="mt-1 text-sm text-muted">
        User suggestions ({suggestions.length} total)
      </p>

      {suggestions.length === 0 ? (
        <div className="mt-8 card text-center text-muted">
          No suggestions yet
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-card-border bg-card-bg p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {s.name || "Anonymous"}
                </span>
                <span className="text-xs text-muted">
                  {s.createdAt
                    ? new Date(s.createdAt).toLocaleDateString("zh-TW")
                    : ""}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted whitespace-pre-wrap">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
