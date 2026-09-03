import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_METADATA } from "@/data/site";
import "./globals.css";

/* Two root layouts means there is no shared root to fall back to, so the 404
   renders its own document. That is what `experimental.globalNotFound` is for.

   It deliberately does NOT run the locale-detect script: detection acts only on
   the two home paths, and a missing page is not the moment to move somebody
   somewhere they did not ask to go. Both languages are offered instead. */

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: `Page not found | ${SITE_METADATA.name}`,
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <main className="shell notfound">
          <p className="section-head notfound-code">404</p>
          <h1 className="notfound-title">This page does not exist.</h1>
          <p className="notfound-body">
            The address is wrong, or the page moved and nothing was left behind to
            forward you. Both are worth saying plainly rather than dressing up.
          </p>
          {/* Plain anchors, not next/link. This page sits outside both root
              layouts, so either destination is a different <html> and the
              navigation is a document load whichever element asks for it — a
              Link would add a router dependency and prefetching that buy
              nothing here. */}
          {/* eslint-disable @next/next/no-html-link-for-pages */}
          <p className="notfound-links">
            <a className="link" href="/">
              Go to the home page
            </a>
            <span aria-hidden="true"> · </span>
            <a className="link" href="/ar/" lang="ar">
              الصفحة الرئيسية بالعربي
            </a>
          </p>
          {/* eslint-enable @next/next/no-html-link-for-pages */}
        </main>
      </body>
    </html>
  );
}
