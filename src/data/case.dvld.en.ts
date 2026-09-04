import type { CaseStudyCopy } from "./types";

export const DVLD_EN: CaseStudyCopy = {
  slug: "dvld",
  eyebrow: "C# · WinForms · SQL Server",
  title: "DVLD",
  thesis: "The capstone of the roadmap, and the largest thing I had built at the time.",

  facts: [
    { label: "presentation · LOC", derived: { repo: "roadmap", field: "dvldPresentationLines" } },
    { label: "data access · LOC", derived: { repo: "roadmap", field: "dvldDataAccessLines" } },
    { label: "business · LOC", derived: { repo: "roadmap", field: "dvldBusinessLines" } },
    { label: "forms", derived: { repo: "roadmap", field: "dvldForms" } },
    { label: "built", value: "2025" },
  ],
  linkLabel: "The project on GitHub",

  intro: {
    kind: "prose",
    body: [
      "A driving and vehicle licence department system: applicants, licence classes, written and practical tests, issuing and renewing and replacing licences, international permits, detained licences. It is a desktop application in C# and Windows Forms over SQL Server, and it is the project the whole curriculum was building toward.",
      "It is 2025 work, and it looks like it. I am not going to claim it is elegant. What it is, is the first time I had to hold a real domain in my head — one where a rule about a test attempt has consequences three screens away.",
    ],
    rail: [
      { label: "domain", value: "licences, tests, applications" },
      { label: "database", value: "SQL Server" },
    ],
  },

  sections: [
    {
      heading: "The walkthrough",
      blocks: [
        {
          kind: "video",
          youtubeId: "h2-xbE6Wk3k",
          title: "DVLD architecture walkthrough",
          caption:
            "Ten minutes on the three-tier split, the async work and the SQL constraints. I recorded it while the project was fresh, which is the only reason it exists — and it is a better account of the design than anything I could write about it now.",
          rail: [{ label: "recorded", value: "YouTube, 10 min" }],
        },
      ],
    },

    {
      heading: "Three tiers, actually separated",
      blocks: [
        {
          kind: "prose",
          body: [
            "The split is the point of the exercise, and the line counts show it held: the presentation layer is by far the largest, the data access layer is a thin band of parameterised queries, and the business layer sits between them holding the rules. No form reaches the database, and no data-access class knows what a form is.",
            "That sounds obvious written down. It was not obvious to do. The temptation in a Windows Forms project is to open a connection in a button handler, and the whole discipline of the exercise is refusing that forty-five times.",
          ],
          rail: [
            { label: "forms", derived: { repo: "roadmap", field: "dvldForms" } },
            { label: "query sites", derived: { repo: "roadmap", field: "dvldQueries" } },
            { label: "bound parameters", derived: { repo: "roadmap", field: "dvldBoundParameters" } },
            { label: "rule", value: "no SQL above data access" },
          ],
        },
        {
          kind: "table",
          caption:
            "Lines of authored C# per layer, counted from the files. Designer files are excluded from the line counts and counted as forms instead — they are written by the form designer, not by a person.",
          head: ["layer", "lines"],
          rows: [
            ["Presentation (DVLD)", "8,384"],
            ["Data access (DVLD_DataAccess)", "3,005"],
            ["Business (DVLD_Buisness)", "2,071"],
          ],
          rail: [{ label: "counted by", value: "npm run evidence" }],
        },
      ],
    },

    {
      heading: "What I would do differently",
      blocks: [
        {
          kind: "prose",
          body: [
            "The business layer is the thinnest of the three, and it should not be. A good deal of logic that belongs to the domain — which licence classes a person is eligible for, when a test can be retaken — ended up phrased inside forms because that is where I was standing when I needed it.",
            "The folder is also spelled `DVLD_Buisness`, which has been wrong since 2025 and is still wrong, because renaming it would break the walkthrough I recorded against it. That is a small, real example of the thing that makes legacy code legacy.",
          ],
          rail: [{ label: "thinnest layer", value: "business" }],
        },
      ],
    },
  ],

  meta: {
    title: "DVLD — a licence department system in three tiers",
    description:
      "A C# and SQL Server desktop system with forty-five forms and a genuinely separated three-tier architecture, plus the ten-minute walkthrough I recorded of its design.",
  },
};
