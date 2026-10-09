import serif from "@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2?url";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import "./app.css";

// Runs before first paint so pre-rendered pages don't flash the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#faf7f1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f1c19" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preload" as="font" type="font/woff2" href={serif} crossOrigin="anonymous" />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: constant theme script, no user input */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto max-w-5xl px-4 sm:px-6">
          {children}
        </main>
        <SiteFooter />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // A Response thrown during render (not from a loader) reaches us unwrapped.
  const notFound =
    (isRouteErrorResponse(error) || error instanceof Response) && error.status === 404;
  return (
    <section className="py-24">
      <title>{notFound ? "Not found" : "Error"} · Hugo Bonilla</title>
      <h1 className="text-5xl">{notFound ? "Page not found" : "Something went wrong"}</h1>
      <p className="mt-4 text-muted-foreground">
        {notFound
          ? "That page doesn't exist. Head back to the work."
          : "Reload the page, or head back to the home page."}
      </p>
      <a className="mt-6 inline-block text-link underline underline-offset-4" href="/">
        Back to the home page
      </a>
    </section>
  );
}
