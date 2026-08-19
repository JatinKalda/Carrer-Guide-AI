"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { user as initialUser } from "./data";

type CareerScores = {
  aiCareerScore: number;
  profileHealth: number;
  jobMatch: number;
  activityScore: number;
};

export interface ProfileData {
  hasAnalyzed: boolean;
  linkedinUrl: string;
  resumeName: string;
  name: string;
  email: string;
  headline: string;
  location: string;
  role: string;
  careerScores: CareerScores;
  recentActivity: { id: number; action: string; time: string }[];
}

interface ProfileContextType {
  profile: ProfileData;
  analyzeProfile: (data: { linkedinUrl?: string; resumeName?: string; name?: string; role?: string }) => Promise<void>;
  resetProfile: () => void;
}

const defaultProfile: ProfileData = {
  hasAnalyzed: false,
  linkedinUrl: "",
  resumeName: "",
  name: "New Candidate",
  email: "candidate@email.com",
  headline: "Aspiring Professional",
  location: "Not Specified",
  role: "Software Professional",
  careerScores: {
    aiCareerScore: 0,
    profileHealth: 0,
    jobMatch: 0,
    activityScore: 0,
  },
  recentActivity: [],
};

function hasCompleteScores(scores: unknown): scores is CareerScores {
  if (!scores || typeof scores !== "object") {
    return false;
  }

  const candidate = scores as Partial<CareerScores>;
  return (
    typeof candidate.aiCareerScore === "number" &&
    typeof candidate.profileHealth === "number" &&
    typeof candidate.jobMatch === "number" &&
    typeof candidate.activityScore === "number"
  );
}

function normalizeProfile(value: unknown): ProfileData {
  if (!value || typeof value !== "object") {
    return defaultProfile;
  }

  const saved = value as Partial<ProfileData>;
  const hasAnalyzed = Boolean(
    saved.hasAnalyzed &&
      saved.linkedinUrl?.trim() &&
      saved.resumeName?.trim() &&
      hasCompleteScores(saved.careerScores)
  );

  return {
    ...defaultProfile,
    ...saved,
    hasAnalyzed,
    careerScores: hasCompleteScores(saved.careerScores) ? saved.careerScores : defaultProfile.careerScores,
    recentActivity: Array.isArray(saved.recentActivity) ? saved.recentActivity : defaultProfile.recentActivity,
  };
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = "careeros_user_profile_v1";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(normalizeProfile(JSON.parse(saved)));
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  const analyzeProfile = async (data: { linkedinUrl?: string; resumeName?: string; name?: string; role?: string }) => {
    const linkedinUrl = data.linkedinUrl?.trim();
    const resumeName = data.resumeName?.trim();

    if (!linkedinUrl || !resumeName) {
      throw new Error("LinkedIn profile URL and resume are both required.");
    }

    const response = await fetch("/api/profile-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        linkedinUrl,
        resumeName,
        name: data.name?.trim() || profile.name,
        role: data.role?.trim() || profile.role,
      }),
    });

    const analysis = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(analysis?.error || "AI profile analysis failed.");
    }

    if (!hasCompleteScores(analysis?.careerScores)) {
      throw new Error("AI profile analysis did not return complete scores.");
    }

    const updated: ProfileData = {
      ...profile,
      hasAnalyzed: true,
      linkedinUrl,
      resumeName,
      name: data.name || (data.linkedinUrl ? data.linkedinUrl.split("/").pop()?.replace(/-/g, " ") : initialUser.name) || initialUser.name,
      role: data.role || initialUser.role,
      headline: `${data.role || initialUser.role} | Profile Verified`,
      location: initialUser.location,
      careerScores: analysis.careerScores,
      recentActivity: [
        { id: Date.now(), action: "Profile analyzed and connected", time: "just now" },
      ],
    };
    setProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save profile to localStorage", e);
    }
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear profile from localStorage", e);
    }
  };

  if (!isLoaded) {
    return null; // prevent hydration mismatch
  }

  return (
    <ProfileContext.Provider value={{ profile, analyzeProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
