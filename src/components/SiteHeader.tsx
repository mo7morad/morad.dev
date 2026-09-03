import Link from "next/link";
import { LangSwitch } from "./LangSwitch";
import type { Locale, NavCopy } from "@/data/types";

/**
 * Not sticky. The page is four sections long, a sticky bar would cover the
 * evidence rail on small screens, and every destination in it is repeated in
 * the footer — so persistence buys nothing it does not also cost.
 */
export function SiteHeader({
  nav,
  locale,
  homeHref,
  altHref,
}: {
  nav: NavCopy;
  locale: Locale;
  homeHref: string;
  altHref: string;
}) {
  return (
    <header className="header-band">
      <div className="shell site-header">
        <Link href={homeHref} className="wordmark">
          {nav.homeLabel}
        </Link>
        <nav className="header-nav" aria-label={locale === "ar" ? "روابط الموقع" : "Site"}>
          {nav.links.map((link) => (
            <Link key={link.href} href={link.href} className="header-link">
              {link.label}
            </Link>
          ))}
          <LangSwitch
            from={locale}
            href={altHref}
            label={nav.switchLabel}
            ariaLabel={nav.switchAriaLabel}
          />
        </nav>
      </div>
    </header>
  );
}
