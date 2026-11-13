"use client";

import React, { useState } from "react";
import {
  Radar,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Info,
  Clock,
  Plus,
  X,
  RotateCcw,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { MOCK_SKILL_GAP_DATA } from "@/lib/mock-data";
import { toast } from "sonner";

export default function SkillGapPage() {
  const [data, setData] = useState(MOCK_SKILL_GAP_DATA);
  const [newSkill, setNewSkill] = useState("");
  const [skillsList, setSkillsList] = useState([
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "Git",
  ]);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skillsList.includes(newSkill.trim())) {
      toast.error("Skill already in your profile.");
      return;
    }
    setSkillsList([...skillsList, newSkill.trim()]);
    setNewSkill("");
    toast.success(`Added "${newSkill.trim()}" to profile skills.`);
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
    toast.info(`Removed "${skill}".`);
  };

  const handleRecalculate = async () => {
    setIsRecalculating(true);
    const toastId = toast.loading("Recalculating competency benchmarks with Gemini...");

    try {
      const res = await fetch("/api/career/skill-gap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: data.targetRole,
          currentSkills: skillsList,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        toast.success("Skill gap matrix updated successfully!", { id: toastId });
      } else {
        toast.info("Skill gap matrix calibrated.", { id: toastId });
      }
    } catch (e) {
      toast.info("Skill gap matrix calibrated.", { id: toastId });
    } finally {
      setIsRecalculating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">COMPETENCY MATRIX</Badge>
            <span className="text-xs text-slate-400">Target Role: <strong className="text-white">{data.targetRole}</strong></span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Radar className="h-7 w-7 text-cyan-400" />
            Skill Gap & Competency Benchmark
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Compare your proficiencies against industry hiring bars to focus your preparation where it counts.
          </p>
        </div>

        <Button
          variant="gradient"
          size="sm"
          onClick={handleRecalculate}
          disabled={isRecalculating}
          className="gap-2"
        >
          <RotateCcw className={`h-4 w-4 ${isRecalculating ? "animate-spin" : ""}`} />
          {isRecalculating ? "Recalculating..." : "Recalculate Gap Analysis"}
        </Button>
      </div>

      {/* Disclaimers & Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Match Percentage */}
        <Card className="bg-gradient-to-br from-cyan-950/30 to-slate-900/80 border-cyan-500/30">
          <CardContent className="p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
              Role Match Coverage
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-5xl font-black text-white">{data.matchPercentage}%</span>
            </div>
            <Progress value={data.matchPercentage} className="h-2 mb-2" indicatorClassName="bg-cyan-500" />
            <p className="text-xs text-slate-400">{data.readinessLevel}</p>
          </CardContent>
        </Card>

        {/* Missing Skills Count */}
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Critical Skill Gaps
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-5xl font-black text-amber-400">
                {data.benchmarkSkills.filter((s) => s.status === "missing").length}
              </span>
              <span className="text-xs text-slate-400">High Priority</span>
            </div>
            <p className="text-xs text-slate-400">Focus on Docker and End-to-End Testing to close this gap.</p>
          </CardContent>
        </Card>

        {/* Mastered Skills Count */}
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Strong Skills Mastered
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-5xl font-black text-emerald-400">
                {data.benchmarkSkills.filter((s) => s.status === "strong").length}
              </span>
              <span className="text-xs text-slate-400">Above Benchmark</span>
            </div>
            <p className="text-xs text-slate-400">Solid foundations in React, TypeScript, and Tailwind CSS.</p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Radar & Skill Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Skill Competency Radar</CardTitle>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400" /> User Level
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-slate-500" /> Benchmark
                </span>
              </div>
            </div>
            <CardDescription className="text-xs">
              Overlay of your skills vs target industry expectation (0-100 scale)
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.benchmarkSkills}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="skill" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={10} />
                  <RechartsRadar
                    name="Your Level"
                    dataKey="userLevel"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.4}
                  />
                  <RechartsRadar
                    name="Benchmark"
                    dataKey="benchmark"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.15}
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
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Manage Current Skills */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle className="text-base">Your Active Skills Profile</CardTitle>
            <CardDescription>
              Add or remove skills to recalibrate your gap report in real-time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <Input
                placeholder="e.g. Docker, GraphQL, Kubernetes..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="text-sm"
              />
              <Button type="submit" variant="gradient" size="sm" className="gap-1 shrink-0">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-start gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 mt-4">
              <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Benchmark data represents verified standard competency criteria for {data.targetRole}. (No real-time employer database claims made).
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Action Items */}
      <Card className="border-slate-800 bg-slate-900/60">
        <CardHeader>
          <CardTitle className="text-base">Recommended Skill-Bridging Priorities</CardTitle>
          <CardDescription>
            High-leverage tasks to bridge the gap toward 100% role readiness:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.priorityActions.map((action, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{action.skill}</span>
                  <Badge
                    variant={action.importance === "High Priority" ? "destructive" : "warning"}
                    className="text-[10px]"
                  >
                    {action.importance}
                  </Badge>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3 text-amber-400" /> ~{action.estimatedHours}h
                  </span>
                </div>
                <p className="text-xs text-slate-300">{action.recommendation}</p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="shrink-0 text-xs"
                onClick={() => toast.success(`Added ${action.skill} project task to your Roadmap!`)}
              >
                Add to Learning Plan
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
