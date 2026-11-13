import { NextResponse } from "next/server";
import {
  MOCK_RESUME_ANALYSIS,
  MOCK_ROADMAP,
  MOCK_SKILL_GAP_DATA,
  MOCK_INTERVIEW_SESSION,
  MOCK_PROJECT_RECOMMENDATIONS,
  MOCK_PROGRESS_HISTORY,
} from "@/lib/mock-data";

export async function GET() {
  try {
    // Calculates composite Career Readiness Index:
    // Resume Score (30%) + Skill Match (30%) + Roadmap Completion (25%) + Mock Interview (15%)
    const resumeScore = MOCK_RESUME_ANALYSIS.overall_score; // 82
    const skillMatch = MOCK_SKILL_GAP_DATA.matchPercentage; // 74
    const roadmapCompletion = MOCK_ROADMAP.completion_percentage; // 58
    const interviewScore = MOCK_INTERVIEW_SESSION.overall_score || 80; // 84

    const careerReadinessIndex = Math.round(
      resumeScore * 0.3 +
      skillMatch * 0.3 +
      roadmapCompletion * 0.25 +
      interviewScore * 0.15
    );

    return NextResponse.json({
      success: true,
      data: {
        readinessScore: careerReadinessIndex,
        resumeScore,
        atsScore: MOCK_RESUME_ANALYSIS.ats_compatibility_score,
        skillCoverage: skillMatch,
        roadmapProgress: roadmapCompletion,
        mockInterviewAverage: interviewScore,
        completedTasksCount: MOCK_ROADMAP.tasks?.filter((t) => t.is_completed).length || 0,
        totalTasksCount: MOCK_ROADMAP.tasks?.length || 0,
        bookmarkedProjectsCount: MOCK_PROJECT_RECOMMENDATIONS.filter((p) => p.is_bookmarked).length,
        progressHistory: MOCK_PROGRESS_HISTORY,
        nextBestAction: {
          title: "Complete Stage 2 Backend Security Task",
          description: "Finish the PostgreSQL Row Level Security practice task to boost your Readiness Score by +4%.",
          link: "/career-roadmap",
          buttonText: "Resume Learning",
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load dashboard metrics." },
      { status: 500 }
    );
  }
}
