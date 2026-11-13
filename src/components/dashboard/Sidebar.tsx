"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Compass,
  Radar,
  Map,
  Mic,
  FolderGit2,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Resume Analyzer", href: "/resume-analyzer", icon: FileText, badge: "AI" },
  { label: "Career Explorer", href: "/onboarding", icon: Compass },
  { label: "Skill Gap", href: "/skill-gap", icon: Radar },
  { label: "Learning Roadmap", href: "/career-roadmap", icon: Map },
  { label: "Mock Interview", href: "/mock-interview", icon: Mic, badge: "Voice" },
  { label: "Project Recommender", href: "/project-recommender", icon: FolderGit2 },
  { label: "My Progress", href: "/progress", icon: TrendingUp },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all duration-300 z-30 select-none",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/80">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-md shadow-violet-500/25">
            <BrainCircuit className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col transition-opacity duration-200">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                AI CareerPilot
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  PRO
                </span>
              </span>
              <span className="text-xs text-slate-400">Career Intelligence</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 relative",
                isActive
                  ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-white border border-violet-500/30 shadow-sm"
                  : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-violet-500 shadow-glow" />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-violet-400" : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* AI Assistant Banner */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-violet-950/40 to-slate-900/90 border border-violet-500/20 text-xs">
          <div className="flex items-center gap-2 text-violet-300 font-semibold mb-1">
            <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
            Gemini 1.5 Pro Enabled
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Personalized ATS auditing & interactive interview coaching active.
          </p>
        </div>
      )}

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-slate-800/80">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
