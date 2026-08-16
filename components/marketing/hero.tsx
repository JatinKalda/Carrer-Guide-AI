"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CircularScore } from "@/components/charts/circular-score";
import { CareerProgressChart } from "@/components/charts/career-progress-chart";
import { PlayCircle, Sparkles, TrendingUp, Briefcase } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 lg:pb-32 lg:pt-24">
      <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-blob-gradient animate-blob" />
      <div className="absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-blob-gradient animate-blob [animation-delay:3s]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-pill border border-primary-100 bg-primary-50 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary-700">AI-Powered Career Intelligence</span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.08] tracking-tight text-ink lg:text-6xl">
            Your AI Career
            <br />
            <span className="text-gradient">Operating System</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Analyze your profile, find perfect-fit job matches, close skill gaps, and
            accelerate your career growth with the power of AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg">
              <Sparkles className="h-4 w-4" /> Analyze My Profile
            </Button>
            <Button size="lg" variant="secondary">
              <PlayCircle className="h-4 w-4" /> Watch Demo
            </Button>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
              Trusted by 15,000+ professionals worldwide
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 opacity-70 grayscale">
              {["Google", "Microsoft", "Amazon", "Meta", "Stripe"].map((c) => (
                <span key={c} className="font-display text-lg font-bold text-ink">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="rounded-card border border-border/70 bg-white/90 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">AI Career Score</p>
                <p className="font-display font-semibold text-ink">Overview</p>
              </div>
              <CircularScore value={87} size={64} stroke={7} />
            </div>
            <CareerProgressChart />
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-10 top-6 hidden w-48 rounded-2xl border border-border/70 bg-white p-4 shadow-glow sm:block"
          >
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-semibold">Job Match</span>
            </div>
            <p className="mt-1 font-mono text-2xl font-bold text-ink">94%</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -right-6 hidden w-52 rounded-2xl border border-border/70 bg-white p-4 shadow-glow sm:block"
          >
            <div className="flex items-center gap-2 text-primary">
              <Briefcase className="h-4 w-4" />
              <span className="text-xs font-semibold">New matches</span>
            </div>
            <p className="mt-1 text-xs text-muted">3 roles at Google, Stripe & Vercel</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
