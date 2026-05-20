# evolonix.github.io

The Evolonix marketing site — services, open-source packages, and how to get in touch. Deployed to [evolonix.github.io](https://evolonix.github.io) via GitHub Pages.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and build
- [react-router](https://reactrouter.com/) with [@evolonix/react-router-next](https://www.npmjs.com/package/@evolonix/react-router-next) file-based routing
- [Tailwind CSS v4](https://tailwindcss.com/)

## Getting started

```sh
nvm use       # Node version pinned in .nvmrc
npm install
npm run dev   # http://localhost:5173
```

## Scripts

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check and build to `dist/` (runs `typegen` first)
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint
- `npm run typegen` — regenerate route types from `src/app/`

## Project layout

```
src/
  app/                     file-based routes
    (marketing)/           grouped marketing routes (about, contact, services)
    packages/              open-source package pages
    layout.tsx             root layout
    page.tsx               home
    not-found.tsx          404
  _components/             shared UI
  _lib/                    shared utilities
  index.css                Tailwind entry
  main.tsx                 app bootstrap
public/                    static assets served as-is
```

Routes live under `src/app/` and follow the `@evolonix/react-router-next` conventions: `page.tsx` for the route, `layout.tsx` for nested layouts, `(group)` folders for organization without affecting the URL.

## Deployment

Pushes to `main` trigger [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages. A `404.html` shim in `public/` enables client-side routing on Pages (see [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)).
