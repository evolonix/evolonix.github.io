export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="space-y-6"
    >
      <span className="sr-only">Loading examples…</span>
      <div className="h-44 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60"
          />
        ))}
      </div>
    </div>
  );
}
