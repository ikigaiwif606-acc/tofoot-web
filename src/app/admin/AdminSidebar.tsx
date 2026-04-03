"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/admin/videos", label: "Videos", icon: "🎬", exact: false },
  { href: "/admin/blog", label: "Blog", icon: "📝", exact: false },
  { href: "/admin/matches", label: "Matches", icon: "⚽", exact: false },
  { href: "/admin/leaderboard", label: "Leaderboard", icon: "🏆", exact: false },
  { href: "/admin/suggestions", label: "Idea Box", icon: "💡", exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return null;
  }

  return (
    <aside className="w-56 shrink-0 border-r border-card-border bg-card-bg">
      <div className="sticky top-0 flex h-screen flex-col p-4">
        <Link href="/admin" className="mb-6 text-lg font-bold text-accent">
          ToFoot Admin
        </Link>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
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
  );
}
