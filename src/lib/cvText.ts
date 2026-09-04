import { evidenceValue } from "@/lib/evidence";
import type { CvPoint } from "@/data/types";

/**
 * Resolves inline figures for a CV point. If any referenced figure cannot be
 * verified from repository evidence, the point is dropped entirely rather than
 * printed with an unverified estimate or a placeholder.
 */
export function fillPoint(point: CvPoint): string | null {
  if (!point.figures || point.figures.length === 0) {
    return point.template;
  }

  let text = point.template;
  for (let i = 0; i < point.figures.length; i++) {
    const figure = point.figures[i];
    const value = evidenceValue(figure.repo, figure.field);
    if (value === null) {
      return null;
    }
    text = text.replaceAll(`{${i}}`, value);
  }

  /* A leftover slot means the template asks for a figure that was never
     supplied — an authoring mistake, not an unmeasurable repository. Dropping
     the line would hide it, so it fails the build instead. */
  const orphan = text.match(/\{\d+\}/);
  if (orphan) {
    throw new Error(
      `CV template has no figure for ${orphan[0]}: ${point.template.slice(0, 60)}…`,
    );
  }

  return text;
}
