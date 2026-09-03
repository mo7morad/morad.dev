import type { ReactNode } from "react";
import type { Locale } from "@/data/types";

/**
 * Arabic prose containing Latin runs, rendered so the Latin cannot scramble.
 *
 * The bidi algorithm resolves neutral characters — `+`, `#`, `.`, a space —
 * against the surrounding paragraph direction, not against the word they
 * belong to. Inside an Arabic paragraph that reorders `C++` and `C#`, and it
 * splits `stored procedure` if the two words are isolated separately. So the
 * match is deliberately greedy across spaces: one isolate per Latin run, never
 * one per Latin word.
 *
 * Trailing periods are excluded on purpose. A `.` after `Tkinter` at the end of
 * an Arabic sentence belongs to the Arabic sentence, and pulling it inside the
 * isolate would park it in the middle of the line.
 *
 * Copy stays plain strings. Nobody maintaining this file has to know the rule
 * exists, which is the only version of this that survives contact with a
 * content edit.
 */
const LATIN_RUN = /[A-Za-z][A-Za-z0-9_+#\/-]*(?: [A-Za-z0-9_+#\/-]+)*/g;

export function Prose({ text, locale }: { text: string; locale: Locale }) {
  if (locale !== "ar") return <>{text}</>;

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(LATIN_RUN)) {
    const start = match.index;
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(<bdi key={start}>{match[0]}</bdi>);
    cursor = start + match[0].length;
  }
  if (parts.length === 0) return <>{text}</>;
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
