"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/lib/profile-context";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Globe, UploadCloud, Award, Crown, CheckCircle2, RotateCcw } from "lucide-react";

const badges = [
  { label: "Profile Pro", color: "primary" as const },
  { label: "Fast Learner", color: "success" as const },
  { label: "Top 10% Skills", color: "accent" as const },
];

export default function ProfilePage() {
  const { profile, analyzeProfile, resetProfile } = useProfile();
  const [linkedin, setLinkedin] = useState(profile.linkedinUrl || "");
  const [resumeName, setResumeName] = useState(profile.resumeName || "");
  const [name, setName] = useState(profile.name || "");
  const [role, setRole] = useState(profile.role || "");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLinkedin(profile.linkedinUrl || "");
    setResumeName(profile.resumeName || "");
    setName(profile.name || "");
    setRole(profile.role || "");
  }, [profile]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
      setError("");
    }
  };

  const handleSave = () => {
    if (!linkedin.trim() || !resumeName.trim()) {
      setError("Please add both your LinkedIn profile URL and resume before saving.");
      return;
    }

    analyzeProfile({
      linkedinUrl: linkedin,
      resumeName,
      name,
      role,
    });
    setError("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const avatarInitials = (name.match(/\b\w/g) || ["U"]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <Navbar title="Profile" subtitle="Manage your personal and professional details" />
      <main className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3 lg:p-10">
        <Card className="h-fit lg:col-span-1">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <Avatar initials={avatarInitials} size="lg" />
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{profile.name}</h3>
            <p className="text-sm text-muted">{profile.headline}</p>

            <div className="mt-4">
              <span className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold ${
                profile.hasAnalyzed ? "bg-success-50 text-success" : "bg-amber-50 text-amber-600"
              }`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                {profile.hasAnalyzed ? "LinkedIn & Resume Connected" : "Pending Profile Setup"}
              </span>
            </div>

            <div className="mt-6 flex w-full flex-wrap justify-center gap-2">
              {badges.map((b) => (
                <Badge key={b.label} tone={b.color}>
                  <Award className="h-3 w-3" /> {b.label}
                </Badge>
              ))}
            </div>

            {profile.hasAnalyzed && (
              <Button variant="secondary" size="sm" onClick={resetProfile} className="mt-6 w-full">
                <RotateCcw className="h-3.5 w-3.5" /> Reset Profile Data
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Personal Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted">Full Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted">Target Role</label>
                  <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Target Role" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Connected Profiles</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted">LinkedIn Profile URL</label>
                  <Input
                    icon={<Linkedin className="h-4 w-4 text-primary" />}
                    value={linkedin}
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                      setError("");
                    }}
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-4 font-display font-semibold text-ink">Resume</h3>
              <div className="relative flex flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-border p-8 text-center">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileUpload}
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                <UploadCloud className="h-6 w-6 text-primary" />
                <p className="text-sm text-ink font-medium">
                  {resumeName ? `Attached: ${resumeName}` : "Drag & drop your resume here"}
                </p>
                <p className="text-xs text-muted">PDF, DOCX up to 10MB</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="rounded-xl bg-danger-50 p-3 text-center text-xs font-medium text-danger">{error}</div>
          )}

          {savedSuccess && (
            <div className="rounded-xl bg-success-50 p-3 text-center text-xs font-medium text-success">
              Profile updated and shared across all sections.
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save & Analyze Profile</Button>
          </div>
        </div>
      </main>
    </>
  );
}

