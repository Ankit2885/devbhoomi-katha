"use client";
import { useEffect, useState } from "react";

// सभी कथाओं की Like/Share गिनती एक ही बार लाता है और पूरे पेज में बाँटता है
let cache = null;
export default function useStats(slugs) {
  const [data, setData] = useState({ enabled: false, stats: {} });
  const key = slugs.join(",");
  useEffect(() => {
    if (!key) return;
    if (!cache || cache.key !== key) {
      cache = { key, p: fetch(`/api/stats?slugs=${encodeURIComponent(key)}`).then((r) => r.json()).catch(() => ({ enabled: false, stats: {} })) };
    }
    let alive = true;
    cache.p.then((d) => alive && setData(d));
    return () => { alive = false; };
  }, [key]);
  return data;
}
