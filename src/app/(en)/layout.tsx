import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from "next/font/google";
import { SITE_METADATA } from "@/data/site";
import { LOCALE_DETECT_SCRIPT } from "@/lib/localeDetect";
import "../globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
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
    default: `${SITE_METADATA.name} — ${SITE_METADATA.role}`,
    template: `%s | ${SITE_METADATA.name}`,
  },
  description:
    "Backend engineer. Twenty-one months of fundamentals before shipping anything, then a live App Store app whose backend refuses to invent a price.",
  authors: [{ name: SITE_METADATA.name, url: SITE_METADATA.url }],
  keywords: [...SITE_METADATA.keywords],
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/ar/", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: "ar",
    url: SITE_METADATA.url,
    title: `${SITE_METADATA.name} — ${SITE_METADATA.role}`,
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

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
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
      lang="en"
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Runs before paint: an Arabic-first browser lands on /ar/ once, then
            its stored choice always wins. */}
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
