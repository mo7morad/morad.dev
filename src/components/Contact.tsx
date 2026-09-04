import { Prose } from "./Prose";
import { EXTERNAL_HREF, EXTERNAL_REL } from "@/lib/links";
import { SITE_METADATA } from "@/data/site";
import type { ContactCopy, Locale } from "@/data/types";

/**
 * The closing section of the home page and of the about page.
 *
 * One component rather than two copies, because the two pages make the same
 * offer and a reader who arrives at either should be told the same thing. The
 * serif appears exactly once per page, here, where the site stops describing
 * systems and speaks to whoever is reading.
 */
export function Contact({
  contact,
  locale,
  headingId,
}: {
  contact: ContactCopy;
  locale: Locale;
  headingId: string;
}) {
  return (
    <section className="section" aria-labelledby={headingId}>
      <h2 className="section-head" id={headingId}>
        {contact.heading}
      </h2>
      <div className="offset">
        <p className="voice contact-body">
          <Prose text={contact.body} locale={locale} />
        </p>
        <a className="contact-email" href={EXTERNAL_HREF.email}>
          <bdi>{SITE_METADATA.email}</bdi>
        </a>
        <ul className="contact-links">
          {contact.links.map((link) => (
            <li key={link.to}>
              <a className="link" href={EXTERNAL_HREF[link.to]} rel={EXTERNAL_REL[link.to]}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
