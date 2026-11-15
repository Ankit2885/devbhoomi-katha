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
  openGraph: { siteName: site.name, locale: "hi_IN", type: "website", images: ["/images/og-default.jpg"] },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.svg" },
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
