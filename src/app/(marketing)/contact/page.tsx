export default function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">
        Contact
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        Tell us about your team.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        We&apos;ll reply within a business day. Short notes are fine — what
        you&apos;re building, where you&apos;re stuck, and when you&apos;d like
        to start.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[3fr_2fr]">
        <form
          action="mailto:hello@evolonix.example"
          method="post"
          encType="text/plain"
          className="space-y-4 rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field label="Company" name="company" type="text" />
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 block w-full rounded-lg border-0 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-500 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
          >
            Send message
          </button>
        </form>

        <aside className="space-y-6 text-sm">
          <InfoBlock
            label="Email"
            value="hello@evolonix.example"
            href="mailto:hello@evolonix.example"
          />
          <InfoBlock
            label="Office"
            value={
              <>
                Portland, Oregon
                <br />
                Remote-first across the Americas
              </>
            }
          />
          <InfoBlock
            label="Elsewhere"
            value={
              <span className="flex flex-wrap gap-3">
                <ExternalLink href="https://github.com/evolonix">
                  GitHub
                </ExternalLink>
                <ExternalLink href="https://bsky.app/">Bluesky</ExternalLink>
              </span>
            }
          />
        </aside>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}

function Field({ label, name, type, required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-1 block w-full rounded-lg border-0 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-1 ring-inset ring-zinc-200 placeholder:text-zinc-400 focus:ring-2 focus:ring-brand-500 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700"
      />
    </div>
  );
}

interface InfoBlockProps {
  label: string;
  value: React.ReactNode;
  href?: string;
}

function InfoBlock({ label, value, href }: InfoBlockProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <div className="mt-1 text-zinc-700 dark:text-zinc-200">
        {href ? (
          <a
            href={href}
            className="text-brand-600 hover:underline dark:text-brand-300"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-brand-600 hover:underline dark:text-brand-300"
    >
      {children}
    </a>
  );
}
