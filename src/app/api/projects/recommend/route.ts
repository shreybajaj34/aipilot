import { NextRequest, NextResponse } from "next/server";
import { recommendProjectsWithGemini } from "@/lib/gemini/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      targetRole = "Full Stack Developer",
      skills = "React, TypeScript, Node.js",
      difficulty = "intermediate",
    } = body;

    const result = await recommendProjectsWithGemini({
      targetRole,
      skills,
      difficulty,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error("API /api/projects/recommend error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to recommend projects." },
      { status: 500 }
    );
  }
}
