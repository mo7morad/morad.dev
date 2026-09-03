import { EVIDENCE } from "@/data/evidence.generated";
import type { EvidenceKey, Locale } from "@/data/types";

/**
 * Monthly commits, drawn from the generated evidence.
 *
 * The chart's job is not to let anyone read an individual month. It is to show
 * the shape of twenty-one months: months of almost nothing, a first spike, a
 * long middle, and one month at the end four times the size of anything before
 * it. So the axis is labelled by year rather than by month, exactly one value
 * is written on the plot, and the precise range lives in the rail where every
 * other measurement on this site lives.
 *
 * One series, so there is no legend and no categorical palette to validate —
 * and the bars are on the neutral ink scale, because the colour law reserves
 * ochre for provenance and a bar is not a source.
 *
 * No JavaScript. Hover feedback is CSS, the per-bar readout is a native SVG
 * <title>, and the numbers themselves are in a real table below.
 */
const W = 680;
const PLOT_H = 140;
const AXIS_H = 34;
const GAP = 5;

export function CommitHistogram({
  source,
  caption,
  tableLabel,
  altText,
  locale,
}: {
  source: EvidenceKey;
  caption: string;
  tableLabel: string;
  altText: string;
  locale: Locale;
}) {
  const repo = EVIDENCE[source];
  // No empty-array guard: the generated module is `as const`, so tsc knows the
  // exact length of every series and rejects the check as unreachable. The
  // generator omits a repository it could not measure rather than emitting an
  // empty one.
  const months = repo.commitsByMonth;

  const max = Math.max(...months.map((m) => m.commits));
  const slot = W / months.length;
  const barW = slot - GAP;
  const peakIndex = months.findIndex((m) => m.commits === max);

  // A tick per January, plus the first month so the series has a start.
  const ticks = months
    .map((m, i) => ({ i, year: m.month.slice(0, 4), isJan: m.month.endsWith("-01") }))
    .filter((t, idx) => t.isJan || idx === 0);

  return (
    <figure className="chart-figure">
      {/* role="img" with a summary, rather than exposing 22 bars one by one.
          The numbers are in the table below for anyone who wants them. */}
      <svg
        className="histogram"
        viewBox={`0 0 ${W} ${PLOT_H + AXIS_H}`}
        role="img"
        aria-label={altText}
        preserveAspectRatio="xMidYMid meet"
      >
        {months.map((m, i) => {
          const h = max === 0 ? 0 : (m.commits / max) * PLOT_H;
          const x = i * slot + GAP / 2;
          const y = PLOT_H - h;
          const r = Math.min(3, h, barW / 2);
          return (
            <g key={m.month} className="histogram-bar">
              {/* A zero month draws nothing, and the baseline underneath is
                  what says the month was measured rather than missing. */}
              {h > 0 ? (
                <path
                  d={`M${x},${PLOT_H} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + barW - r},${y} Q${x + barW},${y} ${x + barW},${y + r} L${x + barW},${PLOT_H} Z`}
                />
              ) : null}
              {/* Full-height hit area, so a one-commit month is as easy to
                  hover as the tallest one. */}
              <rect x={x} y={0} width={barW} height={PLOT_H} fill="transparent">
                <title>{`${m.month} — ${m.commits}`}</title>
              </rect>
            </g>
          );
        })}

        <line className="histogram-axis" x1={0} y1={PLOT_H} x2={W} y2={PLOT_H} />

        {ticks.map(({ i, year }) => (
          <text key={`${year}-${i}`} className="histogram-tick" x={i * slot + GAP / 2} y={PLOT_H + 20}>
            {year}
          </text>
        ))}

        {/* The one value written on the plot: the month that dwarfs the rest. */}
        <text
          className="histogram-peak"
          x={peakIndex * slot + GAP / 2 + barW / 2}
          y={PLOT_H - (max / max) * PLOT_H - 8}
          textAnchor="middle"
        >
          {max}
        </text>
      </svg>

      <figcaption className="table-caption">{caption}</figcaption>

      <details className="chart-data">
        <summary>{tableLabel}</summary>
        <div className="table-scroll">
          <table className="measure-table">
            <thead>
              <tr>
                <th scope="col">{locale === "ar" ? "الشهر" : "month"}</th>
                <th scope="col">{locale === "ar" ? "كوميتس" : "commits"}</th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => (
                <tr key={m.month}>
                  <th scope="row">
                    <bdi>{m.month}</bdi>
                  </th>
                  <td>
                    <bdi>{m.commits}</bdi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
