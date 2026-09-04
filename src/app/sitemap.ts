import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/data/site";
import { ROUTES } from "@/data/routes";

/* Required under `output: "export"`: without it Next treats the route as
   dynamic and refuses to emit a file. */
export const dynamic = "force-static";

/**
 * One entry per page per language, each declaring the other language as an
 * alternate. Google reads `alternates.languages` here as hreflang, which has
 * to agree with the `alternates` block in both root layouts — they are
 * generated from the same `ROUTES` list for exactly that reason.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_METADATA.url;
  const lastModified = new Date();

  return ROUTES.flatMap(({ en, ar, priority }) => {
    if (ar === null) {
      // Declaring an alternate that does not exist is a lie to a crawler.
      return [
        {
          url: `${base}${en}`,
          lastModified,
          changeFrequency: "monthly" as const,
          priority,
        },
      ];
    }

    const languages = { en: `${base}${en}`, ar: `${base}${ar}` };
    return [
      {
        url: `${base}${en}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: `${base}${ar}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
    ];
  });
}
