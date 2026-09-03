"use client";

import Link from "next/link";
import { LOCALE_STORAGE_KEY } from "@/lib/localeDetect";
import type { Locale } from "@/data/types";

/**
 * The smallest possible island: a link that records the visitor's choice before
 * navigating. Writing the key first means the detect script on the destination
 * reads the updated value and does not bounce them back.
 */
export function LangSwitch({
  from,
  href,
  label,
  ariaLabel,
}: {
  from: Locale;
  href: string;
  label: string;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      className="lang-switch"
      aria-label={ariaLabel}
      lang={from === "ar" ? "en" : "ar"}
      onClick={() => {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, from === "ar" ? "en" : "ar");
        } catch {
          /* Safari private mode throws on setItem; detection still works. */
        }
      }}
    >
      {label}
    </Link>
  );
}
