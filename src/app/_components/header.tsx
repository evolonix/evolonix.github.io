import { useEffect, useRef, useState } from "react";
import { Link, NavLink as RRNavLink, useLocation } from "react-router";
import { useBodyScrollLock } from "../_lib/use-body-scroll-lock";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

const NAV_ITEMS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setOpen(false);
  }

  useBodyScrollLock(open);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    const onCancel = (event: Event) => {
      event.preventDefault();
      setOpen(false);
    };
    const onClick = (event: MouseEvent) => {
      if (event.target === el) setOpen(false);
    };
    el.addEventListener("cancel", onCancel);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="hover:text-brand-700 dark:hover:text-brand-300 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 ring-1 ring-zinc-200 transition-colors hover:bg-zinc-50 sm:hidden dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-800"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link
          to="/"
          viewTransition
          className="flex items-center gap-1 text-base font-semibold tracking-tight"
        >
          <img
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 py-1"
          />
          <span>Evolonix</span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-1 sm:flex"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto sm:ml-0">
          <ThemeToggle />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        aria-label="Mobile menu"
        className="fixed top-0 right-0 left-0 m-0 w-full max-w-full border-b border-zinc-200 bg-white p-0 backdrop:bg-zinc-900/40 backdrop:backdrop-blur-sm sm:hidden dark:border-zinc-800 dark:bg-zinc-950"
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <RRNavLink
                to={item.to}
                end={item.end}
                viewTransition
                className={({ isActive }) =>
                  [
                    "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                    isActive
                      ? "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200"
                      : "hover:text-brand-700 dark:hover:text-brand-300 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
                  ].join(" ")
                }
              >
                {item.label}
              </RRNavLink>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
