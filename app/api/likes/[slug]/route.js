// Like गिनती — Vercel पर "Upstash Redis" (free) जोड़ने पर सबकी Like गिनी जाएँगी।
// बिना database के भी वेबसाइट चलेगी, बस गिनती नहीं दिखेगी।
export const dynamic = "force-dynamic";

const URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(`${URL}/${cmd}`, { headers: { Authorization: `Bearer ${TOKEN}` }, cache: "no-store" });
  const d = await r.json();
  return Number(d.result || 0);
}

const clean = (s) => String(s).replace(/[^a-z0-9-]/gi, "").slice(0, 120);

export async function GET(_req, { params }) {
  const { slug } = await params;
  if (!URL || !TOKEN) return Response.json({ enabled: false });
  try {
    return Response.json({ enabled: true, count: await redis(`get/likes:${clean(slug)}`) });
  } catch {
    return Response.json({ enabled: false });
  }
}

export async function POST(_req, { params }) {
  const { slug } = await params;
  if (!URL || !TOKEN) return Response.json({ enabled: false });
  return Response.json({ enabled: true, count: await redis(`incr/likes:${clean(slug)}`) });
}

export async function DELETE(_req, { params }) {
  const { slug } = await params;
  if (!URL || !TOKEN) return Response.json({ enabled: false });
  let n = await redis(`decr/likes:${clean(slug)}`);
  if (n < 0) {
    await redis(`set/likes:${clean(slug)}/0`);
    n = 0;
  }
  return Response.json({ enabled: true, count: n });
}
