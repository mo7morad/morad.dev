/* GENERATED FILE - do not edit by hand.
 *
 * Written by `npm run evidence` (scripts/collect-evidence.mjs), which measures
 * the real repositories. Every figure the site states is read from here, so a
 * number can never drift from the work it describes. A repository that could
 * not be measured is omitted rather than zeroed.
 *
 * Commit counts, dates and authors describe the DEFAULT BRANCH (named in
 * `ref`) - not the checked-out branch, and not every local branch. It is the
 * only count a reader could reproduce from a clone. Line counts exclude
 * generated and vendored files.
 *
 * Generated: 2026-09-04
 */

export interface AuthorEvidence {
  readonly name: string;
  readonly commits: number;
  /** True for the site owner, whose several git identities are merged. */
  readonly isOwner: boolean;
  readonly bot: boolean;
}

export interface MonthEvidence {
  readonly month: string;
  readonly commits: number;
}

export interface RepoEvidence {
  readonly label: string;
  /** The git ref every commit figure below was measured against. */
  readonly ref: string;
  readonly commitCount: number;
  readonly firstCommit: string;
  readonly lastCommit: string;
  readonly authors: readonly AuthorEvidence[];
  readonly commitsByMonth: readonly MonthEvidence[];
  readonly productionFiles: number;
  readonly productionLines: number;
  readonly testFiles: number;
  readonly testLines: number;
  readonly testCases: number;
  /** Counted from the files, not the git history. Null when the repo
      has none of these to count. */
  readonly artifacts: RepoArtifacts | null;
}

export interface RepoArtifacts {
  readonly certificatesBackend: number;
  readonly certificatesFrontend: number;
  readonly dvldPresentationLines: number;
  readonly dvldBusinessLines: number;
  readonly dvldDataAccessLines: number;
  readonly dvldForms: number;
  readonly dvldQueries: number;
  readonly dvldBoundParameters: number;
  readonly dvldSqlAboveDataAccess: number;
}

export const EVIDENCE = {
  trippeBackend: {
    label: "Trippe backend",
    ref: "origin/HEAD",
    commitCount: 553,
    firstCommit: "2026-04-15",
    lastCommit: "2026-08-23",
    authors: [
      { name: "Mohamed Morad", commits: 553, isOwner: true, bot: false },
    ],
    commitsByMonth: [
      { month: "2026-04", commits: 47 },
      { month: "2026-05", commits: 137 },
      { month: "2026-06", commits: 59 },
      { month: "2026-07", commits: 187 },
      { month: "2026-08", commits: 123 },
    ],
    productionFiles: 175,
    productionLines: 27844,
    testFiles: 123,
    testLines: 21270,
    testCases: 989,
    artifacts: null,
  },
  trippeIOS: {
    label: "Trippe iOS",
    ref: "main",
    commitCount: 204,
    firstCommit: "2026-06-19",
    lastCommit: "2026-08-23",
    authors: [
      { name: "Mohamed Morad", commits: 204, isOwner: true, bot: false },
    ],
    commitsByMonth: [
      { month: "2026-06", commits: 12 },
      { month: "2026-07", commits: 135 },
      { month: "2026-08", commits: 57 },
    ],
    productionFiles: 379,
    productionLines: 47969,
    testFiles: 99,
    testLines: 15409,
    testCases: 768,
    artifacts: null,
  },
  roadmap: {
    label: "Backend roadmap",
    ref: "origin/HEAD",
    commitCount: 669,
    firstCommit: "2024-05-25",
    lastCommit: "2026-02-02",
    authors: [
      { name: "Mohamed Morad", commits: 664, isOwner: true, bot: false },
      { name: "copilot-swe-agent[bot]", commits: 5, isOwner: false, bot: true },
    ],
    commitsByMonth: [
      { month: "2024-05", commits: 10 },
      { month: "2024-06", commits: 13 },
      { month: "2024-07", commits: 4 },
      { month: "2024-08", commits: 1 },
      { month: "2024-09", commits: 6 },
      { month: "2024-10", commits: 0 },
      { month: "2024-11", commits: 6 },
      { month: "2024-12", commits: 75 },
      { month: "2025-01", commits: 57 },
      { month: "2025-02", commits: 79 },
      { month: "2025-03", commits: 27 },
      { month: "2025-04", commits: 36 },
      { month: "2025-05", commits: 30 },
      { month: "2025-06", commits: 28 },
      { month: "2025-07", commits: 12 },
      { month: "2025-08", commits: 13 },
      { month: "2025-09", commits: 8 },
      { month: "2025-10", commits: 19 },
      { month: "2025-11", commits: 37 },
      { month: "2025-12", commits: 174 },
      { month: "2026-01", commits: 20 },
      { month: "2026-02", commits: 14 },
    ],
    productionFiles: 1921,
    productionLines: 165662,
    testFiles: 14,
    testLines: 2982,
    testCases: 71,
    artifacts: {
      certificatesBackend: 25,
      certificatesFrontend: 1,
      dvldPresentationLines: 8384,
      dvldBusinessLines: 2071,
      dvldDataAccessLines: 3005,
      dvldForms: 45,
      dvldQueries: 92,
      dvldBoundParameters: 222,
      dvldSqlAboveDataAccess: 0,
    },
  },
  wasteSort: {
    label: "ECOdyssey",
    ref: "origin/HEAD",
    commitCount: 119,
    firstCommit: "2026-08-13",
    lastCommit: "2026-08-26",
    authors: [
      { name: "Javohir", commits: 54, isOwner: false, bot: false },
      { name: "Mohamed Morad", commits: 32, isOwner: true, bot: false },
      { name: "Danil", commits: 32, isOwner: false, bot: false },
      { name: "copilot-swe-agent[bot]", commits: 1, isOwner: false, bot: true },
    ],
    commitsByMonth: [
      { month: "2026-08", commits: 119 },
    ],
    productionFiles: 182,
    productionLines: 25735,
    testFiles: 46,
    testLines: 8093,
    testCases: 446,
    artifacts: null,
  },
  academy: {
    label: "Apple Developer Academy",
    ref: "origin/HEAD",
    commitCount: 239,
    firstCommit: "2026-04-15",
    lastCommit: "2026-08-16",
    authors: [
      { name: "Mohamed Morad", commits: 168, isOwner: true, bot: false },
      { name: "Vitha", commits: 42, isOwner: false, bot: false },
      { name: "David Paul Ong", commits: 14, isOwner: false, bot: false },
      { name: "Lela Berliani", commits: 9, isOwner: false, bot: false },
      { name: "copilot-swe-agent[bot]", commits: 5, isOwner: false, bot: true },
      { name: "shafrial", commits: 1, isOwner: false, bot: false },
    ],
    commitsByMonth: [
      { month: "2026-04", commits: 16 },
      { month: "2026-05", commits: 32 },
      { month: "2026-06", commits: 80 },
      { month: "2026-07", commits: 109 },
      { month: "2026-08", commits: 2 },
    ],
    productionFiles: 118,
    productionLines: 9381,
    testFiles: 0,
    testLines: 0,
    testCases: 0,
    artifacts: null,
  },
} as const satisfies Record<string, RepoEvidence>;

export const EVIDENCE_GENERATED_AT = "2026-09-04";
