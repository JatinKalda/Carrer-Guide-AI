"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthIllustration } from "@/components/marketing/auth-illustration";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="relative flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="absolute left-6 top-6 flex items-center gap-2 lg:left-12 lg:top-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display font-bold text-ink">CareerOS AI</span>
        </div>

        <div className="w-full max-w-md rounded-card border border-border/70 bg-white/80 p-8 shadow-glass backdrop-blur-xl sm:p-10">
          {!sent ? (
            <>
              <h1 className="font-display text-2xl font-bold text-ink">Reset your password</h1>
              <p className="mt-1.5 text-sm text-muted">
                No worries! Enter your email and we&apos;ll send you reset instructions.
              </p>

              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Email address</label>
                  <Input icon={<Mail className="h-4 w-4" />} type="email" placeholder="Enter your email" />
                </div>
                <Button className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-50 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-bold text-ink">Check your inbox</h1>
              <p className="mt-1.5 text-sm text-muted">
                We&apos;ve sent a password reset link to your email address.
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-muted">
            Remember your password?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <AuthIllustration
        headline="Secure, seamless access"
        sub="Your career data stays private and protected — always."
      />
    </div>
  );
}
