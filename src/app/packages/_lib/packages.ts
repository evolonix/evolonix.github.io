export interface Package {
  /** npm package name, e.g. "@evolonix/react-router-next" */
  name: string;
  /** route to the package's demo/docs */
  href: string;
  /** headline shown on the index card */
  tagline: string;
  /** short label shown in the sidebar nav */
  blurb: string;
  /** longer description shown on the index card */
  body: string;
  /** gradient utility classes for the card's accent bar */
  tone: string;
  /** install command shown on the index card */
  install: string;
}

export const PACKAGES: Package[] = [
  {
    name: "@evolonix/react-router-next",
    href: "/packages/react-router-next",
    tagline: "Next.js-style filesystem routing for React Router 7",
    blurb: "Next.js-style filesystem routing for React Router 7.",
    body: "Drop a page.tsx into a folder, get a typed route — including typed params, nested layouts, parallel routes, intercepting routes, loading and error boundaries.",
    tone: "from-brand-500 via-fuchsia-500 to-accent-500",
    install: "npm i @evolonix/react-router-next react-router",
  },
];
