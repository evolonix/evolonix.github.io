import { AppRouter } from "@evolonix/react-router-next/vite-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Theme is resolved before first paint by an inline script in index.html so the
// initial background matches the app — see the bootstrap script there.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
