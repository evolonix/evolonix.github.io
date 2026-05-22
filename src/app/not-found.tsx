import { Link } from "react-router";
import { useDocumentTitle } from "./_lib/use-document-title";

export default function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-6 py-24">
      <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.18em] uppercase">
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
        className="bg-brand-600 hover:bg-brand-700 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm"
      >
        Back to home
      </Link>
    </div>
  );
}
