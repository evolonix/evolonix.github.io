import { Outlet, ScrollRestoration } from "react-router";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { ThemeProvider } from "./_lib/theme";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <div className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollRestoration />
    </ThemeProvider>
  );
}
