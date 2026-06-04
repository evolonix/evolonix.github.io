import { NavLink, Outlet } from "react-router";
import { Eyebrow } from "../_components/eyebrow";

const PACKAGES = [
  {
    name: "@evolonix/react-router-next",
    href: "/packages/react-router-next",
    blurb: "Next.js-style filesystem routing for React Router 7.",
  },
];

export default function PackagesLayout() {
  return (
    <div className="px-safe-lg mx-auto grid max-w-6xl gap-10 py-20 lg:grid-cols-[16rem_1fr]">
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <Eyebrow>Packages</Eyebrow>
        <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Evolonix open source
        </h2>
        <nav className="mt-5 space-y-1 text-sm">
          <NavLink
            to="/packages"
            end
            viewTransition
            className={({ isActive }) =>
              [
                "block rounded-lg px-3 py-2",
                isActive
                  ? "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200"
                  : "hover:text-brand-700 dark:hover:text-brand-300 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
              ].join(" ")
            }
          >
            All packages
          </NavLink>
          {PACKAGES.map((pkg) => (
            <NavLink
              key={pkg.href}
              to={pkg.href}
              viewTransition
              className={({ isActive }) =>
                [
                  "block rounded-lg px-3 py-2 font-mono text-xs",
                  isActive
                    ? "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200"
                    : "hover:text-brand-700 dark:hover:text-brand-300 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                ].join(" ")
              }
            >
              {pkg.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
