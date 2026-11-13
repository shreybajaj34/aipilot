# AI CareerPilot — Project Overview

## 1. Introduction
**AI CareerPilot** is an end-to-end intelligent career accelerator built to empower students, freshers, and job seekers. The platform translates vague career goals into measurable, daily actions by combining ATS resume auditing, personalized curriculum roadmaps, skills gap analysis, interactive voice mock interviews, and curated portfolio project ideas.

---

## 2. Problem Statement
- **The College-to-Workplace Chasm:** Universities teach foundational theory, but industry hiring bars demand specific modern stacks (TypeScript, Next.js, Docker, Cloud RLS, CI/CD).
- **Vague & Biased Feedback:** Traditional resume advice is often generic, subjective, or locked behind costly consulting services.
- **Tutorial Hell:** Students build the same generic "todo apps" and "weather widgets", failing to impress recruiters with novel architectural depth.
- **Interview Anxiety:** Job seekers lack safe, low-stakes simulated environments to practice technical and behavioral questions using the STAR framework.

---

## 3. The Proposed Solution
AI CareerPilot acts as a personal AI engineering director and career mentor:
1. **Audits resumes** using calibrated ATS heuristics and rewrites bullets into quantified STAR statements.
2. **Exposes the exact competency gap** through visual radar benchmarking against industry standards.
3. **Generates a structured 3-stage roadmap** (Beginner, Intermediate, Advanced) adapted to the candidate's available hours.
4. **Conducts simulated mock interviews** with in-browser voice recognition and structured scoring.
5. **Recommends production-grade projects** with architecture diagrams and step-by-step milestones.
6. **Synthesizes real-time progress** into a composite Career Readiness Index and recommends "Your Next Best Step".

---

## 4. Architectural Innovation & Uniqueness
- **Zero Hallucination Disclaimer Model:** Clearly separates heuristic estimates (ATS compatibility) from corporate hiring promises, fostering ethical AI transparency.
- **Server-Side Security First:** No credentials (Gemini, Supabase service-role) ever leak into frontend client bundles.
- **Resilient AI Pipeline:** Zod schema validation combined with fallback intelligence ensures zero crashes even under upstream AI rate limits.
- **Browser-Native Dictation:** Utilizes HTML5 Web Speech API for low-latency voice answering without external speech-to-text API costs.
