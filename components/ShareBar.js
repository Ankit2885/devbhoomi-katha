"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebookF, FaXTwitter, FaTelegram, FaLinkedinIn, FaPinterestP, FaRedditAlien, FaEnvelope, FaLink, FaShareNodes, FaCheck } from "react-icons/fa6";

export default function ShareBar({ slug, url, title, image, compact = false }) {
  const track = () => {
    if (!slug) return;
    try { fetch(`/api/shares/${slug}`, { method: "POST", keepalive: true }); } catch {}
  };
  const [copied, setCopied] = useState(false);
  const [canNative, setCanNative] = useState(false);
  useEffect(() => setCanNative(typeof navigator !== "undefined" && !!navigator.share), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const wa = encodeURIComponent(`🙏 ${title}\n\n${url}`);
  const links = [
    { k: "whatsapp", label: "WhatsApp", I: FaWhatsapp, href: `https://wa.me/?text=${wa}` },
    { k: "facebook", label: "Facebook", I: FaFacebookF, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { k: "x", label: "X", I: FaXTwitter, href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { k: "telegram", label: "Telegram", I: FaTelegram, href: `https://t.me/share/url?url=${u}&text=${t}` },
    { k: "linkedin", label: "LinkedIn", I: FaLinkedinIn, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { k: "pinterest", label: "Pinterest", I: FaPinterestP, href: `https://pinterest.com/pin/create/button/?url=${u}&media=${encodeURIComponent(image || "")}&description=${t}` },
    { k: "reddit", label: "Reddit", I: FaRedditAlien, href: `https://www.reddit.com/submit?url=${u}&title=${t}` },
    { k: "email", label: "Email", I: FaEnvelope, href: `mailto:?subject=${t}&body=${u}` },
  ];

  const copy = async () => {
    track();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const i = document.createElement("input");
      i.value = url; document.body.appendChild(i); i.select(); document.execCommand("copy"); i.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const native = async () => {
    try { await navigator.share({ title, text: title, url }); track(); } catch {}
  };

  return (
    <div className={`share ${compact ? "compact" : ""}`}>
      {links.map(({ k, label, I, href }) => (
        <a key={k} className={`sh sh-${k}`} href={href} onClick={track} target="_blank" rel="noopener noreferrer" aria-label={`${label} पर शेयर करें`} title={label}>
          <I />{!compact && k === "whatsapp" && <span>WhatsApp</span>}
        </a>
      ))}
      <button className="sh sh-copy" onClick={copy} title="लिंक कॉपी करें" aria-label="लिंक कॉपी करें">
        {copied ? <FaCheck /> : <FaLink />}
        {copied && <span>कॉपी हो गया</span>}
      </button>
      {canNative && (
        <button className="sh sh-more" onClick={native} title="Instagram और अन्य ऐप्स" aria-label="अन्य ऐप्स में शेयर करें">
          <FaShareNodes />{!compact && <span>Instagram / और</span>}
        </button>
      )}
    </div>
  );
}
