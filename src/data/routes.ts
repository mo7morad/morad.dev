/* Every page that exists, in both languages, in one list.
 *
 * The sitemap reads this rather than a filesystem walk, because a static
 * export gives no route manifest to walk. The consequence is a rule: a page
 * that is not listed here is invisible to search engines, so the entry lands
 * in the same commit as the page.
 *
 * `en` and `ar` are always written as a pair, which is what lets the sitemap
 * emit correct hreflang alternates without a second source of truth.
 */

export interface RoutePair {
  /** English path. Leading and trailing slash, matching `trailingSlash: true`. */
  en: string;
  /** Arabic path. */
  ar: string;
  /** Relative weight within the site, not a ranking promise. */
  priority: number;
}

export const ROUTES: readonly RoutePair[] = [
  { en: "/", ar: "/ar/", priority: 1 },
  { en: "/trippe/", ar: "/ar/trippe/", priority: 0.9 },
] as const;
