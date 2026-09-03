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

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-arabic",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
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
