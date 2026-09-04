import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { fillPoint } from "@/lib/cvText";
import { EXTERNAL_HREF, EXTERNAL_REL } from "@/lib/links";
import type { CvCopy, FooterCopy, NavCopy } from "@/data/types";

/**
 * Server component rendering the CV view. It contains no client JavaScript or
 * print triggers, ensuring full functionality with scripts disabled while
 * remaining cleanly printable via browser standard shortcuts.
 */
export function CvView({
  copy,
  nav,
  footer,
}: {
  copy: CvCopy;
  nav: NavCopy;
  footer: FooterCopy;
}) {
  const summary = fillPoint(copy.summary);

  return (
    <>
      <a className="skip-link" href="#content">
        {nav.skipToContent}
      </a>

      <SiteHeader nav={nav} locale="en" homeHref="/" altHref="/ar/" />

      <main id="content" className="shell">
        <article className="cv">
          <header className="cv-head">
            <h1 className="cv-name">{copy.name}</h1>
            <p className="cv-role">{copy.role}</p>
            <ul className="cv-contact">
              {copy.contactLine.map((link) => (
                <li key={link.to}>
                  <a
                    className="link"
                    href={EXTERNAL_HREF[link.to]}
                    rel={EXTERNAL_REL[link.to]}
                  >
                    <bdi>{link.label}</bdi>
                  </a>
                </li>
              ))}
            </ul>
            <p className="cv-standing">{copy.standing}</p>
          </header>

          {summary ? <p className="cv-summary">{summary}</p> : null}
          <p className="cv-print-note">{copy.printNote}</p>

          {copy.sections.map((section) => {
            const activeEntries = section.entries
              .map((entry) => ({
                ...entry,
                resolvedPoints: entry.points
                  .map(fillPoint)
                  .filter((p): p is string => p !== null),
              }))
              .filter((entry) => entry.resolvedPoints.length > 0);

            if (activeEntries.length === 0) return null;

            return (
              <section className="cv-section" key={section.heading}>
                <h2 className="cv-section-head">{section.heading}</h2>
                {activeEntries.map((entry) => {
                  /* An entry that is one line with no dates and no stack is a
                     term and its definition — a skill, not a post. Given a
                     heading and a one-item bullet list it would claim a
                     structure it does not have, and would put six more h3s in
                     the outline of a two-page document. */
                  const isPair =
                    entry.resolvedPoints.length === 1 &&
                    !entry.role &&
                    !entry.when &&
                    !entry.stack;
                  if (isPair) {
                    return (
                      <p className="cv-pair" key={entry.title}>
                        <span className="cv-term">{entry.title}</span>
                        {entry.resolvedPoints[0]}
                      </p>
                    );
                  }
                  return (
                  <div className="cv-entry" key={entry.title}>
                    <div className="cv-entry-head">
                      <h3 className="cv-entry-title">
                        <bdi>{entry.title}</bdi>
                      </h3>
                      {entry.when ? (
                        <span className="cv-when">
                          <bdi>{entry.when}</bdi>
                        </span>
                      ) : null}
                    </div>
                    {entry.role ? <p className="cv-entry-role">{entry.role}</p> : null}
                    {entry.stack ? (
                      <p className="cv-stack">
                        <bdi>{entry.stack}</bdi>
                      </p>
                    ) : null}
                    <ul className="cv-points">
                      {entry.resolvedPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  );
                })}
              </section>
            );
          })}
        </article>
      </main>

      <SiteFooter footer={footer} locale="en" nav={nav} altHref="/ar/" />
    </>
  );
}
