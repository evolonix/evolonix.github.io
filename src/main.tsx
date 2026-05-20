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
