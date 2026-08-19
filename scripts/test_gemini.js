const fs = require("node:fs");
const path = require("node:path");

function loadEnvLocal() {
  const envPath = path.join(__dirname, "..", ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [name, ...valueParts] = trimmed.split("=");
    process.env[name] ??= valueParts.join("=").trim();
  }
}

loadEnvLocal();

const key = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

async function main() {
  try {
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured. Set it in .env.local or your shell environment.");
    }

    console.log('Listing models...');
    const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    console.log('List status:', listResp.status);
    const listText = await listResp.text();
    console.log('List body:', listText);

    console.log(`\nGenerate text (${model})...`);
    const body = { contents: [{ role: "user", parts: [{ text: "Say hello" }] }] };
    const genResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log('Generate status:', genResp.status);
    const genText = await genResp.text();
    console.log('Generate body:', genText);
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  }
}

main();
