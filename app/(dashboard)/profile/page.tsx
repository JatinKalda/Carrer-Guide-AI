"use client";

import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { user, recentActivity } from "@/lib/data";
import { Github, Linkedin, Globe, UploadCloud, Award, Crown } from "lucide-react";

const badges = [
  { label: "Profile Pro", color: "primary" as const },
  { label: "Fast Learner", color: "success" as const },
  { label: "Top 10% Skills", color: "accent" as const },
];

export default function ProfilePage() {
  return (
    <>
      <Navbar title="Profile" subtitle="Manage your personal and professional details" />
      <main className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3 lg:p-10">
        <Card className="h-fit lg:col-span-1">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <Avatar initials={user.avatar} size="lg" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{user.name}</h3>
            <p className="text-sm text-muted">{user.headline}</p>
            <Button variant="secondary" size="sm" className="mt-4">
              Change Photo
            </Button>

            <div className="mt-6 flex w-full flex-wrap justify-center gap-2">
              {badges.map((b) => (
                <Badge key={b.label} tone={b.color}>
                  <Award className="h-3 w-3" /> {b.label}
                </Badge>
              ))}
            </div>

            <div className="mt-6 w-full rounded-2xl bg-brand-gradient p-4 text-left text-white">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-semibold">{user.plan}</span>
              </div>
              <p className="mt-1 text-xs text-white/80">Renews on Aug 12, 2026</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Personal Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input defaultValue={user.name} placeholder="Full name" />
                <Input defaultValue={user.email} placeholder="Email" />
                <Input defaultValue={user.location} placeholder="Location" />
                <Input defaultValue={user.headline} placeholder="Headline" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Connected Profiles</h3>
              <div className="space-y-3">
                <Input icon={<Linkedin className="h-4 w-4" />} defaultValue={user.linkedin} />
                <Input icon={<Github className="h-4 w-4" />} defaultValue={user.github} />
                <Input icon={<Globe className="h-4 w-4" />} defaultValue={user.portfolio} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Resume</h3>
              <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border p-8 text-center">
                <UploadCloud className="h-6 w-6 text-primary" />
                <p className="text-sm text-ink">Drag & drop your resume here</p>
                <p className="text-xs text-muted">PDF, DOCX up to 10MB</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((a) => (
                  <div key={a.id} className="flex items-center gap-3 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="flex-1 text-ink">{a.action}</span>
                    <span className="font-mono text-xs text-muted">{a.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </main>
    </>
  );
}
