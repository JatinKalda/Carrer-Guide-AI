"use client";

import { useProfile } from "@/lib/profile-context";
import { EmptyFeatureState } from "@/components/dashboard/empty-feature-state";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { roadmap } from "@/lib/data";
import { Download, Sparkles, CheckCircle2 } from "lucide-react";

export default function LearningRoadmapPage() {
  const { profile } = useProfile();
  const overall = Math.round(roadmap.reduce((a, r) => a + r.progress, 0) / roadmap.length);

  return (
    <>
      <Navbar title="Learning Roadmap" subtitle="Personalized roadmap to achieve your goals" />
      <main className="space-y-6 p-6 lg:p-10">
        {!profile.hasAnalyzed ? (
          <EmptyFeatureState
            title="Learning Roadmap"
            description="Your custom 8-week learning roadmap requires your LinkedIn profile and Resume analysis"
          />
        ) : (
          <>
            <Card>
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-ink">AI Generated Plan</p>
                    <p className="text-xs text-muted">Overall completion: {overall}%</p>
                  </div>
                </div>
                <Button size="sm">
                  <Download className="h-4 w-4" /> Download Roadmap
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Progress value={overall} className="h-3" />
                </div>

                <div className="relative space-y-8 pl-8">
                  <div className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />
                  {roadmap.map((r, i) => (
                    <div key={r.week} className="relative">
                      <div
                        className={`absolute -left-8 flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                          r.progress === 100
                            ? "bg-success text-white"
                            : r.progress > 0
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {r.progress === 100 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                      </div>
                      <div className="rounded-2xl border border-border/70 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-primary">{r.week}</p>
                            <p className="font-display font-semibold text-ink">{r.title}</p>
                          </div>
                          <span className="font-mono text-sm text-muted">{r.progress}%</span>
                        </div>
                        <p className="mt-2 text-sm text-muted">{r.description}</p>
                        <div className="mt-3">
                          <Progress value={r.progress} tone={r.progress === 100 ? "success" : "primary"} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </>
  );
}
