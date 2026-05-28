import { Card } from "../../_components/card";
import { Eyebrow } from "../../_components/eyebrow";
import { useDocumentTitle } from "../../_lib/use-document-title";

const VALUES = [
  {
    title: "Craft",
    body: "We sweat the details others skip — accessibility, performance, the seams where teams hand off work. The polish is the product.",
    tone: "from-emerald-500 to-emerald-400",
  },
  {
    title: "Clarity",
    body: "We write code, docs, and proposals that the next engineer can read on their first day. Surprises belong in the changelog, not the codebase.",
    tone: "from-blue-500 to-sky-400",
  },
  {
    title: "Compounding",
    body: "Each engagement leaves a team faster than we found it — better patterns, better tests, better tooling. The wins should outlast us.",
    tone: "from-fuchsia-500 to-fuchsia-400",
  },
];

export default function About() {
  useDocumentTitle("About");
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Eyebrow>About</Eyebrow>
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
            <div className="flex items-center gap-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              <img
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                className="h-[1em] w-[1em]"
              />
              <span className="font-display font-bold">Evolonix</span>
            </div>
            <div className="mt-6 space-y-1 border-t border-zinc-200 pt-6 text-base font-medium tracking-tight text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
              <p>Small studio.</p>
              <p>Senior hands.</p>
              <p>Quiet output.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Eyebrow>Values</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            What we won&apos;t compromise on.
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <Card key={v.title} accent={v.tone}>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {v.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
