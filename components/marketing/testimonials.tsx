"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "CareerOS AI found gaps in my profile I never noticed. Landed 3 interviews within two weeks.",
    name: "Ananya Rao",
    role: "Backend Engineer, Swiggy",
    initials: "AR",
  },
  {
    quote: "The learning roadmap turned a vague goal into a week-by-week plan I actually followed.",
    name: "Marcus Lee",
    role: "Frontend Developer, Shopify",
    initials: "ML",
  },
  {
    quote: "The AI coach feels like having a mentor on call. It remembers everything about my goals.",
    name: "Priya Nair",
    role: "Product Manager, Razorpay",
    initials: "PN",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Loved by professionals</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink">Real growth, real stories</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="card-hover rounded-card border border-border/70 bg-white p-7 shadow-soft"
          >
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <Avatar initials={t.initials} size="sm" />
              <div>
                <p className="text-sm font-medium text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
