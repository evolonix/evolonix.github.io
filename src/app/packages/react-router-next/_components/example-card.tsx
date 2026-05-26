import { generate } from "virtual:react-router-next/packages/react-router-next/[exampleId]";
import { Card } from "../../../_components/card";
import type { Example } from "../_lib/use-examples";

export function ExampleCard({ example }: { example: Example }) {
  return (
    <Card
      to={generate({ exampleId: example.id })}
      viewTransition
      preventScrollReset
      interactive
      accent={example.tone}
    >
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {example.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {example.blurb}
      </p>
      <p className="text-brand-700 dark:text-brand-300 mt-4 inline-flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2">
        Open example
        <span aria-hidden>→</span>
      </p>
    </Card>
  );
}
