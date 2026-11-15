// सभी कथाओं की Like/Share गिनती एक साथ: /api/stats?slugs=a,b,c
import { redis, redisEnabled, cleanSlug } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!redisEnabled) return Response.json({ enabled: false, stats: {} });
  const slugs = [...new Set((new URL(req.url).searchParams.get("slugs") || "").split(",").map(cleanSlug).filter(Boolean))].slice(0, 200);
  if (!slugs.length) return Response.json({ enabled: true, stats: {} });
  try {
    const vals = await redis("MGET", ...slugs.flatMap((s) => [`likes:${s}`, `shares:${s}`]));
    const stats = {};
    slugs.forEach((s, i) => (stats[s] = { likes: Number(vals[2 * i]) || 0, shares: Number(vals[2 * i + 1]) || 0 }));
    return Response.json({ enabled: true, stats }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return Response.json({ enabled: false, stats: {} });
  }
}
