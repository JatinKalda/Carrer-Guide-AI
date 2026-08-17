"use client";

import { useProfile } from "@/lib/profile-context";
import { EmptyFeatureState } from "@/components/dashboard/empty-feature-state";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { CareerProgressChart } from "@/components/charts/career-progress-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { SkillDistributionChart } from "@/components/charts/skill-distribution-chart";
import { analyticsSummary } from "@/lib/data";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { profile } = useProfile();

  return (
    <>
      <Navbar title="Analytics" subtitle="Deep insights into your career growth" />
      <main className="space-y-6 p-6 lg:p-10">
        {!profile.hasAnalyzed ? (
          <EmptyFeatureState
            title="Career Analytics"
            description="Growth trends, profile visits, and application metrics require analyzing your credentials"
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {analyticsSummary.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="card-hover p-4">
                    <p className="text-xs text-muted">{s.label}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <span className="font-mono text-xl font-bold text-ink">{s.value}</span>
                      {s.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-danger" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardContent className="p-6">
                  <h3 className="mb-2 font-display font-semibold text-ink">Career Growth Over Time</h3>
                  <CareerProgressChart />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-display font-semibold text-ink">Skill Progress</h3>
                  <SkillDistributionChart />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-display font-semibold text-ink">Applications vs Interviews</h3>
                <WeeklyActivityChart />
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </>
  );
}
