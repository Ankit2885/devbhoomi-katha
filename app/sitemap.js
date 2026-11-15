import { getAllPosts } from "@/lib/posts";
import { categories, site } from "@/lib/site";

export default function sitemap() {
  const posts = getAllPosts().map((p) => ({
    url: `${site.url}/katha/${p.slug}`,
    lastModified: p.date,
    priority: 0.8,
    images: p.images.map((i) => `${site.url}${i}`),
  }));
  const cats = categories.map((c) => ({ url: `${site.url}/shreni/${c.slug}`, priority: 0.6 }));
  return [{ url: site.url, priority: 1 }, { url: `${site.url}/kathayen`, priority: 0.7 }, ...cats, ...posts];
}
