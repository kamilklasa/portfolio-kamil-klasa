import { isGamingPath } from "~/entities/project";
import { ButtonLink } from "~/shared/ui/button-link";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from "react-router";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Footer } from "~/widgets/footer";
import { ReadingProgress } from "~/shared/ui/reading-progress";
import { Sidebar } from "~/widgets/sidebar";
import "lenis/dist/lenis.css";
import "./styles/global.css";
import { useSmoothScroll } from "~/shared/lib/smooth-scroll";
import { NavigationProvider } from "./providers/navigation/navigation.provider";
import type { Route } from "./+types/root";

export function meta({ error }: Route.MetaArgs) {
  if (!error) return [];
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return [
    { title: `${missing ? "404" : "Błąd"} — Kamil Klasa` },
    { name: "robots", content: "noindex" },
  ];
}

export function Layout({ children }: { children: ReactNode }) {
  const gaming = isGamingPath(useLocation().pathname);
  return (
    <html lang="pl" data-theme={gaming ? "gaming" : "light"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={gaming ? "#1b1c20" : "#ffffff"} />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link
          rel="preload"
          href="/fonts/figtree.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <NavigationProvider>
        <ReadingProgress />
        <a className="skip-link" href="#main">
          Przejdź do treści
        </a>
        <main id="main" className="home-layout">
          <Sidebar />
          <div className="route-content">
            <Outlet />
          </div>
        </main>
        <Footer />
      </NavigationProvider>
    </MotionConfig>
  );
}

export function HydrateFallback() {
  return (
    <p className="route-loading" role="status">
      Wczytywanie strony…
    </p>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  const missing = isRouteErrorResponse(error) && error.status === 404;
  return (
    <div className="error-page">
      <span className="eyebrow">{missing ? "404" : "Coś poszło nie tak"}</span>
      <h1>
        {missing ? "Ta strona nie istnieje." : "Nie udało się otworzyć strony."}
      </h1>
      <ButtonLink to="/" viewTransition>
        Wróć na początek
      </ButtonLink>
    </div>
  );
}
