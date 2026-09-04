import type { CaseStudyCopy } from "./types";

export const ECODYSSEY_EN: CaseStudyCopy = {
  slug: "ecodyssey",
  eyebrow: "SwiftUI · Vision · Core ML · Private Cloud Compute",
  title: "ECOdyssey",
  thesis: "Measuring your own work honestly enough to stop trusting it.",

  facts: [
    { label: "team", value: "5 — 3 coders, 2 designers" },
    { label: "commits · all authors", derived: { repo: "wasteSort", field: "commitCount" } },
    { label: "tests", derived: { repo: "wasteSort", field: "testCases" } },
    { label: "built in", derived: { repo: "wasteSort", field: "dateRange" } },
  ],
  linkLabel: "The repository on GitHub",

  intro: {
    kind: "prose",
    body: [
      "A waste-sorting kiosk built at the Apple Developer Academy: point it at a piece of rubbish and it tells you which bin. Five of us — three writing code, two designing.",
      "Javohir trained and shipped the object-detection model on photographs we took ourselves, because no dataset of Indonesian household waste existed to train on. Danil built the in-app confirmation layer and the printed bin markers. I built the belief engine that turns detections into a decision, the cloud judge that second-guesses it, the bake-off that grades the two against each other, and the benchmark that started all of it.",
      "The interesting work was not making it answer. It was measuring how often our own model was confidently wrong, and being willing to look.",
    ],
    rail: [
      { label: "where", value: "Apple Developer Academy, Bali" },
      { label: "when", value: "Aug 2026" },
    ],
  },

  sections: [
    {
      heading: "The benchmark that redirected the project",
      blocks: [
        {
          kind: "prose",
          body: [
            "The plan was to do the reasoning on-device with Apple's Foundation Models. Before committing to it, I ran thirteen photographs we had taken ourselves through both the on-device model and Private Cloud Compute, head to head, scoring three things: did it identify the object, did it get the disposal policy right, did it get the material right.",
            "On-device managed 61.5% on the object, 38.5% on the policy and 46.2% on the material — including classifying styrofoam as compostable, which is the kind of error that makes a recycling app worse than no app. Private Cloud Compute got all three at 100% with no critical hallucinations.",
            "That result moved the cloud from a nice-to-have to the thing the feature is built on, and it is the reason the judge exists at all. Thirteen images is a small benchmark and I would not pretend otherwise — but it was thirteen more than the assumption it replaced.",
          ],
          rail: [
            { label: "images", value: "13" },
            { label: "on-device AFM", value: "61.5 / 38.5 / 46.2" },
            { label: "PCC", value: "100 / 100 / 100" },
            { label: "source", value: "specs/001 · research.md" },
          ],
        },
      ],
    },

    {
      heading: "A post-mortem on my own earlier code",
      blocks: [
        {
          kind: "prose",
          body: [
            "Before this project I had written a throwaway app to try Private Cloud Compute out. It reported errors in the background and produced odd results, and I had shrugged at it. Writing the spec for the real thing, I went back and audited it properly, and found three defects.",
            "The entitlements files were empty, so PCC was never actually available. There was no quota discipline, so failing calls just repeated. And every caught error fell into a simulated-classification function that returned a random sample item labelled “High (97.4%)”, with the flag saying it was simulated barely surfaced anywhere.",
            "So the app had been reporting fabricated confidence for a backend it had never once reached. That is not a bug in the ordinary sense; it is a machine for hiding bugs. It became the third article of the project's constitution.",
          ],
          rail: [
            { label: "audited", value: "PCC-Test (my earlier app)" },
            { label: "defects found", value: "3" },
            { label: "source", value: "specs/001 · research.md §R2" },
          ],
        },
        {
          kind: "quote",
          quote: "A failing intelligence backend MUST NEVER yield invented output. A simulated/random/heuristic fallback that mimics confidence is prohibited; degrade to the deterministic pipeline and record the failure instead. (Lesson: random “High (97.4%)” fallbacks masked every PCC error.)",
          attribution: ".specify/memory/constitution.md · III",
        },
      ],
    },

    {
      heading: "The bug that could not be caught",
      blocks: [
        {
          kind: "prose",
          body: [
            "Sending an image to PCC crashed the app on device, and not in a way Swift can defend against: a Mach trap, below the level where a `do/catch` exists. A capability preflight said the call was supported. It was not — the beta lied.",
            "I isolated it with a text-only probe against the same backend. The probe answered and the image trapped, which located the fault precisely at the image attachment rather than at availability, entitlements or the network. Three-way version drift between Xcode and the iOS beta was the cause, and nothing in our code could fix it.",
          ],
          rail: [
            { label: "cause", value: "Xcode / iOS beta drift" },
            { label: "isolation", value: "text-only probe" },
          ],
        },
        {
          kind: "quote",
          quote: "PCCVisionGate — image attempts are opt-in (default OFF). A Mach trap cannot be caught in Swift; the only defense is not making the call.",
          attribution: "Explaining PCC As A Judge.md",
        },
      ],
    },

    {
      heading: "The latency problem was a crop problem",
      blocks: [
        {
          kind: "prose",
          body: [
            "The smoke test was slow — six to eight seconds a call, straddling the ten-second timeout, one call timing out outright and another answering at 7.7 seconds. The obvious conclusion was that a round trip to the cloud is simply slow and the feature would have to be built around that.",
            "It was not the round trip. The smoke test was sending 1024-pixel crops while the live judge sends 448. Measured side by side, the 448-pixel crops answer in about 1.3 seconds. In the one real export, every answered judgment came back between 1.0 and 2.4 seconds.",
            "The fix was making both paths read the same configuration constants, so a test can no longer be measuring a different system than the one that ships. That is the actual defect: not the latency, but two code paths that disagreed about what they were testing.",
          ],
          rail: [
            { label: "1024 px crops", value: "6 – 8 s" },
            { label: "448 px crops", value: "~1.3 s" },
            { label: "in production", value: "1.0 – 2.4 s" },
          ],
        },
      ],
    },

    {
      heading: "The 81% nobody demos",
      blocks: [
        {
          kind: "prose",
          body: [
            "There is exactly one real export of the judge running on a device. It contains 27 judgments. Twenty-two of them never reached the network at all: the detected item cropped smaller than the 96-pixel floor, so the judge declined rather than sending a crop too small to reason about.",
            "Five got an answer. Two of those five caught the detection model being confidently wrong — a food-soiled kraft box that the model called residual waste at 0.92 confidence, and a used tissue it was routing to recyclables.",
            "Both things are true at once, and a demo would show you only one of them. The signal was real: two catches out of five is not a rounding error. And the plumbing was leaking badly enough that four out of five judgments never happened. I would rather print the 22 than the 2.",
          ],
          rail: [
            { label: "judgments recorded", value: "27" },
            { label: "never sent · crop floor", value: "22" },
            { label: "answered", value: "5" },
            { label: "caught the model wrong", value: "2" },
          ],
        },
        {
          kind: "table",
          caption:
            "The two disagreements, verbatim from the export. `yoloLabel` is what the on-device detector decided; `pccBinID` is what the judge said instead.",
          head: ["detector said", "at", "judge said"],
          rows: [
            ["residual", "0.92", "dirty recyclable — food residue"],
            ["clean inorganic", "0.56", "residual — used tissue, contaminated"],
          ],
          rail: [{ label: "source", value: "records.jsonl" }],
        },
      ],
    },

    {
      heading: "A bake-off built so it could lose",
      blocks: [
        {
          kind: "prose",
          body: [
            "The new decision engine had to be shown to be better than the one it replaced, and the tempting way to do that is to measure accuracy on fixtures you chose. Accuracy can be won by luck — a tie-break landing on the right answer for no reason at all.",
            "So the gate is not accuracy. It is the count of confidently-wrong verdicts: answers that were wrong while claiming certainty, which is the failure mode that actually hurts someone standing at a bin. And the fixtures deliberately include a case where the old engine's coin-flip lands on truth, and another where the old engine genuinely wins, so the comparison documents a tradeoff instead of cheering.",
            "On the bundled mix the new engine produces one confidently-wrong verdict against the old one's three. That is a real but modest result, which is what it should look like when the test was built to be able to fail.",
          ],
          rail: [
            { label: "gate", value: "confidently-wrong count" },
            { label: "belief vs legacy", value: "1 vs 3" },
            { label: "fixtures", value: "include cases legacy wins" },
          ],
        },
      ],
    },
  ],

  unfinished:
    "It is not finished, and the specific way it is unfinished is worth stating. The learned-corrections loop — the part that would notice the judge repeatedly overruling the detector on a class and adjust the routing — is built and tested, and has never fired. It needs twelve answered judgments for a class before it will act on anything. The only export in existence has five answers in total. The mechanism is correct and the data does not exist yet, which is a different problem from the mechanism being wrong, and I would rather say which one it is.",

  meta: {
    title: "ECOdyssey — measuring your own model honestly enough to stop trusting it",
    description:
      "A waste-sorting kiosk built by five people, where the interesting work was a benchmark that redirected the project, a post-mortem on my own fabricated-confidence code, and one export that showed the signal and the leak at the same time.",
  },
};
