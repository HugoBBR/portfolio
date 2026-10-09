import { Printer } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { experience } from "~/content/experience";
import { profile } from "~/content/profile";
import { formatPeriod } from "~/lib/format";
import type { Route } from "./+types/cv";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `CV · ${profile.name}` },
    { name: "description", content: `${profile.name}'s CV: ${profile.title}.` },
  ];
}

export default function Cv() {
  const [photo, setPhoto] = useState(false);
  return (
    <div className="cv mx-auto max-w-3xl pb-16 pt-6">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Use Save as PDF in the print dialog to download.
          </p>
          <label className="flex w-fit cursor-pointer items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={photo}
              onChange={(e) => setPhoto(e.target.checked)}
              className="size-4 accent-link"
            />
            Include photo
          </label>
        </div>
        <Button onClick={() => window.print()}>
          <Printer aria-hidden="true" /> Print or save as PDF
        </Button>
      </div>

      <header className="flex items-start justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-5xl" translate="no">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg">{profile.title}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{" "}
            <a href={profile.links.linkedin}>LinkedIn</a> ·{" "}
            <a href={profile.links.github}>GitHub</a>
          </p>
        </div>
        {photo && (
          <img
            src="/hugo.jpg"
            alt={profile.name}
            width={96}
            height={96}
            className="size-24 shrink-0 rounded-full object-cover"
          />
        )}
      </header>

      <section className="mt-6">
        <h2 className="text-2xl">Summary</h2>
        <p className="mt-2 text-sm">{profile.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl">Experience</h2>
        <div className="mt-3 space-y-5">
          {experience.map((r) => (
            <article key={r.company + r.start}>
              <h3 className="font-sans text-base font-semibold">
                {r.role} · <span translate="no">{r.company}</span>
              </h3>
              <p className="text-sm tabular-nums text-muted-foreground">
                {formatPeriod(r.start, r.end)}
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl">Skills</h2>
        <dl className="m-0 mt-2 space-y-1 text-sm">
          {profile.toolbox.map((t) => (
            <div key={t.group}>
              <dt className="inline font-semibold">{t.group}: </dt>
              <dd className="m-0 inline">{t.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-6">
        <h2 className="text-2xl">Education</h2>
        <p className="mt-2 text-sm">{profile.education}</p>
      </section>
    </div>
  );
}
