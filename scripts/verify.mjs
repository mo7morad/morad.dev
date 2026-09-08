// Regression harness for this page's settled decisions.
//
// Every check corresponds to a defect that actually shipped here once and was
// caught only by measuring — several were invisible in the CSS and invisible in
// a screenshot (three separate [hidden] bugs left a full-screen overlay
// swallowing every click; an auto-fill grid silently resolved to seven columns;
// width/height attributes silently killed aspect-ratio and cropped every
// certificate). Read the CSS and you will not find them. Run this instead.
//
//   npm run dev            # port 4322 — the LIVE server
//   npx playwright install chromium   # once
//   node scripts/verify.mjs
//
// Playwright is intentionally not a dependency of this site; run it with npx.
// NEVER point this at port 4331 — that is `astro preview` serving a frozen
// dist/ and it has reproduced already-fixed bugs. The guard below checks.
//
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4322';
const results = [];
const pass = (n, d = '') => results.push({ ok: true, n, d });
const fail = (n, d = '') => results.push({ ok: false, n, d });
const check = (cond, n, d = '') => (cond ? pass(n, d) : fail(n, d));

// The dev server is the only trustworthy one: 4331 is `astro preview` serving a
// frozen dist/ and has reproduced already-fixed bugs.
const guardServer = async () => {
  const res = await fetch(BASE);
  const html = await res.text();
  if (!html.includes('cert-10.webp')) {
    throw new Error(`${BASE} does not look like the live portfolio page.`);
  }
  return html;
};

const run = async () => {
  await guardServer();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  // sessionStorage gate: skip the first-visit intro so it can't cover the page
  // during measurement.
  await page.addInitScript(() => {
    try { sessionStorage.setItem('introSeen', '1'); } catch {}
  });
  await page.goto(BASE, { waitUntil: 'networkidle' });

  // ---- 1. No runtime errors -------------------------------------------------
  check(errors.length === 0, 'no console/page errors', errors.slice(0, 3).join(' | '));

  // ---- 2. Overlays must not swallow clicks ---------------------------------
  // Three separate [hidden] bugs on this page left an invisible full-screen
  // overlay eating every click. Invisible in a screenshot; only elementFromPoint
  // catches it. Probe several points, including after opening+closing each one.
  const probePoints = async (label) => {
    const hits = await page.evaluate(() => {
      const pts = [[80, 300], [720, 300], [1360, 300], [720, 620], [200, 800]];
      return pts.map(([x, y]) => {
        const el = document.elementFromPoint(x, y);
        if (!el) return 'null';
        const bad = el.closest('.certview, .csheet, .certpop, .intro');
        return bad ? bad.className : 'ok';
      });
    });
    const blocked = hits.filter((h) => h !== 'ok' && h !== 'null');
    check(blocked.length === 0, `no overlay intercepts pointer (${label})`, blocked.join(','));
  };
  await probePoints('at rest');

  // ---- 3. Certificate viewer: open, arrow, close, focus restored -----------
  const tile0 = page.locator('.cert').first();
  await tile0.click();
  await page.waitForTimeout(400);
  check(await page.locator('#certview').isVisible(), 'certview opens on tile click');
  const shownFirst = await page.locator('#certview-n').textContent();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(400);
  const shownNext = await page.locator('#certview-n').textContent();
  check(shownFirst !== shownNext, 'arrow key advances the certificate', `${shownFirst} -> ${shownNext}`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  check(await page.locator('#certview').isHidden(), 'certview closes on Escape');
  const focusIsTile = await page.evaluate(() => document.activeElement?.classList.contains('cert'));
  check(!!focusIsTile, 'focus returns to the tile that opened the viewer');
  await probePoints('after certview open+close');

  // ---- 4. Contact popover: open, close, page not left scroll-locked --------
  await page.locator('[data-contact-open]').first().click();
  await page.waitForTimeout(400);
  check(await page.locator('#contactsheet').isVisible(), 'contact dialog opens');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  check(await page.locator('#contactsheet').isHidden(), 'contact dialog closes on Escape');
  const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
  check(bodyOverflow === '', 'body scroll unlocked after close', `overflow="${bodyOverflow}"`);
  await probePoints('after contact dialog open+close');

  // ---- 5. Nav clicks light the CORRECT link -------------------------------
  // The scroll used to look perfect while the indicator lit the previous link.
  // Assert the resulting .is-active, never just that the scroll happened.
  const navLabels = await page.locator('.nav-link').allTextContents();
  for (const label of navLabels) {
    await page.locator('.nav-link', { hasText: new RegExp(`^${label}$`) }).first().click();
    await page.waitForTimeout(1500);
    const active = await page.locator('.nav-link.is-active').first().textContent();
    check(active?.trim() === label.trim(), `nav "${label}" lights itself`, `lit "${active?.trim()}"`);
  }

  // ---- 6. Certificate images keep their 800/565 rendered ratio -------------
  // Adding width/height attributes silently killed aspect-ratio once and
  // object-fit:cover then sliced every name mid-word.
  await page.evaluate(() => window.scrollTo(0, 0));
  const ratios = await page.$$eval('.cert img', (imgs) =>
    imgs.map((i) => +(i.getBoundingClientRect().width / i.getBoundingClientRect().height).toFixed(3)),
  );
  const target = +(800 / 565).toFixed(3);
  const ratioOk = ratios.every((r) => Math.abs(r - target) < 0.02);
  check(ratioOk, 'cert images render at 800/565', `got ${[...new Set(ratios)].join(',')} want ${target}`);

  // ---- 7. Stack grid column ladder: 6 / 4 / 3 / 2 -------------------------
  // auto-fill silently resolved to SEVEN columns at full width; invisible in
  // the source, so this is measured from the resolved computed style.
  const widths = [[1440, 6], [800, 4], [520, 3], [400, 2]];
  for (const [w, want] of widths) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(150);
    const cols = await page.$eval('.stack-grid', (el) =>
      getComputedStyle(el).gridTemplateColumns.split(' ').length,
    );
    check(cols === want, `stack grid is ${want} cols at ${w}px`, `got ${cols}`);
  }

  // ---- 8. Shared LEFT edge of experience cards and certificate tiles -------
  // The tie that holds the Experience section together. Right edges differ on
  // purpose (prose measure vs image grid) — do not assert those.
  for (const w of [1440, 1200, 900]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(150);
    const [expLeft, certLeft] = await page.evaluate(() => [
      document.querySelector('.exp-item').getBoundingClientRect().left,
      document.querySelector('.cert').getBoundingClientRect().left,
    ]);
    check(Math.abs(expLeft - certLeft) < 1.5, `exp/cert share a left edge at ${w}px`, `${expLeft.toFixed(1)} vs ${certLeft.toFixed(1)}`);
  }

  // ---- 9. Certificate indent survives on phones ---------------------------
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(150);
  const certsIndent = await page.$eval('.certs', (el) => getComputedStyle(el).marginLeft);
  check(parseFloat(certsIndent) > 25, 'certs keep their 1.9rem indent at 390px', certsIndent);
  const certCols = await page.$eval('.cert-grid', (el) =>
    getComputedStyle(el).gridTemplateColumns.split(' ').length,
  );
  check(certCols === 2, 'cert grid drops to 2 cols at 390px', `got ${certCols}`);

  // ---- 10. No horizontal overflow at any width ----------------------------
  for (const w of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(200);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(over <= 1, `no horizontal overflow at ${w}px`, `${over}px`);
  }

  // ---- 11. Every image actually loads --------------------------------------
  // 13 src paths were rewritten to .webp; a typo fails silently as a broken
  // lazy image below the fold.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(async () => {
    // Force every lazy image to load before we check it.
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  const broken = await page.$$eval('img', (imgs) =>
    imgs.filter((i) => i.currentSrc && i.naturalWidth === 0).map((i) => i.getAttribute('src')),
  );
  check(broken.length === 0, 'every <img> decodes (no 404s)', broken.join(','));
  const anyWebp = await page.$$eval('img', (imgs) => imgs.filter((i) => /\.webp/.test(i.src)).length);
  check(anyWebp >= 10, 'webp sources are in use', `${anyWebp} webp images`);

  // ---- 12. Landmarks --------------------------------------------------------
  // The footer moved out of <main>; a <footer> descended from main maps to
  // `generic`, so the page had no contentinfo landmark at all.
  const landmarks = await page.evaluate(() => ({
    footerInMain: !!document.querySelector('main footer.site'),
    footerIsSibling: document.querySelector('footer.site')?.parentElement?.tagName,
    sectionsInMain: document.querySelectorAll('main section').length,
  }));
  check(!landmarks.footerInMain, 'footer is NOT inside <main>');
  check(landmarks.footerIsSibling === 'BODY', 'footer sits at body level', String(landmarks.footerIsSibling));
  check(landmarks.sectionsInMain === 5, 'all 5 sections still inside <main>', String(landmarks.sectionsInMain));

  // ---- 13. Brand link has a name at every width ----------------------------
  // It was empty between 561 and 820px: .brand span goes display:none at 820
  // while .brand itself only hides at 560.
  for (const w of [1280, 700, 600]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(120);
    const name = await page.$eval('a.brand', (a) =>
      a.offsetParent === null ? 'HIDDEN' : (a.getAttribute('aria-label') || a.textContent || '').trim(),
    );
    check(name.length > 0, `brand link has an accessible name at ${w}px`, name);
  }

  await ctx.close();

  // ---- 14. FIRST VISIT: the intro must reveal the hero ----------------------
  // The harness above sets introSeen=1, so it cannot see this path at all —
  // and the hero rewrite changed how many [data-intro-reveal] elements exist.
  const fresh = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const fp = await fresh.newPage();
  await fp.goto(BASE, { waitUntil: 'domcontentloaded' });
  const gated = await fp.evaluate(() => document.documentElement.classList.contains('intro-play'));
  check(gated, 'first visit arms .intro-play before paint');
  await fp.waitForTimeout(6000);
  const heroAfter = await fp.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-intro-reveal]'));
    return {
      n: els.length,
      hidden: els.filter((e) => +getComputedStyle(e).opacity < 0.9).length,
      introGone: !document.getElementById('intro'),
      flagGone: !document.documentElement.classList.contains('intro-play'),
    };
  });
  check(heroAfter.hidden === 0, 'first visit: every hero element ends visible', `${heroAfter.hidden}/${heroAfter.n} still hidden`);
  check(heroAfter.introGone, 'first visit: intro overlay removed');
  check(heroAfter.flagGone, 'first visit: .intro-play cleared from <html>');
  await fresh.close();

  // ---- 15. FAILSAFE: intro armed but the module script never runs -----------
  // This is the property the CSS-first gate gives up and has to buy back. If
  // the failsafe keyframe isn't wired, the hero stays blank forever.
  const dead = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await dead.route('**/*.js', (r) => r.abort());
  await dead.route('**/_astro/*', (r) => r.abort());
  const dp = await dead.newPage();
  await dp.goto(BASE, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await dp.waitForTimeout(7000);
  const rescued = await dp.evaluate(() => {
    const els = Array.from(document.querySelectorAll('[data-intro-reveal]'));
    const intro = document.getElementById('intro');
    return {
      hidden: els.filter((e) => +getComputedStyle(e).opacity < 0.9).length,
      n: els.length,
      introVisible: !!intro && getComputedStyle(intro).visibility !== 'hidden' && +getComputedStyle(intro).opacity > 0.1,
    };
  });
  check(rescued.hidden === 0, 'FAILSAFE: hero visible with JS dead', `${rescued.hidden}/${rescued.n} still hidden`);
  check(!rescued.introVisible, 'FAILSAFE: intro overlay not left covering the page');
  await dead.close();

  await browser.close();

  // ---- report -------------------------------------------------------------
  const bad = results.filter((r) => !r.ok);
  for (const r of results) {
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.n}${r.d ? `  [${r.d}]` : ''}`);
  }
  console.log(`\n${results.length - bad.length}/${results.length} passed`);
  process.exit(bad.length ? 1 : 0);
};

run().catch((e) => {
  console.error('harness error:', e.message);
  process.exit(2);
});
