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
    accent: "from-sky-500 to-sky-400",
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
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          Four ways we work with teams.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          We tailor the shape of each engagement — embedded, advisory, or
          fixed-scope — to the moment your team is in. The outcomes are the
          point.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-zinc-900 dark:ring-zinc-800"
            >
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${s.accent}`}
              />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
                {s.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {s.title}
              </h2>
              <p
                className={`mt-2 inline-block rounded-full bg-linear-to-r ${s.accent} bg-clip-text text-sm font-medium text-transparent`}
              >
                {s.outcome}
              </p>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
