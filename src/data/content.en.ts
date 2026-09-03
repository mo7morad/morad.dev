import type { HomeCopy } from "./types";

export const HOME_EN: HomeCopy = {
  locale: "en",

  nav: {
    homeLabel: "Mohamed Morad",
    links: [
      { label: "Work", href: "/#work" },
      { label: "About", href: "/about/" },
    ],
    switchLabel: "عربي",
    switchAriaLabel: "Switch to Arabic",
    skipToContent: "Skip to content",
  },

  hero: {
    eyebrow: "Backend engineer · Apple Developer Academy, Bali",
    /* The claim is annotated rather than asserted: every marked span has a line
       in the rail beside it. This is the whole site in one screen. */
    sentence: [
      { text: "I spent " },
      { text: "twenty-one months on fundamentals", mark: true },
      { text: " before I shipped anything. Then I built " },
      { text: "a travel app that will not invent a price", mark: true },
      { text: " — because a number you cannot trace is worse than no number at all." },
    ],
    rail: [
      { label: "roadmap · commits", derived: { repo: "roadmap", field: "commitCount" } },
      { label: "roadmap · span", derived: { repo: "roadmap", field: "dateRange" } },
      { label: "problems solved", value: "1,329" },
      { label: "Trippé · App Store", value: "live, Sep 2026" },
    ],
  },

  timeline: {
    heading: "How I got here",
    entries: [
      {
        when: "2023",
        what: "Cairo",
        detail:
          "CS50, then a download manager written in Python with a Tkinter window. It was the first thing I ever built. I lost the code.",
      },
      {
        when: "Aug 2023",
        what: "Indonesia",
        detail: "Left Egypt on a scholarship. Informatics at UII, taught in English.",
      },
      {
        when: "2024 – 2026",
        what: "The roadmap",
        detail:
          "Twenty-one months of C++, data structures, algorithms, SQL, C#, SOLID and testing. Twenty-five courses, eighteen projects, finished one month before the academy started.",
      },
      {
        when: "Mar 2026",
        what: "Apple Developer Academy, Bali",
        detail:
          "The first Egyptian in the Bali cohort — 220 places from more than 5,000 applicants.",
      },
      {
        when: "Sep 2026",
        what: "Trippé on the App Store",
        detail: "Started a month into the academy. Written alone.",
      },
      {
        when: "Dec 2026",
        what: "Academy ends",
        detail: "The UII degree follows in August 2027. Open to remote or relocation.",
        ahead: true,
      },
    ],
  },

  work: {
    heading: "Work",
    cards: [
      {
        slug: "trippe",
        tech: "Cloudflare Workers · Supabase · SwiftUI",
        title: "Trippé",
        line: "A trip recommender that prices every destination against harvested data, and withholds any figure it cannot trace to a source.",
        role: "Backend, iOS and the cost engine. Live on the App Store.",
      },
      {
        slug: "ecodyssey",
        tech: "SwiftUI · Vision · Core ML · Private Cloud Compute",
        title: "ECOdyssey",
        line: "A waste-sorting kiosk built with four others, where the interesting work was measuring our own model honestly enough to stop trusting it.",
        role: "Belief engine, the cloud judge, and the bake-off that graded them.",
      },
      {
        slug: "roadmap",
        tech: "C++ · C# · SQL Server",
        title: "The roadmap",
        line: "Twenty-one months of fundamentals before any of the above — the part of the story that explains the rest of it.",
        role: "Twenty-five courses, 1,329 problems, eighteen projects.",
      },
      {
        slug: "dvld",
        tech: "C# · WinForms · SQL Server",
        title: "DVLD",
        line: "A driving-licence department system in strict three-tier architecture. The capstone of the roadmap, and the largest thing I had built at the time.",
        role: "30+ forms, 50+ stored procedures, and a walkthrough I recorded.",
      },
    ],
  },

  contact: {
    heading: "Get in touch",
    body: "I am looking for backend work, remote or on the ground. The academy finishes in December 2026 and my degree lands in August 2027.",
    links: [
      { label: "GitHub", to: "github" },
      { label: "LinkedIn", to: "linkedin" },
    ],
  },

  footer: {
    legal: [
      /* One segment, not five. The whole line is Latin, so it is one isolated
         run — split into pieces, an RTL paragraph reorders them and the full
         stop ends up at the far end of the line. The year is baked at build
         time, like every other figure here. */
      [{ text: `© ${new Date().getFullYear()} Mohamed Morad.`, ltr: true }],
      [
        "Figures on this site are generated from the repositories they describe, not typed by hand.",
      ],
    ],
  },

  meta: {
    title: "Mohamed Morad — Backend engineer",
    description:
      "Backend engineer. Twenty-one months of fundamentals before shipping anything, then a live App Store app whose backend refuses to invent a price.",
  },
};
