import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        card: "var(--card)",
        input: "var(--input)",
        subtle: "var(--subtle)",
        primary: {
          DEFAULT: "#5B5FEF",
          50: "#EEEEFE",
          100: "#DEDEFD",
          200: "#C0C1FB",
          300: "#9A9CF7",
          400: "#7A7DF3",
          500: "#5B5FEF",
          600: "#4548D6",
          700: "#3638AB",
          800: "#2A2C84",
          900: "#20215F",
        },
        accent: {
          DEFAULT: "#7C3AED",
          50: "#F4EBFE",
          100: "#E7D6FD",
          500: "#7C3AED",
          600: "#6928D9",
        },
        success: {
          DEFAULT: "#10B981",
          50: "#E7FBF4",
          100: "#C6F5E3",
        },
        danger: {
          DEFAULT: "#EF4444",
          50: "#FDECEC",
          100: "#FBD5D5",
        },
        border: "var(--border)",
        muted: "var(--muted)",
        ink: "var(--ink)",
      },
      fontFamily: {
        display: ["var(--font-satoshi)", "Satoshi", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      spacing: {
        "0.5x": "4px",
        "1x": "8px",
        "2x": "16px",
        "3x": "24px",
        "4x": "32px",
        "6x": "48px",
        "8x": "64px",
        "12x": "96px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.06)",
        premium:
          "0 2px 4px rgba(15, 23, 42, 0.04), 0 16px 40px -12px rgba(91, 95, 239, 0.18)",
        glow: "0 0 0 1px rgba(91,95,239,0.08), 0 20px 60px -15px rgba(124,58,237,0.35)",
        glass: "0 8px 32px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 1px 1px, rgba(15,23,42,0.06) 1px, transparent 0)",
        "brand-gradient": "linear-gradient(135deg, #5B5FEF 0%, #7C3AED 100%)",
        "blob-gradient":
          "radial-gradient(60% 60% at 50% 50%, rgba(91,95,239,0.35) 0%, rgba(124,58,237,0.15) 45%, rgba(124,58,237,0) 80%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(20px, -30px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.97)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "0.45" },
          "100%": { transform: "scale(3)", opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        ripple: "ripple 600ms ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
