"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  FileText,
  Map,
  Radar,
  Mic,
  FolderGit2,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  AlertTriangle,
  Flame,
  Award,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch("/api/analytics/dashboard");
        const json = await res.json();
        if (json.success) {
          setMetrics(json.data);
        }
      } catch (e) {
        console.error("Dashboard metrics fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const readinessScore = metrics?.readinessScore || 79;
  const resumeScore = metrics?.resumeScore || 82;
  const atsScore = metrics?.atsScore || 88;
  const roadmapProgress = metrics?.roadmapProgress || 58;
  const interviewAverage = metrics?.mockInterviewAverage || 84;
  const chartData = metrics?.progressHistory || [
    { log_date: "Week 1", readiness_score: 55 },
    { log_date: "Week 2", readiness_score: 62 },
    { log_date: "Week 3", readiness_score: 68 },
    { log_date: "Week 4", readiness_score: 75 },
    { log_date: "Week 5", readiness_score: 79 },
  ];

  const weeklyActivity = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.0 },
    { day: "Thu", hours: 2.2 },
    { day: "Fri", hours: 2.7 },
    { day: "Sat", hours: 4.1 },
    { day: "Sun", hours: 1.5 },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 1. Welcome & Career Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan" className="font-mono text-xs">
              ACTIVE CANDIDATE PROFILE
            </Badge>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" /> 5-Day Study Streak
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {MOCK_USER_PROFILE.full_name?.split(" ")[0]}!
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Targeting: <span className="text-violet-400 font-semibold">Full Stack Developer</span> • Daily Goal: 2h/day
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/mock-interview">
            <Button variant="outline" size="sm" className="gap-2">
              <Mic className="h-4 w-4 text-violet-400" />
              Practice Interview
            </Button>
          </Link>
          <Link href="/resume-analyzer">
            <Button variant="gradient" size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Upload New Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Top Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Readiness Card */}
        <Card className="bg-gradient-to-br from-violet-950/30 to-slate-900/60 border-violet-500/30 relative overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                Career Readiness Index
              </span>
              <Award className="h-4 w-4 text-violet-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {readinessScore}%
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-0.5" /> +14%
              </span>
            </div>
            <Progress value={readinessScore} className="h-2 mb-2" indicatorClassName="bg-gradient-to-r from-violet-500 to-indigo-500" />
            <p className="text-[11px] text-slate-400">Weighted heuristic of resume, skills & mocks</p>
          </CardContent>
        </Card>

        {/* Resume ATS Card */}
        <Card className="bg-gradient-to-br from-cyan-950/20 to-slate-900/60 border-cyan-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Estimated ATS Score
              </span>
              <FileText className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {atsScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <Progress value={atsScore} className="h-2 mb-2" indicatorClassName="bg-cyan-500" />
            <p className="text-[11px] text-slate-400">Algorithmic estimate (STAR keywords checked)</p>
          </CardContent>
        </Card>

        {/* Roadmap Progress Card */}
        <Card className="bg-gradient-to-br from-indigo-950/20 to-slate-900/60 border-indigo-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                Roadmap Completion
              </span>
              <Map className="h-4 w-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {roadmapProgress}%
              </span>
              <span className="text-xs text-indigo-300 font-medium">Stage 2 of 3</span>
            </div>
            <Progress value={roadmapProgress} className="h-2 mb-2" indicatorClassName="bg-indigo-500" />
            <p className="text-[11px] text-slate-400">4 of 6 milestones completed</p>
          </CardContent>
        </Card>

        {/* Mock Interview Score */}
        <Card className="bg-gradient-to-br from-purple-950/20 to-slate-900/60 border-purple-500/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Mock Interview Avg
              </span>
              <Mic className="h-4 w-4 text-purple-400" />
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {interviewAverage}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <Progress value={interviewAverage} className="h-2 mb-2" indicatorClassName="bg-purple-500" />
            <p className="text-[11px] text-slate-400">Technical accuracy & STAR structure graded</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. YOUR NEXT BEST STEP (AI Recommendation Engine) */}
      <Card className="border-violet-500/40 bg-gradient-to-r from-violet-950/40 via-slate-900/80 to-indigo-950/30 shadow-xl shadow-violet-950/20">
        <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default" className="text-[10px]">
                  YOUR NEXT BEST STEP
                </Badge>
                <span className="text-xs text-emerald-400 font-semibold">+4% Readiness Boost</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Complete Stage 2: PostgreSQL Row Level Security (RLS)
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Closing this database authorization milestone will satisfy the backend hiring requirement for your target Full Stack Engineer profile.
              </p>
            </div>
          </div>

          <Link href="/career-roadmap" className="shrink-0 w-full md:w-auto">
            <Button variant="gradient" className="w-full gap-2 font-semibold">
              Resume Roadmap Task
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* 4. Analytics Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Readiness Trend Area Chart */}
        <Card className="lg:col-span-2 border-slate-800 bg-slate-900/60">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Career Readiness Progression</CardTitle>
              <CardDescription className="text-xs">
                Trajectory measured over the last 5 weeks
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              Recharts Analytics
            </Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="readinessGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis
                    dataKey="log_date"
                    stroke="#64748b"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    domain={[40, 100]}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="readiness_score"
                    name="Readiness %"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#readinessGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Study Hours Bar Chart */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Weekly Practice Hours</CardTitle>
            <CardDescription className="text-xs">
              Daily learning distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="hours" name="Hours" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Quick Modules Navigation Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">Core AI Career Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/resume-analyzer" className="block group">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-violet-500/50 hover:bg-slate-900/80 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-violet-600/20 text-violet-400 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <Badge variant="cyan" className="text-[10px]">ATS AUDIT</Badge>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-violet-400 transition-colors">
                Resume Analyzer
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Upload your PDF resume to receive structured feedback and STAR rewrites.
              </p>
            </div>
          </Link>

          <Link href="/skill-gap" className="block group">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-cyan-500/50 hover:bg-slate-900/80 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center">
                  <Radar className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="text-[10px]">RADAR MATRIX</Badge>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                Skill Gap Analyzer
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Benchmark your skills against market standards for Full Stack Engineer.
              </p>
            </div>
          </Link>

          <Link href="/mock-interview" className="block group">
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <Mic className="h-5 w-5" />
                </div>
                <Badge variant="default" className="text-[10px]">INTERACTIVE</Badge>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-purple-400 transition-colors">
                Mock Interview
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Simulate real technical screenings with voice input and instant evaluation.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
