import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { categories, site } from "@/lib/site";
import { Logo } from "./Ornaments";
import T from "./T";

const icons = { whatsapp: FaWhatsapp, instagram: FaInstagram, youtube: FaYoutube, facebook: FaFacebook, telegram: FaTelegram, x: FaXTwitter };

export default function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className="site-footer">
      <div className="aipan-strip" />
      <div className="wrap foot-grid">
        <div>
          <div className="logo foot-logo">
            <Logo size={44} />
            <T hi={site.name} hg={site.nameHinglish} />
          </div>
          <p className="foot-tag"><T hi={site.tagline} hg={site.taglineHinglish} /></p>
          {socials.length > 0 && (
            <div className="foot-social">
              {socials.map(([k, url]) => {
                const I = icons[k];
                return <a key={k} href={url} target="_blank" rel="noopener noreferrer" aria-label={k}><I /></a>;
              })}
            </div>
          )}
        </div>
        <div>
          <h4><T hi="श्रेणियाँ" hg="Shreniyan" /></h4>
          {categories.map((c) => (
            <Link key={c.slug} href={`/shreni/${c.slug}`}><T hi={c.hi} hg={c.hg} /></Link>
          ))}
        </div>
        <div>
          <h4><T hi="देवभूमि कथा" hg="Devbhoomi Katha" /></h4>
          <Link href="/kathayen"><T hi="सभी कथाएँ" hg="Sabhi Kathayein" /></Link>
          <Link href="/parichay"><T hi="परिचय" hg="Parichay" /></Link>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span><T hi="जय देवभूमि उत्तराखंड 🙏" hg="Jai Devbhoomi Uttarakhand 🙏" /></span>
      </div>
    </footer>
  );
}
