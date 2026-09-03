import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — Cloudflare Pages serves the contents of out/ directly.
  output: "export",
  // Two root layouts ((en) and (ar)) give each language a real <html lang/dir>,
  // so there is no shared root and the 404 must render its own <html>.
  experimental: { globalNotFound: true },
  // A static export has no image optimiser: assets in public/ are pre-sized
  // and converted ahead of the build instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  // Emit directory-style output (about/index.html) so every static host serves
  // it. Consequence: every internal href must end in "/".
  trailingSlash: true,
  // Pin the workspace root, otherwise Turbopack walks up out of the repo and
  // picks up a stray package-lock.json further up the tree.
  turbopack: { root: __dirname },
};

export default nextConfig;
