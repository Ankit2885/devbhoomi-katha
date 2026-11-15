"use client";
import { useEffect } from "react";

// Google Translate पेज के text को <font> टैग में बदल देता है। उसके बाद React जब पेज बदलता है
// (जैसे भाषा बटन या दूसरी कथा खोलना) तो "removeChild" error से पूरा पेज अटक जाता है।
// यह patch उस error को रोकता है — सिर्फ़ तब लगता है जब अनुवाद चालू हो।
function patchDomForTranslate() {
  if (typeof Node !== "function" || Node.prototype.__dkPatched) return;
  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return removeChild.apply(this, arguments);
  };
  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, ref) {
    if (ref && ref.parentNode !== this) return newNode;
    return insertBefore.apply(this, arguments);
  };
  Node.prototype.__dkPatched = true;
}

// तभी लोड होता है जब कोई English/अन्य भाषा चुने — बाकी समय वेबसाइट तेज़ रहती है
export default function GoogleTranslate() {
  useEffect(() => {
    const m = document.cookie.match(/googtrans=\/[^/;]+\/([a-zA-Z-]+)/);
    if (!m || m[1] === "hi") return;
    patchDomForTranslate();
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
