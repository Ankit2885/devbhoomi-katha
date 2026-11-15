import Link from "next/link";
import { FaPlay } from "react-icons/fa6";
import { getCategory } from "@/lib/site";
import { formatDate } from "@/lib/posts";
import T from "./T";

export default function PostCard({ post, variant = "card" }) {
  const cat = getCategory(post.category);
  return (
    <Link href={`/katha/${post.slug}`} className={`post-card ${variant}`}>
      <div className="pc-img">
        {post.cover ? <img src={post.cover} alt={post.coverAlt} loading="lazy" /> : <div className="pc-fallback">{cat.icon}</div>}
        {post.video && <span className="pc-play"><FaPlay /></span>}
      </div>
      <div className="pc-body">
        <span className="tag"><T hi={cat.hi} hg={cat.hg} /></span>
        <h3><T hi={post.title} hg={post.titleHg} /></h3>
        {variant !== "mini" && <p><T hi={post.excerpt} hg={post.excerptHg} /></p>}
        <div className="meta">
          <span><T hi={`${post.minutes} मिनट`} hg={`${post.minutes} min`} /></span>
          <span>·</span>
          <span><T hi={formatDate(post.date, "hi")} hg={formatDate(post.date, "en")} /></span>
        </div>
      </div>
    </Link>
  );
}
