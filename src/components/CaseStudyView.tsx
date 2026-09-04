import { Contact } from "./Contact";
import { Ledger, Rail } from "./Ledger";
import { Prose } from "./Prose";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { bindSeparators } from "@/lib/typography";
import { PROJECT_LINK } from "@/data/projects";
import type {
  ArticleCopy,
  ContactCopy,
  ProjectSlug,
  FooterCopy,
  Locale,
  NavCopy,
} from "@/data/types";

/**
 * A case study is the home page's grammar at length: the same rail, the same
 * rule, the same law about which colour means what.
 *
 * There is no breadcrumb. The page is one level below the index, the header
 * already carries a link back to it, and a BreadcrumbList emitted without a
 * visible trail would be markup claiming something the page does not show —
 * which is the exact failure this site is written to avoid.
 */
export function CaseStudyView({
  copy,
  nav,
  footer,
  locale,
  homeHref,
  altHref,
  currentPath,
}: {
  copy: ArticleCopy & {
    slug?: ProjectSlug;
    linkLabel?: string;
    unfinished?: string;
    /* Present on the about page, absent on a case study: a case study ends by
       handing the reader back to the work, not by asking for an email. */
    contact?: ContactCopy;
  };
  nav: NavCopy;
  footer: FooterCopy;
  locale: Locale;
  homeHref: string;
  altHref: string;
  currentPath: string;
}) {
  const href = copy.slug ? PROJECT_LINK[copy.slug] : undefined;

  return (
    <>
      <a className="skip-link" href="#content">
        {nav.skipToContent}
      </a>

      <SiteHeader
        nav={nav}
        locale={locale}
        homeHref={homeHref}
        altHref={altHref}
        currentPath={currentPath}
      />

      <main id="content" className="shell">
        <article>
          <header className="section case-head">
            <div className="ledger">
              <div className="case-title-column">
                <p className="hero-eyebrow">{bindSeparators(copy.eyebrow)}</p>
                <h1 className="case-title">
                  <bdi>{copy.title}</bdi>
                </h1>
                <p className="case-thesis">
                  <Prose text={copy.thesis} locale={locale} />
                </p>
                {href && copy.linkLabel ? (
                  <p className="case-link">
                    <a className="link" href={href}>
                      {copy.linkLabel}
                    </a>
                  </p>
                ) : null}
              </div>
              <Rail entries={copy.facts} />
            </div>
          </header>

          <div className="case-intro">
            <Ledger block={copy.intro} locale={locale} />
          </div>

          {copy.sections.map((section, i) => (
            <section className="section case-section" key={section.heading} aria-labelledby={`s${i}`}>
              <h2 className="section-head" id={`s${i}`}>
                <Prose text={section.heading} locale={locale} />
              </h2>
              {section.blocks.map((block, j) => (
                <div className="case-block" key={j}>
                  <Ledger block={block} locale={locale} />
                </div>
              ))}
            </section>
          ))}

          {/* An unfinished project says so, in the same voice it says
              everything else. */}
          {copy.unfinished ? (
            <p className="case-unfinished offset">
              <Prose text={copy.unfinished} locale={locale} />
            </p>
          ) : null}
        </article>

        {copy.contact ? (
          <Contact contact={copy.contact} locale={locale} headingId="contact-heading" />
        ) : null}
      </main>

      <SiteFooter footer={footer} locale={locale} nav={nav} altHref={altHref} />
    </>
  );
}
