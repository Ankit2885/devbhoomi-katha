# PROGRESS.md — change log

Newest first. Add an entry for every significant change (see `CLAUDE.md`).

## 2026-11-15 — Post support for guest authors + content rules
- **Changed:** added `author` / `author_hinglish` frontmatter (byline on the post page and in Article JSON-LD); added `CLAUDE.md`, `BLOG_WRITING_PROMPT.md`, this file; added `design/covers/*.svg` + `npm run cover` (sharp) to build Aipan-style thumbnails; new post *पहाड़ की संस्कृति और हमारी जिम्मेदारी* (by कुलबीर सिंह रावत) as the featured story.
- **Files:** `lib/posts.js`, `app/katha/[slug]/page.js`, `app/globals.css`, `scripts/cover.mjs`, `package.json`, `content/posts/*`, `public/images/covers/*`.
- **Why:** owner wants every post to ship with a thumbnail and wants future Claude sessions (including from phone) to follow the same rules.
- **Next:** add Google Search Console property + sitemap; enable Upstash Redis for like counts; plan move off Vercel Hobby (non-commercial) before AdSense.

## 2026-11-15 — Site launched
- Next.js 15 blog, Design C (Aipan), Hindi + Hinglish + Google auto-translate, share bar, likes API, related posts, sitemap/robots.
- Deployed on Vercel from GitHub `Ankit2885/devbhoomi-katha`; domain `katha.creatorkitly.com` via Cloudflare CNAME (DNS only).
