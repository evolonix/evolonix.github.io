export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200/70 bg-white dark:border-zinc-800/70 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-sm text-zinc-600 sm:flex-row sm:items-center dark:text-zinc-400">
        <p>&copy; {year} Evolonix. Built with care.</p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/evolonix"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-600 dark:hover:text-brand-300"
          >
            GitHub
          </a>
          <a
            href="/packages"
            className="hover:text-brand-600 dark:hover:text-brand-300"
          >
            Open source
          </a>
        </div>
      </div>
    </footer>
  );
}
