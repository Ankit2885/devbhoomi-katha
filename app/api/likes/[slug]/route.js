// Like गिनती — Vercel पर "Upstash Redis" (free) जुड़ा हो तो सबकी Like गिनी जाती हैं।
// बिना database के भी वेबसाइट चलती है, बस गिनती नहीं दिखती।
import { redis, redisEnabled, cleanSlug } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET(_req, { params }) {
  const { slug } = await params;
  if (!redisEnabled) return Response.json({ enabled: false });
  try {
    return Response.json({ enabled: true, count: Number(await redis("GET", `likes:${cleanSlug(slug)}`)) || 0 });
  } catch {
    return Response.json({ enabled: false });
  }
}

export async function POST(_req, { params }) {
  const { slug } = await params;
  if (!redisEnabled) return Response.json({ enabled: false });
  return Response.json({ enabled: true, count: Number(await redis("INCR", `likes:${cleanSlug(slug)}`)) });
}

export async function DELETE(_req, { params }) {
  const { slug } = await params;
  if (!redisEnabled) return Response.json({ enabled: false });
  const key = `likes:${cleanSlug(slug)}`;
  let n = Number(await redis("DECR", key));
  if (n < 0) {
    await redis("SET", key, 0);
    n = 0;
  }
  return Response.json({ enabled: true, count: n });
}
