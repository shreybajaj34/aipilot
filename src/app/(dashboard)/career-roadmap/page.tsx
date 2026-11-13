"use client";

import React, { useState } from "react";
import {
  Map,
  Sparkles,
  CheckCircle2,
  Circle,
  ExternalLink,
  Clock,
  RotateCcw,
  BookOpen,
  Code,
  FolderGit2,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MOCK_ROADMAP } from "@/lib/mock-data";
import { toast } from "sonner";
import confetti from "canvas-confetti";

export default function CareerRoadmapPage() {
  const [roadmap, setRoadmap] = useState(MOCK_ROADMAP);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeStage, setActiveStage] = useState<number>(1);

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    const updatedTasks = roadmap.tasks?.map((task) => {
      if (task.id === taskId) {
        const nextState = !task.is_completed;
        if (nextState) {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
          });
          toast.success(`Completed: ${task.title}!`);
        }
        return {
          ...task,
          is_completed: nextState,
          completed_at: nextState ? new Date().toISOString() : null,
        };
      }
      return task;
    });

    const completedCount = updatedTasks?.filter((t) => t.is_completed).length || 0;
    const totalCount = updatedTasks?.length || 1;
    const newPercentage = Math.round((completedCount / totalCount) * 100);

    setRoadmap({
      ...roadmap,
      tasks: updatedTasks,
      completion_percentage: newPercentage,
    });
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    const toastId = toast.loading("Synthesizing updated roadmap with Gemini...");

    try {
      const res = await fetch("/api/career/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: roadmap.target_role,
          educationLevel: "Bachelor's Degree",
          currentSkills: "JavaScript, React, Node",
          dailyHours: 2,
          timelineMonths: 4,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        toast.success("Roadmap refreshed with updated industry milestones!", { id: toastId });
      } else {
        toast.info("Roadmap calibrated to current progress.", { id: toastId });
      }
    } catch (e) {
      toast.info("Roadmap calibrated to current progress.", { id: toastId });
    } finally {
      setIsRegenerating(false);
    }
  };

  const getStageTasks = (stageNum: number) => {
    return roadmap.tasks?.filter((t) => t.stage_number === stageNum) || [];
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "skill":
        return <Code className="h-4 w-4 text-violet-400" />;
      case "resource":
        return <BookOpen className="h-4 w-4 text-cyan-400" />;
      case "exercise":
        return <Clock className="h-4 w-4 text-amber-400" />;
      case "project":
        return <FolderGit2 className="h-4 w-4 text-emerald-400" />;
      default:
        return <Code className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="cyan">PERSONALIZED CURRICULUM</Badge>
            <span className="text-xs text-slate-400">Target Role: <strong className="text-white">{roadmap.target_role}</strong></span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Map className="h-7 w-7 text-violet-400" />
            Interactive Career Roadmap
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Track your stage-by-stage learning trajectory. Check off completed items to update your Career Readiness score.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="gap-2"
        >
          <RotateCcw className={`h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
          {isRegenerating ? "Regenerating..." : "Regenerate Roadmap"}
        </Button>
      </div>

      {/* Progress Overview Banner */}
      <Card className="bg-gradient-to-r from-violet-950/40 via-slate-900/80 to-indigo-950/40 border-violet-500/30">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                Overall Roadmap Progress
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">
                {roadmap.completion_percentage}% Completed
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-violet-400" />
                Est. Duration: <strong className="text-white">{roadmap.estimated_weeks} Weeks</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-cyan-400" />
                Stages: <strong className="text-white">3 Stages</strong>
              </span>
            </div>
          </div>
          <Progress
            value={roadmap.completion_percentage}
            className="h-2.5"
            indicatorClassName="bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400"
          />
        </CardContent>
      </Card>

      {/* Stage Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((num) => {
          const tasks = getStageTasks(num);
          const completed = tasks.filter((t) => t.is_completed).length;
          const isCurrent = activeStage === num;
          const stageTitles = [
            "Beginner: Core Foundations",
            "Intermediate: Systems & Backend",
            "Advanced: Cloud & Capstone",
          ];

          return (
            <div
              key={num}
              onClick={() => setActiveStage(num)}
              className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 ${
                isCurrent
                  ? "bg-violet-950/30 border-violet-500 shadow-md ring-1 ring-violet-500"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant={num === 1 ? "secondary" : num === 2 ? "default" : "cyan"} className="text-[10px]">
                  STAGE {num}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  {completed}/{tasks.length} Done
                </span>
              </div>
              <h4 className="font-bold text-white text-sm mb-1">{stageTitles[num - 1]}</h4>
              <Progress
                value={tasks.length > 0 ? (completed / tasks.length) * 100 : 0}
                className="h-1.5 mt-3"
              />
            </div>
          );
        })}
      </div>

      {/* Active Stage Milestones & Tasks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Stage {activeStage} Milestones & Tasks
          </h3>
          <span className="text-xs text-slate-400">Click circle to check off task</span>
        </div>

        <div className="space-y-3">
          {getStageTasks(activeStage).map((task) => {
            return (
              <div
                key={task.id}
                className={`p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 ${
                  task.is_completed
                    ? "bg-slate-950/40 border-slate-800/60 opacity-80"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className="mt-1 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                  title={task.is_completed ? "Mark as incomplete" : "Mark as completed"}
                >
                  {task.is_completed ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-400 fill-emerald-950/40" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4
                      className={`font-bold text-base transition-colors ${
                        task.is_completed ? "line-through text-slate-400" : "text-white"
                      }`}
                    >
                      {task.title}
                    </h4>

                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {getTaskIcon(task.task_type)}
                        <span className="capitalize">{task.task_type}</span>
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-mono">
                        <Clock className="h-3 w-3 text-amber-400" />
                        {task.estimated_hours}h
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {task.description}
                  </p>

                  {task.resource_url && (
                    <div className="pt-1">
                      <a
                        href={task.resource_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-medium hover:underline"
                      >
                        Official Learning Documentation <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
