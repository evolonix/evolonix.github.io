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
  return (
    <Suspense fallback={<Placeholder className={wrapperClass} code={code} />}>
      <Highlighted code={code} lang={lang} className={wrapperClass} />
    </Suspense>
  );
}

function Highlighted({
  code,
  lang,
  className,
}: {
  code: string;
  lang: HighlightLang;
  className: string;
}) {
  const html = use(highlight(code, lang));
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Placeholder({ code, className }: { code: string; className: string }) {
  return (
    <pre className={className}>
      <code>{code}</code>
    </pre>
  );
}
