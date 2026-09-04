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
  currentPath,
}: {
  nav: NavCopy;
  locale: Locale;
  homeHref: string;
  altHref: string;
  currentPath: string;
}) {
  return (
    <header className="header-band">
      <div className="shell site-header">
        <Link href={homeHref} className="wordmark">
          {nav.homeLabel}
        </Link>
        <nav className="header-nav" aria-label={locale === "ar" ? "روابط الموقع" : "Site"}>
          {nav.links.map((link) => {
            const isCurrent = link.href === currentPath;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isCurrent ? "header-link is-current" : "header-link"}
                {...(isCurrent ? { "aria-current": "page" as const } : {})}
                /* The Arabic nav points at an English document and must say so. */
                {...(link.lang ? { lang: link.lang, hrefLang: link.lang } : {})}
              >
                {link.label}
              </Link>
            );
          })}
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
