import { NextRequest, NextResponse } from "next/server";
import { generateRoadmapWithGemini } from "@/lib/gemini/service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      targetRole = "Full Stack Developer",
      educationLevel = "Bachelor's Degree",
      currentSkills = "JavaScript, React, HTML/CSS",
      dailyHours = 2,
      timelineMonths = 3,
    } = body;

    const roadmap = await generateRoadmapWithGemini({
      targetRole,
      educationLevel,
      currentSkills,
      dailyHours: Number(dailyHours),
      timelineMonths: Number(timelineMonths),
    });

    return NextResponse.json({
      success: true,
      data: roadmap,
    });
  } catch (error: any) {
    console.error("API /api/career/roadmap error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate roadmap." },
      { status: 500 }
    );
  }
}
