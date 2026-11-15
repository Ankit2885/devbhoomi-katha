import { notFound } from "next/navigation";
import { categories } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import T from "@/components/T";
import Link from "next/link";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = categories.find((x) => x.slug === slug);
  return c ? { title: c.hi, description: c.descHi } : {};
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const posts = getAllPosts().filter((p) => p.category === slug);
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="ph-ic">{cat.icon}</div>
          <h1><T hi={cat.hi} hg={cat.hg} /></h1>
          <p><T hi={cat.descHi} hg={cat.descHg} /></p>
          <div className="chips">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shreni/${c.slug}`} className={c.slug === slug ? "on" : ""}><T hi={c.hi} hg={c.hg} /></Link>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap sec">
        {posts.length ? (
          <div className="grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        ) : (
          <p className="empty"><T hi="इस श्रेणी में कथाएँ जल्द आएँगी 🙏" hg="Is shreni mein kathayein jald aayengi 🙏" /></p>
        )}
      </section>
    </>
  );
}
