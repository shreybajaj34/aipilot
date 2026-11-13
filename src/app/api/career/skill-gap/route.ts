import { NextRequest, NextResponse } from "next/server";
import { analyzeSkillGapWithGemini } from "@/lib/gemini/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { targetRole = "Full Stack Developer", currentSkills = [] } = body;

    const analysis = await analyzeSkillGapWithGemini({
      targetRole,
      currentSkills: Array.isArray(currentSkills) ? currentSkills : [currentSkills],
    });

    return NextResponse.json({
      success: true,
      data: analysis,
    });
  } catch (error: any) {
    console.error("API /api/career/skill-gap error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze skill gaps." },
      { status: 500 }
    );
  }
}
