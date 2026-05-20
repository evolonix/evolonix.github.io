import { useEffect, useId, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router";

interface DialogProps {
  title: string;
  children: ReactNode;
  /**
   * Where to navigate when the dialog closes. Defaults to the showcase root.
   */
  closeTo?: string;
}

export function Dialog({
  title,
  children,
  closeTo = "/packages/react-router-next",
}: DialogProps) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    el.showModal();
    const onCancel = (e: Event) => {
      e.preventDefault();
      navigate(closeTo, { preventScrollReset: true });
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === el) navigate(closeTo, { preventScrollReset: true });
    };
    el.addEventListener("cancel", onCancel);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("cancel", onCancel);
      el.removeEventListener("click", onClick);
      if (el.open) el.close();
    };
  }, [navigate, closeTo]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="m-auto max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-zinc-200 backdrop:bg-zinc-950/70 backdrop:backdrop-blur-sm dark:bg-zinc-900 dark:ring-zinc-800"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id={titleId}
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          {title}
        </h2>
        <button
          type="button"
          autoFocus
          onClick={() => navigate(closeTo, { preventScrollReset: true })}
          aria-label="Close dialog"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </dialog>
  );
}
