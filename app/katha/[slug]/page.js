import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getRelated, getPrevNext, formatDate, videoEmbed } from "@/lib/posts";
import { getCategory, site } from "@/lib/site";
import PostCard from "@/components/PostCard";
import ShareBar from "@/components/ShareBar";
import LikeButton from "@/components/LikeButton";
import ReadingProgress from "@/components/ReadingProgress";
import T from "@/components/T";
import { Divider } from "@/components/Ornaments";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/katha/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      ...(post.author ? { authors: [post.author] } : {}),
      images: post.cover ? [post.cover] : ["/images/og-default.jpg"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const cat = getCategory(post.category);
  const related = getRelated(post, 3);
  const { newer, older } = getPrevNext(post.slug);
  const url = `${site.url}/katha/${post.slug}`;
  const image = post.cover ? `${site.url}${post.cover}` : `${site.url}/images/og-default.jpg`;
  const video = videoEmbed(post.video);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.date,
    inLanguage: "hi",
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="article">
        <header className="art-head wrap-narrow">
          <nav className="crumbs">
            <Link href="/"><T hi="मुख्य पृष्ठ" hg="Home" /></Link> ›{" "}
            <Link href={`/shreni/${cat.slug}`}><T hi={cat.hi} hg={cat.hg} /></Link>
          </nav>
          <h1><T hi={post.title} hg={post.titleHg} /></h1>
          <p className="lead"><T hi={post.excerpt} hg={post.excerptHg} /></p>
          <div className="art-meta">
            {post.author && (
              <>
                <span className="byline"><T hi={`✍️ ${post.author}`} hg={`✍️ ${post.authorHg || post.author}`} /></span>
                <span>·</span>
              </>
            )}
            <span><T hi={formatDate(post.date, "hi")} hg={formatDate(post.date, "en")} /></span>
            <span>·</span>
            <span><T hi={`${post.minutes} मिनट में पढ़ें`} hg={`${post.minutes} min read`} /></span>
          </div>
          <div className="art-actions">
            <LikeButton slug={post.slug} />
            <ShareBar url={url} title={post.title} image={image} compact />
          </div>
        </header>

        {video ? (
          <div className="wrap-wide art-media">
            {video.type === "youtube" ? (
              <div className={`video ${video.vertical ? "vertical" : ""}`}>
                <iframe src={video.src} title={post.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ) : (
              <div className="video file"><video src={video.src} poster={post.cover || undefined} controls preload="metadata" playsInline /></div>
            )}
          </div>
        ) : (
          post.cover && (
            <figure className="wrap-wide art-media">
              <img src={post.cover} alt={post.coverAlt} />
            </figure>
          )
        )}

        <div className="wrap-narrow article-body-wrap">
          {post.htmlHg ? (
            <T as="div" className="prose" hi={post.html} hg={post.htmlHg} html />
          ) : (
            <>
              <div className="l-hg note">Is katha ka Hinglish roop jald aayega — tab tak Hindi mein padhein 🙏</div>
              <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            </>
          )}

          {post.tags.length > 0 && (
            <div className="tags">{post.tags.map((t) => <span key={t}>#{t}</span>)}</div>
          )}

          <div className="end-box">
            <Divider />
            <h3><T hi="कथा अच्छी लगी? औरों तक पहुँचाएँ 🙏" hg="Katha achhi lagi? Auron tak pahunchayein 🙏" /></h3>
            <LikeButton slug={post.slug} />
            <ShareBar url={url} title={post.title} image={image} />
          </div>

          <div className="prevnext">
            {older ? (
              <Link href={`/katha/${older.slug}`}><small><T hi="← पिछली कथा" hg="← Pichhli katha" /></small><T hi={older.title} hg={older.titleHg} /></Link>
            ) : <span />}
            {newer ? (
              <Link href={`/katha/${newer.slug}`} className="r"><small><T hi="अगली कथा →" hg="Agli katha →" /></small><T hi={newer.title} hg={newer.titleHg} /></Link>
            ) : <span />}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="wrap sec related">
          <div className="sec-head"><h2><T hi="आगे पढ़ें" hg="Aage padhein" /></h2></div>
          <div className="grid">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </section>
      )}

      <div className="mobile-share">
        <ShareBar url={url} title={post.title} image={image} compact />
      </div>
    </>
  );
}
