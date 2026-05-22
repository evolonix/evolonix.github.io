const VALUES = [
  {
    title: "Craft",
    body: "We sweat the details others skip — accessibility, performance, the seams where teams hand off work. The polish is the product.",
    tone: "from-emerald-500/80 to-emerald-400/60",
  },
  {
    title: "Clarity",
    body: "We write code, docs, and proposals that the next engineer can read on their first day. Surprises belong in the changelog, not the codebase.",
    tone: "from-sky-500/80 to-sky-400/60",
  },
  {
    title: "Compounding",
    body: "Each engagement leaves a team faster than we found it — better patterns, better tests, better tooling. The wins should outlast us.",
    tone: "from-fuchsia-500/80 to-fuchsia-400/60",
  },
];

const MILESTONES = [
  { year: "2019", note: "Founded as a one-person shop in Raleigh." },
  { year: "2021", note: "First open-source release." },
  { year: "2025", note: "Published react-router-next; hello, you." },
];

import { useDocumentTitle } from "../../_lib/use-document-title";

export default function About() {
  useDocumentTitle("About");
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.18em] uppercase">
          About
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
          A small studio for serious frontend work.
        </h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5 text-lg text-zinc-600 dark:text-zinc-400">
            <p>
              Evolonix is a software studio that helps product teams build,
              scale, and care for their React applications. We work as embedded
              engineers, advisors, and quiet partners — whichever shape best
              fits your team that quarter.
            </p>
            <p>
              We&apos;re small on purpose. Every engagement gets senior
              attention, and every team we work with leaves with patterns and
              tooling they own outright. We&apos;d rather make ourselves
              unnecessary than indispensable.
            </p>
            <p>
              When we&apos;re not on client work, we&apos;re extracting the
              parts that worked into open-source packages — small, focused,
              well-documented. Use them. Improve them. Replace them when
              they&apos;re no longer useful.
            </p>
          </div>
          <aside className="rounded-2xl bg-zinc-50 p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
            <h2 className="text-brand-700 dark:text-brand-300 text-sm font-semibold tracking-[0.18em] uppercase">
              Milestones
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {MILESTONES.map((m) => (
                <li key={m.year} className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                    {m.year}
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {m.note}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-[0.18em] uppercase">
            Values
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            What we won&apos;t compromise on.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${v.tone}`}
                />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
