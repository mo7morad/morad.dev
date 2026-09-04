import Link from "next/link";
import { Contact } from "./Contact";
import { Prose } from "./Prose";
import { Rail } from "./Ledger";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { bindSeparators } from "@/lib/typography";
import type { HomeCopy, ProjectSlug } from "@/data/types";

/**
 * The home page in one component, rendered by both language routes with
 * different copy. There is no locale branching in here beyond the two href
 * prefixes: every string arrives as data, which is what keeps the two
 * languages from drifting apart in markup as well as in words.
 */
export function HomeView({
  copy,
  homeHref,
  altHref,
  currentPath,
}: {
  copy: HomeCopy;
  homeHref: string;
  altHref: string;
  currentPath: string;
}) {
  const { locale, nav, hero, timeline, work, contact, footer } = copy;
  const projectHref = (slug: ProjectSlug) =>
    locale === "ar" ? `/ar/${slug}/` : `/${slug}/`;

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
        {/* The thesis, annotated. Each marked claim has a line in the rail
            beside it — the page states nothing it cannot immediately source. */}
        <section className="section hero" aria-labelledby="thesis">
          <div className="ledger">
            <div className="hero-column">
              <p className="hero-eyebrow">{bindSeparators(hero.eyebrow)}</p>
              <h1 className="hero-statement" id="thesis">
                {hero.sentence.map((span, i) =>
                  span.mark ? (
                    <em className="mark" key={i}>
                      <Prose text={span.text} locale={locale} />
                    </em>
                  ) : (
                    <span key={i}>
                      <Prose text={span.text} locale={locale} />
                    </span>
                  ),
                )}
              </h1>
            </div>
            <Rail entries={hero.rail} />
          </div>
        </section>

        <section className="section" aria-labelledby="timeline-heading">
          <h2 className="section-head" id="timeline-heading">
            {timeline.heading}
          </h2>
          <ol className="timeline">
            {timeline.entries.map((entry) => (
              <li
                className={entry.ahead ? "timeline-entry is-ahead" : "timeline-entry"}
                key={`${entry.when}-${entry.what}`}
              >
                <span className="timeline-when">
                  <bdi>{entry.when}</bdi>
                </span>
                <div className="timeline-body">
                  <h3 className="timeline-what">
                    <Prose text={entry.what} locale={locale} />
                  </h3>
                  {entry.detail ? (
                    <p className="timeline-detail">
                      <Prose text={entry.detail} locale={locale} />
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" id="work" aria-labelledby="work-heading">
          <h2 className="section-head" id="work-heading">
            {work.heading}
          </h2>
          <div className="work-list">
            {work.cards.map((card) => (
              <Link className="work-row" key={card.slug} href={projectHref(card.slug)}>
                <div className="work-main">
                  <h3 className="work-title">
                    <bdi>{card.title}</bdi>
                    <span className="work-arrow" aria-hidden="true">
                      →
                    </span>
                  </h3>
                  <p className="work-line">
                    <Prose text={card.line} locale={locale} />
                  </p>
                  <p className="work-role">
                    <Prose text={card.role} locale={locale} />
                  </p>
                </div>
                {/* Last in the DOM so the link is named "Trippé, a trip
                    recommender…" rather than "Cloudflare Workers, Supabase…";
                    first on screen, by grid placement. */}
                <div className="work-tech">
                  <bdi>{bindSeparators(card.tech)}</bdi>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <Contact contact={contact} locale={locale} headingId="contact-heading" />
      </main>

      <SiteFooter footer={footer} locale={locale} nav={nav} altHref={altHref} />
    </>
  );
}
