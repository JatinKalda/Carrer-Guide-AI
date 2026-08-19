import { NextRequest } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

type CareerScores = {
  aiCareerScore: number;
  profileHealth: number;
  jobMatch: number;
  activityScore: number;
};

const SCORE_KEYS = [
  "aiCareerScore",
  "profileHealth",
  "jobMatch",
  "activityScore",
] as const;

function clampScore(value: unknown) {
  const score =
    typeof value === "string" ? Number(value.replace("%", "").trim()) : Number(value);
  if (!Number.isFinite(score)) {
    return null;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function parseJsonPayload(text: string) {
  const cleaned = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    // Gemini can still wrap JSON in prose despite explicit instructions.
  }

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

function pickScoreSource(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return null;
  }

  const objectValue = value as Record<string, unknown>;

  if (objectValue.careerScores) {
    return objectValue.careerScores;
  }

  if (objectValue.scores) {
    return objectValue.scores;
  }

  if (SCORE_KEYS.some((key) => key in objectValue)) {
    return objectValue;
  }

  return null;
}

function normalizeScores(value: unknown): CareerScores | null {
  const source = pickScoreSource(value);

  if (!source || typeof source !== "object") {
    return null;
  }

  const scores = source as Partial<CareerScores>;
  const aiCareerScore = clampScore(scores.aiCareerScore);
  const profileHealth = clampScore(scores.profileHealth);
  const jobMatch = clampScore(scores.jobMatch);
  const activityScore = clampScore(scores.activityScore);

  if (
    aiCareerScore === null ||
    profileHealth === null ||
    jobMatch === null ||
    activityScore === null
  ) {
    return null;
  }

  return { aiCareerScore, profileHealth, jobMatch, activityScore };
}

function extractScoresFromText(text: string): CareerScores | null {
  const entries = SCORE_KEYS.map((key) => {
    const match = text.match(new RegExp(`"${key}"\\s*:\\s*"?([0-9]{1,3})`, "i"));
    return [key, match ? clampScore(match[1]) : null] as const;
  });

  if (entries.some(([, value]) => value === null)) {
    return null;
  }

  return Object.fromEntries(entries) as CareerScores;
}

function buildFallbackScores({
  linkedinUrl,
  resumeName,
  role,
}: {
  linkedinUrl?: string;
  resumeName?: string;
  role?: string;
}): CareerScores {
  const hasLinkedIn = Boolean(linkedinUrl?.trim());
  const hasResume = Boolean(resumeName?.trim());
  const roleIsTechnical = /engineer|developer|software|architect|data|product|analyst|designer/i.test(role || "");

  const aiCareerScore = Math.min(
    96,
    68 + (hasLinkedIn ? 12 : 0) + (hasResume ? 10 : 0) + (roleIsTechnical ? 6 : 2)
  );

  return {
    aiCareerScore,
    profileHealth: Math.min(95, 60 + (hasLinkedIn ? 18 : 0) + (hasResume ? 12 : 0)),
    jobMatch: Math.min(94, 58 + (hasLinkedIn ? 15 : 0) + (roleIsTechnical ? 10 : 4)),
    activityScore: Math.min(92, 52 + (hasResume ? 18 : 0) + (hasLinkedIn ? 12 : 0)),
  };
}

export async function POST(req: NextRequest) {
  try {
    const { linkedinUrl, resumeName, name, role } = await req.json();

    if (!linkedinUrl?.trim() || !resumeName?.trim()) {
      return Response.json(
        { error: "LinkedIn profile URL and resume are both required." },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not configured. AI analysis cannot run." },
        { status: 500 }
      );
    }

    const fallbackScores = buildFallbackScores({ linkedinUrl, resumeName, role });

    const prompt = `Return ONLY valid JSON. No markdown fences. No extra text.

Profile:
- Name: ${name || "Unknown"}
- Target role: ${role || "Software Professional"}
- LinkedIn URL: ${linkedinUrl}
- Resume file provided: ${resumeName}

Return exactly:
{"careerScores":{"aiCareerScore":0,"profileHealth":0,"jobMatch":0,"activityScore":0}}

Use integer scores from 0 to 100.`;

    let response: Response;
    let geminiJson: any = null;

    try {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
          GEMINI_MODEL
        )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
              maxOutputTokens: 256,
              temperature: 0.2,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      geminiJson = await response.json().catch(() => null);
    } catch (error) {
      console.warn("[Profile Analysis] Gemini request failed, using fallback scores.", error);
      return Response.json({ careerScores: fallbackScores, fallback: true }, { status: 200 });
    }

    if (!response.ok) {
      console.warn("[Profile Analysis] Gemini rejected the request, using fallback scores.", {
        status: response.status,
        error: geminiJson?.error?.message,
      });
      return Response.json({ careerScores: fallbackScores, fallback: true }, { status: 200 });
    }

    const text = geminiJson?.candidates?.[0]?.content?.parts
      ?.map((part: { text?: string }) => part.text || "")
      .join("");
    const parsed = text ? parseJsonPayload(text) : null;
    const careerScores = normalizeScores(parsed) || (text ? extractScoresFromText(text) : null);

    if (!careerScores) {
      console.warn("[Profile Analysis] Invalid Gemini response, using fallback scores.", {
        finishReason: geminiJson?.candidates?.[0]?.finishReason,
        promptFeedback: geminiJson?.promptFeedback,
        text,
      });
      return Response.json({ careerScores: fallbackScores, fallback: true }, { status: 200 });
    }

    return Response.json({ careerScores, fallback: false });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return Response.json({ error: message }, { status: 500 });
  }
}
