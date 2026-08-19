"use client";

// Client-side authentication simulation for CareerOS AI.
// Manages local session in localStorage so login, signup, and social auth work smoothly.

export const DEMO_EMAIL = "demo@careeros.ai";
export const DEMO_PASSWORD = "demo1234";

const SESSION_KEY = "careeros_session";
const PROFILE_KEY = "careeros_user_profile_v1";

export function loginWithDemoCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD
  );
}

export function setSession(name = "John Doe", email?: string) {
  if (typeof window === "undefined") return;

  const sessionName = name || "John Doe";
  const sessionEmail = email || DEMO_EMAIL;

  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: sessionName, email: sessionEmail, ts: Date.now() })
  );

  try {
    const existingProfile = window.localStorage.getItem(PROFILE_KEY);
    const parsedProfile = existingProfile ? JSON.parse(existingProfile) : null;

    const profileToSave = {
      hasAnalyzed: false,
      linkedinUrl: parsedProfile?.linkedinUrl || "",
      resumeName: parsedProfile?.resumeName || "",
      name: sessionName,
      email: sessionEmail,
      headline: parsedProfile?.headline || "Aspiring Professional",
      location: parsedProfile?.location || "Not Specified",
      role: parsedProfile?.role || "Software Professional",
      careerScores: parsedProfile?.careerScores || {
        aiCareerScore: 0,
        profileHealth: 0,
        jobMatch: 0,
        activityScore: 0,
      },
      recentActivity: parsedProfile?.recentActivity || [],
    };

    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profileToSave));
  } catch (error) {
    console.error("Failed to seed profile after login", error);
  }
}

export function hasSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) !== null;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
