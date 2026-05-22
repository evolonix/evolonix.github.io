import { Link } from "react-router";
import type { RouteProps } from "virtual:react-router-next/packages/react-router-next/[exampleId]";
import { useDocumentTitle } from "../../../_lib/use-document-title";
import { CodeBlock } from "../_components/code-block";
import { useExample } from "../_lib/use-examples";

export default function ExamplePage({ params }: RouteProps) {
  const example = useExample(params.exampleId);
  useDocumentTitle(example.title);
  return (
    <article>
      <Link
        to="/packages/react-router-next"
        viewTransition
        className="text-brand-600 dark:text-brand-300 inline-flex items-center gap-1 text-sm transition-all hover:gap-2"
      >
        <span aria-hidden>←</span>
        All examples
      </Link>
      <div className="relative mt-4 overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${example.tone}`}
        />
        <p className="text-brand-600 dark:text-brand-300 font-mono text-xs tracking-[0.18em] uppercase">
          Example
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {example.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {example.blurb}
        </p>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          {example.detail}
        </p>
        <CodeBlock className="mt-6" code={example.code} lang={example.lang} />
      </div>
      <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
        You are viewing the full-page route at{" "}
        <code>/packages/react-router-next/{example.id}</code>. Soft-navigating
        from the index renders the same URL inside the <code>@modal</code> slot
        instead.
      </p>
    </article>
  );
}
