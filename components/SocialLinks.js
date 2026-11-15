import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { site } from "@/lib/site";

const meta = {
  youtube: { I: FaYoutube, label: "YouTube", color: "#ff0000" },
  facebook: { I: FaFacebook, label: "Facebook", color: "#1877f2" },
  whatsapp: { I: FaWhatsapp, label: "WhatsApp", color: "#25d366" },
  instagram: { I: FaInstagram, label: "Instagram", color: "#dd2a7b" },
  telegram: { I: FaTelegram, label: "Telegram", color: "#229ed9" },
  x: { I: FaXTwitter, label: "X", color: "#111" },
};

// lib/site.js में भरे सोशल लिंक बटन के रूप में दिखाता है
export default function SocialLinks() {
  const items = Object.entries(site.social).filter(([k, url]) => url && meta[k]);
  if (!items.length) return null;
  return (
    <div className="social-links">
      {items.map(([k, url]) => {
        const { I, label, color } = meta[k];
        return (
          <a key={k} href={url} target="_blank" rel="noopener noreferrer" style={{ background: color }}>
            <I /> <span>{label}</span>
          </a>
        );
      })}
    </div>
  );
}
