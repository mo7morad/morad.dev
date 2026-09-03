import type { LedgerBlock, Locale, RailEntry } from "@/data/types";
import { railValue } from "@/lib/evidence";
import { bindSeparators } from "@/lib/typography";

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
            <bdi>{value}</bdi>
          </span>
        </div>
      ))}
    </aside>
  );
}

export function Ledger({ block, locale }: { block: LedgerBlock; locale: Locale }) {
  return (
    /* Column before rail in the DOM, rail before column on screen: grid
       placement puts each where it belongs. A screen reader should hear the
       claim and then its sources, not four measurements and then the sentence
       they were supporting. */
    <div className="ledger">
      <div className={block.voice ? "ledger-column voice" : "ledger-column"}>
        {block.body.map((paragraph) => (
          <p className="ledger-para" key={paragraph.slice(0, 48)}>
            {paragraph}
          </p>
        ))}
      </div>
      <Rail entries={block.rail} locale={locale} />
    </div>
  );
}
