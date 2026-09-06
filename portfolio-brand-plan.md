# Mohamed Morad — Brand & Portfolio Handoff Brief

**Version:** 2.1 · **Compiled:** 2026-09-05 · **Audience:** an agent taking over Mohamed's brand/portfolio work
**Provenance:** every fact below was measured directly from the repositories on 2025-09-05 during a six-lane audit (Apple Developer Academy · BackEnd-Fundamentals-RoadMap · Trippe · Portfolio site · Extras · git-remote visibility sweep). Detailed per-area reports live in `.openclaw/tmp/portfolio-audit/` (6 files). Numbers were derived from git history and file counts — **never edit a figure by hand; re-measure** (see §11).
**v2.1 addendum (2026-09-05, second pass):** a follow-up four-agent re-audit re-measured Trippé backend/iOS, Apple Academy, and ECOdyssey against the live repos and corrected several figures below (test-file counts, the ECOdyssey repo/ownership story, Numo's error-case count), added concrete implementation detail the first pass missed (DVLD's actual data-access pattern, Trippé iOS's Foundation Models integration, ECOdyssey's specific owned modules), and added a new §3.8 Home Lab dossier from facts Mohamed supplied directly (not repo-derived — no repo exists for it).

---

## Table of contents

1. Person snapshot
2. The verified record (master evidence table)
3. Project dossiers (Trippé · ECOdyssey/Sortla · Academy · Roadmap/DVLD · ADA-Stickies · morad.dev · Extras assets · Home Lab)
4. The brand core
5. Narrative & pitch scripts
6. Voice guide
7. Ready-to-use copy assets
8. Action plan (P0 / P1 / P2, with exact paths)
9. Safety & hygiene warnings
10. Known uncertainties — verify before quoting
11. Rules of engagement for the agent

---

## 1. Person snapshot

| | |
|---|---|
| **Name** | Mohamed Morad |
| **Age** | 23 (started programming at 21) |
| **Nationality / base** | Egyptian; in Indonesia since Aug 2023 |
| **Education** | Informatics degree at UII (Universitas Islam Indonesia), taught in English — started Aug 2023 on a scholarship; degree lands Aug 2027 |
| **Current program** | Apple Developer Academy, Bali — since Mar 2026; **first Egyptian in the cohort; ~220 places from 5,000+ applicants** (his record — see §10 before printing as press fact) |
| **Availability** | Academy ends Dec 2026; degree Aug 2027; **open to remote work or relocation; needs visa sponsorship** |
| **Contact** | momurad.business@gmail.com · [morad.dev](https://morad.dev) · [github.com/mo7morad](https://github.com/mo7morad) · [linkedin.com/in/momorad](https://www.linkedin.com/in/momorad) |
| **Origin story** | First contact with programming: Harvard CS50. First build: a Python/tkinter download manager whose source was lost (no git, no backup) — the reason `git init` is now the first thing he types. Then a self-built backend curriculum: ~25 courses, C++, C#, heavy OOP, many projects. |
| **Identity in one line** | Backend engineer · Apple Developer Academy, Bali — builds systems that refuse to state what they can't prove. |

---

## 2. The verified record (master evidence table)

Everything an agent may quote, with its source. If a number isn't here, measure it or don't say it.

| Fact | Value | Source |
|---|---|---|
| Fundamentals curriculum span | 21 months (May 25 2024 → Feb 2 2026) | git log, BackEnd-Fundamentals-RoadMap |
| Curriculum commits | 669 | git log |
| Courses completed | 25/25 (25 numbered PDF certificates on disk) | README badges + `Fundamentals/Certificates/` |
| Problems solved | 1,329 | README badge |
| Projects completed | 18 | README badge |
| DVLD capstone | C# WinForms + SQL Server, strict 3-tier — 134 `.cs` files, 28,541 lines | `Fundamentals/Coding/19 - Full Real Project/DVLD-Project` |
| Academy journey repo | 239 commits (Apr 15 → Aug 16 2026), ~70% his authorship | git log/shortlog, `mo7morad/My_Apple-Developer-Academy_Journey` |
| Academy code volume | 118 Swift files / 9,381 LOC across 4 coded apps + 1 design-only challenge | find/wc |
| Trippé backend (private) | **599 commits** (Apr→Sep 2026) · 19+ `/v1` endpoints · 31 SQL migrations · **123 test files / 21,270 lines vs 144 source files / 23,436 lines (~0.9:1)** · one runtime dependency (`jose`) | git + find/wc, `Trippe/Trippe-Backend` |
| Trippé iOS (private) | 250 commits (Jun→Sep 2026) · **372 source files / 47,075 lines vs 106 test files / 16,303 lines (~0.35:1)** · 478 files / 63,378 lines total · PCC entitlement granted · 20 files integrating on-device Apple Foundation Models (with a documented kill-switch degradation path) · App Intents · WeatherKit · Sign in with Apple · universal links · StoreKit TipJar | git + find/wc + entitlements, `Trippe/Trippe-iOS` |
| Trippé status | App Store **submission-ready/submitted** — `docs/appstore/` holds real App Store Connect copy, a full 7-screenshot set at the exact required resolution (EXIF stripped), and an IAP review shot for the tip jar. Public listing not independently confirmed this pass — verify the live URL before printing it (see §10). Marketing site `trippe.tech` (EN/AR). | repo docs/appstore audit |
| PCC lab (spec 014) | 42 measured probe runs · PCC 32,768-token context vs 8,192 on-device · ~2× faster (median 2.5s vs 4.4s) · **silent-truncation discovery** (on-device returned 5 days of a 14-day itinerary, no error) · 0 money figures leaked incl. prompt-injection attempts | `Trippe-iOS/specs/014-private-intelligence/` (research.md + lab/) |
| ADA-Stickies | Live at `academy-stickies.pages.dev` · Cloudflare Pages + Hono + D1 + R2 + magic-link auth · 9 migrations · vitest · 39 commits (33 his), Jul–Aug 2026 · real users (his cohort) | Extras audit + `mo7morad/Academy-Stickies` |
| Portfolio site | `morad.dev` · Next.js 16 static export · EN/AR structural parity enforced at build · figures auto-generated from repos via `npm run evidence` | `Portfolio/` (scripts/collect-evidence.mjs, src/lib/parity.ts) |
| GitHub visibility | Public: roadmap (⭐3), Academy journey, Academy-Stickies, Sortla-Website, SlapMac, morad.dev. **Private: Trippe-Backend, Trippe-iOS, Trippe-Android, Trippe_Website, Trippe** | remote/visibility sweep |
| GitHub profile | Stale — no bio, README says "C#/C++ specialist, Software Engineering Student", 11 followers | profile audit |

---

## 3. Project dossiers

### 3.1 Trippé — the flagship (backend + product)

**What it is:** a vibe-first trip recommendation app — "budget-in trip, honest prices out." The user answers who/when/vibe/interests/budget; an LLM proposes the destination; **every pick is priced against real harvested data before it's shown**, and the system refuses to state any figure it cannot trace to a source. Mohamed is sole author of the backend, the iOS client, and the cost engine. Live on the App Store (Sep 2026) with an EN/AR marketing site at trippe.tech.

**Architecture (verbatim from the repo README):**

```
Trippe-iOS (9-step flow: gateway → who → timing → vibe → interests →
            budget → review → loading → result)
  │  X-Trippy-Secret + optional Supabase JWT
  ▼
trippy-proxy (Cloudflare Worker) ──── cron */15 min: drain demand queues
  /v1/recommendation[/stream] SSE      → Exa harvest → verify → Layer 0 rows
  LLM tiers: Gemini → DeepSeek         ($10/day shared ceiling)
  menu constraint ← feasible set
  /v1/flights (Travelpayouts grid → SerpApi 1×), budget-preview, weather, cities…
  ▼
Supabase Postgres ── Layer 0 (append-only): fare_observation, price_observation, fx_rate
                  └ Layer 1 (regenerable): city_price_level, city_seasonality
```

**The five selling points (in order):**

1. **Provenance as a schema constraint** — Layer 0 is append-only; every price row must quote its source (`source_quote text not null` + non-empty check, migration 0006). An extraction that can't quote its page is discarded, not stored. Hallucinated numbers die at the database level, not by prompt politeness.
2. **Refusal is a first-class API outcome** — a city that fails the verification ladder or confidence floor produces *no row at all*, never a partial one. Migrations 0010/0011 are literally named `revoke_*`.
3. **Budget independence is a property test** — the suite sweeps $500–$20,000 and asserts exactly three distinct cost outputs (one per tier); any leak of budget into pricing arithmetic fails the build.
4. **Production-grade quality culture** — 117 test files vs 144 source files; `npm run verify` = triple typecheck + eslint 10 + full vitest; a "Code Health ratchet" in CI; measurement tooling as npm scripts (`measure-coverage`, `tune-corroboration`, `regenerate-rollups`, `measure-date-shift`).
5. **Cost-aware LLM engineering** — Gemini→DeepSeek tiering behind a menu constraint derived from a feasible set; SSE streaming paced into the iOS loading experience; cron-driven demand queues harvested under an explicit $10/day ceiling; the entire Worker runs on **one runtime dependency** (`jose`).

**iOS side:** 47,075 lines of SwiftUI across 372 source files plus 106 test files (16,303 lines) — an explicit MVVM app with `AppDependencies.swift` as a composition root (dependency injection, no DI framework), SwiftData persistence with a graceful degrade-to-in-memory fallback if the on-disk store fails (no crash on launch), and two separately-tuned `URLSession` configs — a long-timeout one for the SSE recommendation stream, a bounded 15s/45s one for sync/analytics/account calls — a deliberate split, not an oversight. App Intents, WeatherKit, Sign in with Apple, universal links (`/t/*` shared trips), StoreKit TipJar, and a versioned App Store kit (listing copy, deliberately ordered 6.9" screenshots — "the payoff leads" — IAP review assets) in-repo.

**On-device AI, separate from the backend LLM:** 20 files integrate Apple's on-device Foundation Models (`AFMRecommendationService`, `AFMPackingService`, `AFMInterestService`, etc.) with a `PrivateIntelligenceKillSwitch` degradation path, plus opt-in `PCCLabTests` that spend real daily Private Cloud Compute quota to assert generated copy never lets a money figure slip through — the same "refuses to state what it can't prove" rule enforced on the on-device AI layer too, not just the pricing backend.

**Apple Private Cloud Compute:** his developer account holds `com.apple.developer.private-cloud-compute` — a *managed* entitlement Apple grants per account via request form. Spec 014 ("Private Intelligence") is a complete spec-kit chain whose ground truth was measured, not assumed (see §2 table). Product rule: **PCC never generates a trip and never emits a number** — it's a delight layer (ask-this-trip-anything, reshape-in-your-words, day-by-day itinerary, trip-aware packing), enforced structurally via generated schemas with no field a figure could occupy. On-device services stay on-device permanently.

**Ecosystem:** Android client (Kotlin 2 + Jetpack Compose, full parity *spec* — Phase 1 implemented: Gradle scaffold, lint gates, theme token port, `./gradlew check` green; do **not** claim parity publicly yet). Product web client (Open Next on Cloudflare Workers, spec 013, in progress). Marketing site (Next.js 16 static export, EN/AR, renders with JS disabled).

**Known gaps:** all four Trippé repos are **private** (the single biggest visibility problem — see P0). Android repo root is untidy (`Oops.rej`, seven `fix_*.patch` files, `temp.kt`, committed `build/`). Verify `Secrets.xcconfig` (iOS) and `local.properties` (Android) stay gitignored.

### 3.2 ECOdyssey / Sortla — the team ML story

**What it is:** Sortla — a kiosk-style camera app (iPhone/iPad) built by a team of five at the Academy that watches a waste station and lights up the correct bin (organic/residual/recyclable) via on-device YOLOv8 segmentation (Core ML). 228 Swift files, 46 test files. Course name ECOdyssey; public product name Sortla. Real repo is the teammate's `JavohirMX/waste-sort` (117 commits, Aug 13–26 2026, 57 authored by Mohamed under `dronaessam@gmail.com`, the rest split across at least three teammates and a Copilot-bot commit) — his own `mo7morad/ECOdyssey` wrapper repo is a separate, mostly-empty 8-commit shell that happens to contain a checkout of that same team repo. **Say "my role on a 5-person team," never "my project."**

**His three verified, personally-authored components (this is the real evidence, use it specifically):**
1. **`BeliefEngine.swift`** (234 lines) — fuses noisy per-frame YOLO detections into one time-decayed belief per tracked object: exponential half-life decay, a threshold-plus-margin decision gate, and hysteresis-locked labels so the on-screen verdict doesn't flicker frame-to-frame. Replaced two disagreeing legacy voting mechanisms.
2. **PCCJudge module** (2,122 lines across 8 files: `PCCArbiterService`, `PCCTriggerPolicy`, `PCCJudgeQueue`, `PCCRecordStore`, `PCCDatasetExporter`, etc.) — routes uncertain verdicts to Apple's Private Cloud Compute for a second opinion, with an explicit trigger policy, auditable exportable verdict records seeding a future training dataset, and a learned-corrections loop that re-routes classes based on systematic model/PCC disagreement.
3. **The bake-off** (`BinDecisionEvaluation.swift` + `BinDecisionBakeOffTests.swift`) — a deterministic harness replaying 7 fixture scenarios against the old confidence-vote strategy vs. his belief-engine strategy. Verified real result: the legacy approach produced 3 confidently-wrong verdicts against the belief engine's 1, on the same fixture mix. This is the literal proof behind the brand line "measuring your own work honestly enough to stop trusting it" — the measurement found a real bug, it wasn't a demo of a passing test.

**Known gaps (fix before publicizing):** rewrite the `mo7morad/ECOdyssey` README as *his* role story with links out to `JavohirMX/waste-sort` and `mo7morad/Sortla-Website` (marketing site, React/Vite/Tailwind), or archive it in favor of a clean "my role" writeup. Don't imply sole or majority authorship of the app itself.

### 3.3 Apple Developer Academy — the growth story

**Repo:** `mo7morad/My_Apple-Developer-Academy_Journey` (public, 239 commits, Apr 15 → Aug 16 2026, ~70% his authorship; 118 Swift files / 9,381 LOC).

**The five studio challenges (first five weeks):**

- **Numo** (Ch3 · Nutrition) — the strongest: a hand-rolled Claude vision client (`AnthropicMealAnalysisClient.swift`, `claude-sonnet-4-6`) that analyzes meal photos — base64 JPEG in, structured JSON out via an explicit output schema, `temperature: 0` with an in-code comment explaining why ("structured nutrition data must be reproducible and schema-compliant, not creative"), and a 12-case typed error enum (`AnthropicMealAnalysisError`) covering payload-too-large, 401/403/429/400, refusals, and truncated/malformed responses; protocol-based dependency injection; SwiftData/domain boundary; secrets hygiene (no key ever committed); an accessibility map. *Lead with this one.*
- **Distill** (Ch4 · iStack) — PencilKit `UIViewRepresentable` with a re-entrancy-safe Coordinator, SwiftData-backed `PKDrawing` persistence, DominantColors SPM package → CoreGraphics Mondrian generator, two-tier notifications. README documents an honest pivot: dropped a planned face-recognition/photo-classification feature after hitting Apple's Photos privacy API limits, reworked around public APIs instead — a real caveat worth keeping in the copy, not smoothing over (§6 rule 3).
- **ContactsRemix** (Ch2) — a duo project that preserves *both* stages of its own evolution in the repo: `AcademyVersion.swift` (hardcoded/static) and `DictionaryViewVersion.swift` (refactored to data-driven via `Dictionary(grouping:)`) — a legible, literal before/after of the same instinct DVLD's four rewrites show at larger scale.
- **PrimeShift** (Ch0), **HelpAnAcademyFriend** (Ch1) — earlier challenges; design-process value.

**Known gaps (fix in P1):** **zero tests in all 4 code projects**; no CI/linting; no localization; README drift vs code; folder typos (Ch0/Ch01 numbering); some AI-assisted READMEs need a human pass. Adding a handful of real tests to Numo and Distill + a CI badge is the highest-value hygiene fix here.

### 3.4 BackEnd-Fundamentals-RoadMap / DVLD — the discipline story

**Repo:** `mo7morad/BackEnd-Fundamentals-RoadMap` (public, ⭐3). A self-curated backend curriculum: 669 commits over exactly the 21-month span (May 2024 → Feb 2026), 25/25 courses with 25 numbered certificates, 1,329 problems, 18 projects. Order: C++ → six levels of algorithms/problem-solving → OOP → data structures → C#/WinForms → SQL → T-SQL → DB connectivity → REST APIs → SOLID → unit testing → capstone. Front-End basics (33 HTML topics + CSS) included.

**The project ladder (a growth narrative in itself):** MathQuiz → RPS → BankingSystem (persistence + logging) → ATM/Banking V3 (auth, CRUD) → ContactsSystem → DrivingSimulation → **OOP Banking System V4** (users, customers, multi-currency exchange, transaction + activity logs, admin controls) → QueueLineTickets → TicTacToe (WinForms) → Pizza Shop (WinForms) → **DVLD**.

**DVLD (the capstone):** Driving & Vehicle License Department system — C# WinForms + SQL Server, strict 3-tier architecture split into three real class libraries (`DVLD` presentation, `DVLD_Buisness` — genuine folder misspelling, an authentic artifact, don't "fix" it in copy — and `DVLD_DataAccess`), **134 `.cs` files / 28,541 lines**. Data access is 100% parameterized inline ADO.NET (`SqlConnection`/`SqlCommand`/`SqlDataReader`, fully async via `OpenAsync`/`ExecuteReaderAsync`) with dedicated DTOs (e.g. `DriverDTO`) separating data-layer shape from domain objects — no stored procedures, verified by a zero-hit grep. Business layer uses an explicit `enMode { AddNew, Update }` pattern on domain classes rather than a formal state machine — describe it as "mode-driven CRUD state," not "state machine." "The largest thing I had built at the time." A recorded walkthrough exists (verify the link — §10).

**Selling angle:** not the individual exercises — the *commitment curve* (669 commits, verifiable, ramping hard in Dec 2024 [75 commits], Feb 2025 [79], and especially Dec 2025 [174] — a real intensity curve, not a steady drip) and the banking system rebuilt **three times** (V1 procedural/flat-file → V3 adds RBAC/multi-user auth → V4 full OOP rewrite with `clsBankClient`/`clsCurrency`/`clsUser`, ~6,000 lines) as evidence of architectural growth. CV framing already on the site: "Twenty-five courses, 1,329 problems, eighteen projects."

**Known gaps:** build artifacts committed (684 `.exe`, 735 `.pdb`, 558 `.dll`, ~2,000 cache/metadata files — repo reads unpolished at first scroll); README prose says "26 courses" while the badge says 25/25; no screenshots of desktop apps in-repo (portfolio has shots — cross-link).

### 3.5 ADA-Stickies — the "ships for real users" proof

**What it is:** a live full-stack app built *for his actual Academy cohort*: Cloudflare Pages + Hono + D1 + R2 + magic-link email auth, 9 migrations, vitest tests, live at `academy-stickies.pages.dev`. Public repo `mo7morad/Academy-Stickies`, 39 commits (33 his), Jul–Aug 2026.

**Why it matters:** it's the smallest complete proof that he ships software other people use — and it's currently buried with no description. Surface it: README with an architecture sketch, pinned on GitHub, one line in the portfolio.

### 3.6 morad.dev — the portfolio (and a portfolio piece itself)

**Status (correction):** as of 2026-09-05, `Portfolio/` on disk contains only this brief — no code exists yet. Everything below in this section describes the *intended* architecture, not something already built. On 2026-09-05 the stack was reopened and changed: **Astro + TypeScript + schema-validated Content Collections, hand-rolled CSS (no Tailwind, no component library), deployed to Cloudflare Pages** — not Next.js. Reasoning: this is a content/evidence site, not an app; Astro ships zero JS by default and its Content Collections are the literal mechanism for "add a project without touching code" (a new case study is a new file matching a Zod schema); Cloudflare Pages keeps the site in the same ecosystem as the Trippé Worker, ADA-Stickies, and the planned domain registrar. Deployed at **morad.dev** (repo `mo7morad/morad.dev`, created Sep 4 2026). The ideas below (evidence rail, EN/AR parity, generated CV) are the goals to implement on the new stack — the file paths (`src/data/evidence.generated.ts` etc.) will differ once actually built; re-derive them from the real repo, don't assume Next.js conventions.

**What makes it exceptional (say this when anyone asks "why is your site like this"):**

- **Claim → evidence rail pattern**: every page pairs claims with a rail of derived figures (commit counts, date ranges, LOC, test counts) read from `src/data/evidence.generated.ts`, written by `npm run evidence` (scripts/collect-evidence.mjs) measuring the real repos. Footer: *"Figures on this site are generated from the repositories they describe, not typed by hand."*
- **EN/AR structural parity enforced at build** (src/lib/parity.ts compares section signatures + evidence counts between languages; mismatch fails `next build`). RTL handled deliberately.
- **The CV is a template** fed by the same evidence module — CV numbers can't drift either. CV is English-only by explicit design (it exists to be sent to employers hiring in English).
- Case studies read as engineering arguments with verbatim source quotes + file attributions (e.g., `supabase/migrations/0006_price_provenance.sql`), not marketing blurbs.
- Five case studies: Trippé ("A system that refuses to state what it cannot prove"), ECOdyssey ("Measuring your own work honestly enough to stop trusting it"), Academy, Roadmap ("Twenty-one months of fundamentals before I shipped anything"), DVLD ("The capstone of the roadmap").

**Hero copy (verbatim, keep this):** *"I spent twenty-one months on fundamentals before I shipped anything. Then I built a travel app that will not invent a price — because a number you cannot trace is worse than no number at all."*

**Known gaps:** no PDF CV download, no OG images, no testimonials, no blog/writing surface, Trippé case study links only to the App Store (repos private), the DVLD walkthrough video is mentioned but verify it's actually linked, ECOdyssey case links to a teammate's repo.

### 3.7 Extras — dormant assets worth activating

| Asset | What it is | Value | State |
|---|---|---|---|
| **PCC-Test** | Apple PCC / Foundation Models research suite: SwiftUI diagnostic app + Python CLI benchmarks + OpenAI-compatible local bridge | The receipts behind the PCC claims | **Unversioned** — make it a public repo (P1) |
| **Mask!** | Native macOS Swift voice-trigger CLI (SpeechRecognition → "COPY!" → automations) | Fun systems-Swift; personality | Unversioned |
| **Older Trippy archive** | 9 design-iteration PNGs (V0→V6) + early SwiftUI experiments | A "how the app grew up" visual post | In `Extras/` |
| **Soulcial** | One-night hackathon ("vibecheck-bali", May 9): Next.js + Supabase; 102 Bali events scraped, Claude-Haiku-tagged into 12-dim personality vectors, cosine-similarity ranking, .ics export | Hackathon speed + AI integration story | On teammate's `loveangelagu/soulcial`; the `HACKATHON.md` handoff doc is the real artifact. **⚠ Live keys in local `.env.local` — rotate first, never publish (§9)** |
| SlapMac | Accelerometer "SlapMyMac" macOS app | Minor | Stub README, 2 commits |
| Non-assets | `100 Days With Swift` (empty), LeetCode (1 file), `Linkedin-Skills` + `mcp-server-shell` (third-party clones, 0 own commits) | — | Don't feature; consider archiving |

### 3.8 Home Lab — the tinkerer proof

**Source:** supplied directly by Mohamed (2026-09-05) — there is no repo for this, so it can't be "measured" the way the rest of this document is; treat it as a personal-testimony fact, not a git-derived one.

**What it is:** a repurposed laptop running as a dedicated home server — Debian, headless, managed entirely over SSH, with Nginx as reverse proxy. Two services running on it: **Pi-hole** (network-wide DNS-level ad/tracker blocking) and **Immich** (self-hosted photo backup and library — replaces a paid Google Photos/iCloud subscription with infrastructure he runs and controls himself).

**Why it matters to the brand:** this is the same instinct as the rest of the record, aimed at his own life instead of a client's — he owns his infrastructure rather than renting someone else's, and he'd rather run and maintain the thing than pay a subscription for a worse version of it. It's a small, personal-scale instance of "ships complete products alone" and "evidence over claims" (pillars 3 and 2, §4): a home server isn't hallucinated capability, it's a specific stack he keeps online. Good as a short sixth story or an "beyond the code" aside — not a flagship case study; it's texture and proof of genuine curiosity, not a technical centerpiece.

**Known gaps / things to confirm before publishing:** no public link or screenshot exists for this (by design — a home DNS sinkhole and photo library shouldn't be exposed publicly); copy should describe the setup, not link to it. Confirm with Mohamed whether he wants the exact hardware named (e.g. "an old laptop") or left vaguer for basic opsec.

---

## 4. The brand core

### The one idea

**"The engineer who won't state what he can't prove."**

Not invented — it's the already-existing through-line of the work: the provenance schema, the measured PCC lab, the model bake-off, the portfolio that generates its own figures. The site already says it: *"a number you cannot trace is worse than no number at all."* That sentence is the brand. Own it everywhere.

### Three pillars (each pre-proved — see §2 for sources)

1. **Foundations before shipping** — "I spent 21 months on fundamentals before I shipped anything, on purpose." (669 commits · 25 courses/certs · 1,329 problems · DVLD 28.5K LOC)
2. **Evidence over claims** — "Every number I ship can be traced; every claim I make is measured." (provenance-constrained engine · ~1:1 test ratio · 42 measured PCC probes · auto-derived portfolio figures)
3. **Ships complete products alone** — "Backend, iOS client, cost engine, store kit — one person, live product." (Trippé on the App Store · ADA-Stickies live for a real cohort)

### Positioning

- **Professional anchor (keep):** *Backend engineer · Apple Developer Academy, Bali* — defensible in every interview; matches target roles.
- **Layer:** *backend-first, iOS second; I ship the product around my backend.* This resolves the "backend engineer with a live iOS app" tension by owning it instead of hiding it.
- **Target roles, in order of fit:** (1) Backend/platform engineer at product startups — Cloudflare Workers · TypeScript · Postgres/Supabase · SSE/LLM orchestration (exactly Trippé's stack). (2) AI-native product engineer — iOS + LLM systems (PCC, Foundation Models, guided generation, streaming, structured outputs). (3) Full-stack product engineer at small teams needing one person to ship the whole thing.
- **Availability (state once, plainly, everywhere):** open to remote or relocation; needs visa sponsorship. Academy ends Dec 2026; degree Aug 2027.

---

## 5. Narrative & pitch scripts

### The arc (all verified)

Cairo, 2023 — CS50 explains what a computer actually does; first build is a Python/tkinter download manager whose source is lost (no git, no backup) — the reason `git init` is now the first thing he types. **Aug 2023** — leaves Egypt on a scholarship: Informatics at UII, Indonesia. **May 2024 – Feb 2026** — twenty-one months of fundamentals (25 courses, 1,329 problems, 18 projects, 669 commits), ending in DVLD, finished one month before the Academy started. **Mar 2026** — Apple Developer Academy, Bali: first Egyptian in the cohort, 220 places from 5,000+ applicants; five studio challenges in five weeks, then ECOdyssey. **Sep 2026** — Trippé goes live on the App Store: sole author of backend, iOS app, and cost engine. **Dec 2026 → Aug 2027** — Academy ends, degree lands; open to remote or relocation.

### 30-second version (interview opener / intros)

> "I'm a backend engineer — I spent twenty-one months on fundamentals before I shipped anything, on purpose. Then I built Trippé, a travel app that's live on the App Store, where the hard problem is honesty: the backend prices every destination against harvested data and refuses to state any figure it can't trace to a source. I wrote the backend, the iOS app, and the cost engine myself. I'm at the Apple Developer Academy in Bali — first Egyptian in the program — and I'm looking for backend work where evidence matters."

### 2-minute version (recruiter call)

The 30-second version, then add in order: **DVLD** (proof he can carry architecture — 28.5K lines, strict 3-tier), **the PCC story** (proof he does rare things — one of few developers holding Apple's Private Cloud Compute entitlement, and he *measured* it: 42 probes, found on-device silently truncates long structured output, which moved the itinerary feature to PCC), and **ADA-Stickies** (proof he ships for real users, not just himself). Close: "Academy ends December 2026, degree August 2027 — backend or AI-product roles, remote or relocation."

### The connective line (use everywhere)

> *"When you are applying from a country you are not from, for work in a country you have not been to, the only thing that travels ahead of you is evidence."*

---

## 6. Voice guide

His existing voice is already right — dry, precise, self-deprecating in the right places, allergic to unearned claims. Rules for anything written in his name:

1. **Never state a claim without its number.** Not "extensive testing" — "117 test files against 144 source files."
2. **Quote the artifact.** File paths, migration names, commit counts. It's his signature move.
3. **Keep the honest caveats** ("That was luck, not planning"). They build more trust than polish.
4. **End on what the work refuses to do.** "It would rather show you nothing than invent a price." That's the memorable move.
5. **State the Academy stats plainly, once, no adjectives** — 220 places, 5,000+ applicants, first Egyptian. Plain numbers are his style; let them land.
6. No exclamation marks, no "passionate about," no "excited to announce." If a sentence would survive on a corporate careers page, it's not his voice.

---

## 7. Ready-to-use copy assets (edit lightly, don't dilute)

### GitHub bio (≤160 chars)

> Backend engineer · Apple Developer Academy, Bali. Trippé on the App Store. I build systems that refuse to state what they can't prove.

### GitHub profile README (draft)

```markdown
# Mohamed Morad

Backend engineer. Twenty-one months of fundamentals before I shipped anything —
then a live App Store app whose backend withholds any figure it cannot trace to
a quoted source.

- 📍 Egyptian, in Indonesia since 2023 · Apple Developer Academy, Bali
  (first Egyptian in the cohort)
- 🚢 [Trippé](https://apps.apple.com/app/id6766072256) — live on the App Store;
  I wrote its Cloudflare Worker backend, its SwiftUI client, and its cost engine
- 📐 Every figure on [morad.dev](https://morad.dev) is generated from the
  repositories it describes, not typed by hand
- 🎓 Informatics @ UII (Aug 2027) · Academy ends Dec 2026 ·
  open to remote work or relocation

> "When you are applying from a country you are not from, for work in a country
> you have not been to, the only thing that travels ahead of you is evidence."
```

**Pin (suggested order):** morad.dev · BackEnd-Fundamentals-RoadMap · My_Apple-Developer-Academy_Journey · Academy-Stickies · Sortla-Website (after P0 fixes).

### LinkedIn headline

> Backend engineer @ Apple Developer Academy (Bali) | Built Trippé — live on the App Store | Cloudflare Workers · TypeScript · Supabase · SwiftUI

### LinkedIn About (draft)

> I spent twenty-one months on fundamentals before I shipped anything — C++, algorithms, SQL, C#, SOLID, testing: 25 courses, 1,329 solved problems, 669 commits, ending in a 28,000-line three-tier desktop system. Then the Apple Developer Academy in Bali accepted me — the first Egyptian in the cohort — and one month in, I started the thing that made all of it click.
>
> Trippé is live on the App Store. It recommends you a trip you can actually afford, which means it has to state a price — and the backend refuses to state any figure it cannot trace to a quoted source. I built it alone: the Cloudflare Worker backend, the SwiftUI client, and the cost engine between them.
>
> I look for the same property in everything I build: every claim should be measurable, and every number should be traceable. Even my portfolio derives its own figures from the repositories it describes.
>
> Academy ends December 2026, degree lands August 2027. Open to backend or AI-product roles — remote or relocation.

### CV summary (already on morad.dev — reuse verbatim as master text)

> Backend engineer. {commits} commits across {span} on fundamentals before shipping anything, then a live App Store app whose backend withholds any figure it cannot trace to a quoted source. Sole author of its backend, its iOS client and its cost engine.

---

## 8. Action plan (prioritized, with exact paths)

### P0 — this week

1. **GitHub profile rewrite** (~1h, highest ROI): bio + profile README (§7) + pin order above. Remove the "C#/C++ specialist" README.
2. **Security sweep (quiet, immediate):** rotate/revoke live keys in `Extras/Soulcial/.env.local`; keep that repo unpublished as-is. Verify gitignored: `Trippe-iOS/Secrets.xcconfig`, `Trippe-Android/local.properties`, `Trippe-Backend/.dev.vars`.
3. **Public slice of Trippe-Backend** — don't open the whole repo. Best options: (a) the provenance schema + refusal ladder as a standalone repo (migrations 0005–0011 with a good README), or (b) a public "engineering overview" repo with the architecture diagram, measured numbers (test ratio, endpoint list, harvest economics), and verbatim excerpts. Goal: give recruiters somewhere real to go after the case study.
4. **Claim Sortla:** rewrite `mo7morad/ECOdyssey` README — his role (belief engine, cloud judge, bake-off), links to `JavohirMX/waste-sort` + `mo7morad/Sortla-Website`; delete the stale FirstMVP code or archive the repo for a clean one.
5. **PDF CV:** print stylesheet on the `/cv/` page of `Portfolio/` → one-click PDF; add a download link.

### P1 — next 2–4 weeks

6. **Testimonials (ask now):** Academy instructors (craft + selection), ECOdyssey teammates (bake-off story), ADA-Stickies users. Two or three honest quotes on morad.dev.
7. **Two long-form posts** (80% pre-written in the specs/lab reports):
   - *"What 42 measured probe runs taught me about Apple's Private Cloud Compute"* — silent truncation, adversarial money-leak testing, instruction defects found and fixed.
   - *"The database constraint that kills hallucinated prices"* — Layer 0/Layer 1, `source_quote text not null`, refusal as a first-class outcome.
   Publish on morad.dev (needs a writing surface — case studies don't rank, posts do), cross-post to LinkedIn.
8. **Demo video:** 30–60s of Trippé generating a priced trip (the reveal + cost breakdown); embed in the Trippé case study; pin everywhere.
9. **Version PCC-Test** as a public repo backing post #7a.
10. **Academy repo hygiene:** add real tests to Numo + Distill, CI badge, fix folder typos, human-pass the AI-assisted READMEs, reconcile README drift.
11. **Roadmap repo cleanup:** `.gitignore` + strip committed build artifacts (exe/pdb/dll/cache); fix "26 courses" prose vs 25/25 badge; cross-link portfolio screenshots; add desktop-app screenshots.

### P2 — ongoing (compounding)

12. **"Twenty-one months of nothing" essay** — why he chose depth over early shipping. Nobody else at junior level has this story.
13. **Design-evolution post:** the 9 Trippé iterations (V0→V6 PNGs in `Extras/Older Trippy`).
14. **LinkedIn refresh** to match §7; Featured: App Store link, morad.dev, the two posts.
15. **"Now" page** on morad.dev (academy ends Dec 2026 · degree Aug 2027 · open to work); update quarterly.
16. **"How this site is built" note** (~300 words): the evidence pipeline + build-time EN/AR parity checker — the brand proving itself.
17. **Commit cadence on morad.dev itself** — it's public and will be read as evidence.
18. **ADA-Stickies README** with architecture sketch; surface on the site (maybe a sixth mini case study: "shipped for my cohort in two weeks").

---

## 9. Safety & hygiene warnings (read before touching anything)

- **`Extras/Soulcial/.env.local` contains live keys.** Rotate/revoke first. Never publish, commit, or screenshot that folder.
- Private repos (Trippe-Backend, Trippe-iOS, Android, Website, Production) must **not** be pushed public, quoted in full, or screenshotted beyond what's already in the case studies without Mohamed's explicit sign-off. The public slice (P0 #3) is the sanctioned exception.
- Never hand-edit figures that `npm run evidence` generates (`Portfolio/src/data/evidence.generated.ts`). Re-run the script instead.
- EN/AR parity: after editing any case-study content, run the build — `src/lib/parity.ts` fails loudly on drift. Fix both languages, don't bypass the check.
- Don't claim Android feature parity publicly until it's true ("Android client in active development" is the approved phrasing).
- `trash` over `rm` for any cleanup; ask before anything destructive.

---

## 10. Known uncertainties — verify before quoting

1. **"220 places from 5,000+ applicants / first Egyptian"** — from Mohamed's record. Fine for his personal site; have a citable source (Academy email/announcement or his LinkedIn post) ready for press-like contexts.
2. **DVLD walkthrough video** — the portfolio says "a walkthrough I recorded"; verify the link exists and is embedded on the DVLD page, or remove the claim.
3. **App Store live status/date "Sep 2026"** — a second-pass local audit could not independently confirm a public listing URL (it only has filesystem access), but found strong submission evidence (`docs/appstore/` has App Store Connect copy, correctly-sized screenshots, IAP review assets). Check the actual App Store listing before printing "live" or a date.
4. **Old public repos** (NLP/DDoS/neetcode/TS, 2025–2026, locally absent) — audit for naming/content consistency; "DDoS" in a repo name can read badly out of context; archive or clarify as needed.
5. **Sortla vs ECOdyssey naming** — course name vs public product name; decide the canonical public name and use it consistently.
6. **Academy cohort end date (Dec 2026) and UII graduation (Aug 2027)** — as stated by Mohamed; verify against official documents before contractual use.

---

## 11. Rules of engagement for the agent

1. **This document is the source of truth.** If a number you need isn't in §2, measure it (git log / find / wc) — never estimate, never carry over stale numbers.
2. **External actions require his explicit approval** — publishing posts, sending emails, changing public repos/profiles. Prepare drafts; let him approve. Internal work (drafting, local edits, measuring, repo hygiene) proceeds freely.
3. **Preserve the voice (§6).** If a draft sounds like a corporate careers page, rewrite it.
4. **English is the working language for all public artifacts** (his CV is English-only by design); the *site* is bilingual EN/AR with build-enforced parity — never let the two languages drift.
5. **Never touch §9 items without following the safety order** (rotate keys before anything else near Soulcial).
6. **When building the portfolio repo (`Portfolio/`), follow the locked conventions**: Astro + TypeScript + Content Collections, hand-rolled CSS (no Tailwind), evidence-derived figures, verbatim quotes with file attributions. Match these — don't introduce a different framework or styling system without asking (see §3.6 for why Astro was chosen over the earlier Next.js plan).
7. **Verify before delivering:** run `npm run verify` (typecheck + lint + build) in `Portfolio/` after content changes; confirm links resolve; confirm figures still match §2.
8. **When in doubt, ask Mohamed** — he would rather answer a question than find a wrong number published in his name.

---

_The pattern to keep: he doesn't need a louder story. He needs the same story, backed by the same evidence, finally visible in public._
