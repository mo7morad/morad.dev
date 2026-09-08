# Deploy checklist

## The domain gate — do this first, or the site will not be indexed

`site` in `astro.config.mjs` is currently `https://morad.dev`, and **the domain is not
purchased yet**. That value is not cosmetic: it feeds the canonical link, `og:url`,
`og:image`, and every `url`/`image`/`@id` in the JSON-LD. Verified rendered output today:

```html
<link rel="canonical" href="https://morad.dev/">
```

If the site goes live on any other domain, every page will declare a canonical pointing at
a domain that isn't yours. A self-referencing canonical aimed at a foreign or parked domain
is grounds for Google to drop the URL from the index entirely — not to rank it lower, to
drop it. This is the highest-consequence latent item in the repo.

**Three places hardcode the domain. They must change together:**

1. `astro.config.mjs` → `site`
2. `public/sitemap.xml` → `<loc>`
3. `public/robots.txt` → `Sitemap:`

To make (1) a single switch at deploy time rather than a code edit:

```js
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'https://morad.dev',
});
```

then set `PUBLIC_SITE_URL` in Cloudflare Pages → Settings → Environment variables.
`robots.txt` and `sitemap.xml` live in `public/` and are copied verbatim, so those two
still need editing by hand.

**Already handled, don't "fix" it:** Cloudflare Pages always exposes a `*.pages.dev` URL
alongside the custom domain. Because the canonical is *absolute*, that duplicate correctly
points Google back at the apex domain. Do not change the canonical to a relative URL.

## Social previews are cached write-once in practice

LinkedIn, Facebook and X cache Open Graph data per URL, aggressively. Whatever card is
scraped on the **first** paste is what sticks.

- Land the `<head>` metadata before the first LinkedIn/Slack/CV share, not after.
- If a URL was shared early, force a re-scrape: LinkedIn **Post Inspector**, Facebook
  **Sharing Debugger**.
- If `og.png` ever changes, **rename it** (`og-v2.png`) rather than overwriting. Unfurlers
  cache by image URL, and an overwrite may never be picked up.

## After the first deploy

- Verify the domain in Google Search Console, submit `sitemap.xml`, then use URL Inspection
  → Request Indexing. On a new domain with no backlinks this is the fastest route to being
  findable by name at all — which is the whole point of the sitemap existing.
- Re-check the canonical and `og:url` in the deployed HTML actually match the live domain.
