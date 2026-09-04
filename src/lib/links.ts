import { SITE_METADATA } from "@/data/site";
import type { ExternalKey } from "@/data/types";

/**
 * The only place an off-site address is written.
 *
 * Typed as a total `Record`, so adding a destination to `ExternalKey` without
 * giving it an address fails `tsc` rather than rendering a dead link. Copy
 * files name destinations by key and never carry a URL.
 */
export const EXTERNAL_HREF: Record<ExternalKey, string> = {
  github: SITE_METADATA.github,
  linkedin: SITE_METADATA.linkedin,
  email: `mailto:${SITE_METADATA.email}`,
  site: SITE_METADATA.url,
};

/** `rel="me"` on a profile link is what lets a reader — and a verifier —
    confirm the two accounts belong to the same person. */
export const EXTERNAL_REL: Partial<Record<ExternalKey, string>> = {
  github: "me",
  linkedin: "me",
};
