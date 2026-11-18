import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { Logo } from "./Ornaments";
import LangSwitcher from "./LangSwitcher";
import MobileMenu from "./MobileMenu";
import T from "./T";

export default function Header() {
  return (
    <header className="site-header">
      <div className="aipan-strip" />
      <div className="wrap nav">
        <Link href="/" className="logo">
          <Logo />
          <span className="logo-text">
            <T hi={site.name} hg={site.nameHinglish} />
          </span>
        </Link>
        <nav className="links">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              <T hi={l.hi} hg={l.hg} />
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <LangSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
