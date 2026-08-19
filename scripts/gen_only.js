const key = process.env.GEMINI_API_KEY;

(async () => {
  if (!key) {
    console.error('GEMINI_API_KEY is not set in the environment.');
    process.exit(1);
  }

  const body = { prompt: { text: 'Say hello' }, max_output_tokens: 64 };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`;
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    console.log('status', res.status);
    const txt = await res.text();
    console.log('body', txt);
  } catch (e) {
    console.error(e);
  }
})();
