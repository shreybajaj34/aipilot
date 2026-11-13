"use client";

import React from "react";
import Link from "next/link";
import {
  BrainCircuit,
  Sparkles,
  ArrowRight,
  FileText,
  Map,
  Radar,
  Mic,
  FolderGit2,
  TrendingUp,
  CheckCircle2,
  Star,
  Users,
  Shield,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-violet-600 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-md shadow-violet-500/25">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                AI CareerPilot
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  AI SaaS
                </span>
              </span>
              <span className="text-[10px] text-violet-400 font-medium">
                By Team Career Catalyst
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-violet-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-violet-400 transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-violet-400 transition-colors">
              Benefits
            </a>
            <a href="#testimonials" className="hover:text-violet-400 transition-colors">
              Testimonials
            </a>
            <a href="#team" className="hover:text-violet-400 transition-colors">
              Our Team
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                Log In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="gradient" size="sm" className="gap-2">
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-24 pb-20 overflow-hidden text-center px-4">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-medium">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>Next-Gen Career Intelligence Platform</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
              <Users className="h-3.5 w-3.5 text-cyan-400" />
              <span>Team Career Catalyst • Aarav Goyal & Shrey Bajaj</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Navigate Your Career. <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Powered by AI.
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-normal">
            Discover your dream career, audit your resume against hiring bars with precision, pinpoint skill gaps, practice simulated AI interviews, and follow a personalized step-by-step learning roadmap.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto gap-2 text-base px-8 py-6 shadow-xl shadow-violet-500/20">
                Explore Demo Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/resume-analyzer" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-8 py-6">
                <FileText className="h-5 w-5 text-violet-400" />
                Upload Resume For Free
              </Button>
            </Link>
          </div>

          {/* Hero Feature Preview Box */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl shadow-violet-950/40">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-slate-400 font-mono">ai-careerpilot.internal/readiness-engine</span>
              </div>
              <Badge variant="cyan" className="font-mono text-[11px]">LIVE DEMO READY</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400">Career Readiness</span>
                <div className="text-2xl font-bold text-violet-400 mt-1">79%</div>
                <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> +14% this month
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400">Estimated ATS Score</span>
                <div className="text-2xl font-bold text-cyan-400 mt-1">88 / 100</div>
                <span className="text-[11px] text-slate-400">STAR bullets verified</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400">Roadmap Progress</span>
                <div className="text-2xl font-bold text-indigo-400 mt-1">Stage 2 of 3</div>
                <span className="text-[11px] text-slate-400">4 tasks completed</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs text-slate-400">Mock Interview Avg</span>
                <div className="text-2xl font-bold text-amber-400 mt-1">84 / 100</div>
                <span className="text-[11px] text-slate-400">3 answers graded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT FEATURES */}
      <section id="features" className="py-24 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="default" className="mb-4">Comprehensive Suite</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Six Intelligent Modules to Fast-Track Your Career
            </h2>
            <p className="text-slate-400 mt-4 text-base">
              Everything you need to go from college graduate or career-switcher to hired software engineer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="hover:border-violet-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center mb-5 border border-violet-500/30">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Resume Analyzer</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Upload PDF resumes for comprehensive heuristic parsing, ATS score estimation, missing skill detection, and STAR-format bullet rewrites.
                </p>
                <Link href="/resume-analyzer" className="text-sm font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1">
                  Try Analyzer <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:border-violet-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-5 border border-indigo-500/30">
                  <Map className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Curated Career Roadmaps</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Step-by-step 3-stage curriculum customized to your available daily hours, target role, and existing knowledge level.
                </p>
                <Link href="/career-roadmap" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View Roadmap <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:border-violet-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-5 border border-cyan-500/30">
                  <Radar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Skill Gap Visualizer</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Compare your technical and soft skills against verified industry job descriptions to identify urgent hiring requirements.
                </p>
                <Link href="/skill-gap" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  Analyze Gaps <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:border-violet-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/30">
                  <Mic className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Mock Interviews</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Practice technical and behavioral interviews with real-time question generation, timer pacing, voice transcription, and STAR feedback.
                </p>
                <Link href="/mock-interview" className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  Start Practice <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="hover:border-violet-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/30">
                  <FolderGit2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Project Recommendation</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  Replace generic tutorial clones with standout portfolio applications, complete with architecture outlines and step-by-step guides.
                </p>
                <Link href="/project-recommender" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  Explore Projects <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="hover:border-violet-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center mb-5 border border-amber-500/30">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Career Readiness Index</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  A composite readiness metric computed from resume quality, skill coverage, task completions, and mock interview performance.
                </p>
                <Link href="/progress" className="text-sm font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  Track Readiness <ChevronRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="cyan" className="mb-4">Streamlined Workflow</Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              How AI CareerPilot Works
            </h2>
            <p className="text-slate-400 mt-4 text-base">
              Four steps from unguided student to prepared candidate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative">
              <div className="text-3xl font-black text-violet-500/40 mb-3">01</div>
              <h4 className="text-lg font-bold text-white mb-2">Define Target Role</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Select your desired job title and specify your current education, skills, and daily schedule.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative">
              <div className="text-3xl font-black text-indigo-500/40 mb-3">02</div>
              <h4 className="text-lg font-bold text-white mb-2">Audit Resume & Gaps</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Upload your PDF resume to receive estimated ATS scores and identify high-priority missing skills.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative">
              <div className="text-3xl font-black text-cyan-500/40 mb-3">03</div>
              <h4 className="text-lg font-bold text-white mb-2">Follow Personalized Plan</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Execute stage-by-stage learning milestones, build portfolio projects, and verify competencies.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 relative">
              <div className="text-3xl font-black text-emerald-500/40 mb-3">04</div>
              <h4 className="text-lg font-bold text-white mb-2">Ace Mock Interviews</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Simulate high-pressure technical and behavioral interviews with voice transcription and STAR scoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS */}
      <section id="benefits" className="py-24 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="default" className="mb-4">Why AI CareerPilot?</Badge>
              <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-6">
                Engineered for Real Job Market Success
              </h2>
              <p className="text-slate-400 mb-8 text-base leading-relaxed">
                Unlike generic career advice blogs or static questionnaires, AI CareerPilot treats career readiness as an actionable, measurable engineering pipeline.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Honest, Calibrated Heuristics</h5>
                    <p className="text-xs text-slate-400">Clear disclaimers explaining that ATS scores are algorithmic estimates, keeping expectations grounded.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Enterprise Multi-Tenant Security</h5>
                    <p className="text-xs text-slate-400">PostgreSQL Row Level Security ensures only you have access to your private resumes and interview transcripts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-white text-sm">Powered by Google Gemini</h5>
                    <p className="text-xs text-slate-400">Deep contextual understanding of technical stacks, engineering trade-offs, and communication rubrics.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <h4 className="text-lg font-bold text-white mb-4">Sample Candidate Transformation</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                  <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Before CareerPilot</span>
                  <p className="text-sm text-slate-300 mt-1">
                    "Built a website using React" — Zero metrics, vague responsibility, missing keywords for CI/CD and Docker, filtered out by automated screening.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">After CareerPilot AI Audit</span>
                  <p className="text-sm text-slate-300 mt-1">
                    "Architected responsive Next.js 14 client dashboard across 4 modules, cutting LCP by 35% and deploying automated Playwright regression tests."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS (Sample labelled content) */}
      <section id="testimonials" className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">Community Feedback</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Loved by Students & Early Career Engineers
          </h2>
          <p className="text-xs text-amber-400 mb-12">
            [Sample User Feedback — Evaluated during hackathon beta tests]
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  "The resume bullet rewrites gave me concrete ideas for formatting my internship achievements using the STAR method. I got 3 callbacks within two weeks."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-violet-600/30 text-violet-300 flex items-center justify-center font-bold text-xs">
                    PT
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Priya T.</h5>
                    <p className="text-xs text-slate-400">CS Graduate, 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  "The mock interview with voice answers helped me overcome my nervousness. Seeing the exact scoring on technical accuracy vs clarity made all the difference."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-cyan-600/30 text-cyan-300 flex items-center justify-center font-bold text-xs">
                    RK
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Rahul K.</h5>
                    <p className="text-xs text-slate-400">Junior Full Stack Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  "The skill gap radar chart immediately exposed that I was missing containerization knowledge. The project recommender helped me build a dockerized app."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs">
                    SM
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white">Sara M.</h5>
                    <p className="text-xs text-slate-400">Career Switcher</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6.5 MEET THE CREATORS — TEAM CAREER CATALYST */}
      <section id="team" className="py-24 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="cyan" className="mb-4">PROJECT CREATORS</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Built by Team Career Catalyst
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base mb-12">
            AI CareerPilot was architected and developed by <strong className="text-white">Aarav Goyal</strong> and <strong className="text-white">Shrey Bajaj</strong> as an official hackathon engineering initiative to revolutionize job readiness for students.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Aarav Goyal */}
            <Card className="border-violet-500/40 bg-gradient-to-br from-violet-950/30 to-slate-900/80 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-violet-500/25">
                    AG
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Aarav Goyal</h4>
                    <p className="text-xs text-violet-300 font-semibold">Lead Full-Stack Architect & AI Systems</p>
                    <span className="text-[11px] text-slate-400">Team Career Catalyst</span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Architected the Next.js App Router core, server-side Gemini AI service wrappers, structured Zod schemas, and responsive UI components.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">Next.js 14</Badge>
                  <Badge variant="secondary" className="text-[10px]">Gemini 1.5</Badge>
                  <Badge variant="secondary" className="text-[10px]">TypeScript</Badge>
                  <Badge variant="secondary" className="text-[10px]">System Design</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Shrey Bajaj */}
            <Card className="border-cyan-500/40 bg-gradient-to-br from-cyan-950/30 to-slate-900/80 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/25">
                    SB
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Shrey Bajaj</h4>
                    <p className="text-xs text-cyan-300 font-semibold">Product Architect & Cloud/Data Engineering</p>
                    <span className="text-[11px] text-slate-400">Team Career Catalyst</span>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Engineered the Supabase PostgreSQL database models, Row Level Security policies, Recharts analytics telemetry, and ATS heuristic algorithms.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-[10px]">Supabase & RLS</Badge>
                  <Badge variant="secondary" className="text-[10px]">PostgreSQL</Badge>
                  <Badge variant="secondary" className="text-[10px]">Recharts</Badge>
                  <Badge variant="secondary" className="text-[10px]">Product UX</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-md">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-base">AI CareerPilot</span>
              <p className="text-[11px] text-violet-400 font-medium">By Team Career Catalyst</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-left">
            Crafted with ❤️ for the Hackathon by <span className="text-white font-semibold">Team Career Catalyst</span> (<span className="text-violet-300">Aarav Goyal</span> & <span className="text-cyan-300">Shrey Bajaj</span>).
          </p>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/resume-analyzer" className="hover:text-white transition-colors">
              Resume Analyzer
            </Link>
            <Link href="/mock-interview" className="hover:text-white transition-colors">
              Mock Interview
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
