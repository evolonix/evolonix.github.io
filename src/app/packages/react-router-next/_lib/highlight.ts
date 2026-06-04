import type { HighlighterCore } from "shiki/core";

export type HighlightLang = "tsx" | "text";

let highlighterPromise: Promise<HighlighterCore> | null = null;

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    // Load the shiki core and regex engine dynamically so they stay out of the
    // main entry chunk — code blocks only render on the package example routes,
    // so the home/marketing pages never pay for the highlighter.
    highlighterPromise = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] =
        await Promise.all([
          import("shiki/core"),
          import("shiki/engine/javascript"),
        ]);
      return createHighlighterCore({
        themes: [
          import("@shikijs/themes/github-light-high-contrast"),
          import("@shikijs/themes/github-dark-high-contrast"),
        ],
        langs: [import("@shikijs/langs/tsx")],
        engine: createJavaScriptRegexEngine(),
      });
    })();
  }
  return highlighterPromise;
}

const cache = new Map<string, Promise<string>>();

export function highlight(code: string, lang: HighlightLang): Promise<string> {
  const key = `${lang}::${code}`;
  let p = cache.get(key);
  if (!p) {
    p = getHighlighter().then((h) =>
      h.codeToHtml(code, {
        lang,
        themes: {
          light: "github-light-high-contrast",
          dark: "github-dark-high-contrast",
        },
        defaultColor: false,
      }),
    );
    cache.set(key, p);
  }
  return p;
}
