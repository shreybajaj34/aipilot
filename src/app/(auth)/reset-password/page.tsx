"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrainCircuit, Mail, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      setSubmitted(true);
      toast.success("Password reset instructions dispatched!");
    } catch (err: any) {
      toast.error(err.message || "Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080c14] p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-md shadow-violet-500/25">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">AI CareerPilot</span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
          <p className="text-sm text-slate-400 mt-1">We'll email you a secure recovery link</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/70 backdrop-blur-xl">
          {submitted ? (
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Check Your Inbox</h3>
              <p className="text-sm text-slate-300">
                If an account exists for <span className="font-semibold text-white">{email}</span>, you will receive password reset instructions shortly.
              </p>
              <Link href="/login" className="block pt-2">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to Login
                </Button>
              </Link>
            </CardContent>
          ) : (
            <form onSubmit={handleReset}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg">Account Recovery</CardTitle>
                <CardDescription>Enter the email associated with your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9"
                    />
                  </div>
                </div>

                <Button type="submit" variant="gradient" className="w-full gap-2 mt-2" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
              <CardFooter className="flex justify-center border-t border-slate-800/80 pt-4">
                <Link href="/login" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
                </Link>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
