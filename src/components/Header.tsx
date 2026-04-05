"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/daily", label: "DAILY" },
  { href: "/videos", label: "VIDEOS" },
  { href: "/blog", label: "BLOG" },
  { href: "/world-cup", label: "WORLD CUP" },
  { href: "/about", label: "ABOUT" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="navbar sticky top-0 z-50">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-lg transition-transform group-hover:scale-110">
            ⚽
          </span>
          <span className="font-display text-[18px] font-black tracking-wider">
            <span className="text-white">TO</span>
            <span className="text-neon-cyan" style={{ textShadow: "0 0 8px #00ffff" }}>
              [FOOT]
            </span>
          </span>
          <span className="hidden sm:inline font-tech text-[10px] text-neon-magenta" style={{ textShadow: "0 0 6px #ff00ff" }}>
            火光足球
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-[10px] font-bold tracking-[2px] px-3 py-2 transition-all duration-200 ${
                  active
                    ? "text-neon-cyan"
                    : "text-text-dim hover:text-neon-cyan"
                }`}
                style={active ? { textShadow: "0 0 8px #00ffff" } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-text-dim transition-colors hover:text-neon-cyan md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border-default px-4 pb-4 md:hidden" style={{ background: "#030308" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block font-display text-[10px] font-bold tracking-[2px] px-4 py-3 transition-colors ${
                isActive(pathname, link.href)
                  ? "text-neon-cyan"
                  : "text-text-dim hover:text-neon-cyan"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
