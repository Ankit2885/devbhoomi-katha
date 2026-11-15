// शेयर बटन दबाने पर गिनती बढ़ती है (लोकप्रिय कथाएँ तय करने के लिए)
import { redis, redisEnabled, cleanSlug } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function POST(_req, { params }) {
  const { slug } = await params;
  if (!redisEnabled) return Response.json({ enabled: false });
  try {
    return Response.json({ enabled: true, count: Number(await redis("INCR", `shares:${cleanSlug(slug)}`)) });
  } catch {
    return Response.json({ enabled: false });
  }
}
