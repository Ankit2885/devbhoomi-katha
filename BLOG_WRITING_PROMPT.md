# BLOG_WRITING_PROMPT.md — देवभूमि कथा के लिए कथा कैसे लिखें

Use this every time you write or format a post. Format rules are in `CLAUDE.md`.

---

## 1. Copy-paste prompt (for the AI that writes the post)

```
You are writing for देवभूमि कथा (katha.creatorkitly.com), a Hindi blog about Uttarakhand's
devi-devta, lok kathayein, pavan dham, parv-parampara and "ऐसा क्यों होता है?" mysteries.
Audience: Hindi-speaking families of Uttarakhand (in the state and outside), mostly on mobile,
who read and forward on WhatsApp.

TOPIC: <topic>          CATEGORY: <devi-devta | lok-katha | pavan-dham | aisa-kyon | parv-parampara>
SEARCH PHRASES: <3–5 ways people would search this in Hindi/Hinglish, e.g. "golu devta ki katha">

STRUCTURE:
1. Hook (2–3 lines): a scene or a question. No "आज हम जानेंगे…" style filler.
2. 4–7 `##` sub-headings written as what people ask: "कौन हैं …?", "कथा क्या है?",
   "… क्यों होता है?", "कहाँ है मंदिर?", "कब लगता है मेला?".
3. The story as मान्यता/लोक कथा. One `>` quote block for a key line, jaykara or dialogue.
4. For "ऐसा क्यों?": a "मान्यता क्या कहती है?" section AND a "विज्ञान/इतिहास क्या कहता है?" section.
5. A practical part when it fits: कहाँ है, कैसे पहुँचें, कब जाएँ (only facts you are sure of).
6. End with one question to the reader that invites sharing ("आपके गाँव में…?").

LENGTH: 500–1,000 words. Short paragraphs (2–4 lines) — people read on phones.

STYLE: simple spoken Hindi (not Sanskrit-heavy), warm and respectful, **bold** for key names.

HONESTY (hard rules):
- Stories are framed as मान्यता / लोक कथा, not as proven fact.
- No invented dates, numbers, quotes, miracles or "scientists proved…" claims.
  If you are not sure of a number (height, distance, year), leave it out.
- No mocking any belief, community, caste or region.
- No copied text from other sites, books, songs or bhajans.

RETURN:
- slug (Latin, hyphens), title (≤ 60 chars, keyword first), excerpt (130–155 chars),
  category, 4–6 tags, cover_alt
- the Hindi Markdown body
- the Hinglish Markdown body (faithful transliteration, same headings)
- a 1-line idea for the thumbnail graphic
```

---

## 2. Thumbnail (मस्ट)

Every post needs `public/images/covers/<slug>.jpg` at 1200×630.

- **Owner sends a photo:** use it. Centre-crop to 1.91:1, resize to 1200×630, JPG quality ~80.
- **No photo:** make an Aipan-style graphic.
  1. Copy the closest file in `design/covers/` to `design/covers/<slug>.svg`.
  2. Keep the frame (outer border, dotted inner border, four corner circles, dot pattern).
  3. Replace the middle with simple white line art for the topic (temple, peak, river, bell, diya, dhol, animal…), using gold `#e3b04b` for 1–2 highlights.
  4. No text, no faces of real people.
  5. Run `npm run cover -- <slug>` and look at the JPG before publishing.

Background colours: `#a5302a` (default), `#9b2c27` (rivers/temples), `#6e1b17` (night, rahasya, jagar).

---

## 3. Guest / owner posts

When Ankit sends text written by himself or someone else:
- Publish it **as written**. Only add `##` sub-headings and paragraph breaks, fix clear typos, and bold a few key phrases.
- Add `author` / `author_hinglish` in the frontmatter so the byline shows.
- For opinion pieces, end with: *यह लेखक के निजी विचार हैं।* plus a question that invites discussion.
- Write the Hinglish file from the same text.

---

## 4. Pre-publish checklist

- [ ] Title ≤ 60 chars and has the main search phrase
- [ ] Excerpt 130–155 chars and reads well as a WhatsApp preview
- [ ] Thumbnail 1200×630, < 200 KB, `cover_alt` filled
- [ ] At least one inline illustration with alt + caption (Hindi and Hinglish files)
- [ ] Hinglish file present
- [ ] Only one `featured: true` across all posts
- [ ] No unsure numbers or dates; stories framed as मान्यता
- [ ] `npm run build` passes
