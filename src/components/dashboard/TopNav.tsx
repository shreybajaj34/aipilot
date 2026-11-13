"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Sparkles,
  Menu,
  X,
  User,
  ShieldCheck,
  Compass,
  FileText,
  Mic,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";

export function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Command Center";
      case "/resume-analyzer":
        return "AI Resume Analyzer & ATS Audit";
      case "/onboarding":
        return "Career Profile & Explorer";
      case "/skill-gap":
        return "Skill Gap & Competency Matrix";
      case "/career-roadmap":
        return "Personalized Learning Roadmap";
      case "/mock-interview":
        return "AI Mock Interview Simulator";
      case "/project-recommender":
        return "Portfolio Project Recommender";
      case "/progress":
        return "Analytics & Progress Tracking";
      case "/settings":
        return "Account Settings & Preferences";
      default:
        return "AI CareerPilot";
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-4 md:px-8 backdrop-blur-xl">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div>
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            {getPageTitle()}
          </h1>
          <p className="hidden sm:block text-xs text-slate-400">
            Targeting: <span className="text-violet-400 font-medium">Full Stack Developer</span>
          </p>
        </div>
      </div>

      {/* Right: Quick actions, notifications, user avatar */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gemini Intelligence Online</span>
        </div>

        <Link href="/resume-analyzer">
          <Button size="sm" variant="gradient" className="gap-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Upload Resume</span>
          </Button>
        </Link>

        {/* User profile button */}
        <Link
          href="/settings"
          className="flex items-center gap-2 rounded-full p-1 border border-slate-800 hover:border-violet-500/50 bg-slate-900 transition-colors"
        >
          <img
            src={MOCK_USER_PROFILE.avatar_url || ""}
            alt="User avatar"
            className="h-8 w-8 rounded-full object-cover"
          />
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-950 border-b border-slate-800 p-4 space-y-2 shadow-2xl z-50">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Overview
          </Link>
          <Link
            href="/resume-analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Resume Analyzer
          </Link>
          <Link
            href="/skill-gap"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Skill Gap Analyzer
          </Link>
          <Link
            href="/career-roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Learning Roadmap
          </Link>
          <Link
            href="/mock-interview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Mock Interview
          </Link>
          <Link
            href="/project-recommender"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Project Recommender
          </Link>
          <Link
            href="/progress"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Progress Tracker
          </Link>
          <Link
            href="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Settings
          </Link>
        </div>
      )}
    </header>
  );
}
