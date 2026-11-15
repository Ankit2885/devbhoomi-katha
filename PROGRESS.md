# PROGRESS.md — change log

Newest first. Add an entry for every significant change (see `CLAUDE.md`).

## 2026-11-15 — Language switch bug, mobile image ratio, end-of-story marker
- **Fixed:** after choosing English/another language, switching back didn't work — Google's `googtrans` cookie on `.creatorkitly.com` was never cleared; now cleared on all parent domains, plus a DOM patch so React doesn't crash on translated pages. Images were stretched on phones (width/height attributes without `height: auto`) — fixed globally; post cover is full-width on phones. Added a clear "॥ कथा समाप्त ॥" marker with diya after every story.
- **Files:** `components/LangSwitcher.js`, `components/GoogleTranslate.js`, `app/globals.css`, `app/katha/[slug]/page.js`, `CLAUDE.md`.
- **Checked:** all pages at 360/390/768px — no horizontal scroll, no distorted images.

## 2026-11-15 — Popularity ranking, inline graphics, 3 new posts, image SEO
- **Changed:** share counts (`/api/shares`), combined `/api/stats`, `lib/redis.js`; popular section on home, popularity-aware "आगे पढ़ें", लोकप्रिय/नई tabs on list pages; like/share counts on cards; "पढ़ने के लिए धन्यवाद" follow box with YouTube/Facebook on every post; inline Aipan illustrations for all posts (`design/images` → `public/images/posts`, `npm run cover` now builds both); new posts रूपकुंड, जागेश्वर धाम, हरेला (facts checked against Wikipedia, Nov 2026); favicon.ico/apple icon/manifest; og:image sizes, `max-image-preview: large`, image sitemap, width/height on all images; `sharp` moved to dependencies.
- **Why:** owner wants likes/shares to drive recommendations, more images per post, and better reach (Discover/Image search).
- **Database:** Upstash Redis (free plan, `upstash-kv-aureolin-ocean`, region Washington D.C.) connected to the Vercel project with prefix `KV` → `KV_REST_API_URL` / `KV_REST_API_TOKEN` (Production + Preview).

## 2026-11-15 — Post support for guest authors + content rules
- **Changed:** added `author` / `author_hinglish` frontmatter (byline on the post page and in Article JSON-LD); added `CLAUDE.md`, `BLOG_WRITING_PROMPT.md`, this file; added `design/covers/*.svg` + `npm run cover` (sharp) to build Aipan-style thumbnails; new post *पहाड़ की संस्कृति और हमारी जिम्मेदारी* (by कुलबीर सिंह रावत) as the featured story.
- **Files:** `lib/posts.js`, `app/katha/[slug]/page.js`, `app/globals.css`, `scripts/cover.mjs`, `package.json`, `content/posts/*`, `public/images/covers/*`.
- **Why:** owner wants every post to ship with a thumbnail and wants future Claude sessions (including from phone) to follow the same rules.
- **Next:** add Google Search Console property + sitemap; enable Upstash Redis for like counts; plan move off Vercel Hobby (non-commercial) before AdSense.

## 2026-11-15 — Site launched
- Next.js 15 blog, Design C (Aipan), Hindi + Hinglish + Google auto-translate, share bar, likes API, related posts, sitemap/robots.
- Deployed on Vercel from GitHub `Ankit2885/devbhoomi-katha`; domain `katha.creatorkitly.com` via Cloudflare CNAME (DNS only).
