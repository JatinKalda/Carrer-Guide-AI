"use client";

import { useState } from "react";
import { useProfile } from "@/lib/profile-context";
import { EmptyFeatureState } from "@/components/dashboard/empty-feature-state";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { jobs } from "@/lib/data";
import { Search, MapPin, Wallet, Bookmark, Sparkles, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const filters = ["Job Type", "Location", "Experience", "More Filters"];

export default function JobMatchesPage() {
  const { profile } = useProfile();
  const [saved, setSaved] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <Navbar title="Job Matches" subtitle="Jobs that match your profile" />
      <main className="space-y-6 p-6 lg:p-10">
        {!profile.hasAnalyzed ? (
          <EmptyFeatureState
            title="Job Matches"
            description="Personalized job matches require your LinkedIn profile and Resume to match your skills against active roles"
          />
        ) : (
          <>
            <Card>
              <CardContent className="flex flex-col gap-3 p-5 md:flex-row md:items-center">
                <div className="flex-1">
                  <Input icon={<Search className="h-4 w-4" />} placeholder="Search companies, roles..." />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <button
                      key={f}
                      className="flex items-center gap-1.5 rounded-2xl border border-border bg-white px-3.5 py-2 text-xs font-medium text-muted transition-colors hover:border-primary-200 hover:text-ink"
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" /> {f}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              {jobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Card className="card-hover">
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white"
                          style={{ background: job.logoColor }}
                        >
                          {job.logo}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display font-semibold text-ink">{job.role}</h3>
                            <Badge tone="primary">{job.company}</Badge>
                            {job.remote && <Badge tone="success">Remote</Badge>}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" /> {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Wallet className="h-3.5 w-3.5" /> {job.salary}
                            </span>
                            <span>{job.posted}</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {job.skills.map((s) => (
                              <span key={s} className="rounded-pill bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-muted">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex shrink-0 flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="font-mono text-2xl font-bold text-primary">{job.match}%</p>
                            <p className="text-[11px] text-muted">AI Match</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                setSaved((s) => (s.includes(job.id) ? s.filter((id) => id !== job.id) : [...s, job.id]))
                              }
                              className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-colors ${
                                saved.includes(job.id)
                                  ? "border-primary bg-primary-50 text-primary"
                                  : "border-border text-muted hover:text-ink"
                              }`}
                            >
                              <Bookmark className="h-4 w-4" fill={saved.includes(job.id) ? "currentColor" : "none"} />
                            </button>
                            <Button size="sm">Apply</Button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                        className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        {expanded === job.id ? "Hide AI explanation" : "Why this match?"}
                      </button>

                      {expanded === job.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 rounded-2xl bg-primary-50 p-4 text-sm text-primary-700"
                        >
                          Your experience with {job.skills[0]} and recent activity strongly align with this
                          role&apos;s core requirements. Candidates with a similar profile shape were shortlisted
                          68% of the time at {job.company}.
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
