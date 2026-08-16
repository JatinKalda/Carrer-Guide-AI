"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get your first AI career analysis",
    features: ["1 LinkedIn analysis / month", "Basic career score", "Job match previews", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "/month",
    description: "For professionals actively growing",
    features: [
      "Unlimited AI analyses",
      "Full skill gap & roadmap",
      "AI career coach access",
      "Downloadable career reports",
      "Priority job matching",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Teams",
    price: "$49",
    period: "/user/mo",
    description: "For career centers & organizations",
    features: ["Everything in Premium", "Team analytics dashboard", "Dedicated success manager", "SSO & admin controls"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted">Start free. Upgrade when you&apos;re ready to accelerate.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "relative rounded-card p-8",
                p.highlighted
                  ? "bg-ink text-white shadow-glow lg:-translate-y-4"
                  : "border border-border/70 bg-card shadow-soft"
              )}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className={cn("font-display text-lg font-semibold", p.highlighted ? "text-white" : "text-ink")}>
                {p.name}
              </h3>
              <p className={cn("mt-1 text-sm", p.highlighted ? "text-white/60" : "text-muted")}>{p.description}</p>
              <div className="mt-5 flex items-end gap-1">
                <span className="font-mono text-4xl font-bold">{p.price}</span>
                <span className={cn("mb-1 text-sm", p.highlighted ? "text-white/60" : "text-muted")}>{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={cn("h-4 w-4 shrink-0", p.highlighted ? "text-success" : "text-success")} />
                    <span className={p.highlighted ? "text-white/85" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={p.highlighted ? "secondary" : "primary"}
                className={cn("mt-8 w-full", p.highlighted && "bg-white text-slate-900 hover:bg-slate-100")}
              >
                {p.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
