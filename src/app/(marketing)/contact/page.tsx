import { useRef, useState, type FormEvent } from "react";
import { Alert } from "../../_components/alert";
import { AppLink } from "../../_components/app-link";
import { Button } from "../../_components/button";
import { Eyebrow } from "../../_components/eyebrow";
import { Field, FieldTextarea } from "../../_components/field";
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
    else if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
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
    setErrors({});
    setStatus("sent");
  }

  const errorCount = Object.keys(errors).length;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Eyebrow>Contact</Eyebrow>
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
          className="relative space-y-4 overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div
            aria-hidden
            className="from-brand-500 to-accent-500 absolute inset-x-0 top-0 h-1 bg-linear-to-r via-fuchsia-500"
          />
          <div
            aria-live="assertive"
            role={errorCount > 0 ? "alert" : undefined}
          >
            {errorCount > 0 && (
              <Alert
                intent="error"
                title={
                  errorCount === 1
                    ? "1 issue to fix before sending:"
                    : `${errorCount} issues to fix before sending:`
                }
              >
                <ul className="list-disc pl-5">
                  {(Object.keys(errors) as FieldName[]).map((field) => (
                    <li key={field}>{errors[field]}</li>
                  ))}
                </ul>
              </Alert>
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
              autoComplete="name"
              required
              error={errors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
            />
          </div>
          <Field
            label="Company"
            name="company"
            type="text"
            autoComplete="organization"
          />
          <FieldTextarea
            label="Message"
            name="message"
            required
            error={errors.message}
          />
          <Button type="submit">Send message</Button>
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
                <AppLink href="https://github.com/evolonix" variant="external">
                  GitHub
                </AppLink>
                <AppLink
                  href="https://bsky.app/profile/evolonix.com"
                  variant="external"
                >
                  Bluesky
                </AppLink>
              </span>
            }
          />
        </aside>
      </div>
    </section>
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
      <Eyebrow tone="neutral">{label}</Eyebrow>
      <div className="mt-1 text-zinc-700 dark:text-zinc-200">
        {href ? <AppLink href={href}>{value}</AppLink> : value}
      </div>
    </div>
  );
}
