import { useRef, useState, type FocusEvent, type FormEvent } from "react";
import { Alert } from "../../_components/alert";
import { AppLink } from "../../_components/app-link";
import { Button } from "../../_components/button";
import { Eyebrow } from "../../_components/eyebrow";
import { Field, FieldTextarea } from "../../_components/field";
import { BlueskyIcon, GitHubIcon } from "../../_components/icons";
import { useDocumentTitle } from "../../_lib/use-document-title";

type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "hello@evolonix.com";

export default function Contact() {
  useDocumentTitle("Contact");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validateField(value: string, field: FieldName): string | undefined {
    const v = value.trim();
    switch (field) {
      case "name":
        if (!v) return "Your name is required.";
        return undefined;
      case "email":
        if (!v) return "An email address is required.";
        if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
        return undefined;
      case "message":
        if (!v) return "A message is required.";
        return undefined;
    }
  }

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    for (const field of ["name", "email", "message"] as const) {
      const message = validateField(String(data.get(field) ?? ""), field);
      if (message) next[field] = message;
    }
    return next;
  }

  function handleFieldBlur(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = e.target.name as FieldName;
    // Only revalidate fields that were flagged invalid on the last attempt.
    if (!errors[field]) return;
    const message = validateField(e.target.value, field);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function focusFirstError(next: Errors) {
    const order: FieldName[] = ["name", "email", "message"];
    for (const field of order) {
      if (!next[field]) continue;
      const el = formRef.current?.querySelector<HTMLElement>(`#${field}`);
      if (!el) return;
      // Focus without the browser's own scroll, then drive the scroll
      // ourselves: focus()'s implicit scroll is unreliable on mobile (it can
      // land off-target or leave the field under the sticky header), and it
      // won't scroll at all when the field is already focused — so we always
      // center the field explicitly, regardless of focus or prior state.
      el.focus({ preventScroll: true });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next = validate(form);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      setStatus("idle");
      // Defer focus until after the live region has rendered.
      requestAnimationFrame(() => focusFirstError(next));
      return;
    }
    setErrors({});

    // Build the mailto: link in JS rather than via the form's `action`, so
    // the form has no insecure (non-HTTPS) submission target. A mailto:
    // action is what makes browsers disable autofill and warn "this form is
    // not secure" on HTTPS pages.
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const lines = [`Name: ${name}`, `Email: ${email}`];
    if (company) lines.push(`Company: ${company}`);
    lines.push("", message);
    const href =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(`[Evolonix] Inquiry from ${name}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    setStatus("sent");
    form.reset();
    window.location.href = href;
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
              onBlur={handleFieldBlur}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={errors.email}
              onBlur={handleFieldBlur}
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
            onBlur={handleFieldBlur}
          />
          <Button type="submit">Send message</Button>
        </form>

        <aside
          aria-label="Other ways to reach us"
          className="space-y-6 text-sm"
        >
          <InfoBlock
            label="Email"
            value={CONTACT_EMAIL}
            href={`mailto:${CONTACT_EMAIL}`}
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
                <AppLink
                  href="https://github.com/evolonix"
                  variant="external"
                  icon={<GitHubIcon />}
                >
                  GitHub
                </AppLink>
                <AppLink
                  href="https://bsky.app/profile/evolonix.com"
                  variant="external"
                  icon={<BlueskyIcon />}
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
