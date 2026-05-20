import { Link } from "react-router";

const HIGHLIGHTS = [
  {
    eyebrow: "Engineering",
    title: "Ship faster, on solid rails",
    body: "We help React teams move from prototype to production with confidence — clean architecture, fast feedback loops, no heroics.",
    href: "/services",
    cta: "See what we do",
    tone: "from-brand-500 to-fuchsia-500",
  },
  {
    eyebrow: "Open source",
    title: "Tools we wish we had",
    body: "Small, focused packages we extract from real client work. Battle-tested in production, documented to teach, free to use.",
    href: "/packages",
    cta: "Browse packages",
    tone: "from-fuchsia-500 to-accent-500",
  },
  {
    eyebrow: "Get in touch",
    title: "Have a project in mind?",
    body: "Audits, advisory, embedded engineering, or end-to-end builds — we work with teams of every size. Let's talk.",
    href: "/contact",
    cta: "Start a conversation",
    tone: "from-accent-500 to-brand-500",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-linear-to-br from-brand-500 via-fuchsia-500 to-accent-500 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-black/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Evolonix
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Quietly powerful tools for React teams.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            We design, build, and steward the kind of frontends that don&apos;t
            slow down as they grow. From greenfield products to platform work,
            we partner with teams who care about craft.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/services"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm hover:bg-zinc-100"
            >
              Explore services
            </Link>
            <Link
              to="/packages"
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/30 hover:bg-white/20"
            >
              Open source
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((card) => (
            <Link
              key={card.href}
              to={card.href}
              className="group relative block overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200 transition hover:-translate-y-0.5 hover:ring-brand-300 hover:shadow-lg dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:ring-brand-700"
            >
              <div
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${card.tone}`}
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
                  {card.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {card.body}
                </p>
                <p className="mt-5 flex w-fit items-center gap-1 text-sm font-medium text-brand-600 group-hover:gap-2 transition-all dark:text-brand-300">
                  {card.cta}
                  <span aria-hidden>→</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            Trusted by builders across the ecosystem
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-6 text-center text-sm font-medium text-zinc-600 sm:grid-cols-4 dark:text-zinc-400">
            <li>Helio Labs</li>
            <li>Northpine</li>
            <li>Quarry &amp; Co</li>
            <li>Atlas Foundry</li>
          </ul>
        </div>
      </section>
    </>
  );
}
