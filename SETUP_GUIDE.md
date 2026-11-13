# AI CareerPilot — Complete Setup & Deployment Guide

This guide walks you through setting up AI CareerPilot locally and deploying it to Vercel for live hackathon evaluation.

---

## 1. Local Environment Setup

### Prerequisites
- Node.js `v20.11.1` or later
- npm or pnpm or yarn
- Git

### Installation Steps
1. **Clone the project:**
   ```bash
   git clone <repo-url>
   cd aipilot
   ```

2. **Install node dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Secrets:**
   Create `.env.local` based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Add your keys:
   ```env
   # Google Gemini AI API Key (from https://aistudio.google.com/)
   GEMINI_API_KEY=AIzaSy...

   # Supabase Authentication & Database (from https://supabase.com/dashboard)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

   # Application Base URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize Supabase PostgreSQL:**
   - Open the Supabase SQL Editor.
   - Run `supabase/migrations/20240101000000_init_schema.sql` to create all 11 tables and indexes.
   - Run `supabase/migrations/20240101000001_rls_policies.sql` to apply Row Level Security policies and profile creation triggers.

5. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Production Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "feat: AI CareerPilot release ready for hackathon"
   git push origin main
   ```

2. **Import Project into Vercel:**
   - Log in to [Vercel](https://vercel.com).
   - Click **Add New** -> **Project**.
   - Select your repository and leave framework preset as **Next.js**.

3. **Configure Environment Variables in Vercel:**
   Under **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel deployment URL)

4. **Deploy:**
   - Click **Deploy**. Vercel will build the Next.js App Router application and output the live production URL.

---

## 3. Demo / Offline Evaluation Mode
AI CareerPilot includes a built-in fallback intelligence layer:
- If `GEMINI_API_KEY` is omitted or temporarily rate-limited, all modules gracefully transition to calibrated heuristic mode.
- Users and hackathon judges can navigate every screen, upload resumes, run mock interviews, check off roadmap tasks, and toggle project bookmarks without being blocked by third-party outages.
