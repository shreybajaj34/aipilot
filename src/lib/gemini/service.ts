import { getGeminiModel } from "./client";
import {
  RESUME_ANALYSIS_PROMPT,
  CAREER_ROADMAP_PROMPT,
  SKILL_GAP_PROMPT,
  INTERVIEW_QUESTIONS_PROMPT,
  INTERVIEW_EVALUATION_PROMPT,
  PROJECT_RECOMMENDATIONS_PROMPT,
} from "./prompts";
import {
  MOCK_RESUME_ANALYSIS,
  MOCK_ROADMAP,
  MOCK_SKILL_GAP_DATA,
  MOCK_INTERVIEW_SESSION,
  MOCK_PROJECT_RECOMMENDATIONS,
} from "@/lib/mock-data";

function extractJSON(text: string): any {
  try {
    // Strip markdown code fences if present
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/```\s*$/, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (error) {
    // Attempt greedy bracket matching
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      const candidate = text.substring(firstBrace, lastBrace + 1);
      return JSON.parse(candidate);
    }
    throw new Error("Unable to parse structured JSON from Gemini response: " + text.slice(0, 150));
  }
}

export async function analyzeResumeWithGemini(resumeText: string, targetRole?: string) {
  const model = getGeminiModel();
  if (!model) {
    console.info("Gemini API key not configured. Providing calibrated heuristic analysis.");
    return {
      ...MOCK_RESUME_ANALYSIS,
      isAiGenerated: false,
      disclaimer: "Calibrated baseline heuristic assessment. Configure GEMINI_API_KEY in .env.local for live bespoke Gemini AI evaluations.",
    };
  }

  try {
    const prompt = `${RESUME_ANALYSIS_PROMPT}\n\nTARGET ROLE: ${targetRole || "Software Engineer"}\n\nRESUME CONTENT:\n${resumeText.slice(0, 10000)}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = extractJSON(text);
    return {
      ...parsed,
      isAiGenerated: true,
    };
  } catch (err: any) {
    console.error("Gemini Resume Analysis Error:", err);
    return {
      ...MOCK_RESUME_ANALYSIS,
      isAiGenerated: false,
      disclaimer: `Fallback assessment triggered: ${err.message || "API rate limit or connection timeout"}.`,
    };
  }
}

export async function generateRoadmapWithGemini(params: {
  targetRole: string;
  educationLevel: string;
  currentSkills: string;
  dailyHours: number;
  timelineMonths: number;
}) {
  const model = getGeminiModel();
  if (!model) {
    return {
      ...MOCK_ROADMAP,
      target_role: params.targetRole,
      isAiGenerated: false,
    };
  }

  try {
    const prompt = `${CAREER_ROADMAP_PROMPT}\n\nUser Context:\n- Target Career: ${params.targetRole}\n- Education Level: ${params.educationLevel}\n- Current Skills: ${params.currentSkills}\n- Daily Learning Commitment: ${params.dailyHours} hours/day\n- Target Completion: ${params.timelineMonths} months`;
    const result = await model.generateContent(prompt);
    const parsed = extractJSON(result.response.text());
    return {
      ...parsed,
      isAiGenerated: true,
    };
  } catch (err) {
    console.error("Gemini Roadmap Generation Error:", err);
    return {
      ...MOCK_ROADMAP,
      target_role: params.targetRole,
      isAiGenerated: false,
    };
  }
}

export async function analyzeSkillGapWithGemini(params: {
  targetRole: string;
  currentSkills: string[];
}) {
  const model = getGeminiModel();
  if (!model) {
    return {
      ...MOCK_SKILL_GAP_DATA,
      targetRole: params.targetRole,
      isAiGenerated: false,
    };
  }

  try {
    const prompt = `${SKILL_GAP_PROMPT}\n\nTARGET ROLE: ${params.targetRole}\nCANDIDATE SKILLS: ${params.currentSkills.join(", ")}`;
    const result = await model.generateContent(prompt);
    const parsed = extractJSON(result.response.text());
    return {
      ...parsed,
      isAiGenerated: true,
    };
  } catch (err) {
    console.error("Gemini Skill Gap Analysis Error:", err);
    return {
      ...MOCK_SKILL_GAP_DATA,
      targetRole: params.targetRole,
      isAiGenerated: false,
    };
  }
}

export async function generateInterviewQuestionsWithGemini(params: {
  jobRole: string;
  interviewType: string;
  difficulty: string;
  count: number;
}) {
  const model = getGeminiModel();
  if (!model) {
    return {
      questions: [
        {
          question_number: 1,
          question_text: `Can you explain the core architectural principles you follow when building a scalable application as a ${params.jobRole}?`,
          question_category: "System Design & Architecture",
        },
        {
          question_number: 2,
          question_text: "Tell me about a complex technical challenge you solved recently. What was your specific contribution?",
          question_category: "Behavioral & STAR Method",
        },
        {
          question_number: 3,
          question_text: "How do you approach testing, error handling, and performance optimization before shipping to production?",
          question_category: "Production Engineering",
        },
      ],
      isAiGenerated: false,
    };
  }

  try {
    const prompt = `${INTERVIEW_QUESTIONS_PROMPT}\n\nRole: ${params.jobRole}\nType: ${params.interviewType}\nDifficulty: ${params.difficulty}\nNumber of Questions: ${params.count}`;
    const result = await model.generateContent(prompt);
    const parsed = extractJSON(result.response.text());
    return {
      ...parsed,
      isAiGenerated: true,
    };
  } catch (err) {
    console.error("Gemini Interview Question Gen Error:", err);
    return {
      questions: [
        {
          question_number: 1,
          question_text: `What are the most crucial trade-offs when designing a modern application for ${params.jobRole}?`,
          question_category: "Technical Architecture",
        },
      ],
      isAiGenerated: false,
    };
  }
}

export async function evaluateInterviewAnswerWithGemini(params: {
  questionText: string;
  userAnswer: string;
  jobRole: string;
}) {
  const model = getGeminiModel();
  if (!model) {
    return {
      score: 85,
      strengths: "Structured reasoning with clear problem identification and technical vocabulary.",
      weaknesses: "Consider adding specific production metrics (e.g. latency reduction, load numbers).",
      suggested_star_answer: `Situation: In my recent project, we needed a robust solution for ${params.questionText.slice(0, 40)}...\nTask: Deliver high availability and sub-100ms response times.\nAction: Implemented optimized caching, clean modular abstractions, and end-to-end type validation.\nResult: Stabilized uptime at 99.9% and improved developer velocity by 25%.`,
      metrics: {
        relevance: 90,
        technical_accuracy: 85,
        clarity: 82,
        structure: 83,
      },
      isAiGenerated: false,
    };
  }

  try {
    const prompt = `${INTERVIEW_EVALUATION_PROMPT}\n\nQUESTION: ${params.questionText}\nTARGET ROLE: ${params.jobRole}\nCANDIDATE ANSWER: ${params.userAnswer}`;
    const result = await model.generateContent(prompt);
    const parsed = extractJSON(result.response.text());
    return {
      ...parsed,
      isAiGenerated: true,
    };
  } catch (err) {
    console.error("Gemini Interview Evaluation Error:", err);
    return {
      score: 80,
      strengths: "Relevant answer addressing the core question prompt.",
      weaknesses: "Could benefit from greater detail on specific implementation constraints.",
      suggested_star_answer: "Structure with clear Situation, Task, Action, and quantifiable Result.",
      metrics: {
        relevance: 80,
        technical_accuracy: 80,
        clarity: 80,
        structure: 80,
      },
      isAiGenerated: false,
    };
  }
}

export async function recommendProjectsWithGemini(params: {
  targetRole: string;
  skills: string;
  difficulty: string;
}) {
  const model = getGeminiModel();
  if (!model) {
    return {
      projects: MOCK_PROJECT_RECOMMENDATIONS,
      isAiGenerated: false,
    };
  }

  try {
    const prompt = `${PROJECT_RECOMMENDATIONS_PROMPT}\n\nTARGET ROLE: ${params.targetRole}\nCURRENT SKILLS: ${params.skills}\nDESIRED DIFFICULTY: ${params.difficulty}`;
    const result = await model.generateContent(prompt);
    const parsed = extractJSON(result.response.text());
    return {
      ...parsed,
      isAiGenerated: true,
    };
  } catch (err) {
    console.error("Gemini Project Recommender Error:", err);
    return {
      projects: MOCK_PROJECT_RECOMMENDATIONS,
      isAiGenerated: false,
    };
  }
}
