"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center p-4 text-center">
      <div className="h-14 w-14 rounded-2xl bg-red-950/40 border border-red-800/40 text-red-400 flex items-center justify-center mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
      <p className="text-sm text-slate-400 max-w-md mb-6">
        {error.message || "An unexpected error occurred while loading this module."}
      </p>
      <Button variant="outline" onClick={() => reset()} className="gap-2">
        <RotateCcw className="h-4 w-4" /> Try Again
      </Button>
    </div>
  );
}
