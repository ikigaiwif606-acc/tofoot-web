import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/videos", label: "Videos", icon: "🎬" },
  { href: "/admin/blog", label: "Blog", icon: "📝" },
  { href: "/admin/matches", label: "Matches", icon: "⚽" },
  { href: "/admin/leaderboard", label: "Leaderboard", icon: "🏆" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-card-border bg-card-bg">
        <div className="sticky top-0 flex h-screen flex-col p-4">
          <Link href="/admin" className="mb-6 text-lg font-bold text-accent">
            ToFoot Admin
          </Link>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              ← Back to site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
