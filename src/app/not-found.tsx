import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
        404
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        We couldn&apos;t find that page
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        The link may be broken or the page may have moved. Head back home and
        try again.
      </p>
      <Link
        to="/"
        className="rounded-full bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
      >
        Back to home
      </Link>
    </div>
  );
}
