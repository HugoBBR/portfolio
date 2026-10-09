import { Moon, Sun } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { profile } from "~/content/profile";
import { OfflineSwitch } from "./offline-ui";

const nav = [
  { to: "/#work", label: "Work" },
  { to: "/#experience", label: "Experience" },
  { to: "/#about", label: "About" },
  { to: "/cv", label: "CV" },
];

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {
    // storage blocked: the toggle still works for this visit
  }
}

export function SiteHeader() {
  return (
    <header className="no-print mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 sm:px-6">
      <Link
        to="/"
        className="font-display text-lg font-bold tracking-tight hover:text-link"
        translate="no"
      >
        {profile.name}
      </Link>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
        <nav aria-label="Main" className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="py-2 text-muted-foreground hover:text-link">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <OfflineSwitch />
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
            <Sun aria-hidden="true" className="hidden dark:block" />
            <Moon aria-hidden="true" className="dark:hidden" />
          </Button>
        </div>
      </div>
    </header>
  );
}
