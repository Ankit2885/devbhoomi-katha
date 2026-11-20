import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getRelated, getPrevNext, formatDate, videoEmbed } from "@/lib/posts";
import { getCategory, getRegion, site } from "@/lib/site";
import RelatedPosts from "@/components/RelatedPosts";
import ShareBar from "@/components/ShareBar";
import SocialLinks from "@/components/SocialLinks";
import LikeButton from "@/components/LikeButton";
import ReadingProgress from "@/components/ReadingProgress";
import T from "@/components/T";
import { Divider, Diya } from "@/components/Ornaments";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// टैग + खास सर्च कीवर्ड + क्षेत्र/श्रेणी — एक जगह, बिना दोहराव
function postKeywords(post) {
  const regionNames = post.regions.map((r) => getRegion(r)).filter(Boolean).flatMap((r) => [r.hi, r.hg]);
  const cat = getCategory(post.category);
  return [...new Set([...post.keywords, ...post.tags, ...regionNames, cat.hi, "देवभूमि", "Devbhoomi"])];
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
      images: [{ url: post.cover || "/images/og-default.jpg", width: 1200, height: 630, alt: post.coverAlt || post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt, images: [post.cover || "/images/og-default.jpg"] },
    keywords: postKeywords(post),
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const cat = getCategory(post.category);
  const related = getRelated(post);
  const { newer, older } = getPrevNext(post.slug);
  const url = `${site.url}/katha/${post.slug}`;
  const image = post.cover ? `${site.url}${post.cover}` : `${site.url}/images/og-default.jpg`;
  const video = videoEmbed(post.video);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": post.category === "samachar" ? "NewsArticle" : "Article",
    headline: post.title,
    description: post.excerpt,
    image: { "@type": "ImageObject", url: image, width: 1200, height: 630 },
    datePublished: post.date,
    dateModified: post.date,
    keywords: postKeywords(post).join(", "),
    articleSection: cat.hi,
    inLanguage: "hi",
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: url,
  };

  const region = post.regions.map((r) => getRegion(r)).filter(Boolean)[0];
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: site.name, item: site.url },
      region
        ? { "@type": "ListItem", position: 2, name: region.hi, item: `${site.url}/kshetra/${region.slug}` }
        : { "@type": "ListItem", position: 2, name: cat.hi, item: `${site.url}/shreni/${cat.slug}` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  const faqLd = post.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }
    : null;

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <article className="article">
        <header className="art-head wrap-narrow">
          <nav className="crumbs">
            <Link href="/"><T hi="मुख्य पृष्ठ" hg="Home" /></Link> ›{" "}
            <Link href={`/shreni/${cat.slug}`}><T hi={cat.hi} hg={cat.hg} /></Link>
            {post.regions.map((r) => getRegion(r)).filter(Boolean).map((r) => (
              <span key={r.slug}> · <Link href={`/kshetra/${r.slug}`}><T hi={r.hi} hg={r.hg} /></Link></span>
            ))}
          </nav>
          {post.category === "samachar" && <div><span className="news-badge"><T hi="समाचार" hg="Samachar" /></span></div>}
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
            <ShareBar slug={post.slug} url={url} title={post.title} image={image} compact />
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
              <img src={post.cover} alt={post.coverAlt} width="1200" height="630" fetchPriority="high" decoding="async" />
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

          <div className="katha-end" role="separator" aria-label="कथा समाप्त">
            <div className="ke-line">
              <span />
              <div className="ke-badge">
                <Diya />
                <b><T hi="॥ कथा समाप्त ॥" hg="॥ Katha samapt ॥" /></b>
              </div>
              <span />
            </div>
            <p><T hi="जय देवभूमि 🙏" hg="Jai Devbhoomi 🙏" /></p>
          </div>

          {post.sources.length > 0 && (
            <div className="sources">
              <h4><T hi="स्रोत" hg="Srot (Sources)" /></h4>
              <ul>
                {post.sources.map((s) => (
                  <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer nofollow">{s.name}</a></li>
                ))}
              </ul>
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="tags">{post.tags.map((t) => <span key={t}>#{t}</span>)}</div>
          )}

          <div className="end-box">
            <Divider />
            <h3><T hi="कथा अच्छी लगी? औरों तक पहुँचाएँ 🙏" hg="Katha achhi lagi? Auron tak pahunchayein 🙏" /></h3>
            <LikeButton slug={post.slug} />
            <ShareBar slug={post.slug} url={url} title={post.title} image={image} />
          </div>

          {Object.values(site.social).some(Boolean) && (
            <div className="follow-box">
              <h3><T hi="पढ़ने के लिए धन्यवाद 🙏" hg="Padhne ke liye dhanyavaad 🙏" /></h3>
              <p><T hi="ऐसी और कथाएँ, वीडियो और गाँव की ख़बरों के लिए हमसे जुड़ें। अपनी बात या सुझाव भी यहीं भेजें:" hg="Aisi aur kathayein, video aur gaon ki khabron ke liye humse judein. Apni baat ya sujhav bhi yahin bhejein:" /></p>
              <SocialLinks />
            </div>
          )}

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

      <RelatedPosts candidates={related} count={3} />

      <div className="mobile-share">
        <ShareBar slug={post.slug} url={url} title={post.title} image={image} compact />
      </div>
    </>
  );
}
