import { AppRouter } from "@evolonix/react-router-next/vite-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

(function bootstrapTheme() {
  try {
    const stored = localStorage.getItem("evolonix-theme");
    const theme = stored === "light" || stored === "dark" ? stored : "system";
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const resolved =
      theme === "dark" || (theme === "system" && prefersDark)
        ? "dark"
        : "light";
    document.documentElement.classList.toggle("dark", resolved === "dark");
  } catch {
    // ignore — defaults to light
  }
})();

function renderApp() {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>,
  );
}

// When running as an installed PWA (standalone), the OS shows a launch/splash
// screen until the app paints. Hold off the first render briefly so the splash
// stays visible for a minimum, non-jarring duration instead of flashing past.
const isStandalone =
  window.matchMedia("(display-mode: standalone)").matches ||
  // iOS Safari home-screen apps don't report display-mode; use the legacy flag.
  (navigator as { standalone?: boolean }).standalone === true;

const MIN_SPLASH_MS = 1500;

if (isStandalone) {
  // performance.now() is ~time since navigation start, so the splash has
  // already been visible for that long — only wait out the remainder.
  const remaining = Math.max(0, MIN_SPLASH_MS - performance.now());
  window.setTimeout(renderApp, remaining);
} else {
  renderApp();
}
