# 🚀 CareerOS AI — Your AI Career Operating System

[![Next.js](https://img.shields.io/badge/Next.js-15.5.20-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Dark Mode](https://img.shields.io/badge/Dark_Mode-Supported-purple?style=flat-square)](https://careeros.ai)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**CareerOS AI** (Career-Guide-AI) is a full-featured, AI-powered career operating system and SaaS platform built to analyze professional profiles, bridge skill gaps, provide personalized learning roadmaps, and match candidates with ideal job opportunities.

---

## ✨ Key Features

- 🎯 **AI Profile & LinkedIn Analysis**: Instantly evaluate resumes or LinkedIn profiles with comprehensive AI career scores and actionable insights.
- 📊 **Dynamic Skill Gap Radar**: High-resolution skill visualization comparing current proficiencies against target market demands.
- 🗓️ **Personalized Learning Roadmaps**: Week-by-week AI-generated learning schedules equipped with recommended courses, exercises, and milestones.
- 💼 **Intelligent Job Matching Engine**: Filterable job feed scored by AI match percentages, salary estimates, and custom skill alignment explanations.
- 🤖 **Interactive AI Career Coach**: 24/7 conversational assistant for resume optimization, interview prep, and strategy advice.
- 🌓 **Zero-Flicker Light & Dark Mode**: Persistent, system-aware theme toggle with custom HSL/CSS design tokens across all components.
- 🔐 **Flexible Authentication**: Full authentication system with Google OAuth simulation, GitHub Sign-In, and custom email/password handling.
- 📈 **Career Growth Analytics**: Monitor application progress, recruiter views, and interview conversion rates over time.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| --- | --- |
| **Core Framework** | [Next.js 15 (App Router)](https://nextjs.org/), [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.6](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Lucide Icons](https://lucide.dev/) |
| **State & Data** | [TanStack React Query v5](https://tanstack.com/query/latest), Custom Context API |
| **Data Visualization**| [Recharts](https://recharts.org/) |
| **Forms & Validation**| [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| **Fonts** | Satoshi (Fontshare), Inter & JetBrains Mono (Google Fonts) |

---

## 📂 Project Structure

```
careeros-ai/
├── app/
│   ├── (dashboard)/             # Protected dashboard route group
│   │   ├── dashboard/           # Main executive summary & quick actions
│   │   ├── linkedin-analysis/   # LinkedIn profile AI scanner
│   │   ├── career-report/       # Detailed SWOT career report tabbed view
│   │   ├── job-matches/         # AI-scored job opportunity finder
│   │   ├── skill-gap/           # Skill radar & deficiency analyzer
│   │   ├── learning-roadmap/    # Weekly execution timeline
│   │   ├── ai-coach/            # Conversational AI assistant
│   │   ├── analytics/           # Application & market metrics
│   │   ├── profile/             # User profile & badge management
│   │   └── settings/            # Account, privacy & appearance settings
│   ├── login/                   # Glassmorphic login page with Google/GitHub auth
│   ├── signup/                  # Registration flow
│   ├── forgot-password/         # Password recovery page
│   ├── globals.css              # Global styles & CSS custom theme variables
│   ├── layout.tsx               # Root layout & font loaders
│   ├── page.tsx                 # SaaS Landing Page
│   └── providers.tsx            # QueryClient & ThemeProvider wrapper
├── components/
│   ├── ui/                      # Reusable UI primitives (Button, Card, Input, Modal, Tabs, etc.)
│   ├── layout/                  # ThemeProvider, Sidebar, Navbar, AiChatWidget
│   ├── charts/                  # Recharts dynamic visualization wrappers
│   └── marketing/               # Landing page hero, features, pricing, testimonials, FAQ
├── lib/
│   ├── auth.ts                  # Client authentication & session manager
│   ├── data.ts                  # Mock data layer & career intelligence state
│   └── utils.ts                 # Classname utility helpers (clsx + tailwind-merge)
└── tailwind.config.ts           # Extended design tokens & animations
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JatinKalda/Carrer-Guide-AI.git
   cd Carrer-Guide-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open the application**:
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🔑 Demo Access

You can log in instantly with the pre-filled demo credentials or use any email address:
- **Email**: `demo@careeros.ai`
- **Password**: `demo1234`
- **Social Auth**: Click **Continue with Google** or **Continue with GitHub** for immediate single-click login.

---

## 🎨 Design System & Theme Customization

CareerOS AI implements CSS custom properties for dynamic light and dark theme switching:

- **Light Background**: `#F8FAFC`
- **Dark Background**: `#0B0F19`
- **Primary Brand Gradient**: `linear-gradient(135deg, #5B5FEF 0%, #7C3AED 100%)`
- **Card Background**: Configured via `--card` CSS variables
- **Typography**: Display: `Satoshi` · Body: `Inter` · Code/Metrics: `JetBrains Mono`

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p center>Crafted with ❤️ for ambitious professionals worldwide.</p>
