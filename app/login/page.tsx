"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthIllustration } from "@/components/marketing/auth-illustration";
import { Mail, Lock, Sparkles, Eye, EyeOff, Loader2, Info } from "lucide-react";
import { DEMO_EMAIL, DEMO_PASSWORD, setSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    setLoading(true);

    // If using demo email or custom credentials, infer display name
    let userName = "John Doe";
    if (email.trim().toLowerCase() !== DEMO_EMAIL) {
      const namePart = email.split("@")[0] || "User";
      userName = namePart
        .split(/[\._-]/)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
    }

    setSession(userName, email);

    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  }

  function handleSocialLogin(provider: "Google" | "GitHub") {
    setError("");
    setSocialLoading(provider);
    setSession(`${provider} User`, `user@${provider.toLowerCase()}.com`);

    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  }

  return (
    <div className="flex min-h-screen bg-background">
      <div className="relative flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="absolute left-6 top-6 flex items-center gap-2 lg:left-12 lg:top-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-gradient text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-display font-bold text-ink">CareerOS AI</span>
        </div>

        <div className="w-full max-w-md rounded-card border border-border/70 bg-card/90 p-8 shadow-glass backdrop-blur-xl sm:p-10">
          <h1 className="font-display text-2xl font-bold text-ink">Welcome back!</h1>
          <p className="mt-1.5 text-sm text-muted">Glad to see you again. Please sign in to continue.</p>

          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-primary-50 dark:bg-primary/20 p-3.5 text-xs text-primary-700 dark:text-primary-300">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Quick sign-in pre-filled below, or log in with any email / Google account. Demo credentials:{" "}
              <code className="font-mono font-semibold">{DEMO_EMAIL}</code> / <code className="font-mono font-semibold">{DEMO_PASSWORD}</code>
            </span>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Email address</label>
              <Input
                icon={<Mail className="h-4 w-4" />}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-ink">Password</label>
                <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  icon={<Lock className="h-4 w-4" />}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-danger-50 dark:bg-danger/20 px-3.5 py-2.5 text-xs font-medium text-danger">{error}</p>
            )}

            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" className="h-4 w-4 rounded accent-primary" defaultChecked /> Remember me
            </label>

            <Button className="w-full" size="lg" type="submit" disabled={loading || !!socialLoading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
                </>
              ) : (
                <>Sign In →</>
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("Google")}
              disabled={loading || !!socialLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card py-3 text-sm font-medium text-ink shadow-soft transition-all hover:border-primary-300 hover:bg-subtle disabled:opacity-50"
            >
              {socialLoading === "Google" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin("GitHub")}
              disabled={loading || !!socialLoading}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-card py-3 text-sm font-medium text-ink shadow-soft transition-all hover:border-primary-300 hover:bg-subtle disabled:opacity-50"
            >
              {socialLoading === "GitHub" ? (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ) : (
                <svg className="h-4 w-4 fill-current text-ink" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              )}
              <span>Continue with GitHub</span>
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <AuthIllustration
        headline="Your career, powered by AI"
        sub="Join 15,000+ professionals accelerating their careers with CareerOS AI."
      />
    </div>
  );
}
