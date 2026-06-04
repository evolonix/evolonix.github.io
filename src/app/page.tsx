import { Link } from "react-router";
import { Card } from "./_components/card";
import { Eyebrow } from "./_components/eyebrow";
import { useDocumentTitle } from "./_lib/use-document-title";

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
  useDocumentTitle("Home");
  return (
    <>
      {/* Hero uses bespoke styling for the brand-gradient surface: pill CTAs
          intentionally diverge from the Button component (white-on-brand and
          translucent-outline-on-brand are surface-specific patterns). */}
      <section className="from-brand-600 to-brand-800 relative isolate overflow-hidden bg-linear-to-br via-fuchsia-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-white/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-black/10 blur-3xl"
        />
        <div className="px-safe-lg relative mx-auto max-w-6xl py-24 sm:py-32">
          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-white uppercase">
            Evolonix
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Quietly powerful tools for React teams.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white sm:text-xl">
            We design, build, and steward the kind of frontends that don&apos;t
            slow down as they grow. From greenfield products to platform work,
            we partner with teams who care about craft.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/services"
              viewTransition
              className="text-brand-700 rounded-full bg-white px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-zinc-100"
            >
              Explore services
            </Link>
            <Link
              to="/packages"
              viewTransition
              className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/60 ring-inset hover:bg-white/20"
            >
              Open source
            </Link>
          </div>
        </div>
      </section>

      <section className="px-safe-lg mx-auto max-w-6xl py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((card) => (
            <Card key={card.href} to={card.href} interactive accent={card.tone}>
              <Eyebrow>{card.eyebrow}</Eyebrow>
              <h2 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {card.title}
              </h2>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                {card.body}
              </p>
              <p className="text-brand-700 dark:text-brand-300 mt-5 flex w-fit items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
                {card.cta}
                <span aria-hidden>→</span>
              </p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
