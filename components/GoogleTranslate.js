"use client";
import { useEffect } from "react";

// तभी लोड होता है जब कोई English/अन्य भाषा चुने — बाकी समय वेबसाइट तेज़ रहती है
export default function GoogleTranslate() {
  useEffect(() => {
    const m = document.cookie.match(/googtrans=\/[^/]+\/([a-zA-Z-]+)/);
    if (!m || m[1] === "hi") return;
    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line no-undef
      new google.translate.TranslateElement({ pageLanguage: "hi", autoDisplay: false }, "google_translate_element");
    };
    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return <div id="google_translate_element" style={{ display: "none" }} />;
}
