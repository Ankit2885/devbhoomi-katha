"use client";
import useStats from "./useStats";
import PostCard from "./PostCard";
import T from "./T";
import { popularity } from "@/lib/format";

// "आगे पढ़ें": विषय से मेल + लोकप्रियता (Like/Share) दोनों के आधार पर
export default function RelatedPosts({ candidates, count = 3 }) {
  const { stats } = useStats(candidates.map((p) => p.slug));
  const list = candidates
    .map((p, i) => ({ p, score: p.rel + 3 * Math.log2(1 + popularity(stats[p.slug])) - i * 0.01 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
  if (!list.length) return null;
  return (
    <section className="wrap sec related">
      <div className="sec-head"><h2><T hi="आगे पढ़ें" hg="Aage padhein" /></h2></div>
      <div className="grid">{list.map(({ p }) => <PostCard key={p.slug} post={p} stats={stats[p.slug]} />)}</div>
    </section>
  );
}
