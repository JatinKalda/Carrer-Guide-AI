"use client";

import { useProfile } from "@/lib/profile-context";
import { Navbar } from "@/components/layout/navbar";
import { OnboardingSetupCard } from "@/components/dashboard/onboarding-card";
import { Card, CardContent } from "@/components/ui/card";
import { CircularScore } from "@/components/charts/circular-score";
import { CareerProgressChart } from "@/components/charts/career-progress-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { SkillDistributionChart } from "@/components/charts/skill-distribution-chart";
import { Button } from "@/components/ui/button";
import {
  careerScores,
  aiSuggestions,
  recentActivity,
} from "@/lib/data";
import {
  Sparkles,
  FolderKanban,
  BadgeCheck,
  Activity,
  ScanSearch,
  FileText,
  Briefcase,
  MessageSquareText,
  ArrowUpRight,
  Lock,
  RotateCcw,
  } from "lucide-react";
import { motion } from "framer-motion";

const iconMap = { Sparkles, FolderKanban, BadgeCheck, Activity };

const quickActions = [
  { label: "Analyze Profile", icon: ScanSearch, href: "/linkedin-analysis" },
  { label: "Generate Resume", icon: FileText, href: "/career-report" },
  { label: "Find Jobs", icon: Briefcase, href: "/job-matches" },
  { label: "Practice Interview", icon: MessageSquareText, href: "/ai-coach" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function DashboardPage() {
  const { profile, resetProfile } = useProfile();
  const firstName = profile.name.split(" ")[0] || "User";

  return (
    <>
      <Navbar
        title={`Welcome, ${firstName}! 👋`}
        subtitle={
          profile.hasAnalyzed
            ? "Track your career progress and unlock your full potential"
            : "Connect your LinkedIn & Resume to unlock your AI Career Score"
        }
      />

      <main className="space-y-6 p-6 lg:p-10">
        {!profile.hasAnalyzed ? (
          <>
            <OnboardingSetupCard />

            <div className="rounded-2xl border border-dashed border-border/80 bg-slate-50/50 p-6 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-ink">Dashboard Features Locked</h3>
              <p className="mt-1 text-xs text-muted max-w-md mx-auto">
                Real-time career progress analytics, AI suggestions, and job match recommendations will display here once your profile is analyzed.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Status bar */}
            <div className="flex flex-col gap-3 rounded-2xl bg-primary-50/70 p-4 border border-primary/20 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-ink">Profile Analyzed & Connected</p>
                  <p className="text-[11px] text-muted">
                    LinkedIn: <span className="font-medium text-ink">{profile.linkedinUrl}</span> | Resume: <span className="font-medium text-ink">{profile.resumeName}</span>
                  </p>
                </div>
              </div>
              <Button size="sm" variant="secondary" onClick={resetProfile} className="self-start md:self-auto">
                <RotateCcw className="h-3.5 w-3.5" /> Re-enter Info
              </Button>
            </div>

            {/* Score row */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { label: "AI Career Score", value: profile.careerScores.aiCareerScore, sub: "AI score", color: "#5B5FEF" },
                { label: "Profile Health", value: profile.careerScores.profileHealth, sub: "Health", color: "#10B981" },
                { label: "Job Match Score", value: profile.careerScores.jobMatch, sub: "Match", color: "#7C3AED" },
                { label: "Activity Score", value: profile.careerScores.activityScore, sub: "Activity", color: "#F59E0B" },
              ].map((s, i) => (
                <motion.div key={s.label} custom={i} initial="hidden" animate="show" variants={fadeUp}>
                  <Card className="card-hover p-5">
                    <p className="text-xs font-medium text-muted">{s.label}</p>
                    <div className="mt-2 flex items-center justify-center">
                      <CircularScore value={s.value} size={92} color={s.color} sublabel={s.sub} />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* AI Suggestions */}
              <Card className="xl:col-span-1">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-ink">AI Suggestions</h3>
                    <Badge />
                  </div>
                  <div className="space-y-3">
                    {aiSuggestions.map((s, i) => {
                      const Icon = iconMap[s.icon as keyof typeof iconMap];
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 rounded-2xl border border-border/70 p-3.5 transition-colors hover:bg-slate-50"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-ink">{s.title}</p>
                            <p className="text-xs text-muted">{s.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center gap-1 text-xs font-medium text-primary hover:underline">
                    View all suggestions <ArrowUpRight className="h-3 w-3" />
                  </button>
                </CardContent>
              </Card>

              {/* Charts */}
              <Card className="xl:col-span-2">
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-ink">Career Progress</h3>
                    <span className="text-xs text-muted">This Month</span>
                  </div>
                  <CareerProgressChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-display font-semibold text-ink">Weekly Activity</h3>
                  <WeeklyActivityChart />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-display font-semibold text-ink">Skill Distribution</h3>
                  <SkillDistributionChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* Recent activity */}
              <Card className="xl:col-span-2">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-display font-semibold text-ink">Recent Activity</h3>
                  <div className="space-y-4">
                    {profile.recentActivity.map((a) => (
                      <div key={a.id} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <p className="flex-1 text-sm text-ink">{a.action}</p>
                        <span className="shrink-0 font-mono text-xs text-muted">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-display font-semibold text-ink">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        className="card-hover flex flex-col items-center gap-2 rounded-2xl border border-border/70 p-4 text-center"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
                          <a.icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-medium text-ink">{a.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </>
  );
}

function Badge() {
  return (
    <span className="flex items-center gap-1 rounded-pill bg-success-50 px-2.5 py-1 text-[11px] font-medium text-success">
      <Sparkles className="h-3 w-3" /> Live
    </span>
  );
}
