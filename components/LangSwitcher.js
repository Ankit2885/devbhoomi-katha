"use client";
import { useEffect, useRef, useState } from "react";
import { autoLanguages } from "@/lib/site";

// Google Translate अपनी cookie मुख्य डोमेन (.creatorkitly.com) पर भी लिख देता है,
// इसलिए host और उसके हर parent domain से cookie हटानी पड़ती है — वरना भाषा वापस नहीं बदलती
function domainVariants() {
  const parts = location.hostname.split(".");
  const out = [""];
  for (let i = 0; i < parts.length - 1; i++) {
    const d = parts.slice(i).join(".");
    out.push(d, "." + d);
  }
  return out;
}

function clearGoogTrans() {
  const exp = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  for (const d of domainVariants()) {
    for (const path of ["/", ""]) {
      document.cookie = `googtrans=; ${exp}${path ? `; path=${path}` : ""}${d ? `; domain=${d}` : ""}`;
    }
  }
}

function currentAuto() {
  const m = document.cookie.match(/googtrans=\/[^/]+\/([a-zA-Z-]+)/);
  return m ? m[1] : null;
}

export default function LangSwitcher() {
  const [lang, setLang] = useState("hi");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const auto = currentAuto();
    if (auto && auto !== "hi") return setLang(auto);
    try {
      setLang(localStorage.getItem("dk-lang") === "hinglish" ? "hinglish" : "hi");
    } catch {}
  }, []);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const choose = (code) => {
    setOpen(false);
    const hadAuto = currentAuto();
    if (code === "hi" || code === "hinglish") {
      try { localStorage.setItem("dk-lang", code); } catch {}
      if (hadAuto) {
        // अनुवाद चालू था: cookie हटाकर साफ़ पेज दोबारा लोड करो (React को छुए बिना)
        clearGoogTrans();
        location.reload();
        return;
      }
      document.documentElement.setAttribute("data-lang", code);
      setLang(code);
      return;
    }
    if (hadAuto === code) return;
    // बाकी भाषाएँ: हिंदी लेख को Google Translate से अनुवाद करें
    try { localStorage.setItem("dk-lang", "hi"); } catch {}
    clearGoogTrans();
    document.cookie = `googtrans=/hi/${code}; path=/`;
    location.reload();
  };

  const autoLabel = autoLanguages.find((l) => l.code === lang)?.label;
  const isOther = autoLabel && lang !== "en";

  return (
    <div className="lang notranslate" ref={ref} translate="no">
      <button className={lang === "hi" ? "on" : ""} onClick={() => choose("hi")}>हिंदी</button>
      <button className={lang === "hinglish" ? "on" : ""} onClick={() => choose("hinglish")}>Hinglish</button>
      <button className={lang === "en" ? "on hide-sm" : "hide-sm"} onClick={() => choose("en")}>English</button>
      <div className="lang-more">
        <button className={isOther ? "on" : ""} onClick={(e) => { e.stopPropagation(); setOpen(!open); }} aria-label="और भाषाएँ">
          🌐 {isOther ? autoLabel : ""} ▾
        </button>
        {open && (
          <div className="lang-dd">
            <div className="lang-dd-head">अपने आप अनुवाद</div>
            {autoLanguages.map((l) => (
              <button key={l.code} className={lang === l.code ? "on" : ""} onClick={() => choose(l.code)}>{l.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
