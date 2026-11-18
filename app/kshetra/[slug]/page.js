import Link from "next/link";
import { notFound } from "next/navigation";
import { regions, getRegion, site } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import PostGrid from "@/components/PostGrid";
import T from "@/components/T";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = getRegion(slug);
  if (!r) return {};
  const title = `${r.hi} के देवी-देवता, मंदिर और लोक कथाएँ`;
  return {
    title,
    description: r.descHi,
    alternates: { canonical: `/kshetra/${r.slug}` },
    openGraph: { title, description: r.descHi, url: `${site.url}/kshetra/${r.slug}` },
  };
}

export default async function RegionPage({ params }) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();
  const posts = getAllPosts().filter((p) => p.regions.includes(slug));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${region.hi} — ${site.name}`,
    description: region.descHi,
    url: `${site.url}/kshetra/${region.slug}`,
    inLanguage: "hi",
    hasPart: posts.map((p) => ({ "@type": "Article", headline: p.title, url: `${site.url}/katha/${p.slug}` })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="page-head">
        <div className="wrap">
          <div className="ph-ic">{region.icon}</div>
          <h1><T hi={`${region.hi} की कथाएँ`} hg={`${region.hg} ki kathayein`} /></h1>
          <p><T hi={region.descHi} hg={region.descHg} /></p>
          <div className="chips">
            {regions.map((r) => (
              <Link key={r.slug} href={`/kshetra/${r.slug}`} className={r.slug === slug ? "on" : ""}><T hi={r.hi} hg={r.hg} /></Link>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <p className="region-intro"><T hi={region.introHi} hg={region.introHg} /></p>
      </section>
      <section className="wrap sec">
        {posts.length ? <PostGrid posts={posts} /> : (
          <p className="empty"><T hi="इस क्षेत्र की कथाएँ जल्द आएँगी 🙏" hg="Is kshetra ki kathayein jald aayengi 🙏" /></p>
        )}
      </section>
    </>
  );
}
