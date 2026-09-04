import type { AboutCopy } from "./types";

export const ABOUT_EN: AboutCopy = {
  locale: "en",

  eyebrow: "Cairo · Yogyakarta · Bali",
  title: "About",
  thesis:
    "I started programming at twenty-one, spent nearly two years on fundamentals before I shipped anything, and I have not been in a hurry since.",

  facts: [
    { label: "from", value: "Cairo, Egypt" },
    { label: "in Indonesia since", value: "Aug 2023" },
    { label: "academy ends", value: "Dec 2026" },
    { label: "degree", value: "Aug 2027" },
  ],

  intro: {
    kind: "prose",
    body: [
      "The rest of this site is the work. This page is the order it happened in, which is the part that explains it.",
      "I am Egyptian. I have been in Indonesia since August 2023 — an Informatics degree at UII, taught in English — and since March 2026, the Apple Developer Academy in Bali.",
    ],
    rail: [
      { label: "started", value: "2023, age 21" },
      { label: "field", value: "backend first, iOS second" },
    ],
  },

  sections: [
    {
      heading: "The program I lost",
      blocks: [
        {
          kind: "prose",
          voice: true,
          body: [
            "The first thing I ever built was a download manager. Python, a Tkinter window, a progress bar that was optimistic about how much time was left. I wrote it after CS50, which was the first time anybody had explained to me what a computer is actually doing, and I was prouder of it than I have been of anything since that took as little skill.",
            "I lost the source. One laptop, no repository, no backup. There is nothing interesting about how it happened, and I am not going to dress it up as a lesson I chose. But it is why `git init` is now the first thing I type and not the last, and it is why there is a machine in my room whose only job is to hold on to things.",
          ],
          rail: [
            { label: "first program", value: "download manager, Python" },
            { label: "source", value: "lost" },
          ],
        },
      ],
    },

    {
      heading: "Leaving",
      blocks: [
        {
          kind: "prose",
          voice: true,
          body: [
            "In August 2023 I left Egypt on a scholarship, to study Informatics at UII in Indonesia. The programme is taught in English, which is not the language I did my schooling in, and the first year was mostly about closing that gap.",
            "I am not planning to move back. That is not a complaint about home — it is a fact about the shape of everything after it, including this site. When you are applying from a country you are not from, for work in a country you have not been to, the only thing that travels ahead of you is evidence.",
          ],
          rail: [
            { label: "left Egypt", value: "Aug 2023" },
            { label: "degree", value: "Informatics, UII" },
            { label: "taught in", value: "English" },
          ],
        },
      ],
    },

    {
      heading: "Twenty-one months of nothing public",
      blocks: [
        {
          kind: "prose",
          body: [
            "Between May 2024 and February 2026 I published nothing. No portfolio, no side project with a good README, no posts. I worked through a backend curriculum in order: C++, then data structures and algorithms, then SQL, then C#, then object-oriented design, SOLID, and testing. It ends in the DVLD system, which is the largest thing on this site that nobody paid me to write.",
            "I could have shipped something in month three. Plenty of people do, and some of them are better engineers than I am. What I wanted was to be able to answer why, and not only how — why that query is slow, why that abstraction is the wrong one, why a test can pass over broken code. That is a slower way to start and I would choose it again.",
            "It finished one month before the academy began. That was luck, not planning.",
          ],
          rail: [
            { label: "commits", derived: { repo: "roadmap", field: "commitCount" } },
            { label: "span", derived: { repo: "roadmap", field: "dateRange" } },
            { label: "certificates", derived: { repo: "roadmap", field: "certificates" } },
            { label: "problems solved", value: "1,329" },
          ],
        },
      ],
    },

    {
      heading: "Bali",
      blocks: [
        {
          kind: "prose",
          body: [
            "The Apple Developer Academy takes 220 people in Bali out of more than five thousand applicants. As far as I know I am the first Egyptian in the cohort. I arrived in March 2026 knowing backend and no Swift at all.",
            "What the academy actually gave me was not iOS. It was the first time I had to defend a decision out loud to people who were going to have to live inside it, and the first time a deadline belonged to five of us instead of to me. Both of those show up in the ECOdyssey case study more honestly than they would in a paragraph about teamwork.",
          ],
          rail: [
            { label: "cohort", value: "220 places, 5,000+ applicants" },
            { label: "since", value: "Mar 2026" },
            { label: "ends", value: "Dec 2026" },
          ],
        },
      ],
    },

    {
      heading: "The laptop with the lid shut",
      blocks: [
        {
          kind: "prose",
          body: [
            "There is an old laptop in my room, closed, running headless Linux. I reach it over SSH. `nginx` sits in front of it, Immich holds my photos, Pi-hole answers DNS for the whole flat, and n8n runs the small automations I would otherwise forget to do by hand.",
            "None of this is impressive infrastructure and I am not going to pretend it is. It is a machine that would otherwise be in a drawer. What it gives me is the one thing a tutorial cannot: something that is mine and that stays up, or does not, where a lazy decision at eleven at night is still broken at nine in the morning and nobody else is going to fix it.",
            "It is also, straightforwardly, where the photos of the program I lost would have been.",
          ],
          rail: [
            { label: "host", value: "old laptop, headless Linux" },
            { label: "serving", value: "nginx · Immich · Pi-hole · n8n" },
            { label: "access", value: "SSH only" },
          ],
        },
      ],
    },

    {
      heading: "Where I am, plainly",
      blocks: [
        {
          kind: "prose",
          body: [
            "These are the questions that actually decide whether an application goes anywhere, so they are on the page rather than in a fourth email.",
          ],
          rail: [{ label: "nationality", value: "Egyptian" }],
        },
        {
          kind: "table",
          caption:
            "Everything a hiring process asks in the first ten minutes. If any of it is a problem, it is a problem now rather than in November.",
          rows: [
            ["Academy ends", "December 2026"],
            ["UII degree", "August 2027"],
            ["Nationality", "Egyptian"],
            ["Currently in", "Indonesia"],
            ["Looking for", "Backend, remote or relocation"],
            ["Work authorisation", "Would need visa sponsorship"],
          ],
          rail: [{ label: "open to", value: "anywhere" }],
        },
        {
          kind: "prose",
          voice: true,
          body: [
            "Backend is what I want the hard problems in. iOS is real and I will keep doing it, but it is second and I would rather say so than be vague and let you find out.",
            "Remote works — I have spent three years studying and building in a country I did not grow up in, in a language I did not grow up speaking, which is most of what remote asks of a person. I will also relocate anywhere that will have me. If your company cannot sponsor a visa, I would honestly rather hear that in the first reply than the fourth.",
          ],
          rail: [{ label: "notice", value: "none" }],
        },
      ],
    },
  ],

  contact: {
    heading: "Get in touch",
    body: "If any of the above is worth a conversation, the fastest way to have it is email. I answer everything, including the ones that are a no.",
    links: [
      { label: "GitHub", to: "github" },
      { label: "LinkedIn", to: "linkedin" },
    ],
  },

  meta: {
    title: "About — Mohamed Morad",
    description:
      "Egyptian backend engineer in Indonesia. Started at twenty-one, spent twenty-one months on fundamentals, and states availability and visa status plainly.",
  },
};
