import type { CaseStudyCopy, LedgerBlock } from "@/data/types";

/**
 * Structural parity between two language versions of a case study.
 *
 * `tsc` proves both objects have the same shape. It cannot prove they have the
 * same number of sections, or that section four is a table in both — and a
 * translation that quietly drops a paragraph or a measurement is exactly the
 * kind of drift nobody notices until a reader in one language is shown less
 * evidence than a reader in the other.
 *
 * This runs at module scope in the page files, so a mismatch fails
 * `next build` rather than shipping. Nothing is checked at runtime in the
 * browser: a static export has already run this before the HTML exists.
 */
function signature(copy: CaseStudyCopy): string {
  const blockKinds = (blocks: LedgerBlock[]) => blocks.map((b) => b.kind).join(",");
  return [
    `facts:${copy.facts.length}`,
    `intro:${copy.intro.body.length}`,
    `link:${copy.linkLabel === undefined ? "no" : "yes"}`,
    `unfinished:${copy.unfinished === undefined ? "no" : "yes"}`,
    ...copy.sections.map((s, i) => `s${i}[${blockKinds(s.blocks)}]`),
  ].join(" ");
}

export function assertParity(a: CaseStudyCopy, b: CaseStudyCopy): void {
  const sa = signature(a);
  const sb = signature(b);
  if (sa !== sb) {
    throw new Error(
      `Case study "${a.slug}" has drifted between languages.\n` +
        `  en: ${sa}\n  ar: ${sb}\n` +
        `Both languages must present the same structure and the same evidence.`,
    );
  }
}
