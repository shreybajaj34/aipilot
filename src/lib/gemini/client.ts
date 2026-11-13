import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Default model to Gemini 1.5 Flash (fast, economical, structured JSON support) or Gemini 1.5 Pro
export const getGeminiModel = (modelName: string = "gemini-1.5-flash") => {
  if (!genAI) {
    return null;
  }
  return genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.3,
      topP: 0.85,
    },
  });
};
