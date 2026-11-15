// बिना fs वाले helper — client components में भी इस्तेमाल हो सकते हैं
export function formatDate(iso, lang = "hi") {
  return new Date(iso).toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });
}

// लोकप्रियता स्कोर: Like + Share (शेयर को दोगुना वज़न)
export function popularity(s) {
  if (!s) return 0;
  return (s.likes || 0) + 2 * (s.shares || 0);
}
