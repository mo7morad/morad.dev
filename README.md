# morad.dev

My portfolio. Backend-first, bilingual English and Arabic, static.

The site argues one thing: **I build systems that refuse to state what they
cannot prove.** So it holds itself to the same rule, in two ways that are worth
looking at even if you have no interest in me.

## Every figure is measured, not typed

`scripts/collect-evidence.mjs` walks the real repositories and writes
`src/data/evidence.generated.ts` — commit counts, date ranges, lines of
production and test code, and a few project-specific measurements. Copy never
carries a number it could have derived:

```ts
{ label: "roadmap · commits", derived: { repo: "roadmap", field: "commitCount" } }
```

A figure that cannot be derived is **dropped, not estimated**. The rail renders
no line for it, and a CV bullet whose number is missing does not print. There
are no placeholders and no em-dashes standing in for evidence, because a dash in
an evidence column still reads as evidence.

This has already caught me out. An early draft of the home page claimed DVLD had
"50+ stored procedures". Measuring it found none: the data-access layer is 92
command sites with 222 bound parameters and no stored procedures anywhere. The
page says that now instead.

```bash
npm run evidence    # re-measure; the output is committed so the build never
                    # depends on the repositories being present
```

## The two languages cannot drift

There is no i18n library. One exhaustive interface in `src/data/types.ts`, two
implementations, and `tsc` fails the build if a key is missing on either side.

Structure is checked too — `src/lib/parity.ts` compares a signature of each page
in both languages (section count, block kinds, table shape, how many lines of
evidence each block carries) and fails the build on a mismatch. A paragraph
quietly dropped in translation, or one language shown less evidence than the
other, does not ship.

## Maintaining it

Everything you would want to change is a typed data file. No markup, no CSS.

| To change | Edit |
|---|---|
| Anything on a case study | `src/data/case.<project>.<lang>.ts` |
| The home page | `src/data/content.<lang>.ts` |
| The about page | `src/data/about.<lang>.ts` |
| The CV | `src/data/cv.ts` |
| Adding a page | the data file, a route under `src/app/`, and one line in `src/data/routes.ts` |

Adding a section, a table, a chart or a quote means adding an object to an array.
The editor autocompletes the shape and refuses the wrong one.

## Stack

Next.js 16 App Router, static export, TypeScript, React 19. No Tailwind, no
component library, no animation library, no database, no analytics. Two root
layouts under `(en)` and `(ar)` route groups, each rendering its own
`<html lang dir>`. The only client-side JavaScript is a 22-line locale detector
that runs before paint and a link that records your language choice before it
navigates — every page renders completely with JavaScript disabled.

```bash
npm run dev
npm run verify      # typecheck, lint, build
npm run evidence    # regenerate the measurements
```

## Verified, not assumed

The build is checked against a set of gates that measure rather than eyeball:
every page complete with JavaScript off at 1440 and 390; every text element at
WCAG AA in both colour schemes; a visible focus ring on every keyboard stop;
touch targets at 44px; the locale truth table, including that a deep link is
never hijacked and a stored choice always wins; canonical and hreflang agreement
with the sitemap; and a check that asks the *renderer* which typeface actually
drew each script — which is how I found that the entire Arabic side had been
rendering in Arial while preloading an Arabic font that nothing used.

---

Mohamed Morad · [morad.dev](https://morad.dev) · momurad.business@gmail.com
