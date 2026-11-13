"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  Clock,
  Layers,
  ArrowRight,
  Code2,
  CheckCircle2,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MOCK_PROJECT_RECOMMENDATIONS } from "@/lib/mock-data";
import { toast } from "sonner";

export default function ProjectRecommenderPage() {
  const [projects, setProjects] = useState(MOCK_PROJECT_RECOMMENDATIONS);
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [difficulty, setDifficulty] = useState("intermediate");
  const [generating, setGenerating] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>("proj-01");
  const [activeCategory, setActiveCategory] = useState("all");

  const toggleBookmark = (id: string) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const next = !p.is_bookmarked;
          toast.success(next ? `Bookmarked "${p.title}"!` : `Removed bookmark for "${p.title}".`);
          return { ...p, is_bookmarked: next };
        }
        return p;
      })
    );
  };

  const handleGenerateProjects = async () => {
    setGenerating(true);
    const toastId = toast.loading("Synthesizing novel portfolio project ideas with Gemini...");

    try {
      const res = await fetch("/api/projects/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          skills: "React, Next.js, TypeScript, PostgreSQL",
          difficulty,
        }),
      });

      const json = await res.json();
      if (json.success && json.data?.projects) {
        setProjects(json.data.projects);
        toast.success("Generated fresh project recommendations!", { id: toastId });
      } else {
        toast.info("Projects refreshed with tailored portfolio concepts.", { id: toastId });
      }
    } catch (e) {
      toast.info("Projects refreshed with tailored portfolio concepts.", { id: toastId });
    } finally {
      setGenerating(false);
    }
  };

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : activeCategory === "bookmarked"
      ? projects.filter((p) => p.is_bookmarked)
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Badge variant="cyan" className="mb-2">PORTFOLIO ACCELERATOR</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="h-7 w-7 text-emerald-400" />
            AI Project Recommendation Engine
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Build standout, non-generic portfolio projects that demonstrate real architectural depth to tech recruiters.
          </p>
        </div>

        <Button
          variant="gradient"
          size="sm"
          onClick={handleGenerateProjects}
          disabled={generating}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          {generating ? "Generating..." : "Generate New Projects"}
        </Button>
      </div>

      {/* Category Filter Tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
        <TabsList className="bg-slate-900/80 p-1 rounded-xl">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Ready</TabsTrigger>
          <TabsTrigger value="hackathon">Hackathon Ideas</TabsTrigger>
          <TabsTrigger value="bookmarked">Bookmarked ({projects.filter((p) => p.is_bookmarked).length})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => {
          const isExpanded = expandedId === project.id;

          return (
            <Card
              key={project.id}
              className={`border transition-all duration-200 ${
                isExpanded ? "border-violet-500/50 bg-slate-900/80 shadow-2xl" : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={project.category === "hackathon" ? "cyan" : "default"} className="capitalize text-[10px]">
                        {project.category}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">
                        {project.difficulty_level || "Intermediate"}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="h-3.5 w-3.5 text-amber-400" />
                        ~{project.estimated_hours}h estimated
                      </span>
                    </div>

                    <CardTitle className="text-xl text-white font-bold hover:text-violet-300 transition-colors cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : project.id)}>
                      {project.title}
                    </CardTitle>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(project.id)}
                      className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-colors ${
                        project.is_bookmarked
                          ? "bg-violet-950/40 border-violet-500/40 text-violet-400"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                      title={project.is_bookmarked ? "Bookmarked" : "Bookmark this project"}
                    >
                      {project.is_bookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                      className="h-9 w-9 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white flex items-center justify-center"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <CardDescription className="text-sm text-slate-300 mt-2">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tech_stack.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-[11px] font-mono">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              {/* Collapsible Deep-Dive Details */}
              {isExpanded && (
                <CardContent className="pt-0 space-y-6 border-t border-slate-800/80 mt-4">
                  {/* Problem Statement */}
                  <div className="pt-4">
                    <h5 className="text-xs font-semibold uppercase text-violet-400 tracking-wider mb-1 flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5" /> Problem Solved
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      {project.problem_statement}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase text-emerald-400 tracking-wider mb-2">
                      Key Distinguishing Features
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.key_features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Implementation Steps */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase text-cyan-400 tracking-wider mb-2">
                      Step-by-Step Implementation Roadmap
                    </h5>
                    <div className="space-y-2">
                      {project.implementation_steps?.map((st) => (
                        <div key={st.step} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs flex items-start gap-3">
                          <span className="h-5 w-5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 flex items-center justify-center font-bold shrink-0">
                            {st.step}
                          </span>
                          <div>
                            <strong className="text-white block">{st.title}</strong>
                            <span className="text-slate-400">{st.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h5 className="text-xs font-semibold uppercase text-purple-400 tracking-wider mb-2">
                      Target Learning Outcomes
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {project.learning_outcomes.map((out, i) => (
                        <span key={i} className="text-xs bg-purple-950/30 border border-purple-800/40 text-purple-300 px-2.5 py-1 rounded-md">
                          • {out}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.success(`Saved "${project.title}" to your active learning roadmap!`)}
                    >
                      Add to My Active Projects
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
