"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  GraduationCap,
  Briefcase,
  Check,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CAREER_OPTIONS = [
  { id: "fullstack", title: "Full Stack Developer", desc: "Build modern web applications end-to-end with React, Next.js, and Node.", badge: "Popular" },
  { id: "aiml", title: "AI/ML Engineer", desc: "Train generative AI models, configure embeddings, and deploy LLM agents.", badge: "High Demand" },
  { id: "datasci", title: "Data Scientist", desc: "Uncover predictive insights using statistical modeling, Python, and SQL." },
  { id: "software", title: "Software Developer", desc: "Master algorithms, clean architecture, and core systems programming." },
  { id: "cloud", title: "Cloud Engineer", desc: "Architect reliable multi-cloud systems with AWS, Kubernetes, and Docker." },
  { id: "cyber", title: "Cybersecurity Analyst", desc: "Protect enterprise architectures, conduct pentests, and verify compliance." },
  { id: "dataanalyst", title: "Data Analyst", desc: "Create dashboards, transform data pipelines, and power business intelligence." },
  { id: "webdev", title: "Web Developer", desc: "Craft pixel-perfect user interfaces with modern HTML, CSS, and JavaScript." },
  { id: "uiux", title: "UI/UX Designer", desc: "Design intuitive user journeys, wireframes, and production design systems." },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Full Stack Developer");
  const [educationLevel, setEducationLevel] = useState("Bachelor's Degree in CS/IT");
  const [currentSkills, setCurrentSkills] = useState("JavaScript, React, HTML/CSS, Git");
  const [dailyHours, setDailyHours] = useState("2");
  const [timelineMonths, setTimelineMonths] = useState("6");
  const [submitting, setSubmitting] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Trigger API to initialize roadmap
      const res = await fetch("/api/career/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: selectedRole,
          educationLevel,
          currentSkills,
          dailyHours: Number(dailyHours),
          timelineMonths: Number(timelineMonths),
        }),
      });

      toast.success(`Career Profile saved! Roadmap generated for ${selectedRole}.`);
      router.push("/career-roadmap");
    } catch (err) {
      toast.error("Failed to generate career path. Proceeding to dashboard.");
      router.push("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Badge variant="cyan" className="mb-2">Career Explorer & Intake</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Compass className="h-7 w-7 text-violet-400" />
            Define Your Target Career & Learning Horizon
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            We'll calibrate your curriculum, resume audit, and mock interview questions around this role.
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-8">
        {/* Role Selection Grid */}
        <div className="space-y-4">
          <Label className="text-base font-semibold text-white">1. Select Target Career Path</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CAREER_OPTIONS.map((role) => {
              const isSelected = selectedRole === role.title;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.title)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? "bg-violet-950/30 border-violet-500 shadow-md shadow-violet-500/10 ring-1 ring-violet-500"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-white text-base">{role.title}</h4>
                    {isSelected ? (
                      <div className="h-5 w-5 rounded-full bg-violet-600 text-white flex items-center justify-center">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    ) : role.badge ? (
                      <Badge variant="outline" className="text-[10px]">{role.badge}</Badge>
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{role.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* User Skills and Preferences */}
        <Card className="border-slate-800 bg-slate-900/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg">2. Background & Learning Commitment</CardTitle>
            <CardDescription>Accurate estimates ensure Gemini generates realistic milestone timelines.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="education" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-violet-400" />
                Current Education / Degree
              </Label>
              <Input
                id="education"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                placeholder="e.g. B.Tech Computer Science, 3rd Year"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills" className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" />
                Current Skills / Known Technologies
              </Label>
              <Input
                id="skills"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                placeholder="e.g. Python, SQL, C++, HTML"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyHours" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-400" />
                Available Daily Learning Time (Hours/day)
              </Label>
              <Input
                id="dailyHours"
                type="number"
                min="1"
                max="12"
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-400" />
                Target Readiness Timeline (Months)
              </Label>
              <Input
                id="timeline"
                type="number"
                min="1"
                max="24"
                value={timelineMonths}
                onChange={(e) => setTimelineMonths(e.target.value)}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-slate-800/80 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Skip to Dashboard
            </Button>

            <Button
              type="submit"
              variant="gradient"
              className="gap-2"
              disabled={submitting}
            >
              <Sparkles className="h-4 w-4" />
              {submitting ? "Synthesizing Personalized Roadmap..." : "Generate AI Career Path"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
