import { Fragment, type ReactNode } from "react";
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
 */
const LATIN_RUN = /[A-Za-z][A-Za-z0-9_+#\/-]*(?: [A-Za-z0-9_+#\/-]+)*/g;

/** Backticks in copy mean what they mean everywhere else: this is a literal
    token, not a word. Rendering them as text — which is what happens without
    this — puts stray punctuation in the middle of a sentence. */
const INLINE_CODE = /`([^`]+)`/g;

function isolate(text: string, locale: Locale, keyBase: string): ReactNode[] {
  if (locale !== "ar") return [text];
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(LATIN_RUN)) {
    const start = match.index;
    if (start > cursor) parts.push(text.slice(cursor, start));
    parts.push(<bdi key={`${keyBase}-${start}`}>{match[0]}</bdi>);
    cursor = start + match[0].length;
  }
  if (parts.length === 0) return [text];
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

/**
 * `verbatim` marks text that is a single-language block rather than Arabic
 * prose with foreign words in it — a quotation, a code line, a table label
 * like "EG → JO".
 *
 * Run-isolating such text is actively wrong: each Latin run becomes its own
 * isolate, an RTL paragraph then orders those isolates right-to-left, and an
 * English sentence comes out with its clauses reversed and its full stops at
 * the wrong end. The caller wraps the whole thing in one <bdi> instead, which
 * detects the direction from the text itself.
 */
export function Prose({
  text,
  locale,
  verbatim = false,
}: {
  text: string;
  locale: Locale;
  verbatim?: boolean;
}) {
  const effective: Locale = verbatim ? "en" : locale;
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const match of text.matchAll(INLINE_CODE)) {
    const start = match.index;
    if (start > cursor) parts.push(...isolate(text.slice(cursor, start), effective, `t${cursor}`));
    // <code> is not an isolate by default; the stylesheet makes it one, so a
    // Latin token inside Arabic prose keeps its own direction.
    parts.push(<code key={`c${start}`}>{match[1]}</code>);
    cursor = start + match[0].length;
  }
  if (cursor === 0) return <>{isolate(text, effective, "t0")}</>;
  if (cursor < text.length) parts.push(...isolate(text.slice(cursor), effective, `t${cursor}`));
  return <>{parts}</>;
}

/**
 * A repository path, with break opportunities after its separators.
 *
 * `<wbr>` rather than a zero-width space, because a reader may well copy this
 * path to go and find the file, and a zero-width character would silently
 * break their search — which would be a strange thing for a citation on this
 * particular site to do.
 */
export function Citation({ value }: { value: string }) {
  const segments = value.split("/");
  return (
    <bdi>
      {segments.map((segment, i) => (
        <Fragment key={i}>
          {i > 0 ? "/" : null}
          {i > 0 ? <wbr /> : null}
          {segment}
        </Fragment>
      ))}
    </bdi>
  );
}
