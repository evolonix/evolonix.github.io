import { Link } from "react-router";
import { useDocumentTitle } from "../../_lib/use-document-title";

export default function ExampleNotFound() {
  useDocumentTitle("Example not found");
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
      <p className="text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-[0.18em] uppercase">
        Example not found
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        We don&apos;t have an example with that id.
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        This 404 boundary lives at{" "}
        <code>src/app/packages/react-router-next/not-found.tsx</code>. It was
        rendered because <code>useExample(id)</code> called{" "}
        <code>notFound()</code> for an unknown id.
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
