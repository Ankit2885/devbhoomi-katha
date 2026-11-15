"use client";
import useStats from "./useStats";
import PostCard from "./PostCard";
import T from "./T";
import { popularity } from "@/lib/format";

// होमपेज: सबसे ज़्यादा Like/Share वाली कथाएँ
export default function PopularPosts({ posts, count = 3 }) {
  const { enabled, stats } = useStats(posts.map((p) => p.slug));
  if (!enabled) return null;
  const top = posts
    .map((p) => ({ p, s: popularity(stats[p.slug]) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, count);
  if (!top.length) return null;
  return (
    <section className="wrap sec">
      <div className="sec-head"><h2><T hi="सबसे लोकप्रिय कथाएँ 🔥" hg="Sabse lokpriya kathayein 🔥" /></h2></div>
      <div className="grid">{top.map(({ p }) => <PostCard key={p.slug} post={p} stats={stats[p.slug]} />)}</div>
    </section>
  );
}
