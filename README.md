# morad.dev

Personal site for Mohamed Morad — backend engineer, Apple Developer Academy Bali.

Every figure on the page (commit counts, file counts, test-file ratios) is taken from
git history or a file count in the repository it describes, not estimated.

## Stack

- [Astro](https://astro.build) — static output, no component framework
- Plain CSS with custom properties (`src/styles/global.css`), no utility framework
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling
- [simple-icons](https://simpleicons.org) imported in `.astro` frontmatter, so the brand
  marks are inlined at build time and none of the package ships to the browser

## Commands

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Dev server on `localhost:4321`            |
| `npm run build`   | Static build into `./dist/`               |
| `npm run preview` | Preview the build locally                 |

## Layout

```text
public/images/     avatar, project screenshots, certificates
src/layouts/       document shell: meta, Open Graph, JSON-LD
src/components/    PhoneMockup
src/pages/         index.astro — the whole page, content and behaviour
src/styles/        global.css
```

Requires Node 22.12 or newer.
