import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL; // prefer env override; otherwise we'll pick one via API
const MAX_HISTORY_MESSAGES = 6;
const MAX_HISTORY_CHARS = 3200;
const MODEL_TOKEN_LIMIT = Number(process.env.GEMINI_MAX_TOKENS) || 4096;
const SAFETY_MARGIN_TOKENS = 64; // reserve a small buffer

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

function normalizeHistoryEntry(msg: unknown) {
  if (!msg || typeof msg !== "object") return null;

  const item = msg as { role?: unknown; text?: unknown };
  const text = typeof item.text === "string" ? item.text.trim() : "";
  const role = item.role === "ai" ? "Assistant" : "User";

  if (!text) return null;

  return { role, text: text.replace(/\s+/g, " ").slice(0, 800) };
}

function estimateTokens(text: string) {
  // Rough heuristic: ~4 characters per token (conservative).
  return Math.max(1, Math.ceil(text.length / 4));
}

function buildConversationPrompt(history: unknown, message: string, maxOutputTokens: number) {
  const lines: string[] = [SYSTEM_PROMPT];

  if (Array.isArray(history)) {
    let recentHistory = history.map(normalizeHistoryEntry).filter(Boolean).slice(-MAX_HISTORY_MESSAGES) as Array<{ role: string; text: string }>;

    // Precompute tokens for fixed parts
    const systemTokens = estimateTokens(SYSTEM_PROMPT);
    const userTokens = estimateTokens(message.trim());

    // Start with joining all recent history, then trim oldest entries until token budget fits
    let historyText = recentHistory.map((entry) => `${entry.role}: ${entry.text}`).join("\n");

    // Enforce char cap as a fast-path
    if (historyText.length > MAX_HISTORY_CHARS) {
      historyText = historyText.slice(historyText.length - MAX_HISTORY_CHARS);
    }

    let historyTokens = estimateTokens(historyText);

    const allowedContextTokens = Math.max(0, MODEL_TOKEN_LIMIT - maxOutputTokens - SAFETY_MARGIN_TOKENS - systemTokens - userTokens);

    // If history exceeds allowed tokens, drop oldest entries until it fits
    while (historyTokens > allowedContextTokens && recentHistory.length > 0) {
      recentHistory.shift();
      historyText = recentHistory.map((entry) => `${entry.role}: ${entry.text}`).join("\n");
      if (historyText.length > MAX_HISTORY_CHARS) {
        historyText = historyText.slice(historyText.length - MAX_HISTORY_CHARS);
      }
      historyTokens = estimateTokens(historyText);
    }

    if (historyText.trim()) {
      lines.push("\nRecent conversation:\n" + historyText);
    }
  }

  lines.push(`\nUser: ${message.trim()}`);

  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured. Set GEMINI_API_KEY in your environment." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Allow a slightly larger response while keeping total tokens within model limits.
    const desiredMaxOutputTokens = 384;
    const prompt = buildConversationPrompt(history, message, desiredMaxOutputTokens);

    const modelToUse = GEMINI_MODEL || "gemini-2.5-flash";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelToUse)}:generateContent?key=${encodeURIComponent(
      GEMINI_API_KEY
    )}`;
    const body = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: desiredMaxOutputTokens,
        temperature: 0.7,
      },
    } as any;

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await resp.json().catch(() => null);
    if (!resp.ok) {
      const errText = json?.error?.message || json?.message || resp.statusText || "Unknown error from Gemini API";
      console.error("[Chat API] Gemini API error:", resp.status, errText, json);
      if (resp.status === 404) {
        return new Response(JSON.stringify({ error: `Configured model ${modelToUse} not available. Set GEMINI_MODEL to an available model like gemini-2.5-flash.` }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: errText }), { status: resp.status || 500, headers: { "Content-Type": "application/json" } });
    }

    const parts = json?.candidates?.[0]?.content?.parts ?? [];
    const text = parts.map((part: any) => part.text ?? "").join("") || JSON.stringify(json);
    return new Response(String(text), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (error: unknown) {
    console.error("[Chat API Error]", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
