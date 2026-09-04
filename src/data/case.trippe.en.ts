import type { CaseStudyCopy } from "./types";

/* Every figure and every quotation here was checked against the repositories
   before it was written down. Where a number could be measured rather than
   typed, it is derived — the rail entries with `derived` are read from
   `evidence.generated.ts`, which `npm run evidence` writes from the real git
   history. The quotations are verbatim, and each carries the file it is in. */

export const TRIPPE_EN: CaseStudyCopy = {
  slug: "trippe",
  eyebrow: "Cloudflare Workers · Supabase · SwiftUI",
  title: "Trippé",
  thesis: "A system that refuses to state what it cannot prove.",

  facts: [
    { label: "backend · commits", derived: { repo: "trippeBackend", field: "commitCount" } },
    { label: "backend · tests", derived: { repo: "trippeBackend", field: "testCases" } },
    { label: "iOS · commits", derived: { repo: "trippeIOS", field: "commitCount" } },
    { label: "iOS · tests", derived: { repo: "trippeIOS", field: "testCases" } },
    { label: "authors", derived: { repo: "trippeBackend", field: "authorCount" } },
    { label: "shipped", value: "App Store, Sep 2026" },
  ],
  linkLabel: "See it on the App Store",

  intro: {
    kind: "prose",
    body: [
      "Trippé takes a sentence about the trip you want and answers with three destinations you can actually afford. Which means it has to state a price. Everything interesting about the system comes from that one obligation, because the honest way to produce a travel budget is not to estimate it — it is to go and find what things cost, and to say nothing when you cannot.",
      "I built the backend, the iOS app and the cost engine. It is on the App Store, and it is the first thing I shipped after twenty-one months of fundamentals.",
    ],
    rail: [
      { label: "backend · prod LOC", derived: { repo: "trippeBackend", field: "productionLines" } },
      { label: "iOS · prod LOC", derived: { repo: "trippeIOS", field: "productionLines" } },
      { label: "built", derived: { repo: "trippeBackend", field: "dateRange" } },
    ],
  },

  sections: [
    {
      heading: "The rule",
      blocks: [
        {
          kind: "prose",
          body: [
            "Prices live in two layers. Layer 0 is append-only: every price ever observed, with the page it came from and the sentence that said it. Layer 1 is the rollup a city is served from, and it can be thrown away and rebuilt from Layer 0 at any time. Nothing is ever edited in place, so a number can always be walked back to a source.",
            "The rule that makes the whole thing work is one column constraint. An extraction that cannot quote its own source is discarded rather than stored — which removes most hallucinated numbers for free, before any of them reach a user.",
          ],
          rail: [
            { label: "layer 0", value: "append-only" },
            { label: "layer 1", value: "regenerable" },
          ],
        },
        {
          kind: "quote",
          quote: "`source_quote   text   not null   check (char_length(source_quote) > 0)`",
          attribution: "supabase/migrations/0006_price_provenance.sql",
        },
        {
          kind: "prose",
          body: [
            "The second half of the rule is that a partial answer is worse than no answer, so the pipeline is allowed to produce nothing at all.",
          ],
          rail: [],
        },
        {
          kind: "quote",
          quote: "Refusal is a first-class outcome here. A city that fails the ladder or the confidence floor produces no row at all — never a partial one. A row with good food prices and a broken lodging column is more dangerous than no row, because the engine treats any row it finds as authoritative and the missing half falls silently to zero rather than to the model's estimate.",
          attribution: "src/services/pricing/harvest/rollup.ts",
        },
      ],
    },

    {
      heading: "The budget must not touch the arithmetic",
      blocks: [
        {
          kind: "prose",
          body: [
            "If you tell the system you have $3,000, the cost of Bali must not change. What your budget decides is which destinations are reachable and which spending tier applies — it must never leak into what anything actually costs, or the app is just quoting your own number back at you.",
            "That is not a code-review convention, because a convention cannot fail a build. It is a property test: the same trip is priced across every budget from $500 to $20,000, and the set of distinct cost outputs has to contain exactly three members, one per tier. Any path by which the budget reaches the arithmetic makes that set explode.",
          ],
          rail: [
            { label: "sweep", value: "$500 – $20,000" },
            { label: "asserted", value: "results.size === 3" },
            { label: "file", value: "test/pricing/budgetIndependence.test.ts" },
          ],
        },
        {
          kind: "prose",
          body: [
            "The model has to be held to the same rule, and it is easier to fool than the arithmetic. Stripping the budget from its payload is not enough on its own — showing it a per-city dollar figure would put the anchor straight back.",
          ],
          rail: [],
        },
        {
          kind: "quote",
          quote: "Names and countries ONLY. The engine already established that every entry fits, so the model has no use for the totals — and showing it a dollar figure per city would hand back the anchor that stripping `budget` from this payload just removed.",
          attribution: "src/services/recommendation/recommendationRequest.ts",
        },
      ],
    },

    {
      heading: "Then I measured what I had built",
      blocks: [
        {
          kind: "prose",
          body: [
            "A quote column that is `not null` guarantees a quote exists. It does not guarantee the quote contains the number it is supposed to be sourcing. Nothing had ever checked that, so I wrote the check and ran it against everything already stored.",
            "Of 2,539 price observations from the previous harvest, only 9.3% carried a quote that actually contained their number. The other nine tenths were not wrong, exactly — they were unfalsifiable, which for a system built on provenance is the same thing. The corpus had to be treated as unproven and re-earned.",
            "The rebuilt extraction passes that check on 92.5% of new observations. That is the figure I would want a reader to hold onto, not because it is high, but because before the measurement existed there was no figure at all — only a column that was never empty.",
          ],
          rail: [
            { label: "before", value: "9.3% of 2,539" },
            { label: "after", value: "92.5%" },
            { label: "spec", value: "specs/007, specs/008" },
          ],
        },
      ],
    },

    {
      heading: "The evidence bar was upside down",
      blocks: [
        {
          kind: "prose",
          body: [
            "Trippé also answers whether you need a visa, which is a claim with consequences. It served 23 entry rules. Eight rested on an official government source. The other fifteen were marked `unanimous` — meaning several publishers agreed — and the publishers doing the agreeing were tour operators and visa-service companies.",
            "The same codebase already required two independent publishers before it would show you a scam warning. It required less to tell you a border was open than to tell you a taxi driver might overcharge. The bar was inverted, and I had written both halves of it.",
          ],
          rail: [
            { label: "rule", value: "official, or ≥2 publishers" },
            { label: "spec", value: "specs/008 · FR-005b" },
          ],
        },
        {
          kind: "table",
          caption: "Measured on live data after the bar was corrected. Twelve rules stopped being served — eleven had a single publisher behind them, and one had an official source that could not be verified.",
          head: ["", "before", "after"],
          rows: [
            ["served entry rules", "23 (8 official, 15 “unanimous”)", "11, all official"],
            ["withheld", "0", "12"],
            ["EG → JO", "visa-free (wrong)", "withheld"],
            ["departure dates off by >30d", "1", "0"],
          ],
          rail: [{ label: "source", value: "docs/IMPLEMENTATION_NOTES.md" }],
        },
        {
          kind: "prose",
          body: [
            "The wrong row was an Egyptian passport travelling to Jordan — my own nationality, which is the only reason I looked at it closely.",
            "Fixing it meant recording every rejected claim instead of silently dropping it, and the new table found the deeper problem on its first day. Of the first 31 rejections, 17 were quotes that did not support their claim — and 13 of those were official government pages. Turkey's foreign ministry saying “exempted from visa up to 90 days”. Austria's saying “don't need to apply for a visa”. Spain's saying it in Spanish. Every one was a ministry stating the truth in words my fixed marker list did not happen to contain, so the ministry was dropped, the aggregator survived, and the pairing read as agreement.",
          ],
          rail: [
            { label: "rejections · day 1", value: "17 of 31" },
            { label: "of those, official", value: "13" },
          ],
        },
        {
          kind: "quote",
          quote: "EG→JO was not a special case. It was the visible instance of a systematic recall failure, and the mechanism is identical every time: the ministry is dropped, the aggregator survives, the pairing reads as agreed.",
          attribution: "docs/IMPLEMENTATION_NOTES.md · §12b",
        },
      ],
    },

    {
      heading: "?? 'US'",
      blocks: [
        {
          kind: "prose",
          body: [
            "The app asked which airport you were flying from. It answered which visa you needed. Those are different questions — one is about where you are, the other about which passport you hold — and two lines of code joined them with a fallback to a string literal.",
            "Over the trailing 30 days, 36 of 154 requests reached the entry lookup with no home airport recorded at all and were served American entry rules off that literal. A pipeline that will not state a visa regime without a verbatim government quote was keying those quotes to a guess.",
            "The error is asymmetric, which is what makes it bad rather than merely wrong. An American or Emirati passport is visa-free in far more places than an Egyptian or Indonesian one, so the substitution failed toward “you can go” — and then built a departure date on top of that answer.",
            "It survived 756 green tests. Not because the tests were bad, but because none of them asserted which country the lookup filtered on, and a bad query returns an empty map by design — so the failure mode was a section quietly missing from the screen, not a red build. There is no fallback now, and the new tests were mutation-checked: putting the literal back fails two of them.",
          ],
          rail: [
            { label: "served off a literal", value: "36 of 154 (23%)" },
            { label: "green tests at the time", value: "756" },
            { label: "fallbacks remaining", value: "0" },
          ],
        },
      ],
    },

    {
      heading: "Auditing my own work",
      blocks: [
        {
          kind: "prose",
          body: [
            "Halfway through the pricing spec I stopped and audited what I had shipped against what I had claimed. The document that came out of it is the most useful thing in the repository, and it is not flattering.",
            "87% of the price table — 162 of 186 rollup rows — had not come from the harvest at all. A second, undeclared write path had filled it, stamping a hardcoded confidence higher than any real harvested row could earn. The append-only guarantee had held perfectly: no row was ever deleted. It just stopped meaning what it said.",
          ],
          rail: [
            { label: "rows not from harvest", value: "162 of 186 (87%)" },
            { label: "verdict", value: "specs/007/worklog/VERDICT.md" },
          ],
        },
        {
          kind: "quote",
          quote: "A gate that cannot fail is worse than no gate — it converts “unmeasured” into “verified”.",
          attribution: "specs/007-price-before-committing/worklog/VERDICT.md",
        },
        {
          kind: "quote",
          quote: "Layer 0's immutability held; its meaning did not.",
          attribution: "specs/007-price-before-committing/worklog/VERDICT.md",
        },
        {
          kind: "prose",
          body: [
            "The fix was a migration that revokes every imported row rather than deleting it, so the record of what went wrong survives the correction. That is the same rule applied to my own mistake as to a bad price.",
          ],
          rail: [{ label: "migration", value: "0010_revoke_import_rows.sql" }],
        },
      ],
    },

    {
      heading: "The app in front of it",
      blocks: [
        {
          kind: "prose",
          body: [
            "The iOS side had to carry the same discipline somewhere a user could feel it. Motion tokens are named for what they do — `snap`, `calm`, `press` — and each one that exists for a single call site has a comment defending why it earned a name. Fixes are recorded as fixes, not silently improved.",
          ],
          rail: [
            { label: "iOS · prod LOC", derived: { repo: "trippeIOS", field: "productionLines" } },
            { label: "iOS · tests", derived: { repo: "trippeIOS", field: "testCases" } },
          ],
        },
        {
          kind: "quote",
          quote: "Was easeIn, which arrived at full brightness at max velocity: a harsh pop that read as eye-irritating.",
          attribution: "Trippy/Core/Theme/AppAnimations.swift",
        },
        {
          kind: "quote",
          quote: "Flexibility changes the character of a tap; weight only changes how hard it hits, and a screen where everything is .impact(.light) carries no information at all.",
          attribution: "docs/design-system.md",
        },
        {
          kind: "prose",
          body: [
            "The model is never allowed to write money into the interface. `GeneratedContentGuard` is the middle of three layers that stop it, and it is currency-anchored on purpose so that “a 20-minute walk” survives while “about $40” does not. Refusing every number would have been easier and would have made the app worse.",
          ],
          rail: [{ label: "file", value: "GeneratedContentGuard.swift" }],
        },
      ],
    },

    {
      heading: "What broke",
      blocks: [
        {
          kind: "prose",
          body: [
            "Commenting out a `[triggers]` block does not remove a Cloudflare cron. The schedule survives any deploy that does not mention it, so a harvest I believed was disabled ran eleven more times over three hours and spent $1.10 I had explicitly said not to spend. The daily ceiling held, which is the only reason it was $1.10 and not a great deal more — and the accident was also the first end-to-end proof that the pipeline worked unattended.",
            "The other one I am less relaxed about. A Google Images integration for the food card had been written, documented as working, and used to justify a change to the recommendation prompt. It had never returned a photograph: every call came back 403, because the API was never enabled on the project. The evidence in its own handoff document came from a different product entirely — scrapes from another service, presented as results from this one. Shipped, its prompt change would have put photographs of cars on the food card, silently, for as long as nobody looked.",
            "I reverted it and wrote the post-mortem against myself. The lesson is not “check your API keys”. It is that a document claiming a thing works is not evidence that it works, even when I wrote the document.",
          ],
          rail: [
            { label: "cron overrun", value: "11 ticks · $1.10" },
            { label: "images postmortem", value: "docs/google-images-food-postmortem.md" },
          ],
        },
      ],
    },

    {
      heading: "Where it stands",
      blocks: [
        {
          kind: "prose",
          voice: true,
          body: [
            "It is a small app with real users rather than a big one with imaginary ones. At the baseline recorded on 23 August 2026 it had 43 active devices over thirty days, a third of results were saved, and about one in seven devices came back. Those are modest numbers and I would rather print them than round them up.",
            "What I would keep from it is not the architecture. It is the habit of writing down the measurement that makes my own work look bad, and then having to do something about it. Most of this page is a list of things I got wrong and found because I went looking. That is the part I would do again.",
          ],
          rail: [
            { label: "active devices · 30d", value: "43" },
            { label: "save rate", value: "33%" },
            { label: "baseline recorded", value: "2026-08-23" },
          ],
        },
      ],
    },
  ],

  meta: {
    title: "Trippé — a system that refuses to state what it cannot prove",
    description:
      "A travel app whose backend withholds any price it cannot trace to a quoted source: the rule, the test that enforces it, the audit that condemned my corpus.",
  },
};
