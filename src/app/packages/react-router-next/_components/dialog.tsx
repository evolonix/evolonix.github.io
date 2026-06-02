import { useEffect, useId, useRef, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useBodyScrollLock } from "../../../_lib/use-body-scroll-lock";

interface DialogProps {
  title: string;
  children: ReactNode;
  /**
   * Where to navigate when the dialog closes. Defaults to the showcase root.
   */
  closeTo?: string;
  /**
   * When true, show a control that reloads the current URL. Because this dialog
   * is rendered by an intercepting route, a fresh load bypasses the interceptor
   * and renders the full-page route instead — handy on mobile / installed PWAs
   * where there is no browser reload button to escape the modal.
   */
  fullScreen?: boolean;
}

export function Dialog({
  title,
  children,
  closeTo = "/packages/react-router-next",
  fullScreen = true,
}: DialogProps) {
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // The Dialog is only mounted while the intercepting modal route is active,
  // so the page behind it stays scroll-locked for the dialog's lifetime.
  useBodyScrollLock(true);

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
      className="m-auto max-h-dvh w-full max-w-none overflow-auto rounded-none bg-white p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] backdrop:bg-zinc-950/70 backdrop:backdrop-blur-sm max-sm:h-dvh sm:max-h-[85vh] sm:max-w-2xl sm:rounded-2xl sm:shadow-2xl sm:ring-1 sm:ring-zinc-200 dark:bg-zinc-950 sm:dark:bg-zinc-900 sm:dark:ring-zinc-800"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id={titleId}
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          {title}
        </h2>
        <div className="flex items-center gap-1">
          {fullScreen && (
            <button
              type="button"
              onClick={() => window.location.reload()}
              aria-label="Open full screen"
              title="Open full screen"
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
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
          )}
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
      </div>
      <div className="mt-4">{children}</div>
    </dialog>
  );
}
