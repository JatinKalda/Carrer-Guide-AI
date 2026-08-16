import Link from "next/link";
import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: ["Features", "Pricing", "AI Coach", "Career Reports"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "API Docs", "Community", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-ink">CareerOS AI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted">
              Your AI career operating system — analyze, close gaps, and grow with confidence.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted hover:text-ink">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-ink">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-8 sm:flex-row">
          <p className="text-xs text-muted">© 2026 CareerOS AI. All rights reserved.</p>
          <Link href="/login" className="text-xs font-medium text-primary hover:underline">
            Sign in to your account →
          </Link>
        </div>
      </div>
    </footer>
  );
}
