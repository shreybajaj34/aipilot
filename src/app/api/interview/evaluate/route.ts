import { NextRequest, NextResponse } from "next/server";
import { evaluateInterviewAnswerWithGemini } from "@/lib/gemini/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { questionText = "", userAnswer = "", jobRole = "Software Engineer" } = body;

    if (!userAnswer || userAnswer.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a complete answer for evaluation." },
        { status: 400 }
      );
    }

    const evaluation = await evaluateInterviewAnswerWithGemini({
      questionText,
      userAnswer,
      jobRole,
    });

    return NextResponse.json({
      success: true,
      data: evaluation,
    });
  } catch (error: any) {
    console.error("API /api/interview/evaluate error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to evaluate answer." },
      { status: 500 }
    );
  }
}
