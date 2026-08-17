"use client";

import { useProfile } from "@/lib/profile-context";
import { OnboardingSetupCard } from "@/components/dashboard/onboarding-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EmptyFeatureStateProps {
  title: string;
  description: string;
}

export function EmptyFeatureState({ title, description }: EmptyFeatureStateProps) {
  const { profile } = useProfile();

  if (profile.hasAnalyzed) {
    return null;
  }

  return (
    <div className="space-y-6">
      <OnboardingSetupCard />

      <Card className="border-dashed border-border/80 bg-slate-50/50">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200/60 text-slate-500">
            <Lock className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">{title} Locked</h3>
          <p className="mt-1 max-w-md text-sm text-muted">
            {description}. Complete the profile analysis form above to generate your customized insights.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
