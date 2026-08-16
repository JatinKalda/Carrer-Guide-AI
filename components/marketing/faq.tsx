"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does CareerOS AI analyze my LinkedIn profile?",
    a: "You paste your public profile URL and our AI evaluates your headline, summary, experience, skills, and projects against thousands of high-performing profiles in your field.",
  },
  {
    q: "Is my data kept private?",
    a: "Yes. Your profile data is encrypted and never shared with third parties or recruiters without your explicit permission.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely — you can upgrade, downgrade, or cancel from your billing settings at any time, no questions asked.",
  },
  {
    q: "Does the AI coach remember previous conversations?",
    a: "Yes. Career Memory keeps track of your goals and past conversations so guidance builds on what you've already discussed.",
  },
  {
    q: "Which job boards do job matches come from?",
    a: "We aggregate roles from major job boards and company career pages, then rank them using your skills, experience, and preferences.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-bold text-ink">Frequently asked questions</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-border/70 bg-white">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium text-ink">{f.q}</span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted transition-transform", open === i && "rotate-180")} />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
              )}
            >
              <div className="min-h-0 px-5 text-sm leading-relaxed text-muted">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
