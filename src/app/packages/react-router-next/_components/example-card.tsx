import { Link } from "react-router";
import { generate } from "virtual:react-router-next/packages/react-router-next/[exampleId]";
import type { Example } from "../_lib/use-examples";

export function ExampleCard({ example }: { example: Example }) {
  return (
    <Link
      to={generate({ exampleId: example.id })}
      className="group relative block overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900 dark:ring-zinc-800"
    >
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${example.tone}`}
      />
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {example.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {example.blurb}
      </p>
      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-600 group-hover:gap-2 transition-all dark:text-brand-300">
        Open example
        <span aria-hidden>→</span>
      </p>
    </Link>
  );
}
