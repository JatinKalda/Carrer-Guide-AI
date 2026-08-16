"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Github, Linkedin, Key, CreditCard, Bell, Shield, Palette, Trash2 } from "lucide-react";
import { useTheme, Theme } from "@/components/layout/theme-provider";

const tabs = ["Profile", "Account", "Notifications", "Privacy", "Appearance", "API Keys"];

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative h-6 w-11 rounded-pill transition-colors duration-200 ${on ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState("Account");
  const { theme, setTheme } = useTheme();

  const themeOptions: { label: string; value: Theme }[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
  ];

  return (
    <>
      <Navbar title="Settings" subtitle="Manage your account and preferences" />
      <main className="space-y-6 p-6 lg:p-10">
        <Card>
          <CardContent className="overflow-x-auto p-4">
            <Tabs tabs={tabs} defaultTab={active} onChange={setActive} />
          </CardContent>
        </Card>

        {(active === "Profile" || active === "Account") && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Account Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input placeholder="Full name" defaultValue="John Doe" />
                <Input placeholder="Email" defaultValue="john.doe@email.com" />
                <Input placeholder="Password" type="password" defaultValue="••••••••" />
                <Input placeholder="Phone number" defaultValue="+91 90000 00000" />
              </div>
              <div className="mt-5 rounded-2xl border border-danger/20 bg-danger-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-medium text-danger">
                      <Trash2 className="h-4 w-4" /> Delete Account
                    </p>
                    <p className="text-xs text-danger/80">This permanently removes all your data.</p>
                  </div>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {active === "Notifications" && (
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="mb-2 flex items-center gap-2 font-display font-semibold text-ink">
                <Bell className="h-4 w-4" /> Notification Preferences
              </h3>
              {["Weekly career report", "New job matches", "Skill gap alerts", "AI coach follow-ups", "Product updates"].map(
                (n, i) => (
                  <div key={n} className="flex items-center justify-between border-b border-border/60 py-3 last:border-0">
                    <span className="text-sm text-ink">{n}</span>
                    <Toggle defaultOn={i < 3} />
                  </div>
                )
              )}
            </CardContent>
          </Card>
        )}

        {active === "Privacy" && (
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="mb-2 flex items-center gap-2 font-display font-semibold text-ink">
                <Shield className="h-4 w-4" /> Privacy Controls
              </h3>
              {["Make profile visible to recruiters", "Allow AI to analyze external data", "Share anonymized data for benchmarks"].map(
                (n, i) => (
                  <div key={n} className="flex items-center justify-between border-b border-border/60 py-3 last:border-0">
                    <span className="text-sm text-ink">{n}</span>
                    <Toggle defaultOn={i !== 2} />
                  </div>
                )
              )}
            </CardContent>
          </Card>
        )}

        {active === "Appearance" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink">
                <Palette className="h-4 w-4" /> Theme
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {themeOptions.map((item) => {
                  const isActive = theme === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => setTheme(item.value)}
                      className={`rounded-2xl border-2 p-4 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-primary bg-primary-50 text-primary dark:bg-primary/20"
                          : "border-border text-muted hover:border-primary-200 hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {active === "API Keys" && (
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink">
                <Key className="h-4 w-4" /> API Keys
              </h3>
              <div className="flex items-center gap-3 rounded-2xl border border-border/70 p-4">
                <code className="flex-1 truncate font-mono text-sm text-muted">sk-live-••••••••••••8f2a</code>
                <Button size="sm" variant="secondary">
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-display font-semibold text-ink">
              <CreditCard className="h-4 w-4" /> Connected Accounts & Billing
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center justify-between rounded-2xl border border-border/70 p-4">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </span>
                <span className="text-xs font-medium text-success">Connected</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-border/70 p-4">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <Github className="h-4 w-4" /> GitHub
                </span>
                <span className="text-xs font-medium text-success">Connected</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
