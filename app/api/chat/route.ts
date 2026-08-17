import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are CareerOS AI Coach — a friendly, expert career advisor specialized in helping software engineers and tech professionals grow their careers.

You help users with:
- Career roadmaps and learning paths
- Interview preparation (technical + behavioral)
- Resume and LinkedIn profile optimization
- Salary negotiation strategies
- Job search strategies
- Skill gap analysis and upskilling advice
- FAANG and top-tech company preparation

Tone: Encouraging, professional, concise, and actionable. Use bullet points and structure when helpful.
Always tailor advice to a software engineering / tech context unless specified otherwise.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history (exclude the last user message since it's passed separately)
    const chatHistory = (history || []).map(
      (msg: { role: string; text: string }) => ({
        role: msg.role === "ai" ? "model" : "user",
        parts: [{ text: msg.text }],
      })
    );

    const chat = model.startChat({ history: chatHistory });

    // Use streaming
    const result = await chat.sendMessageStream(message);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: unknown) {
    console.error("[Chat API Error]", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
