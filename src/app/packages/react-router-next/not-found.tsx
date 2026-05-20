import { Link } from "react-router";

export default function ExampleNotFound() {
  return (
    <div className="rounded-2xl bg-white p-8 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
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
        className="mt-5 inline-block rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        Back to examples
      </Link>
    </div>
  );
}
