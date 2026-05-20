import type { RouteProps } from "virtual:react-router-next/packages/react-router-next/[exampleId]";
import { CodeBlock } from "../../_components/code-block";
import { Dialog } from "../../_components/dialog";
import { useExample } from "../../_lib/use-examples";

export default function ExampleModal({ params }: RouteProps) {
  const example = useExample(params.exampleId);
  return (
    <Dialog title={example.title}>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {example.blurb}
      </p>
      <p className="mt-4 text-zinc-700 dark:text-zinc-300">{example.detail}</p>
      <CodeBlock className="mt-5" code={example.code} lang={example.lang} />
      <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
        Rendered by the <code>(.)[exampleId]</code> interceptor in the{" "}
        <code>@modal</code> slot. Refresh this page to see the full-page route
        instead.
      </p>
    </Dialog>
  );
}
