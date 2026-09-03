import { EVIDENCE } from "@/data/evidence.generated";
import type { EvidenceField, EvidenceKey, RailEntry } from "@/data/types";

/* Figures come from `src/data/evidence.generated.ts`, which is written by
   `npm run evidence` from the real repositories. Nothing here formats prose —
   the words are always copy, only the number is derived. */

const isMeasured = (repo: EvidenceKey): repo is EvidenceKey & keyof typeof EVIDENCE =>
  repo in EVIDENCE;

/** "2024-05-25" -> "05.2024" */
const asMonth = (iso: string) => `${iso.slice(5, 7)}.${iso.slice(0, 4)}`;

function read(repo: EvidenceKey, field: EvidenceField): string | null {
  if (!isMeasured(repo)) return null;
  const r = EVIDENCE[repo];
  switch (field) {
    case "commitCount":
      return r.commitCount.toLocaleString("en-US");
    case "dateRange":
      return `${asMonth(r.firstCommit)} – ${asMonth(r.lastCommit)}`;
    case "productionLines":
      return r.productionLines.toLocaleString("en-US");
    case "testCases":
      return r.testCases.toLocaleString("en-US");
    case "authorCount":
      return String(r.authors.filter((a) => !a.bot).length);
    default:
      return null;
  }
}

/**
 * The value a rail entry displays, or `null` when it cannot be derived.
 *
 * Returning null rather than a placeholder is the whole point: a repository
 * that could not be measured produces no line, exactly as a city with no
 * verified prices produces no row in the work this site describes. The Rail
 * drops null entries instead of printing "—", because a dash in an evidence
 * column reads as evidence.
 */
export function railValue(entry: RailEntry): string | null {
  if (entry.value !== undefined) return entry.value;
  return read(entry.derived.repo, entry.derived.field);
}
