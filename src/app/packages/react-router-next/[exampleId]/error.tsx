import { useRouteError } from "@evolonix/react-router-next";
import { Link } from "react-router";
import { useDocumentTitle } from "../../../_lib/use-document-title";

export default function ExampleError() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : String(error);
  useDocumentTitle("Example error");
  return (
    <div
      role="alert"
      className="rounded-2xl bg-white p-8 ring-1 ring-rose-200 dark:bg-zinc-900 dark:ring-rose-900/50"
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-rose-600 uppercase dark:text-rose-300">
        Error
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Something went wrong rendering this example.
      </h1>
      <pre
        tabIndex={0}
        aria-label="Error details"
        className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-100 ring-1 ring-zinc-800"
      >
        <code>{message}</code>
      </pre>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        This boundary lives at{" "}
        <code>src/app/packages/react-router-next/[exampleId]/error.tsx</code>{" "}
        and is scoped to the example detail route.
      </p>
      <Link
        to="/packages/react-router-next"
        className="bg-brand-600 hover:bg-brand-700 mt-5 inline-block rounded-full px-4 py-2 text-sm font-medium text-white"
      >
        Back to examples
      </Link>
    </div>
  );
}
