/* Shared shapes for every user-facing string. English and Arabic both implement
   these, and components render whichever copy object they are given — so the
   two languages cannot drift structurally. `tsc` is the whole enforcement
   mechanism: a missing key, an extra key, or a differently-shaped nested object
   fails the build. There is no i18n library and no runtime check.

   Pattern proven at trippe.tech. */

export type Locale = "en" | "ar";

/* -------------------------------------------------------------- evidence --- */

/** Which generated measurement backs a rail entry, when one does. */
export type EvidenceKey =
  | "trippeBackend"
  | "trippeIOS"
  | "roadmap"
  | "wasteSort"
  | "academy";

/** What a rail entry can report about its repo. Selecting the field here rather
    than formatting a string in copy is what keeps the number generated. */
export type EvidenceField =
  | "commitCount"
  | "dateRange"
  | "productionLines"
  | "testCases"
  | "authorCount";

/**
 * One line of the evidence rail: a source, and what it says.
 *
 * `value` is written in copy ONLY for facts with no repository behind them —
 * an App Store listing, a certificate, a published URL. Anything measurable
 * carries `derived` instead, and the number is read from the generated
 * evidence module at render time. A rail entry must have exactly one of the
 * two, which is what stops a hand-typed figure drifting from the repo it
 * claims to describe.
 */
export type RailEntry =
  | { label: string; value: string; derived?: never }
  | { label: string; value?: never; derived: { repo: EvidenceKey; field: EvidenceField } };

/**
 * A claim and its receipts: prose in the column, sources in the rail.
 *
 * A union rather than a bag of optional fields, so a block that says it is a
 * quotation is checked as one. The three kinds are the only three things this
 * site says: it argues, it quotes the work, or it shows a measurement.
 */
export type LedgerBlock = ProseBlock | QuoteBlock | TableBlock;

export interface ProseBlock {
  kind: "prose";
  /** Paragraphs. Rendered in the neutral engineering register by default. */
  body: string[];
  /** Render in the serif personal register — the author speaking as himself. */
  voice?: boolean;
  rail: RailEntry[];
}

/**
 * A verbatim quotation from the work itself.
 *
 * `attribution` is required and is not part of `rail`, which is the point: on
 * this site a quotation cannot be published without the file it came from. It
 * is a repository path rather than a URL because Trippé's repositories are
 * private — the path is checkable by anyone who is shown the code, and honest
 * about the fact that not everyone can be.
 */
export interface QuoteBlock {
  kind: "quote";
  quote: string;
  /**
   * The quotation's own language, which is not the page's.
   *
   * Source code and its comments are English on both sides of this site — a
   * quotation that gets translated stops being a quotation. So this defaults
   * to "en", and the blockquote is marked with it so a screen reader switches
   * voice rather than reading English through an Arabic pronunciation.
   */
  quoteLang?: Locale;
  attribution: string;
}

/**
 * A measurement with a before and an after.
 *
 * `head[0]` labels the rows and is usually empty; the remaining columns are the
 * states being compared. Every row must be the same length as `head`, which the
 * component asserts rather than papering over.
 */
export interface TableBlock {
  kind: "table";
  caption: string;
  head: readonly string[];
  rows: readonly (readonly string[])[];
  rail: RailEntry[];
}

/* ------------------------------------------------------------------ chrome --- */

export interface NavCopy {
  /** Where the wordmark links. */
  homeLabel: string;
  links: { label: string; href: string }[];
  /** Label on the control that switches language. */
  switchLabel: string;
  switchAriaLabel: string;
  skipToContent: string;
}

/**
 * The footer carries the legal lines and the language control, and no profile
 * links: the contact section sits directly above it and already offers them,
 * so a second copy a hundred pixels lower reads as a duplication bug.
 */
export interface FooterCopy {
  /** One line per inner array: bidirectional text can never bleed across
      sentences. Latin runs inside an Arabic line are flagged `ltr` and render
      isolated in a <bdi>. */
  legal: FooterSegment[][];
}

export type FooterSegment = string | { text: string; href?: string; ltr?: boolean };

/**
 * An off-site destination named by key, never by URL.
 *
 * Copy supplies the label; `src/data/site.ts` supplies the address. A link can
 * therefore not be correct in English and stale in Arabic, which is the same
 * failure the rest of the site is built to prevent.
 */
export type ExternalKey = "github" | "linkedin" | "email";

export interface ExternalLink {
  label: string;
  to: ExternalKey;
}

/* -------------------------------------------------------------------- home --- */

/** A span of the hero sentence. A `mark` span is annotated by the rail. */
export type HeroSpan = { text: string; mark?: boolean };

export interface HeroCopy {
  /** Eyebrow above the sentence. Neutral scale — never ochre. */
  eyebrow: string;
  /** The thesis, split so individual claims can be annotated. */
  sentence: HeroSpan[];
  rail: RailEntry[];
}

/**
 * One stop on the timeline. Order carries meaning here, so this really is a
 * sequence and not decorative numbering.
 *
 * The only flag is `ahead`, because it is the only distinction the page can
 * honestly draw: everything else has happened, and that one has not. A richer
 * taxonomy of markers would be decoration wearing the costume of information.
 */
export interface TimelineEntry {
  when: string;
  what: string;
  detail?: string;
  ahead?: boolean;
}

export interface WorkCard {
  slug: ProjectSlug;
  /** Technologies, set in the rail. Not a sentence. */
  tech: string;
  title: string;
  /** What the project is, in one sentence. */
  line: string;
  /** What he did on it, and where it stands. */
  role: string;
}

export interface HomeCopy {
  locale: Locale;
  nav: NavCopy;
  hero: HeroCopy;
  timeline: { heading: string; entries: TimelineEntry[] };
  work: { heading: string; cards: WorkCard[] };
  contact: { heading: string; body: string; links: ExternalLink[] };
  footer: FooterCopy;
  meta: { title: string; description: string };
}

/* ---------------------------------------------------------------- projects --- */

export type ProjectSlug = "trippe" | "ecodyssey" | "dvld" | "roadmap";

/** A section of a case study. */
export interface CaseSection {
  heading: string;
  blocks: LedgerBlock[];
}

export interface CaseStudyCopy {
  slug: ProjectSlug;
  eyebrow: string;
  title: string;
  /** The one-sentence thesis, shown under the title. */
  thesis: string;
  /** The title block's rail. Derived entries are measured, not typed. */
  facts: RailEntry[];
  /** Label only. The address lives in `projects.ts`, once, for both languages. */
  linkLabel?: string;
  intro: ProseBlock;
  sections: CaseSection[];
  /** Stated plainly when true. An unfinished project says so. */
  unfinished?: string;
  meta: { title: string; description: string };
}

/* ------------------------------------------------------------------- about --- */

export interface AboutCopy {
  locale: Locale;
  eyebrow: string;
  title: string;
  blocks: LedgerBlock[];
  homelab: { heading: string; body: string[]; rail: RailEntry[] };
  availability: { heading: string; lines: string[] };
  meta: { title: string; description: string };
}

/* ------------------------------------------------------------------- site --- */

export interface SiteMetadata {
  url: string;
  name: string;
  role: string;
  email: string;
  github: string;
  linkedin: string;
  keywords: readonly string[];
}
