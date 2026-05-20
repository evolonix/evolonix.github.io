import { Link } from "react-router";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="inline-block h-6 w-6 rounded-md bg-linear-to-br from-brand-500 via-fuchsia-500 to-accent-500"
          />
          <span>Evolonix</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/packages">Packages</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
