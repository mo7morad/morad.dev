import { Citation, Prose } from "./Prose";
import { railValue } from "@/lib/evidence";
import { bindSeparators } from "@/lib/typography";
import type { LedgerBlock, Locale, RailEntry } from "@/data/types";

/**
 * The site's one structural idea: what can be verified sits in the rail, what
 * is claimed sits in the column. Nothing crosses.
 *
 * The rail is `aria-label`led rather than visually-hidden-headed because it is
 * supporting apparatus — a screen reader should be able to skip it or read it,
 * but it must not be announced as a section of the argument.
 */
export function Rail({ entries, locale }: { entries: RailEntry[]; locale: Locale }) {
  // An entry whose figure could not be derived is dropped, never rendered with
  // a placeholder — a dash in an evidence column still reads as evidence.
  const resolved = entries
    .map((entry) => ({ label: entry.label, value: railValue(entry) }))
    .filter((e): e is { label: string; value: string } => e.value !== null);
  if (resolved.length === 0) return null;
  return (
    <aside className="rail" aria-label={locale === "ar" ? "المصادر" : "Sources"}>
      {resolved.map(({ label, value }) => (
        <div className="rail-entry" key={label}>
          <span className="rail-label">{bindSeparators(label)}</span>
          {/* Latin figures inside Arabic prose: isolated so digits, dots and
              en-dashes cannot reorder across the direction boundary. */}
          <span className="rail-value">
            <Citation value={value} />
          </span>
        </div>
      ))}
    </aside>
  );
}

/**
 * One block of the argument. The `kind` decides everything: there is no shared
 * fallback rendering, so a block that gains a new kind fails to compile until
 * it is given a shape here.
 */
export function Ledger({ block, locale }: { block: LedgerBlock; locale: Locale }) {
  switch (block.kind) {
    case "prose":
      return (
        <div className="ledger">
          <div className={block.voice ? "ledger-column voice" : "ledger-column"}>
            {block.body.map((paragraph) => (
              <p className="ledger-para" key={paragraph.slice(0, 48)}>
                <Prose text={paragraph} locale={locale} />
              </p>
            ))}
          </div>
          <Rail entries={block.rail} locale={locale} />
        </div>
      );

    case "quote":
      /* The attribution is the rail. A quotation on this site cannot be
         published without the file it came from, so it is not an optional
         entry in a list of sources — it is the only one. */
      return (
        <figure className="ledger quote-block">
          {/* One <bdi> around the whole quotation, not one per Latin run: the
              quotation is a single-language block, and its direction comes
              from its own first strong character. The rule stays on the
              document's reading-start side, because it separates the quote
              from its source, not the quote from itself. */}
          <blockquote className="ledger-column quote-text" lang={block.quoteLang ?? "en"}>
            <bdi>
              <Prose text={block.quote} locale={locale} verbatim />
            </bdi>
          </blockquote>
          <figcaption className="rail quote-source">
            <span className="rail-label">{locale === "ar" ? "من الكود" : "in the repo"}</span>
            <span className="rail-value">
              {/* A path is a Latin run whose slashes and dots would otherwise
                  reorder inside Arabic. */}
              <Citation value={block.attribution} />
            </span>
          </figcaption>
        </figure>
      );

    case "table":
      return (
        <div className="ledger">
          <figure className="ledger-column table-figure">
            <div className="table-scroll">
              <table className="measure-table">
                <thead>
                  <tr>
                    {block.head.map((cell, i) => (
                      <th key={cell || i} scope="col">
                        <bdi>{cell}</bdi>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) =>
                        i === 0 ? (
                          <th key={i} scope="row">
                            {/* "EG → JO" is one Latin token pair, not Arabic
                                prose containing Latin: isolated whole, it
                                keeps its arrow pointing the right way. */}
                            <bdi>
                              <Prose text={cell} locale={locale} verbatim />
                            </bdi>
                          </th>
                        ) : (
                          <td key={i}>
                            <bdi>{cell}</bdi>
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="table-caption">
              <Prose text={block.caption} locale={locale} />
            </figcaption>
          </figure>
          <Rail entries={block.rail} locale={locale} />
        </div>
      );
  }
}
