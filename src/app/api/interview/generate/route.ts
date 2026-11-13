import { NextRequest, NextResponse } from "next/server";
import { generateInterviewQuestionsWithGemini } from "@/lib/gemini/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobRole = "Software Engineer",
      interviewType = "technical",
      difficulty = "entry",
      count = 3,
    } = body;

    const result = await generateInterviewQuestionsWithGemini({
      jobRole,
      interviewType,
      difficulty,
      count: Number(count),
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("API /api/interview/generate error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate interview questions." },
      { status: 500 }
    );
  }
}
