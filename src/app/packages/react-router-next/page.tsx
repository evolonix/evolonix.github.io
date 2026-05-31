import { useDocumentTitle } from "../../_lib/use-document-title";
import { ExampleCard } from "./_components/example-card";
import { useExamples } from "./_lib/use-examples";

export default function ReactRouterNextPage() {
  useDocumentTitle("@evolonix/react-router-next");
  const examples = useExamples();
  return (
    <>
      <div className="from-brand-600 to-brand-800 rounded-2xl bg-linear-to-br via-fuchsia-700 p-6 text-white sm:p-8">
        <p className="font-mono text-xs tracking-[0.22em] text-white uppercase">
          @evolonix/react-router-next
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Next.js-style filesystem routing for React Router 7.
        </h1>
        <p className="mt-3 max-w-2xl text-white">
          A Vite plugin and a tiny runtime that turns a folder of{" "}
          <code className="rounded bg-white/20 px-1 py-0.5 font-mono text-sm">
            page.tsx
          </code>{" "}
          files into typed routes — params, layouts, parallel slots,
          intercepting routes, loading and error boundaries.
        </p>
        <pre className="mt-5 w-fit max-w-full overflow-x-auto rounded-lg bg-black/30 py-2 font-mono text-xs ring-1 ring-white/20">
          {/* prettier-ignore */}
          <code className="inline-block px-4">npm i @evolonix/react-router-next react-router</code>
        </pre>
        <a
          href="/react-router-next"
          className="text-brand-700 mt-5 inline-flex items-center gap-1 rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:gap-2 hover:bg-zinc-100"
        >
          Full docs &amp; demos
          <span aria-hidden>→</span>
        </a>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Conventions, live
        </h2>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Click any card to open it as a modal. Refresh the page — the same URL
          renders as a full page. That&apos;s an intercepting route inside a
          parallel slot, all wired up via the file conventions below.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-2xl bg-zinc-50 p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          What this page is actually doing
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Bullet>
            <code>page.tsx</code> and <code>layout.tsx</code> at every level
          </Bullet>
          <Bullet>
            <code>[exampleId]</code> dynamic segment for each example
          </Bullet>
          <Bullet>
            <code>@modal</code> parallel slot with <code>(.)[exampleId]</code>{" "}
            interceptor
          </Bullet>
          <Bullet>
            <code>loading.tsx</code> shown while <code>useExamples()</code>{" "}
            suspends
          </Bullet>
          <Bullet>
            <code>not-found.tsx</code> triggered by <code>notFound()</code> for
            unknown ids
          </Bullet>
          <Bullet>
            <code>error.tsx</code> scoped to the <code>[exampleId]</code> route
          </Bullet>
          <Bullet>
            <code>_lib</code> and <code>_components</code> private folders for
            colocation
          </Bullet>
          <Bullet>
            Typed <code>RouteProps</code> and <code>generate(...)</code> from
            the virtual module
          </Bullet>
        </ul>
      </div>
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        aria-hidden
        className="bg-brand-500 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
      />
      <span>{children}</span>
    </li>
  );
}
