"use client";
import { motion } from "framer-motion";
import { Link2, ScanEye, Rocket } from "lucide-react";

const steps = [
  {
    icon: Link2,
    title: "Connect your LinkedIn",
    description: "Paste your profile URL — no manual data entry required.",
  },
  {
    icon: ScanEye,
    title: "Get your AI analysis",
    description: "Receive your career score, strengths, and a tailored action plan in seconds.",
  },
  {
    icon: Rocket,
    title: "Grow with your AI coach",
    description: "Follow your roadmap, apply to matched jobs, and track progress weekly.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">Three steps to a sharper career</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="mt-4 block font-mono text-xs text-muted">STEP {i + 1}</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
