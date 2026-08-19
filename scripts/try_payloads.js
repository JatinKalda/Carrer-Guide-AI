const key = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`;
const candidates = [
  { prompt: { text: 'Say hello' }, max_output_tokens: 64 },
  { input: { text: 'Say hello' }, max_output_tokens: 64 },
  { instances: [{ input: 'Say hello' }], max_output_tokens: 64 },
  { instances: [{ content: 'Say hello' }], max_output_tokens: 64 },
  { text: 'Say hello', maxOutputTokens: 64 },
  { messages: [{ role: 'user', content: 'Say hello' }] },
  { instructions: [{ content: 'Say hello' }], max_output_tokens: 64 },
  { input_text: 'Say hello' },
  { input: [{ text: 'Say hello' }] },
  { inputs: 'Say hello' },
  { prompt: 'Say hello' },
  { content: 'Say hello' },
];

(async () => {
  if (!key) {
    console.error('GEMINI_API_KEY is not set in the environment.');
    process.exit(1);
  }

  for (const c of candidates) {
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(c) });
      const txt = await res.text();
      console.log('--- Candidate ---');
      console.log(JSON.stringify(c));
      console.log('status', res.status);
      console.log('body', txt);
      if (res.ok) break;
    } catch (e) {
      console.error('err', e);
    }
  }
})();
