import { verifyAdmin } from "@/lib/auth";
import { getAdminStats } from "@/lib/db/queries";

export default async function AdminDashboard() {
  await verifyAdmin();
  const stats = await getAdminStats();

  const cards = [
    { label: "Videos", value: stats.videoCount, icon: "🎬" },
    { label: "Blog Posts", value: stats.blogCount, icon: "📝" },
    { label: "Total Matches", value: stats.matchCount, icon: "⚽" },
    { label: "Upcoming", value: stats.upcomingMatches, icon: "📅" },
    { label: "Finished", value: stats.finishedMatches, icon: "✅" },
    { label: "Fantasy Users", value: stats.userCount, icon: "👥" },
    { label: "Predictions", value: stats.predictionCount, icon: "🎯" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">ToFoot Admin Overview</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-card-border bg-card-bg p-6"
          >
            <div className="text-2xl">{card.icon}</div>
            <div className="mt-2 text-3xl font-bold text-accent">
              {card.value}
            </div>
            <div className="mt-1 text-sm text-muted">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
