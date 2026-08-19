(async ()=>{
  try{
    const url = 'http://localhost:3004/api/chat';
    const body = { message: 'Hello from automated test', history: [] };
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    console.log('status', res.status);
    const text = await res.text();
    console.log('body:', text);
  }catch(e){
    console.error('err', e);
    process.exitCode = 1;
  }
})();
