import Link from "next/link";
import { categories } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import T from "@/components/T";

export const metadata = { title: "सभी कथाएँ" };

export default function AllPosts() {
  const posts = getAllPosts();
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="ph-ic">ॐ</div>
          <h1><T hi="सभी कथाएँ" hg="Sabhi Kathayein" /></h1>
          <p><T hi={`अब तक ${posts.length} कथाएँ`} hg={`Ab tak ${posts.length} kathayein`} /></p>
          <div className="chips">
            {categories.map((c) => (
              <Link key={c.slug} href={`/shreni/${c.slug}`}><T hi={c.hi} hg={c.hg} /></Link>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="grid">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
      </section>
    </>
  );
}
