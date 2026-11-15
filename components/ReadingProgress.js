"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const el = document.querySelector(".article-body-wrap");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(100, Math.max(0, (-r.top / Math.max(total, 1)) * 100)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="progress" style={{ width: `${p}%` }} />;
}
