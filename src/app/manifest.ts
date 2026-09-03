import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/data/site";

export const dynamic = "force-static";

/**
 * A manifest for a portfolio is not an install prompt — it is what a phone
 * reads when someone adds the page to a home screen, and what some browsers
 * read for the address-bar colour. Kept minimal for that reason: no icons are
 * declared, because a declared icon that 404s is worse than none.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_METADATA.name} — ${SITE_METADATA.role}`,
    short_name: SITE_METADATA.name,
    description:
      "Backend engineer. Twenty-one months of fundamentals before shipping anything, then a live App Store app whose backend refuses to invent a price.",
    start_url: "/",
    display: "browser",
    background_color: "#eaeae5",
    theme_color: "#eaeae5",
  };
}
