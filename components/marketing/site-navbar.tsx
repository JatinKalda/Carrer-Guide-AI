"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/layout/theme-provider";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-premium">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display text-lg font-bold text-ink">CareerOS AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted transition-colors hover:text-ink"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/login" className="text-sm font-medium text-muted hover:text-ink">
            Log in
          </Link>
          <Link href="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card text-muted transition-colors hover:text-ink"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen((o) => !o)}>
            {open ? <X className="h-5 w-5 text-ink" /> : <Menu className="h-5 w-5 text-ink" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-4 border-t border-border/60 bg-card px-6 py-6 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="block text-sm font-medium text-ink">
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link href="/login" className="flex-1">
              <Button variant="secondary" className="w-full">
                Log in
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
