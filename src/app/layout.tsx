import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI CareerPilot — Navigate Your Career. Powered by AI.",
  description:
    "Competition-grade AI career guidance platform for college students, freshers, and job seekers. Discover opportunities, analyze resumes, identify skill gaps, and prepare for interviews.",
  keywords: [
    "AI Career Guidance",
    "Resume Analyzer",
    "ATS Score",
    "Mock Interview AI",
    "Skill Gap Analysis",
    "Learning Roadmap",
  ],
  authors: [{ name: "AI CareerPilot Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors theme="dark" />
      </body>
    </html>
  );
}
