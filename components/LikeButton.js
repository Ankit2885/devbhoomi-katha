"use client";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import T from "./T";

export default function LikeButton({ slug }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(null);
  const [pop, setPop] = useState(false);
  const key = `dk-liked-${slug}`;

  useEffect(() => {
    try { setLiked(localStorage.getItem(key) === "1"); } catch {}
    fetch(`/api/likes/${slug}`)
      .then((r) => r.json())
      .then((d) => d.enabled && setCount(d.count))
      .catch(() => {});
  }, [slug, key]);

  const toggle = async () => {
    const next = !liked;
    setLiked(next);
    if (next) { setPop(true); setTimeout(() => setPop(false), 600); }
    try { next ? localStorage.setItem(key, "1") : localStorage.removeItem(key); } catch {}
    if (count !== null) setCount((c) => Math.max(0, c + (next ? 1 : -1)));
    try {
      const r = await fetch(`/api/likes/${slug}`, { method: next ? "POST" : "DELETE" });
      const d = await r.json();
      if (d.enabled) setCount(d.count);
    } catch {}
  };

  return (
    <button className={`like-btn ${liked ? "liked" : ""} ${pop ? "pop" : ""}`} onClick={toggle} aria-pressed={liked}>
      {liked ? <FaHeart /> : <FaRegHeart />}
      <span>{liked ? <T hi="पसंद आया" hg="Pasand aaya" /> : <T hi="पसंद करें" hg="Pasand karein" />}</span>
      {count !== null && count > 0 && <b>{count}</b>}
    </button>
  );
}
