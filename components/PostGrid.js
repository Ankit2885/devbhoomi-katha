"use client";
import { useState } from "react";
import useStats from "./useStats";
import PostCard from "./PostCard";
import T from "./T";
import { popularity } from "@/lib/format";

// कथाओं की सूची — "लोकप्रिय" या "नई" के हिसाब से क्रम
export default function PostGrid({ posts }) {
  const { enabled, stats } = useStats(posts.map((p) => p.slug));
  const [mode, setMode] = useState("popular");
  const hasStats = enabled && posts.some((p) => popularity(stats[p.slug]) > 0);
  const active = hasStats ? mode : "new";
  const list =
    active === "popular"
      ? [...posts].sort((a, b) => popularity(stats[b.slug]) - popularity(stats[a.slug]) || (a.date < b.date ? 1 : -1))
      : posts;
  return (
    <>
      {hasStats && (
        <div className="sort-tabs">
          <button className={active === "popular" ? "on" : ""} onClick={() => setMode("popular")}><T hi="🔥 लोकप्रिय" hg="🔥 Lokpriya" /></button>
          <button className={active === "new" ? "on" : ""} onClick={() => setMode("new")}><T hi="🆕 नई" hg="🆕 Nayi" /></button>
        </div>
      )}
      <div className="grid">{list.map((p) => <PostCard key={p.slug} post={p} stats={stats[p.slug]} />)}</div>
    </>
  );
}
