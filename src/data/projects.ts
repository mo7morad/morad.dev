import type { ProjectSlug } from "./types";

/**
 * Where a project lives, when it lives anywhere public.
 *
 * One entry per language would be one entry too many: an address is not a
 * translatable string, and the only way a link can be right in English and
 * dead in Arabic is if it was written down twice. Copy supplies the label.
 *
 * Trippé's four repositories are private, so the only public address it has is
 * its App Store listing. A project with nothing to link is simply absent here.
 */
export const PROJECT_LINK: Partial<Record<ProjectSlug, string>> = {
  trippe: "https://apps.apple.com/app/id6766072256",
};
