import type { CaseStudyCopy } from "./types";

export const ROADMAP_EN: CaseStudyCopy = {
  slug: "roadmap",
  eyebrow: "C++ · C# · SQL Server · T-SQL",
  title: "The roadmap",
  thesis: "Twenty-one months of fundamentals before I shipped anything.",

  facts: [
    { label: "commits", derived: { repo: "roadmap", field: "commitCount" } },
    { label: "span", derived: { repo: "roadmap", field: "dateRange" } },
    { label: "certificates", derived: { repo: "roadmap", field: "certificates" } },
    { label: "problems · his count", value: "1,329" },
  ],
  linkLabel: "The repository on GitHub",

  intro: {
    kind: "prose",
    body: [
      "Before any of the other work on this site, there were twenty-one months of a structured curriculum — C++, problem solving, data structures, algorithms, OOP, C#, SQL, T-SQL, LINQ, unit testing, SOLID, REST. It is the least glamorous thing here and the one that explains the rest.",
      "It matters for a specific reason. Everything else I have shipped was built in 2026, with agents doing a lot of the typing. This was not. This is what the foundation was made of, and it is checkable.",
    ],
    rail: [
      { label: "programme", value: "ProgrammingAdvices" },
      { label: "authored by", value: "Dr. Abu-hadhood" },
    ],
  },

  sections: [
    {
      heading: "The shape of it",
      blocks: [
        {
          kind: "chart",
          source: "roadmap",
          caption:
            "Commits per month on the default branch. The gaps are real: one month has none at all. The tallest month is December 2025, roughly four times anything before it, and the last commit lands on 2 February 2026 — a month before the Apple Developer Academy started.",
          tableLabel: "the numbers behind the picture",
          altText:
            "A bar chart of commits per month from May 2024 to February 2026. Most of 2024 is nearly flat, with a first spike in December 2024, a steady middle through 2025, and one month at the end — December 2025 — roughly four times taller than anything before it.",
          rail: [
            { label: "measured on", value: "origin/HEAD" },
            { label: "months", value: "22" },
          ],
        },
      ],
    },

    {
      heading: "One number here is not a measurement",
      blocks: [
        {
          kind: "prose",
          body: [
            "The commits, the dates and the certificate count on this page are all counted from the repository by a script, like every other figure on this site. The problem count is not. 1,329 is the number in the repository's own README badge — my tally, kept as I went, and nothing I can re-derive from the files.",
            "I am leaving it in and saying which one it is, because that is the same rule the rest of this site runs on. A figure without a source is not automatically false. It is just a different kind of claim, and a reader is entitled to know which kind they are looking at.",
            "The README has a second problem worth naming: a badge saying twenty-five courses sits above a sentence saying twenty-six. Both are true about different things — twenty-five certificates on the backend track, and one more for a front-end course alongside it. This page counts the PDFs.",
          ],
          rail: [
            { label: "derived here", value: "commits, dates, certificates" },
            { label: "his own tally", value: "problems solved" },
          ],
        },
      ],
    },

    {
      heading: "What the folder names do not say",
      blocks: [
        {
          kind: "prose",
          body: [
            "A directory called “Unit Testing” could be anything. What is in it is a payroll engine whose dependency on a zone service is an interface, injected, and faked in the tests — so the salary logic is tested without a real zone lookup existing. That is the actual lesson of unit testing, and it is a long way from asserting that two plus two is four.",
            "The LINQ course runs from extension methods and `Select` through grouping and joins, and ends at expression trees — the point where you stop using LINQ and start understanding why `IQueryable` can send your predicate to a database and `IEnumerable` cannot.",
            "The SOLID course keeps a `Before/` and an `After/` folder for every principle, so each one is a diff rather than a definition. And the REST course builds an API from scratch in numbered steps, then throws it away and rebuilds it three-tier against a real database — which is the same shape as the capstone below.",
          ],
          rail: [
            { label: "mocked dependency", value: "IZoneService.cs" },
            { label: "expression trees", value: "016_ExpressionTrees/" },
            { label: "SOLID", value: "7 × Before/ + After/" },
          ],
        },
      ],
    },

    {
      heading: "Why it is on the site",
      blocks: [
        {
          kind: "prose",
          voice: true,
          body: [
            "I started this in Cairo, on a laptop, after a CS50 lecture and a Tkinter download manager whose source I lost. I finished it in Indonesia, a month before the academy started. Nobody was checking whether I did it.",
            "I do not think anyone should be impressed by the number of commits. What I would want a reader to take from it is narrower than that: when I write a test with a faked dependency now, or reach for an interface at a seam, it is not because a model suggested it. It is because I did that course, badly, in 2025, and had to do it again.",
          ],
          rail: [
            { label: "prod LOC", derived: { repo: "roadmap", field: "productionLines" } },
            { label: "note", value: "coursework, not a product" },
          ],
        },
      ],
    },
  ],

  meta: {
    title: "The roadmap — twenty-one months of fundamentals",
    description:
      "Twenty-one months before shipping anything: unit tests with mocked dependencies, expression trees, and SOLID taught as before-and-after diffs.",
  },
};
