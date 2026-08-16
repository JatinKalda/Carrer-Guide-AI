"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Target } from "lucide-react";

export function AuthIllustration({
  headline,
  sub,
}: {
  headline: string;
  sub: string;
}) {
  return (
    <div className="relative hidden h-full flex-1 items-center justify-center overflow-hidden bg-ink lg:flex">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/40 blur-[100px] animate-blob" />
      <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-accent/40 blur-[100px] animate-blob [animation-delay:2s]" />
      <div className="absolute inset-0 bg-grid-fade opacity-10 [background-size:28px_28px]" />

      <div className="relative z-10 flex flex-col items-center px-12 text-center">
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="glass-dark mb-10 w-full max-w-sm rounded-card border border-white/10 p-6 text-left shadow-glow"
        >
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-4 w-4 text-primary-300" />
            <span className="text-sm font-medium">AI Career Score</span>
          </div>
          <p className="mt-3 font-mono text-4xl font-bold text-white">87<span className="text-lg text-white/50">/100</span></p>
          <div className="mt-4 flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-success" /> +12 this month</span>
            <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5 text-primary-300" /> 3 goals on track</span>
          </div>
        </motion.div>

        <h2 className="max-w-sm font-display text-2xl font-bold text-white">{headline}</h2>
        <p className="mt-3 max-w-xs text-sm text-white/60">{sub}</p>
      </div>
    </div>
  );
}
