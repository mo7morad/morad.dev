/**
 * Makes a "·"-separated list of names wrap only between its items.
 *
 * The rail, the eyebrow and the technology column are narrow, right-aligned
 * mono columns, so they wrap constantly. Two failures follow from that and both
 * are fixed here: a separator that begins a line reads as a bullet point, and a
 * break inside a name splits "Core ML" across two lines as if they were
 * separate things.
 *
 * So each item is made atomic with no-break spaces, and each separator is bound
 * to the item before it. The list still wraps — but only where an item ends,
 * which is the only place a break carries no false meaning.
 *
 * Done here rather than in the copy files: an invisible U+00A0 typed into a
 * content file is a thing a maintainer deletes by accident and never sees.
 */
const NBSP = " ";

export function bindSeparators(text: string): string {
  return text
    .split(" · ")
    .map((item) => item.replace(/ /g, NBSP))
    .join(`${NBSP}· `);
}
