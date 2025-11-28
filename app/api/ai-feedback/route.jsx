import { NextResponse } from "next/server";
import OpenAI from "openai";

const FEEDBACK_PROMPT = `
You are an AI Interview Evaluator.
Analyze the following conversation and give structured JSON feedback.

Conversation:
{{conversation}}

Return JSON with:
{
  "feedback": {
    "rating": {
      "technicalSkills": <number>,
      "communication": <number>,
      "problemSolving": <number>,
      "experience": <number>
    },
    "summary": "<3 line summary>",
    "recommendation": "<Yes/No>",
    "recommendationMsg": "<short message>"
  }
}
`;

export async function POST(req) {
  try {
    const body = await req.json();
    const conversation = body.conversation || [];

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation, null, 2)
    );

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // 🔥 Correct OpenRouter API Call
    const response = await client.responses.create({
      model: "openai/gpt-4o-mini", // ✔ working OpenRouter model
      input: FINAL_PROMPT,
    });

    const result = response.output_text;

    return NextResponse.json({ content: result });
  } catch (e) {
    console.error("AI Feedback Error:", e);
    return NextResponse.json(
      { error: e?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
