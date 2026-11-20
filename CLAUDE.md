# CLAUDE.md — workflow rules for this repo (देवभूमि कथा)

Claude loads this file automatically at the start of every session. Follow it every time.
Talk to the owner (Ankit) in Hinglish unless he asks otherwise.

Live site: https://katha.creatorkitly.com (Vercel project `devbhoomi-katha`, GitHub `Ankit2885/devbhoomi-katha`, branch `main`).
Every push to `main` auto-deploys. DNS: Cloudflare (creatorkitly.com zone, `katha` CNAME → Vercel, **DNS only**, never proxied).

## Before making any change
1. Read this file and `BLOG_WRITING_PROMPT.md` (for any post work).
2. Read the latest entries in `PROGRESS.md`.
3. Look at 1–2 existing posts in `content/posts/` and copy their format exactly.
4. Only then add or change files.

## While working
- Don't rewrite working systems; prefer small, incremental changes and extend existing patterns.
- Explain the impact before changing anything shared or deployment-sensitive (`lib/site.js` URL, `next.config.mjs`, env vars, DNS, domains).

**Project-specific hard rules:**
- **Posts are Markdown**, never new page files. Hindi post = `content/posts/<slug>.md` (all frontmatter). Hinglish version = `content/posts/<slug>.hinglish.md` (only `title`, `excerpt` + body). Slug is the URL: lowercase Latin, words joined with `-`, no dates.
- **Every post MUST have a thumbnail.** `cover: "/images/covers/<slug>.jpg"` (1200×630 JPG, < 200 KB) + a descriptive `cover_alt`. No post ships without one.
  - Owner sent a photo → crop/resize it to 1200×630 and save as `public/images/covers/<slug>.jpg`.
  - No photo → make an original graphic in the **Aipan style**: copy an existing `design/covers/*.svg`, keep the frame (geru red `#a5302a`, white dotted border, corner circles, gold `#e3b04b` accents), draw the topic with simple line art, **no text inside the SVG**. Then run `npm run cover -- <slug>`.
  - Never use photos of real people taken from the web, and never copy another site's images.
- **Every post should also have at least one illustration inside the body** (placed before a middle `##` heading) with alt text + an italic caption line right below it: `![alt](/images/posts/<name>.jpg)` then `*caption (चित्र)*`. Our own graphics: SVG in `design/images/<name>.svg` (same Aipan frame rules) → `npm run cover -- <name>` → `public/images/posts/<name>.jpg`. Add the same image to the Hinglish file with a Hinglish caption.
- **Focus:** new stories are about **Garhwal and Himachal** (owner's choice, Nov 2026). Kumaon posts stay but new ones only if Ankit asks.
- **Required frontmatter:** `title`, `excerpt` (~150 chars, shown in Google + WhatsApp preview), `date` (YYYY-MM-DD), `region` (`garhwal`, `himachal`, `kumaon` or a list like `[garhwal, kumaon]` — drives `/kshetra/<region>` pages), `category` (one of `devi-devta`, `lok-katha`, `pavan-dham`, `aisa-kyon`, `parv-parampara`, `samachar`), `cover`, `cover_alt`, `tags` (4–6).
- **SEO (trend-first):** before writing, check Google Trends (Uttarakhand/Himachal, "mandir", past 3 months, *Rising*) and pick topics people are searching now. Put the main search phrase at the start of `title`; add `keywords:` (5–8 real search phrases, Hindi + English/Hinglish spelling, e.g. `"naina devi mandir himachal"`). End every non-news post (and news when useful) with `## अक्सर पूछे जाने वाले सवाल` (Hinglish file: `## Aksar poochhe jaane wale sawal`) and 4–5 `### सवाल?` + one-paragraph answers — `lib/posts.js` turns these into FAQPage JSON-LD automatically. Add 2–3 internal links to related posts and the `/kshetra/<region>` page. Festival/date posts: publish 3–10 days before the date.
- **News (`category: samachar`):** only real, current Garhwal/pahad dham-mela-yatra news, written in our own words (never copy a news site's text), with a dateline (**रुद्रप्रयाग, गढ़वाल।**), exact dates, and a `sources:` list (`- name: … / url: …`) of the articles used — shown at the end of the post and marked as `NewsArticle` in JSON-LD. Use `date` = the day of the event/publication. Optional: `author` + `author_hinglish` (guest writers), `video` (YouTube/MP4), `featured: true` (only ONE post at a time — set the old one to `false`), `draft: true`.
- **Always write the Hinglish file too** (transliterate faithfully, same headings) unless the owner says Hindi only.
- **Owner/guest content is published as written.** Only fix obvious typos, add `##` sub-headings and paragraph breaks for readability, and bold key phrases. Never change their opinion, facts or tone. Add the author byline and the line *"यह लेखक के निजी विचार हैं।"* for opinion pieces.
- **Facts:** stories are written as मान्यता/लोक कथा ("मान्यता है कि…"). Dates, distances, heights and history need a reliable source; if unsure, leave the number out. For "ऐसा क्यों?" posts always give both views: मान्यता **and** विज्ञान/इतिहास.
- No hate or mockery of any community, religion, caste or region. No fake quotes, fake numbers, fake experiences or invented miracles presented as fact.
- Media: YouTube/MP4 link on its own line in the body becomes a player. Inline images go in `public/images/<slug>-<n>.jpg` with `![alt](/images/...)`. Keep every image < 300 KB.
- UI text must work in both languages: use `<T hi="…" hg="…" />` from `components/T.js`. English/other languages come from Google Translate automatically — don't create English files.
- Colours and fonts live only in `app/globals.css` (`:root` tokens). Fonts come from `@fontsource/*` npm packages — **never `next/font/google`**.
- **Popularity:** likes (`/api/likes/[slug]`) and shares (`/api/shares/[slug]`, fired by `ShareBar` with `slug`) are counted in Upstash Redis (`lib/redis.js`, env `KV_REST_API_URL`/`KV_REST_API_TOKEN`). `/api/stats` returns both. Score = likes + 2 × shares (`lib/format.js` → `popularity`). Home "सबसे लोकप्रिय", "आगे पढ़ें" (`RelatedPosts`: topic match + popularity) and list pages (`PostGrid`: लोकप्रिय/नई tabs) all use it. Without Redis everything falls back to date order — never break that fallback.
- No other database. Never commit keys or `.env*` files.
- **Google Translate languages:** Google writes the `googtrans` cookie on the parent domain too (`.creatorkitly.com`). `LangSwitcher` must clear it on the host **and every parent domain** before reload, and `GoogleTranslate.js` patches `removeChild/insertBefore` so React doesn't crash on translated pages. Don't remove either.
- **Mobile first:** every page must work at 360px with no horizontal scroll. Images always keep their ratio (`img { height: auto }` is global; card images use `object-fit: cover`). Test phone width before pushing.
- **Navigation stays client-side:** internal links always use `next/link` (no page reload). Only the Google Translate languages reload the page — that is expected.
- **Image SEO:** every `<img>` has `alt`, `width`, `height`; covers are exactly 1200×630 (used as `og:image` with width/height). The sitemap lists each post's images. Keep `max-image-preview: large` in `app/layout.js` (Google Discover).
- Before finishing: `npm run build` must pass.

## Publishing a post (checklist)
1. `content/posts/<slug>.md` + `<slug>.hinglish.md` written.
2. Thumbnail at `public/images/covers/<slug>.jpg` (and `design/covers/<slug>.svg` if it's our own graphic) + at least one inline illustration in `public/images/posts/`.
3. `featured` flag moved if this is the new top story.
4. `npm run build` passes.
5. Commit + push to `main` → Vercel deploys in ~1 minute.
6. Open `https://katha.creatorkitly.com/katha/<slug>` and check title, thumbnail and share buttons.
7. Send Ankit the live link in one line.

## After a significant change
Significant = new feature, layout/design change, dependency, env var, domain/DNS or deployment change.
- Append an entry to `PROGRESS.md` (date, what changed, files, reason, next steps).
- Tell Ankit in one line which docs you updated.

New posts and small fixes don't need a `PROGRESS.md` entry.

## If information is missing
Ask the owner. Don't guess facts, dates, names, places or numbers.
