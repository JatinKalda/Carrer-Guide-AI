"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { useProfile } from "@/lib/profile-context";
import { clearSession } from "@/lib/auth";
import {
  LayoutGrid,
  Linkedin,
  FileText,
  Briefcase,
  Target,
  Map,
  Bot,
  LineChart,
  UserRound,
  Settings,
  Sparkles,
  ChevronRight,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/linkedin-analysis", label: "LinkedIn Analysis", icon: Linkedin },
  { href: "/career-report", label: "Career Report", icon: FileText },
  { href: "/job-matches", label: "Job Matches", icon: Briefcase },
  { href: "/skill-gap", label: "Skill Gap", icon: Target },
  { href: "/learning-roadmap", label: "Learning Roadmap", icon: Map },
  { href: "/ai-coach", label: "AI Coach", icon: Bot },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    clearSession();
    router.push("/login");
  }
  const ProfileFooter = () => {
    const { profile } = useProfile();
    const avatarInitials = (profile.name.match(/\b\w/g) || ["U"]).join("").slice(0, 2).toUpperCase();

    return (
      <div className="mt-4 flex items-center gap-3 rounded-2xl px-2 py-2">
        <Avatar initials={avatarInitials} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{profile.name}</p>
          <p className="truncate text-xs text-muted">{profile.role}</p>
        </div>
        <button
          onClick={handleLogout}
          title="Log out"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-subtle hover:text-danger"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] flex-col border-r border-border/70 bg-card/80 backdrop-blur-xl lg:flex">
      <div className="flex h-20 items-center gap-2 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-premium">
          <Sparkles className="h-[18px] w-[18px]" />
        </div>
        <span className="font-display text-[17px] font-bold tracking-tight text-ink">
          CareerOS <span className="text-gradient">AI</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-primary-50 text-primary-700 dark:bg-primary/20 dark:text-primary-300 shadow-[inset_0_0_0_1px_rgba(91,95,239,0.12)]"
                  : "text-muted hover:bg-subtle hover:text-ink"
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] transition-colors",
                  active ? "text-primary dark:text-primary-300" : "text-slate-400 group-hover:text-ink"
                )}
              />
              {label}
              {active && <ChevronRight className="ml-auto h-3.5 w-3.5 text-primary/60 dark:text-primary-300/60" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="relative overflow-hidden rounded-card bg-brand-gradient p-4 text-white shadow-premium">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          <p className="font-display text-sm font-semibold">Unlock Premium AI</p>
          <p className="mt-1 text-xs text-white/80">
            Get unlimited analyses, resume rewrites & mock interviews.
          </p>
          <button className="mt-3 w-full rounded-xl bg-white/15 py-2 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-white/25">
            Upgrade Now
          </button>
        </div>

           <ProfileFooter />
      </div>
    </aside>
  );
}
