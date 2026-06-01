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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);

// When launched as an installed PWA, index.html shows an HTML splash overlay
// (data-standalone is set there before first paint) that mirrors the native iOS
// launch image. The app renders immediately behind it; we hold the overlay for a
// minimum, non-jarring duration then fade it out — bridging the gap between iOS
// dismissing its native splash on first paint and the app being ready.
const MIN_SPLASH_MS = 1500;
const splash = document.getElementById("splash");

if (splash && document.documentElement.dataset.standalone === "true") {
  // performance.now() is ~time since navigation start, so the splash has already
  // been visible for that long — only wait out the remainder.
  const remaining = Math.max(0, MIN_SPLASH_MS - performance.now());
  window.setTimeout(() => {
    const remove = () => splash.remove();
    splash.addEventListener("transitionend", remove, { once: true });
    // Fallback in case the transition never fires (e.g. reduced motion).
    window.setTimeout(remove, 600);
    splash.classList.add("splash--hidden");
  }, remaining);
} else {
  splash?.remove();
}
