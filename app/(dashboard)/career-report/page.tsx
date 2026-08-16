"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { CircularScore } from "@/components/charts/circular-score";
import { Progress } from "@/components/ui/progress";
import { Download, Share2, Sparkles } from "lucide-react";

const tabs = ["Summary", "Strengths", "Weaknesses", "Opportunities", "Action Plan"];

const detailedFeedback = [
  { area: "Headline", note: "Your headline is clear but could be more impactful and keyword-rich.", score: 85 },
  { area: "About", note: "Good section but better formatted with quantifiable achievements.", score: 90 },
  { area: "Experience", note: "Well-structured experience with good detail on impact.", score: 92 },
  { area: "Skills", note: "Skills list is solid but missing several in-demand technologies.", score: 88 },
  { area: "Projects", note: "Add more projects to better showcase your hands-on work.", score: 70 },
];

const opportunities = [
  "Publish a case study on your most impactful project.",
  "Request 2-3 fresh recommendations from recent managers.",
  "Contribute to an open-source project in your primary stack.",
  "Speak or write about a system-design topic you know well.",
];

const actionPlan = [
  { step: "Rewrite headline with role + specialization + impact metric", done: true },
  { step: "Add 2 new projects with measurable outcomes", done: true },
  { step: "Earn an AWS or cloud certification", done: false },
  { step: "Get 3 new recommendations from peers/managers", done: false },
  { step: "Publish one technical article per month", done: false },
];

export default function CareerReportPage() {
  const [active, setActive] = useState("Summary");

  return (
    <>
      <Navbar title="Career Report" subtitle="Detailed AI-generated report of your profile" />
      <main className="p-6 lg:p-10">
        <Card className="mb-6">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <Tabs tabs={tabs} defaultTab={active} onChange={setActive} />
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                <Share2 className="h-4 w-4" /> Share Report
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {active === "Summary" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent className="p-8">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Executive Summary</span>
                </div>
                <p className="text-[15px] leading-relaxed text-ink">
                  You have strong skills and relevant work experience. Your profile represents a solid
                  combination of technical expertise and practical accomplishments. With a few targeted
                  optimizations — a sharper headline, two additional shipped projects, and a handful of
                  fresh recommendations — you can meaningfully increase visibility and recruiter interest
                  over the next quarter.
                </p>
                <div className="mt-6 space-y-4">
                  <h4 className="font-display font-semibold text-ink">Detailed Feedback</h4>
                  {detailedFeedback.map((d) => (
                    <div key={d.area} className="rounded-2xl border border-border/70 p-4">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-medium text-ink">{d.area}</span>
                        <span className="font-mono text-xs text-muted">{d.score}/100</span>
                      </div>
                      <p className="mb-2 text-sm text-muted">{d.note}</p>
                      <Progress value={d.score} tone={d.score >= 85 ? "success" : "primary"} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit">
              <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
                <CircularScore value={87} size={140} stroke={12} sublabel="Excellent" />
                <p className="text-sm text-muted">
                  Your overall career score improved <span className="text-success font-medium">+12 pts</span> this month.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {active === "Strengths" && (
          <Card>
            <CardContent className="grid gap-3 p-8 sm:grid-cols-2">
              {["Strong technical foundation", "Consistent career progression", "Diverse project portfolio", "Positive peer recommendations"].map((s) => (
                <div key={s} className="flex items-center gap-2 rounded-2xl bg-success-50 p-4 text-sm font-medium text-success">
                  {s}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {active === "Weaknesses" && (
          <Card>
            <CardContent className="grid gap-3 p-8 sm:grid-cols-2">
              {["Limited leadership experience shown", "Few certifications listed", "Inconsistent posting activity", "Missing quantifiable results"].map((w) => (
                <div key={w} className="flex items-center gap-2 rounded-2xl bg-danger-50 p-4 text-sm font-medium text-danger">
                  {w}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {active === "Opportunities" && (
          <Card>
            <CardContent className="space-y-3 p-8">
              {opportunities.map((o) => (
                <div key={o} className="flex items-start gap-3 rounded-2xl border border-border/70 p-4">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-ink">{o}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {active === "Action Plan" && (
          <Card>
            <CardContent className="space-y-3 p-8">
              {actionPlan.map((a) => (
                <label key={a.step} className="flex items-center gap-3 rounded-2xl border border-border/70 p-4">
                  <input type="checkbox" defaultChecked={a.done} className="h-4 w-4 accent-primary" />
                  <span className={`text-sm ${a.done ? "text-muted line-through" : "text-ink"}`}>{a.step}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
}
