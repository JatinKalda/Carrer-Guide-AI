"use client";

// Client-side authentication simulation for CareerOS AI.
// Manages local session in localStorage so login, signup, and social auth work smoothly.

export const DEMO_EMAIL = "demo@careeros.ai";
export const DEMO_PASSWORD = "demo1234";

const SESSION_KEY = "careeros_session";

export function loginWithDemoCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD
  );
}

export function setSession(name = "John Doe", email?: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name, email: email || DEMO_EMAIL, ts: Date.now() })
  );
}

export function hasSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(SESSION_KEY) !== null;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
