import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// YouTube लिंक या .mp4 लिंक अगर अपनी अलग लाइन में हो तो उसे वीडियो प्लेयर में बदल दो
function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export function videoEmbed(url) {
  if (!url) return null;
  const id = youtubeId(url);
  if (id) return { type: "youtube", src: `https://www.youtube-nocookie.com/embed/${id}`, vertical: url.includes("/shorts/") };
  if (/\.(mp4|webm)(\?.*)?$/i.test(url)) return { type: "file", src: url };
  return null;
}

function expandMedia(md) {
  return md
    .split("\n")
    .map((line) => {
      const t = line.trim();
      if (!/^https?:\/\/\S+$/.test(t)) return line;
      const v = videoEmbed(t);
      if (!v) return line;
      if (v.type === "youtube")
        return `<div class="video${v.vertical ? " vertical" : ""}"><iframe src="${v.src}" title="video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
      return `<div class="video file"><video src="${v.src}" controls preload="metadata" playsinline></video></div>`;
    })
    .join("\n");
}

// public/ की फ़ोटो की असली चौड़ाई-ऊँचाई (Google और तेज़ लोडिंग के लिए)
async function imageSize(src) {
  try {
    const { default: sharp } = await import("sharp");
    const m = await sharp(path.join(process.cwd(), "public", src)).metadata();
    return m.width && m.height ? { w: m.width, h: m.height } : null;
  } catch {
    return null;
  }
}

async function toHtml(md) {
  const out = String(await remark().use(gfm).use(html, { sanitize: false }).process(expandMedia(md)));
  const srcs = [...new Set([...out.matchAll(/<img src="(\/[^"]+)"/g)].map((m) => m[1]))];
  const sizes = Object.fromEntries(await Promise.all(srcs.map(async (s) => [s, await imageSize(s)])));
  return out.replace(/<img src="([^"]+)"/g, (all, src) => {
    const sz = sizes[src];
    return `<img loading="lazy" decoding="async" src="${src}"${sz ? ` width="${sz.w}" height="${sz.h}"` : ""}`;
  });
}

// कथा में इस्तेमाल हुई सारी फ़ोटो (image sitemap के लिए)
function imagesIn(content, cover) {
  const inline = [...content.matchAll(/!\[[^\]]*\]\((\/images\/[^)\s]+)\)/g)].map((m) => m[1]);
  return [...new Set([cover, ...inline].filter(Boolean))];
}

function readingMinutes(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function listFiles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md") && !f.endsWith(".hinglish.md"));
}

function readMeta(file) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const hgPath = path.join(POSTS_DIR, `${slug}.hinglish.md`);
  let hg = null;
  if (fs.existsSync(hgPath)) hg = matter(fs.readFileSync(hgPath, "utf8"));
  return {
    slug,
    title: data.title || slug,
    titleHg: hg?.data?.title || data.title_hinglish || null,
    excerpt: data.excerpt || "",
    excerptHg: hg?.data?.excerpt || data.excerpt_hinglish || null,
    date: data.date ? new Date(data.date).toISOString() : new Date(0).toISOString(),
    category: data.category || "devi-devta",
    regions: [].concat(data.region || []),
    sources: data.sources || [],
    cover: data.cover || null,
    coverAlt: data.cover_alt || data.title || "",
    video: data.video || null,
    tags: data.tags || [],
    author: data.author || null,
    authorHg: data.author_hinglish || null,
    featured: !!data.featured,
    draft: !!data.draft,
    minutes: readingMinutes(content),
    images: imagesIn(content, data.cover),
    _content: content,
    _hg: hg ? hg.content : null,
  };
}

const strip = ({ _content, _hg, ...rest }) => rest;

export function getAllPosts() {
  return listFiles()
    .map(readMeta)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(strip);
}

export async function getPost(slug) {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return null;
  const meta = readMeta(file);
  if (meta.draft) return null;
  return {
    ...strip(meta),
    html: await toHtml(meta._content),
    htmlHg: meta._hg ? await toHtml(meta._hg) : null,
  };
}

// "आगे पढ़ें" के उम्मीदवार — विषय से मेल का स्कोर (rel); लोकप्रियता client पर जुड़ती है
export function getRelated(post) {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  return all
    .map((p) => ({ ...p, rel: (p.category === post.category ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length * 3 }))
    .sort((a, b) => b.rel - a.rel || (a.date < b.date ? 1 : -1));
}

export function getPrevNext(slug) {
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  return { newer: i > 0 ? all[i - 1] : null, older: i >= 0 && i < all.length - 1 ? all[i + 1] : null };
}

export { formatDate } from "./format";
