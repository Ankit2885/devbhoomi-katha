# देवभूमि कथा 🙏

उत्तराखंड के देवी-देवताओं, लोक कथाओं और रहस्यों का ब्लॉग, जो Next.js पर बना है और Vercel पर चलता है।

---

## ✍️ नई कथा (पोस्ट) कैसे डालें

हर कथा `content/posts/` फ़ोल्डर में एक `.md` फ़ाइल होती है।

### 1. हिंदी पोस्ट: `content/posts/meri-katha.md`

फ़ाइल का नाम ही पोस्ट का लिंक बनेगा, यानी `/katha/meri-katha`। नाम अंग्रेज़ी अक्षरों में और बिना स्पेस (`-` लगाकर) रखें।

```md
---
title: "कथा का शीर्षक"
excerpt: "2-3 लाइन का सार — यही Google और WhatsApp शेयर में दिखेगा"
date: "2026-11-20"
category: "devi-devta"
cover: "/images/meri-photo.jpg"
cover_alt: "फ़ोटो में क्या है"
video: ""
tags: ["गोलू देवता", "अल्मोड़ा"]
featured: false
---

यहाँ से कथा लिखना शुरू करें...

## उप-शीर्षक

**मोटे अक्षर**, *तिरछे अक्षर*

> उद्धरण / श्लोक

- सूची
- सूची
```

**category** इनमें से कोई एक होनी चाहिए:
`devi-devta` · `lok-katha` · `pavan-dham` · `aisa-kyon` · `parv-parampara`

**featured: true** लिखेंगे तो वह कथा होमपेज पर "आज की विशेष कथा" बनेगी।
**draft: true** लिखेंगे तो कथा वेबसाइट पर नहीं दिखेगी।

### 2. Hinglish पोस्ट: `content/posts/meri-katha.hinglish.md`

उसी नाम के आगे `.hinglish.md` लगाएँ:

```md
---
title: "Katha ka sheershak"
excerpt: "2-3 line ka saar"
---

Yahan se Hinglish mein katha...
```

Hinglish फ़ाइल न हो, तो Hinglish चुनने पर हिंदी कथा ही दिखेगी।
English, मराठी, गुजराती वगैरह में अनुवाद Google Translate से अपने आप होता है।

### 3. फ़ोटो

फ़ोटो को `public/images/` में डालें, फिर कथा में ऐसे लगाएँ:

```md
![फ़ोटो का विवरण](/images/chitai-mandir.jpg)
```

अच्छे कवर फ़ोटो का साइज़ **1200 × 630** होता है (JPG, 300KB से कम)।

### 4. वीडियो

- **YouTube वीडियो या Shorts:** लिंक को कथा में **अपनी अलग लाइन** में चिपका दें, वह अपने आप प्लेयर बन जाएगा:

  ```
  https://www.youtube.com/watch?v=XXXXXXXXXXX
  ```

- **अपनी MP4 फ़ाइल:** `public/videos/` में डालें और उसका लिंक अलग लाइन में लिखें, जैसे `/videos/jagar.mp4`। (बड़ी वीडियो YouTube पर डालना बेहतर है।)
- **कवर की जगह वीडियो:** frontmatter में `video: "https://youtu.be/XXXXXXXXXXX"` लिखें।

---

## ⚙️ सेटिंग्स — `lib/site.js`

- वेबसाइट का नाम और टैगलाइन
- `url`: अपना असली डोमेन
- `social`: अपने WhatsApp चैनल, Instagram, YouTube, Facebook, Telegram और X के लिंक (भरने पर footer और होमपेज पर दिखेंगे)

---

## ❤️ Like की गिनती चालू करें (मुफ़्त)

अभी Like बटन काम करता है, पर सबकी Like गिनने के लिए database चाहिए:

1. Vercel में प्रोजेक्ट खोलें, फिर **Storage → Create Database → Upstash (Redis)** चुनें (Free)
2. उसे इस प्रोजेक्ट से connect करें, ताकि environment variables अपने आप जुड़ जाएँ
3. एक बार **Redeploy** करें

---

## 🚀 कंप्यूटर पर चलाना

```bash
npm install
npm run dev
```

इसके बाद http://localhost:3000 खोलें।

## 🌐 Vercel पर अपडेट

- **GitHub से जुड़ा हो:** नई `.md` फ़ाइल GitHub पर डालते ही वेबसाइट अपने आप अपडेट हो जाएगी।
- **CLI से:** इस फ़ोल्डर में `npx vercel --prod` चलाएँ।

---

## 💰 कमाई के लिए आगे

- **Google AdSense:** 20–30 कथाएँ होने के बाद apply करें
- **Google Search Console** में `https://katha.creatorkitly.com/sitemap.xml` जमा करें
- हर कथा को WhatsApp, Instagram Reels और YouTube Shorts पर शेयर करें
