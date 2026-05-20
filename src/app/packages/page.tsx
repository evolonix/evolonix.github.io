import { Link } from "react-router";
import { useDocumentTitle } from "../_lib/use-document-title";

const PACKAGES = [
  {
    name: "@evolonix/react-router-next",
    href: "/packages/react-router-next",
    tagline: "Next.js-style filesystem routing for React Router 7",
    body: "Drop a page.tsx into a folder, get a typed route — including typed params, nested layouts, parallel routes, intercepting routes, loading and error boundaries.",
    tone: "from-brand-500 via-fuchsia-500 to-accent-500",
    install: "npm i @evolonix/react-router-next react-router",
  },
];

export default function PackagesIndex() {
  useDocumentTitle("Packages");
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Open source from Evolonix
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        Small, focused packages we extract from real client work. Each ships
        with documentation, types, and a live demo.
      </p>

      <ul className="mt-10 space-y-6">
        {PACKAGES.map((pkg) => (
          <li key={pkg.href}>
            <Link
              to={pkg.href}
              className="group relative block overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900 dark:ring-zinc-800"
            >
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${pkg.tone}`}
              />
              <p className="text-brand-600 dark:text-brand-300 font-mono text-sm">
                {pkg.name}
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {pkg.tagline}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
                {pkg.body}
              </p>
              <pre className="mt-5 w-fit max-w-full overflow-x-auto rounded-lg bg-zinc-950 px-4 py-2 font-mono text-xs text-zinc-100 ring-1 ring-zinc-800">
                <code>{pkg.install}</code>
              </pre>
              <p className="text-brand-600 dark:text-brand-300 mt-5 flex w-fit items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
                Explore the demo
                <span aria-hidden>→</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
