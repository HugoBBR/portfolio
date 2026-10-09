import { profile } from "~/content/profile";

export function SiteFooter() {
  return (
    <footer className="no-print mx-auto max-w-5xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
      <p>
        © {new Date().getFullYear()} <span translate="no">{profile.name}</span>. Built with React
        Router, Tailwind &amp; shadcn/ui.{" "}
        <a className="underline underline-offset-4 hover:text-link" href={profile.links.source}>
          Source
        </a>
      </p>
    </footer>
  );
}
