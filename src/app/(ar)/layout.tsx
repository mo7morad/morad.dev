import type { Metadata, Viewport } from "next";
import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  IBM_Plex_Serif,
  IBM_Plex_Mono,
} from "next/font/google";
import { SITE_METADATA } from "@/data/site";
import { LOCALE_DETECT_SCRIPT } from "@/lib/localeDetect";
import "../globals.css";

/* Latin face is loaded here too, and stacked first in the CSS: Latin glyphs,
   figures and the evidence rail stay in the same face as the English side, and
   Arabic falls through to Plex Sans Arabic. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

/* Not preloaded, and that is a trade rather than a free win.
 *
 * Next emits the same font preloads on every page of the build regardless of
 * which layout declared them, so preloading this face put 103 KB of Arabic on
 * every English page — 63% of their font budget, for glyphs those pages never
 * draw. Turning it off moves the cost to the pages that use it: Arabic text
 * swaps in once the face arrives, which on a throttled connection measures
 * CLS 0.057 — inside Google's 0.1 "good" band, against 0.002 with the
 * preload. The English side is what a hiring manager loads first, so it wins
 * the tie.
 *
 * The metric-matched fallback next/font generates is what keeps that number
 * small, which is why it is named in the stack in globals.css and why it must
 * stay behind the real Arabic face there. */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-plex-arabic",
});

/* Not preloaded, and no italic.
   The serif marks the passages where he speaks as himself, and every one of
   them sits below the fold — so preloading it spends first-paint bandwidth on
   a face nothing on screen is using yet. Italic is dropped outright: the only
   <em> on this site is the hero mark, which `.mark` sets to `font-style:
   normal`, so the italic face was 16 KB preloaded on every page and rendered
   on none. */
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
  variable: "--font-plex-serif",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  title: {
    default: `${SITE_METADATA.name} — مهندس خلفيات`,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description:
    "مهندس باك-إند. واحد وعشرين شهر في الأساسيات قبل ما أنزل أي حاجة، وبعدها تطبيق شغّال على الآب ستور، الباك-إند بتاعه مبيخترعش سعر.",
  authors: [{ name: SITE_METADATA.name, url: SITE_METADATA.url }],
  alternates: {
    canonical: "/ar/",
    languages: { en: "/", ar: "/ar/", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    locale: "ar",
    alternateLocale: "en_US",
    url: `${SITE_METADATA.url}/ar/`,
    title: `${SITE_METADATA.name} — مهندس خلفيات`,
    siteName: SITE_METADATA.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eaeae5" },
    { media: "(prefers-color-scheme: dark)", color: "#14171a" },
  ],
};

export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_METADATA.name,
    url: SITE_METADATA.url,
    jobTitle: SITE_METADATA.role,
    sameAs: [SITE_METADATA.github, SITE_METADATA.linkedin],
  };

  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${plexSans.variable} ${plexArabic.variable} ${plexSerif.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Same detection contract as the English layout: a stored choice
            always beats browser language. */}
        <script dangerouslySetInnerHTML={{ __html: LOCALE_DETECT_SCRIPT }} />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
