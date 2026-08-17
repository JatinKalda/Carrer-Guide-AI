"use client";

import { useProfile } from "@/lib/profile-context";
import { EmptyFeatureState } from "@/components/dashboard/empty-feature-state";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { SkillRadarChart } from "@/components/charts/skill-radar-chart";
import { skillRadar, skillPriorities } from "@/lib/data";
import { Clock, GraduationCap, Award } from "lucide-react";

const courses = [
  { title: "Docker & Kubernetes Essentials", provider: "Coursera", hours: "12h" },
  { title: "System Design Interview Prep", provider: "Educative", hours: "20h" },
  { title: "AWS Solutions Architect", provider: "A Cloud Guru", hours: "35h" },
];

export default function SkillGapPage() {
  const { profile } = useProfile();

  return (
    <>
      <Navbar title="Skill Gap Analysis" subtitle="Compare your skills with industry demands" />
      <main className="space-y-6 p-6 lg:p-10">
        {!profile.hasAnalyzed ? (
          <EmptyFeatureState
            title="Skill Gap Analysis"
            description="Detailed skill gap comparison requires analyzing your resume and LinkedIn profile"
          />
        ) : (
          <>
            <Card>
              <CardContent className="p-6">
                <Tabs tabs={["Overview", "Technical Skills", "Soft Skills", "In-Demand Skills"]} />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-1 font-display font-semibold text-ink">Current vs Target Skills</h3>
                  <p className="mb-2 text-xs text-muted">Where you stand against your target role</p>
                  <SkillRadarChart />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 font-display font-semibold text-ink">Skill Breakdown</h3>
                  <div className="space-y-4">
                    {skillRadar.map((s) => (
                      <div key={s.skill}>
                        <div className="mb-1.5 flex items-center justify-between text-sm">
                          <span className="text-ink">{s.skill}</span>
                          <span className="font-mono text-xs text-muted">
                            {s.current}/{s.target}
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={s.current} tone={s.current >= 70 ? "success" : s.current >= 45 ? "primary" : "danger"} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-display font-semibold text-ink">Top Skills to Improve</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {skillPriorities.map((s) => (
                    <div key={s.skill} className="flex items-center justify-between rounded-2xl border border-border/70 p-4">
                      <div>
                        <p className="text-sm font-medium text-ink">{s.skill}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                          <Clock className="h-3.5 w-3.5" /> Est. {s.time}
                        </p>
                      </div>
                      <Badge tone={s.priority === "High Impact" ? "danger" : "accent"}>{s.priority}</Badge>
                    </div>
                  ))}
                </div>
                <p className="mt-4 rounded-2xl bg-primary-50 p-4 text-sm text-primary-700">
                  Focus on these skills to increase your market value.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink">
                  <GraduationCap className="h-4 w-4 text-primary" /> Recommended Courses & Certificates
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {courses.map((c) => (
                    <div key={c.title} className="card-hover rounded-2xl border border-border/70 p-4">
                      <Award className="mb-3 h-5 w-5 text-accent" />
                      <p className="text-sm font-medium text-ink">{c.title}</p>
                      <p className="mt-1 text-xs text-muted">{c.provider} · {c.hours}</p>
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
