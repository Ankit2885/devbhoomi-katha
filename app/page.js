import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { categories, site } from "@/lib/site";
import PostCard from "@/components/PostCard";
import T from "@/components/T";
import { Bell, Diya, AipanMandala, Divider } from "@/components/Ornaments";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured) || posts[0];
  const latest = posts.filter((p) => p.slug !== featured?.slug).slice(0, 6);
  const why = posts.filter((p) => p.category === "aisa-kyon").slice(0, 4);
  const videos = posts.filter((p) => p.video).slice(0, 3);
  const countBy = (slug) => posts.filter((p) => p.category === slug).length;

  return (
    <>
      <section className="hero">
        <Bell className="bell bell-l" />
        <Bell className="bell bell-l2" />
        <Bell className="bell bell-r" />
        <div className="wrap hero-grid">
          <div className="hero-text">
            <span className="eyebrow">॥ <T hi="उत्तराखंड · देवभूमि" hg="Uttarakhand · Devbhoomi" /> ॥</span>
            <h1>
              <T hi="जहाँ हर पहाड़" hg="Jahan har pahad" />
              <br />
              <T hi="एक कथा कहता है" hg="ek katha kehta hai" />
            </h1>
            <p><T hi="गोलू देवता से नंदा देवी तक — उत्तराखंड के देवी-देवताओं, लोक कथाओं, पावन धामों और रहस्यों का संग्रह।" hg="Golu Devta se Nanda Devi tak — Uttarakhand ke devi-devtaon, lok kathaon, pavan dhamon aur rahasyon ka sangrah." /></p>
            <div className="cta">
              <Link className="btn" href="/kathayen"><T hi="कथाएँ पढ़ें" hg="Kathayein padhein" /></Link>
              <Link className="btn ghost" href="/shreni/aisa-kyon"><T hi="ऐसा क्यों होता है?" hg="Aisa kyon hota hai?" /></Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="glow" />
            <AipanMandala className="mandala" />
          </div>
        </div>
        <div className="diyas">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => <Diya key={i} className="diya" style={{ animationDelay: `${i * 0.3}s` }} />)}
        </div>
      </section>
      <div className="aipan-strip big" />

      <div className="wrap">
        <div className="cats">
          {categories.map((c) => (
            <Link key={c.slug} href={`/shreni/${c.slug}`} className="cat">
              <div className="cat-ic">{c.icon}</div>
              <b><T hi={c.hi} hg={c.hg} /></b>
              <span><T hi={`${countBy(c.slug)} कथाएँ`} hg={`${countBy(c.slug)} kathayein`} /></span>
            </Link>
          ))}
        </div>
      </div>

      {featured && (
        <section className="wrap sec">
          <div className="sec-head"><h2><T hi="आज की विशेष कथा" hg="Aaj ki vishesh katha" /></h2></div>
          <PostCard post={featured} variant="featured" />
        </section>
      )}

      <section className="wrap sec">
        <div className="sec-head">
          <h2><T hi="नई कथाएँ" hg="Nayi kathayein" /></h2>
          <Link href="/kathayen" className="more"><T hi="सभी देखें →" hg="Sabhi dekhein →" /></Link>
        </div>
        <div className="grid">
          {latest.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      </section>

      {why.length > 0 && (
        <section className="wrap sec">
          <div className="why">
            <div>
              <h2><T hi="ऐसा क्यों होता है?" hg="Aisa kyon hota hai?" /></h2>
              <p><T hi="मान्यता, इतिहास और विज्ञान — तीनों नज़रिए से।" hg="Manyata, itihaas aur vigyan — teeno nazariye se." /></p>
              <Link href="/shreni/aisa-kyon" className="btn light"><T hi="सभी रहस्य पढ़ें" hg="Sabhi rahasya padhein" /></Link>
            </div>
            <ul>
              {why.map((p) => (
                <li key={p.slug}>
                  <Link href={`/katha/${p.slug}`}><T hi={p.title} hg={p.titleHg} /> <span>→</span></Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {videos.length > 0 && (
        <section className="wrap sec">
          <div className="sec-head"><h2><T hi="वीडियो कथाएँ" hg="Video kathayein" /></h2></div>
          <div className="grid">{videos.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      )}

      <section className="wrap sec">
        <Divider />
        <div className="join">
          <h2><T hi="हर नई कथा सबसे पहले पाएँ" hg="Har nayi katha sabse pehle paayein" /></h2>
          <p><T hi="कथा पसंद आए तो अपने परिवार और दोस्तों के साथ WhatsApp पर ज़रूर शेयर करें।" hg="Katha pasand aaye to apne parivaar aur doston ke saath WhatsApp par zaroor share karein." /></p>
          {site.social.whatsapp && (
            <a className="btn" href={site.social.whatsapp} target="_blank" rel="noopener noreferrer"><T hi="WhatsApp चैनल से जुड़ें" hg="WhatsApp channel join karein" /></a>
          )}
        </div>
      </section>
    </>
  );
}
