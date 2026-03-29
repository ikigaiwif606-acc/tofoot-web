"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "首頁", labelEn: "Home" },
  { href: "/videos", label: "影片", labelEn: "Videos" },
  { href: "/blog", label: "文章", labelEn: "Blog" },
  { href: "/about", label: "關於", labelEn: "About" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>
          <span className="text-xl font-bold tracking-tight">
            ToFoot <span className="text-accent">火光足球</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-card-bg hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.youtube.com/@ToFootwn"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            YouTube ▶
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-card-bg md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-card-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-card-bg hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.youtube.com/@ToFootwn"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-medium text-white"
          >
            YouTube ▶
          </a>
        </nav>
      )}
    </header>
  );
}
