import { getAllPosts } from "@/lib/posts";
import { categories, site } from "@/lib/site";

export default function sitemap() {
  const posts = getAllPosts();
  const newest = posts[0]?.date || new Date().toISOString();
  const postUrls = posts.map((p) => ({
    url: `${site.url}/katha/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly",
    priority: 0.8,
    images: p.images.map((i) => `${site.url}${i}`),
  }));
  const cats = categories.map((c) => ({ url: `${site.url}/shreni/${c.slug}`, lastModified: newest, changeFrequency: "weekly", priority: 0.6 }));
  return [
    { url: `${site.url}/`, lastModified: newest, changeFrequency: "daily", priority: 1 },
    { url: `${site.url}/kathayen`, lastModified: newest, changeFrequency: "daily", priority: 0.7 },
    { url: `${site.url}/parichay`, changeFrequency: "yearly", priority: 0.3 },
    ...cats,
    ...postUrls,
  ];
}
