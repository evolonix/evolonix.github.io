import { AppLink } from "./app-link";
import { GitHubIcon } from "./icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-6 text-sm text-zinc-600 sm:flex-row sm:items-center dark:text-zinc-400">
        <p>&copy; {year} Evolonix. Built with care.</p>
        <div className="flex items-center gap-4">
          <AppLink
            href="https://github.com/evolonix"
            variant="external"
            icon={<GitHubIcon />}
          >
            GitHub
          </AppLink>
          <AppLink to="/packages">Open source</AppLink>
        </div>
      </div>
    </footer>
  );
}
