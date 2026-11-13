# AI CareerPilot 🚀
> **Navigate Your Career. Powered by AI.**  
> **Official Hackathon Project by Team Career Catalyst: Aarav Goyal & Shrey Bajaj**

[![Team](https://img.shields.io/badge/Team-Career_Catalyst-cyan?style=flat)](https://github.com/)
[![Architects](https://img.shields.io/badge/Architects-Aarav_Goyal_&_Shrey_Bajaj-violet?style=flat)](https://github.com/)

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?style=flat&logo=supabase)](https://supabase.com/)
[![Gemini API](https://img.shields.io/badge/Google-Gemini_AI-7c3aed?style=flat&logo=google)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

**AI CareerPilot** is a competition-grade, AI-powered career guidance and job readiness platform designed for college students, freshers, and early-career job seekers. It bridges the gap between degree coursework and industry hiring bars by providing real-time resume audits, personalized learning roadmaps, skills gap evaluations, simulated mock interviews, and project portfolio guidance.

---

## 🌟 Key Features

### 1. 📄 AI Resume Analyzer & ATS Audit
- **PDF Upload & Parsing:** Server-side PDF extraction with size (max 5MB) and format validation.
- **Estimated ATS Compatibility Score:** Heuristic evaluation of structural hierarchy, keyword density, and quantifier metrics with clear transparency disclaimers.
- **STAR Bullet Rewrites:** Instant before-and-after bullet rewrites following the Situation-Task-Action-Result format.
- **Exportable Report:** One-click offline report generation.

### 2. 🗺️ Personalized Career Roadmap Generator
- **Multi-Role Support:** AI/ML Engineer, Data Scientist, Data Analyst, Software Developer, Full Stack Developer, Web Developer, Cybersecurity Analyst, Cloud Engineer, UI/UX Designer.
- **3-Stage Curriculum:** Beginner, Intermediate, and Advanced milestones with vetted documentation links and practical exercises.
- **Interactive Checklist:** Instant task completion toggles that dynamically update your Career Readiness score with celebration micro-interactions.

### 3. 🎯 Skill Gap Analyzer & Competency Matrix
- **Visual Radar Chart:** Real-time Recharts radar visualizer comparing your proficiencies against industry benchmarks.
- **Priority Bridging Actions:** Identifies critical missing skills (e.g., Docker, End-to-End Testing) with realistic time estimates.
- **Dynamic Skill Management:** Add or remove skills to recalibrate your gap report in seconds.

### 4. 🎙️ AI Mock Interview Studio
- **Dynamic Question Generator:** Role, seniority, and interview type (Technical, HR, Behavioral, Mixed).
- **Dual Answering Mode:** Type responses or dictate via microphone using HTML5 Web Speech recognition.
- **STAR Grading:** Instant constructive critique, numerical scoring (0-100), and an exemplary ideal model answer.
- **Ethical AI Disclosure:** Grades transcript structure and technical depth; does not claim biometric or emotion tracking.

### 5. 💡 AI Project Recommendation Engine
- **Non-Generic Portfolio Ideas:** Replaces repetitive tutorial clones with distinctive, production-grade applications.
- **Architecture Breakdown:** Problem statement, key distinguishing features, tech stack tags, and step-by-step implementation milestones.
- **Bookmarking:** Save projects to your personalized active workspace.

### 6. 📊 Unified Command Center & Career Readiness Index
- **Composite Readiness Metric:** Formula: `(Resume * 30%) + (Skill Match * 30%) + (Roadmap * 25%) + (Mock Interview * 15%)`.
- **"Your Next Best Step":** High-leverage recommendation engine suggesting the exact next action to maximize readiness.
- **Recharts Longitudinal Analytics:** Area and bar charts visualizing readiness progression and weekly learning hours.

---

## 🛠️ Technology Stack

| Domain | Technology | Justification |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Hybrid Server Components, Server Actions, Route Handlers, SEO-optimized |
| **Language** | TypeScript | Strict end-to-end type safety for database models and AI JSON schemas |
| **Styling** | Tailwind CSS + shadcn/ui | Premium dark navy & violet SaaS aesthetic (`#080c14`, `#7c3aed`, `#06b6d4`) |
| **Database & Auth** | Supabase PostgreSQL | Managed database with 100% Row Level Security (RLS) and SSR auth cookies |
| **AI Integration** | Google Gemini API | Server-side Gemini 1.5 Flash / Pro with Zod schema validation & fallback resilience |
| **Visualizations** | Recharts | Responsive SVG charts (Radar, Area, Bar) |
| **Speech** | Web Speech API | Native in-browser speech-to-text dictation |

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js `v20.x` or higher
- Git

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-careerpilot.git
cd ai-careerpilot
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your credentials:
```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```
*(Note: AI CareerPilot includes a built-in demo mode that operates cleanly out of the box even before adding live API keys!)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build Verification
```bash
npm run build
npm start
```

---

## 📂 Documentation Directory
- [ARCHITECTURE.md](file:///c:/Users/samik/Downloads/aipilot/ARCHITECTURE.md) — System Architecture Blueprint
- [DATABASE_SCHEMA.md](file:///c:/Users/samik/Downloads/aipilot/DATABASE_SCHEMA.md) — Supabase PostgreSQL Schema & RLS Policies
- [API_DOCUMENTATION.md](file:///c:/Users/samik/Downloads/aipilot/API_DOCUMENTATION.md) — Route Handlers & AI Schemas
- [SETUP_GUIDE.md](file:///c:/Users/samik/Downloads/aipilot/SETUP_GUIDE.md) — Detailed Setup & Vercel Deployment Guide
- [TESTING_REPORT.md](file:///c:/Users/samik/Downloads/aipilot/TESTING_REPORT.md) — Comprehensive QA & Security Audit Report
- [HACKATHON_PITCH.md](file:///c:/Users/samik/Downloads/aipilot/HACKATHON_PITCH.md) — Pitch Script, Demo Flow & Judge Q&As

---

## 🛡️ Security & Privacy
- **Row Level Security (RLS):** 100% of tables enforce `auth.uid() = user_id`.
- **Zero Client Secret Exposure:** API keys (`GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are strictly server-side.
- **Upload Restrictions:** File validation strictly restricts uploads to PDFs under 5MB.

---
## 👥 Team Career Catalyst
- **Aarav Goyal** — Lead Full-Stack Architect & AI Systems (Next.js, Gemini API, Zod, System Design)
- **Shrey Bajaj** — Product Architect & Cloud/Data Engineering (Supabase PostgreSQL, RLS, Recharts, ATS Heuristics)

---
*Built with ❤️ by Team Career Catalyst for online hackathon excellence.*
