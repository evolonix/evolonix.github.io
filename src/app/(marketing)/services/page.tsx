import { Card } from "../../_components/card";
import { Eyebrow } from "../../_components/eyebrow";
import { useDocumentTitle } from "../../_lib/use-document-title";

const SERVICES = [
  {
    title: "Product Engineering",
    outcome: "Ship features your team is proud of.",
    body: "Greenfield builds, big-rock features, and migrations. We embed alongside your engineers and write code they want to maintain.",
    accent: "from-emerald-500 to-emerald-400",
    eyebrow: "Build",
  },
  {
    title: "Platform & DX",
    outcome: "Make the right path the easy path.",
    body: "Build pipelines, monorepos, component infra, test ergonomics. We invest where every team feels it — the inner loop.",
    accent: "from-blue-500 to-sky-400",
    eyebrow: "Foundations",
  },
  {
    title: "Design Systems",
    outcome: "One language across product, brand, and code.",
    body: "Token strategies, primitive libraries, documentation sites, governance models. We work with your designers, not around them.",
    accent: "from-fuchsia-500 to-pink-400",
    eyebrow: "Systems",
  },
  {
    title: "Audits & Advisory",
    outcome: "An honest read on where you stand.",
    body: "Architectural reviews, performance audits, hiring rubrics. A fixed-scope engagement that ends with a report you can act on.",
    accent: "from-amber-500 to-orange-400",
    eyebrow: "Advise",
  },
];

export default function Services() {
  useDocumentTitle("Services");
  return (
    <section className="px-safe-lg mx-auto max-w-6xl py-20">
      <Eyebrow>Services</Eyebrow>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        Four ways we work with teams.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        We tailor the shape of each engagement — embedded, advisory, or
        fixed-scope — to the moment your team is in. The outcomes are the point.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <Card key={s.title} accent={s.accent}>
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {s.title}
            </h2>
            {/* Solid color rather than a clipped gradient: the gradient stops
                (e.g. amber/sky/emerald-400) drop below 4.5:1 on white for this
                meaningful text — WCAG 1.4.3. */}
            <p className="mt-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {s.outcome}
            </p>
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              {s.body}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
