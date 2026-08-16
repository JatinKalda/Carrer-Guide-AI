"use client";
import { motion } from "framer-motion";
import { ScanSearch, Briefcase, Target, Map, Bot, FileText } from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "AI Career Analysis",
    description: "Deep insights into your profile, strengths, and blind spots — in seconds.",
  },
  {
    icon: Briefcase,
    title: "Smart Job Matching",
    description: "Find jobs that match your skills and goals, ranked by AI match score.",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description: "Discover exactly what's missing between you and your dream role.",
  },
  {
    icon: Map,
    title: "Learning Roadmap",
    description: "A personalized, week-by-week plan to close your skill gaps fast.",
  },
  {
    icon: Bot,
    title: "AI Career Coach",
    description: "A 24/7 assistant that remembers your goals and guides every decision.",
  },
  {
    icon: FileText,
    title: "Career Reports",
    description: "Recruiter-ready reports with branding, ATS, and keyword suggestions.",
  },
];

export function FeatureCards() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Everything you need</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink">One platform for your entire career</h2>
        <p className="mt-4 text-muted">
          From your first LinkedIn scan to your next offer letter — CareerOS AI covers the full journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card-hover rounded-card border border-border/70 bg-white p-7 shadow-soft"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-premium">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
