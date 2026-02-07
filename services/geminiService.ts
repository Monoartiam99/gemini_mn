import { GoogleGenAI, Type } from "@google/genai";
import { ReviewType, FileFormat } from "../types";
import { validateCodeFormat } from "../utils/formatDetection";

export async function reviewCode(code: string, type: ReviewType, format: FileFormat = FileFormat.JAVASCRIPT) {
  // Validate that code format matches selected format
  const validation = validateCodeFormat(code, format);
  if (!validation.isValid) {
    throw new Error(validation.message || `Invalid code format: Please provide ${format} code`);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `
    You are a world-class senior software engineer and security auditor. 
    Analyze the provided ${format} code for ${type} improvements.
    Output your response in valid JSON format only.
    Do NOT include any markdown formatting or backticks around the JSON.
    Structure:
    {
      "summary": "Overall summary of the code quality",
      "score": 85,
      "issues": [
        {
          "severity": "critical" | "warning" | "info",
          "title": "Short title of the issue",
          "description": "Detailed explanation",
          "suggestion": "How to fix it (in ${format})"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Code to review:\n\n${code}`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            score: { type: Type.NUMBER },
            issues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  severity: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  suggestion: { type: Type.STRING }
                },
                required: ["severity", "title", "description", "suggestion"]
              }
            }
          },
          required: ["summary", "score", "issues"]
        }
      },
    });

    let text = response.text || "{}";
    // Robust parsing: strip potential markdown code block decorators
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const result = JSON.parse(text);
    return result;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const message = error?.message || "Internal Analysis Error";
    throw new Error(`Audit Failed: ${message}`);
  }
}
