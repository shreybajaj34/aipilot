"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Mic,
  FileText,
  Map,
  Sparkles,
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_PROGRESS_HISTORY, MOCK_ROADMAP, MOCK_RESUME_ANALYSIS, MOCK_INTERVIEW_SESSION } from "@/lib/mock-data";

export default function ProgressPage() {
  const [history] = useState(MOCK_PROGRESS_HISTORY);

  const completedTasks = MOCK_ROADMAP.tasks?.filter((t) => t.is_completed) || [];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Badge variant="cyan" className="mb-2">LONGITUDINAL ANALYTICS</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="h-7 w-7 text-violet-400" />
            Candidate Progress & Competency Trajectory
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Review your historical Readiness progression, study velocity, and milestone completion logs.
          </p>
        </div>
      </div>

      {/* High Level Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-5">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Practice Time</span>
            <div className="text-3xl font-extrabold text-white mt-2">110 mins</div>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Across 3 mock sessions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-5">
            <span className="text-xs font-semibold uppercase text-slate-400">Roadmap Milestones</span>
            <div className="text-3xl font-extrabold text-indigo-400 mt-2">
              {completedTasks.length} / {MOCK_ROADMAP.tasks?.length}
            </div>
            <p className="text-xs text-slate-400 mt-1">58% of curriculum complete</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-5">
            <span className="text-xs font-semibold uppercase text-slate-400">Best ATS Score</span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-2">
              {MOCK_RESUME_ANALYSIS.ats_compatibility_score} / 100
            </div>
            <p className="text-xs text-emerald-400 mt-1">+18 pts since first audit</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-5">
            <span className="text-xs font-semibold uppercase text-slate-400">Mock Score Average</span>
            <div className="text-3xl font-extrabold text-purple-400 mt-2">
              {MOCK_INTERVIEW_SESSION.overall_score} / 100
            </div>
            <p className="text-xs text-slate-400 mt-1">STAR structure validated</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Career Readiness Area Chart */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-base">Readiness Score Over Time</CardTitle>
            <CardDescription className="text-xs">
              Weekly progression based on audited achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="progArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="log_date" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[40, 100]} tickLine={false} />
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
                    fill="url(#progArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Practice Minutes Bar Chart */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-base">Cumulative Interview Practice Minutes</CardTitle>
            <CardDescription className="text-xs">
              Simulated audio and structured answering time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="log_date" stroke="#64748b" fontSize={11} tickLine={false} />
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
                  <Bar dataKey="interview_minutes_practiced" name="Minutes" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chronological Activity Log */}
      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-base">Verified Achievement Log</CardTitle>
          <CardDescription className="text-xs">
            Chronological record of completed milestones, interviews, and audits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="h-9 w-9 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-white text-sm">PostgreSQL Row Level Security (RLS) Task Completed</h5>
                <span className="text-xs text-slate-500 font-mono">2 days ago</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Configured user-level authorization policies in Supabase and verified token claims.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="h-9 w-9 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
              <Mic className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-white text-sm">Mixed Technical/STAR Mock Interview Scored: 84/100</h5>
                <span className="text-xs text-slate-500 font-mono">1 day ago</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Answered 3 questions on Server Components, debugging methodology, and database security.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="h-9 w-9 rounded-lg bg-cyan-600/20 text-cyan-400 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-white text-sm">Resume ATS Compatibility Audited: 88/100</h5>
                <span className="text-xs text-slate-500 font-mono">3 days ago</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Optimized 3 experience bullet points using STAR formula and quantified speed metrics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
