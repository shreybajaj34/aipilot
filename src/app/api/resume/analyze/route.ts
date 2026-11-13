import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeWithGemini } from "@/lib/gemini/service";

export const maxDuration = 60; // 60 seconds max timeout for AI analysis

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let resumeText = "";
    let targetRole = "Software Engineer";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      targetRole = (formData.get("targetRole") as string) || "Software Engineer";

      if (!file) {
        return NextResponse.json({ error: "No resume file provided." }, { status: 400 });
      }

      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "File exceeds 5MB size limit." }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        try {
          // Dynamic import of pdf-parse to avoid edge runtime issues
          const pdfParse = (await import("pdf-parse")).default;
          const parsedPdf = await pdfParse(buffer);
          resumeText = parsedPdf.text;
        } catch (pdfErr) {
          console.warn("Direct PDF parsing error, attempting textual decode:", pdfErr);
          resumeText = buffer.toString("utf-8");
        }
      } else {
        resumeText = buffer.toString("utf-8");
      }
    } else {
      const body = await req.json();
      resumeText = body.text || "";
      targetRole = body.targetRole || "Software Engineer";
    }

    if (!resumeText || resumeText.trim().length < 40) {
      return NextResponse.json(
        { error: "Insufficient readable text extracted from resume. Please ensure the document is not an image-only scan." },
        { status: 400 }
      );
    }

    const analysis = await analyzeResumeWithGemini(resumeText, targetRole);

    return NextResponse.json({
      success: true,
      data: analysis,
      textLength: resumeText.length,
    });
  } catch (error: any) {
    console.error("API /api/resume/analyze error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume. Please try again." },
      { status: 500 }
    );
  }
}
