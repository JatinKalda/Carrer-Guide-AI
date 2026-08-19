"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/lib/profile-context";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Linkedin, FileText, Sparkles, UploadCloud, CheckCircle2, Loader2, Lock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const setupSteps = [
  "Fetching LinkedIn profile data",
  "Parsing experience & skills from Resume",
  "Calculating AI Career & Profile Health scores",
  "Matching real-time job openings",
  "Building custom learning roadmap",
];

export function OnboardingSetupCard() {
  const { profile, analyzeProfile } = useProfile();
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl || "");
  const [resumeName, setResumeName] = useState(profile.resumeName || "");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setLinkedinUrl(profile.linkedinUrl || "");
    setResumeName(profile.resumeName || "");
  }, [profile.linkedinUrl, profile.resumeName]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
      setError("");
    }
  };

  const handleAnalyze = () => {
    if (!linkedinUrl.trim() || !resumeName.trim()) {
      setError("Please add both your LinkedIn profile URL and resume before continuing.");
      return;
    }

    setError("");
    setIsAnalyzing(true);
    setStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setStepIndex(current);
      if (current >= setupSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsAnalyzing(false);
          analyzeProfile({
            linkedinUrl: linkedinUrl.trim() || "https://linkedin.com/in/user",
            resumeName: resumeName.trim() || "Uploaded_Resume.pdf",
          });
        }, 500);
      }
    }, 600);
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-white via-primary-50/20 to-purple-50/30 shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md">
            <Sparkles className="h-7 w-7 animate-pulse" />
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Unlock Your AI Career Analysis
          </h2>
          <p className="mt-2 text-sm text-muted md:text-base">
            No demo data is shown until you connect your details. Add your <strong className="text-ink">LinkedIn Profile</strong> and <strong className="text-ink">Resume</strong> to generate real-time AI career scores, skill gap reports, and job matches.
          </p>

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm"
              >
                <h4 className="mb-4 text-sm font-semibold text-ink">Analyzing Your Credentials...</h4>
                <div className="mx-auto max-w-md space-y-3 text-left">
                  {setupSteps.map((step, idx) => (
                    <div key={step} className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          idx < stepIndex
                            ? "bg-success text-white"
                            : idx === stepIndex
                            ? "bg-primary text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {idx < stepIndex ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span className={`text-xs md:text-sm ${idx <= stepIndex ? "font-medium text-ink" : "text-muted"}`}>
                        {step}
                      </span>
                      {idx === stepIndex && <Loader2 className="ml-auto h-4 w-4 animate-spin text-primary" />}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 space-y-5 text-left"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* LinkedIn Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-ink">LinkedIn Profile URL</label>
                    <Input
                      icon={<Linkedin className="h-4 w-4 text-primary" />}
                      value={linkedinUrl}
                      onChange={(e) => {
                        setLinkedinUrl(e.target.value);
                        setError("");
                      }}
                      placeholder="https://linkedin.com/in/your-profile"
                      className="bg-white"
                    />
                  </div>

                  {/* Resume Upload Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-ink">Upload Resume (PDF/DOCX)</label>
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

                <div className="flex flex-col items-center justify-between gap-4 pt-2 md:flex-row">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Lock className="h-3.5 w-3.5 text-primary" /> Your data is private & safe. We analyze only your professional skills.
                  </div>
                  <Button onClick={handleAnalyze} className="w-full md:w-auto">
                    <Sparkles className="h-4 w-4" /> Analyze Profile & Generate Insights
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

