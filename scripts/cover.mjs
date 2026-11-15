// कवर/थंबनेल बनाता है: design/covers/<slug>.svg  →  public/images/covers/<slug>.jpg (1200x630)
// चलाएँ:  npm run cover            (सारे कवर)
//         npm run cover -- <slug>  (सिर्फ़ एक)
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "design", "covers");
const OUT = path.join(process.cwd(), "public", "images", "covers");
fs.mkdirSync(OUT, { recursive: true });

const only = process.argv[2];
const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".svg") && !f.startsWith("_") && (!only || f === `${only}.svg`));
if (!files.length) {
  console.error(only ? `design/covers/${only}.svg नहीं मिली` : "design/covers में कोई SVG नहीं है");
  process.exit(1);
}
for (const f of files) {
  const out = path.join(OUT, f.replace(/\.svg$/, ".jpg"));
  await sharp(path.join(SRC, f), { density: 96 }).resize(1200, 630).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  console.log("✓", path.relative(process.cwd(), out), Math.round(fs.statSync(out).size / 1024) + "KB");
}
