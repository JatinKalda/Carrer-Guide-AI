"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { user as initialUser, careerScores as initialScores } from "./data";

export interface ProfileData {
  hasAnalyzed: boolean;
  linkedinUrl: string;
  resumeName: string;
  name: string;
  email: string;
  headline: string;
  location: string;
  role: string;
}

interface ProfileContextType {
  profile: ProfileData;
  analyzeProfile: (data: { linkedinUrl?: string; resumeName?: string; name?: string; role?: string }) => void;
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
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = "careeros_user_profile_v1";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  const analyzeProfile = (data: { linkedinUrl?: string; resumeName?: string; name?: string; role?: string }) => {
    const updated: ProfileData = {
      ...profile,
      hasAnalyzed: true,
      linkedinUrl: data.linkedinUrl || profile.linkedinUrl || "https://linkedin.com/in/user",
      resumeName: data.resumeName || profile.resumeName || "Resume.pdf",
      name: data.name || (data.linkedinUrl ? data.linkedinUrl.split("/").pop()?.replace(/-/g, " ") : initialUser.name) || initialUser.name,
      role: data.role || initialUser.role,
      headline: `${data.role || initialUser.role} | Profile Verified`,
      location: initialUser.location,
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
