#!/usr/bin/env bash
# Re-encode the originals in image-sources/ into the WebP files the site ships.
#
# Why this exists rather than astro:assets / <Image>: the certificate hover
# preview and the click viewer both assign a plain string to img.src at runtime
# (index.astro, `popImg.src = tile.dataset.src` and `viewImg.src = t.dataset.src`).
# <Image> yields a processed object with a hashed URL and cannot manage an <img>
# whose src is set in JS at all. Threading that back through would mean an
# import.meta.glob map and .src plumbing into data-src, for seven static images
# on a single-page site. A one-off encode is the smaller, clearer thing.
#
# Originals live in image-sources/ and are NOT published — public/ ships verbatim,
# so leaving them there would ship 2.4 MB of dead weight.
#
# Requires cwebp (brew install webp).
set -euo pipefail
cd "$(dirname "$0")/.."

src=image-sources
out=public/images
mkdir -p "$out"/{trippe,certificates,dvld,academy,stickies}

# The two Trippé screenshots are 1290x2796 rendering into a .phone.sm screen that
# measures 156x355 CSS px at EVERY breakpoint (.phone.sm{--w:170px} does not
# change responsively). 480w still covers DPR3 (469px), so this is the one place
# a hard resize is safe and enormous.
cwebp -quiet -q 78 -resize 480 0 "$src/trippe/destination-sao-miguel.jpg" -o "$out/trippe/destination-sao-miguel.webp"
cwebp -quiet -q 78 -resize 480 0 "$src/trippe/estimated-spending.jpg"     -o "$out/trippe/estimated-spending.webp"

# Certificates are RE-ENCODED, NEVER RESIZED. The grid tile crops them, but the
# click viewer renders the same file at its native 800px with object-fit:contain,
# and reading the printed course line there is the entire reason that dialog
# exists. q88 keeps the print crisp; verified by decoding back and reading a 1:1
# crop of the course line and date.
for n in 10 18 19 21 23 25; do
  cwebp -quiet -q 88 "$src/certificates/cert-$n.png" -o "$out/certificates/cert-$n.webp"
done

# Full-bleed inside its card, so it keeps its native 1600px.
cwebp -quiet -q 80 "$src/dvld/db-diagram.png" -o "$out/dvld/db-diagram.webp"

# Already close to their rendered size — re-encode only.
cwebp -quiet -q 80 "$src/academy/numo-meal-entry.jpg" -o "$out/academy/numo-meal-entry.webp"
cwebp -quiet -q 80 "$src/stickies/gate.png"           -o "$out/stickies/gate.webp"

# The only eager image on the page, and the one competing for LCP. 640x640 for a
# box that renders at 168 (and 26 in the nav, which shares this file).
cwebp -quiet -q 82 -resize 336 0 "$src/profile-avatar.jpg" -o "$out/profile-avatar.webp"

# og.png is deliberately left alone: it is meta-only, never fetched by the page,
# and unfurlers want a PNG.

echo "sources: $(du -sh $src | cut -f1)   shipped: $(find $out -name '*.webp' | xargs du -ch | tail -1 | cut -f1) of webp"
