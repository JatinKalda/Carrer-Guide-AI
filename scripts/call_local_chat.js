const fetch = globalThis.fetch || require('node-fetch');
(async ()=>{
  try {
    const res = await fetch('http://localhost:3004/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from local test', history: [] }),
    });
    const txt = await res.text();
    console.log('status', res.status);
    console.log('body', txt);
  } catch (e) {
    console.error('err', e);
  }
})();
