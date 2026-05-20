import { useRef, useState, type FormEvent } from "react";
import { useDocumentTitle } from "../../_lib/use-document-title";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  useDocumentTitle("Contact");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = "Your name is required.";
    if (!email) next.email = "An email address is required.";
    else if (!EMAIL_RE.test(email))
      next.email = "Enter a valid email address.";
    if (!message) next.message = "A message is required.";
    return next;
  }

  function focusFirstError(next: Errors) {
    const order: FieldName[] = ["name", "email", "message"];
    for (const field of order) {
      if (next[field]) {
        formRef.current?.querySelector<HTMLElement>(`#${field}`)?.focus();
        return;
      }
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const next = validate(form);
    if (Object.keys(next).length > 0) {
      e.preventDefault();
      setErrors(next);
      setStatus("idle");
      // Defer focus until after the live region has rendered.
      requestAnimationFrame(() => focusFirstError(next));
      return;
    }
    // Valid — let the browser submit via mailto:. Announce success.
    setErrors({});
    setStatus("sent");
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-brand-600 dark:text-brand-300 text-xs font-semibold tracking-[0.18em] uppercase">
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
          ref={formRef}
          action="mailto:hello@evolonix.com"
          method="post"
          encType="text/plain"
          noValidate
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div
            aria-live="assertive"
            role={errorCount > 0 ? "alert" : undefined}
          >
            {errorCount > 0 && (
              <div className="rounded-lg bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:ring-rose-900/60">
                <p className="font-semibold">
                  {errorCount === 1
                    ? "1 issue to fix before sending:"
                    : `${errorCount} issues to fix before sending:`}
                </p>
                <ul className="mt-1 list-disc pl-5">
                  {(Object.keys(errors) as FieldName[]).map((field) => (
                    <li key={field}>{errors[field]}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div aria-live="polite" className="sr-only">
            {status === "sent"
              ? "Opening your email client to send your message."
              : ""}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Your name"
              name="name"
              type="text"
              required
              error={errors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              error={errors.email}
            />
          </div>
          <Field label="Company" name="company" type="text" />
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Message
              <RequiredMark />
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-required="true"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="focus:ring-brand-500 mt-1 block w-full rounded-lg border-0 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-1 ring-zinc-200 ring-inset placeholder:text-zinc-400 focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700"
            />
            {errors.message && (
              <p
                id="message-error"
                className="mt-1 text-sm text-rose-600 dark:text-rose-300"
              >
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Send message
          </button>
        </form>

        <aside className="space-y-6 text-sm">
          <InfoBlock
            label="Email"
            value="hello@evolonix.com"
            href="mailto:hello@evolonix.com"
          />
          <InfoBlock
            label="Office"
            value={
              <>
                Raleigh, North Carolina
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

function RequiredMark() {
  return (
    <>
      <span
        aria-hidden="true"
        className="ml-0.5 text-rose-600 dark:text-rose-300"
      >
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  error?: string;
}

function Field({ label, name, type, required, error }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
        {required && <RequiredMark />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className="focus:ring-brand-500 mt-1 block w-full rounded-lg border-0 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 ring-1 ring-zinc-200 ring-inset placeholder:text-zinc-400 focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700"
      />
      {error && (
        <p
          id={errorId}
          className="mt-1 text-sm text-rose-600 dark:text-rose-300"
        >
          {error}
        </p>
      )}
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
      <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
        {label}
      </p>
      <div className="mt-1 text-zinc-700 dark:text-zinc-200">
        {href ? (
          <a
            href={href}
            className="text-brand-600 dark:text-brand-300 hover:underline"
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
      className="text-brand-600 dark:text-brand-300 hover:underline"
    >
      {children}
    </a>
  );
}
