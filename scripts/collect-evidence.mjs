#!/usr/bin/env node
/**
 * Measures the repositories this site makes claims about, and writes the
 * numbers into a generated TypeScript module.
 *
 * The site states facts — commit counts, date ranges, lines of code, test
 * counts. None of them are typed by hand. A figure that cannot be derived from
 * a repository does not appear on the site, which is the same rule the work
 * being described already holds itself to.
 *
 * Local-only. Its output is committed, so the deploy host never needs these
 * repos to exist. Run with `npm run evidence`.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src", "data", "evidence.generated.ts");

/* Each repo lists candidate locations, first existing wins. Directories get
   reorganised; a hardcoded path that silently drops a repo is the exact failure
   this script exists to prevent, so a repo that matches nowhere is reported
   loudly instead. */
const REPOS = [
  { id: "trippeBackend", label: "Trippe backend", kind: "ts", paths: [
    "/Users/mohamedmorad/Developer/Trippe/Trippe-Backend",
  ] },
  { id: "trippeIOS", label: "Trippe iOS", kind: "swift", paths: [
    "/Users/mohamedmorad/Developer/Trippe/Trippe-iOS",
  ] },
  { id: "roadmap", label: "Backend roadmap", kind: "csharp", paths: [
    "/Users/mohamedmorad/Developer/Extras/BackEnd-Fundamentals-RoadMap",
    "/Users/mohamedmorad/Developer/BackEnd-Fundamentals-RoadMap",
  ], artifacts: "roadmap" },
  { id: "wasteSort", label: "ECOdyssey", kind: "swift", paths: [
    "/Users/mohamedmorad/Developer/ECOdyssey/waste-sort",
  ] },
  { id: "academy", label: "Apple Developer Academy", kind: "swift", paths: [
    "/Users/mohamedmorad/Developer/Apple Developer Academy",
  ] },
];

const EXTENSIONS = { ts: [".ts"], swift: [".swift"], csharp: [".cs", ".cpp", ".h"] };

/** Directory names that never contain authored source. */
const SKIP_DIRS = new Set([
  "node_modules", ".git", ".next", "out", "build", "obj", "bin",
  "DerivedData", ".derivedData", "Pods", ".build", "vendor", "dist",
  ".venv", "venv", ".graphify_venv", "graphify-out", ".wrangler", ".swiftpm",
]);

/** Generated C#: authored by the designer, not by a person. */
const isGenerated = (name) => name.endsWith(".Designer.cs") || name === "AssemblyInfo.cs";

const TEST_DIR_SEGMENTS = new Set(["test", "tests", "spec", "specs"]);

function isTestPath(relPath, baseName) {
  const segments = relPath.split("/").slice(0, -1);
  if (segments.some((s) => TEST_DIR_SEGMENTS.has(s.toLowerCase()))) return true;
  return /(\.test\.|\.spec\.|Tests?\.[A-Za-z]+$)/.test(baseName);
}

function git(repoPath, args) {
  return execFileSync("git", ["-C", repoPath, ...args], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

/**
 * One person, committing under five addresses and eight name spellings across
 * these repositories. Shared-email/shared-name clustering alone cannot join
 * "Moe <dronaessam>" to "Mohamed Morad <noreply>" in a repo that happens to
 * contain no bridging commit, so the owner's identities are declared rather
 * than inferred. Everyone else is clustered.
 */
const OWNER_NAME = "Mohamed Morad";
const OWNER_EMAILS = new Set([
  "momurad.business@gmail.com",
  "dronaessam@gmail.com",
  "133556068+mo7morad@users.noreply.github.com",
  "morad@debian-12.debian",
]);
const OWNER_NAMES = new Set([
  "moe", "morad", "mohamed morad", "mo7morad", "mohamedmorad",
  "win11 morad", "windows-morad",
]);

const isOwner = (name, email) =>
  OWNER_EMAILS.has(email.toLowerCase()) || OWNER_NAMES.has(name.toLowerCase());


/**
 * Teammates who also commit under more than one identity. Same problem as the
 * owner: "JavohirMX <javohirmx@gmail.com>" and "Javohir <...@users.noreply>"
 * share neither name nor address, so clustering cannot join them. Declared,
 * not guessed - a case study that reports a teammate's contribution has to get
 * it right. Only display names are recorded; no addresses are published.
 */
const COLLABORATOR_ALIASES = [
  { name: "Javohir", aliases: ["javohirmx", "javohir"] },
  { name: "Danil", aliases: ["danilmvv", "danil"] },
];

function collaboratorFor(name) {
  const n = name.toLowerCase();
  return COLLABORATOR_ALIASES.find((c) => c.aliases.includes(n)) ?? null;
}

const isBot = (name) => /\[bot\]$/.test(name) || /-bot$/.test(name);

/** Collapse the same human appearing under several name/email pairs. */
function mergeAuthors(rows) {
  const owner = { name: OWNER_NAME, commits: 0, isOwner: true, bot: false };
  const groups = [];

  for (const { name, email, commits } of rows) {
    if (isOwner(name, email)) {
      owner.commits += commits;
      continue;
    }
    // Union with EVERY group this row touches, not just the first — merging
    // into the first match alone leaves two groups a later row proved equal.
    const collaborator = collaboratorFor(name);
    const matches = groups.filter(
      (g) =>
        g.emails.has(email) ||
        g.names.has(name) ||
        (collaborator !== null && g.canonical === collaborator.name),
    );
    const target =
      matches[0] ??
      { names: new Set(), emails: new Set(), commits: 0, best: [name, 0], canonical: null };
    if (collaborator !== null) target.canonical = collaborator.name;
    for (const other of matches.slice(1)) {
      other.names.forEach((n) => target.names.add(n));
      other.emails.forEach((e) => target.emails.add(e));
      target.commits += other.commits;
      if (other.best[1] > target.best[1]) target.best = other.best;
      groups.splice(groups.indexOf(other), 1);
    }
    target.names.add(name);
    target.emails.add(email);
    target.commits += commits;
    if (commits > target.best[1]) target.best = [name, commits];
    if (!matches.length) groups.push(target);
  }

  const others = groups.map((g) => ({
    name: g.canonical ?? g.best[0],
    commits: g.commits,
    isOwner: false,
    bot: isBot(g.best[0]),
  }));

  return [...(owner.commits > 0 ? [owner] : []), ...others].sort(
    (a, b) => b.commits - a.commits,
  );
}

function zeroFillMonths(counts) {
  const months = [...counts.keys()].sort();
  if (months.length === 0) return [];
  const out = [];
  const [startY, startM] = months[0].split("-").map(Number);
  const [endY, endM] = months[months.length - 1].split("-").map(Number);
  let y = startY;
  let m = startM;
  while (y < endY || (y === endY && m <= endM)) {
    const key = `${y}-${String(m).padStart(2, "0")}`;
    out.push({ month: key, commits: counts.get(key) ?? 0 });
    m += 1;
    if (m > 12) { m = 1; y += 1; }
  }
  return out;
}

function countLines(text) {
  if (text.length === 0) return 0;
  let n = 0;
  for (let i = 0; i < text.length; i += 1) if (text.charCodeAt(i) === 10) n += 1;
  return text.endsWith("\n") ? n : n + 1;
}

function countTestCases(text, kind) {
  let n = 0;
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (kind === "ts") {
      if (/^(it|test)\s*[.(]/.test(t)) n += 1;
    } else if (kind === "swift") {
      if (/^func\s+test/.test(t)) n += 1;
      else if (/^@Test\b/.test(t)) n += 1;
    } else if (kind === "csharp") {
      if (/^\[(Fact|Theory)\b/.test(t)) n += 1;
    }
  }
  return n;
}

function walk(repoPath, kind) {
  const exts = new Set(EXTENSIONS[kind]);
  const acc = { productionFiles: 0, productionLines: 0, testFiles: 0, testLines: 0, testCases: 0 };

  const visit = (dir, rel) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (SKIP_DIRS.has(entry.name)) continue;
        visit(join(dir, entry.name), rel ? `${rel}/${entry.name}` : entry.name);
        continue;
      }
      if (!entry.isFile()) continue;
      if (!exts.has(extname(entry.name))) continue;
      if (kind === "csharp" && isGenerated(entry.name)) continue;

      const full = join(dir, entry.name);
      const relPath = rel ? `${rel}/${entry.name}` : entry.name;
      let text;
      try {
        if (statSync(full).size > 8 * 1024 * 1024) continue;
        text = readFileSync(full, "utf8");
      } catch {
        continue;
      }
      const lines = countLines(text);
      if (isTestPath(relPath, entry.name)) {
        acc.testFiles += 1;
        acc.testLines += lines;
        acc.testCases += countTestCases(text, kind);
      } else {
        acc.productionFiles += 1;
        acc.productionLines += lines;
      }
    }
  };

  visit(repoPath, "");
  return acc;
}

/**
 * The ref to measure.
 *
 * Not the checked-out branch: one of these repos sits on a feature branch, and
 * a published figure must not move when someone runs `git switch`. Not `--all`
 * either, which counts local and abandoned branches no reader can see - a
 * number nobody else can reproduce is exactly what this site refuses to print.
 * The default branch is what a third party gets when they clone, so it is the
 * only count that can be independently checked. The ref is recorded next to
 * the number so the page can name what it measured.
 */
function defaultRef(repoPath) {
  for (const ref of ["origin/HEAD", "main", "master"]) {
    try {
      git(repoPath, ["rev-parse", "--verify", "--quiet", ref + "^{commit}"]);
      return ref;
    } catch {
      /* not present in this repo; try the next */
    }
  }
  return "HEAD";
}

/* Some of what the roadmap page states is a property of the files on disk, not
   of the git history: how many certificates were actually earned, and how the
   capstone's three tiers actually divide.
 *
 * The repository's own README disagrees with itself on the first one - a badge
 * reading "25/25" above a sentence saying twenty-six - which is exactly why
 * this is counted rather than quoted. The certificates are the checkable
 * artefact: twenty-five numbered PDFs, plus one more for the front-end course
 * that the badge does not count. */
function countPdfs(dir) {
  try {
    return readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf")).length;
  } catch {
    return 0;
  }
}

function sourceLines(dir) {
  let lines = 0;
  let designers = 0;
  const visit = (d) => {
    let entries;
    try {
      entries = readdirSync(d, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = join(d, e.name);
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) visit(full);
      } else if (e.name.endsWith(".Designer.cs")) {
        // Counted, not read: a designer file is a form, and the number of
        // forms is the interesting figure. Its lines are not authored.
        designers += 1;
      } else if (extname(e.name) === ".cs") {
        try {
          lines += countLines(readFileSync(full, "utf8"));
        } catch {
          /* unreadable file contributes nothing rather than crashing */
        }
      }
    }
  };
  visit(dir);
  return { lines, designers };
}

/**
 * How a C# project talks to its database, counted.
 *
 * `dvldQueries` is the number of command sites, `dvldBoundParameters` the
 * number of values bound to them, and `dvldSqlAboveDataAccess` the number of
 * command sites found anywhere above the data-access layer — which is the
 * separation claim, and must be zero for the site to be allowed to make it.
 */
function sqlShape(dataAccessDir, presentationDir) {
  const count = (dir, pattern) => {
    let n = 0;
    const visit = (d) => {
      let entries;
      try {
        entries = readdirSync(d, { withFileTypes: true });
      } catch {
        return;
      }
      for (const e of entries) {
        const full = join(d, e.name);
        if (e.isDirectory()) {
          if (!SKIP_DIRS.has(e.name)) visit(full);
        } else if (extname(e.name) === ".cs") {
          try {
            n += (readFileSync(full, "utf8").match(pattern) ?? []).length;
          } catch {
            /* unreadable file contributes nothing rather than crashing */
          }
        }
      }
    };
    visit(dir);
    return n;
  };
  return {
    dvldQueries: count(dataAccessDir, /new SqlCommand/g),
    dvldBoundParameters: count(dataAccessDir, /Parameters\.Add/g),
    dvldSqlAboveDataAccess: count(presentationDir, /new SqlCommand/g),
  };
}

const ARTIFACT_MEASURES = {
  roadmap(repoPath) {
    const dvld = join(
      repoPath, "Fundamentals", "Coding", "19 - Full Real Project", "DVLD-Project",
    );
    if (!existsSync(dvld)) return null;
    const presentation = sourceLines(join(dvld, "DVLD"));
    const business = sourceLines(join(dvld, "DVLD_Buisness"));
    const dataAccess = sourceLines(join(dvld, "DVLD_DataAccess"));
    return {
      // Split, because the two are different claims. The backend track is the
      // twenty-one-month story the site tells; the front-end certificate is
      // one course alongside it, and lumping them makes the headline figure
      // quietly larger than the thing it names.
      certificatesBackend: countPdfs(join(repoPath, "Fundamentals", "Certificates")),
      certificatesFrontend: countPdfs(join(repoPath, "Front-End", "certificates")),
      dvldPresentationLines: presentation.lines,
      dvldBusinessLines: business.lines,
      dvldDataAccessLines: dataAccess.lines,
      dvldForms: presentation.designers,
      // The claim the site makes about this project is that no form reaches
      // the database and no value is concatenated into SQL. Both halves are
      // countable, so they are counted rather than asserted: every command
      // site lives in the data-access layer, and every value it sends is
      // bound. An earlier draft of this site claimed fifty stored procedures
      // instead; the repository has none, which is exactly the kind of claim
      // this generator exists to prevent.
      ...sqlShape(join(dvld, "DVLD_DataAccess"), join(dvld, "DVLD")),
    };
  },
};

function measure(repo) {
  const repoPath = repo.paths.find((candidate) => existsSync(join(candidate, ".git")));
  if (!repoPath) return null;

  const ref = defaultRef(repoPath);
  const commitCount = Number(git(repoPath, ["rev-list", "--count", ref]).trim());
  // Sorted, then min/max - never by list position, so the dates do not depend
  // on how git happened to order the log.
  const dates = git(repoPath, ["log", ref, "--format=%ad", "--date=format:%Y-%m-%d"])
    .trim().split("\n").filter(Boolean).sort();
  const firstCommit = dates[0];
  const lastCommit = dates[dates.length - 1];

  const monthCounts = new Map();
  for (const d of dates) {
    const key = d.slice(0, 7);
    monthCounts.set(key, (monthCounts.get(key) ?? 0) + 1);
  }

  const shortlog = git(repoPath, ["shortlog", "-sne", ref]);
  const authorRows = [];
  for (const line of shortlog.split("\n")) {
    const m = line.match(/^\s*(\d+)\s+(.+?)\s+<(.+?)>\s*$/);
    if (m) authorRows.push({ commits: Number(m[1]), name: m[2], email: m[3] });
  }

  return {
    label: repo.label,
    path: repoPath,
    ref,
    commitCount,
    firstCommit,
    lastCommit,
    authors: mergeAuthors(authorRows),
    commitsByMonth: zeroFillMonths(monthCounts),
    ...walk(repoPath, repo.kind),
    artifacts: repo.artifacts ? ARTIFACT_MEASURES[repo.artifacts](repoPath) : null,
  };
}

function serialise(results, generatedAt) {
  const L = [];
  L.push("/* GENERATED FILE - do not edit by hand.");
  L.push(" *");
  L.push(" * Written by `npm run evidence` (scripts/collect-evidence.mjs), which measures");
  L.push(" * the real repositories. Every figure the site states is read from here, so a");
  L.push(" * number can never drift from the work it describes. A repository that could");
  L.push(" * not be measured is omitted rather than zeroed.");
  L.push(" *");
  L.push(" * Commit counts, dates and authors describe the DEFAULT BRANCH (named in");
  L.push(" * `ref`) - not the checked-out branch, and not every local branch. It is the");
  L.push(" * only count a reader could reproduce from a clone. Line counts exclude");
  L.push(" * generated and vendored files.");
  L.push(" *");
  L.push(` * Generated: ${generatedAt}`);
  L.push(" */");
  L.push("");
  L.push("export interface AuthorEvidence {");
  L.push("  readonly name: string;");
  L.push("  readonly commits: number;");
  L.push("  /** True for the site owner, whose several git identities are merged. */");
  L.push("  readonly isOwner: boolean;");
  L.push("  readonly bot: boolean;");
  L.push("}");
  L.push("");
  L.push("export interface MonthEvidence {");
  L.push("  readonly month: string;");
  L.push("  readonly commits: number;");
  L.push("}");
  L.push("");
  L.push("export interface RepoEvidence {");
  L.push("  readonly label: string;");
  L.push("  /** The git ref every commit figure below was measured against. */");
  L.push("  readonly ref: string;");
  L.push("  readonly commitCount: number;");
  L.push("  readonly firstCommit: string;");
  L.push("  readonly lastCommit: string;");
  L.push("  readonly authors: readonly AuthorEvidence[];");
  L.push("  readonly commitsByMonth: readonly MonthEvidence[];");
  L.push("  readonly productionFiles: number;");
  L.push("  readonly productionLines: number;");
  L.push("  readonly testFiles: number;");
  L.push("  readonly testLines: number;");
  L.push("  readonly testCases: number;");
  L.push("  /** Counted from the files, not the git history. Null when the repo");
  L.push("      has none of these to count. */");
  L.push("  readonly artifacts: RepoArtifacts | null;");
  L.push("}");
  L.push("");
  L.push("export interface RepoArtifacts {");
  L.push("  readonly certificatesBackend: number;");
  L.push("  readonly certificatesFrontend: number;");
  L.push("  readonly dvldPresentationLines: number;");
  L.push("  readonly dvldBusinessLines: number;");
  L.push("  readonly dvldDataAccessLines: number;");
  L.push("  readonly dvldForms: number;");
  L.push("  readonly dvldQueries: number;");
  L.push("  readonly dvldBoundParameters: number;");
  L.push("  readonly dvldSqlAboveDataAccess: number;");
  L.push("}");
  L.push("");
  L.push("export const EVIDENCE = {");
  for (const [id, r] of results) {
    L.push(`  ${id}: {`);
    L.push(`    label: ${JSON.stringify(r.label)},`);
    L.push(`    ref: ${JSON.stringify(r.ref)},`);
    L.push(`    commitCount: ${r.commitCount},`);
    L.push(`    firstCommit: ${JSON.stringify(r.firstCommit)},`);
    L.push(`    lastCommit: ${JSON.stringify(r.lastCommit)},`);
    L.push("    authors: [");
    for (const a of r.authors) L.push(`      { name: ${JSON.stringify(a.name)}, commits: ${a.commits}, isOwner: ${a.isOwner}, bot: ${a.bot} },`);
    L.push("    ],");
    L.push("    commitsByMonth: [");
    for (const m of r.commitsByMonth) L.push(`      { month: ${JSON.stringify(m.month)}, commits: ${m.commits} },`);
    L.push("    ],");
    L.push(`    productionFiles: ${r.productionFiles},`);
    L.push(`    productionLines: ${r.productionLines},`);
    L.push(`    testFiles: ${r.testFiles},`);
    L.push(`    testLines: ${r.testLines},`);
    L.push(`    testCases: ${r.testCases},`);
    if (r.artifacts) {
      L.push("    artifacts: {");
      for (const [k, v] of Object.entries(r.artifacts)) L.push(`      ${k}: ${v},`);
      L.push("    },");
    } else {
      L.push("    artifacts: null,");
    }
    L.push("  },");
  }
  L.push("} as const satisfies Record<string, RepoEvidence>;");
  L.push("");
  L.push(`export const EVIDENCE_GENERATED_AT = ${JSON.stringify(generatedAt)};`);
  L.push("");
  return L.join("\n");
}

const results = [];
for (const repo of REPOS) {
  const measured = measure(repo);
  if (!measured) {
    process.stderr.write(
      `  ! skipped ${repo.id}: no git repository at any of:\n` +
        repo.paths.map((c) => `      ${c}\n`).join(""),
    );
    continue;
  }
  results.push([repo.id, measured]);
}

if (results.length === 0) {
  process.stderr.write("No repositories could be measured. Refusing to overwrite the existing generated file.\n");
  process.exit(1);
}

const generatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(OUT, serialise(results, generatedAt), "utf8");

const pad = (s, n) => String(s).padEnd(n);
const padL = (s, n) => String(s).padStart(n);
process.stdout.write(`\nevidence -> src/data/evidence.generated.ts  (${generatedAt})\n\n`);
process.stdout.write(`  ${pad("repo", 16)}${padL("commits", 8)}  ${pad("range", 26)}${padL("prod LOC", 10)}${padL("tests", 8)}\n`);
process.stdout.write(`  ${"-".repeat(70)}\n`);
for (const [id, r] of results) {
  process.stdout.write(
    `  ${pad(id, 16)}${padL(r.commitCount, 8)}  ${pad(`${r.firstCommit} -> ${r.lastCommit}`, 26)}${padL(r.productionLines.toLocaleString("en-US"), 10)}${padL(r.testCases, 8)}\n`,
  );
}
process.stdout.write("\n");
