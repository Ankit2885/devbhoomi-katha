import { site } from "@/lib/site";

// मोबाइल पर "होम स्क्रीन पर जोड़ें" और ब्राउज़र आइकन के लिए
export default function manifest() {
  return {
    name: `${site.name} — ${site.nameHinglish}`,
    short_name: site.name,
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8ec",
    theme_color: "#a5302a",
    lang: "hi",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
