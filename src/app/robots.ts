import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/data/site";

export const dynamic = "force-static";

/* Nothing here is private and there is no search-parameter surface to waste a
   crawl budget on, so the whole site is open. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_METADATA.url}/sitemap.xml`,
    host: SITE_METADATA.url,
  };
}
