import type { Metadata } from "next";
import type { CaseStudyCopy, Locale, ProjectSlug } from "@/data/types";

/**
 * Where a case study lives, in one place.
 *
 * Eight route files each writing out their own canonical and hreflang set is
 * eight chances for one of them to disagree with the sitemap. They are all
 * derived from the slug instead.
 */
export const casePath = (slug: ProjectSlug, locale: Locale): string =>
  locale === "ar" ? `/ar/${slug}/` : `/${slug}/`;

export function caseMetadata(copy: CaseStudyCopy, locale: Locale): Metadata {
  const en = casePath(copy.slug, "en");
  const ar = casePath(copy.slug, "ar");
  return {
    // `absolute` because the layout's template would append the site name to a
    // title that already carries its own.
    title: { absolute: copy.meta.title },
    description: copy.meta.description,
    alternates: {
      canonical: locale === "ar" ? ar : en,
      languages: { en, ar, "x-default": en },
    },
  };
}
