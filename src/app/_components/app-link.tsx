import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

type Variant = "inline" | "external";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type AppLinkInternal = CommonProps &
  Omit<LinkProps, "to" | "className" | "children"> & {
    to: LinkProps["to"];
    href?: never;
  };

type AppLinkExternal = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    to?: never;
  };

export type AppLinkProps = AppLinkInternal | AppLinkExternal;

const BASE = "text-brand-700 dark:text-brand-300";
const VARIANT: Record<Variant, string> = {
  inline: "hover:underline underline-offset-2",
  external: "underline underline-offset-2 decoration-1 hover:no-underline",
};

export function AppLink(props: AppLinkProps) {
  const { variant = "inline", className, children, ...rest } = props;
  const merged = [BASE, VARIANT[variant], className].filter(Boolean).join(" ");

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...linkRest } = rest as Omit<
      LinkProps,
      "className" | "children"
    >;
    return (
      <Link to={to} {...linkRest} className={merged}>
        {children}
      </Link>
    );
  }
  const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
  const externalAttrs =
    variant === "external"
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};
  return (
    <a {...externalAttrs} {...anchorRest} className={merged}>
      {children}
    </a>
  );
}
