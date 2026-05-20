import { Link, Outlet } from "react-router";

const PACKAGES = [
  {
    name: "@evolonix/react-router-next",
    href: "/packages/react-router-next",
    blurb: "Next.js-style filesystem routing for React Router 7.",
  },
];

export default function PackagesLayout() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[16rem_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
          Packages
        </p>
        <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Evolonix open source
        </h2>
        <nav className="mt-5 space-y-1 text-sm">
          <Link
            to="/packages"
            className="block rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 hover:text-brand-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-brand-300"
          >
            All packages
          </Link>
          {PACKAGES.map((pkg) => (
            <Link
              key={pkg.href}
              to={pkg.href}
              className="block rounded-lg px-3 py-2 font-mono text-xs text-zinc-700 hover:bg-zinc-100 hover:text-brand-600 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-brand-300"
            >
              {pkg.name}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
