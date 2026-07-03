async function run() {
  const res = await fetch('https://gahyo.co.kr/api/articles/1779391686336', { method: 'DELETE' });
  const text = await res.text();
  console.log(`Status: ${res.status}, Response: ${text}`);
}
run();
