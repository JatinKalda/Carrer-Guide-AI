import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background bg-grid-fade px-6 text-center [background-size:24px_24px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-premium">
        <Sparkles className="h-7 w-7" />
      </div>
      <h1 className="mt-8 font-display text-7xl font-bold text-gradient">404</h1>
      <p className="mt-3 max-w-sm font-display text-xl font-semibold text-ink">
        This page took a career break.
      </p>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved somewhere else.
      </p>
      <Link href="/" className="mt-8">
        <Button>
          <Home className="h-4 w-4" /> Back to Home
        </Button>
      </Link>
    </div>
  );
}
