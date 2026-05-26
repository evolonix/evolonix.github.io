import { useRouteError } from "@evolonix/react-router-next";
import { Alert } from "../../../_components/alert";
import { Button } from "../../../_components/button";
import { Eyebrow } from "../../../_components/eyebrow";
import { useDocumentTitle } from "../../../_lib/use-document-title";

export default function ExampleError() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : String(error);
  useDocumentTitle("Example error");
  return (
    <Alert role="alert" intent="error" density="section">
      <Eyebrow tone="danger">Error</Eyebrow>
      <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Something went wrong rendering this example.
      </h1>
      <pre
        tabIndex={0}
        aria-label="Error details"
        className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 py-4 font-mono text-xs text-zinc-100 ring-1 ring-zinc-800"
      >
        <code className="box-border inline-block min-w-full px-4">
          {message}
        </code>
      </pre>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        This boundary lives at{" "}
        <code>src/app/packages/react-router-next/[exampleId]/error.tsx</code>{" "}
        and is scoped to the example detail route.
      </p>
      <Button to="/packages/react-router-next" size="sm" className="mt-5">
        Back to examples
      </Button>
    </Alert>
  );
}
