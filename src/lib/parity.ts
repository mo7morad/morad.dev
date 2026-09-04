import type { ArticleCopy, LedgerBlock } from "@/data/types";

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
type Article = ArticleCopy & {
  slug?: string;
  linkLabel?: string;
  unfinished?: string;
  contact?: { links: readonly unknown[] };
};

function signature(copy: Article): string {
  /* Kind, shape and evidence count. A quote block carries no rail — its
     attribution is the evidence — so it is the one kind with nothing to
     count. */
  const blockKinds = (blocks: LedgerBlock[]) =>
    blocks
      .map((b) => {
        if (b.kind === "quote") return "quote";
        const rail = `r${b.rail.length}`;
        if (b.kind === "table") return `table(${b.head?.length ?? "-"}x${b.rows.length},${rail})`;
        return `${b.kind}(${rail})`;
      })
      .join(",");
  return [
    `facts:${copy.facts.length}`,
    `intro:${copy.intro.body.length}`,
    `link:${copy.linkLabel === undefined ? "no" : "yes"}`,
    `unfinished:${copy.unfinished === undefined ? "no" : "yes"}`,
    `contact:${copy.contact ? copy.contact.links.length : "no"}`,
    ...copy.sections.map((s, i) => `s${i}[${blockKinds(s.blocks)}]`),
  ].join(" ");
}

export function assertParity(a: Article, b: Article): void {
  const sa = signature(a);
  const sb = signature(b);
  if (sa !== sb) {
    throw new Error(
      `Article "${a.slug ?? a.title}" has drifted between languages.\n` +
        `  en: ${sa}\n  ar: ${sb}\n` +
        `Both languages must present the same structure and the same evidence.`,
    );
  }
}
