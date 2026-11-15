import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/700.css";
import "@fontsource/tiro-devanagari-hindi/400.css";
import "@fontsource/yatra-one/400.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleTranslate from "@/components/GoogleTranslate";
import { site } from "@/lib/site";
import "./globals.css";


export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.tagline,
  applicationName: site.name,
  keywords: ["उत्तराखंड", "देवभूमि", "देवी-देवता", "लोक कथा", "कुमाऊँ", "गढ़वाल", "Uttarakhand", "Devbhoomi", "Pahadi katha"],
  openGraph: {
    siteName: site.name,
    locale: "hi_IN",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  // Google Discover और Image search में बड़ी फ़ोटो दिखाने की अनुमति
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  alternates: { canonical: "/" },
};

export const viewport = { themeColor: "#a5302a" };

const langInit = `(function(){try{if(localStorage.getItem('dk-lang')==='hinglish'&&!/googtrans=\\/[^/]+\\/(?!hi)/.test(document.cookie))document.documentElement.setAttribute('data-lang','hinglish')}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: langInit }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <GoogleTranslate />
      </body>
    </html>
  );
}
