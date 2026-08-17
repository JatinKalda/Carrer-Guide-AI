"use client";

import { useState } from "react";
import { useProfile } from "@/lib/profile-context";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircularScore } from "@/components/charts/circular-score";
import { scoreBreakdown, strengths, weaknesses } from "@/lib/data";
import { Linkedin, Sparkles, CheckCircle2, AlertTriangle, Loader2, UploadCloud, FileText } from "lucide-react";

type Stage = "idle" | "loading" | "done";

const timelineSteps = [
  "Fetching profile data from LinkedIn",
  "Parsing experience & skills from Resume",
  "Evaluating profile headline & summary",
  "Benchmarking against top profiles",
  "Generating custom recommendations",
];

export default function LinkedinAnalysisPage() {
  const { profile, analyzeProfile } = useProfile();
  const [stage, setStage] = useState<Stage>(profile.hasAnalyzed ? "done" : "idle");
  const [url, setUrl] = useState(profile.linkedinUrl || "");
  const [resumeName, setResumeName] = useState(profile.resumeName || "");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
      setError("");
    }
  };

  function analyze() {
    if (!url.trim() && !resumeName.trim()) {
      setError("Please enter your LinkedIn profile link or attach your resume.");
      return;
    }

    setError("");
    setStage("loading");
    setStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setStep(i);
      if (i >= timelineSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setStage("done");
          analyzeProfile({ linkedinUrl: url.trim(), resumeName: resumeName.trim() });
        }, 400);
      }
    }, 650);
  }

  return (
    <>
      <Navbar title="LinkedIn & Resume Analysis" subtitle="Get AI-powered insights about your profile & resume" />
      <main className="space-y-6 p-6 lg:p-10">
        <Card>
          <CardContent className="flex flex-col gap-4 p-6">
            <h3 className="text-sm font-semibold text-ink">Connect Your Profile Credentials</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">LinkedIn Profile URL</label>
                <Input
                  icon={<Linkedin className="h-4 w-4 text-primary" />}
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError("");
                  }}
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted">Attach Resume (PDF/DOCX)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  />
                  <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-border bg-white px-3 text-xs text-muted hover:border-primary/50">
                    <UploadCloud className="h-4 w-4 shrink-0 text-primary" />
                    <span className="truncate text-ink font-medium">
                      {resumeName ? `Attached: ${resumeName}` : "Choose file or drag & drop"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {error && <p className="text-xs font-medium text-danger">{error}</p>}

            <div className="flex justify-end pt-2">
              <Button onClick={analyze} disabled={stage === "loading"} className="w-full md:w-56">
                {stage === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" /> {stage === "done" ? "Re-Analyze Profile" : "Analyze Profile"}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="border-dashed border-border/80 bg-slate-50/50">
                <CardContent className="p-10 text-center">
                  <p className="text-sm text-muted">
                    No data is shown yet. Enter your LinkedIn profile link or attach your resume above and click <strong>Analyze Profile</strong> to generate your score.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardContent className="p-8">
                  <div className="mx-auto max-w-md space-y-5">
                    {timelineSteps.map((s, i) => (
                      <div key={s} className="flex items-center gap-3">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                            i < step
                              ? "bg-success text-white"
                              : i === step
                              ? "bg-primary text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                        </div>
                        <p
                          className={`text-sm ${
                            i <= step ? "text-ink font-medium" : "text-muted"
                          }`}
                        >
                          {s}
                        </p>
                        {i === step && <Loader2 className="ml-auto h-4 w-4 animate-spin text-primary" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                  <CardContent className="flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <p className="text-sm font-medium text-muted">Overall Analysis</p>
                    <CircularScore value={89} size={140} stroke={12} sublabel="Excellent" />
                    <p className="text-xs text-muted">
                      Your profile outperforms 82% of profiles in your field.
                    </p>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="mb-4 font-display font-semibold text-ink">Score Breakdown</h3>
                    <div className="space-y-4">
                      {scoreBreakdown.map((s) => (
                        <div key={s.label}>
                          <div className="mb-1.5 flex items-center justify-between text-sm">
                            <span className="text-ink">{s.label}</span>
                            <span className="font-mono text-xs text-muted">{s.score}/100</span>
                          </div>
                          <Progress value={s.score} tone={s.score >= 85 ? "success" : s.score >= 70 ? "primary" : "danger"} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink">
                      <CheckCircle2 className="h-4 w-4 text-success" /> Strengths
                    </h3>
                    <ul className="space-y-3">
                      {strengths.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-ink">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink">
                      <AlertTriangle className="h-4 w-4 text-danger" /> Areas to Improve
                    </h3>
                    <ul className="space-y-3">
                      {weaknesses.map((w) => (
                        <li key={w} className="flex items-center gap-2 text-sm text-ink">
                          <AlertTriangle className="h-4 w-4 shrink-0 text-danger" /> {w}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
