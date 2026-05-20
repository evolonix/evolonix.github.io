import { Suspense, use } from "react";
import { highlight, type HighlightLang } from "../_lib/highlight";

interface CodeBlockProps {
  code: string;
  lang?: HighlightLang;
  className?: string;
}

export function CodeBlock({ code, lang = "tsx", className }: CodeBlockProps) {
  const wrapperClass = [
    "shiki-block overflow-x-auto rounded-xl p-4 font-mono text-xs leading-relaxed ring-1 ring-zinc-200 dark:ring-zinc-800",
    className ?? "",
  ].join(" ");
  const label = `Code example, ${lang.toUpperCase()}`;
  return (
    <Suspense
      fallback={
        <Placeholder className={wrapperClass} code={code} label={label} />
      }
    >
      <Highlighted
        code={code}
        lang={lang}
        className={wrapperClass}
        label={label}
      />
    </Suspense>
  );
}

function Highlighted({
  code,
  lang,
  className,
  label,
}: {
  code: string;
  lang: HighlightLang;
  className: string;
  label: string;
}) {
  const html = use(highlight(code, lang));
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Placeholder({
  code,
  className,
  label,
}: {
  code: string;
  className: string;
  label: string;
}) {
  return (
    <pre role="region" aria-label={label} tabIndex={0} className={className}>
      <code>{code}</code>
    </pre>
  );
}
