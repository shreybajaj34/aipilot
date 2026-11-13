import Link from "next/link";
import { BrainCircuit, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col items-center justify-center p-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-xl shadow-violet-500/25 mb-6">
        <BrainCircuit className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-6xl font-black text-white tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-200 mb-2">Waypoint Not Found</h2>
      <p className="text-sm text-slate-400 max-w-sm mb-6">
        The career module or resource you are navigating to does not exist or has moved.
      </p>
      <Link href="/dashboard">
        <Button variant="gradient" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Return to Command Center
        </Button>
      </Link>
    </div>
  );
}
