/* The CV is intentionally maintained in English only. It exists to be sent to
   employers hiring in English, so maintaining an Arabic version that would never
   be sent would inevitably drift from the real document. */

import type { CvCopy } from "./types";

export const CV: CvCopy = {
  name: "Mohamed Morad",
  role: "Backend engineer",
  contactLine: [
    { label: "momurad.business@gmail.com", to: "email" },
    { label: "morad.dev", to: "site" },
    { label: "github.com/mo7morad", to: "github" },
    { label: "linkedin.com/in/momorad", to: "linkedin" },
  ],
  standing:
    "Egyptian national, currently in Indonesia. Open to remote work or relocation; would need visa sponsorship.",
  summary: {
    template:
      "Backend engineer. {0} commits across {1} on fundamentals before shipping anything, then a live App Store app whose backend withholds any figure it cannot trace to a quoted source. Sole author of its backend, its iOS client and its cost engine.",
    figures: [
      { repo: "roadmap", field: "commitCount" },
      { repo: "roadmap", field: "dateRange" },
    ],
  },
  sections: [
    {
      heading: "Selected work",
      entries: [
        {
          title: "Trippé",
          role: "Backend, iOS and the cost engine · sole author",
          when: "2026 · live on the App Store",
          stack: "Cloudflare Workers · TypeScript · Supabase / Postgres · SwiftUI",
          points: [
            {
              template: "{0} backend commits, {1} production lines, {2} test cases.",
              figures: [
                { repo: "trippeBackend", field: "commitCount" },
                { repo: "trippeBackend", field: "productionLines" },
                { repo: "trippeBackend", field: "testCases" },
              ],
            },
            {
              template: "{0} iOS commits, {1} production lines, {2} test methods.",
              figures: [
                { repo: "trippeIOS", field: "commitCount" },
                { repo: "trippeIOS", field: "productionLines" },
                { repo: "trippeIOS", field: "testCases" },
              ],
            },
            {
              template:
                "Proved budget independence as a property test: the suite sweeps $500 to $20,000 and asserts exactly three distinct cost outputs, one per tier, so any leak of budget into pricing arithmetic fails the build.",
            },
            {
              template:
                "Enforced provenance in the schema. A price observation's source quote is NOT NULL with a non-empty check, so an extraction that cannot quote its source is discarded rather than stored.",
            },
            {
              template:
                "Audited the harvested corpus and found only 9.3% of 2,539 stored quotes contained the number they claimed to source; rebuilt extraction and verification to 92.5%.",
            },
            {
              template:
                "Found a hardcoded country fallback serving American entry rules on 36 of 154 requests, biased toward permissive, that had survived 756 passing tests.",
            },
            {
              template:
                "Raised the evidence bar for entry rules from one commercial publisher to two official sources: 23 served rules became 11, all official, with 12 withheld rather than guessed.",
            },
            {
              template:
                "30 migrations, 19 endpoints, and a growth scorecard whose baselines are fixed SQL over the live tables — 43 active devices and a 33% save rate at the recorded baseline — rather than a dashboard screenshot.",
            },
          ],
        },
        {
          title: "ECOdyssey",
          role: "Belief engine, cloud judge and evaluation harness · team of five",
          when: "2026 · Apple Developer Academy",
          stack: "SwiftUI · Vision · Core ML · Private Cloud Compute",
          points: [
            {
              template:
                "Benchmarked on-device Apple Foundation Models against Private Cloud Compute on 13 photos the team shot: 61.5% / 38.5% / 46.2% against 100% / 100% / 100%. The measurement redirected the project.",
            },
            {
              template:
                'Wrote the post-mortem on my own earlier prototype, which returned random items labelled "High (97.4%)" with invented latency and token counts. It became a project rule: a failing intelligence backend must never yield invented output.',
            },
            {
              template:
                "Built the engine bake-off to be able to lose. It grades on confidently-wrong verdict count rather than accuracy, and its fixtures include a case the old engine wins.",
            },
            {
              template:
                "Isolated an uncatchable EXC_BAD_ACCESS caused by a beta drift between Xcode and iOS with a text-only probe, then gated the call rather than claiming a fix.",
            },
          ],
        },
        {
          title: "DVLD",
          role: "Driving licence department system · sole author",
          when: "2025",
          stack: "C# · WinForms · SQL Server",
          points: [
            {
              template:
                "Strict three tiers, measured: {0} presentation, {1} data access and {2} business lines across {3} forms.",
              figures: [
                { repo: "roadmap", field: "dvldPresentationLines" },
                { repo: "roadmap", field: "dvldDataAccessLines" },
                { repo: "roadmap", field: "dvldBusinessLines" },
                { repo: "roadmap", field: "dvldForms" },
              ],
            },
            {
              template:
                "{0} query sites, all inside the data-access layer and none above it, with {1} values bound as parameters rather than concatenated into SQL.",
              figures: [
                { repo: "roadmap", field: "dvldQueries" },
                { repo: "roadmap", field: "dvldBoundParameters" },
              ],
            },
            {
              template:
                "Recorded a ten-minute walkthrough of the architecture while the project was fresh.",
            },
          ],
        },
      ],
    },
    {
      heading: "Education",
      entries: [
        {
          title: "Apple Developer Academy",
          role: "Bali, Indonesia",
          when: "Mar 2026 – Dec 2026",
          points: [
            {
              template: "220 places from more than 5,000 applicants.",
            },
          ],
        },
        {
          title: "Universitas Islam Indonesia",
          role: "BSc Informatics, International Program, taught in English",
          when: "Aug 2023 – Aug 2027",
          points: [
            {
              template: "Yogyakarta, Indonesia. On a scholarship.",
            },
          ],
        },
        {
          title: "Self-directed backend curriculum",
          when: "May 2024 – Feb 2026",
          points: [
            {
              template:
                "{0} commits over {1}. 25 certificates, 1,329 problems solved, 18 projects, ending in the DVLD system above.",
              figures: [
                { repo: "roadmap", field: "commitCount" },
                { repo: "roadmap", field: "dateRange" },
              ],
            },
          ],
        },
      ],
    },
    {
      heading: "Skills",
      entries: [
        {
          title: "Backend",
          points: [
            {
              template:
                "TypeScript, Node, Cloudflare Workers, C#, .NET, REST API design",
            },
          ],
        },
        {
          title: "Data",
          points: [
            {
              template:
                "PostgreSQL, Supabase, SQL Server, schema migrations, stored procedures, query tuning",
            },
          ],
        },
        {
          title: "iOS",
          points: [
            {
              template: "Swift, SwiftUI, Core ML, Vision",
            },
          ],
        },
        {
          title: "Practice",
          points: [
            {
              template:
                "Unit and property testing (Vitest, XCTest, xUnit), SOLID, layered and three-tier architecture, spec-driven development",
            },
          ],
        },
        {
          title: "Systems",
          points: [
            {
              template:
                "Linux (headless), nginx, DNS, SSH, self-hosted service administration",
            },
          ],
        },
        {
          title: "Languages",
          points: [
            {
              template:
                "Arabic (native), English (fluent; degree and academy both taught in English)",
            },
          ],
        },
      ],
    },
    {
      heading: "Availability",
      entries: [
        {
          title: "From January 2027",
          points: [
            {
              template:
                "The academy ends in December 2026. The UII degree completes in August 2027.",
            },
            {
              template:
                "Open to remote work or relocation. Would need visa sponsorship.",
            },
          ],
        },
      ],
    },
  ],
  printNote:
    "Print this page — ⌘P, or Ctrl+P — to save it as a PDF. It is laid out for A4 and Letter.",
  meta: {
    title: "CV — Mohamed Morad",
    description:
      "Curriculum vitae of Mohamed Morad, backend engineer. Twenty-one months of fundamentals, then a live App Store app that refuses to state what it cannot prove.",
  },
};
