// Upstash Redis (REST) — Vercel पर Storage → Upstash Redis जोड़ने से ये env अपने आप आ जाते हैं
const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisEnabled = Boolean(URL && TOKEN);
export const cleanSlug = (s) => String(s).replace(/[^a-z0-9-]/gi, "").slice(0, 120);

export async function redis(...args) {
  const r = await fetch(URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.result;
}
