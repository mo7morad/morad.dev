import { LangSwitch } from "./LangSwitch";
import { Prose } from "./Prose";
import type { FooterCopy, FooterSegment, Locale, NavCopy } from "@/data/types";

/** A Latin run inside an Arabic line is isolated, so a trailing full stop
    cannot jump to the other end of the name in front of it. */
function Segment({ segment, locale }: { segment: FooterSegment; locale: Locale }) {
  if (typeof segment === "string") return <Prose text={segment} locale={locale} />;
  const text = segment.ltr ? <bdi>{segment.text}</bdi> : segment.text;
  return segment.href ? (
    <a className="link" href={segment.href}>
      {text}
    </a>
  ) : (
    <>{text}</>
  );
}

/* The language control lives here as well as in the header. The header is not
   sticky, so at the bottom of a long page this is the only one in reach — and
   it is the one destination a reader may want that the contact section above
   does not already offer. */
export function SiteFooter({
  footer,
  locale,
  nav,
  altHref,
}: {
  footer: FooterCopy;
  locale: Locale;
  nav: NavCopy;
  altHref: string;
}) {
  return (
    <footer className="footer-band">
      <div className="shell site-footer">
        <div className="footer-legal">
          {footer.legal.map((line, index) => (
            <p key={index}>
              {line.map((segment, i) => (
                <Segment key={i} segment={segment} locale={locale} />
              ))}
            </p>
          ))}
        </div>
        <LangSwitch
          from={locale}
          href={altHref}
          label={nav.switchLabel}
          ariaLabel={nav.switchAriaLabel}
        />
      </div>
    </footer>
  );
}
