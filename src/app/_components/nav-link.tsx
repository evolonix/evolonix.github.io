import type { ReactNode } from "react";
import { NavLink as RRNavLink } from "react-router";

interface NavLinkProps {
  to: string;
  end?: boolean;
  children: ReactNode;
}

export function NavLink({ to, end, children }: NavLinkProps) {
  return (
    <RRNavLink
      to={to}
      end={end}
      viewTransition
      className={({ isActive }) =>
        [
          "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200"
            : "hover:text-brand-600 dark:hover:text-brand-300 text-zinc-600 dark:text-zinc-400",
        ].join(" ")
      }
    >
      {children}
    </RRNavLink>
  );
}
