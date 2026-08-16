"use client";

import { Search, Bell, Moon, Sun } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { user } from "@/lib/data";
import { Tooltip } from "@/components/ui/tooltip";
import { useTheme } from "@/components/layout/theme-provider";

export function Navbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-border/70 bg-background/80 px-6 backdrop-blur-xl lg:px-10">
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="truncate text-sm text-muted">{subtitle}</p>}
      </div>

      <div className="relative hidden w-72 md:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search anything..."
          className="h-11 w-full rounded-2xl border border-border bg-card pl-10 pr-4 text-sm text-ink placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        />
      </div>

      <Tooltip label="Notifications">
        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-muted transition-colors hover:text-ink">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger" />
        </button>
      </Tooltip>

      <Tooltip label={`Switch to ${isDark ? "light" : "dark"} mode`}>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card text-muted transition-colors hover:text-ink"
        >
          {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>
      </Tooltip>

      <button className="flex items-center gap-2 rounded-2xl border border-border bg-card py-1.5 pl-1.5 pr-3 transition-colors hover:border-primary-200">
        <Avatar initials={user.avatar} size="sm" />
        <span className="hidden text-sm font-medium text-ink sm:block">{user.firstName}</span>
      </button>
    </header>
  );
}
