// ग्राफ़िक्स बनाता है (1200x630 JPG):
//   design/covers/<slug>.svg  →  public/images/covers/<slug>.jpg   (थंबनेल)
//   design/images/<name>.svg  →  public/images/posts/<name>.jpg    (कथा के अंदर के चित्र)
// चलाएँ:  npm run cover            (सब)
//         npm run cover -- <name>  (सिर्फ़ एक)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sets = [
  [path.join(root, "design", "covers"), path.join(root, "public", "images", "covers")],
  [path.join(root, "design", "images"), path.join(root, "public", "images", "posts")],
];
const only = process.argv[2];
let done = 0;
for (const [src, out] of sets) {
  if (!fs.existsSync(src)) continue;
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    if (!f.endsWith(".svg") || f.startsWith("_") || (only && f !== `${only}.svg`)) continue;
    const dest = path.join(out, f.replace(/\.svg$/, ".jpg"));
    await sharp(path.join(src, f), { density: 96 }).resize(1200, 630).jpeg({ quality: 80, mozjpeg: true }).toFile(dest);
    console.log("✓", path.relative(root, dest), Math.round(fs.statSync(dest).size / 1024) + "KB");
    done++;
  }
}
if (!done) {
  console.error(only ? `${only}.svg नहीं मिली (design/covers या design/images में देखें)` : "कोई SVG नहीं मिली");
  process.exit(1);
}
