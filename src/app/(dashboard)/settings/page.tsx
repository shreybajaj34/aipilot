"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Settings,
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Shield,
  Key,
  Save,
  LogOut,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MOCK_USER_PROFILE } from "@/lib/mock-data";
import { toast } from "sonner";

export default function SettingsPage() {
  const [profile, setProfile] = useState(MOCK_USER_PROFILE);
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Profile preferences updated successfully!");
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <Badge variant="cyan" className="mb-2">ACCOUNT & PREFERENCES</Badge>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Settings className="h-7 w-7 text-slate-400" />
            Profile & Integration Settings
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal credentials, career targets, and AI backend configuration.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card */}
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-900/60">
            <CardContent className="p-6 text-center space-y-4">
              <div className="relative inline-block">
                <img
                  src={profile.avatar_url || ""}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full mx-auto object-cover border-2 border-violet-500/50 shadow-xl"
                />
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{profile.full_name}</h3>
                <p className="text-xs text-slate-400">{profile.email}</p>
              </div>
              <Badge variant="default" className="text-xs">
                Candidate Account
              </Badge>

              <div className="border-t border-slate-800/80 pt-4 text-xs text-slate-400 space-y-2 text-left">
                <div className="flex justify-between">
                  <span>Target Role:</span>
                  <strong className="text-white">Full Stack Developer</strong>
                </div>
                <div className="flex justify-between">
                  <span>Member Since:</span>
                  <strong className="text-white">October 2024</strong>
                </div>
                <div className="flex justify-between">
                  <span>RLS Security:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Enforced
                  </span>
                </div>
              </div>

              <Link href="/login" className="block pt-2">
                <Button variant="outline" size="sm" className="w-full text-red-400 hover:text-red-300 hover:bg-red-950/20 gap-2 border-red-900/30">
                  <LogOut className="h-4 w-4" /> Sign Out
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Environment Status */}
          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Key className="h-4 w-4 text-cyan-400" /> System Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Google Gemini API</span>
                <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Ready
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Supabase Auth & RLS</span>
                <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Connected
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Web Speech Engine</span>
                <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Supported
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Editable Profile Information */}
        <div className="lg:col-span-2">
          <Card className="border-slate-800 bg-slate-900/60">
            <form onSubmit={handleSave}>
              <CardHeader>
                <CardTitle className="text-lg">Edit Personal Profile</CardTitle>
                <CardDescription>
                  Keep your background details up to date for precise AI recommendations:
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      value={profile.full_name || ""}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email || ""}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Input
                      id="education"
                      value={profile.education_level || ""}
                      onChange={(e) => setProfile({ ...profile, education_level: e.target.value })}
                      placeholder="e.g. B.S. in Computer Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Current Role / Status</Label>
                    <Input
                      id="role"
                      value={profile.current_role || ""}
                      onChange={(e) => setProfile({ ...profile, current_role: e.target.value })}
                      placeholder="e.g. Student / Job Seeker"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      max="30"
                      value={profile.years_of_experience || 0}
                      onChange={(e) =>
                        setProfile({ ...profile, years_of_experience: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex justify-end border-t border-slate-800/80 pt-6">
                <Button type="submit" variant="gradient" disabled={saving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {saving ? "Saving Changes..." : "Save Profile"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
